'use client';
import React, { useContext, useState } from 'react';
import { Box } from '@mui/material';
import { useSearchParams } from 'next/navigation';
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
  const { dateValue } = React.useContext(DateRangePickerContext);
  const { branches } = useGetBranches();
  const { detailedPortfolioAtRiskReportData } = useContext(ReportModuleContext);
  const portofolioSearchParam = useSearchParams();

  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<ISearchParams>('portfolio-at-risk');
  const { searchWith } = searchParams || {};
  const productCode = portofolioSearchParam.get('productCode');
  const productName = portofolioSearchParam.get('productName') || '';
  const branchCode = portofolioSearchParam.get('branchCode') || '';

  const {
    portfolioatRiskDetailRptList = [],
    totalRecords,
    isLoading
  } = useGetDetailedPortfolioReport({
    ...searchParams,
    branchCode: branchCode ?? null,
    searchWith: searchWith ?? '',
    productCode: productCode || '',
    pageNumber: page,
    pageSize: 10
  });

  const { portfolioatRiskDetailRptList: downloadData } =
    useGetDetailedPortfolioReport({
      ...searchParams,
      branchCode: branchCode ?? null,
      searchWith: searchWith ?? '',
      productCode: productCode || '',
      pageNumber: page,
      pageSize: 10,
      getAll: true
    });

  React.useEffect(() => {
    if (!downloadData || downloadData.length) {
      setExportData([]);
      return;
    }

    const formattedExportData = downloadData.map((item) => ({
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
  }, [downloadData]);

  const rowsPerPage = 10;
  const totalPages = Math.ceil((totalRecords || 0) / rowsPerPage);
  const handleSearch = (params: IDetailedPortfolioAtRiskParams | null) => {
    setSearchActive(true);
    setSearchParams({
      ...params,
      startDate: dateValue[0]?.format('YYYY-MM-DD') || '',
      endDate: dateValue[1]?.format('YYYY-MM-DD') || '',
      pageNumber
    });
  };

  return (
    <Box sx={{ marginTop: '70px' }}>
      <TopOverViewSection useBackButton />
      <Box sx={{ paddingX: '24px', marginTop: '30px' }}>
        <FilterSection
          branches={branches}
          onSearch={handleSearch}
          branchCode={branchCode}
        />
      </Box>
      <Box sx={{ paddingX: '24px' }}>
        {isLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <Box>
            <MuiTableContainer
              tableConfig={{ hasActions: false }}
              columns={detailedPortfolioAtRiskColumn}
              data={portfolioatRiskDetailRptList}
              page={page}
              setPage={setPage}
              totalPages={totalPages}
              totalElements={totalRecords}
              showHeader={{
                mainTitle: productName,
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
                          {reportDetails.currentbalance}
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
        )}
      </Box>
    </Box>
  );
};
