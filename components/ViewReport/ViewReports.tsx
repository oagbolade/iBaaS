'use client';
import React from 'react';
import { Box } from '@mui/material';
import {
  ViewAccountContainer,
  ViewStyle,
  ViewAccountTitle,
  ViewTitle
} from './style';
import { PageTitle } from '@/components/Typography';

// this is just a test data. You can check the ViewAccountEnquiryReport in the account enquiry page for more details on how you can implement yours
const accountInfo = {
  accountnumber: 'string',
  accounttitle: 'string',
  customerid: 1270,
  accountOfficer: 'string',
  bkBalance: 7653,
  branchName: 'string',
  Dany: 'string',
  Test: 7653,
  brSamanchName: 'string'
};

export const ViewReports = () => {
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
          {Object.entries(accountInfo).map(([key, value]) => (
            <Box key={key}>
              <Box>
                <Box>
                  <Box sx={ViewStyle}>
                    {/* Display the key as the title */}
                    <PageTitle title={key} styles={{ ...ViewAccountTitle }} />
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
