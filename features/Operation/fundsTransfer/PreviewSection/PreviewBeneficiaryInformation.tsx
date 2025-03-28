import { Box } from '@mui/material';
import React from 'react';
import { title } from '../../Forms/style';
import { IAccountDetailsResults } from '@/api/ResponseTypes/customer-service';
import { Details, SubTitle } from '@/features/Administrator/Role/ViewRole';
import { PageTitle } from '@/components/Typography';

interface Props {
  accountDetails?: IAccountDetailsResults | undefined;
}

export const PreviewBeneficiaryInformation = ({ accountDetails }: Props) => {
  return (
    <Box
      mb={{ mobile: 30, tablet: 0 }}
      sx={{
        padding: { mobile: 6, tablet: 0 },
        alignItems: { mobile: 'center', tablet: 'normal' }
      }}
    >
      <PageTitle title="BENEFICIARY Information" styles={title} />
      <SubTitle title="BENEFICIARY ACCOUNT NO" />
      <Details title={accountDetails?.accountnumber || 'NIL'} />

      <SubTitle title="BENEFICIARY ACCOUNT NAME" />
      <Details title={accountDetails?.accounttitle || 'NIL'} />

      <SubTitle title="BENEFICIARY BANK" />
      <Details title={accountDetails?.acctty || 'NIL'} />

      <SubTitle title="BOOK BALANCE" />
      <Details title={accountDetails?.bkbal || 'NIL'} />

      <SubTitle title="EFFECTIVE BALANCE" />
      <Details title={accountDetails?.effbal || 'NIL'} />

      <SubTitle title="USABLE BALANCE" />
      <Details title={accountDetails?.holdBal || 'NIL'} />

      <SubTitle title="SOURE TYPE" />
      <Details title={accountDetails?.source || 'NIL'} />

      <SubTitle title="SOURE" />
      <Details title={accountDetails?.siFloor || 'NIL'} />

      <SubTitle title="KYC LEVEL" />
      <Details title={accountDetails?.acctstatus || 'NIL'} />

      <SubTitle title="BVN" />
      <Details title={accountDetails?.bvn || 'NIL'} />

      <SubTitle title="TOTAL CHARGE" />
      <Details title={accountDetails?.totalCharge || 'NIL'} />
    </Box>
  );
};
