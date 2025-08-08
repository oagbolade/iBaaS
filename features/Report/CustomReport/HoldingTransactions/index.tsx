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
import {TopOverViewSection} from '@/features/Report/Overview/TopOverViewSection';

export const HoldingTransactions = () => {
  const [search, setSearch] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [pageNumber, setpageNumber] = React.useState(1);
  const { branches } = useGetBranches();

  const { setReportType, setExportData } = React.useContext(
    DownloadReportContext
  );

  const handleSearch = async (params: ISearchParams | null) => {
    setSearch(true);
    setSearchParams(params);
  };

  const { data, isLoading, totalRecords } = useGetHoldingTransactionReport({
    ...searchParams,
    pageNumber: pageNumber.toString(),
    pageSize: '10'
  });

  React.useEffect(() => {
    if (data?.pagedHoldTrans?.length > 0) {
      const mapHoldingTransaction = data.pagedHoldTrans.map((item) => ({
        accountNumber: item.accountnumber,
        created: item.create_dt,
        matured: item.end_dt,
        Amount: `NGN ${formatCurrency(item.amt)}`,
        Reason: item.holdreason
      }));

      setExportData(mapHoldingTransaction as []);
      setReportType('HoldingTransaction');
    }
  }, [data, setExportData, setReportType]);

  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '50px'
      }}
    >

      <TopOverViewSection  useBackButton/>
      {branches && (
        <FilterSection branches={branches} onSearch={handleSearch} />
      )}
      <Box sx={{ paddingX: '24px' }}>
        {isLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <Box sx={{ width: '100%' }}>
            <TableV2
              isSearched={search}
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
              setPage={setpageNumber}
              totalElements={totalRecords}
              page={pageNumber}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
