import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { NextRequest } from "next/server";

// custom imports
import { appRouter } from "../../../../src/server/routers/_app";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { createContext } from "../../../../src/server/trpc";
import { TRPCError } from "@trpc/server";

async function handler(req: NextRequest) {
  try {
    const result = await fetchRequestHandler({
      endpoint: "/api/trpc",
      req,
      router: appRouter,
      createContext,
      onError({ error }) {
        if (error instanceof TRPCError) {
          const httpCode = getHTTPStatusCodeFromError(error);
          return new Response(JSON.stringify({ error: error.message }), {
            status: httpCode
          });
        }

        return new Response(
          JSON.stringify({ error: "Internal Server Error" }),
          {
            status: 500
          }
        );
      }
    });

    return result;
  } catch (cause) {
    return new Response("Internal Server Error", { status: 500 });
  }
}

export const GET = handler;
export const POST = handler;
