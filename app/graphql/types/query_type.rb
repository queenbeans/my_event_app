# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :upcoming_events, [Types::EventType] do
      description "Returns a list of only upcoming events"
    end

    field :events, [Types::EventType] do
      description "Returns a list of all events"
    end

    def upcoming_events
      Event.upcoming.published_events.by_start_time
    end

    def events
      Event.all.by_start_time
    end
  end
end
