class AddIndexToTable < ActiveRecord::Migration[5.2]
  def change
    add_index :playlist_tracks, :playlist_id
    add_index :playlist_tracks, :track_id
    add_index :playlist_tracks, [:playlist_id, :track_id], unique: true
  end
end
