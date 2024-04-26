module ApplicationHelper
  def resource_name
    :user
  end

  def resource
    @user ||= User.new
  end

  def devise_mapping
    @devise_mapping ||= Devise.mappings[:user]
  end

  def authenticate_user!
    redirect_back fallback_location: root_path, alert: "Please login to access this page" and return
  end

  def admin
    current_user.present? && current_user.isAdmin
  end
end
