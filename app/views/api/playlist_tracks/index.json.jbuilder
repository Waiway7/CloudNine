@playlists.each do |playlist|
    json.set! playlist.id do
        playlist.tracks.with_attached_audio.with_attached_image.each do |track|
            json.set! track.id do
                json.extract! track, :id, :uploader_id, :title, :description, :created_at
                json.audioUrl url_for(track.audio)
                json.imageUrl url_for(track.image)
            end
        end
    end
end

