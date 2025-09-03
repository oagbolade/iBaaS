'use client';
import React, { useContext, useState } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { FilterSection } from './FilterSection';
import { MuiTableContainer, TableSingleAction } from '@/components/Table';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { useGetBranches } from '@/api/general/useBranches';
import { useGetAllProduct } from '@/api/setup/useProduct';
import { LoanOverdueParams } from '@/api/reports/useGetLoanOverdueReport';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { useGetDisbursedLoanReport } from '@/api/reports/useGetDisbursedLoan';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { IGetDisbursedLoanReport } from '@/api/ResponseTypes/reports';
import { disbursedloanColumns } from '@/constants/Reports/COLUMNS';
import { FormSkeleton } from '@/components/Loaders';
import { renderEmptyTableBody, StyledTableRow } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

interface ActionProps {
  data: IGetDisbursedLoanReport;
}

export const DisbursedLoan = () => {
  const { branches } = useGetBranches();
  const { bankproducts } = useGetAllProduct();
  const { dateValue } = React.useContext(DateRangePickerContext);
  const { setExportData, setReportType, readyDownload, setReadyDownload } =
    useContext(DownloadReportContext);

  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<LoanOverdueParams>('disbursed-loan');

  const {
    disbursedLoans = [],
    totalRecords,
    isLoading
  } = useGetDisbursedLoanReport({
    ...searchParams,
    pageSize: 10,
    pageNumber: page,
    getAll: readyDownload
  });

  React.useEffect(() => {
    if (readyDownload) {
      setSearchParams({
        ...searchParams,
        getAll: true
      });
    }
  }, [readyDownload, setSearchParams, searchParams]);

  React.useEffect(() => {
    if (disbursedLoans.length > 0 && !isLoading && readyDownload) {
      const formattedExportData = disbursedLoans.map((item) => ({
        'Account Number': item?.accountNumber || '',
        'Account Name': item?.fullName || '',
        'Group Name': item?.groupname || '',
        'Officer Name': item?.officerName?.split('T')[0] || '',
        'Facility Amount': item?.currentbalance.toLocaleString() || '',
        Gender: item?.gender || '',
        'Settlement Account': item?.settlementAcct1 || '',
        'Start Date': item?.startDate || '',
        'Maturity Date': item?.matDate || '',
        'CASA Balance': item?.bkBalance || '',
        'Loan Stage': item?.loanStageCycle || '',
        Branch: item?.branch || '',
        'Product Code': item?.productCode || '',
        'Risk rating': item?.riskRating || ''
      }));

      // Ensure no blank row or misplaced headers
      setExportData(formattedExportData as []);
      setReportType('LoanOverdueReport');
    }
  }, [disbursedLoans, isLoading, readyDownload, setExportData, setReportType]);

  const handleSearch = (params: LoanOverdueParams | null) => {
    setReadyDownload(false);
    setSearchParams({
      ...params,
      
      startDate: dateValue[0]?.format('YYYY-MM-DD') || '',
      endDate: dateValue[1]?.format('YYYY-MM-DD') || ''
    });
    setSearchActive(true);
  };

  const DisbursedLoanActions = ({ data }: ActionProps) => {
    return (
      <Link
        href={`/report/custom-report/view-disbursedloan-report?gender=${data?.gender}&branch=${searchParams?.branchcode}&productCode=${searchParams?.productcode}&startDate=${data?.startDate}&matDate=${data?.matDate}&settlementAccount=${data?.settlementAcct1}&casaBalance=${data?.bkBalance}&loanstage=${data?.loanStageCycle}&riskrating=${data?.riskRating}`}
      >
        <TableSingleAction actionName="View More" />
      </Link>
    );
  };

  const rowsPerPage = 10;
  const totalPages = Math.ceil((totalRecords || 0) / rowsPerPage);

  return (
    <Box sx={{ marginTop: '50px', width: '100%' }}>
      <TopOverViewSection useBackButton />
      <Box sx={{ marginTop: '20px', padding: '25px' }}>
        {branches && bankproducts && (
          <FilterSection
            branches={branches}
            bankproducts={bankproducts}
            onSearch={handleSearch}
          />
        )}
      </Box>
      {isLoading ? (
        <FormSkeleton noOfLoaders={5} />
      ) : (
        <Box sx={{ padding: '25px', width: '100%' }}>
          <MuiTableContainer
            columns={disbursedloanColumns}
            data={disbursedLoans}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            totalElements={totalRecords}
            showHeader={{
              mainTitle: 'Disbursed Loan Report',
              secondaryTitle:
                'See a directory of all Disbursed Loan Report in this system.',
              hideFilterSection: true
            }}
            ActionMenuProps={DisbursedLoanActions}
          >
            {searchActive ? (
              disbursedLoans.map(
                (accountData: IGetDisbursedLoanReport, index) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {accountData?.accountNumber || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {accountData?.fullName || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {accountData?.groupname || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {accountData?.officerName || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {accountData?.currentbalance?.toLocaleString() || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <DisbursedLoanActions data={accountData} />
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                }
              )
            ) : (
              <StyledTableRow>
                <StyledTableCell
                  colSpan={disbursedLoans.length + 1}
                  component="th"
                  scope="row"
                >
                  {renderEmptyTableBody(disbursedLoans)}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </MuiTableContainer>
        </Box>
      )}
    </Box>
  );
};
