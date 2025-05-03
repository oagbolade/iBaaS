'use client';
import { Box } from '@mui/material';
import { useGetAllChequeBooks } from '@/api/customer-service/useCheque';
import { useGetBranches } from '@/api/general/useBranches';
import { FormSkeleton } from '@/components/Loaders';
import { RangeCheque } from '@/features/CustomerService/Form/RangeCheque';

export const RangeChequeContainer = () => {
  const { checkbooks, isLoading } = useGetAllChequeBooks();
  const { branches, isLoading: areBranchesLoading } = useGetBranches();

  if (isLoading || areBranchesLoading) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={3} />
      </Box>
    );
  }

  return <RangeCheque checkbooks={checkbooks} branches={branches} />;
};
