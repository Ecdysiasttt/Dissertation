# == Schema Information
#
# Table name: fmodels
#
#  id         :integer          not null, primary key
#  created_by :integer
#  graph      :string
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Fmodel < ApplicationRecord
  paginates_per = 10  #set pagination limit

  def getCreator()
    creator = ""
    if self.created_by.nil?
      creator = "Guest"
    else
      creator = User.find_by(id: self.created_by).username
    end
    creator
  end

end
