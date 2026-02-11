import React from 'react';
import styled from 'styled-components';
import { GET_UPCOMING_EVENTS, UpcomingEvents } from './queries';
import { useQuery } from '@apollo/client/react';

const StyledDiv = styled.div`
  background-color: red;
`;

export const Events = () => {
  const events = useQuery<UpcomingEvents>(GET_UPCOMING_EVENTS);

  if (events.data == null) return null;

  return events.data.upcomingEvents.map((event) => (
    <StyledDiv key={`event-${event.id}`}>{event.title}</StyledDiv>
  ));
};
