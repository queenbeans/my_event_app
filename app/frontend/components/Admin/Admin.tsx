// @ts-nocheck
import React from 'react';
import {
  Events,
  Event,
  GET_EVENTS,
  DELETE_EVENT,
  SEARCH_EVENTS,
} from './queries';
import { useMutation, useQuery } from '@apollo/client/react';
import { AdminTable, AdminTableContainer } from '../../styles';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import { Modal } from '../Modal/Modal';
import { UpdateEventForm } from './UpdateEventForm/UpdateEventForm';
import { CreateEventForm } from './CreateEventForm/CreateEventForm';
import { Toast } from '../Toast/Toast';
import { SearchBar } from '../SearchBar/SearchBar';

const AdminEventsPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

const EventCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;

  & img {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    object-fit: cover;
  }
`;

const StyledTableRow = styled.tr`
  &:hover {
    background: #f1f2f6;
  }
`;

const StyledButton = styled.div`
  background: none;
  border: 1px solid #f1f2f6;
  padding: 6px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &.edit:hover {
    color: #747d8c;
  }

  &.delete:hover {
    color: white;
    background: #ff7675;
    border-color: #ff7675;
  }

  &:hover {
    background: #f1f2f6;
    transform: translateY(-2px);
  }
`;

const CTAGroup = styled.div`
  display: flex;
  gap: 8px;

  & button {
    background: none;
    border: 1px solid #f1f2f6;
    padding: 6px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
  }
`;

const CreateEventButton = styled(StyledButton)`
  background: #2f3542;
  color: white;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;

  &:hover {
    background: #57606f;
  }

  width: fit-content;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Admin = () => {
  let eventsData = useQuery<Events>(GET_EVENTS);
  const [deleteEvent] = useMutation(DELETE_EVENT, {
    update(cache, { data }) {
      // @ts-ignore -- gonna ignore some of these ts errors in the interest of time
      const deletedId = data?.deleteEvent.id;

      if (deletedId) {
        const cacheId = cache.identify({ id: deletedId, __typename: 'Event' });

        cache.evict({ id: cacheId });

        cache.gc();
      }
    },
  });

  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null);
  const [showSuccessToast, setShowSuccessToast] = React.useState(false);
  const [showErrorToast, setShowErrorToast] = React.useState(false);
  const [showDeleteToast, setShowDeleteToast] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  // always debounce to prevent people from overloading servers with requests
  const [debouncedTerm, setDebouncedTerm] = React.useState('');

  const searchEventsData = useQuery<Events>(SEARCH_EVENTS, {
    variables: { title: debouncedTerm },
  });

  // @ts-ignore
  if (searchEventsData.data) {
    eventsData = searchEventsData.data?.searchEvents;
  } else eventsData = eventsData.data?.events;

  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(searchTerm), 300);
    return () => clearTimeout(timer); // Reset timer if user types again before 300ms
  }, [searchTerm]);

  return (
    <AdminEventsPageContainer>
      {showDeleteToast && (
        <Toast
          type='success'
          message='Your event has been deleted'
          onExpiry={() => setShowDeleteToast(false)}
        />
      )}
      {showSuccessToast && (
        <Toast
          type='success'
          message='Your request has been processed.'
          onExpiry={() => setShowSuccessToast(false)}
        />
      )}
      {showErrorToast && (
        <Toast
          type='alert'
          message='Something went wrong. Please try again'
          onExpiry={() => setShowErrorToast(false)}
        />
      )}
      <HeaderContainer>
        <h2>Manage Events</h2>
        <CreateEventButton
          onClick={() => {
            setShowCreateModal(true);
          }}
        >
          Create Event
        </CreateEventButton>
      </HeaderContainer>
      <SearchBar
        type='text'
        placeholder='Search events...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {showCreateModal && (
        <Modal
          headerText='Create a new event'
          body={
            <CreateEventForm
              onSuccess={() => {
                setShowCreateModal(false);
                setShowSuccessToast(true);
              }}
            />
          }
          onClose={() => {
            setShowCreateModal(false);
          }}
        />
      )}
      {showEditModal && selectedEvent && (
        <Modal
          headerText='Manage this event'
          body={
            <UpdateEventForm
              event={selectedEvent}
              onSuccess={() => {
                setShowEditModal(false);
                setShowSuccessToast(true);
              }}
            />
          }
          onClose={() => {
            setShowEditModal(false);
            setSelectedEvent(null);
          }}
        />
      )}

      {!eventsData ||
        (eventsData?.length <= 0 && (
          <div>
            There aren't any events that match your query. Try searching for
            something else!
          </div>
        ))}
      {eventsData && eventsData.length > 0 && (
        <AdminTableContainer>
          <AdminTable>
            <thead>
              <tr>
                <th>Event</th>
                <th>Dates</th>
                {eventsData.some((event) => event.location) && (
                  <th>Location</th>
                )}
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {eventsData.map((event) => (
                <StyledTableRow key={`event-${event.id}`}>
                  <td>
                    <EventCell>
                      <img src='https://media.istockphoto.com/id/479977238/photo/table-setting-for-an-event-party-or-wedding-reception.jpg?s=612x612&w=0&k=20&c=yIKLzW7wMydqmuItTTtUGS5cYTmrRGy0rXk81AltdTA=' />
                      <span>{event.title}</span>
                    </EventCell>
                  </td>
                  <td>
                    {`${DateTime.fromISO(event.startTime).toFormat('LLL dd, yyyy')} - ${DateTime.fromISO(event.endTime).toFormat('LLL dd, yyyy')}`}
                  </td>
                  {event.location ? <td>{event.location}</td> : <td></td>}
                  <td>
                    <span>
                      {event.published == true ? 'Published' : 'Not Published'}
                    </span>
                  </td>
                  <td>
                    <CTAGroup>
                      <StyledButton
                        onClick={() => {
                          setShowEditModal(true);
                          setSelectedEvent(event);
                        }}
                        className='edit'
                      >
                        Edit
                      </StyledButton>
                      <StyledButton
                        onClick={() => {
                          deleteEvent({ variables: { id: event.id } });
                          setShowDeleteToast(true);
                        }}
                        className='delete'
                      >
                        Delete
                      </StyledButton>
                    </CTAGroup>
                  </td>
                </StyledTableRow>
              ))}
            </tbody>
          </AdminTable>
        </AdminTableContainer>
      )}
    </AdminEventsPageContainer>
  );
};
