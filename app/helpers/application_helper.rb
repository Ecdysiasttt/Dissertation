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

  def formatTime(givenTime)
    time = Time.zone.now
    timeDifference = (time.to_i - givenTime.to_i).to_i

    if givenTime.to_date == time.to_date
      if timeDifference < 1.hour
        if timeDifference < 1.minute
          return "Just now"
        else
          minutes = (timeDifference / 60).to_i
          return "#{minutes} minute#{'s' if minutes != 1} ago"
        end
      else
        hours = (timeDifference / 3600).to_i
        return "#{hours} hour#{'s' if hours != 1} ago"
      end
    elsif givenTime.to_date == Date.yesterday
      return "Yesterday"
    else
      return givenTime.strftime("%d %b %Y") # e.g. 01 Apr 2024
    end
  end
end
