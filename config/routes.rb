Rails.application.routes.draw do
  # get 'users/index'
  devise_for :users, controllers: { 
                                :sessions => "users/sessions",
                                :registrations => "users/registrations"
                                  }
  resources :fmodels
  resources :users, :only => [:show, :index]
  # resources :follows, only: [:destroy, :create] # allows following/unfollowing
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root "index#index"

  match '/users/:id', to: 'users#show', via: 'get'
  # destroy user
  match '/users/:id', to: 'users#destroy', via: 'delete'
  match '/follows', to: 'follows#create', via: 'post'
  match '/follows/:id', to: 'follows#create', via: 'post'
  match '/follows/:id', to: 'follows#destroy', via: 'delete'

  get 'fmodels/:id/analysis', to: 'fmodels#analysis', as: 'analysis_results'

end
