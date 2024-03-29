/* eslint-disable import/no-cycle */
import React from "react";
import "./App.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ToastProvider } from "react-toast-notifications";
import { process } from "postcss-flexbugs-fixes";
import Routers from "./routers";
import CustomToast from "./components/toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import authHandler from "./authHandler";
// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: !!process.env.NODE_ENV === "production",
      retry: 0,
      staleTime: process.env.NODE_ENV === "production" && 30000,
    },
  },

  queryCache: new QueryCache({
    onError: (error, query) => {
      if (error?.response?.status === 401) {
        authHandler.deleteUser();
        window.location.href = "/";
      }
    },
  }),

  mutationCache: new MutationCache({
    onError: (error, query) => {
      if (error?.response?.status === 401) {
        authHandler.deleteUser();
        window.location.href = "/login";
      }
    },
  }),
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
        <Routers />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ToastProvider>
  );
}

export default App;
