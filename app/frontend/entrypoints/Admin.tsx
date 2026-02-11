import React from 'react';
import { createRoot } from 'react-dom/client';
import { Events } from '../components/Events/Events';
import ErrorBoundary from '../components/ErrorBoundary';

const App = () => (
  <ErrorBoundary>
    <Events />
  </ErrorBoundary>
);

const container = document.getElementById('root');

if (container) {
  createRoot(container).render(<App />);
}
