# frozen_string_literal: true

module Mutations
  class CreateEvent < BaseMutation
    field :event, Types::EventType, null: true
    field :errors, [String], null: false

    argument :name, String, required: false
    argument :start_time, GraphQL::Types::ISO8601DateTime, required: false
    argument :end_time, GraphQL::Types::ISO8601DateTime, required: false
    argument :published, Boolean, required: false
    argument :location, String, required: false
    argument :description, String, required: false
    argument :title, String, required: false

    def resolve(**attributes)
      event = Event.new(attributes)

      return {event: event, errors: []} if event.save

      {event: nil, errors: event.errors.full_messages}
    end
  end
end
