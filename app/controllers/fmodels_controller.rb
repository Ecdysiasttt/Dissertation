class FmodelsController < ApplicationController
  before_action :set_fmodel, only: %i[ show edit update destroy ]
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
    @header = "Viewing: " + @fmodel.title

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

    def analysis(model)
      puts "Analysing #{model.title}..."

      features = Array.new
      links = Array.new

      parseJson(model.graph, features, links)

      @numFeatures = features.size - 1    # remove -1?
      
      @numOptional = 0
      @numMandatory = 0
      @numAlternative = 0
      @numOr = 0

      features.each do |f|
        if (f.status == "Optional")
          @numOptional += 1
        elsif (f.status == "Mandatory")
          @numMandatory += 1
        elsif (f.status == "Alternative")
          @numAlternative += 1
        elsif (f.status == "Or")
          @numOr += 1
        end
      end
    end

    def parseJson(json, features, links)
      puts "====================================="
      puts "Parsing JSON..."
      puts ""

      json = JSON.parse(json)

      createFeatures(json, features)
      createLinks(json, links)

      # puts "Features created:"
      # features.each do |f|
      #   puts "#{f.id}, #{f.name}"
      # end

      # puts "\nLinks created:"
      # links.each do |l|
      #   puts "#{features[l.from].name} => #{features[l.to].name} - #{l.requirement}"
      # end

      parseFeatures(features, links)

      printFeatures(features)

      puts "======================="
    end

    def createFeatures(json, features)
      # iterate through features and create objects
      json["nodeDataArray"].each do |feature|        
        feature = Feature.new((feature['key'].to_i.abs - 1), feature['text'])

        features << feature
      end
    end

    def createLinks(json, links)
      json["linkDataArray"].each do |link|
        requirement = "Mandatory"
        if (link['arrowheadFill'] == "white")
          requirement = "Optional"
        end

        link = Link.new(link['to'].to_i.abs-1, link['from'].to_i.abs-1, requirement)
          
        links << link
      end
    end

    def parseFeatures(features, links)
      # connect links with features to finalise programatic analysis
      features.each do |f|
        links.each do |l|
          if (f.id == l.from)
            # if arrow is pointing to something WITHOUT a parent:
            #   - set requirement status of target feature
            #   - set target feature's parent to current feature
            #   - add target feature as a child of current feature
            # 
            # if arrow is pointing to something WITH a parent:
            #   - set requirement status of current feature
            #   - set current feature's parent as target feature
            #   - add current feature as a child of target feature
            if (features[l.to].parent.nil?)
              features[l.to].status = l.requirement
              features[l.to].parent = f.id
              f.children << l.to
            else
              f.status = l.requirement
              f.parent = l.to              
              features[l.to].children << f.id
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

      features.each do |f|
        # puts "\nFeature: #{f.name}:"
        # run through links again to collect features and their siblings that point to their parents.
        # check for consistency with requirement selection
        allSiblings = Array.new
        links.each do |l|
          if (f.id == l.from && f.parent == l.to)
            # puts "  #{f.name} found pointing towards its parent, #{features[f.parent].name}"
            f.siblings.each do |sibling|
              if (features[sibling].status == f.status)
                allSiblings << sibling
              end
            end

            if (allSiblings.size == f.siblings.size)
              # puts "#{f.name} status = #{f.status}"
              newStatus = (f.status == "Mandatory" || f.status == "Or") ? "Or" : "Alternative"
            
              f.status = newStatus
              allSiblings.each do |s|
                features[s].status = newStatus
              end
            end
          end 
        end
      end
    end

    def treeDepth(features)
      
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
