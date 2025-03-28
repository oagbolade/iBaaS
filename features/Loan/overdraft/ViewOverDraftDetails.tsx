'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import moment from 'moment';
import { Box, Typography, Button } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { sanitize } from 'dompurify';
import { detailColumn } from './COLUMN';
import { TableActionMenu } from './TableActionMenu';
import colors from '@/assets/colors';
import { useGetOverdraftDetails } from '@/api/loans/useCreditFacility';
import { Status } from '@/components/Labels';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { FormSkeleton } from '@/components/Loaders';

import {
  MuiTableContainer,
  StyledTableRow,
  renderEmptyTableBody
} from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';

type Props = {
  customerId: string;
  accountNumber: string;
  odNumber: string;
  odDetail: any;
};

const ActionMenuProps: React.FC<Props> = ({
  accountNumber,
  customerId,
  odNumber,
  odDetail
}: Props) => {
  return (
    <TableActionMenu
      accountNumber={accountNumber}
      customerId={customerId}
      odNumber={odNumber}
      odDetail={odDetail}
    />
  );
};

const ViewOverDraftDetails = () => {
  const searchParams = useSearchParams();
  const accountNumber = searchParams.get('accountNumber') || '';
  const accountName = searchParams.get('accountName') || '';
  const customerId = searchParams.get('customerId') || '';
  const { odAccDetails, isLoading } = useGetOverdraftDetails(accountNumber);
  const [search, setSearch] = useState<boolean>(true);
  const overdraftData = Array.isArray(odAccDetails) ? odAccDetails : [];

  const actionButtons: any = [
    <Box ml={{ mobile: 2, desktop: 0 }} sx={{ display: 'flex' }}>
      <Button
        variant="contained"
        style={{
          backgroundColor: `${colors.activeBlue400}`
        }}
        sx={{
          borderRadius: '6px',
          width: '136px',
          border: '1px solid rgb(48, 115, 153)',
          height: '40px',
          marginTop: '40px',
          alignItems: 'center'
        }}
      >
        <Link
          href={`/loan/overdrafts/set-overdraft?accountNumber=${sanitize(accountNumber)}&customerId=${sanitize(
            customerId
          )}&actionType=set`}
        >
          Set Overdraft
        </Link>
      </Button>
    </Box>
  ];

  return (
    <Box>
      <TopActionsArea actionButtons={actionButtons} />

      {isLoading ? (
        <FormSkeleton noOfLoaders={3} />
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '32px',
            margin: 'auto',
            marginTop: '24px'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              padding: '20px',
              border: '1px solid #E0E0E0',
              borderRadius: '8px',
              backgroundColor: '#F9F9F9',
              marginBottom: '16px'
            }}
          >
            <Box
              sx={{
                marginRight: '50px'
              }}
            >
              <Typography
                variant="subtitle2"
                fontWeight="normal"
                sx={{ opacity: 0.7 }}
              >
                ACCOUNT NAME
              </Typography>
              <Typography variant="body1">{accountName}</Typography>
            </Box>
            <Box>
              <Typography
                variant="subtitle2"
                fontWeight="normal"
                sx={{ opacity: 0.7 }}
              >
                ACCOUNT NUMBER
              </Typography>
              <Typography variant="body1">{accountNumber}</Typography>
            </Box>
          </Box>

          <Box sx={{ width: '100%' }}>
            <MuiTableContainer
              columns={detailColumn}
              tableConfig={{ hasActions: true }}
              data={overdraftData}
            >
              {search ? (
                overdraftData.map((dataItem: any) => {
                  return (
                    <StyledTableRow key={dataItem.userid}>
                      <StyledTableCell component="th" scope="row">
                        {dataItem.facilityType}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {`NGN ${formatCurrency(dataItem?.amount || 0) || 'N/A'}`}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {moment(odAccDetails.effective_dt).format(
                          'MMMM Do YYYY, h:mm:ss a'
                        ) || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {moment(odAccDetails.expiryDate).format(
                          'MMMM Do YYYY, h:mm:ss a'
                        ) || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        <Status
                          label={
                            dataItem?.status === 'Running'
                              ? 'Running'
                              : 'Expired'
                          }
                          status={
                            dataItem?.status === 'Running'
                              ? 'success'
                              : 'matured'
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        <ActionMenuProps
                          accountNumber={dataItem.accountNumber || 'N/A'}
                          customerId={dataItem?.customerID}
                          odNumber={dataItem?.odNumber}
                          odDetail={dataItem}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })
              ) : (
                <StyledTableRow>
                  <StyledTableCell
                    colSpan={detailColumn.length + 1}
                    component="th"
                    scope="row"
                  >
                    {renderEmptyTableBody(overdraftData)}
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </MuiTableContainer>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ViewOverDraftDetails;
