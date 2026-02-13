import React from 'react';

import { useMutation } from '@apollo/client/react';
import { Event, CREATE_EVENT, GET_EVENTS } from '../queries';
import styled from 'styled-components';
import { min } from 'rxjs';
import { DateTime } from 'luxon';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 0.9rem;
  color: #2f3542;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid #f1f2f6;
  border-radius: 12px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #6c5ce7;
  }
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  border: 2px solid #f1f2f6;
  border-radius: 12px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #6c5ce7;
  }
`;

const SegmentedControl = styled.div`
  display: flex;
  background: #f1f2f6;
  padding: 4px;
  border-radius: 12px;
  gap: 4px;
`;

const RadioWrapper = styled.div`
  flex: 1;
`;

const HiddenRadio = styled.input`
  display: none;

  // Definitely got this selector styling using AI, wanted something that looked nicer than radio buttons
  &:checked + label {
    background: white;
    color: #6c5ce7;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  }
`;

const SegmentLabel = styled.label`
  display: block;
  text-align: center;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  color: #747d8c;
  transition: all 0.2s ease;

  &:hover {
    color: #2f3542;
  }
`;

const Footer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
`;

const SubmitButton = styled.button`
  background-color: #6c5ce7;
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    background-color: #5b4cc4;
    transform: translateY(-2px);
  }
`;

const DatePickerContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: stretch;
`;

export const CreateEventForm = ({ onSuccess }: { onSuccess: () => void }) => {
  // to prevent selection of end date before start date, we'll want to store the start date as a state variable
  const [startDate, setStartDate] = React.useState<string | null>();
  const [createEventMutation] = useMutation(CREATE_EVENT, {
    // This tells Apollo to re-run your list query after creating a new event
    refetchQueries: [{ query: GET_EVENTS }],
  });
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!formRef.current) return;

      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData.entries()) as
        | Event
        | { published: 'true' | 'false' };

      await createEventMutation({
        variables: {
          ...data,
          published: data.published === 'true',
        },
      });

      onSuccess();
    },
    [],
  );

  return (
    <FormContainer ref={formRef} onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Event Title</Label>
        <Input
          type='text'
          name='title'
          placeholder='e.g. Annual Tech Gala'
          required
        />
      </FormGroup>

      <FormGroup>
        <Label>Description</Label>
        <TextArea
          name='description'
          placeholder='Something to hype people up!'
        />
      </FormGroup>

      <FormGroup>
        <Label>Location</Label>
        <Input
          type='text'
          name='location'
          placeholder='e.g. Dahntahn'
          required
        />
      </FormGroup>

      <DatePickerContainer>
        <FormGroup>
          <Label>Start Time</Label>
          <Input
            name='startTime'
            type='date'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const newStartDate = e.target.value;
              const minDate = DateTime.fromISO(newStartDate).plus({ days: 1 });
              setStartDate(minDate.toISODate());
            }}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>End Time</Label>
          {/* @ts-ignore gonna ignore this type def warning*/}
          <Input name='endTime' type='date' min={startDate} required />
        </FormGroup>
      </DatePickerContainer>

      <FormGroup>
        <Label>Visibility Setting</Label>
        <SegmentedControl>
          <RadioWrapper>
            <HiddenRadio
              type='radio'
              name='published'
              value='true'
              id='public'
            />
            <SegmentLabel htmlFor='public'>Published</SegmentLabel>
          </RadioWrapper>
          <RadioWrapper>
            <HiddenRadio
              type='radio'
              name='published'
              value='false'
              id='private'
            />
            <SegmentLabel htmlFor='private'>Hidden</SegmentLabel>
          </RadioWrapper>
        </SegmentedControl>
      </FormGroup>

      <Footer>
        <SubmitButton type='submit'>Create Event</SubmitButton>
      </Footer>
    </FormContainer>
  );
};
