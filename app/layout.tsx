"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";

// custom imports
import ClientToastContainer from "./components/ClientToastContainer";
import { trpc } from "../src/utils/trpc";
import "./globals.css";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${process.env.NEXT_PUBLIC_URL}/api/trpc`
        })
      ]
    })
  );

  return (
    <html lang="en">
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <body>
            {children}
            <ClientToastContainer />
          </body>
        </QueryClientProvider>
      </trpc.Provider>
    </html>
  );
}
