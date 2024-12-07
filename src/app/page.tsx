"use client";
import { client } from "@/lib/client";
import { ApolloProvider } from "@apollo/client";
import React from "react";
import Home from "./home";

const Pages = () => {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
};

export default Pages;
