'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box } from '@mui/material';
import { AddCasaNewProduct } from '../Form/AddCasaProduct';
import { AddTreasuryNewProduct } from '../Form/AddTreasuryProduct';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { PrimaryIconButton } from '@/components/Buttons';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { TopActionsArea } from '@/components/Revamp/Shared';

type Props = {
  productCasaId: string | null;
};
export const AddTreasuryProduct = ({ productCasaId }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { isLoading } = useGlobalLoadingState();
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
        buttonTitle={`${isEditing ? 'Save Changes' : 'Submit'}`}
        onClick={triggerSubmission}
        customStyle={{
          ...submitButton,
          width: { mobile: '60px', desktop: '171' }
        }}
      />
    </Box>
  ];
  return (
    <Box>
      <TopActionsArea
        customStyle={{ width: '100%' }}
        actionButtons={actionButtons}
      />
      <Box mt={{ mobile: 2, desktop: 0 }} sx={{ padding: '0 25px' }}>
        <Box
          mr={3}
          sx={{
            width: '100%',
            padding: { mobile: 0, tablet: '30px 0' }
          }}
        >
          <AddTreasuryNewProduct
            productCode={productCasaId}
            setIsSubmitting={setIsSubmitting}
            isSubmitting={isSubmitting}
          />
        </Box>
      </Box>
    </Box>
  );
};
