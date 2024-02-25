class FmodelsController < ApplicationController
  before_action :set_fmodel, only: %i[ show edit update destroy ]

  # GET /fmodels or /fmodels.json
  def index
    @fmodels = Fmodel.all
  end

  # GET /fmodels/1 or /fmodels/1.json
  def show
  end

  # GET /fmodels/new
  def new
    @fmodel = Fmodel.new
  end

  # GET /fmodels/1/edit
  def edit
  end

  # POST /fmodels or /fmodels.json
  def create
    @fmodel = Fmodel.new(fmodel_params)

    respond_to do |format|
      if @fmodel.save
        format.html { redirect_to fmodel_url(@fmodel), notice: "Fmodel was successfully created." }
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
      params.require(:fmodel).permit(:title)
    end
end
