import { Box } from '@mui/material';
import React from 'react';
import { title } from '../../Forms/style';
import { PageTitle } from '@/components/Typography';
import { IAccountDetailsResults } from '@/api/ResponseTypes/customer-service';
import { Details, SubTitle } from '@/features/Administrator/Role/ViewRole';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';
import { Status } from '@/components/Labels';

interface Props {
    accountDetails?: IAccountDetailsResults | undefined;
}

export const PreviewDebitInformation = ({ accountDetails }: Props) => {
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
          <Details
            title={`NGN ${formatCurrency(accountDetails?.bkbal || 0) || 'N/A'}`}
          />

          <SubTitle title="Effective Balance" />
          <Details
            title={`NGN ${formatCurrency(accountDetails?.effbal || 0) || 'N/A'}`}
          />

          <SubTitle title="Usable Balance" />
          <Details
            title={`NGN ${formatCurrency(accountDetails?.usebal || 0) || 'N/A'}`}
          />

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
          <Details
            title={`NGN ${formatCurrency(accountDetails?.totalCharge || 0) || 'N/A'}`}
          />
        </Box>
    );
};