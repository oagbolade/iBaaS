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
  useGetLoanOverdueReport
} from '@/api/reports/useGetLoanOverdueReport';
import { convertToISOString } from '@/utils/convertDatePickerRangeToIsoDate';
import { loanOverdueColumns } from '@/constants/Reports/COLUMNS';
import { renderEmptyTableBody, StyledTableRow } from '@/components/Table/Table';
import { IGetLoanOverdueReport } from '@/api/ResponseTypes/reports';
import { StyledTableCell } from '@/components/Table/style';
import { ReportModuleContext } from '@/context/ReportModuleContext';

interface Props {
  data: IGetLoanOverdueReport;
}

export const LoanOverdue = () => {
  const { branches } = useGetBranches();
  const [page, setPage] = useState<number>(1);

  const [searchParams, setSearchParams] = useState<LoanOverdueParams | null>(
    null
  );

  const handleSearch = (params: LoanOverdueParams | null) => {
    setSearchParams(params);
    setPage(1); // Reset to the first page on new search
  };

  const { branch, search, product } = searchParams || {};

  const [value, setValue] = React.useState<DateRange<Dayjs>>([
    dayjs('2023-11-17'),
    dayjs('2023-12-21')
  ]);

  const { loanOverDueList: loanOverDueData = [] } = useGetLoanOverdueReport({
    branch,
    search,
    product,
    date1: convertToISOString(String(value[0]?.toDate())),
    pageSize: 20,
    pageNumber: page
  });

  const rowsPerPage = 10;
  const totalElements = loanOverDueData.length;
  const totalPages = Math.ceil(totalElements / rowsPerPage);

  const LoanOverdueAction = ({ data }: Props) => {
    const { setLoanOverduestatedata } = useContext(ReportModuleContext);

    const setData = () => {
      setLoanOverduestatedata({
        ...data
      });
    };

    return (
      <Link onClick={setData} href="/report/custom-report/view-report">
        <TableSingleAction actionName="View" />
      </Link>
    );
  };
  return (
    <Box sx={{ marginTop: '60px', width: '100%' }}>
      <TopOverViewSection useBackButton />
      <Box sx={{ marginTop: '30px', padding: '25px' }}>
        <FilterSection branches={branches} onSearch={handleSearch} />
      </Box>
      <Box sx={{ padding: '25px', width: '100%' }}>
        <MuiTableContainer
          columns={loanOverdueColumns}
          data={loanOverDueData}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          totalElements={totalElements}
          showHeader={{
            mainTitle: 'Loan Overdue',
            secondaryTitle:
              'See a directory of all Overdue Loans on this system.',
            hideFilterSection: true
          }}
        >
          {loanOverDueData.length > 0 ? (
            loanOverDueData.map((accountData: IGetLoanOverdueReport, index) => {
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
                    {accountData?.startdate || 'N/A'}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {accountData?.matDate || 'N/A'}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {accountData?.principal_Outstanding || 'N/A'}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <LoanOverdueAction data={accountData} />
                  </StyledTableCell>
                </StyledTableRow>
              );
            })
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
    </Box>
  );
};
