'use client';
import React, { useContext, useState } from 'react';
import { Box } from '@mui/material';
import { FilterSection } from './FilterSection';
import { MuiTableContainer } from '@/components/Table';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { useGetBranches } from '@/api/general/useBranches';
import { IEnquiryParams } from '@/api/reports/useGetAccountEnquiryBybranchId';
import { FormSkeleton } from '@/components/Loaders';
import { tellerblanceReportcolumn } from '@/constants/Reports/COLUMNS';
import { useGetTellerBalanceReport } from '@/api/reports/useGetTellerBalanceReport';
import { ITellerBalanceReportResponse } from '@/api/ResponseTypes/reports';
import { renderEmptyTableBody, StyledTableRow } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';

export const TellerBalance = () => {
  const [searchParams, setSearchParams] = useState<IEnquiryParams | null>(null);
  const [page, setPage] = useState<number>(1);
  const { setExportData, setReportType } = useContext(DownloadReportContext);
  const { dateValue, isDateFilterApplied } = React.useContext(
    DateRangePickerContext
  );

  const { branches, isLoading: isLoadingBranches } = useGetBranches();

  const { branchId, customerId } = searchParams || {};

  const { tellerBalanceList = [], isLoading: isLoadingAccountInDebit } =
    useGetTellerBalanceReport({
      ...searchParams,
      branchId,
      customerId,
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
  }, [tellerBalanceList]);

  const rowsPerPage = 10;
  const totalElements = tellerBalanceList.length;
  const totalPages = Math.ceil(totalElements / rowsPerPage);

  const handleSearch = (params: IEnquiryParams | null) => {
    setSearchParams({
      ...params,
      startDate: dateValue[0]?.format('YYYY-MM-DD') || '',
      endDate: dateValue[1]?.format('YYYY-MM-DD') || ''
    });
    setPage(1); // Reset to the first page on new search
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
          {tellerBalanceList.length > 0 ? (
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
                {renderEmptyTableBody()}
              </StyledTableCell>
            </StyledTableRow>
          )}
        </MuiTableContainer>
      </Box>
    </Box>
  );
};
