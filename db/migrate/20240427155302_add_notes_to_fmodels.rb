class AddNotesToFmodels < ActiveRecord::Migration[7.1]
  def change
    add_column :fmodels, :notes, :string
  end
end
