class AddPublicToFmodels < ActiveRecord::Migration[7.1]
  def change
    add_column :fmodels, :public, :boolean
  end
end
