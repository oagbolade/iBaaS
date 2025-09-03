'use client';
import React, { useContext } from 'react';
import { Box } from '@mui/material';
import { FilterSection } from './FilterSection';
import { MuiTableContainer } from '@/components/Table';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { useGetBranches } from '@/api/general/useBranches';
// import { IEnquiryParams } from '@/api/reports/useGetAccountEnquiryBybranchId';
import { FormSkeleton } from '@/components/Loaders';
import { tellerblanceReportcolumn } from '@/constants/Reports/COLUMNS';
import { useGetTellerBalanceReport } from '@/api/reports/useGetTellerBalanceReport';
import { ITellerBalanceReportResponse } from '@/api/ResponseTypes/reports';
import { renderEmptyTableBody, StyledTableRow } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { ISearchParams } from '@/app/api/search/route';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

export const TellerBalance = () => {
  const { setExportData, setReportType } = useContext(DownloadReportContext);
  const { dateValue, isDateFilterApplied } = React.useContext(
    DateRangePickerContext
  );

  const { branches, isLoading: isLoadingBranches } = useGetBranches();

  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<ISearchParams>('teller-balance');

  const { tellerBalanceList = [], isLoading: isLoadingAccountInDebit } =
    useGetTellerBalanceReport({
      ...searchParams,
      pageSize: 20,
      pageNumber: page,
      getAll: isDateFilterApplied
    });

  React.useEffect(() => {
    if (!tellerBalanceList.length) return;

    const formattedExportData = tellerBalanceList.map((item) => ({
      'Till Number': item.tillNumber || '',
      'Till Name': item.tillName || '',
      'Staff Name': item.staffName || '',
      'Branch Code': item.branchcode || '',
      'User ID': item.userid || '',
      'Till Balance': item.bkBalance || ''
    }));

    // Ensure no blank row or misplaced headers
    setExportData(formattedExportData);
    setReportType('TellerBalance');
  }, [tellerBalanceList, setExportData, setReportType]);

  const rowsPerPage = 10;
  const totalElements = tellerBalanceList.length;
  const totalPages = Math.ceil(totalElements / rowsPerPage);
  
  const handleSearch = (params: ISearchParams | null) => {
    console.log('Params from search', params);
    setSearchParams({
      ...params,
      startDate: dateValue[0]?.format('YYYY-MM-DD') || '',
      endDate: dateValue[1]?.format('YYYY-MM-DD') || ''
    });
    setSearchActive(true);

  };

  if (isLoadingBranches) {
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
        {isLoadingAccountInDebit ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <MuiTableContainer
            columns={tellerblanceReportcolumn}
            data={tellerBalanceList}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            totalElements={totalElements}
            showHeader={{
              mainTitle: 'Teller Balance Report',
              secondaryTitle:
                'See a directory of all Teller Balance Report in this system.',
              hideFilterSection: true
            }}
          >
            {searchActive ? (
              tellerBalanceList?.map(
                (accountData: ITellerBalanceReportResponse, index) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {accountData?.tillNumber || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {accountData?.tillName || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {accountData?.staffName || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {accountData?.branchcode || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {accountData?.userid || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {accountData?.bkBalance || 'N/A'}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                }
              )
            ) : (
              <StyledTableRow>
                <StyledTableCell
                  colSpan={tellerblanceReportcolumn.length + 1}
                  component="th"
                  scope="row"
                >
                  {renderEmptyTableBody(tellerBalanceList)}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </MuiTableContainer>
        )}
      </Box>
    </Box>
  );
};
