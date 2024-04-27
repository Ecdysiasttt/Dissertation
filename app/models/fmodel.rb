# == Schema Information
#
# Table name: fmodels
#
#  id         :integer          not null, primary key
#  created_by :integer
#  graph      :string
#  notes      :string
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

  def visibility
    if self.public
      return "Public"
    else
      return "Private"
    end
  end

  # def editable
  #   current_user.id == self.created_by || admin
  # end
end
