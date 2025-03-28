import { Box } from '@mui/material';
import React from 'react';
import {
  Details,
  SubTitle
} from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { ViewDetailsResponseType } from '@/mocks';

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
          mb={{ mobile: 30, tablet: 0 }}
          sx={{
            padding: { mobile: 6, tablet: 0 },
            alignItems: { mobile: 'center', tablet: 'normal' }
          }}
        >
          <SubTitle title={data.columnName} />
          <Details title={data.columnValue} />
        </Box>
      ))}
    </Box>
  );
};
