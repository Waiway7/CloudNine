json.partial! 'api/tracks/track', track: @track
json.audioUrl url_for(@track.audio)
json.imageUrl url_for(@track.image)


