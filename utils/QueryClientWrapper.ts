import {
  QueryClient,
  QueryClientProvider,
  QueryClientConfig
} from '@tanstack/react-query';
// import { render as RtlRender } from '@testing-library/react';
import { ReactElement } from 'react';

export const queryClientOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 600000, // 10 minutes
      gcTime: 900000, // 15 minutes
      refetchOnWindowFocus: false
    }
  }
};

const generateQueryClient = () => {
  if (queryClientOptions.defaultOptions?.queries) {
    queryClientOptions.defaultOptions.queries.retry = false;
  }

  return new QueryClient(queryClientOptions);
};

function customRender(ui: ReactElement, client?: QueryClient) {
  const queryClient = client ?? new QueryClient(queryClientOptions);

  // return RtlRender(
  //     <QueryClientProvider client={ queryClient } >
  //     { ui }
  // </QueryClientProvider>
  // );
}

// export * from '@testing-library/react';

// override render method
export { customRender as render };
