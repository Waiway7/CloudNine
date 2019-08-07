Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, default: {format: :json} do
    resources :users, only: [:create, :show] do
      resources :tracks, only: [:index]
    end
    resource :session, only: [:create, :destroy]
    resources :tracks, only: [:create, :update, :destroy, :show]
  end
end
