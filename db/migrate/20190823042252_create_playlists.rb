class CreatePlaylists < ActiveRecord::Migration[5.2]
  def change
    create_table :playlists do |t|
      t.string :title, null: false
      t.integer :creater_id, null: false

      t.timestamps
    end

    add_index :playlists, :title
    add_index :playlists, :creater_id
  end
end
