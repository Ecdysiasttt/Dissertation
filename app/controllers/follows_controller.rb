class FollowsController < ApplicationController
  
  def create
    puts params.inspect
    if params.has_key?(:username)
      targetUser = User.find_by(username: params[:username])
    else
      targetUser = User.find_by(id: params[:id])
    end

    if targetUser.nil?
      # couldn't find user, returning
      redirect_back fallback_location: root_path, alert: "Could not find user." and return 
    elsif Follow.exists?(user: current_user.id, follows: targetUser.id)
      redirect_back fallback_location: root_path, alert: "Already following #{params[:username]}!" and return 
    else
      @follow = Follow.new(user: current_user.id, follows: targetUser.id)
      if @follow.save
        redirect_back fallback_location: root_path, notice: "Following #{@follow.getUsername}!" and return
      else
        redirect_back fallback_location: root_path, alert: "Error. Could not follow user." and return
      end
    end
  end
  
  def destroy
    @follow = Follow.find_by(user: current_user.id, follows: params[:id])
    @userUnfollowed = @follow.getUsername
    if @follow
      @follow.destroy
      redirect_back fallback_location: root_path, notice: "#{@userUnfollowed} successfully unfollowed." and return
    else
      redirect_back fallback_location: root_path, alert: "Error. Could not unfollow user." and return
    end
  end

  private

  def follow_params
    params.require(:follow).permit(:username)
  end
end