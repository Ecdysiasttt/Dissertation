class CreateFollows < ActiveRecord::Migration[7.1]
  def change
    create_table :follows do |t|
      t.integer :user
      t.integer :follows

      t.timestamps
    end
  end
end
