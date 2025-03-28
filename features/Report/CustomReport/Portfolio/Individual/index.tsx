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

export const IndividualLoan = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchParams, setSearchParams] =
    useState<IDetailedPortfolioAtRiskParams | null>(null);
  const [page, setPage] = useState(1);
  const { setExportData, setReportType } = useContext(DownloadReportContext);
  const { dateValue, isDateFilterApplied } = React.useContext(
    DateRangePickerContext
  );
  const { branches, isLoading: isbranchLoading } = useGetBranches();
  const { detailedPortfolioAtRiskReportData } = useContext(ReportModuleContext);

  const { branchCode, search } = searchParams || {};

  const { portfolioatRiskDetailRptList = [] } = useGetDetailedPortfolioReport({
    ...searchParams,
    branchCode,
    search,
    productCode: detailedPortfolioAtRiskReportData.productCode,
    pageNumber,
    pageSize: 20,
    getAll: isDateFilterApplied
  });

  React.useEffect(() => {
    if (!portfolioatRiskDetailRptList.length) return;

    const formattedExportData = portfolioatRiskDetailRptList.map((item) => ({
      'Account Number': item.accountnumber || '',
      'Account Name': item.fullname || '',
      'Start Date': item.startdate || '',
      'Maturity Date': item.matdate || '',
      'Principal At Risk': item.principal_At_Risk || '',
      'Loan Amount': item.loanAmount || '',
      'Loan Balance': item.currentbalance || '',
      PAR: item.par || ''
    }));

    // Ensure no blank row or misplaced headers
    setExportData(formattedExportData);
    setReportType('PortfolioAtRisk');
  }, [portfolioatRiskDetailRptList]);

  const rowsPerPage = 10;
  const totalElements = portfolioatRiskDetailRptList.length;

  const handleSearch = (params: IDetailedPortfolioAtRiskParams | null) => {
    setSearchParams({
      ...params,
      startDate: dateValue[0]?.format('YYYY-MM-DD') || '',
      endDate: dateValue[1]?.format('YYYY-MM-DD') || ''
    });
    setPageNumber(1); // Reset to the first page on new search
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
          showHeader={{
            mainTitle: detailedPortfolioAtRiskReportData?.productName,
            secondaryTitle:
              'See a directory of all portfolios at risk this system.',
            hideFilterSection: true
          }}
        >
          {portfolioatRiskDetailRptList.length > 0 ? (
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
                      {reportDetails.startdate}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {reportDetails.matdate}
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
