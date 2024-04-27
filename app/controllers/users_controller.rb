class UsersController < ApplicationController
  helper_method :getPublicModelsForUser,
                :getPrivateModelsForUser,
                :getFollowingForUser,
                :getFollowersForUser

  def index
    # only admins can see this
    @users = User.all.order(:created_at).page params[:page]
    @title = "All users"
    @header = "Users"
  end

  def show
    # is user viewing themselves or another user?
    @user = User.find_by_id(params[:id])
    
    @viewingSelf = (current_user.present? && (current_user.id.to_i == params[:id].to_i))
    
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

    if helpers.admin || @viewingSelf
      @fmodels = Fmodel.where(created_by: @user.id).order(:created_at).page params[:models_page]
    else
      @fmodels = Fmodel.where(created_by: @user.id, public: 1).order(:created_at).page params[:models_page]
    end

    @following = Follow.where(user: @user.id).page params[:following_page]
    @followers = Follow.where(follows: @user.id).page params[:followers_page]

    @followingTotal = Follow.where(user: @user.id).count
    @followersTotal = Follow.where(follows: @user.id).count

    @hasReturn = true

    @title = "My Profile"
    @header = @user.username
  end

  protected

  def getPublicModelsForUser(user)
    @models = Fmodel.where(created_by: user.id, public: 1)
  end

  def getPrivateModelsForUser(user)
    @models = Fmodel.where(created_by: user.id, public: 0)
  end

  def getFollowingForUser(user)
    @following = Follow.where(user: user.id)
  end

  def getFollowersForUser(user)
    @followers = Follow.where(follows: user.id)
  end
end
