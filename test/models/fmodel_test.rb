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
require "test_helper"

class FmodelTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
