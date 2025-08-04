'use client';
import React, { useState } from 'react';
// eslint-disable-next-line import/no-cycle
import { useSearchParams } from 'next/navigation';
import { Box, Stack } from '@mui/material';
import { title } from '../Forms/style';
import { ChargeConcession } from '@/features/Operation/Forms/ChargeConcession';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { useCurrentBreakpoint } from '@/utils';
import { PrimaryIconButton } from '@/components/Buttons';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { IAccountDetailsResults } from '@/api/ResponseTypes/customer-service';
import { FormSkeleton } from '@/components/Loaders';
import {
  Details,
  SubTitle
} from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { Status } from '@/components/Labels';
import { PageTitle } from '@/components/Typography';
import { useGetChargeConcession } from '@/api/operation/useChargeConcession';

interface Props {
  // eslint-disable-next-line react/no-unused-prop-types
  loading?: boolean;
  accountDetails?: IAccountDetailsResults | undefined;
}

export const PreviewContentOne = ({ accountDetails, loading }: Props) => {
  if (!accountDetails) {
    return null;
  }

  return (
    <Box
      mb={{ mobile: 30, tablet: 0 }}
      sx={{
        padding: { mobile: 6, tablet: 0 },
        alignItems: { mobile: 'center', tablet: 'normal' }
      }}
    >
      {loading && <FormSkeleton noOfLoaders={5} />}
      <PageTitle title="Account Information" styles={title} />
      <SubTitle title="Account Number" />
      <Details title={accountDetails.accountnumber || 'NIL'} />
      <SubTitle title="Account Name" />
      <Details title={accountDetails.accounttitle || 'NIL'} />
      <SubTitle title="Product Name" />
      <Details title={accountDetails.prodname || 'NIL'} />
      <SubTitle title="Branch" />
      <Details title={accountDetails.branch || 'NIL'} />
      <SubTitle title="Book Balance" />
      <Details title={accountDetails.bkbal || 'NIL'} />
      <SubTitle title="Effective Balance" />
      <Details title={accountDetails.effbal || 'NIL'} />
      <SubTitle title="Usable Balance" />
      <Details title={accountDetails.usebal || 'NIL'} />
      <SubTitle title="Source Type" />
      <Details title={accountDetails.source || 'NIL'} />
      <SubTitle title="Source" />
      <Details title={accountDetails.source || 'NIL'} />
      <Box sx={{ marginBottom: '20px' }}>
        <SubTitle title="Account Status" />
        <Status
          label={accountDetails.status ? 'Active' : 'Inative'}
          status={accountDetails.acctstatus ? 'success' : 'danger'}
        />
      </Box>
      <SubTitle title="BVN" />
      <Details title={accountDetails.bvn || 'NIL'} />
      <SubTitle title="Total Charge" />
      <Details title={accountDetails.totalCharge || 'NIL'} />
    </Box>
  );
};

export const ChargeConcessionContainer = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { isLoading } = useGlobalLoadingState();
  const { setDirection } = useSetDirection();
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const { charges } = useGetChargeConcession();
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
        buttonTitle="Submit"
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
      <Box
        sx={{
          marginTop: '60px',
          position: 'fixed',
          top: 0,
          width: 'calc(100vw - 300px)',
          zIndex: 1
        }}
      >
        <TopActionsArea actionButtons={actionButtons} />
      </Box>

      <Box sx={{ marginTop: '70px' }}>
        <Box
          mr={3}
          sx={{
            padding: { mobile: 0, tablet: '30px 0' }
          }}
        >
          {charges !== undefined && (
            <ChargeConcession
              setIsSubmitting={setIsSubmitting}
              isSubmitting={isSubmitting}
              charges={charges}
            />
          )}
        </Box>
      </Box>
    </>
  );
};
