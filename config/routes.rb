Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show] do
      resources :tracks, only: [:index]
    end
    resource :session, only: [:create, :destroy]
    resources :tracks, only: [:index, :create, :update, :destroy, :show]
    resources :playlists, only: [:index, :show, :create, :update, :destroy]
    resources :playlist_tracks, only: [:index, :show, :create, :destroy]
  end
end
