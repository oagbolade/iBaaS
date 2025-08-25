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
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

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
  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage,
  } = usePersistedSearch<ISearchParams>('customer-balances');
  const { branches } = useGetBranches();
  const { bankproducts } = useGetAllProduct();

  const { setReportType, setExportData, readyDownload, setReadyDownload } =
    React.useContext(DownloadReportContext);

  const { dateValue } = React.useContext(DateRangePickerContext);

  const {
    customerBalanceList = {
      pagedCustomerBalances: [],
      grandTotal: 0,
      totalAvaiBal: 0,
      totalBkBal: 0,
    },
    isLoading: isCustomerBalanceDataLoading,
    totalRecords = 0,
  }: CustomerBalanceList = useGetCustomerBalance({
    ...searchParams,
    getAll: readyDownload,
    page,
  });

  const {
    pagedCustomerBalances = [],
    grandTotal = 0,
    totalAvaiBal = 0,
    totalBkBal = 0,
  } = customerBalanceList || [];

  React.useEffect(() => {
    if (readyDownload) {
      setSearchParams({
        ...searchParams,
        getAll: true,
      });
    }
  }, [readyDownload]);

  React.useEffect(() => {
    if (
      readyDownload &&
      !isCustomerBalanceDataLoading &&
      pagedCustomerBalances.length > 0
    ) {
      const mapCustomerBalance = pagedCustomerBalances.map((item) => ({
        accountnumber: item.accountnumber,
        accounttitle: item.accounttitle,
        dateopened: item.dateopened,
        bkbalance: `NGN ${item.bkbalance}`,
        availBal: `NGN ${item.availBal}`,
        lastdatepay: item.lastdatepay,
        holdBal: `NGN ${item.holdbal}`,
        pendingCC: `NGN ${item.pendingCC}`,
      }));
      setExportData(mapCustomerBalance as []);
    }
  }, [
    pagedCustomerBalances,
    isCustomerBalanceDataLoading,
    readyDownload,
    setExportData,
    grandTotal,
    totalAvaiBal,
    totalBkBal,
  ]);

  const handleSearch = async (params: ISearchParams | null) => {
    setReadyDownload(false);
    setSearchActive(true);
    setSearchParams({
      ...params,
      startDate: dateValue[0]?.format('YYYY-MM-DD') || '',
      endDate: dateValue[1]?.format('YYYY-MM-DD') || '',
    });
    setReportType('CustomerBalance');
  };

  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '60px',
      }}
    >
      <TopOverViewSection useBackButton />

      {branches && bankproducts && (
        <FilterSection
          branches={branches}
          bankproducts={bankproducts}
          onSearch={handleSearch}
        />
      )}
      <Box sx={{ paddingX: '20px' }}>
        {isCustomerBalanceDataLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <Box sx={{ width: '100%' }}>
            <TableV2
              isSearched={searchActive}
              tableConfig={{
                hasActions: false,
                paintedColumns: ['bkbalance', 'availBal'],
                totalRow: [
                  'Total',
                  '',
                  '',
                  `NGN ${formatCurrency(totalBkBal)}`,
                  `NGN ${formatCurrency(totalAvaiBal)}`,
                  '',
                  '',
                  '',
                ],
                grandTotalRow: [
                  'Grand Total',
                  '',
                  '',
                  '',
                  '',
                  '',
                  '',
                  `NGN ${formatCurrency(grandTotal)}`,
                ],
              }}
              keys={keys as []}
              columns={COLUMN}
              data={pagedCustomerBalances}
              hideFilterSection
              showHeader={{
                mainTitle: 'Customer Balances',
                secondaryTitle:
                  'See a directory of all Customer Balance Report in this system.',
              }}
              setPage={setPage}
              totalElements={totalRecords}
              totalPages={Math.ceil(totalRecords / 10)}
              page={page}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
