# == Schema Information
#
# Table name: fmodels
#
#  id         :integer          not null, primary key
#  graph      :string
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Fmodel < ApplicationRecord
end
