'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
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
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { DownloadReportContext } from '@/context/DownloadReportContext';

export const MainCash = () => {
  const [search, setSearch] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [page, setPage] = React.useState(1);
  const { branches } = useGetBranches();
  const { setExportData, setReportType } = useContext(DownloadReportContext);
  const glClassCode = useGetParams('classCode') || '';
  const selectedReport = useGetParams('name') || '';
  const reportType = useGetParams('reportType') || '';

  const { dateValue, isDateFilterApplied } = useContext(DateRangePickerContext);

  const { trialBydateList, isLoading: isTrialBalanceDataLoading } =
    useGetTrialBalance({
      ...searchParams,
      pageSize: '20',
      pageNumber: String(page),
      getAll: isDateFilterApplied
    });

  const handleSearch = async (params: ISearchParams | null) => {
    setSearch(true);
    setSearchParams({
      ...params,
      gl_ClassCode: glClassCode,
      reportType,
      startDate: dateValue[0]?.format('YYYY-MM-DD') || ''
    });
  };

  useEffect(() => {
    if (!trialBydateList?.pagedTrialBalances.length) return;

    const formattedExportData = trialBydateList?.pagedTrialBalances.map(
      (item) => ({
        'GL Account Number': item?.acctno || '',
        'Account Name': item?.acctname || '',
        'Last Night Balance': item?.last_night_balance2 || 0,
        Debit: item?.debitacct || 0,
        Credit: item?.creditAcct || 0,
        Balance: item?.totalname || 0
      })
    );

    // Ensure no blank row or misplaced headers
    setExportData(formattedExportData);
    setReportType('TrialBalanceByDate');
  }, [trialBydateList?.pagedTrialBalances]);

  return (
    <Box
      sx={{
        width: '100%'
      }}
    >
      {branches && (
        <FilterSection branches={branches} onSearch={handleSearch} />
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
            >
              {search ? (
                trialBydateList?.pagedTrialBalances?.map(
                  (dataItem: ITrialBalance) => {
                    return (
                      <StyledTableRow key={dataItem.acctno}>
                        <StyledTableCell component="th" scope="row">
                          {dataItem?.acctno || 'N/A'}
                        </StyledTableCell>

                        <StyledTableCell component="th" scope="row">
                          {dataItem?.acctname || 'N/A'}
                        </StyledTableCell>

                        <StyledTableCell component="th" scope="row">
                          {`NGN ${formatCurrency(dataItem?.last_night_balance2 || 0)}`}
                        </StyledTableCell>

                        <StyledTableCell component="th" scope="row">
                          {dataItem?.debitacct || 0}
                        </StyledTableCell>

                        <StyledTableCell component="th" scope="row">
                          {dataItem?.creditAcct || 0}
                        </StyledTableCell>

                        <StyledTableCell component="th" scope="row">
                          {dataItem?.totalname || 0}
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
                      ₦ {trialBydateList?.lastNightBalance?.toLocaleString()}
                    </Typography>
                  </Box>

                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                  >
                    <Typography>Debit</Typography>
                    <Typography>
                      ₦ {trialBydateList?.totalDrBal?.toLocaleString()}
                    </Typography>
                  </Box>

                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                  >
                    <Typography>Credit</Typography>
                    <Typography>
                      ₦ {trialBydateList?.totalCrBal?.toLocaleString()}
                    </Typography>
                  </Box>

                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                  >
                    <Typography>Balance</Typography>
                    <Typography>
                      ₦ {trialBydateList?.totalBal?.toLocaleString()}
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
