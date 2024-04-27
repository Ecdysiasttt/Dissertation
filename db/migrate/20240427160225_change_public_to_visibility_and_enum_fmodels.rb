class ChangePublicToVisibilityAndEnumFmodels < ActiveRecord::Migration[7.1]
  def change
    remove_column :fmodels, :public, :boolean
    add_column :fmodels, :visibility, :integer, default: 0
  end
end
