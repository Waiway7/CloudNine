class Api::PlaylistsController < ApplicationController
    def index 
        @playlists = Playlist.with_attached_image.all
        render "api/playlists"
    end

    def show
        @playlist = Playlist.find(params[:id])
        render "api/playlists/show"
    end
    
    def create

    end

    def update

    end

    def destroy

    end

    private

    def playlist_params
end
