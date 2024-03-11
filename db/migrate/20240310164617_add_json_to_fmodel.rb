class AddJsonToFmodel < ActiveRecord::Migration[7.1]
  def change
    add_column :fmodels, :graph, :string
  end
end
