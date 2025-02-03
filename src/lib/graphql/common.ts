import { removeTypenameFromVariables } from '@apollo/client/link/remove-typename';
import { HttpLink } from '@apollo/client';
import { from } from '@apollo/client';

const removeTypenameLink = removeTypenameFromVariables();

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
  fetchOptions: { cache: 'no-store' },
});

export const graphqlLink = from([removeTypenameLink, httpLink]);

export const graphqlCacheOpts = {
  addTypename: false,
};
