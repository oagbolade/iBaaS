'use client';
import React, { useContext } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { FilterSection } from './FilterSection';
import { MuiTableContainer, TableSingleAction } from '@/components/Table';
import { useGetBranches } from '@/api/general/useBranches';
import {
  LoanOverdueParams,
  useGetLoanOverdueReport
} from '@/api/reports/useGetLoanOverdueReport';
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
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import moment from 'moment';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';

interface Props {
  data: IGetLoanOverdueReport;
}

export const LoanOverdue = () => {
  const { isLoading: isGlobalLoading } = useGlobalLoadingState();
  const { branches } = useGetBranches();
  const { bankproducts } = useGetAllProduct();
  const { dateValue } = React.useContext(
    DateRangePickerContext
  );
  const { setExportData, setReportType } =
    useContext(DownloadReportContext);

  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<LoanOverdueParams>('loan-overdue');

  const {
    loanOverDueList: loanOverDueData = [],
    totalRecords,
    isLoading
  } = useGetLoanOverdueReport({
    ...searchParams,
    pageSize: 10,
    pageNumber: page
  });

  const { loanOverDueList: downloadData = [] } = useGetLoanOverdueReport({
    ...searchParams,
    pageSize: 10,
    pageNumber: page,
    getAll: true
  });

  React.useEffect(() => {
    if (!downloadData || downloadData?.length === 0) {
      setExportData([]);
      return;
    }

    if (downloadData.length > 0) {
      const formattedExportData = downloadData.map((item) => ({
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
        'CASA Balance': item?.casa_Balance || ''
      }));

      // Ensure no blank row or misplaced headers
      setExportData(formattedExportData);
      setReportType('LoanOverdueReport');
    }
  }, [downloadData]);

  const rowsPerPage = 10;
  const totalPages = Math.ceil((totalRecords || 0) / rowsPerPage);

  const handleSearch = (params: LoanOverdueParams | null) => {
    setSearchParams({
      ...params,
      reportDate: dateValue[1]?.format('YYYY-MM-DD') || ''
    });
    setSearchActive(true);
  };

  const LoanOverdueAction = ({ data }: Props) => {
    const { setLoanOverduestatedata } = useContext(ReportModuleContext);

    const setData = () => {
      setLoanOverduestatedata({
        ...data
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

        {isGlobalLoading || isLoading ? (
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
                hideFilterSection: true
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
                          {`NGN ${formatCurrency(accountData?.loanamount || 0)}` || 'N/A'} 
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {moment(accountData?.startdate?.split('T')[0]).format('YYYY-MM-DD, hh:mm:ss A') || 'N/A'}
                        
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {moment(accountData?.matDate?.split('T')[0]).format('YYYY-MM-DD, hh:mm:ss A') || 'N/A'}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {`NGN ${formatCurrency(accountData?.principal_Outstanding || 0)}` || 'N/A'} 
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <LoanOverdueAction data={accountData} />
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  }
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
