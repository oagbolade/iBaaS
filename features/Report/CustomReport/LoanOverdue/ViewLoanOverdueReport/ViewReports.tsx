'use client';
import React from 'react';
import { Box } from '@mui/material';
import { PageTitle } from '@/components/Typography';
import { IGetLoanOverdueReport } from '@/api/ResponseTypes/reports';
import {
  ViewAccountContainer,
  ViewAccountTitle,
  ViewStyle,
  ViewTitle
} from '@/components/ViewReport/style';
import { formatKey } from '@/utils/formatKey';

interface Props {
  loanOverdueData: IGetLoanOverdueReport;
}

export const ViewReports = ({ loanOverdueData }: Props) => {
  return (
    <Box>
      <Box sx={ViewAccountContainer}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            rowGap: '40px'
          }}
        >
          {Object.entries(loanOverdueData).map(([key, value]) => (
            <Box key={key}>
              <Box>
                <Box>
                  <Box sx={ViewStyle}>
                    {/* Display the key as the title */}
                    <PageTitle
                      title={formatKey(key)}
                      styles={{ ...ViewAccountTitle }}
                    />
                    {/* Display the value */}
                    <PageTitle
                      title={String(value)}
                      styles={{ ...ViewTitle }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
