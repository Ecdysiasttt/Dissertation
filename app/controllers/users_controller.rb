class UsersController < ApplicationController
  def show
    # is user viewing themselves or another user?
    @user = User.find_by_id(params[:id])
    
    @viewingSelf = (current_user.present? && (current_user.id.to_i == params[:id].to_i))

    # puts "======================================"
    # puts "is viewing self?: #{viewingSelf}"
    # puts "current_user.present? #{current_user.present?}"
    # puts "Current user id: #{current_user.id}"
    # puts "params id: #{params[:id]}"
    # puts "id's match? #{(current_user.id.to_i == params[:id].to_i)}"
    
    if @viewingSelf
      @editable = true
    elsif !current_user.present?
      puts "User not logged in"
      @editable = false
    else
      @editable = helpers.admin

      @isUserFollowingTarget = Follow.find_by(user: current_user.id, follows: @user.id)
      @isTargetFollowingUser = Follow.find_by(user: @user.id, follows: current_user.id)
    end

    if helpers.admin
      @fmodels = Fmodel.where(created_by: @user.id).order(:created_at).page params[:models_page]
    else
      @fmodels = Fmodel.where(created_by: @user.id, public: 1).order(:created_at).page params[:models_page]
    end

    @following = Follow.where(user: @user.id).page params[:following_page]

    @hasReturn = true

    @title = "My Profile"
    @header = @user.username
  end
end
