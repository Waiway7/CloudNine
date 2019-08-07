
    json.partial! 'api/tracks/track', track: @track
    json.audioUrl url_for(@track.audio)
    if @track.image.attached? 
        json.imageUrl url_for(@track.image)
    else  
        json.imageUrl ""
    end

