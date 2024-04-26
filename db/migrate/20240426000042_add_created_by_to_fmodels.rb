class AddCreatedByToFmodels < ActiveRecord::Migration[7.1]
  def change
    add_column :fmodels, :created_by, :integer
  end
end
