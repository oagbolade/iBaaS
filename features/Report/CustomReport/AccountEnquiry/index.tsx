'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { DateRange } from '@mui/x-date-pickers-pro';
import dayjs, { Dayjs } from 'dayjs';
import { FilterSection } from './FilterSection';
import { MuiTableContainer, TableSingleAction } from '@/components/Table';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { useGetBranches } from '@/api/general/useBranches';
import { accountEnquiryColumns } from '@/constants/Reports/COLUMNS';
import {
  IEnquiryParams,
  useGetAccountEnquiryByBranchId
} from '@/api/reports/useGetAccountEnquiryBybranchId';
import { IGetAccountEnquiry } from '@/api/ResponseTypes/reports';
import { StyledTableRow } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { renderEmptyTableBody } from '@/components/Revamp/TableV2/TableV2';
import { ReportModuleContext } from '@/context/ReportModuleContext';
import {
  DownloadReportContext,
  IReportQueryParams
} from '@/context/DownloadReportContext';

interface Props {
  data: IGetAccountEnquiry;
}

export const AccountEnquiry = () => {
  const [searchParams, setSearchParams] = useState<IEnquiryParams | null>(null);
  const [page, setPage] = useState<number>(1);
  const { setExportData, setReportQueryParams } = useContext(
    DownloadReportContext
  );

  const { branches } = useGetBranches();

  const { branchId, customerId } = searchParams || {};

  const [value, setValue] = React.useState<DateRange<Dayjs>>([
    dayjs('2023-11-17'),
    dayjs('2023-12-21')
  ]);

  const { accountsinDebitList: accountEnquiryData = [] } =
    useGetAccountEnquiryByBranchId({
      branchId,
      customerId,
      pageSize: 20,
      pageNumber: page
    });

  const rowsPerPage = 10;
  const totalElements = accountEnquiryData.length;
  const totalPages = Math.ceil(totalElements / rowsPerPage);

  const handleSearch = (params: IEnquiryParams | null) => {
    setSearchParams(params);
    setReportQueryParams(params as IReportQueryParams); // TODO: need to pass accept just required fields here
    setPage(1); // Reset to the first page on new search
  };

  const AccountEnquiryActions = ({ data }: Props) => {
    const { setAccountEnquiryData } = useContext(ReportModuleContext);

    const setData = () => {
      setAccountEnquiryData({
        accountnumber: data.accountnumber,
        accounttitle: data.accounttitle,
        customerid: data.customerid,
        accountOfficer: data.accountOfficer,
        bkBalance: data.bkBalance,
        branchName: data.branchName
      });
    };

    return (
      <Link
        onClick={setData}
        href="/report/custom-report/view-account-enquiry-report"
      >
        <TableSingleAction actionName="View" />
      </Link>
    );
  };

  // Set export data when accountEnquiryData is retrieved
  useEffect(() => {
    if (accountEnquiryData.length > 0) {
      setExportData(accountEnquiryData);
    }
  }, [accountEnquiryData, setExportData]);

  return (
    <Box sx={{ marginTop: '50px', width: '100%' }}>
      <TopOverViewSection useBackButton />
      <FilterSection branches={branches} onSearch={handleSearch} />
      <Box sx={{ padding: '25px', width: '100%' }}>
        <MuiTableContainer
          columns={accountEnquiryColumns}
          data={accountEnquiryData}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          totalElements={totalElements}
          showHeader={{
            mainTitle: 'Account Enquiry',
            secondaryTitle:
              'See a directory of all account enquiry on this system.',
            hideFilterSection: true
          }}
        >
          {accountEnquiryData.length > 0 ? (
            accountEnquiryData.map((accountData: IGetAccountEnquiry, index) => {
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {accountData?.accounttitle || 'N/A'}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {accountData?.accountnumber || 'N/A'}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {accountData?.bkBalance || 'N/A'}
                  </StyledTableCell>
                  <StyledTableCell align="right">N/A</StyledTableCell>
                  <StyledTableCell align="right">
                    {accountData?.accountOfficer || 'N/A'}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {accountData?.bkBalance || 'N/A'}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <AccountEnquiryActions data={accountData} />
                  </StyledTableCell>
                </StyledTableRow>
              );
            })
          ) : (
            <StyledTableRow>
              <StyledTableCell
                colSpan={accountEnquiryColumns.length + 1}
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
