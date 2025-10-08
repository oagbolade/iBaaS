'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { FilterSection } from './FilterSection';
import { COLUMN, keys } from './Column';
import { FormSkeleton } from '@/components/Loaders';
import { useGetBranches } from '@/api/general/useBranches';
import { ISearchParams } from '@/app/api/search/route';
import { useGetHoldingTransactionReport } from '@/api/reports/useHoldingTransaction';
import { TableV2 } from '@/components/Revamp/TableV2';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';

export const HoldingTransactions = () => {
  const { isLoading: isGlobalLoading } = useGlobalLoadingState();
  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<ISearchParams>('holding-transactions');
  const { branches } = useGetBranches();

  const { setReportType, setExportData } = React.useContext(
    DownloadReportContext
  );

  const handleSearch = async (params: ISearchParams | null) => {
    setSearchActive(true);
    setSearchParams(params);
  };

  const { data, isLoading, totalRecords } = useGetHoldingTransactionReport({
    ...searchParams,
    pageNumber: page.toString(),
    pageSize: '10'
  });

  const { data: downloadData } = useGetHoldingTransactionReport({
    ...searchParams,
    pageNumber: page.toString(),
    pageSize: '10',
    getAll: true
  });

  React.useEffect(() => {
    if (!downloadData || downloadData.pagedHoldTrans.length === 0) {
      setExportData([]);
    }

    if (downloadData?.pagedHoldTrans?.length > 0) {
      const mapHoldingTransaction = downloadData.pagedHoldTrans.map((item) => ({
        accountNumber: item.accountnumber,
        created: item.create_dt,
        matured: item.end_dt,
        Amount: `NGN ${formatCurrency(item.amt)}`,
        Reason: item.holdreason
      }));

      setExportData(mapHoldingTransaction as []);
      setReportType('HoldingTransaction');
    }
  }, [downloadData]);

  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '50px'
      }}
    >
      <TopOverViewSection useBackButton />
      {branches && (
        <FilterSection branches={branches} onSearch={handleSearch} />
      )}
      <Box sx={{ paddingX: '24px' }}>
        {isGlobalLoading || isLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <Box sx={{ width: '100%' }}>
            <TableV2
              isSearched={searchActive}
              tableConfig={{
                hasActions: false,
                grandTotalRow: [
                  'Total Amount in Holding',
                  '',
                  '',
                  `NGN ${formatCurrency(data?.totalHolding)}`,
                  ''
                ]
              }}
              keys={keys as []}
              columns={COLUMN}
              data={data?.pagedHoldTrans}
              hideFilterSection
              showHeader={{
                mainTitle: 'Holding Transactions',
                secondaryTitle:
                  'See a directory of all holding transactions Report in this system.'
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
