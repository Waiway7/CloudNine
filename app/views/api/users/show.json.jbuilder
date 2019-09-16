json.partial! 'api/users/user', user: @user
json.trackIds @user.tracks.ids
json.playlistIds @user.playlists.ids

