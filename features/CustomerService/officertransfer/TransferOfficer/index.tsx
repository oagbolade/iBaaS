'use client';
import { Box } from '@mui/material';
import { useGetAccountOfficers } from '@/api/admin/useAccountOfficer';
import { TransferOfficer } from '@/features/CustomerService/Form/OfficerTransfer';
import { FormSkeleton } from '@/components/Loaders';

export const OfficerTransferContainer = () => {
  const { officers, isLoading: areOfficersLoading } = useGetAccountOfficers();

  if (areOfficersLoading) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={3} />
      </Box>
    );
  }

  return <TransferOfficer officers={officers} />;
};
