'use client';
import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { title } from '../Forms/style';
import { useGetCurrency } from '@/api/general/useCurrency';
import { useGetTransactionType } from '@/api/operation/useBatchPosting';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  submitButton,
  cancelButton
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { IAccountDetailsResults } from '@/api/ResponseTypes/customer-service';
import { PageTitle } from '@/components/Typography';
import {
  Details,
  SubTitle
} from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { Status } from '@/components/Labels';
// eslint-disable-next-line import/no-cycle
import {
  BatchPosting,
  MobilePreviewContent
} from '@/features/Operation/Forms/BatchPosting';
import { FormSkeleton } from '@/components/Loaders';

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
      <Details title={accountDetails.bkbal || '0.00'} />

      <SubTitle title="Effective Balance" />
      <Details title={accountDetails.effbal || '0.00'} />

      <SubTitle title="Usable Balance" />
      <Details title={accountDetails.usebal || '0.00'} />

      <SubTitle title="Source Type" />
      <Details title={accountDetails.apptype || 'NIL'} />

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

      <SubTitle title="Phone Number" />
      <Details title={accountDetails.phoneNumber || 'NIL'} />
    </Box>
  );
};

export const PostingContainer = ({ accountDetails }: Props) => {
  const { currencies } = useGetCurrency();
  const { details } = useGetTransactionType();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');
  const triggerSubmission = () => {
    setIsSubmitting(true);
  };
  const actionButtons: any = [
    <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
      <PrimaryIconButton
        buttonTitle="Submit"
        customStyle={{ ...submitButton }}
        onClick={triggerSubmission}
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
          {details !== undefined && currencies !== undefined && (
            <BatchPosting
              currencies={currencies}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
              details={details}
            />
          )}
        </Box>
      </Box>
    </>
  );
};
