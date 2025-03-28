'use client';
import React from 'react';
import { Box } from '@mui/material';
import { ActionMenu } from '@/components/Table';
import { Tabs } from '@/components/Revamp/Tabs';
import { LoanContainer } from '@/features/Loan/LoanContainer';
import { useLoansModalToggle } from '@/utils/hooks/useLoansModalToggle';

export interface IOptions {
  buttonTitle: string;
  link?: string;
  onClick?: () => void;
}

const TabContent: React.FC = () => {
  const { openPasswordModal, openRejectModal, handleClose, toggleModal } =
    useLoansModalToggle();

  const pendingRequestsOptions: IOptions[] = [
    {
      buttonTitle: 'View Application',
      link: '/loan/loan-directory/cancel-loan'
    },
    { buttonTitle: 'Reject Loan', onClick: () => toggleModal('password') }
  ];

  const rejectOptions: IOptions[] = [
    {
      buttonTitle: 'View Application',
      link: '/loan/loan-directory/cancel-loan'
    }
  ];

  const PendingRequestsActions: React.FC = () => {
    return <ActionMenu options={pendingRequestsOptions} useDefault={false} />;
  };

  const RejectedRequestsActions: React.FC = () => {
    return <ActionMenu options={rejectOptions} useDefault={false} />;
  };

  const PendingRequests = () => (
    <Box sx={{ padding: '0px', margin: '0px' }}>
      <LoanContainer
        actionModal={{
          openPasswordModal,
          openRejectModal,
          handleClose,
          toggleModal
        }}
        checkBox
        showHeader={{
          mainTitle: 'Pending Requests',
          secondaryTitle:
            'See a directory of all rejected requests on this platform.'
        }}
        TableActionItems={PendingRequestsActions}
        customStyle={{ padding: '0px' }}
      />
    </Box>
  );

  const RejectedRequests = () => (
    <Box>
      <LoanContainer
        actionModal={{
          openPasswordModal,
          openRejectModal,
          handleClose,
          toggleModal
        }}
        showHeader={{
          mainTitle: 'Rejected Requests',
          secondaryTitle:
            'See a directory of all rejected requests on this platform.'
        }}
        TableActionItems={RejectedRequestsActions}
        customStyle={{ padding: '0px' }}
      />
    </Box>
  );

  const tabTitle = ['Pending Requests', 'Rejected Requests'];
  const pageMenu = [<PendingRequests />, <RejectedRequests />];
  return (
    <Box>
      <Tabs tabTitle={tabTitle} pageMenu={pageMenu} />
    </Box>
  );
};
export const PendingApplications = () => {
  return (
    <Box
      sx={{
        padding: '25px',
        width: '100%',
        marginTop: '40px'
      }}
    >
      <Box mt={5}>
        <TabContent />
      </Box>
    </Box>
  );
};
