# == Schema Information
#
# Table name: follows
#
#  id         :integer          not null, primary key
#  follows    :integer
#  user       :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Follow < ApplicationRecord
  paginates_per = 10  #set pagination limit

  # @following = Follow.where(user: @user.id)

  def getUsername
    # puts "========================================"
    # puts "#{User.find_by_id(self.follows).email}"
    User.find_by_id(self.follows).username
  end
end
