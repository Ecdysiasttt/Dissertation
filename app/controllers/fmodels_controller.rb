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

      parseJson(model.graph, @features, links)  # create programmatic representation of fmodel

      # define feature model metrics
      @numFeatures = @features.size - 1    # remove -1?
      @numOptional = 0
      @numMandatory = 0
      @numAlternative = 0
      @numOr = 0
      @rootFeature = nil

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
      getValidConfiguations()
    end

    def getValidConfiguations()
    
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
          parents << tree[node.parent]
        end
        getAllParents(tree[node.parent], tree, parents)
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
          leavesDfs(tree[c], tree)
        end
      end
    end

    # middle-man function that handles passing data to the right functions
    def parseJson(json, features, links)
      json = JSON.parse(json)

      createFeatures(json, features)    # create feature objects
      createLinks(json, links)          # create link objects

      parseFeatures(features, links)    # link objects and links together
    end

    # iterates through features in the JSON to convert to objects
    def createFeatures(json, features)
      json["nodeDataArray"].each do |feature|        
        # create new feature, supplying the key as the id and the text as the name
        feature = Feature.new((feature['key'].to_i.abs - 1), feature['text'])

        # add newly created feature to features array
        features << feature
      end
    end

    # iterates through links in the JSON to convert to objects
    def createLinks(json, links)
      json["linkDataArray"].each do |link|
        # set requirement status according to arrowhead fill
        requirement = (link['arrowheadFill'] == "white") ? "Optional" : "Mandatory"

        # create new link with 'to'/'from' matching IDs in features[] and requirement status
        link = Link.new(link['to'].to_i.abs-1, link['from'].to_i.abs-1, requirement)
          
        # add newly created link to links array
        links << link
      end
    end

    # associate links with features in order to finalise programmatic representation
    def parseFeatures(features, links)
      features.each do |f|
        links.each do |l|
          # if the current link originates from the current feature
          if (f.id == l.from)
            if (features[l.to].parent.nil?)           # if link is pointing to something WITHOUT a parent:
              features[l.to].status = l.requirement   #   - set requirement status of target feature
              features[l.to].parent = f.id            #   - set target feature's parent to current feature
              f.children << l.to                      #   - add target feature as a child of current feature
            else                                      # if link is pointing to something WITH a parent:
              f.status = l.requirement                #   - set requirement status of current feature
              f.parent = l.to                         #   - set current feature's parent as target feature
              features[l.to].children << f.id         #   - add current feature as a child of target feature
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
        if (!f.parent.nil? && features[f.parent].children.size > 1)
          features[f.parent].children.each do |sibling|
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
            f.siblings.each do |sibling|
              if (features[sibling].status == f.status)
                matchingSiblings << sibling
              end
            end
            
            # !! if this check fails, there's an issue in the diagram's creation
            if (matchingSiblings.size == f.siblings.size)
              # replace status to match the standard terminology for feature models
              newStatus = (f.status == "Mandatory" || f.status == "Or") ? "Or" : "Alternative"
                        
              # apply new status to all siblings
              f.status = newStatus
              matchingSiblings.each do |s|
                features[s].status = newStatus
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
            queue.push(tree[c])
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
          puts "  Parent: #{features[f.parent].name}"
        end
        puts "  Children:"
        f.children.each do |c|
          puts "    #{features[c].name}"
        end
        puts "  Siblings:"
        f.siblings.each do |s|
          puts "    #{features[s].name}"
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