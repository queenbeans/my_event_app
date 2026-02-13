// I typically employ fragments https://www.apollographql.com/docs/react/data/fragments
// Also codegen because it helps to automate maintenance of type defs on the FE for type safety. Again, omitting here
// But to keep this exercise within a resonable time frame, I'm omitting them
import { gql } from "@apollo/client";

export const GET_EVENTS = gql`
  query GetEvents {
    events {
      id
      title
      startTime
      endTime
      location
      description
      published
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation UpdateEvent(
    $id: ID!
    $title: String
    $location: String
    $published: Boolean
    $description: String
    $startTime: ISO8601DateTime
    $endTime: ISO8601DateTime
  ) {
    updateEvent(
      input: {
        id: $id
        title: $title
        location: $location
        description: $description
        published: $published
        startTime: $startTime
        endTime: $endTime
      }
    ) {
      event {
        id
        title
        published
        startTime
        endTime
        description
        location
      }
      errors
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation UpdateEvent(
    $title: String
    $location: String
    $published: Boolean
    $description: String
    $startTime: ISO8601DateTime
    $endTime: ISO8601DateTime
  ) {
    createEvent(
      input: {
        title: $title
        location: $location
        description: $description
        published: $published
        startTime: $startTime
        endTime: $endTime
      }
    ) {
      event {
        id
        title
        published
        startTime
        endTime
        description
        location
      }
      errors
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(input: { id: $id }) {
      id
      errors
    }
  }
`;

export const SEARCH_EVENTS = gql`
  query SearchEvents($title: String) {
    searchEvents(title: $title) {
      id
      title
      startTime
      location
    }
  }
`;

// Just for the sake of time, I'll manually define a type def for event
export type Event = {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  location?: string;
  description?: string;
  published: boolean;
};

export interface Events {
  events: Event[];
}
