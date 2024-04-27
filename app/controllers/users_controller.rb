class UsersController < ApplicationController
  helper_method :getPublicModelsForUser,
                :getPrivateModelsForUser,
                :getFollowingModelsForUser,
                :getFollowingForUser,
                :getFollowersForUser,
                :getModelsVisibleForUser

  def index
    if params[:search].present? && params[:search] != ""
      @users = User.where("LOWER(username) LIKE ?", "%#{params[:search]}%")
    else
      @users = User.all
    end

    if params[:sort].present?
      case params[:sort]
      when "num_models_asc"
      @users = @users.sort_by { |user| getModelsVisibleForUser(user).count }
      when "num_models_desc"
      @users = @users.sort_by { |user| getModelsVisibleForUser(user).count }.reverse
      when "date_joined_asc"
      @users = @users.order(:created_at)
      when "date_joined_desc"
      @users = @users.order(:created_at).reverse
      when "num_followers_asc"
      @users = @users.sort_by { |user| Follow.where(follows: user.id).count }
      when "num_followers_desc"
      @users = @users.sort_by { |user| Follow.where(follows: user.id).count }.reverse
      else
      @users = @users.order(:created_at)
      end
    else
      @users = @users.order(:created_at)
    end

    @users = Kaminari.paginate_array(@users).page(params[:page])

    @title = "All users"
    @header = "Users"

    @hasReturn = true

    @hasSearch = true
    @searchObject = "Users"
    @placeholder = "Input username..."

    @hasDropdown = true
    @dropdownOptions = {
      "# Models (Ascending)" => "num_models_asc",
      "# Models (Descending)" => "num_models_desc",
      "Date joined (Ascending)" => "date_joined_asc",
      "Date joined (Descending)" => "date_joined_desc",
      "# Followers (Ascending)" => "num_followers_asc",
      "# Followers (Descending)" => "num_followers_desc"
    }
    @path = users_path
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
      @fmodels = Fmodel.where(created_by: @user.id, visibility: :global).order(:created_at).page params[:models_page]
    end

    @following = Follow.where(user: @user.id).page params[:following_page]
    @followers = Follow.where(follows: @user.id).page params[:followers_page]

    @activeTab = params[:tab].present? ? params[:tab] : "following"

    @followingTotal = Follow.where(user: @user.id).count
    @followersTotal = Follow.where(follows: @user.id).count

    @hasReturn = true

    @title = "My Profile"
    @header = @user.username
  end

  def destroy
    puts "Destroying user"
    @user = User.find_by_id(params[:id])
    puts "Destorying '#{@user.username}'"

    if @user.present?
      # remove all follows/following for user
      Follow.where(user: @user.id).destroy_all
      Follow.where(follows: @user.id).destroy_all

      # delete all private and followers models
      Fmodel.where(created_by: @user.id, visibility: :unlisted).destroy_all
      Fmodel.where(created_by: @user.id, visibility: :followers).destroy_all

      # for public models, remove user
      Fmodel.where(created_by: @user.id, visibility: :global).each do |model|
        model.created_by = nil
        model.save
      end

      # finally delete user

      # remove user
      @user.destroy
    end
    # wipe session
    session[:user_id] = nil
    redirect_to root_path :notice => "Your account was deleted."
  end

  protected

  def getModelsVisibleForUser(user)
    # if user follows self.user, return all models that are global or followers
    # if user does not follow self.user, return all models that are global
    # if user is self.user, return all models
    if !current_user.present?
      @models = Fmodel.where(created_by: user.id, visibility: :global)
    elsif (current_user.id == user.id || helpers.admin)
      @models = Fmodel.where(created_by: user.id)
    elsif Follow.find_by(user: current_user.id, follows: user.id)
      @models = Fmodel.where(created_by: user.id).where("visibility = 0 OR visibility = 2")
    else
      @models = Fmodel.where(created_by: user.id, visibility: :global)
    end
  end

  def getPublicModelsForUser(user)
    @models = Fmodel.where(created_by: user.id, visibility: :global)
  end

  def getPrivateModelsForUser(user)
    @models = Fmodel.where(created_by: user.id, visibility: :unlisted)
  end

  def getFollowingModelsForUser(user)
    @models = Fmodel.where(created_by: user.id, visibility: :followers)
  end

  def getFollowingForUser(user)
    @following = Follow.where(user: user.id)
  end

  def getFollowersForUser(user)
    @followers = Follow.where(follows: user.id)
  end
end
