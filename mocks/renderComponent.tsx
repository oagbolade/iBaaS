/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { mockToastActions } from '.';
import { ToastMessageContext } from '@/context/ToastMessageContext';

const queryClient = new QueryClient();

export const renderComponentWithQueryProvider = (ui: React.ReactElement, mockRouter: any = {}) => {
    const defaultRouter = {
        push: jest.fn(),
        query: {},
        pathname: '/',
        asPath: '/',
        ...mockRouter,
    };

  return render(
    <QueryClientProvider client={queryClient}>
      <ToastMessageContext.Provider value={mockToastActions}>
        <AppRouterContext.Provider value={defaultRouter}>
          {ui}
        </AppRouterContext.Provider>
      </ToastMessageContext.Provider>
    </QueryClientProvider>
  );
};
