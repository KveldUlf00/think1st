import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./pages/App";
import { SnackbarProvider } from "notistack";

// styles:
// npx tailwindcss -i ./src/styles/index.css -o ./src/styles/output.css --watch

// TODO in Age tooltip on the bottom
// TODO mobile view
// TODO form validation
// TODO hide somewhere this secret key
// TODO inactive submit

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
