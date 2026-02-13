import React from "react";
import { createRoot } from "react-dom/client";
import ErrorBoundary from "../components/ErrorBoundary";
import { Admin } from "../components/Admin/Admin";
import { ApolloProvider } from "@apollo/client/react";
import client from "../utils/apolloClient";
import { PageLayout } from "../styles";

const AdminRoot = () => (
  <PageLayout>
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <Admin />
      </ApolloProvider>
    </ErrorBoundary>
  </PageLayout>
);

const container = document.getElementById("root");

if (container) {
  createRoot(container).render(<AdminRoot />);
}
