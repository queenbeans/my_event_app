Rails.application.routes.draw do
  # Kept routes pretty simple. Events is the root page for this app, which serves to both hide all the boilerplate rails code I didn't take the time to remove
  # and to easily get to the page
  #Graphql isn't needed for this project, but I prefer it over rest 
  # And subscriptions, which make use of websockets allow for live updates in the UI after data mutations
  root "events#index"
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"

  resources :admin
  resources :events

  get "up" => "rails/health#show", as: :rails_health_check
end
