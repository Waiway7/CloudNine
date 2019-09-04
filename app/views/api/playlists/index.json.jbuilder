# @playlists.each do |playlist|
#     json.set! playlist.id
#     json.extract! playlist, :id, :creater_id, :title, :description, :created_at
#     playlist.tracks.with_attached_audio.with_attached_image.each do |track|
#             # json.imageUrl url_for(playlist.image)
#         json.set! track.id
#             json.extract! track,:id, :uploader_id, :title, :description, :created_at
#             json.audioUrl url_for(track.audio)
#             json.imageUrl url_for(track.image)
#         end
#     end
# end


@playlists.with_attached_image.each do |playlist|
    json.set! playlist.id do
        json.extract! playlist, :id, :creater_id, :title, :description, :created_at
        json.imageUrl url_for(playlist.image) if playlist.image.attached?
        json.track_ids playlist.tracks.ids
    end 
end