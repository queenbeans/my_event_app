import React from 'react';
import styled from 'styled-components';
import { GET_UPCOMING_EVENTS, UpcomingEvents } from './queries';
import { useQuery } from '@apollo/client/react';

const EventRow = styled.div`
  display: flex;
  column-gap: 8px;
  margin-bottom: 8px;
`;
const StyledDiv = styled.div`
  background-color: red;
`;

export const Events = () => {
  const events = useQuery<UpcomingEvents>(GET_UPCOMING_EVENTS);

  if (events.data == null) return null;

  return events.data.upcomingEvents.map((event) => (
    <EventRow key={`event-${event.id}`}>
      <StyledDiv>{event.title}</StyledDiv>
      <StyledDiv>{event.startTime}</StyledDiv>
      <StyledDiv>{event.endTime}</StyledDiv>
      {event.location && <StyledDiv>{event.location}</StyledDiv>}
    </EventRow>
  ));
};
