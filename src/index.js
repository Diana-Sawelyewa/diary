import { StrictMode } from "react";
//import ReactDOM from 'react-dom/client';
import ReactDOM from "react-dom/client";
import React from "react";

import App from "./App";

/* const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
); */

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


ReactDOM
.createRoot(document.getElementById('root'))
.render (
  
  <App />

);

