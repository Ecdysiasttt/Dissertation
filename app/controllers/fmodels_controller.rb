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
end
