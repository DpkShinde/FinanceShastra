// index.js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const CLIENT_ID =
  "505405282471-r6mpu3r3ib1ce06mlks7rhl2b7bodhq9.apps.googleusercontent.com";

ReactDOM.render(
    <BrowserRouter>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </BrowserRouter>,
  document.getElementById("root")
);
