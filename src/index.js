import React from "react";
import ReactDOM from "react-dom";
//import './index.css';
import App from "./App";
import "semantic-ui-css/semantic.min.css";

// soon
//import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import routes from "./routes";

// i feel like we can combile routes.js and index.js but i'm not too sure.
ReactDOM.render(
  <BrowserRouter>
    <App routes={routes} />
  </BrowserRouter>,
  document.getElementById("root")
);
