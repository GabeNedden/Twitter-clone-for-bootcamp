import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CurrentUserProvider } from "./components/CurrentUserContext";
import { CurrentFeedProvider } from "./components/CurrentFeedContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CurrentUserProvider>
    <CurrentFeedProvider>
      <App />
    </CurrentFeedProvider>
  </CurrentUserProvider>
);
