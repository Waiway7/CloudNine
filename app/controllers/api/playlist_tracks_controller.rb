class Api::PlaylistTracksController < ApplicationController

    def index
        @playlists = Playlist.all
        render "api/playlist_tracks/index"
    end

    def show
        @playlist = Playlist.find_by(id: params[:id])
        render "api/playlist_tracks/show"
    end

    def create 
        @playlist_track = PlaylistTrack.new(playlist_track_params)
        if @playlist_track.save 
            render "api/playlists/show"
        else 
            render json: @playlist_track.errors.full_messages, status: 422
        end
    end

    def destroy
        @playlist_track = Track.find_by(
                params[:playlist_track][:playlist_id],
                params[:playlist_track][:track_id]
                )
        @playlist_track.destroy
        render "api/playlists/show"
    end

    private
    def playlist_track_params
        params.require(:playlist_track).permit(:playlist_id, :track_id)
    end

end
