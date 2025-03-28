'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { FilterSection } from './FilterSection';
import { MuiTableContainer } from '@/components/Table';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { useGetBranches } from '@/api/general/useBranches';
import {
  DownloadReportContext,
  IReportQueryParams
} from '@/context/DownloadReportContext';
import { useGetAccountInDebit } from '@/api/reports/useGetAccountInDebit';
import { renderEmptyTableBody, StyledTableRow } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { accountDebitInReportColumns } from '@/constants/Reports/COLUMNS';
import { IAccountInDebitResponse } from '@/api/ResponseTypes/reports';
import { FormSkeleton } from '@/components/Loaders';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { ISearchParams } from '@/app/api/search/route';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';

export const AccountDebit = () => {
  const { dateValue, isDateFilterApplied } = React.useContext(
    DateRangePickerContext
  );
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [page, setPage] = useState<string>('1');
  const { setExportData, setReportType, setReportQueryParams } = useContext(
    DownloadReportContext
  );
  const { branches, isLoading: isLoadingBranches } = useGetBranches();

  const { accountsinDebitList = [], isLoading: isLoadingAccountInDebit } =
    useGetAccountInDebit({
      ...searchParams,
      pageSize: '10',
      pageNumber: page,
      getAll: isDateFilterApplied
    });

  const rowsPerPage = 10;
  const totalElements = accountsinDebitList.length;
  const totalPages = Math.ceil(totalElements / rowsPerPage);

  const handleSearch = (params: ISearchParams | null) => {
    setSearchParams({
      ...params,
      startDate: dateValue[0]?.format('YYYY-MM-DD') || '',
      endDate: dateValue[1]?.format('YYYY-MM-DD') || ''
    });
    setReportType('AccountDebit');
    setReportQueryParams(params as IReportQueryParams); // TODO: need to pass accept just required fields here
  };

  // Set export data when accountEnquiryData is retrieved
  useEffect(() => {
    if (accountsinDebitList?.length > 0) {
      setExportData(accountsinDebitList);
    }
  }, [accountsinDebitList]);

  if (isLoadingAccountInDebit || isLoadingBranches) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={5} />
      </Box>
    );
  }

  return (
    <Box sx={{ marginTop: '50px', width: '100%' }}>
      <TopOverViewSection useBackButton />
      <FilterSection branches={branches} onSearch={handleSearch} />
      <Box sx={{ padding: '25px', width: '100%' }}>
        <MuiTableContainer
          columns={accountDebitInReportColumns}
          data={accountsinDebitList}
          page={Number(page)}
          setPage={setPage}
          totalPages={totalPages}
          totalElements={totalElements}
          showHeader={{
            mainTitle: 'Account in Debit',
            secondaryTitle:
              'See a directory of all Account in Debit Report in this system.',
            hideFilterSection: true
          }}
        >
          {accountsinDebitList.length > 0 ? (
            accountsinDebitList?.map(
              (accountData: IAccountInDebitResponse, index) => {
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {accountData?.accountnumber || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {accountData?.accounttitle || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {accountData?.customerid || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {`NGN ${formatCurrency(accountData?.bkBalance || 0) || 'N/A'}`}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {accountData?.accountOfficer || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {accountData?.branchName || 'N/A'}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              }
            )
          ) : (
            <StyledTableRow>
              <StyledTableCell
                colSpan={accountDebitInReportColumns.length + 1}
                component="th"
                scope="row"
              >
                {renderEmptyTableBody()}
              </StyledTableCell>
            </StyledTableRow>
          )}
        </MuiTableContainer>
      </Box>
    </Box>
  );
};
