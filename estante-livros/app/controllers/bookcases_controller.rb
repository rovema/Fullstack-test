class BookcasesController < ApplicationController
  before_action :set_bookcase, only: [:show, :edit, :update, :destroy]

  # GET /bookcases
  # GET /bookcases.json
  def index
    @bookcases = Bookcase.all
  end

  # GET /bookcases/1
  # GET /bookcases/1.json
  def show
  end

  # GET /bookcases/new
  def new
    @bookcase = Bookcase.new
  end

  # GET /bookcases/1/edit
  def edit
  end

  # POST /bookcases
  # POST /bookcases.json
  def create
    @bookcase = Bookcase.new(bookcase_params.merge(user_id: current_user.id))

    respond_to do |format|
      if @bookcase.save
        format.html { redirect_to @bookcase, notice: 'Bookcase was successfully created.' }
        format.json { render :show, status: :created, location: @bookcase }
      else
        format.html { render :new }
        format.json { render json: @bookcase.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /bookcases/1
  # PATCH/PUT /bookcases/1.json
  def update
    respond_to do |format|
      if @bookcase.update(bookcase_params)
        format.html { redirect_to @bookcase, notice: 'Bookcase was successfully updated.' }
        format.json { render :show, status: :ok, location: @bookcase }
      else
        format.html { render :edit }
        format.json { render json: @bookcase.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /bookcases/1
  # DELETE /bookcases/1.json
  def destroy
    @bookcase.destroy
    respond_to do |format|
      format.html { redirect_to bookcases_url, notice: 'Bookcase was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_bookcase
      @bookcase = Bookcase.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def bookcase_params
      params.require(:bookcase).permit(:name, :description, :user_id)
    end
end
