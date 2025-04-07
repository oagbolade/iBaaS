'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { FilterSection } from './FilterSection';
import { COLUMN, keys } from './Column';
import { FormSkeleton } from '@/components/Loaders';
import { useGetBranches } from '@/api/general/useBranches';
import { useGetAllProduct } from '@/api/setup/useProduct';
import { ISearchParams } from '@/app/api/search/route';
import { useGetCustomerBalance } from '@/api/reports/useCustomerbalance';
import { ICustomerBalance } from '@/api/ResponseTypes/reports';
import { TableV2 } from '@/components/Revamp/TableV2';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { DateRange } from '@mui/x-date-pickers-pro';
import dayjs, { Dayjs } from 'dayjs';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';

interface CustomerBalanceList {
  customerBalanceList: {
    pagedCustomerBalances: ICustomerBalance[];
    grandTotal: number;
    totalAvaiBal: number;
    totalBkBal: number;
  } | null;
  isLoading: boolean;
  totalRecords: number;
}

export const CustomerBalances = () => {
  const [search, setSearch] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [page, setPage] = React.useState(1);
  const { branches } = useGetBranches();
  const { bankproducts } = useGetAllProduct();

  const [dateValue, setDateValue] = React.useState<DateRange<Dayjs>>([
    dayjs(),
    dayjs()
  ]);

  const { setReportType, setExportData , setReportQueryParams} = React.useContext(
    DownloadReportContext
  );
  const { isDateFilterApplied } = React.useContext(DateRangePickerContext);

  const {
    customerBalanceList = {
      pagedCustomerBalances: [],
      grandTotal: 0,
      totalAvaiBal: 0,
      totalBkBal: 0
    },
    isLoading: isCustomerBalanceDataLoading,
    totalRecords = 0
  }: CustomerBalanceList = useGetCustomerBalance({
    ...searchParams,
    page
  });

  const { pagedCustomerBalances = [], grandTotal = 0, totalAvaiBal = 0, totalBkBal = 0 } =
    customerBalanceList || [];

  React.useEffect(() => {
    if (pagedCustomerBalances?.length > 0) {
      const mapCustomerBalance = pagedCustomerBalances.map((item) => ({
        accountnumber: item.accountnumber,
        accounttitle: item.accounttitle,
        dateopened: item.dateopened,
        bkbalance: `NGN ${item.bkbalance}`,
        availBal: `NGN ${item.availBal}`,
        lastdatepay: item.lastdatepay,
        holdBal: `NGN ${item.holdbal}`,
        pendingCC: `NGN ${item.pendingCC}`
      }));

      setExportData(mapCustomerBalance as []);
     
    }
  }, [pagedCustomerBalances, setExportData, setReportType]);

  const handleSearch = async (params: ISearchParams | null) => {
    setSearch(true);
    setSearchParams({
      ...params,
      startDate: dateValue[0]?.format('YYYY-MM-DD') || '',
      endDate: dateValue[1]?.format('YYYY-MM-DD') || ''
    });

    setReportType('CustomerBalance');
  };

  const DateRangePicker = () => {
    return (
      <DateRangeCalendar
        value={dateValue}
        onChange={(newValue) => {
          if (newValue[1] !== null) {
            setDateValue(newValue);
          }
        }}
      />
    );
  };

  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '50px'
      }}
    >
      <Box sx={{ width: '100%' }}>
        <TopOverViewSection
          useBackButton
          CustomDateRangePicker={<DateRangePicker />}
        />
      </Box>{' '}
      {branches && bankproducts && (
        <FilterSection
          branches={branches}
          bankproducts={bankproducts}
          onSearch={handleSearch}
        />
      )}
      <Box sx={{ paddingX: '24px' }}>
        {isCustomerBalanceDataLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <Box sx={{ width: '100%' }}>
            <TableV2
              isSearched={search}
              tableConfig={{
                hasActions: false,
                paintedColumns: ['bkbalance', 'availBal'],
                totalRow: [
                  'Total',
                  '',
                  '',
                  `${totalBkBal}`,
                  `${totalAvaiBal}`,
                  '',
                  '',
                  ''
                ],
                grandTotalRow: [
                  'Grand Total',
                  '',
                  '',
                  '',
                  '',
                  '',
                  '',
                  `${grandTotal}`
                ]
              }}
              keys={keys as []}
              columns={COLUMN}
              data={pagedCustomerBalances}
              hideFilterSection
              showHeader={{
                mainTitle: 'Customer Balances',
                secondaryTitle:
                  'See a directory of all Customer Balance Report in this system.'
              }}
              setPage={setPage}
              totalElements={totalRecords}
              page={page}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
