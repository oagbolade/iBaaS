import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MyRequestTable } from '@/features/Requests/MyRequestTable';

const mockMyRequests = [
    {
        id: 1,
        requestType: 'Loan Request',
        requestDate: '2024-11-14',
        approvingOfficer: 'Officer A',
        postingOfficer: 'Officer 001',
    },
    {
        id: 2,
        requestType: 'Mortgage Request',
        requestDate: '2024-11-13',
        approvingOfficer: 'Officer B',
        postingOfficer: 'Officer 002',
    },
];

describe('MyRequestTable', () => {
    it('renders the table with data', () => {
        render(<MyRequestTable allRequests={mockMyRequests} />);

        // Verify table headers
        expect(screen.getByText('Request Type')).toBeInTheDocument();
        expect(screen.getByText('Request Date')).toBeInTheDocument();
        expect(screen.getByText('Approving Officer')).toBeInTheDocument();

        // Verify table rows
        expect(screen.getByText('Loan Request')).toBeInTheDocument();
        expect(screen.getByText('Officer A')).toBeInTheDocument();
        expect(screen.getByText('Mortgage Request')).toBeInTheDocument();
        expect(screen.getByText('Officer B')).toBeInTheDocument();

        // Verify actions
        expect(screen.getAllByText('View')).toHaveLength(2);
    });

    it('filters table rows based on search input', () => {
        render(<MyRequestTable allRequests={mockMyRequests} />);

        const searchInput = screen.getByPlaceholderText('Search');
        fireEvent.change(searchInput, { target: { value: 'Mortgage' } });

        // Only rows matching the filter should be visible
        expect(screen.getByText('Mortgage Request')).toBeInTheDocument();
        expect(screen.queryByText('Loan Request')).not.toBeInTheDocument();
    });
});
