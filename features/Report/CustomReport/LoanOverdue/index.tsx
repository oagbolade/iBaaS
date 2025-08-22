'use client';
import React, { useContext, useState } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { DateRange } from '@mui/x-date-pickers-pro';
import dayjs, { Dayjs } from 'dayjs';
import { FilterSection } from './FilterSection';
import { MuiTableContainer, TableSingleAction } from '@/components/Table';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { useGetBranches } from '@/api/general/useBranches';
import {
  LoanOverdueParams,
  useGetLoanOverdueReport,
} from '@/api/reports/useGetLoanOverdueReport';
import { convertToISOString } from '@/utils/convertDatePickerRangeToIsoDate';
import { loanOverdueColumns } from '@/constants/Reports/COLUMNS';
import { renderEmptyTableBody, StyledTableRow } from '@/components/Table/Table';
import { IGetLoanOverdueReport } from '@/api/ResponseTypes/reports';
import { StyledTableCell } from '@/components/Table/style';
import { ReportModuleContext } from '@/context/ReportModuleContext';
import { useGetAllProduct } from '@/api/setup/useProduct';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { FormSkeleton } from '@/components/Loaders';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

interface Props {
  data: IGetLoanOverdueReport;
}

export const LoanOverdue = () => {
  const { branches } = useGetBranches();
  const { bankproducts } = useGetAllProduct();
  const { dateValue, isDateFilterApplied } = React.useContext(
    DateRangePickerContext,
  );
  const { setExportData, setReportType, readyDownload, setReadyDownload } =
    useContext(DownloadReportContext);

  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage,
  } = usePersistedSearch<LoanOverdueParams>('loan-overdue');

  const {
    loanOverDueList: loanOverDueData = [],
    totalRecords,
    isLoading,
  } = useGetLoanOverdueReport({
    ...searchParams,
    pageSize: 10,
    pageNumber: page,
    getAll: readyDownload,
  });

  React.useEffect(() => {
    if (readyDownload) {
      setSearchParams((prev) => ({
        ...prev,
        getAll: true,
      }));
    }
  }, [readyDownload]);

  React.useEffect(() => {
    if (loanOverDueData.length > 0 && !isLoading && readyDownload) {
      const formattedExportData = loanOverDueData.map((item) => ({
        'Acc No': item?.accountNumber || '',
        'Prod Code': item?.productCode || '',
        'Loan Amount': item?.loanamount || '',
        'Start Date': item?.startdate?.split('T')[0] || '',
        'Maturity Date': item?.matDate?.split('T')[0] || '',
        'Principal Outstanding': item?.principal_Outstanding || '',
        'Intrest Outstanding': item?.interest_Outstanding || '',
        Age: item?.age || '',
        'Last Date': item?.lastDate?.split('T')[0] || '',
        'Group ID': item?.groupid || '',
        'Settlement Account': item?.settlementAcct1 || '',
        'Current Balance': item?.currentbalance || '',
        'Penal Intrest Outstanding': item?.penalInterest_Outstanding || '',
        'Group Name': item?.groupname || item?.groupName2 || '',
        Report: item?.report?.split(' ')[0] || '',
        'Acct Name': item?.fullname || '',
        Branch: item?.branch || '',
        'Officer Name': item?.officerName || item?.officerName2 || '',
        'CASA Balance': item?.casa_Balance || '',
      }));

      // Ensure no blank row or misplaced headers
      setExportData(formattedExportData);
      setReportType('LoanOverdueReport');
    }
  }, [loanOverDueData, isLoading, readyDownload, setExportData, setReportType]);

  const rowsPerPage = 10;
  const totalPages = Math.ceil((totalRecords || 0) / rowsPerPage);

  const handleSearch = (params: LoanOverdueParams | null) => {
    setReadyDownload(false);
    setSearchParams({
      ...params,
      reportDate: dateValue[1]?.format('YYYY-MM-DD') || '',
    });
    setSearchActive(true);
  };

  const LoanOverdueAction = ({ data }: Props) => {
    const { setLoanOverduestatedata } = useContext(ReportModuleContext);

    const setData = () => {
      setLoanOverduestatedata({
        ...data,
      });
    };

    return (
      <Link
        onClick={setData}
        href="/report/custom-report/view-loanoverdue-report"
      >
        <TableSingleAction actionName="View" />
      </Link>
    );
  };

  return (
    <Box sx={{ marginTop: '60px', width: '100%' }}>
      <Box>
        {branches && bankproducts && (
          <FilterSection
            branches={branches}
            bankproducts={bankproducts}
            onSearch={handleSearch}
          />
        )}

        {isLoading ? (
          <FormSkeleton noOfLoaders={5} />
        ) : (
          <Box sx={{ padding: '25px', width: '100%' }}>
            <MuiTableContainer
              columns={loanOverdueColumns}
              data={loanOverDueData}
              page={page}
              setPage={setPage}
              totalPages={totalPages}
              totalElements={totalRecords}
              showHeader={{
                mainTitle: 'Loan Overdue',
                secondaryTitle:
                  'See a directory of all Overdue Loans on this system.',
                hideFilterSection: true,
              }}
            >
              {searchActive ? (
                loanOverDueData.map(
                  (accountData: IGetLoanOverdueReport, index) => {
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="row">
                          {accountData?.accountNumber || 'N/A'}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {accountData?.productCode || 'N/A'}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {accountData?.loanamount || 'N/A'}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {accountData?.startdate?.split('T')[0] || 'N/A'}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {accountData?.matDate?.split('T')[0] || 'N/A'}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {accountData?.principal_Outstanding || 'N/A'}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <LoanOverdueAction data={accountData} />
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  },
                )
              ) : (
                <StyledTableRow>
                  <StyledTableCell
                    colSpan={loanOverdueColumns.length + 1}
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
