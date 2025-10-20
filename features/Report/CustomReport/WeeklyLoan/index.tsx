'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import moment from 'moment';
import { FilterSection } from './FilterSection';
import { COLUMN } from './Column';
import {
  MuiTableContainer,
  StyledTableRow,
  renderEmptyTableBody
} from '@/components/Table/Table';
import { useGetBranches } from '@/api/general/useBranches';
import { useGetAllProduct } from '@/api/setup/useProduct';
import { ISearchParams } from '@/app/api/search/route';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { useGetWeeklyLoanRepayment } from '@/api/reports/useWeeklyLoanRepayment';
import { FormSkeleton } from '@/components/Loaders';
import { StyledTableCell } from '@/components/Table/style';
import colors from '@/assets/colors';
import { useGetAllGroups } from '@/api/general/useGroup';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';
import { formatDateAndTime } from '@/utils/hooks/useDateFormat';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';

interface ActionMenuProps {
  detail: string;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ detail }) => {
  return (
    <Link
      href={`/report/custom-report/view-report/?getLoanWeelyRepayment=weeklyLoan&loanDetailWeekly=${detail}`}
      style={{ color: `${colors.activeBlue400}` }}
    >
      View
    </Link>
  );
};

export const WeeklyLoan = () => {
  const { isLoading: isGlobalLoading } = useGlobalLoadingState();
  const { branches } = useGetBranches();
  const { bankproducts } = useGetAllProduct();
  const { groups } = useGetAllGroups();
  const { dateValue } = React.useContext(DateRangePickerContext);

  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<ISearchParams>('weekly-loan');

  const { setReportType, setExportData } = React.useContext(
    DownloadReportContext
  );

  const handleSearch = async (params: ISearchParams | null) => {
    setSearchActive(true);
    setSearchParams({
      ...params,
      startDate: dateValue[0]?.format('YYYY-MM-DD') || '',
      endDate: dateValue[1]?.format('YYYY-MM-DD') || '',
      pageNumber: String(page)
    });
  };

  const { loanWeeklyRepaymentList, totalRecords, isLoading } =
    useGetWeeklyLoanRepayment({
      ...searchParams
    });

  const { loanWeeklyRepaymentList: downloadData } =
    useGetWeeklyLoanRepayment({
      ...searchParams,
      getAll: true
    });

  React.useEffect(() => {
    if (!downloadData || downloadData.length === 0) {
      setExportData([]);
    }

    if (downloadData?.length > 0) {
      setExportData(downloadData);
      setReportType('WeeklyLoanRepayment');
    }
  }, [downloadData]);

  return (
    <Box sx={{ marginTop: '50px', width: '100%' }}>
      <TopOverViewSection useBackButton />
      <Box sx={{ padding: '13px' }}>
        {branches && bankproducts && (
          <FilterSection
            branches={branches}
            bankproducts={bankproducts}
            groups={groups || []}
            onSearch={handleSearch}
          />
        )}
      </Box>
      <Box sx={{ padding: '25px', width: '100%' }}>
        {isGlobalLoading || isLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <MuiTableContainer
            columns={COLUMN}
            data={loanWeeklyRepaymentList || []}
            showHeader={{
              mainTitle: 'Weekly Loan Repayment',
              secondaryTitle:
                'See a directory of all Weekly Loan Repayments Report in this system.',
              hideFilterSection: true
            }}
            setPage={setPage}
            page={page}
            totalPages={totalRecords}
            ActionMenuProps={ActionMenu}
          >
            {searchActive ? (
              loanWeeklyRepaymentList?.map((dataItem: any) => {
                return (
                  <StyledTableRow key={dataItem.accountNumber}>
                    <StyledTableCell component="th" scope="row">
                      {dataItem?.accountNumber || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.customerID || 'N/A'}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      {dataItem?.groupid || 'N/A'}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      {dataItem?.settlementAcct1 || 'N/A'}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      {`NGN ${formatCurrency(dataItem?.loanamount) || 'N/A'}`}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      {dataItem?.matDate
                        ? moment(dataItem?.matDate).format('YYYY-MM-DD, hh:mm A')
                        : 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {`NGN ${formatCurrency(dataItem?.expectedAmt) || 'N/A'}`}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      <ActionMenu detail={JSON.stringify(dataItem) as string} />
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })
            ) : (
              <StyledTableRow>
                <StyledTableCell
                  colSpan={COLUMN.length + 1}
                  component="th"
                  scope="row"
                >
                  {renderEmptyTableBody(loanWeeklyRepaymentList)}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </MuiTableContainer>
        )}
      </Box>
    </Box>
  );
};
