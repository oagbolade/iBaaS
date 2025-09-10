'use client';
import React from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import DOMPurify from 'dompurify';
import { COLUMN } from './COLUMN';
import { FilterSection } from './FilterSection';
import {
  MuiTableContainer,
  renderEmptyTableBody,
  StyledTableRow
} from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { ISearchParams } from '@/app/api/search/route';
import { FormSkeleton } from '@/components/Loaders';
import { Status } from '@/components/Labels';
import { useGetBranches } from '@/api/general/useBranches';
import { useFilterCustomerAccountSearch } from '@/api/customer-service/useCustomer';
import { useGetStatus } from '@/api/general/useStatus';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';

type Props = {
  customerId: string;
  accountNumber: string;
  accountName: string;
};

const ActionMenuProps: React.FC<Props> = ({
  accountNumber,
  customerId,
  accountName
}: Props) => {
  return (
    <Link
      href={`/loan/overdrafts/view-overdraft?accountNumber=${DOMPurify.sanitize(accountNumber)}&accountName=${DOMPurify.sanitize(accountName)}&custmerId=${DOMPurify.sanitize(
        customerId
      )}`}
    >
      View Details
    </Link>
  );
};

export const OverDrafts = () => {
  const { branches } = useGetBranches();
  const { isLoading } = useGlobalLoadingState();

  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<ISearchParams>('overdraft');

  const { status } = useGetStatus();
  const handleSearch = async (params: ISearchParams | null) => {
    setSearchParams(params);
    setSearchActive(true);
  };

  const {
    totalPages,
    totalElements,
    data: customerAccountData,
    isLoading: isOverdraftDataLoading
  } = useFilterCustomerAccountSearch({
    ...searchParams,
    page
  });

  return (
    <Box
      sx={{
        padding: '25px',
        width: '100%',
        marginTop: '60px'
      }}
    >
      <Box
        sx={{
          marginBottom: '25px'
        }}
      />

      {branches !== undefined && status !== undefined && (
        <FilterSection
          branches={branches}
          status={status}
          onSearch={handleSearch}
        />
      )}

      {isLoading || isOverdraftDataLoading ? (
        <FormSkeleton noOfLoaders={3} />
      ) : (
        <MuiTableContainer
          columns={COLUMN}
          tableConfig={{
            hasActions: true
          }}
          data={customerAccountData}
          totalPages={totalPages}
          totalElements={totalElements}
          setPage={setPage}
          page={page}
          showHeader={{
            mainTitle: 'Overdrafts',
            secondaryTitle: 'Set overdraft limit for all your customers.',
            hideFilterSection: true
          }}
        >
          {searchActive ? (
            customerAccountData?.map((dataItem: any) => {
              return (
                <StyledTableRow key={dataItem.userid}>
                  <StyledTableCell component="th" scope="row">
                    {dataItem.accounttitle || 'N/A'}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    {dataItem.accountnumber || 'N/A'}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    {dataItem.branchcode || 'N/A'}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    {dataItem.productName || 'N/A'}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    {`NGN ${formatCurrency(dataItem?.bkbalance || 0) || 'N/A'}`}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    <Status
                      label={dataItem?.status === 1 ? 'Active' : 'Dormant'}
                      status={dataItem?.status === 1 ? 'success' : 'warning'}
                    />
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    {dataItem.status === 1 ? (
                      <ActionMenuProps
                        accountNumber={dataItem.accountnumber}
                        accountName={dataItem.accounttitle}
                        customerId={dataItem.customerid}
                      />
                    ) : (
                      'N/A'
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })
          ) : (
            <StyledTableRow>
              <StyledTableCell
                colSpan={COLUMN.length + 1}
                component="th"
                scope="row"
              >
                {renderEmptyTableBody(customerAccountData)}
              </StyledTableCell>
            </StyledTableRow>
          )}
        </MuiTableContainer>
      )}
    </Box>
  );
};
