import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag';
import { NextApiRequest, NextApiResponse } from 'next';

type Location = {
  category: string;
  id: number;
  latitude: number;
  location: string;
  longitude: number;
  postcode: number;
  state: string;
};

const resolvers = {
  Query: {
    _empty: () => "Welcome to GraphQL!",
    hello: () => "hello world",
    fetchLocations: async (_: unknown, { q }: { q: string }) => {
      try {
        // Fetch data from the external API
        const response = await fetch(
          `https://digitalapi.auspost.com.au/postcode/search.json?q=${q}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'AUTH-KEY': process.env.AUTH_KEY || '', // Provide your auth key in .env
            },
          }
        );

        // Handle response
        if (!response.ok) {
          throw new Error(`Failed to fetch locations: ${response.statusText}`);
        }
        const data = await response.json();

        return data.localities.locality.map((loc: Location) => ({
          category: loc.category,
          id: loc.id,
          latitude: loc.latitude,
          location: loc.location,
          longitude: loc.longitude,
          postcode: loc.postcode,
          state: loc.state,
        }));
      } catch {
        return [];
      }
    }
  },
};


const typeDefs = gql`
   type Query {
    _empty: String,
    hello: String,
    fetchLocations(q: String!): [Location]
  }

  type Location {
    category: String
    id: Int
    latitude: Float
    location: String
    longitude: Float
    postcode: Int
    state: String
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
