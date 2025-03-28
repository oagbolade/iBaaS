import { Box } from '@mui/material';
import React from 'react';
import { title } from '../../Forms/style';
import { PageTitle } from '@/components/Typography';
import { IAccountDetailsResults } from '@/api/ResponseTypes/customer-service';
import { Details, SubTitle } from '@/features/Administrator/Role/ViewRole';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';
import { Status } from '@/components/Labels';
import { UseGetbeneficiaryDetails } from '@/api/ResponseTypes/operation';

interface Props {
  accountDetails?: IAccountDetailsResults | undefined;
  beneficiaryDetails?: UseGetbeneficiaryDetails | undefined;
  beneficiaryBank?: string;
}

export const PreviewBeneficiaryInformation = ({
  accountDetails,
  beneficiaryDetails,
  beneficiaryBank
}: Props) => {
  return (
    <Box
      mb={{ mobile: 30, tablet: 0 }}
      sx={{
        padding: { mobile: 6, tablet: 0 },
        alignItems: { mobile: 'center', tablet: 'normal' }
      }}
    >
      <SubTitle title="BENEFICIARY ACCOUNT NO" />
      <Details title={beneficiaryDetails?.accountNumber || 'NIL'} />

      <SubTitle title="BENEFICIARY ACCOUNT NAME" />
      <Details title={beneficiaryDetails?.accountName || 'NIL'} />

      <SubTitle title="BENEFICIARY BANK" />
      <Details title={beneficiaryBank || 'NIL'} />

      <SubTitle title="BOOK BALANCE" />
      <Details title="NIL" />

      <SubTitle title="EFFECTIVE BALANCE" />
      <Details title="NIL" />

      <SubTitle title="USABLE BALANCE" />
      <Details title="NIL" />

      <SubTitle title="SOURE TYPE" />
      <Details title="NIL" />

      <SubTitle title="SOURE" />
      <Details title="NIL" />

      <SubTitle title="KYC LEVEL" />
      <Details title="NIL" />

      <SubTitle title="BVN" />
      <Details title="NIL" />

      <SubTitle title="TOTAL CHARGE" />
      <Details title="NIL" />
    </Box>
  );
};
