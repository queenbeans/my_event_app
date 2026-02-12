import React from 'react';
import { createRoot } from 'react-dom/client';
import { Events } from '../components/Events/Events';
import ErrorBoundary from '../components/ErrorBoundary';
import { ApolloProvider } from '@apollo/client/react';
import client from '../utiles/apolloClient';

const EventsRoot = () => (
  <ErrorBoundary>
    <ApolloProvider client={client}>
      <Events />
    </ApolloProvider>
  </ErrorBoundary>
);

const container = document.getElementById('root');

if (container) {
  createRoot(container).render(<EventsRoot />);
}
