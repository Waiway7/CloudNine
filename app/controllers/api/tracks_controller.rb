class Api::TracksController < ApplicationController

    # before_action :require_to_be_logged, only: [:create, :update, :destroy]

    def show
        @track = Track.find(params[:id])
        render "api/tracks/show"
    end

    def create
        @track = Track.new(track_params)
        if @track.save
            render 'api/tracks/show'
        else 
            render json: @track, status: :unprocessable_entity
        end
    end

    def update
        @track = Track.find(params[:id])
        if @track.update(track_params)
            render "api/tracks/show"
        else
            render @track.errors.full_messages, status: 401
        end
    end

    def destroy
        @track = Track.find(params[:id])
        @track.destroy
        render 'api/tracks/show'
    end

    private
    def track_params
        params.require(:track).permit(:title, :description, :audio, :image, :uploader_id)
    end

end