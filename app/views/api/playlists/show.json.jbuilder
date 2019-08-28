json.set! @playlist.id do
    json.extract! @playlist, :id, :creater_id, :title, :description, :created_at
    json.track_ids @playlist.tracks.ids
end 

