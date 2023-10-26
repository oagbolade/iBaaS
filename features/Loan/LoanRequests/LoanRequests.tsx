'use client';
import React from 'react';
import Link from 'next/link';
import { Box } from '@mui/material';
import { PrimaryIconButton } from '@/components/Buttons/PrimaryIconButton';
import { Tabs } from '@/components/Revamp/Tabs';
import { LoanContainer } from '@/features/Loan/LoanContainer';
import { MuiTableContainer, ActionMenu } from '@/components/Table';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import { IOptions } from '@/features/Loan/PendingApplications/PendingApplications';
import { useLoansModalToggle } from '@/utils/useLoansModalToggle';

const TabContent: React.FC = () => {
  const {
    openPasswordModal,
    openRejectModal,
    openDeleteModal,
    handleClose,
    toggleModal,
  } = useLoansModalToggle();

  const pendingRequestsOptions: IOptions[] = [
    { buttonTitle: 'View Loan', link: '/loan/loan-directory/view-loan' },
    { buttonTitle: 'Modify Loan', link: '/loan/loan-directory/cancel-loan' },
  ];

  const rejectedRequestsOptions: IOptions[] = [
    { buttonTitle: 'View Details', link: '/loan/loan-directory/view-loan' },
    { buttonTitle: 'Reapply', link: '/loan/loan-directory/cancel-loan' },
    { buttonTitle: 'Delete Loan', onClick: () => toggleModal('delete') },
  ];

  const PendingRequestsActions: React.FC = () => {
    return <ActionMenu options={pendingRequestsOptions} useDefault={false} />;
  };

  const RejectedRequestsActions: React.FC = () => {
    return <ActionMenu options={rejectedRequestsOptions} useDefault={false} />;
  };

  const RejectedRequests = () => (
    <Box mt={1}>
      <LoanContainer
        actionModal={{
          openPasswordModal,
          openRejectModal,
          openDeleteModal,
          handleClose,
          toggleModal,
        }}
        checkBox
        showHeader={{
          mainTitle: 'Rejected Requests',
          secondaryTitle:
            'See a directory of all rejected requests on this platform.',
        }}
        ActionItemHeader={RejectedRequestsActions}
      />
    </Box>
  );

  const PendingRequests = () => (
    <Box mt={1}>
      <MuiTableContainer
        showHeader={{
          mainTitle: 'Pending Requests',
          secondaryTitle:
            'See a directory of all pending requests on this platform.',
        }}
        columns={MOCK_COLUMNS}
        data={MOCK_DATA}
        ActionMenuProps={PendingRequestsActions}
      />
    </Box>
  );

  const tabTitle = ['Pending Requests (54)', 'Rejected Requests'];
  const pageMenu = [<PendingRequests />, <RejectedRequests />];
  return (
    <Box>
      <Link href="/loan/loan-directory/loan-underwriting">
        <Box
          sx={{
            display: 'flex',
            marginLeft: '500px',
            justifyContent: 'flex-end',
          }}
          mb={5}
        >
          <Link href="/loan/loan-directory/loan-underwriting">
            <PrimaryIconButton buttonTitle="Create Loan Underwriting" />
          </Link>{' '}
        </Box>
      </Link>

      <Tabs tabTitle={tabTitle} pageMenu={pageMenu} />
    </Box>
  );
};

export const LoanRequests = () => {
  return (
    <Box
      sx={{
        padding: '25px',
        width: '100%',
        marginTop: '80px',
      }}
    >
      <Box>
        <TabContent />
      </Box>
    </Box>
  );
};
