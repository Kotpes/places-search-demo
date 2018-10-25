import React from "react";
import { Router } from "@reach/router";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { AsyncHome, AsyncPlaceOverview} from './routes';

//Replace uri with http://localhost:4000/graphql if using local server
const client = new ApolloClient({
  uri: "https://place-search-graphql.now.sh/graphql"
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
