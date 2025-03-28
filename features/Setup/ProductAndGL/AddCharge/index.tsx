import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box } from '@mui/material';
import { CreateCharges } from '../Form/AddCharges';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { useGetBranches } from '@/api/general/useBranches';

type Props = {
  chargeId: string | null;
};
export const AddCharges = ({ chargeId }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { isLoading } = useGlobalLoadingState();
  const { branches } = useGetBranches();

  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');

  const triggerSubmission = () => {
    setIsSubmitting(true);
  };

  const actionButtons: Array<React.ReactNode> = [
    <Box ml={{ mobile: 12, desktop: 0 }}>
      <PrimaryIconButton
        isLoading={isLoading}
        type="submit"
        buttonTitle={`${isEditing ? 'Save Changes' : 'Create Charge'}`}
        onClick={triggerSubmission}
        customStyle={{
          ...submitButton,
          width: { mobile: '60px', desktop: '171' }
        }}
      />
    </Box>
  ];
  return (
    <>
      <TopActionsArea
        customStyle={{ width: '100%' }}
        actionButtons={actionButtons}
      />
      <Box mt={{ mobile: 2, desktop: 0 }} sx={{ padding: '0 25px' }}>
        <Box
          mr={3}
          sx={{
            width: '50%',
            padding: { mobile: 0, tablet: '30px 0' }
          }}
        >
          <CreateCharges
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
            chargeId={chargeId}
            branches={branches}
          />
        </Box>
      </Box>
    </>
  );
};
