import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useFilterCountrySearch } from '@/api/setup/useCreateCountry';
import { useGetStatus } from '@/api/general/useStatus';
import { Country } from '@/features/Setup';
import { FilterSection } from '@/features/Setup/Company/Country/FilterSection';

jest.mock('../../../../api/setup/useCreateCountry');
jest.mock('../../../../api/general/useStatus');
jest.mock('../../../../components/Loaders', () => ({
  FormSkeleton: () => <div>Loading...</div>
}));

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

describe('Country Component', () => {
  beforeEach(() => {
    (useGetStatus as jest.Mock).mockReturnValue({
      status: ['Active', 'Inactive']
    });
    (useFilterCountrySearch as jest.Mock).mockReturnValue({
      totalElements: 0,
      totalPages: 1,
      data: [],
      isLoading: false
    });
  });

  it('renders without crashing', () => {
    render(<Country />);
    expect(screen.getByText('Country')).toBeInTheDocument();
  });

  it('shows loading skeleton when data is loading', () => {
    (useFilterCountrySearch as jest.Mock).mockReturnValue({
      totalElements: 0,
      totalPages: 1,
      data: [],
      isLoading: true
    });
    render(<Country />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('calls handleSearch with correct parameters', async () => {
    render(<Country />);

    // Simulate user filling the search form
    fireEvent.change(screen.getByPlaceholderText('Search by country name'), {
      target: { value: 'USA' }
    });
    fireEvent.click(screen.getByRole('button', { name: /Search/i }));

    await waitFor(() => {
      expect(useFilterCountrySearch).toHaveBeenCalledWith({
        countryName: 'USA',
        status: null,
        countryCode: null,
        page: 1
      });
    });
  });

  it('displays empty table message when no countries are found', () => {
    render(<Country />);
    expect(screen.getByText(/No Search Found/i)).toBeInTheDocument();
  });

  describe('FilterSection Component', () => {
    const onSearchMock = jest.fn();

    it('renders without crashing', () => {
      render(<FilterSection onSearch={onSearchMock} status={[]} />);
      expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(/Search by country name/i)
      ).toBeInTheDocument();
    });

    it('does not call onSearch if no inputs are provided', async () => {
      render(<FilterSection onSearch={onSearchMock} status={[]} />);

      fireEvent.click(screen.getByRole('button', { name: /Search/i }));

      expect(onSearchMock).not.toHaveBeenCalled();
    });

    it('calls onSearch with the correct parameters when form is submitted', async () => {
      render(
        <FilterSection
          onSearch={onSearchMock}
          status={[
            { statusCode: 'Active', statusDesc: 'Active' },
            { statusCode: 'Inactive', statusDesc: 'Inactive' }
          ]}
        />
      );

      // Click the dropdown to open it
      fireEvent.mouseDown(screen.getByRole('combobox', { name: /Status/i }));

      // Select the desired option
      fireEvent.click(screen.getAllByText(/Active/i)[0]);

      fireEvent.change(screen.getByPlaceholderText(/Search by country name/i), {
        target: { value: 'CAD' }
      });

      fireEvent.click(screen.getByRole('button', { name: /Search/i }));
      expect(useFilterCountrySearch).toHaveBeenCalled();
    });
  });
});
