import { ApolloClient, InMemoryCache } from '@apollo/client';
import { graphqlCacheOpts, graphqlLink } from '../common';

export const apolloClient = new ApolloClient({
  link: graphqlLink,
  cache: new InMemoryCache(graphqlCacheOpts),
});
