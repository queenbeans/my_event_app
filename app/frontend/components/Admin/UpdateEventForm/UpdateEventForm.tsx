import React from "react";

import { useMutation } from "@apollo/client/react";
import { Event, UPDATE_EVENT } from "../queries";
import styled from "styled-components";
import { DateTime } from "luxon";

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

export const UpdateEventForm = ({
  event,
  onSuccess,
}: {
  event: Event;
  onSuccess: () => void;
}) => {
  // also going to restrict min date here using min property on date input
  const [startDate, setStartDate] = React.useState<string | null>();
  const [updateEventMutation] = useMutation(UPDATE_EVENT);
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!formRef.current) return;

      const formData = new FormData(formRef.current);
      const data = {
        id: event.id,
        ...Object.fromEntries(formData.entries()),
      } as Event | { published: "true" | "false" };

      await updateEventMutation({
        variables: {
          ...data,
          published: data.published === "true",
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
          type="text"
          name="title"
          placeholder="e.g. Annual Tech Gala"
          defaultValue={event.title}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label>Description</Label>
        <TextArea
          name="description"
          placeholder="Something to hype people up!"
          defaultValue={event.description}
        />
      </FormGroup>

      <FormGroup>
        <Label>Location</Label>
        <Input
          type="text"
          name="location"
          defaultValue={event.location}
          placeholder="e.g. Dahntahn"
          required
        />
      </FormGroup>

      <DatePickerContainer>
        <FormGroup>
          <Label>Start Time</Label>
          <Input
            name="startTime"
            type="date"
            defaultValue={DateTime.fromISO(event.startTime).toISODate() || ""}
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
          <Input
            name="endTime"
            type="date"
            defaultValue={DateTime.fromISO(event.endTime).toISODate() || ""}
            // @ts-ignore I am also going to ignore this type warning about the startDate
            min={startDate}
            required
          />
        </FormGroup>
      </DatePickerContainer>

      <FormGroup>
        <Label>Visibility Setting</Label>
        <SegmentedControl>
          <RadioWrapper>
            <HiddenRadio
              type="radio"
              name="published"
              value="true"
              id="public"
              defaultChecked
            />
            <SegmentLabel htmlFor="public">Published</SegmentLabel>
          </RadioWrapper>
          <RadioWrapper>
            <HiddenRadio
              type="radio"
              name="published"
              value="false"
              id="private"
            />
            <SegmentLabel htmlFor="private">Hidden</SegmentLabel>
          </RadioWrapper>
        </SegmentedControl>
      </FormGroup>

      <Footer>
        <SubmitButton type="submit">Update Event</SubmitButton>
      </Footer>
    </FormContainer>
  );
};
