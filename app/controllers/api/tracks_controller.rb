require 'open-uri'
class Api::TracksController < ApplicationController

    # before_action :require_to_be_logged, only: [:create, :update, :destroy]
    # testing
    def index
        @tracks = Track.with_attached_audio.with_attached_image.includes(:uploader).where(uploader_id: params[:user_id])
        if @tracks
            render "api/users/show_tracks"
        else 
            render ["User does not exist! Please try again."], status: 404
        end
    end
    #testing
    def show
        @track = Track.find(params[:id])
        render "api/tracks/show"
    end

    def create
        @track = Track.new(track_params)
        if !@track.image.attached?
            file = open('https://cloudnine-upload-dev.s3.amazonaws.com/starecat.jpg')
            @track.image.attach(io: file, filename: 'starecat.jpg')
        end
        if @track.save
            render 'api/tracks/show'
        else 
            render json: @track, status: :unprocessable_entity
        end
    end

    def update
        @track = Track.find(params[:id])
        if (@track.image.attached?)
            @track.image.purge
        end
        @track.image.attach(image_param[:image])
        if @track.update(no_blob_params)

            render "api/tracks/show"
        else
            render @track.errors.full_messages, status: 401
        end
    end

    def destroy
        @track = Track.find(params[:id])
        @track.destroy
        render "api/tracks/show"
    end

    private
    def track_params
        params.require(:track).permit(:title, :description, :playlist_id, :audio, :image, :uploader_id)
    end

    def no_blob_params
        params.require(:track).permit(:title, :description, :playlist_id, :uploader_id)
    end

    def image_param
        params.require(:track).permit(:image)
    end

end