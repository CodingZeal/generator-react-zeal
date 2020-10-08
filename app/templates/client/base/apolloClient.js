import { ApolloClient, InMemoryCache } from '@apollo/client';
import { config } from "config";

const { API_URI } = config;

export default new ApolloClient({
  uri: API_URI,
  cache: new InMemoryCache()
});
