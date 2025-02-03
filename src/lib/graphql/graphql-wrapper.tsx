'use client';

import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support';
import { getServerClient } from './server/get-server-client';

export function GraphqlWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={getServerClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
