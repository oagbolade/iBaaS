'use client';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { COLUMN } from '../COLUMN';
import { FilterSection } from '../SubFilterSection';
import {
  totalInflowContainerStyle,
  totalStyle
} from '../../OutFlowReport/style';
import { FormSkeleton } from '@/components/Loaders';
import { useGetBranches } from '@/api/general/useBranches';
import { ISearchParams } from '@/app/api/search/route';
import { StyledTableRow, renderEmptyTableBody } from '@/components/Table/Table';
import { MuiTableContainer } from '@/components/Table';
import { StyledTableCell } from '@/components/Table/style';
import { ITrialBalance } from '@/api/ResponseTypes/reports';
import { useGetTrialBalance } from '@/api/reports/useTrialBalance';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import useFormattedDates from '@/utils/hooks/useFormattedDates';

export const MainCash = () => {
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [page, setPage] = React.useState(1);

  useLayoutEffect(() => {
    setSearchParams(null);
    setPage(1);
  }, []);

  const { branches } = useGetBranches();
  const { setExportData, setReportType } = useContext(DownloadReportContext);
  const glClassCode = useGetParams('classCode') || '';
  const selectedReport = useGetParams('name') || '';
  const reportType = useGetParams('reportType') || '';
  const glNodeCode = useGetParams('glNodeCode') || '';
  const glTypeCode = useGetParams('glTypeCode') || '';
  const branchID = useGetParams('branchID') || '';
  const customerID = useGetParams('customerID') || '';

  const { currentDate } = useFormattedDates();
  const [reportDate, setReportDate] = React.useState<Dayjs>(dayjs(currentDate));

  const {
    trialBydateList,
    isLoading: isTrialBalanceDataLoading,
    totalRecords = 0
  } = useGetTrialBalance({
    ...searchParams,
    pageSize: '10',
    branchID,
    searchWith: searchParams?.customerID || customerID,
    pageNumber: String(page),
    gl_ClassCode: glClassCode,
    glNodeCode,
    glTypeCode,
    reportType,
    startDate: searchParams?.reportDate || reportDate.format('YYYY-MM-DD')
  });

  const { trialBydateList: downloadData } = useGetTrialBalance({
    ...(searchParams || {}),
    pageSize: '10',
    branchID: searchParams?.branchID || branchID,
    searchWith: searchParams?.customerID || customerID,
    pageNumber: String(page),
    gl_ClassCode: glClassCode,
    glNodeCode,
    glTypeCode,
    reportType,
    startDate: searchParams?.reportDate || reportDate.format('YYYY-MM-DD'),
    getAll: true
  });

  const handleSearch = async (params: ISearchParams | null) => {
    setSearchParams({
      ...params,
      gl_ClassCode: glClassCode,
      glNodeCode,
      glTypeCode,
      reportType,
      startDate: searchParams?.reportDate
    });
    setPage(1); // Reset to the first page on new search
  };

  useEffect(() => {
    if (!downloadData || downloadData?.pagedTrialBalances.length === 0) {
      setExportData([]);
      return;
    }

    if (downloadData?.pagedTrialBalances.length > 0) {
      const formattedExportData = trialBydateList?.pagedTrialBalances.map(
        (item) => ({
          'GL Account Number': item?.acctno || 'N/A',
          'Account Name': item?.acctname || item?.acctName || 'N/A',
          'Last Night Balance':
            item?.last_night_balance2 || item?.lastNightBalance || 0,
          Debit: item?.debitacct || item?.debitAcct || 0,
          Credit: item?.creditAcct || 0,
          Balance: item?.totalname || item?.differ || 0
        })
      );

      // Ensure no blank row or misplaced headers
      setExportData(formattedExportData as []);
      setReportType('TrialBalanceByDate');
    }
  }, [downloadData]);

  const rowsPerPage = 10;
  const totalPages = Math.ceil((totalRecords || 0) / rowsPerPage);

  return (
    <Box
      sx={{
        width: '100%'
      }}
    >
      {branches && (
        <FilterSection
          selectedBranch={branchID}
          branches={branches}
          onSearch={handleSearch}
        />
      )}
      <Box sx={{ paddingX: '24px' }}>
        {isTrialBalanceDataLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <Box sx={{ width: '100%' }}>
            <MuiTableContainer
              columns={COLUMN}
              tableConfig={{
                hasActions: true
              }}
              showHeader={{
                hideFilterSection: true,
                mainTitle: selectedReport.toUpperCase(),
                secondaryTitle: `See a directory of all ${selectedReport} Report in this system.`
              }}
              data={trialBydateList?.pagedTrialBalances}
              setPage={setPage}
              page={page}
              totalPages={totalPages}
              totalElements={totalRecords}
            >
              {trialBydateList?.pagedTrialBalances?.length > 0 ? (
                trialBydateList?.pagedTrialBalances?.map(
                  (dataItem: ITrialBalance, i) => {
                    return (
                      <StyledTableRow key={i}>
                        <StyledTableCell component="th" scope="row">
                          {dataItem?.acctno || 'N/A'}
                        </StyledTableCell>

                        <StyledTableCell component="th" scope="row">
                          {dataItem?.acctname || dataItem?.acctName || 'N/A'}
                        </StyledTableCell>

                        <StyledTableCell component="th" scope="row">
                          {`NGN ${formatCurrency(dataItem?.last_night_balance2?.toLocaleString() || dataItem?.lastNightBalance?.toLocaleString() || 0)}`}
                        </StyledTableCell>

                        <StyledTableCell component="th" scope="row">
                          {/* {dataItem?.debitacct || dataItem?.debitAcct || 0} */}
                          {`NGN ${formatCurrency(dataItem?.debitacct || dataItem?.debitAcct || 0)}`}
                        </StyledTableCell>

                        <StyledTableCell component="th" scope="row">
                          {/* {dataItem?.creditAcct || 0} */}
                          {`NGN ${formatCurrency(dataItem?.creditAcct || 0)}`}
                        </StyledTableCell>

                        <StyledTableCell component="th" scope="row">
                          {`NGN ${formatCurrency(dataItem?.totalname || dataItem?.differ || 0)}`}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  }
                )
              ) : (
                <StyledTableRow>
                  <StyledTableCell
                    colSpan={COLUMN.length + 1}
                    component="th"
                    scope="row"
                  >
                    {renderEmptyTableBody(trialBydateList?.pagedTrialBalances)}
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </MuiTableContainer>

            {trialBydateList?.pagedTrialBalances?.length > 0 && (
              <Box sx={totalInflowContainerStyle}>
                <Typography>Total Amount</Typography>

                <Box sx={totalStyle}>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                  >
                    <Typography>Last Night Balance</Typography>
                    <Typography>
                      {`NGN ${formatCurrency(trialBydateList?.lastNightBalance || 0)}`}
                    </Typography>
                  </Box>

                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                  >
                    <Typography>Debit</Typography>
                    <Typography>
                      {`NGN ${formatCurrency(trialBydateList?.totalDrBal || 0)}`}
                    </Typography>
                  </Box>

                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                  >
                    <Typography>Credit</Typography>
                    <Typography>
                      {`NGN ${formatCurrency(trialBydateList?.totalCrBal || 0)}`}
                    </Typography>
                  </Box>

                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                  >
                    <Typography>Balance</Typography>
                    <Typography>
                      {`NGN ${formatCurrency(trialBydateList?.totalBal || 0)}`}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};
