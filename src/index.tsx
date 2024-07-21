import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import App from "./pages/App";
import { SnackbarProvider } from "notistack";

// To run fake REST API service:

// ### `npx json-server fakeApi/db.json`

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SnackbarProvider
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={3000}
      preventDuplicate
    >
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);
