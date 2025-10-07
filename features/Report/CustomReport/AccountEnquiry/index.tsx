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
  useGetAccountEnquiryByBranchId,
} from '@/api/reports/useGetAccountEnquiryBybranchId';
import { IGetAccountEnquiry } from '@/api/ResponseTypes/reports';
import { StyledTableRow } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { renderEmptyTableBody } from '@/components/Revamp/TableV2/TableV2';
import { ReportModuleContext } from '@/context/ReportModuleContext';
import {
  DownloadReportContext,
  IReportQueryParams,
} from '@/context/DownloadReportContext';
import { ISearchParams } from '@/app/api/search/route';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { FormSkeleton } from '@/components/Loaders';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';

interface Props {
  data: IGetAccountEnquiry;
}

export const AccountEnquiry = () => {
  const { isLoading: isGlobalLoading } = useGlobalLoadingState();
  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage,
  } = usePersistedSearch<ISearchParams>('account-enquiry');
  const { setReportType, setExportData, readyDownload, setReadyDownload } =
    React.useContext(DownloadReportContext);
  const { dateValue } = React.useContext(DateRangePickerContext);

  const { branches } = useGetBranches();

  const { data: accountEnquiryData = [], isLoading } =
    useGetAccountEnquiryByBranchId({
      ...searchParams,
      getAll: readyDownload,
      page,
    });

  const { data: downloadData = []} =
    useGetAccountEnquiryByBranchId({
      ...searchParams,
      getAll: true,
      page,
    });

 

  const rowsPerPage = 10;
  const totalElements = downloadData.length;
  const totalPages = Math.ceil(totalElements / rowsPerPage);

  const handleSearch = (params: ISearchParams | null) => {
    setSearchParams({
      ...params,
      startDate: dateValue[0]?.format('YYYY-MM-DD') || '',
      endDate: dateValue[1]?.format('YYYY-MM-DD') || '',
    });
    setSearchActive(true);
  };

  const AccountEnquiryActions = ({ data }: Props) => {
    const { setAccountEnquiryData } = useContext(ReportModuleContext);

    const setData = () => {
      setAccountEnquiryData({
        accounttitle: data.accounttitle,
        dateOpened: data.dateOpened,
        productName: data.productName,
        accountnumber: data.accountnumber,
        phoneNo: data.phoneNo,
        lienAmount: data.lienAmount,
        unclearedBal: data.unclearedBal,
        officerName: data.officerName,
        odLimit: data.odLimit,
        customerid: data.customerid,
        nuban: data.nuban,
        customerAddress: data.customerAddress,
        useableBalance: data.useableBalance,
        bookBalance: data.bookBalance,
        customerName: data.customerName,
        accountStatus: data.accountStatus,
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
    if (downloadData.length > 0) {
      setExportData(downloadData);
      setReportType('AccountEnquiry');
    }
  }, [downloadData]);

  return (
    <Box sx={{ marginTop: '60px', width: '100%' }}>
      <TopOverViewSection useBackButton />

      {branches && (
        <FilterSection branches={branches} onSearch={handleSearch} />
      )}

      <Box sx={{ padding: '25px', width: '100%' }}>
        {isGlobalLoading || isLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
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
              hideFilterSection: true,
            }}
          >
            {searchActive ? (
              accountEnquiryData.map(
                (accountData: IGetAccountEnquiry, index) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        {accountData?.accounttitle || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {accountData?.accountnumber || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {`NGN ${formatCurrency(accountData?.bookBalance || 0) || 'N/A'}`}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {accountData?.phoneNo || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {accountData?.officerName || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {`NGN ${formatCurrency(accountData?.useableBalance || 0) || 'N/A'}`}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <AccountEnquiryActions data={accountData} />
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                },
              )
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
        )}
      </Box>
    </Box>
  );
};
