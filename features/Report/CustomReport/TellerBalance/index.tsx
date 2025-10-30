'use client';
import React, { useContext, useCallback } from 'react';
import { Box } from '@mui/material';
import { FilterSection } from './FilterSection';
import { MuiTableContainer } from '@/components/Table';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { useGetBranches } from '@/api/general/useBranches';
import { FormSkeleton } from '@/components/Loaders';
import { tellerblanceReportcolumn } from '@/constants/Reports/COLUMNS';
import { useGetTellerBalanceReport } from '@/api/reports/useGetTellerBalanceReport';
import { ITellerBalanceReportResponse } from '@/api/ResponseTypes/reports';
import { renderEmptyTableBody, StyledTableRow } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { ISearchParams } from '@/app/api/search/route';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';

export const TellerBalance = () => {
  const { isLoading } = useGlobalLoadingState();
  const { setExportData, setReportType } = useContext(DownloadReportContext);
  const { dateValue } = React.useContext(DateRangePickerContext);

  const { branches } = useGetBranches();
  const {
    searchParams,
    setSearchParams,
    page,
    setPage,
    searchActive,
    setSearchActive
  } = usePersistedSearch<ISearchParams>('teller-balance');

  const handleSearch = useCallback(
    async (params: ISearchParams) => {
      setSearchParams(params);
      setSearchActive(true);
      setPage(1); // Reset to first page on new search
    },
    [setSearchParams, setPage, searchActive, setSearchActive]
  );

  const { tellerBalanceList = [], isLoading: tellerIsLoading } =
    useGetTellerBalanceReport({
      ...searchParams,
      pageSize: 20,
      page,
      getAll: true
    });
  const { tellerBalanceList: downloadData = [] } = useGetTellerBalanceReport({
    ...searchParams,
    page,
    getAll: true
  });

  React.useEffect(() => {
    if (!downloadData || downloadData.length === 0) {
      setExportData([]);
      return;
    }

    const formattedExportData = downloadData.map((item) => ({
      'Till Number': item.tillNumber || '',
      'Till Name': item.tillName || '',
      'Staff Name': item.staffName || '',
      'Branch Code': item.branchcode || '',
      'User ID': item.userid || '',
      'Till Balance': item.bkBalance || ''
    }));

    setExportData(formattedExportData);
    setReportType('TellerBalance');
  }, [downloadData, setExportData, setReportType]);

  const rowsPerPage = 10;
  const totalElements = downloadData.length;
  const totalPages = Math.ceil(totalElements / rowsPerPage);

  return (
    <Box sx={{ marginTop: '50px', width: '100%' }}>
      <TopOverViewSection useBackButton />
      {branches && (
        <FilterSection branches={branches} onSearch={handleSearch} />
      )}
      <Box sx={{ padding: '25px', width: '100%' }}>
        {isLoading || tellerIsLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <MuiTableContainer
            columns={tellerblanceReportcolumn}
            data={tellerBalanceList}
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
            {searchActive && tellerBalanceList.length > 0 ? (
              tellerBalanceList.map(
                (dataItem: ITellerBalanceReportResponse) => (
                  <StyledTableRow key={dataItem?.userid}>
                    <StyledTableCell component="th" scope="row">
                      {dataItem?.tillNumber || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {dataItem?.tillName || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.staffName || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.branchName || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.userid || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {`NGN ${
                        formatCurrency(dataItem?.bkBalance || 0) || 'N/A'
                      }`}
                    </StyledTableCell>
                  </StyledTableRow>
                )
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
