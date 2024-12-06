import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
    return new ApolloClient({
        uri: "https://digitalapi.auspost.com.au/postcode/search.json",
        cache: new InMemoryCache(),
        headers: {
            "AUTH-KEY": "872608e3-4530-4c6a-a369-052accb03ca8"
        },
    });
};

export default createApolloClient;