class CreateFmodels < ActiveRecord::Migration[7.1]
  def change
    create_table :fmodels do |t|
      t.string :title

      t.timestamps
    end
  end
end