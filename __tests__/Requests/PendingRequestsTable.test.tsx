import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RequestModuleContext } from '@/context/RequestModuleContext';
import { PendingRequestTable } from '@/features/Requests/PendingRequestTable';

export interface IGetPendingRequest {
    id: number;
    tablename: string;
    authdesc: string;
    authid: string;
    posttype: string;
    createdate: string;
    authstatus: string;
    searchfield: string;
    authdate: string;
    latestupdate: string;
    post_user: string;
    narration: string;
}

const mockPendingRequests = [
    {
        id: 1,
        posttype: 'Loan',
        createdate: '2024-11-14',
        post_user: 'User A',
        authid: '12345',
        tablename: '',
        authdesc: '',
        authstatus: '',
        searchfield: '',
        authdate: '',
        latestupdate: '',
        narration: ''

    },
    {
        id: 2,
        posttype: 'Mortgage',
        createdate: '2024-11-13',
        post_user: 'User B',
        authid: '67890',
        tablename: '',
        authdesc: '',
        authstatus: '',
        searchfield: '',
        authdate: '',
        latestupdate: '',
        narration: ''
    },
];

const setPendingRequestDataMock = jest.fn();
const setMyRequestData = jest.fn();
const setRejectedRequestData = jest.fn();

export const mockRequestsProvider = {
    myRequestData: {
        id: 0,
        requestType: '',
        requestDate: '',
        postingOfficer: '',
        approvingOfficer: ''
    },
    setMyRequestData,
    pendingRequestData: {
        id: 0,
        tablename: '',
        authdesc: '',
        authid: '',
        posttype: '',
        createdate: '',
        authstatus: '',
        searchfield: '',
        authdate: '',
        latestupdate: '',
        post_user: '',
        narration: ''
    },
    setPendingRequestData: setPendingRequestDataMock,
    rejectedRequestData: {
        id: 0,
        requestType: '',
        rejectDate: '',
        postingOfficer: '',
        approvingOfficer: '',
        rejectReason: ''
    },
    setRejectedRequestData
};

describe('PendingRequestTable', () => {
    it('renders the table with data', () => {
        render(
            <PendingRequestTable pendingRequests={mockPendingRequests} />
        );

        expect(screen.getByText('Request Type')).toBeInTheDocument();
        expect(screen.getByText('Request Date')).toBeInTheDocument();
        expect(screen.getByText('Requested From')).toBeInTheDocument();

        // Verify table rows
        expect(screen.getByText('Loan')).toBeInTheDocument();
        expect(screen.getByText('User A')).toBeInTheDocument();
        expect(screen.getByText('Mortgage')).toBeInTheDocument();
        expect(screen.getByText('User B')).toBeInTheDocument();

        // Verify actions
        expect(screen.getAllByText('View')).toHaveLength(2);
    });

    it('calls setPendingRequestData when an action is clicked', () => {
        render(
            <RequestModuleContext.Provider value={mockRequestsProvider}>
                <PendingRequestTable pendingRequests={mockPendingRequests} />
            </RequestModuleContext.Provider>
        );

        fireEvent.click(screen.getAllByText('View')[0]);
        expect(setPendingRequestDataMock).toHaveBeenCalledWith(mockPendingRequests[0]);
    });

    it('filters table rows based on search input', () => {
        render(
            <RequestModuleContext.Provider value={mockRequestsProvider}>
                <PendingRequestTable pendingRequests={mockPendingRequests} />
            </RequestModuleContext.Provider>
        );

        const searchInput = screen.getByPlaceholderText('Search');
        fireEvent.change(searchInput, { target: { value: 'Mortgage' } });

        // Only rows matching the filter should be visible
        expect(screen.getByText('Mortgage')).toBeInTheDocument();
        expect(screen.queryByText('Loan')).not.toBeInTheDocument();
    });
});
