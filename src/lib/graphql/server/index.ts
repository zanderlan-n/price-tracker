import { DocumentNode, OperationVariables } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support';
import { getServerClient } from './get-server-client';

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return getServerClient();
});

interface ServerClientProps {
  path: DocumentNode;
  body: OperationVariables;
}

/**
 * Server-side GraphQL Client
 *
 * This client acts as an abstraction layer for server-side GraphQL operations.
 * It's designed with a generic interface to facilitate future migrations,
 * whether to a newer version of Apollo Client or to another API solution.
 *
 * @param path - The GraphQL document (query/mutation) to be executed
 * @param body - The GraphQL operation variables
 * @returns Promise with the typed response data
 */
export const serverClient = async <T>({ path, body }: ServerClientProps) => {
  return await query<T>({
    query: path,
    variables: body,
  });
};
