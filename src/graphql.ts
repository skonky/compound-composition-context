import { initGraphQLTada } from "gql.tada";
import type { introspection as Introspection } from "./graphql-env.d.ts";

export const graphql = initGraphQLTada<{
  introspection: Introspection;
}>();

export type { FragmentOf, ResultOf, VariablesOf } from "gql.tada";
export { readFragment } from "gql.tada";
