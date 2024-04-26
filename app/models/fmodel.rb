# == Schema Information
#
# Table name: fmodels
#
#  id         :integer          not null, primary key
#  created_by :integer
#  graph      :string
#  public     :boolean
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'action_view'
require 'action_view/helpers'
include ActionView::Helpers::DateHelper

class Fmodel < ApplicationRecord
  paginates_per = 10  #set pagination limit

  def getCreator
    creator = ""
    if self.created_by.nil?
      creator = "Guest"
    else
      creator = User.find_by(id: self.created_by).username
    end
    creator
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

    # if givenTime == Date.today
    #   return "Today"
    # # elsif time == Date.tomorrow
    #   # return "Tomorrow"
    # elsif givenTime < Date.today && (Date.today - givenTime.to_date).to_i <= 3
    #   return time_ago_in_words(givenTime).capitalize + " ago"
    # else
    #   return givenTime.strftime("%d %b %Y") # eg. 01 Jan 2020
    # end
  end

  def visibility
    if self.public
      return "Public"
    else
      return "Private"
    end
  end
end
