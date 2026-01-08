import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SnackbarProvider } from "notistack";
import "./index.css";
import App from "./App.jsx";
import { SnackbarUtilsConfigurator } from "./utils/snackbarUtils.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider maxSnack={3}>
        <SnackbarUtilsConfigurator />
        <App />
      </SnackbarProvider>
    </QueryClientProvider>
  </StrictMode>
);
