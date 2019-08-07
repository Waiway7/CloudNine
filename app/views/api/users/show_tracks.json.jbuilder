
@tracks.each do |track|
    json.set! track.id do 
        json.extract! track, :id, :title, :description, :uploader_id 
        json.audioUrl url_for(track.audio)
        if track.image.attached? 
            json.imageUrl url_for(track.image)
        else  
            json.imageUrl ""
        end
    end
end
