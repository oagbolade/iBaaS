'use client';

import { Box } from '@mui/material';
import { Requests } from './Requests';
import { useFetchAllUserRequest } from '@/api/loans/useFetchAllUserRequests';
import { useGetPendingRequest } from '@/api/loans/useFetchPendingRequest';
import { FormSkeleton } from '@/components/Loaders';
import { useFetchRejectedRequest } from '@/api/loans/useFetchRejectedRequest';

export function RequestContainer() {
  const { data: allRequests, isLoading: isFetchingAlluserRequest } =
    useFetchAllUserRequest();
  const { authsdetails: pendingRequests, isLoading: isFetchingPendingRequest } =
    useGetPendingRequest();
  const { data: rejectedRequests, isLoading: isFetchingRejectedRequest } =
    useFetchRejectedRequest();

  if (
    isFetchingAlluserRequest &&
    isFetchingPendingRequest &&
    isFetchingRejectedRequest
  ) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={5} />
      </Box>
    );
  }
  return (
    <Requests
      allRequests={allRequests}
      pendingRequests={pendingRequests}
      rejectedRequests={rejectedRequests}
    />
  );
}
