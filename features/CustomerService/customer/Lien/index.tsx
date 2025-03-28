'use client';
import React from 'react';
import { Box, Grid } from '@mui/material';
import Link from 'next/link';
import { sanitize } from 'dompurify';
import { COLUMNS } from './COLUMNS';
import { PrimaryIconButton } from '@/components/Buttons';
import { TableSingleAction } from '@/components/Table';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { viewOfficerContainer } from '@/features/Administrator/AccountOfficer/ViewAccountOfficer/styles';
import { Details, SubTitle } from '@/features/Administrator/Role/ViewRole';
import { useGetLienDetail } from '@/api/customer-service/useLien';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { useGetAccountDetails } from '@/api/customer-service/useCustomer';
import { Status } from '@/components/Labels';
import { FormSkeleton } from '@/components/Loaders';
import { MuiTableContainer, StyledTableRow } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { ILienDetail } from '@/api/ResponseTypes/customer-service';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';
import { encryptData } from '@/utils/encryptData';

const ActionMenuProps = ({
  holdNumber,
  accountNumber
}: {
  holdNumber: string;
  accountNumber: string;
}) => {
  return (
    <Link
      href={`/customer-service/customer/lien/release-lien/?accountNumber=${sanitize(accountNumber)}&holdNumber=${sanitize(holdNumber)}`}
    >
      <TableSingleAction actionName="Release Lien" />
    </Link>
  );
};

export const LienContainer = () => {
  const accountNumber = useGetParams('accountNumber') || '';
  const { accDetailsResults, isLoading: isAccountDetailsLoading } =
    useGetAccountDetails(encryptData(accountNumber as string) as string);
  const { liendetail, lienexist, isLoading } = useGetLienDetail(
    encryptData(accountNumber) as string
  );
  const [page, setPage] = React.useState(1);

  const actionButtons: any = [
    <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
      <Link
        href={`/customer-service/customer/lien/add-lien?accountNumber=${sanitize(accountNumber)}&customerId=1`}
      >
        <PrimaryIconButton
          buttonTitle="Add Lien"
          customStyle={{ ...submitButton }}
        />
      </Link>
    </Box>
  ];

  if (isAccountDetailsLoading) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={5} />
      </Box>
    );
  }

  return (
    <Box>
      <TopActionsArea actionButtons={actionButtons} />
      {/* Use filter when migrating to reports module */}
      {/* <FilterSection /> */}
      <Box sx={{ padding: '15px' }}>
        <Box sx={viewOfficerContainer}>
          <Grid container spacing={2}>
            <Grid item tablet={4}>
              <SubTitle title="Account Number" />
              <Details title={accountNumber || 'N/A'} />{' '}
            </Grid>
            <Grid item tablet={4}>
              <SubTitle title="Account Name" />
              <Details title={accDetailsResults?.accounttitle || 'N/A'} />{' '}
            </Grid>
            <Grid item tablet={4}>
              {/* Confirmed from Chima, there's nothing like account type, use product instead */}
              <SubTitle title="Product Code" />
              <Details
                title={accDetailsResults?.productcode?.toString() || 'N/A'}
              />{' '}
            </Grid>
            <Grid item tablet={4}>
              <SubTitle title="AccountStatus" />
              <Status
                label={accDetailsResults?.acctstatus ? 'Active' : 'Dormant'}
                status={accDetailsResults?.acctstatus ? 'success' : 'warning'}
              />{' '}
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box mt={2} sx={{ padding: '15px', width: '97%' }}>
        {isLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <MuiTableContainer
            columns={COLUMNS}
            tableConfig={{
              hasActions: true
            }}
            showHeader={{
              mainTitle: 'Lien Overview',
              secondaryTitle: 'See a directory of all lien on this account.',
              hideFilterSection: true
            }}
            data={liendetail}
            setPage={setPage}
            page={page}
          >
            {liendetail?.map((dataItem: ILienDetail) => {
              return (
                <StyledTableRow key={dataItem.holdnumber}>
                  <StyledTableCell component="th" scope="row">
                    {`NGN ${formatCurrency(
                      (dataItem?.holdAmount || 0).toString()
                    )}`}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {dataItem.holdreason || 'N/A'}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {dataItem.effective_dt || 'N/A'}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {dataItem.end_dt || 'N/A'}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Status
                      label={lienexist?.lienexist ? 'Active' : 'No Active Lien'}
                      status={lienexist?.lienexist ? 'success' : 'warning'}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <ActionMenuProps
                      accountNumber={accountNumber}
                      holdNumber={dataItem.holdnumber.toString() || 'N/A'}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </MuiTableContainer>
        )}
      </Box>
    </Box>
  );
};
