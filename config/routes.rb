Rails.application.routes.draw do
  #Graphql isn't needed for this project, but I prefer it over rest 
  # And subscriptions, which make use of websockets allow for live updates in the UI after data mutations
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"

  get "admin/index"
  get "events/index"

  get "up" => "rails/health#show", as: :rails_health_check
end
