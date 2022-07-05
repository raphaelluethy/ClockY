// src/utils/trpc.ts
import type { AppRouter } from "../server/router";
import { createReactQueryHooks } from "@trpc/react";
import { inferProcedureOutput } from "@trpc/server";

export const trpc = createReactQueryHooks<AppRouter>();

export type inferQueryResponse<
	TRouteKey extends keyof AppRouter["_def"]["queries"]
> = inferProcedureOutput<AppRouter["_def"]["queries"][TRouteKey]>;

/**
 * Check out tRPC docs for Inference Helpers
 * https://trpc.io/docs/infer-types#inference-helpers
 */
