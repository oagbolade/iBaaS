'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Stack } from '@mui/material';
import { AddDormancy } from '../Form/AddDormancy';
import { AccountInformation } from './DormancyInformation';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { useGetProductType } from '@/api/general/useProductType';
import { useGetGLAllAccount } from '@/api/admin/useCreateGLAccount';
import { IGLAccountDetail } from '@/api/ResponseTypes/admin';

type Props = {
  dormancyId: string;
};
export const CreateDormancy = ({ dormancyId }: Props) => {
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
  const { productTypes } = useGetProductType();
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
          {productTypes !== undefined && (
            <AddDormancy
              setIsSubmitting={setIsSubmitting}
              isSubmitting={isSubmitting}
              dormancyId={dormancyId}
              productTypes={productTypes}
            />
          )}
        </Box>
      </Box>
    </>
  );
};
