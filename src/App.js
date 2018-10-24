import React from "react";
import { Router } from "@reach/router";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { AsyncHome, AsyncPlaceOverview} from './routes';

const client = new ApolloClient({
  uri: "https://graphqlserver-bltoxgfwnf.now.sh/graphql"
});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <AsyncHome path="/" />
      <AsyncPlaceOverview path="places/:id" />
    </Router>
  </ApolloProvider>
);

export default App;
