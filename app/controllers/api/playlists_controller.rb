require 'open-uri'

class Api::PlaylistsController < ApplicationController
    def index
        @playlists = Playlist.all.where(creater_id: params[:user_id])
        @creater_id = params[:user_id]
        render "api/playlists/index"
    end

    def show
        @playlist = Playlist.with_attached_image.find_by(id: params[:id])
        render "api/playlists/show"
    end
    
    def create
        @playlist = Playlist.new(create_params)
        if @playlist.save
            render "api/playlists/show"
        else 
            render ["Something went wrong please try again", "Please enter a valid title"], status: 404
        end
    end

    def update
        @playlist = Playlist.find(params[:id])
        # @playlist_tracks = PlaylistTracks.where(playlist_id: params[:id], track_id: params[:track][:id]);
        # if !params[:playlist][:image].include?('/rails/active_storage')
        #     @playlist.image.purge
        #     @playlist.image.attach(params[:playlist][:image])
        # end
        if !(params[:playlist][:image].instance_of? String)
            @playlist.image.purge
            @playlist.image.attach(params[:playlist][:image])
        end
        if @playlist.update(playlist_params)
            render "api/playlists/show"
        else 
            render @playlist.errors.full_messages, status: 401
        end    
    end

    def destroy
        @playlist = Playlist.find(params[:id])
        @playlist.destroy
        render "api/playlists/show"
    end

    private
    
    def create_params
        params.require(:playlist).permit(:creater_id, :title)
    end

    def playlist_params
        params.require(:playlist).permit(:title, :description)
    end
end
