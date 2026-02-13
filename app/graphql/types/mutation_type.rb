# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :create_event, mutation: Mutations::CreateEvent
    field :delete_event, mutation: Mutations::DeleteEvent
    field :update_event, mutation: Mutations::UpdateEvent
  end
end
