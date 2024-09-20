import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./styles/style.css";

const queryClient = new QueryClient();

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <GoogleOAuthProvider clientId="367792437828-47h7ph80cidbvjovai5i9ss2tbkk7r14.apps.googleusercontent.com">
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </StrictMode>
  );
}
