'use client';
import React from 'react';
import { Box, Stack } from '@mui/material';
import { PermissionsSection } from './PermissionsSection';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { useGetBranches } from '@/api/general/useBranches';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { SetupCompanyForm } from '@/features/Setup/Company/Forms/SetupCompanyForm';
import { useGetCurrency } from '@/api/general/useCurrency';
import { useGetAllStates } from '@/api/general/useGeography';
import { useGetAllCompany } from '@/api/setup/useCreateCompany';

type Props = {
  userid?: string;
};

export const SetupCompany = ({ userid }: Props) => {
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const { setDirection } = useSetDirection();
  const { isLoading } = useGlobalLoadingState();

  const triggerSubmission = () => {
    setIsSubmitting(true);
  };

  const actionButtons: Array<React.ReactNode> = [
    <Box ml={{ mobile: 12, desktop: 0 }}>
      <PrimaryIconButton
        isLoading={isLoading}
        type="submit"
        buttonTitle="Submit"
        onClick={triggerSubmission}
        customStyle={{
          ...submitButton,
          width: { mobile: '60px', desktop: '171' }
        }}
      />
    </Box>
  ];

  const { currencies } = useGetCurrency();
  const { states } = useGetAllStates();
  // TODO: Remove hardcoded values once we are able to get it from the login credentials
  return (
    <>
      <TopActionsArea
        customStyle={{ width: '100%' }}
        actionButtons={actionButtons}
      />
      <Box mt={{ mobile: 2, desktop: 0 }} sx={{ padding: '0 25px' }}>
        <Stack direction={setDirection()}>
          <Box
            mr={3}
            sx={{
              width: '50%',
              padding: { mobile: 0, tablet: '30px 0' }
            }}
          >
            {states !== undefined && currencies !== undefined && (
              <SetupCompanyForm
                userid={userid}
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
                currencies={currencies}
                states={states}
              />
            )}
          </Box>
          <PermissionsSection />
        </Stack>
      </Box>
    </>
  );
};
