'use client';
import { Box } from '@mui/material';
import { CasaAccount } from '@/features/CustomerService/Form/CasaAccount';
import { useGetBranches } from '@/api/general/useBranches';
import { useGetAccountOfficers } from '@/api/admin/useAccountOfficer';
import { FormSkeleton } from '@/components/Loaders';

export const CasaAccountContainer = () => {
  const { branches, isLoading: arebranchesLoading } = useGetBranches();
  const { officers, isLoading: areOfficersLoading } = useGetAccountOfficers();

  if (arebranchesLoading || areOfficersLoading) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={3} />
      </Box>
    );
  }

  return <CasaAccount branches={branches} officers={officers} />;
};
