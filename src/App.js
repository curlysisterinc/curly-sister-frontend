/* eslint-disable import/no-cycle */
import React from "react";
import "./App.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "react-toast-notifications";
import Routers from "./routers";
import CustomToast from "./components/toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: false,
      staleTime: 30000,
    },
  },
});

function App() {
  return (
    <ToastProvider
      autoDismiss
      autoDismissTimeout={4000}
      components={{ Toast: CustomToast }}
      placement="top-right"
    >
      <QueryClientProvider client={queryClient}>
        {/* The rest of your application */}
        <Routers />;
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ToastProvider>
  );
}

export default App;
