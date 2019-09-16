Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :index] do
      resources :tracks, only: [:index]
      resources :playlists, only: [:index, :show]
      resources :playlist_tracks, only: [:index, :show]
    end
    resource :session, only: [:create, :destroy]
    resources :tracks, only: [:create, :update, :destroy, :show]
    resources :playlists, only: [:create, :update, :destroy]
    resources :playlist_tracks, only: [:create] do
      delete :destroy, on: :collection
    end
  end
end
