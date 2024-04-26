class UsersController < ApplicationController
  def show
    @user = User.find_by_id(params[:id])
    @fmodels = Fmodel.where(created_by: @user.id).order(:created_at).page params[:page]

    @hasReturn = true

    @title = "My Profile"
    @header = @user.username
  end
end
