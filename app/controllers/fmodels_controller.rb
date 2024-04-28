class FmodelsController < ApplicationController
  before_action :set_fmodel, only: %i[ show edit update destroy ]
  helper_method :getTableHeaders
  # before_action :set_title

  # GET /fmodels or /fmodels.json
  def index
    if helpers.admin
      @fmodels = Fmodel.all # all
    else
      @fmodels = Fmodel.where(visibility: "global") # all public
    end

    if params[:search].present? && params[:search] != ""
      @fmodels = @fmodels.where("LOWER(title) LIKE :search", search: "%#{params[:search].downcase}%")
    end

    if params[:sort].present?
      case params[:sort]
      when "date_created_asc"
        @fmodels = @fmodels.order(:created_at)
      when "date_created_desc"
        @fmodels = @fmodels.order(created_at: :desc)
      when "last_updated_asc"
        @fmodels = @fmodels.order(:updated_at)
      when "last_updated_desc"
        @fmodels = @fmodels.order(updated_at: :desc)
      when "title_asc"
        @fmodels = @fmodels.order("LOWER(title)")
      when "title_desc"
        @fmodels = @fmodels.order("LOWER(title) DESC")
      end
    end

    totalFmodels = @fmodels.size

    @fmodels = Kaminari.paginate_array(@fmodels).page(params[:page])

    current_page_range = (@fmodels.offset_value + 1)..(@fmodels.offset_value + @fmodels.length)
    @currentlyViewing = "#{current_page_range.first}-#{current_page_range.last} of #{totalFmodels}"

    @title = "Feature Model Database"
    @header = "Feature Models"

    @hasReturn = true

    @hasSearch = true
    @searchObject = "Feature Models"
    @placeholder = "Input title..."

    @hasDropdown = true
    @dropdownOptions = {
      "Date created (Ascending)" => "date_created_asc",
      "Date created (Descending)" => "date_created_desc",
      "Last updated (Ascending)" => "last_updated_asc",
      "Last updated (Descending)" => "last_updated_desc",
      "Title (A-Z)" => "title_asc",
      "Title (Z-A)" => "title_desc"
    }

    @path = fmodels_path
  end

  # GET /fmodels/1 or /fmodels/1.json
  def show
    @title = @fmodel.title
    @header = @fmodel.title

    @creator = @fmodel.getCreator

    @hasReturn = true

    @hasAnalysisButton = true

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
    if current_user.present? && @fmodel.canModify
      @title = "Editing: " + @fmodel.title
      @header = "Editing: " + @fmodel.title

      @instructions = true
      @hasReturn = true
    else
      redirect_back fallback_location: root_path, flash: { alert: "You do not have permission to edit this feature model." } and return
    end
  end

  # POST /fmodels or /fmodels.json
  def create
    @fmodel = Fmodel.new(fmodel_params)

    puts "Current user: #{current_user}"
    @fmodel.created_by = current_user.present? ? current_user.id : ""

    message = validateModel(@fmodel)

    respond_to do |format|
      if message != ""
        flash[:graph_data] = @fmodel.graph
        flash[:title] = @fmodel.title
        flash[:notes] = @fmodel.notes
        flash[:visibility] = @fmodel.visibility
        format.html {
          redirect_back fallback_location: root_path, alert: message and return }
        format.json { render json: { error: message }, status: :unprocessable_entity and return }
      else
        if @fmodel.save
          format.html { redirect_to '/fmodels', notice: "#{@fmodel.title} saved!" }
          format.json { render :show, status: :created, location: @fmodel }
        else
          format.html { render :new, status: :unprocessable_entity }
          format.json { render json: @fmodel.errors, status: :unprocessable_entity }
        end
      end
    end
  end

  # PATCH/PUT /fmodels/1 or /fmodels/1.json
  def update
    @fmodel = Fmodel.new(fmodel_params)

    message = validateModel(@fmodel)

    respond_to do |format|
      if message != ""
        Rails.cache.write("graph_data", @fmodel.graph)
        session[:title] = @fmodel.title
        session[:notes] = @fmodel.notes
        session[:visibility] = @fmodel.visibility
        format.html {
          redirect_back fallback_location: root_path, alert: message and return }
        format.json { render json: { error: message }, status: :unprocessable_entity and return }
      else
        if @fmodel.update(fmodel_params)
          format.html { redirect_to fmodel_url(@fmodel), notice: "#{@fmodel.title} updated!" }
          format.json { render :show, status: :ok, location: @fmodel }
        else
          format.html { render :edit, status: :unprocessable_entity }
          format.json { render json: @fmodel.errors, status: :unprocessable_entity }
        end
      end
    end
  end

  # DELETE /fmodels/1 or /fmodels/1.json
  def destroy
    title = @fmodel.title
    @fmodel.destroy!

    respond_to do |format|
      format.html { redirect_back(fallback_location: root_path, notice: "#{title} deleted!") }
      format.json { head :no_content }
    end
  end

  private
    def validateModel(fmodel)
      # parse for errors
      @features = Array.new
      links = Array.new
      ctcs = Array.new

      errors = Fmodel.parseJson(@fmodel.graph, @features, links, ctcs)

      puts "model parsed. Verifying..."

      # reject fmodel if:
      # has only one feature
      # has no links
      # has any disconnected links
      # has any disconnected features
      message = ""

      if @features.size < 2
        message = "#{ @features.size == 0 ? "No" : "Only #{@features.size}"} feature#{@features.size == 1 ? "" : "s"} found. Please increase the size of your model."
      elsif links.size == 0
        message = "No links found. Please connect your features."
      else
        if !errors.empty?
          # errors found during parsing
          puts "Error found in parsing. Origin: #{errors.values[0]}"
          message = errors.values[1]
        end
        # check for disconnected features
        @features.each do |f|
          if (f.children.size == 0 && f.parent.nil?)
            message = "Feature #{f.name} is not connected."
          end
        end
      end
      message
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_fmodel
      @fmodel = Fmodel.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def fmodel_params
      params.require(:fmodel).permit(
        :title,
        :graph,
        :created_by,
        :visibility,
        :notes
      )
    end

    # perform analysis for display to the user
    def analysis(model)
      @features = Array.new
      links = Array.new
      ctcs = Array.new

      consistent = Fmodel.parseJson(model.graph, @features, links, ctcs)  # create programmatic representation of fmodel
      puts "consistent: #{consistent}"

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
      
      Fmodel.printFeatures(@features)
      
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
      ctcs.each do |c|
        x = c.requires ? "requires" : "excludes"
        puts "#{Fmodel.findFeatureFromKey(@features, c.from).name} #{x} #{Fmodel.findFeatureFromKey(@features, c.to).name}"
      end
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
              parent = Fmodel.findFeatureFromKey(@features, feature.parent)
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
                isConstraintTargetSelected = c.find_index([Fmodel.findFeatureFromKey(@features, constraint.to), selection])
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
        siblingObject = Fmodel.findFeatureFromKey(@features, siblingKey)

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
            parent = Fmodel.findFeatureFromKey(@features, feature.parent)
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
        if @validConfigs.size == 0
          isCore = false
          if f.status == "Root"
            isVoid = false
          end
        else
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
          parents << Fmodel.findFeatureFromKey(@features, node.parent)
        end
        getAllParents(Fmodel.findFeatureFromKey(@features, node.parent), tree, parents)
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
          leavesDfs(Fmodel.findFeatureFromKey(@features, c), tree)
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
            queue.push(Fmodel.findFeatureFromKey(@features, c))
          end
        end
        depth += 1
      end
      return depth - 1  # remove 1 to stop root feature being included
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