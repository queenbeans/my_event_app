// I typically employ fragments https://www.apollographql.com/docs/react/data/fragments
// Also codegen because it helps to automate maintenance of type defs on the FE for type safety. Again, omitting here
// But to keep this exercise within a resonable time frame, I'm omitting them
import {gql} from "@apollo/client";

export const GET_UPCOMING_EVENTS = gql`
    query GetUpcomingEvents {
        upcomingEvents {
            id
            title
            startTime
            endTime
            location
        }
    }
`;

// Just for the sake of time, I'll manually define a type def for event
export type Event = {
    id: string,
    title: string,
    startTime: Date,
    endTime: Date,
    location?: string
}

export interface UpcomingEvents {
    upcomingEvents: Event[]
}
