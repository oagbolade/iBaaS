'use client';
import React, { useContext, useState } from 'react';
import { Box } from '@mui/material';
import { FilterSection } from './FilterSection';
import { MuiTableContainer } from '@/components/Table';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { useGetBranches } from '@/api/general/useBranches';
import {
  IDetailedPortfolioAtRiskParams,
  useGetDetailedPortfolioReport
} from '@/api/reports/useGetDetailedPortfolioReport';

import { DownloadReportContext } from '@/context/DownloadReportContext';
import { FormSkeleton } from '@/components/Loaders';
import { detailedPortfolioAtRiskColumn } from '@/constants/Reports/COLUMNS';
import { ReportModuleContext } from '@/context/ReportModuleContext';
import { IPortfoliodetailedReport } from '@/api/ResponseTypes/reports';
import { renderEmptyTableBody, StyledTableRow } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { ISearchParams } from '@/app/api/search/route';

export const IndividualLoan = () => {
  const [pageNumber, setPageNumber] = useState<string>('1');
  const { setExportData, setReportType } = useContext(DownloadReportContext);
  const { dateValue, isDateFilterApplied } = React.useContext(
    DateRangePickerContext
  );
  const { branches, isLoading: isbranchLoading } = useGetBranches();
  const { detailedPortfolioAtRiskReportData } = useContext(ReportModuleContext);
  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<ISearchParams>('portfolio-at-risk');
  const { branchCode, search } = searchParams || {};

  const { portfolioatRiskDetailRptList = [], totalRecords } =
    useGetDetailedPortfolioReport({
      ...searchParams,
      branchCode: branchCode ?? undefined,
      search: search ?? undefined,
      productCode: detailedPortfolioAtRiskReportData.productCode,
      pageNumber: page,
      pageSize: 10,
      getAll: isDateFilterApplied
    });

  React.useEffect(() => {
    if (!portfolioatRiskDetailRptList.length) return;

    const formattedExportData = portfolioatRiskDetailRptList.map((item) => ({
      'Account Number': item.accountnumber || '',
      'Account Name': item.fullname || '',
      'Start Date': item.startdate.split('T')[0] || '',
      'Maturity Date': item.matdate.split('T')[0] || '',
      'Principal At Risk': item.principal_At_Risk || '',
      'Loan Amount': item.loanAmount || '',
      'Loan Balance': item.currentbalance || '',
      PAR: item.par || ''
    }));

    // Ensure no blank row or misplaced headers
    setExportData(formattedExportData);
    setReportType('PortfolioAtRisk');
  }, [portfolioatRiskDetailRptList, setExportData, setReportType]);

  const rowsPerPage = 10;
  const totalPages = Math.ceil((totalRecords || 0) / rowsPerPage);
  const handleSearch = (params: IDetailedPortfolioAtRiskParams | null) => {
    setSearchParams({
      ...params,
      startDate: dateValue[0]?.format('YYYY-MM-DD') || '',
      endDate: dateValue[1]?.format('YYYY-MM-DD') || '',
      pageNumber
    });

    setSearchActive(true);
  };

  if (isbranchLoading) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={5} />
      </Box>
    );
  }

  return (
    <Box sx={{ marginTop: '50px', width: '100%' }}>
      <TopOverViewSection useBackButton />
      <Box sx={{ marginTop: '30px', width: '100%' }}>
        <FilterSection branches={branches} onSearch={handleSearch} />
      </Box>
      <Box sx={{ padding: '25px', width: '100%' }}>
        <MuiTableContainer
          tableConfig={{ hasActions: false }}
          columns={detailedPortfolioAtRiskColumn}
          data={portfolioatRiskDetailRptList}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          totalElements={totalRecords}
          showHeader={{
            mainTitle: detailedPortfolioAtRiskReportData?.productName,
            secondaryTitle:
              'See a directory of all portfolios at risk this system.',
            hideFilterSection: true
          }}
        >
          {portfolioatRiskDetailRptList.length > 0 && searchActive ? (
            portfolioatRiskDetailRptList.map(
              (reportDetails: IPortfoliodetailedReport, index) => {
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {reportDetails.accountnumber}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {reportDetails.fullname}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {reportDetails.startdate.split('T')[0]}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {reportDetails.matdate.split('T')[0]}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {reportDetails.principal_At_Risk}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {reportDetails.loanAmount}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {reportDetails.par}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              }
            )
          ) : (
            <StyledTableRow>
              <StyledTableCell
                colSpan={detailedPortfolioAtRiskColumn.length + 1}
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
