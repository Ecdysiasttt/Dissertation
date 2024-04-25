class FmodelsController < ApplicationController
  before_action :set_fmodel, only: %i[ show edit update destroy ]
  helper_method :getTableHeaders
  # before_action :set_title

  # GET /fmodels or /fmodels.json
  def index
    @fmodels = Fmodel.order(:created_at).page params[:page]

    @title = "Feature Model Database"
    @header = "Viewing All Feature Models"
  end

  # GET /fmodels/1 or /fmodels/1.json
  def show
    @title = @fmodel.title
    @header = @fmodel.title

    @hasReturn = true

    analysis(@fmodel)
  end

  # GET /fmodels/new
  def new
    @fmodel = Fmodel.new
    @title = "Create New Feature Model"
    @header = "Create New Feature Model"
    
    # to show return button and instructions on creation form
    @hasReturn = true
    @instructions = true
  end

  # GET /fmodels/1/edit
  def edit
    @title = "Editing: " + @fmodel.title
    @header = "Editing: " + @fmodel.title

    @instructions = true
    @hasReturn = true
  end

  # POST /fmodels or /fmodels.json
  def create
    @fmodel = Fmodel.new(fmodel_params)

    # puts "===================================="
    # puts @fmodel.title
    # puts @fmodel.graph
    # puts "params:"
    # puts params[:title]
    # puts params[:graph]
    # puts "===================================="

    respond_to do |format|
      if @fmodel.save
        format.html { redirect_to '/fmodels', notice: "Fmodel was successfully created." }
        format.json { render :show, status: :created, location: @fmodel }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @fmodel.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /fmodels/1 or /fmodels/1.json
  def update
    respond_to do |format|
      if @fmodel.update(fmodel_params)
        format.html { redirect_to fmodel_url(@fmodel), notice: "Fmodel was successfully updated." }
        format.json { render :show, status: :ok, location: @fmodel }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @fmodel.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /fmodels/1 or /fmodels/1.json
  def destroy
    @fmodel.destroy!

    respond_to do |format|
      format.html { redirect_to fmodels_url, notice: "Fmodel was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_fmodel
      @fmodel = Fmodel.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def fmodel_params
      params.require(:fmodel).permit(
        :title,
        :graph
      )
    end

    # perform analysis for display to the user
    def analysis(model)
      @features = Array.new
      links = Array.new
      ctcs = Array.new

      parseJson(model.graph, @features, links, ctcs)  # create programmatic representation of fmodel

      # define feature model metrics
      @numFeatures = @features.size - 1    # remove -1?
      @numOptional = 0
      @numMandatory = 0
      @numAlternative = 0
      @numOr = 0
      @rootFeature = nil
      @numConstraints = ctcs.size

      # iterate through all features and increment above metrics accordingly
      @features.each do |f|
        if (f.status == "Optional")
          @numOptional += 1
        elsif (f.status == "Mandatory")
          @numMandatory += 1
        elsif (f.status == "Alternative")
          @numAlternative += 1
        elsif (f.status == "Or")
          @numOr += 1
        elsif (f.status == "Root")  # obtain root feature
          @rootFeature = f
        end
      end

      
      @depth = treeDepth(@rootFeature, @features)   # bfs to find tree depth
      @leaves = getLeaves(@rootFeature, @features)  # dfs to find leaves
      
      getTableHeaders()
      @validConfigs = getValidConfiguations(ctcs)
      
      @coreFeatures = Array.new
      @voidFeatures = Array.new

      
      # format configurations for display in table
      #   - trim 
      
      # printFeatures(@features)
      
      # puts "\nleaves:"
      # @leaves.each do |l|
      #   print "#{l.name}  "
      # end
      # puts "\n"

      getConfigsForPrinting()

      getCoreAndVoid()
      # getVoidFeatures()

      # puts "\n\ntable headers:"
      # # puts "depth: #{@depth-1}"
      # @tableHeaders.each do |t| 
      #   # puts "\n"
      #   t.each_with_index do |r, index|
      #     if (index == @depth - 1)
      #       print "#{r.name} "
      #     end
      #   end
      # end
      # puts "\n"
      # ctcs.each do |c|
      #   x = c.requires ? "requires" : "excludes"
      #   puts "#{findFeatureFromKey(c.from).name} #{x} #{findFeatureFromKey(c.to).name}"
      # end
    end

    def getConfigsForPrinting()
      @configsTableFormat = Array.new

      @validConfigs.each do |config|
        configBuild = Array.new(@leaves.size)
        config.each do |combination|
          if (@leaves.include?(combination[0]))
            # puts "#{combination[0].name}"
            index = @leaves.index(combination[0])
            configBuild[index] = combination[1]
          end
        end

        @configsTableFormat << configBuild 
      end
    end

    # find all valid configurations for the system
    # need to iterate through each feature, and for each valid status (selected/not),
    # obtain all valid configurations for other features
    # probably will have to check for identical configs - scope for optimisation

    # will obtain all valid configurations given a particular feature model diagram
    def getValidConfiguations(ctcs)
      configs = getAllConfigs() # all configurations

      validConfigs = []

      # go through all configs to check validity
      configs.each do |c|
        validConfig = true
        catch :nextConfig do  # allows us to jump ahead to next combination if an error is found
          # puts "========= new config ========="
          c.each do |combination|
            # combination looks like: [Feature(as object), 1/0]
            feature = combination[0]      # separate combination into parts for readability
            selection = combination[1]
            # if a feature is mandatory and not selected, throw config away
            #   will eliminate a huge chunk of invalid configs, reserving the
            #   more in-depth checking for a smaller number of configs
            if (feature.status == "Mandatory" && selection == 0)
              # puts "  Mandatory feature #{feature.name} not selected. Invalid."
              validConfig = false
              throw :nextConfig   # jump to next configuration
            # if a feature is alternate (i.e., one or the other)
            # OR feature is or (i.e. one or both) and hasn't been selected
            # then check for a status clash with sibling.
            # these two checks will catch all invalid configs before CTCs are checked
            elsif (feature.status == "Alternative" || (feature.status == "Or" && selection == 0))
              # if (feature.status == "Alternative")
              # x = (selection == 1) ? " " : " not "
              # puts "Checking #{feature.name}'s #{feature.siblings.size} siblings. #{feature.name} is#{x}selected"
              # end
              validConfig = checkSiblings(feature, selection, c)
            end

            if ((feature.status == "Alternative" || feature.status == "Or") && selection == 1)
              # check if parent hasn't been selected
              parent = findFeatureFromKey(feature.parent)
              # puts "Checking if #{feature.name}'s parent: #{parent.name} (status : #{parent.status}) is also selected"
              # puts "  Checking if #{feature.name}'s (selected: #{selection}) parent: #{parent.name} (status : #{parent.status}) is also selected "
              isParentSelected = c.find_index([parent, 0]).nil? # will return true if parent is not unselected
              if (!isParentSelected)
                # puts "    #{feature.name}'s parent: #{parent.name} isn't selected"
                validConfig = false
              end
              # elsif (parentSelected.)
            end

            # TODO make it so features with optional parents are allowed to be not selected

            ctcs.each do |constraint|
              if (constraint.from == feature.id) # constraint present for this feature
                # puts "  Constraint found between #{feature.name} and #{@features[constraint.to].name}"
                # if feature is selected, and ctc excludes another feature:
                #   if targeted feature is also selected, invalid
                #   if targeted feature not selected, valid
                # if feature is selected, and ctc required another feature:
                #   if targeted feature is also selected, valid
                #   if targeted feature is not selected, invalid
                isConstraintTargetSelected = c.find_index([findFeatureFromKey(constraint.to), selection])
                if ((constraint.requires && selection == 1) && !isConstraintTargetSelected)
                  validConfig = false
                elsif ((!constraint.requires && selection == 1) && isConstraintTargetSelected)
                  validConfig = false
                end
              end
            end

            if !validConfig
              # puts " Invalid config"
              throw :nextConfig   # jump to next configuration
            elsif validConfig
              # puts "Valid config found!"
            end
          end
        end
        if validConfig
          # puts "Valid config found!"
        end
        validConfigs << c if validConfig
      end
      
      puts "#{validConfigs.size} valid configurations for this model"
      
      # # keep for debugging when rendering in table
      # validConfigs.each do |c|
      #   c.each do |combination|
      #     print "#{combination[0].name} #{combination[1]}. "
      #   end
      #   puts ""
      # end
      validConfigs
    end

    # checks for status conflicts with siblings, given
    #   - feature as an object
    #   - feature's selection in a given configuration
    #   - the given configuration
    # if any sibling is found to have a conflicting selection status, return true, else false
    # if the feature's status is or (i.e. at least one, but can be all), check for if sibling statuses == 0
    #   if the feature's status is alternate (i.e. exactly one), then:
    #     IF the feature's selection == 1, if any sibling has selection of 1, invalid
    #     IF the feature's selection == 0, if more than one sibling has selection of 1, invalid
    # if the feature's status is or (i.e. at least one), then:
    #    IF the feature's selection == 0, if no sibling has selection of 1, invalid
    #    IF the feature's selection == 1, valid
    def checkSiblings(feature, selection, config)
      siblingsWithSameSelection = 0
      siblingsWithDifferentSelection = 0
      oppositeSelection = ((selection == 1) ? 0 : 1)

      feature.siblings.each do |siblingKey|
        siblingObject = findFeatureFromKey(siblingKey)

        doesSiblingHaveSameSelection = config.find_index([siblingObject, oppositeSelection]).nil? #true if not found

        if doesSiblingHaveSameSelection
          siblingsWithSameSelection += 1
        else
          siblingsWithDifferentSelection += 1
        end
      end

      if (feature.status == "Alternative")
        if (selection == 1)
          if (siblingsWithSameSelection > 0 )
            # puts "    Invalid!!\n\n"
            return false
          end
        else
          if (siblingsWithDifferentSelection != 1)
            # puts "    Invalid!!\n\n"
            return false
          end
        end
      else
        if (selection == 0)
          if (siblingsWithDifferentSelection == 0)
            # check for if parent is also not selected.
            # in this case, the selection is not invalid.
            parent = findFeatureFromKey(feature.parent)
            isParentSelected = config.find_index([parent, 0]).nil? # true if parent is selected

            if (isParentSelected)
              return false
            end
          end
        end
      end

      true
    end

    # TODO fix this - see 'void test' in db

    def getCoreAndVoid()
      @features.each do |f|
        isCore = true
        isVoid = true
        @validConfigs.each do |config|
          # if feature is selected in a config, not void
          # if feature is not selected in a config, not core
          isFeatureSelected = config.find_index([f, 0]).nil? # true if feature is selected
          if (!isFeatureSelected || f.status == "Root")
            isCore = false
          end

          if (isFeatureSelected || f.status == "Root")
            isVoid = false
          end
        end
        @coreFeatures << f if isCore
        @voidFeatures << f if isVoid
      end
    end

    # obtain all possible configurations for a given feature model.
    # this gets very very big.
    def getAllConfigs()
      configs = []

      # range from 0-2^(numFeatures - 1). Represents all possible
      # combinations of bits.
      (0..(2**@numFeatures - 1)).each do |i|
        config = []
        # iterate for as many features there are
        @numFeatures.times do |j|
          feature = @features.drop(1)[j]    # drop the 1st element (root feature)
          value = (i >> j) & 1              # assign 0/1 using bitwise operations
          config << [feature, value]   # add feature selection to current config
        end
        configs << config         # finally add current config to list of total configs
      end

      puts "#{configs.size} possible configurations for this model"

      configs
    end

    # finds all headers for a tabulated representation of the fmodel
    # for each leaf, find parents until it no longer can (sort of like reverse dfs)
    # and return leaf, along with parents, in an array to be displayed in the view
    def getTableHeaders()
      @tableHeaders = Array.new
      
      @leaves.each do |l|
        parents = Array.new()

        parents = getAllParents(l, @features, parents)

        parents.unshift(l)  # add leaf to start of array
        parents = parents.reverse().drop(1) # reverse array and drop the root feature

        # if the size of the array is less than the tree depth, fill it
        # with deepest feature to ensure correct display
        while (parents.compact.size < @depth)
          parents << parents.compact.last()
        end

        @tableHeaders << parents
      end
    end

    # reverse dfs sort of thing. find parents from current node back to the root
    def getAllParents(node, tree, parents)
      if (node.parent != nil)
        if (node.id != @rootFeature.id)
          parents << findFeatureFromKey(node.parent)
        end
        getAllParents(findFeatureFromKey(node.parent), tree, parents)
        # getAllParents(tree[node.parent], tree, parents)
      end
      return parents
    end

    # middle-man function that defines leaves array
    def getLeaves(root, tree)
      @leaves = Array.new

      @numLeaves = 0
      leavesDfs(root, tree)

      return @leaves
    end

    # standard dfs to count number of leaves
    # incrementing when no more children are found
    def leavesDfs(node, tree)
      # p node.name
      children = node.children.compact
      if (children.size == 0)
        @leaves << node
        @numLeaves += 1
      else
        children.each do |c|
          leavesDfs(findFeatureFromKey(c), tree)
        end
      end
    end

    # middle-man function that handles passing data to the right functions
    def parseJson(json, features, links, ctcs)
      json = JSON.parse(json)

      createFeatures(json, features)    # create feature objects
      createLinks(json, links, ctcs)          # create link objects

      parseFeatures(features, links)    # link objects and links together
    end

    # iterates through features in the JSON to convert to objects
    def createFeatures(json, features)
      json["nodeDataArray"].each do |feature|        
        # create new feature, supplying the key as the id and the text as the name
        feature = Feature.new((feature['key'].to_i.abs - 1), feature['text'])

        # puts "created #{feature.name} with id #{feature.id}"

        # add newly created feature to features array
        features << feature
      end
    end

    # iterates through links in the JSON to convert to objects
    def createLinks(json, links, ctcs)
      json["linkDataArray"].each do |link|
        if (link['arrowShape'] == "Standard") #ctc
          requires = !(link['fromArrowShape'] == "Backward")

          ctc = Ctc.new(link['to'].to_i.abs-1, link['from'].to_i.abs-1, requires)

          ctcs << ctc
        else
          # set requirement status according to arrowhead fill
          requirement = (link['arrowheadFill'] == "white") ? "Optional" : "Mandatory"

          # create new link with 'to'/'from' matching IDs in features[] and requirement status
          link = Link.new(link['to'].to_i.abs-1, link['from'].to_i.abs-1, requirement)
            
          # add newly created link to links array
          links << link
        end
      end
    end

    def findFeatureFromKey(key)
      return (@features.select { |feat| feat.id == key}).first
    end

    # associate links with features in order to finalise programmatic representation
    def parseFeatures(features, links)
      features.each do |f|
        links.each do |l|
          # if the current link originates from the current feature
          # TODO fix this because when a feature gets deleted, the keys aren't updated.
          # this means features.size is less than the value of the highest key, making this index
          # method fail.
          # TODO another todo is figure out why mobile is returning 0 valid configurations
          # puts "Feature: #{f.name} linking from #{features[l.from].name} to #{features.first()}"
          # puts "Feature: #{f.name} linking from #{features[l.from].name} to #{l.to}"
          # puts "#{(features.select { |feat| feat.id == l.to}).first.name}"
          if (f.id == l.from)
            targetFeature = findFeatureFromKey(l.to)
            # puts "#{findFeatureFromKey(features, l.to).name}"
            # puts "Link from #{f.name} to #{targetFeature.name}"
            if (targetFeature.parent.nil?)           # if link is pointing to something WITHOUT a parent:
              targetFeature.status = l.requirement   #   - set requirement status of target feature
              targetFeature.parent = f.id            #   - set target feature's parent to current feature
              f.children << l.to                      #   - add target feature as a child of current feature
            else                                      # if link is pointing to something WITH a parent:
              f.status = l.requirement                #   - set requirement status of current feature
              f.parent = l.to                         #   - set current feature's parent as target feature
              targetFeature.children << f.id         #   - add current feature as a child of target feature
            end
          end
        end
      end

      # after initial traversal, repeat to:
      #   - obtain siblings
      #   - set status of root feature
      #   - verify consistency of siblings wrt alternative/or selections
      features.each do |f|          
        # if feature has a parent and parent has more than one child
        parent = findFeatureFromKey(f.parent)
        if (!f.parent.nil? && parent.children.size > 1)
          parent.children.each do |sibling|
            if (sibling != f.id && !f.siblings.include?(sibling))
              f.siblings << sibling
            end
          end
        end

        # if feature has no parent and no status, must be root feature:
        if (f.parent.nil? && f.status.nil?)
          f.status = "Root"
        end          
      end

      # traverse once more to collect features and their siblings that point to their parents,
      # i.e. in the case of an alternative/or situation.
      # check for consistency with requirement selection.
      features.each do |f|
        matchingSiblings = Array.new
        links.each do |l|
          # if a link from a feature is pointing to its parent
          if (f.id == l.from && f.parent == l.to)
            # if status of sibling matches, add to array
            f.siblings.each do |s|
              sibling = findFeatureFromKey(s)
              if (sibling.status == f.status)
                matchingSiblings << s
              end
            end
            
            # !! if this check fails, there's an issue in the diagram's creation
            if (matchingSiblings.size == f.siblings.size)
              # replace status to match the standard terminology for feature models
              newStatus = (f.status == "Mandatory" || f.status == "Or") ? "Or" : "Alternative"
                        
              # apply new status to all siblings
              f.status = newStatus
              matchingSiblings.each do |s|
                sibling = findFeatureFromKey(s)
                sibling.status = newStatus
              end
            end
          end 
        end
      end
    end

    # standard bfs where depth is incremented for each depth iteration
    def treeDepth(root, tree)
      queue = [root]
      depth = 0

      while !queue.empty?
        for i in 0..queue.length-1

          node = queue.shift
          children = node.children.compact
          children.each do |c|
            queue.push(findFeatureFromKey(c))
          end
        end
        depth += 1
      end
      return depth - 1  # remove 1 to stop root feature being included
    end

    def printFeatures(features)
      features.each do |f|
        puts "\n#{f.name}:"
        puts "  ID:     #{f.id}"
        puts "  Name:   #{f.name}"
        puts "  Status: #{f.status}"
        if (f.parent.nil?)
          puts "  Parent: None"
        else
          puts "  Parent: #{findFeatureFromKey(f.parent).name}"
        end
        puts "  Children:"
        f.children.each do |c|
          puts "    #{findFeatureFromKey(c).name}"
        end
        puts "  Siblings:"
        f.siblings.each do |s|
          puts "    #{findFeatureFromKey(s).name}"
        end
      end
    end
end


# def bfs(node, tree)
#   depth = 0
#   queue = []
#   queue.push(node)

#   while (queue.size != 0)
#     node = queue.shift
#     p node.name

#     children = node.children.compact

#     children.each do |c|
#       queue.push(tree[c])
#       depth += 1
#     end
#   end

#   puts "Depth: #{depth}"
# end


# def dfs(node, tree)
#   p node.name

#   children = node.children.compact
#   children.each do |c|
#     dfs(tree[c], tree)
#   end
# end