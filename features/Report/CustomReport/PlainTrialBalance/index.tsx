'use client';
import React from 'react';
import { Box } from '@mui/material';
import { FilterSection } from './FilterSection';
import { COLUMN, keys } from './Column';
import { FormSkeleton } from '@/components/Loaders';
import { useGetBranches } from '@/api/general/useBranches';
import { ISearchParams } from '@/app/api/search/route';
import { useGetPlainTrialBalance } from '@/api/reports/usePlainTrialBalance';
import { TableV2 } from '@/components/Revamp/TableV2';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { TopOverViewSingeCalendarSection } from '@/features/Report/Overview/TopOverViewSingleCalenderSection';

export const PlainTrialBalance = () => {
  const { isLoading } = useGlobalLoadingState();
  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<ISearchParams>('plain-trial-balance');
  const { branches } = useGetBranches();

  const { setReportType, setExportData } = React.useContext(
    DownloadReportContext
  );

  const handleSearch = async (params: ISearchParams | null) => {
    setSearchActive(true);
    setSearchParams(params);
  };

  const {
    plainTrialBalanceList: downloadDatalist = {
      pagedRecords: [],
      totalDr: 0,
      totalCr: 0,
      bkBalance: 0
    },
    isLoading: isDownloadDataLoading
  } = useGetPlainTrialBalance({
    ...searchParams,
    pageNumber: page.toString(),
    getAll: true
  });

  const {
    plainTrialBalanceList = {
      pagedRecords: [],
      totalDr: 0,
      totalCr: 0,
      bkBalance: 0
    },
    isLoading: isPlainTrailBalanceDataLoading,
    totalRecords
  } = useGetPlainTrialBalance({
    ...searchParams,
    pageNumber: page.toString(),
    getAll: false
  });

  const {
    pagedRecords: getAllPlainTrialBalanceData = [],
    totalDr = 0,
    totalCr = 0,
    bkBalance = 0
  } = plainTrialBalanceList || {};

  const { pagedRecords: getAllDownloadData = [] } = downloadDatalist || {};

  React.useEffect(() => {
    if (!getAllDownloadData || getAllDownloadData?.length === 0) {
      setExportData([]);
      return;
    }
    
    if (getAllDownloadData?.length > 0) {
      const mapPlainTrailBalance = getAllDownloadData.map((item) => ({
        glNumber: item.glNumber,
        oldGlNo: item.oldGLno,
        acctName: item.acctName,
        debit: `NGN ${formatCurrency(item.dr)}`,
        credit: `NGN ${formatCurrency(item.cr)}`
      }));

      setExportData(mapPlainTrailBalance as []);
      setReportType('PlainTrialBalance');
    }
  }, [getAllDownloadData, isDownloadDataLoading]);

  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '50px'
      }}
    >
      <TopOverViewSingeCalendarSection />

      {branches && (
        <FilterSection branches={branches} onSearch={handleSearch} />
      )}
      <Box sx={{ paddingX: '24px' }}>
        {isLoading || isPlainTrailBalanceDataLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <Box sx={{ width: '100%' }}>
            <TableV2
              isSearched={searchActive}
              tableConfig={{
                hasActions: false,
                paintedColumns: ['dr', 'cr'],
                totalRow: [
                  'Total',
                  '',
                  '',
                  `${formatCurrency(totalDr)}`,
                  `${formatCurrency(totalCr)}`
                ],
                grandTotalRow: [
                  'Balance in Book',
                  '',
                  '',
                  '',
                  `${formatCurrency(bkBalance)}`
                ]
              }}
              keys={keys as []}
              columns={COLUMN}
              data={getAllPlainTrialBalanceData}
              hideFilterSection
              showHeader={{
                mainTitle: 'Plain Trial Balance',
                secondaryTitle:
                  'See a directory of all Customer Balance Report in this system.'
              }}
              setPage={setPage}
              page={page}
              totalPages={Math.ceil(totalRecords / 10)}
              totalElements={totalRecords}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
