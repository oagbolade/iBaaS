'use client';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { PageTitle } from '@/components/Typography';
import {
  tellerPostingContainerStyles,
  ViewAccountContainer,
  ViewAccountTitle,
  ViewStyle,
  ViewTellerPostingStyle,
  ViewTitle
} from '@/components/ViewReport/style';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { BackButton } from '@/components/Revamp/Buttons';
import { backButtonContainerStyle } from '@/features/Requests/styles';
import { MuiTableContainer } from '@/components/Table';
import { useGetDisbursedLoanReport } from '@/api/reports/useGetDisbursedLoan';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';

export const ViewDisbursedLoanReport = () => {
  const gender = useGetParams('gender') || '';
  const settlementAccount = useGetParams('settlementAccount') || '';
  const startDate = useGetParams('startDate') || '';
  const matDate = useGetParams('matDate') || '';
  const casaBalance = useGetParams('casaBalance') || '';
  const loanstage = useGetParams('loanstage') || '';
  const branch = useGetParams('branch') || '';
  const productCode = useGetParams('productCode') || '';
  const riskrating = useGetParams('riskrating') || '';

  return (
    <Box sx={{ marginTop: '100px' }}>
      <Box sx={backButtonContainerStyle}>
        <BackButton />
      </Box>
      <Box
        sx={{
          margin: '90px 0 50px 50px',
          width: 'inset',
          padding: '50px',
          border: '1px solid #E1E6ED'
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            rowGap: '60px',
            columnGapGap: '20px'
          }}
        >
          <Box>
            <Box>
              <Box>
                <Box sx={ViewStyle}>
                  <PageTitle title="Gender" styles={{ ...ViewAccountTitle }} />
                  <PageTitle title={gender} styles={{ ...ViewTitle }} />
                </Box>
              </Box>
            </Box>
          </Box>

          <Box>
            <Box>
              <Box>
                <Box sx={ViewStyle}>
                  <PageTitle title="Branch" styles={{ ...ViewAccountTitle }} />
                  <PageTitle title={branch} styles={{ ...ViewTitle }} />
                </Box>
              </Box>
            </Box>
          </Box>

          <Box>
            <Box>
              <Box>
                <Box sx={ViewStyle}>
                  <PageTitle
                    title="Product Code"
                    styles={{ ...ViewAccountTitle }}
                  />
                  <PageTitle title={productCode} styles={{ ...ViewTitle }} />
                </Box>
              </Box>
            </Box>
          </Box>

          <Box>
            <Box>
              <Box>
                <Box sx={ViewStyle}>
                  <PageTitle
                    title="Start Date"
                    styles={{ ...ViewAccountTitle }}
                  />
                  <PageTitle title={startDate} styles={{ ...ViewTitle }} />
                </Box>
              </Box>
            </Box>
          </Box>

          <Box>
            <Box>
              <Box>
                <Box sx={ViewStyle}>
                  <PageTitle
                    title="Maturity date"
                    styles={{ ...ViewAccountTitle }}
                  />
                  <PageTitle title={matDate} styles={{ ...ViewTitle }} />
                </Box>
              </Box>
            </Box>
          </Box>

          <Box>
            <Box>
              <Box>
                <Box sx={ViewStyle}>
                  <PageTitle
                    title="Settlement Account"
                    styles={{ ...ViewAccountTitle }}
                  />
                  <PageTitle
                    title={settlementAccount}
                    styles={{ ...ViewTitle }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          <Box>
            <Box>
              <Box>
                <Box sx={ViewStyle}>
                  <PageTitle
                    title="CASA Balance"
                    styles={{ ...ViewAccountTitle }}
                  />
                  <PageTitle title={casaBalance} styles={{ ...ViewTitle }} />
                </Box>
              </Box>
            </Box>
          </Box>

          <Box>
            <Box>
              <Box>
                <Box sx={ViewStyle}>
                  <PageTitle
                    title="Loan Stage"
                    styles={{ ...ViewAccountTitle }}
                  />
                  <PageTitle title={loanstage} styles={{ ...ViewTitle }} />
                </Box>
              </Box>
            </Box>
          </Box>

          <Box>
            <Box>
              <Box>
                <Box sx={ViewStyle}>
                  <PageTitle
                    title="Risk Rating"
                    styles={{ ...ViewAccountTitle }}
                  />
                  <PageTitle title={riskrating} styles={{ ...ViewTitle }} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
