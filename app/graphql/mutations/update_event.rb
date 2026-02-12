# frozen_string_literal: true

module Mutations
  class UpdateEvent < BaseMutation
    field :event, Types::EventType, null: true
    field :errors, [String], null: false

    argument :id, ID, required: true
    argument :name, String, required: false
    argument :start_time, GraphQL::Types::ISO8601DateTime, required: false
    argument :end_time, GraphQL::Types::ISO8601DateTime, required: false
    argument :published, Boolean, required: false
    argument :location, String, required: false
    argument :description, String, required: false

    def resolve(id:, **attributes)
      event = Event.find(id)

      return {event: event, errors: []} if event.update(attributes)

      {event: nil, errors: event.errors.full_messages}
    end
  end
end
