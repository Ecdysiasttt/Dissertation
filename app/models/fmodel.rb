# == Schema Information
#
# Table name: fmodels
#
#  id         :integer          not null, primary key
#  created_by :integer
#  graph      :string
#  notes      :string
#  title      :string
#  visibility :integer          default("global")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'action_view'
require 'action_view/helpers'
include ActionView::Helpers::DateHelper

class Fmodel < ApplicationRecord
  enum visibility: { global: 0, unlisted: 1, followers: 2 }

  paginates_per = 10  #set pagination limit

  def getCreator
    creator = ""
    if self.created_by.nil?
      creator = "Guest"
    elsif User.current.present? && User.current.id == self.created_by
      creator = "You"
    else
      creator = User.find_by(id: self.created_by).username
    end
    creator
  end

  # true if user made the model or is an admin
  def canModify
    User.current.present? && (User.current.id == self.created_by || User.current.isAdmin)
  end

  def getVisibility
    if self.visibility == "global"
      return "Public"
    elsif self.visibility == "unlisted"
      return "Private"
    else
      return "Followers"
    end
  end

  # def editable
  #   current_user.id == self.created_by || admin
  # end
end
