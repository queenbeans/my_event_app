import React from 'react';
import { GET_UPCOMING_EVENTS, UpcomingEvents } from './queries';
import { useQuery } from '@apollo/client/react';
import {
  CTAButton,
  EmptyStateContainer,
  EmptyStateContent,
  EmptyStateIcon,
  EventCard,
  EventCardContent,
  EventCardDate,
  EventCardDescription,
  EventCardLocation,
  EventCardTitle,
  EventGrid,
  EventImage,
  EventsPageLayout,
} from '../../styles';

import { DateTime } from 'luxon';

export const Events = () => {
  const events = useQuery<UpcomingEvents>(GET_UPCOMING_EVENTS);

  if (!events.data || !events.data.upcomingEvents.length)
    return (
      <EmptyStateContainer>
        <EmptyStateContent>
          <EmptyStateIcon>😶</EmptyStateIcon>
          <h2>There Are No Upcoming Events</h2>
          <p>Check again later! We're always hosting cool events!</p>
        </EmptyStateContent>
      </EmptyStateContainer>
    );

  return (
    <EventsPageLayout>
      <h2>Upcoming Events</h2>
      <EventGrid>
        {events.data.upcomingEvents.map((event) => (
          <EventCard key={`event-${event.id}`}>
            <EventImage>
              <img src='https://media.istockphoto.com/id/479977238/photo/table-setting-for-an-event-party-or-wedding-reception.jpg?s=612x612&w=0&k=20&c=yIKLzW7wMydqmuItTTtUGS5cYTmrRGy0rXk81AltdTA=' />
              <EventCardDate>
                {`${DateTime.fromISO(event.startTime).toFormat('LLL dd, yyyy')} - ${DateTime.fromISO(event.endTime).toFormat('LLL dd, yyyy')}`}
              </EventCardDate>
            </EventImage>
            <EventCardContent>
              <EventCardTitle>{event.title}</EventCardTitle>
              <EventCardLocation>
                {event.location && <td>{event.location}</td>}
              </EventCardLocation>
              {event.description && (
                <EventCardDescription>{event.description}</EventCardDescription>
              )}

              <CTAButton href='#'>Get Tickets</CTAButton>
            </EventCardContent>
          </EventCard>
        ))}
      </EventGrid>
    </EventsPageLayout>
  );
};
