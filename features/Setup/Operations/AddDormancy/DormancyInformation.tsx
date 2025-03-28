'use client';
import { Box } from '@mui/material';
import {
  Details,
  SubTitle
} from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';
import { Status } from '@/components/Labels';
import { BatchTitle } from '@/features/Operation/Forms/style';
import { PageTitle } from '@/components/Typography';
import { IGLAccountDetail } from '@/api/ResponseTypes/admin';

type AccountInformationProp = {
  accDetailsResults: IGLAccountDetail | undefined;
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
      <Box mt={5} mb={3}>
        <PageTitle title="GL Account Information" styles={BatchTitle} />
      </Box>
      <SubTitle title="Account Name" />
      <Details title={accDetailsResults?.acctName || 'N/A'} />

      <SubTitle title="Product Type Name" />
      <Details title={accDetailsResults?.prodType || 'N/A'} />

      <SubTitle title="GL Node Name" />
      <Details title={accDetailsResults?.glNumber || 'N/A'} />

      <SubTitle title="GL Class" />
      <Details title={accDetailsResults?.gl_ClassCode || 'N/A'} />

      <SubTitle title="Book Balance" />
      <Details
        title={`NGN ${formatCurrency(accDetailsResults?.bkBalance || 0) || 'N/A'}`}
      />
      <Box mb={{ mobile: 5, tablet: 0 }}>
        <SubTitle title="Account Status" />
        <Status
          label={accDetailsResults?.status ? 'Active' : 'Dormant'}
          status={accDetailsResults?.status ? 'success' : 'warning'}
        />
      </Box>
    </Box>
  );
};
