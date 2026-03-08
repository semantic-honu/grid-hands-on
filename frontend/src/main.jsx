import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SnackbarProvider } from "notistack";
import "./index.css";
import App from "./App.jsx";
import { SnackbarUtilsConfigurator } from "./utils/snackbarUtils.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2, // 2回までリトライを許容
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // 1秒, 2秒...と間隔を空けてリトライ
    },
  },
});

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <SnackbarProvider maxSnack={3}>
      <SnackbarUtilsConfigurator />
      <App />
    </SnackbarProvider>
  </QueryClientProvider>
);
