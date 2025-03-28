// Town.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as api from '@/api/setup/userCreateTown'; // Adjust the import path as needed
import * as statusApi from '@/api/general/useStatus';
import * as geographyApi from '@/api/general/useGeography';
import { Town } from '@/features/Setup';

// Mocking the API hooks
jest.mock('../../../../api/setup/userCreateTown');
jest.mock('../../../../api/general/useStatus');
jest.mock('../../../../api/general/useGeography');

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({ get: jest.fn() }))
}));

const mockRouterReplace = jest.fn();
const mockRouterRefresh = jest.fn();
const mockRouterPush = jest.fn();

jest.mock('next/navigation', () => {
  const originalModule = jest.requireActual('next/navigation');
  return {
    __esModule: true,
    ...originalModule,
    useRouter: jest.fn().mockImplementation(() => {
      return {
        push: mockRouterPush,
        replace: mockRouterReplace,
        refresh: mockRouterRefresh
      };
    }),
    useSearchParams: jest.fn().mockImplementation(() => {
      return new URLSearchParams(window.location.search);
    }),
    usePathname: jest.fn().mockImplementation((pathArg) => {
      return pathArg;
    })
  };
});

describe('Town Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    (statusApi.useGetStatus as jest.Mock).mockReturnValue({
      status: 'success'
    });
    (geographyApi.useGetAllStates as jest.Mock).mockReturnValue({ states: [] });
    (api.useFilterTownSearch as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
      totalElements: 0,
      totalPages: 1
    });

    render(<Town />);

    expect(screen.getByText(/directory of all towns/i)).toBeInTheDocument();
  });

  it('displays loading state', () => {
    (statusApi.useGetStatus as jest.Mock).mockReturnValue({
      status: 'success'
    });
    (geographyApi.useGetAllStates as jest.Mock).mockReturnValue({ states: [] });
    (api.useFilterTownSearch as jest.Mock).mockReturnValue({
      isLoading: true,
      data: [],
      totalElements: 0,
      totalPages: 1
    });

    render(<Town />);

    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  it('calls handleSearch with correct parameters', async () => {
    const mockStates = [{ code: 'CA', name: 'California' }];
    (statusApi.useGetStatus as jest.Mock).mockReturnValue({
      status: 'success'
    });
    (geographyApi.useGetAllStates as jest.Mock).mockReturnValue({
      states: mockStates
    });
    (api.useFilterTownSearch as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
      totalElements: 0,
      totalPages: 1
    });

    render(<Town />);

    fireEvent.change(screen.getByPlaceholderText(/search by town name/i), {
      target: { value: 'Test Town' }
    });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(api.useFilterTownSearch).toHaveBeenCalled();
    });
  });

  it('renders empty table when no data is available', () => {
    (statusApi.useGetStatus as jest.Mock).mockReturnValue({
      status: 'success'
    });
    (geographyApi.useGetAllStates as jest.Mock).mockReturnValue({ states: [] });
    (api.useFilterTownSearch as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
      totalElements: 0,
      totalPages: 1
    });

    render(<Town />);

    expect(screen.getByTestId('empty-table-body')).toBeInTheDocument();
  });
});
