import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: "/api/graphql", // or your server's endpoint
    cache: new InMemoryCache(),
});