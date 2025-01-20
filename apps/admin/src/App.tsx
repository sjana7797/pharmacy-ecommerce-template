import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { ThemeProvider } from "./providers/theme/theme-provider";
import "@repo/ui/styles/globals.css";
import AuthProvider, { useAuth } from "./providers/auth/auth-provider";
import { Toaster } from "@repo/ui/components/sonner";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 0,
    },
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <Routes />
          <Toaster toastOptions={{ duration: 3000 }} />
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

function Routes() {
  const { session } = useAuth();
  return <RouterProvider router={router} context={{ session }} />;
}

export default App;
