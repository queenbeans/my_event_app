import styled from 'styled-components';
import React from 'react';

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #f5f5f7;
  border-radius: 12px;
  padding: 8px 16px;
  width: 100%;
  max-width: 500px;
  transition: all 0.2s ease-in-out;
  border: 1.5px solid transparent;

  &:focus-within {
    background: #ffffff;
    border-color: #0071e3;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  color: #1d1d1f;
  padding: 8px;

  &::placeholder {
    color: #86868b;
  }
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #86868b;
  transition: color 0.2s;

  &:hover {
    color: #0071e3;
  }
`;

export const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: () => void;
}) => {
  return (
    <SearchWrapper>
      <SearchInput
        type='text'
        placeholder='Search for an event by title...'
        onChange={onChange}
        value={value}
      />
      <SearchButton type='submit'>
        <svg
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <circle cx='11' cy='11' r='8'></circle>
          <line x1='21' y1='21' x2='16.65' y2='16.65'></line>
        </svg>
      </SearchButton>
    </SearchWrapper>
  );
};
