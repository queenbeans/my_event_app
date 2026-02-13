import React from 'react';
import { createRoot } from 'react-dom/client';
import { Events } from '../components/Events/Events';
import ErrorBoundary from '../components/ErrorBoundary';
import { ApolloProvider } from '@apollo/client/react';
import client from '../utils/apolloClient';
import { PageLayout } from '../styles';

const EventsRoot = () => (
  <PageLayout>
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <Events />
      </ApolloProvider>
    </ErrorBoundary>
  </PageLayout>
);

const container = document.getElementById('root');

if (container) {
  createRoot(container).render(<EventsRoot />);
}
