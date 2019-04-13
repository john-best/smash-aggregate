import React from "react";
import ReactDOM from "react-dom";
//import './index.css';
import App from "./App";
import "semantic-ui-css/semantic.min.css";

import { Provider } from "react-redux";
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from "./configureStore";

import routes from "./routes";
const store = configureStore();

// i feel like we can combile routes.js and index.js but i'm not too sure.
ReactDOM.render(
    <Provider store={store}>
  <ConnectedRouter history={history}>
    <App routes={routes} />
  </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
