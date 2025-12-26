import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SnackbarProvider } from 'notistack';
import "./index.css";
import App from "./App.jsx";
import { SnackbarUtilsConfigurator } from "./utils/snackbarUtils.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SnackbarProvider maxSnack={3}>
      <SnackbarUtilsConfigurator/>
      <App />
    </SnackbarProvider>
  </StrictMode>
);
