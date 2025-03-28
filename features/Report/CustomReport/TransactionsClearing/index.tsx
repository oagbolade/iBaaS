'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { FilterSection } from './FilterSection';
import { COLUMN } from './COLUMNS';
import { MuiTableContainer } from '@/components/Table';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { useGetStatus } from '@/api/general/useStatus';
import { useGetBranches } from '@/api/general/useBranches';
import { ISearchParams } from '@/app/api/search/route';
import { useGetTransactionClearing } from '@/api/reports/useTransactionClearing';
import { FormSkeleton } from '@/components/Loaders';
import { ITransactionClearing } from '@/api/ResponseTypes/reports';
import { renderEmptyTableBody, StyledTableRow } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';

export const TransactionClearing = () => {
  const [search, setSearch] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [page, setPage] = React.useState(1);
  const { status } = useGetStatus();
  const { branches } = useGetBranches();
  const { transactionsinClearingList, isLoading } = useGetTransactionClearing({
    ...searchParams,
    page
  });
  const handleSearch = async (params: ISearchParams | null) => {
    setSearch(true);
    setSearchParams(params);
  };
  return (
    <Box sx={{ marginTop: '50px', width: '100%' }}>
      <TopOverViewSection useBackButton />
      <Box sx={{ marginTop: '30px', padding: '25px' }}>
        {branches && status && (
          <FilterSection
            branches={branches}
            onSearch={handleSearch}
            status={status}
          />
        )}{' '}
      </Box>
      <Box sx={{ padding: '25px', width: '100%' }}>
        {isLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <MuiTableContainer
            columns={COLUMN}
            data={transactionsinClearingList}
            showHeader={{
              mainTitle: 'Transactions in Clearing',
              secondaryTitle:
                'See a directory of all Transactions in Clearing in this system.',
              hideFilterSection: true
            }}
            tableConfig={{
              hasActions: false
            }}
            setPage={setPage}
            page={page}
          >
            {search ? (
              transactionsinClearingList?.map(
                (dataItem: ITransactionClearing) => {
                  return (
                    <StyledTableRow key={dataItem.accountnumber}>
                      <StyledTableCell component="th" scope="row">
                        {dataItem?.accountnumber || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem?.bankName || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem?.chequeType || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem?.processed || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem?.value_Dt || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem?.amt || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem?.processed || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem?.tranName || 'N/A'}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                }
              )
            ) : (
              <StyledTableRow>
                <StyledTableCell
                  colSpan={COLUMN.length + 1}
                  component="th"
                  scope="row"
                >
                  {renderEmptyTableBody(transactionsinClearingList)}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </MuiTableContainer>
        )}
      </Box>
    </Box>
  );
};
