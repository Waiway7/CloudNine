class Api::PlaylistTracksController < ApplicationController

    def index
        @playlists = Playlist.all.where(creater_id: params[:user_id])
        render "api/playlist_tracks/index"
    end

    def show
        @playlist = Playlist.find_by(id: params[:id])
        render "api/playlist_tracks/show"
    end

    def create 
        if (params[:track_id].length == 1)
            @playlist_track = PlaylistTrack.new(playlist_id: params[:playlist_id], track_id: params[:track_id][0])
            if @playlist_track.save 
                @playlist = @playlist_track.playlist
                render "api/playlists/show"
            else 
                render json: @playlist_track.errors.full_messages, status: 422
            end
        else 
            params[:track_id].each.with_index do |track_id, idx|
                @playlist_track = PlaylistTrack.new(playlist_id: params[:playlist_id], track_id: params[:track_id][idx])
                if @playlist_track.save
                else
                    return render json: @playlist_track.errors.full_messages, status: 422
                end
            end
            @playlist = @playlist_track.playlist
            render "api/playlists/show"
        end
    end

    def destroy
        
        @playlist_track = PlaylistTrack.find_by(
                playlist_id: params[:playlistId],
                track_id: params[:trackId]
        )
        @playlist_track.destroy
        @playlist = @playlist_track.playlist
        render json: @playlist_track
    end

    private
    def playlist_track_params
        params.require(:playlist_track).permit(:playlist_id, :track_id)
    end

end
