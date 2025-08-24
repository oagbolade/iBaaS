'use client';
import React, { useContext, useState } from 'react';
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
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

export const TransactionClearing = () => {
  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage,
  } = usePersistedSearch<ISearchParams>('transaction-clearing');
  const { setExportData, setReportType } = useContext(DownloadReportContext);
  const { status } = useGetStatus();
  const { branches } = useGetBranches();
  const { dateValue, isDateFilterApplied } = React.useContext(
    DateRangePickerContext,
  );

  const { data: transactionsinClearingList = [], isLoading } =
    useGetTransactionClearing({
      ...searchParams,
      page,
      pageNumber: String(page),
      pageSize: '20',
      getAll: isDateFilterApplied,
    });

  React.useEffect(() => {
    if (!transactionsinClearingList?.length) return;

    const formattedExportData = transactionsinClearingList?.map((item) => ({
      'Account Number': item?.accountnumber || '',
      'Bank Name': item?.bankname || '',
      'Cheque No': item?.chequeno || '',
      'Created Date': item?.create_dt?.split(' ')[0] || '',
      'Value Date': item?.valuedate?.split(' ')[0] || '',
      Amount: item?.tranamount || '',
      Narration: item?.narration || '',
      'Posted By': item?.userid || '',
    }));

    // Ensure no blank row or misplaced headers
    setExportData(formattedExportData);
    setReportType('TransactionInClearing');
  }, [transactionsinClearingList]);

  const handleSearch = async (params: ISearchParams | null) => {
    setSearchParams({
      ...params,
      startDate: dateValue[0]?.format('YYYY-MM-DD') || '',
      endDate: dateValue[1]?.format('YYYY-MM-DD') || '',
    });
    setSearchActive(true);
  };
  return (
    <Box sx={{ marginTop: '50px', width: '100%' }}>
      <TopOverViewSection useBackButton />
      <Box sx={{ marginTop: '20px', padding: '25px' }}>
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
              hideFilterSection: true,
            }}
            tableConfig={{
              hasActions: false,
            }}
          >
            {searchActive ? (
              transactionsinClearingList?.map(
                (dataItem: ITransactionClearing) => {
                  return (
                    <StyledTableRow key={dataItem.accountnumber}>
                      <StyledTableCell component="th" scope="row">
                        {dataItem?.accountnumber || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem?.bankname || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem?.chequeno || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem?.create_dt?.split(' ')[0] || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem?.valuedate?.split(' ')[0] || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem?.tranamount || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem?.narration || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem?.userid || 'N/A'}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                },
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
