'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Box } from '@mui/material';
import { COLUMNS } from './COLUMN';
import { TableActionMenu } from './TableActionMenu';
import { FilterSection } from './FilterSection';
import { PrimaryIconButton } from '@/components/Buttons/PrimaryIconButton';
import {
  MuiTableContainer,
  StyledTableRow,
  renderEmptyTableBody
} from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { Status } from '@/components/Labels';
import { useGetAllLoans } from '@/api/loans/useCreditFacility';
import { useGetBranches } from '@/api/general/useBranches';
import { ISearchParams } from '@/app/api/search/route';
import { FormSkeleton } from '@/components/Loaders';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';

const ActionMenuProps = ({
  accountNumber,
  status,
  settlementAccount,
  productCode,
  customerId
}: {
  status: string;
  accountNumber: string;
  settlementAccount: string;
  productCode: string;
  customerId: string;
}): React.ReactElement => {
  return (
    <TableActionMenu
      accountNumber={accountNumber}
      status={status}
      settlementAccount={settlementAccount}
      productCode={productCode}
      customerId={customerId}
    />
  );
};

export const LoanDirectory = () => {
  const [search, setSearch] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [page, setPage] = React.useState(1);

  const { branches } = useGetBranches();

  const handleSearch = async (params: ISearchParams | null) => {
    setSearchParams(params);
    setSearch(true);
  };

  const {
    totalPages,
    totalElements,
    data: getAllLoanData,
    isLoading: isLoanDataLoading
  } = useGetAllLoans({
    ...searchParams,
    page
  });

  return (
    <Box
      sx={{
        padding: '25px',
        width: '100%',
        marginTop: '80px'
      }}
    >
      <Box
        mb={3}
        mr={{ mobile: 3, tablet: 0 }}
        sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}
      >
        <Link href="/loan/loan-directory/loan-underwriting">
          <PrimaryIconButton
            customStyle={{
              width: '245px',
              height: '48px',
              variant: 'contained'
            }}
            buttonTitle="Create Loan Underwriting"
          />
        </Link>
      </Box>

      {branches && (
        <FilterSection branches={branches} onSearch={handleSearch} />
      )}

      {isLoanDataLoading ? (
        <FormSkeleton noOfLoaders={3} />
      ) : (
        <Box sx={{ width: '100%' }}>
          <MuiTableContainer
            columns={COLUMNS}
            tableConfig={{
              hasActions: true
            }}
            data={getAllLoanData}
            totalPages={totalPages}
            totalElements={totalElements}
            setPage={setPage}
            page={page}
          >
            {search ? (
              getAllLoanData?.map((dataItem: any) => {
                return (
                  <StyledTableRow key={dataItem.userid}>
                    <StyledTableCell component="th" scope="row">
                      {dataItem.fullName}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.accountNumber}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      {dataItem.productName}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {`NGN ${formatCurrency(dataItem?.loanAmount || 0) || 'N/A'}`}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      <Status
                        label={
                          dataItem?.loanStatus === '4' ? 'Active' : 'Matured'
                        }
                        status={
                          dataItem?.loanStatus === '4' ? 'success' : 'matured'
                        }
                      />{' '}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      <ActionMenuProps
                        accountNumber={dataItem.accountNumber || 'N/A'}
                        status={dataItem.loanStatus || '2'}
                        settlementAccount={dataItem?.settlementAcct1}
                        productCode={dataItem?.productCode}
                        customerId={dataItem?.customerID}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })
            ) : (
              <StyledTableRow>
                <StyledTableCell
                  colSpan={COLUMNS.length + 1}
                  component="th"
                  scope="row"
                >
                  {renderEmptyTableBody(getAllLoanData)}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </MuiTableContainer>
        </Box>
      )}
    </Box>
  );
};
