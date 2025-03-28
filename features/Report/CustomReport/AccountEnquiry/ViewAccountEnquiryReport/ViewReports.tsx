'use client';
import React from 'react';
import { Box } from '@mui/material';
import { PageTitle } from '@/components/Typography';
import { IGetAccountEnquiry } from '@/api/ResponseTypes/reports';
import {
  ViewAccountContainer,
  ViewAccountTitle,
  ViewStyle,
  ViewTitle
} from '@/components/ViewReport/style';
import { formatKey } from '@/utils/formatKey';

interface Props {
  accountEnquiryData: IGetAccountEnquiry;
}

export const ViewReports = ({ accountEnquiryData }: Props) => {
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
          {Object.entries(accountEnquiryData).map(([key, value]) => (
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
