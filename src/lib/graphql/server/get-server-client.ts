import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';
import { graphqlCacheOpts, graphqlLink } from '../common';

export function getServerClient() {
  return new ApolloClient({
    cache: new InMemoryCache(graphqlCacheOpts),
    link: graphqlLink,
  });
}
