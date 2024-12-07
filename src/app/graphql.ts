import { gql } from "@apollo/client";

export const FETCH_LOCATIONS = gql`
    query FetchLocations($q: String!) {
    fetchLocations(q: $q) {
        id
        location
        postcode
        state
    }
    }
`;