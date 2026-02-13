import React, { Component, ErrorInfo, ReactNode } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  border: 1px solid red;
  border-radius: 8px;
  color: #721c24;
  background-color: #f8d7da;
`;

const StyledButton = styled.button`
  margin-top: 15px;
  padding: 8px 12px;
  cursor: pointer;
`;

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <Container>
            <h2>Something went wrong.</h2>
            <StyledButton onClick={() => window.location.reload()}>
              Reload Page
            </StyledButton>
          </Container>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
