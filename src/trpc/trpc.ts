import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

/**
 * Export resusable routers and procedures helpers
 * that can be used throughout the router.
 */
export const router = t.router;
export const publicProcedure = t.procedure;