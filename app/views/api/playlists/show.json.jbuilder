json.set! @playlist.id do
    json.extract! @playlist, :id, :creater_id, :title, :description, :created_at
    json.imageUrl url_for(@playlist.image) if @playlist.image.attached?
    json.track_ids @playlist.tracks.ids
end 

