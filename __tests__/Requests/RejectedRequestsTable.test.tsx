import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { mockRequestsProvider } from './PendingRequestsTable.test';
import { RequestModuleContext } from '@/context/RequestModuleContext';
import { RejectedRequestTable } from '@/features/Requests/RejectedRequestTable';

const mockRejectedRequests = [
    {
        id: 1,
        requestType: 'Loan',
        rejectReason:'Bad loan',
        rejectDate: '2024-11-14',
        postingOfficer: 'Officer A',
        approvingOfficer: 'Officer 001',
    },
    {
        id: 2,
        requestType: 'Mortgage',
        rejectReason: 'Bad credit score',
        rejectDate: '2024-11-13',
        postingOfficer: 'Officer A',
        approvingOfficer: 'Officer 001',
    },
];

describe('RejectedRequestTable', () => {
    it('renders the table with data', () => {
        render(
            <RequestModuleContext.Provider value={mockRequestsProvider}>
                <RejectedRequestTable rejectedRequests={mockRejectedRequests} />
            </RequestModuleContext.Provider>
        );

        // Verify table headers
        expect(screen.getByText('Request Type')).toBeInTheDocument();
        expect(screen.getByText('Rejection Date')).toBeInTheDocument();
        expect(screen.getByText('Reason for Rejection')).toBeInTheDocument();

        // Verify table rows
        expect(screen.getByText('Loan')).toBeInTheDocument();
        expect(screen.getByText('Mortgage')).toBeInTheDocument();

        // Verify actions
        expect(screen.getAllByText('View')).toHaveLength(2);
    });

    it('calls setRejectedRequestData when the view action button is clicked', () => {
        render(
            <RequestModuleContext.Provider value={mockRequestsProvider}>
                <RejectedRequestTable rejectedRequests={mockRejectedRequests} />
            </RequestModuleContext.Provider>
        );

        fireEvent.click(screen.getAllByText('View')[0]);
        expect(mockRequestsProvider.setRejectedRequestData).toHaveBeenCalledWith(mockRejectedRequests[0]);
    });

    it('filters table rows based on search input', () => {
        render(
            <RequestModuleContext.Provider value={mockRequestsProvider}>
                <RejectedRequestTable rejectedRequests={mockRejectedRequests} />
            </RequestModuleContext.Provider>
        );

        const searchInput = screen.getByPlaceholderText('Search');
        fireEvent.change(searchInput, { target: { value: 'Mortgage' } });

        // Only rows matching the filter should be visible
        expect(screen.getByText('Mortgage')).toBeInTheDocument();
        expect(screen.queryByText('Loan')).not.toBeInTheDocument();
    });
});
