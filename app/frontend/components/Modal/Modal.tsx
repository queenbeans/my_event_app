import React, { Children } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(47, 53, 66, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;

  animation: fadeIn 0.2s ease-out;
`;

const ModalContainer = styled.div`
  background: white;
  width: 90%;
  max-width: 500px;
  border-radius: 24px;
  padding: 32px;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease-out;

  h2 {
    margin: 0 0 16px 0;
    font-size: 1.5rem;
    color: #2f3542;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const ModalCloseButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: #f1f2f6;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #747d8c;
  transition: background 0.2s;
`;

const ModalBody = styled.div`
  color: #57606f;
  line-height: 1.6;
  margin-bottom: 24px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const Modal = ({
  headerText,
  body,
  onClose,
}: {
  headerText: string;
  body: React.ReactNode;
  onClose: () => void;
}) => {
  return (
    <ModalOverlay>
      <ModalCloseButton onClick={onClose}>✕</ModalCloseButton>
      <ModalContainer>
        <h2>{headerText}</h2>
        <ModalBody>{body}</ModalBody>
      </ModalContainer>
    </ModalOverlay>
  );
};
