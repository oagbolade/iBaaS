'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { MyRequestTable } from './MyRequestTable';
import { PendingRequestTable } from './PendingRequestTable';
import { RejectedRequestTable } from './RejectedRequestTable';
import { useLoansModalToggle } from '@/utils/hooks/useLoansModalToggle';
import { TabsV2 } from '@/components/Revamp/TabsV2';
import {
  IFetchAllUserRequest,
  IFetchRejectedRequest,
  IGetPendingRequest
} from '@/api/ResponseTypes/loans';

interface Props {
  allRequests?: IFetchAllUserRequest[] | undefined;
  pendingRequests?: IGetPendingRequest[] | undefined;
  rejectedRequests?: IFetchRejectedRequest[] | undefined;
}

const TabContent = ({
  allRequests,
  pendingRequests,
  rejectedRequests
}: Props) => {
  useLoansModalToggle();

  const tabTitle = ['My Requests', 'Pending Requests', 'Rejected Requests'];
  const pageMenu = [
    <MyRequestTable allRequests={allRequests} />,
    <PendingRequestTable pendingRequests={pendingRequests} />,
    <RejectedRequestTable rejectedRequests={rejectedRequests} />
  ];
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <TabsV2
      tabTitle={tabTitle}
      pageMenu={pageMenu}
      handleChange={handleChange}
      values={value}
      storageKey="requests-page-tabs"
    />
  );
};

export const Requests = ({
  allRequests,
  pendingRequests,
  rejectedRequests
}: Props) => {
  return (
    <Box
      sx={{
        padding: '25px',
        width: '100%',
        marginTop: '40px'
      }}
    >
      <Box>
        <TabContent
          allRequests={allRequests}
          pendingRequests={pendingRequests}
          rejectedRequests={rejectedRequests}
        />
      </Box>
    </Box>
  );
};
