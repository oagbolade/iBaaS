jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
        pathname: '/'
    })
}));

jest.mock('../../../api/general/useBranches', () => ({ useGetBranches: jest.fn() }));
jest.mock('../../../api/setup/useProduct', () => ({ useGetAllProduct: jest.fn() }));
jest.mock('../../../api/general/useGroup', () => ({ useGetAllGroups: jest.fn() }));
jest.mock('../../../api/admin/useAccountOfficer', () => ({ useGetAccountOfficers: jest.fn() }));
jest.mock('../../../api/reports/useGroupMembership', () => ({ useGetGroupMembership: jest.fn() }));
jest.mock('../../../utils/hooks/usePersistedSearch', () => ({ usePersistedSearch: jest.fn() }));
jest.mock('../../../utils/hooks/useGlobalLoadingState', () => ({ useGlobalLoadingState: jest.fn() }));

jest.mock('../../../components/Table', () => ({
    MuiTableContainer: ({ data, showHeader }: any) => (
        <div>
            {showHeader?.mainTitle && <h1>{showHeader.mainTitle}</h1>}
            {showHeader?.secondaryTitle && <p data-testid="secondary-title">{showHeader.secondaryTitle}</p>}
            <div data-testid="table-body">
                {Array.isArray(data) && data.map((r: any, i: number) => (
                    <div key={i}>
                        {r.groupID} - {r.groupName} - {r.fullName}
                    </div>
                ))}
            </div>
        </div>
    )
}));


jest.mock('../../../features/Report/Overview/TopOverViewSection', () => ({ TopOverViewSection: () => <div data-testid="top-overview" /> }));
jest.mock('../../../components/Labels', () => ({ Status: ({ label }: any) => <span>{label}</span> }));

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const { useGetBranches } = require('../../../api/general/useBranches');
const { useGetAllProduct } = require('../../../api/setup/useProduct');
const { useGetAllGroups } = require('../../../api/general/useGroup');
const { useGetAccountOfficers } = require('../../../api/admin/useAccountOfficer');
const { useGetGroupMembership } = require('../../../api/reports/useGroupMembership');
const { usePersistedSearch } = require('../../../utils/hooks/usePersistedSearch');
const { useGlobalLoadingState } = require('../../../utils/hooks/useGlobalLoadingState');

const { GroupMembership } = require('../../../features/Report/CustomReport/GroupMembership');
const { DownloadReportContext } = require('../../../context/DownloadReportContext');

beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
    jest.spyOn(console, 'warn').mockImplementation(() => { });
});
afterAll(() => {
    (console.error as jest.Mock).mockRestore();
    (console.warn as jest.Mock).mockRestore();
});

describe('GroupMembership Component', () => {
    const mockBranches = [{ id: '1', name: 'HQ' }];
    const mockProducts = [{ id: '1', name: 'Savings' }];
    const mockGroups = [{ id: '1', name: 'Group A' }];
    const mockOfficers = [{ id: '1', name: 'Officer One' }];

    const samplePaged = {
        groupMembershipList: [
            {
                groupID: 'GRP001',
                groupName: 'Cooperative Group',
                customerId: 'CUST001',
                fullName: 'Jane Smith',
                status: 'Active',
                phone: '08012345678',
                bvn: '12345678901',
                address: '123 Main Street',
                branchName: 'HQ',
                officer: 'Officer One',
                gender: 'Female',
                createdate: '2024-01-15'
            }
        ],
        isLoading: false,
        totalRecords: 1
    };

    const sampleDownload = {
        groupMembershipList: [
            {
                groupID: 'GRP001',
                groupName: 'Cooperative Group',
                customerId: 'CUST001',
                fullName: 'Jane Smith',
                status: 'Active',
                phone: '08012345678',
                bvn: '12345678901',
                address: '123 Main Street',
                branchName: 'HQ',
                officer: 'Officer One',
                gender: 'Female',
                createdate: '2024-01-15'
            }
        ]
    };

    const mockDownloadCtx = {
        exportData: [],
        setExportData: jest.fn(),
        reportType: '',
        setReportType: jest.fn()
    };

    const renderWithQuery = (ui: React.ReactElement) =>
        render(<QueryClientProvider client={new QueryClient()}>{ui}</QueryClientProvider>);

    beforeEach(() => {
        jest.clearAllMocks();
        mockDownloadCtx.setExportData.mockReset();
        mockDownloadCtx.setReportType.mockReset();
        (useGetBranches as jest.Mock).mockReturnValue({ branches: mockBranches });
        (useGetAllProduct as jest.Mock).mockReturnValue({ bankproducts: mockProducts });
        (useGetAllGroups as jest.Mock).mockReturnValue({ groups: mockGroups });
        (useGetAccountOfficers as jest.Mock).mockReturnValue({ officers: mockOfficers });
        (useGlobalLoadingState as jest.Mock).mockReturnValue({ isLoading: false });
    });

    it('shows skeleton loader while loading', async () => {
        (usePersistedSearch as jest.Mock).mockReturnValue({
            searchParams: {},
            setSearchParams: jest.fn(),
            searchActive: true,
            setSearchActive: jest.fn(),
            page: 1,
            setPage: jest.fn()
        });

        (useGlobalLoadingState as jest.Mock).mockReturnValue({ isLoading: true });
        (useGetGroupMembership as jest.Mock).mockReturnValue({
            groupMembershipList: [],
            isLoading: true,
            totalRecords: 0
        });

        renderWithQuery(
            <DownloadReportContext.Provider value={mockDownloadCtx as any}>
                <GroupMembership />
            </DownloadReportContext.Provider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
        });
    });

    it('renders table data when search is active and API returns results', async () => {
        (usePersistedSearch as jest.Mock).mockReturnValue({
            searchParams: {},
            setSearchParams: jest.fn(),
            searchActive: true,
            setSearchActive: jest.fn(),
            page: 1,
            setPage: jest.fn()
        });

        // component calls hook twice: paged and download (getAll)
        (useGetGroupMembership as jest.Mock).mockImplementation((params: any) => {
            if (params?.getAll) return sampleDownload;
            return samplePaged;
        });

        renderWithQuery(
            <DownloadReportContext.Provider value={mockDownloadCtx as any}>
                <GroupMembership />
            </DownloadReportContext.Provider>
        );

        await waitFor(() => {
            // table renders with data
            expect(screen.getByTestId('table-body')).toBeInTheDocument();
            expect(screen.getByText(/GRP001 - Cooperative Group - Jane Smith/i)).toBeInTheDocument();
            // export data prepared
            expect(mockDownloadCtx.setExportData).toHaveBeenCalled();
            expect(mockDownloadCtx.setReportType).toHaveBeenCalledWith('GroupMembership');
        });
    });
});