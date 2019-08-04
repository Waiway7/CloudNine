@user.tracks.each do |track|
    json.set! track.id do 
        json.extract! track, :id, :title, :description, :uploader_id 
        # json.imageUrl url_for(track.image)
        # json.audioUrl url_for(track.audio)
    end
end