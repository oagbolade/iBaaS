import { Box } from '@mui/material';
import React from 'react';
import {
  Details,
  SubTitle
} from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { ViewDetailsResponseType } from '@/mocks';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';

interface Props {
  requestData: ViewDetailsResponseType[];
}

export const RequestDetailsContainer = ({ requestData }: Props) => {
  if (!requestData) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 5
      }}
    >
      {requestData.map((data: ViewDetailsResponseType) => (
        <Box
          key={data.columnName}
          mb={{ mobile: 30, tablet: 0 }}
          sx={{
            padding: { mobile: 6, tablet: 0 },
            alignItems: { mobile: 'center', tablet: 'normal' }
          }}
        >
          <SubTitle title={data.columnName === 'DebitAcct_Useable_Bal'  ?  'Debit Account Useable Balance' : data.columnName  } />
          <Details
            title={
              data.columnName === 'TranAmount' || data.columnName === 'DebitAcct_Useable_Bal'
                ? `NGN ${formatCurrency(data.columnValue)}`
                : data.columnValue
            }
          />
        </Box>
      ))}
    </Box>
  );
};