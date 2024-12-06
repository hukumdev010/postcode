import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag';
import { NextApiRequest, NextApiResponse } from 'next';

const resolvers = {
  Query: {
    _empty: () => "Welcome to GraphQL!",
    hello: () => "hello world",
  },
  Mutation: {
    validateLocation: async (_: unknown, { suburb, postcode, state }: never) => {
      try {
        const response = await fetch(
          `https://digitalapi.auspost.com.au/postcode-search?q=${suburb}&state=${state}&postcode=${postcode}`,
          {
            method: "GET",
            headers: {

              "Content-Type": "application/json",
              'AUTH-KEY': `${process.env.AUTH_KEY}`, // Replace with your token
            },

          });

        const data = await response.json();
        return data.valid || false; // Adjust to match API response structure
      } catch (error) {
        console.error("Error validating location:", error);
        return false;
      }
    },
  },
};


const typeDefs = gql`
   type Query {
    _empty: String,
    hello: String
  }

  type Mutation {
    validateLocation(suburb: String!, postcode: String!, state: String!): Boolean
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server);

export const POST = (req: NextApiRequest, res: NextApiResponse) => {
  return handler(req, res);
};

export const GET = (req: NextApiRequest, res: NextApiResponse) => {
  return handler(req, res);
};
