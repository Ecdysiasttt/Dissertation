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

  # user is the origin, follows is the target. e.g.:
  # harry scutt (id: 1) follows claire herbert (id: 2):
  # user: 1, follows: 2

  def getUsernameTarget
    # puts "========================================"
    # puts "#{User.find_by_id(self.follows).email}"
    User.find_by_id(self.follows).username
  end

  def getUsernameOrigin
    User.find_by_id(self.user).username
  end
  
  # def isFollowingCurrentUser
  #   User.current.present? && User.current.id == self.follows
  # end

  # def isCurrentUserFollowing
  #   User.current.present? && User.current.id == self.user
  # end

end
