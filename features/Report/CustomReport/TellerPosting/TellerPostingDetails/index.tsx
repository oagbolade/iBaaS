'use client';
import { Box, Typography } from '@mui/material';
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

export const TellerPostingDetails = () => {
  // An endpoint should be created to fetch teller posting details and not using the query params.
  // Make sure o change the endpoint to fetch teller posting details when available.
  const acctNo = useGetParams('acctNo') || '';
  const ref = useGetParams('ref') || '';
  const narration = useGetParams('narration') || '';
  const valueDate = useGetParams('valueDate') || '';
  const toVault = useGetParams('toVault') || '';
  const accountTitle = useGetParams('accountTitle') || '';
  const withdrawal = useGetParams('withdrawal') || '';
  const creditAcct = useGetParams('creditAcct') || '';
  const curbal = useGetParams('curbal') || '';
  const fromVault = useGetParams('fromVault') || '';
  const deposit = useGetParams('deposit') || '';
  const prevbal = useGetParams('prevbal') || '';
  const debitacct = useGetParams('debitacct') || '';
  const postseq = useGetParams('postseq') || '';
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
                  <PageTitle
                    title="ACCOUNT NUMBER"
                    styles={{ ...ViewAccountTitle }}
                  />
                  <PageTitle title={acctNo} styles={{ ...ViewTitle }} />
                </Box>
              </Box>
            </Box>
          </Box>

          <Box>
            <Box>
              <Box>
                <Box sx={ViewStyle}>
                  <PageTitle
                    title="VALUE DATE"
                    styles={{ ...ViewAccountTitle }}
                  />
                  <PageTitle title={valueDate} styles={{ ...ViewTitle }} />
                </Box>
              </Box>
            </Box>
          </Box>

          <Box>
            <Box>
              <Box>
                <Box sx={ViewStyle}>
                  <PageTitle
                    title="POST SEQ"
                    styles={{ ...ViewAccountTitle }}
                  />
                  <PageTitle title={postseq} styles={{ ...ViewTitle }} />
                </Box>
              </Box>
            </Box>
          </Box>

          <Box>
            <Box>
              <Box>
                <Box sx={ViewStyle}>
                  <PageTitle title="DR" styles={{ ...ViewAccountTitle }} />
                  <PageTitle title={debitacct} styles={{ ...ViewTitle }} />
                </Box>
              </Box>
            </Box>
          </Box>

          <Box>
            <Box>
              <Box>
                <Box sx={ViewStyle}>
                  <PageTitle
                    title="ACCOUNT TITLE"
                    styles={{ ...ViewAccountTitle }}
                  />
                  <PageTitle title={accountTitle} styles={{ ...ViewTitle }} />
                </Box>
              </Box>
            </Box>
          </Box>

          <Box>
            <Box>
              <Box>
                <Box sx={ViewStyle}>
                  <PageTitle
                    title="REFERENCE"
                    styles={{ ...ViewAccountTitle }}
                  />
                  <PageTitle title={ref} styles={{ ...ViewTitle }} />
                </Box>
              </Box>
            </Box>
          </Box>

          <Box>
            <Box>
              <Box>
                <Box sx={ViewStyle}>
                  <PageTitle
                    title="NARRATION"
                    styles={{ ...ViewAccountTitle }}
                  />
                  <PageTitle title={narration} styles={{ ...ViewTitle }} />
                </Box>
              </Box>
            </Box>
          </Box>

          <Box>
            <Box>
              <Box>
                <Box sx={ViewStyle}>
                  <PageTitle title="CR" styles={{ ...ViewAccountTitle }} />
                  <PageTitle title={creditAcct} styles={{ ...ViewTitle }} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={tellerPostingContainerStyles}>
        <Box>
          <Typography
            sx={{
              fontSize: '20px',
              lineHeight: '32px',
              fontWeight: 700,
              borderBottom: '1px solid #E1E6ED',
              paddingBottom: '20px'
            }}
          >
            Teller Posting Summary
          </Typography>
          <Box sx={ViewTellerPostingStyle}>
            <Box
              sx={{ borderRight: '1px solid #E1E6ED', paddingRight: '190px' }}
            >
              <PageTitle
                title="DR DETAILS"
                styles={{
                  ...ViewAccountTitle,
                  textDecoration: 'underline',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '30px'
                }}
              />
              <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
              >
                <Box>
                  <PageTitle
                    title="PREVIOUS BALANCE"
                    styles={{ ...ViewAccountTitle }}
                  />
                  <PageTitle title={prevbal} styles={{ ...ViewTitle }} />
                </Box>

                <Box>
                  <PageTitle title="DEPOSIT" styles={{ ...ViewAccountTitle }} />
                  <PageTitle title={deposit} styles={{ ...ViewTitle }} />
                </Box>

                <Box>
                  <PageTitle
                    title="FROM VAULT"
                    styles={{ ...ViewAccountTitle }}
                  />
                  <PageTitle title={fromVault} styles={{ ...ViewTitle }} />
                </Box>
              </Box>
            </Box>

            <Box>
              <PageTitle
                title="CR DETAILS"
                styles={{
                  ...ViewAccountTitle,
                  textDecoration: 'underline',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '30px'
                }}
              />
              <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}
              >
                <Box>
                  <PageTitle
                    title="CURRENT TILL BALANCE"
                    styles={{ ...ViewAccountTitle }}
                  />
                  <PageTitle title={curbal} styles={{ ...ViewTitle }} />
                </Box>

                <Box>
                  <PageTitle
                    title="WITHDRAWAL"
                    styles={{ ...ViewAccountTitle }}
                  />
                  <PageTitle title={withdrawal} styles={{ ...ViewTitle }} />
                </Box>

                <Box>
                  <PageTitle
                    title="TO VAULT"
                    styles={{ ...ViewAccountTitle }}
                  />
                  <PageTitle title={toVault} styles={{ ...ViewTitle }} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
