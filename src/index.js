import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import HostApp from "./HostApp";
import GuestApp from "./GuestApp";
import reportWebVitals from "./reportWebVitals";
import Url from "url-parse";

const searchParams = (new Url(window.location.href, true)).query;

if (searchParams.id) {
  if (searchParams.host === "true") {
    ReactDOM.render(
      <React.StrictMode>
        <HostApp />
      </React.StrictMode>,
      document.getElementById("root")
    );
  } else {
    ReactDOM.render(
      <React.StrictMode>
        <GuestApp />
      </React.StrictMode>,
      document.getElementById("root")
    );
  }
} else {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
