import React from "react";
import { Router } from "@reach/router";
import { AsyncHome, AsyncPlaceOverview} from "./routes";

const App = () => (
  <Router>
    <AsyncHome path="/" />
    <AsyncPlaceOverview path="places/:id" />
  </Router>
);

export default App;
