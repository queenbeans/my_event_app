# frozen_string_literal: true

module Mutations
  class DeleteEvent < BaseMutation
    argument :id, ID, required: true

    field :id, ID, null: true
    field :errors, [String], null: false

    def resolve(id:)
      event = Event.find(id)
      
      if event.destroy
        { id: id, errors: [] }
      else
        { id: nil, errors: event.errors.full_messages }
      end
    end
  end
end
