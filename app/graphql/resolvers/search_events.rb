module Resolvers
  class SearchEvents < BaseResolver
    description "Search events by title"

    type [Types::EventType], null: false

    argument :title, String, required: false

    def resolve(title: nil)
      scope = Event.all
      scope = scope.where("title LIKE ?", "%#{title}%") if title.present?
      scope
    end
  end
end