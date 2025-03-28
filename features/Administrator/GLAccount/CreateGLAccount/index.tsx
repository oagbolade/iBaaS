'use client';
import { Box, Stack } from '@mui/material';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PermissionsSection } from './PermissionsSection';
import { CreateGLAccount as CreateGLAccountForm } from '@/features/Administrator/Forms/CreateGLAccount';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  useGetGLAccount,
  useGetGLClasType,
  useGetGLType,
  useGetNode
} from '@/api/admin/useCreateGLAccount';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { useGetCurrency } from '@/api/general/useCurrency';
import { useGetStatus } from '@/api/general/useStatus';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';

export const CreateGLAccount = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { isLoading } = useGlobalLoadingState();

  const { setDirection } = useSetDirection();
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
        buttonTitle={`${isEditing ? 'Save Changes' : 'Create GL Account'}`}
        onClick={triggerSubmission}
        customStyle={{ ...submitButton }}
      />
    </Box>
  ];

  const { currencies } = useGetCurrency();
  const { glType } = useGetGLType();
  const { status } = useGetStatus();
  const { node } = useGetNode();
  const { glClasses } = useGetGLClasType();
  const { bankgl } = useGetGLAccount();

  return (
    <>
      <Box sx={{ width: '100%', padding: '0 13px' }}>
        <TopActionsArea
          customStyle={{ width: '100%' }}
          actionButtons={actionButtons}
        />
      </Box>
      <Box mt={{ mobile: 2, desktop: 0 }} sx={{ padding: '0 25px' }}>
        <Stack direction={setDirection()}>
          <Box
            mr={{ mobile: 0, desktop: 3 }}
            sx={{
              width: { mobile: '100%', desktop: '50%' },
              padding: { mobile: 2, tablet: '30px 0' }
            }}
          >
            {currencies !== undefined &&
              glType !== undefined &&
              status !== undefined &&
              node !== undefined &&
              glClasses !== undefined &&
              bankgl !== undefined && (
                <CreateGLAccountForm
                  isSubmitting={isSubmitting}
                  setIsSubmitting={setIsSubmitting}
                  glType={glType}
                  currencies={currencies}
                  status={status}
                  bankgl={Array.isArray(bankgl) ? bankgl : []}
                />
              )}
          </Box>
          <PermissionsSection />
        </Stack>
      </Box>
    </>
  );
};
