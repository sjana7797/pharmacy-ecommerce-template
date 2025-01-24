import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../api/src/trpc/router/root";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const api = createTRPCReact<AppRouter>();

export const TrpcProvider = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/trpc",
          // You can pass any HTTP headers you wish here
        }),
      ],
    }),
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </api.Provider>
  );
};
