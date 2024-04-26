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
require "test_helper"

class FmodelTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
