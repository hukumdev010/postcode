"use client";
import { client } from "@/lib/client";
import { ApolloProvider } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import React from "react";
import Home from "./home";

const Pages = () => {
  return (
    <ApolloProvider client={client}>
      <Home />
      <Toaster />
    </ApolloProvider>
  );
};

export default Pages;
