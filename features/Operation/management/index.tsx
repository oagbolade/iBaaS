'use client';
import Box from '@mui/material/Box';
import { VaultManagement } from '@/features/Operation/Forms/VaultManagement';
import { useGetBranches } from '@/api/general/useBranches';
import { FormSkeleton } from '@/components/Loaders';
import { IBranches } from '@/api/ResponseTypes/general';

export const VaultManagmentContainer = () => {
  const { branches, isLoading: arebranchesLoading } = useGetBranches();

  if (arebranchesLoading) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={3} />
      </Box>
    );
  }

  return (
    <div>
      <VaultManagement branches={branches as IBranches[]} />
    </div>
  );
};
