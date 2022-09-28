import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { reducer, StateProvider } from "./state";

// The provider makes the state and the dispatch functions available in all of the components
ReactDOM.render(
  <StateProvider reducer={reducer}>
    <App />
  </StateProvider>,
  document.getElementById("root")
);
