'use client';
import React from 'react';
import Box from '@mui/material/Box';
import {
  Details,
  SubTitle
} from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { Status } from '@/components/Labels';
import { IAccountDetailsResults } from '@/api/ResponseTypes/customer-service';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';

type AccountInformationProp = {
  accDetailsResults?: IAccountDetailsResults;
};

export const AccountInformation = ({
  accDetailsResults
}: AccountInformationProp) => {
  return (
    <Box
      mb={{ mobile: 30, tablet: 0 }}
      sx={{
        padding: { mobile: 6, tablet: 0 },
        alignItems: { mobile: 'center', tablet: 'normal' }
      }}
    >
      <SubTitle title="Account Name" />
      <Details title={accDetailsResults?.accounttitle || 'N/A'} />

      <SubTitle title="Product Name" />
      <Details title={accDetailsResults?.prodname || 'N/A'} />

      <SubTitle title="Branch" />
      <Details title={accDetailsResults?.branch || 'N/A'} />

      <SubTitle title="Lien" />
      <Details title={accDetailsResults?.accountnumber || 'N/A'} />

      <SubTitle title="OD/TOD" />
      <Details title={accDetailsResults?.accountnumber || 'N/A'} />

      <SubTitle title="Book Balance" />
      <Details
        title={`NGN ${formatCurrency(accDetailsResults?.bkbal || 0) || 'N/A'}`}
      />

      <SubTitle title="Effective Balance" />
      <Details
        title={`NGN ${formatCurrency(accDetailsResults?.effbal || 0) || 'N/A'}`}
      />

      <SubTitle title="Usable Balance" />
      <Details
        title={`NGN ${formatCurrency(accDetailsResults?.usebal || 0) || 'N/A'}`}
      />

      <SubTitle title="Source Type" />
      <Details title={accDetailsResults?.accountnumber || 'N/A'} />

      <SubTitle title="DR Interest" />
      <Details
        title={`NGN ${formatCurrency(accDetailsResults?.usebal || 0) || 'N/A'}`}
      />

      <SubTitle title="CR Interest" />
      <Details
        title={`NGN ${formatCurrency(accDetailsResults?.usebal || 0) || 'N/A'}`}
      />

      <SubTitle title="Pending Charges" />
      <Details
        title={`NGN ${formatCurrency(accDetailsResults?.usebal || 0) || 'N/A'}`}
      />

      <SubTitle title="Source" />
      <Details title={accDetailsResults?.accountnumber || 'N/A'} />

      <Box mb={{ mobile: 5, tablet: 0 }}>
        <SubTitle title="Account Status" />
        <Status
          label={accDetailsResults?.acctstatus ? 'Active' : 'Dormant'}
          status={accDetailsResults?.acctstatus ? 'success' : 'warning'}
        />
      </Box>
    </Box>
  );
};

type PreviewAccountInfoProp = {
  accDetailsResults?: IAccountDetailsResults;
};

export const PreviewAccountInfo = ({
  accDetailsResults
}: PreviewAccountInfoProp) => {
  return (
    <Box sx={{ width: '100%' }}>
      <AccountInformation accDetailsResults={accDetailsResults} />
    </Box>
  );
};
