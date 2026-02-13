import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.div<{ type: ToastType }>`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  min-width: 320px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);

  border-left: 6px solid
    ${(props) => (props.type === "success" ? "#00b894" : "#ff7675")};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.span`
  font-weight: 800;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #2f3542;
`;

const Message = styled.p`
  margin: 0;
  color: #57606f;
  font-size: 0.95rem;
  line-height: 1.4;
`;

type ToastType = "success" | "alert";

interface ToastProps {
  message: string;
  type: ToastType;
  onExpiry: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onExpiry }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onExpiry();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onExpiry]);

  return (
    <Container type={type}>
      <Content>
        <Title>{type === "success" ? "Success" : "Attention"}</Title>
        <Message>{message}</Message>
      </Content>
    </Container>
  );
};
