'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { FilterSection } from './FilterSection';
import { COLUMN, keys } from './Column';
import { FormSkeleton } from '@/components/Loaders';
import { useGetBranches } from '@/api/general/useBranches';
import { ISearchParams } from '@/app/api/search/route';
import { useGetPlainTrialBalance } from '@/api/reports/usePlainTrialBalance';
import { StyledTableCell } from '@/components/Table/style';
import { IPlainTrialBalance } from '@/api/ResponseTypes/reports';
import { TableV2 } from '@/components/Revamp/TableV2';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { DateRange } from '@mui/x-date-pickers-pro';
import dayjs, { Dayjs } from 'dayjs';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';

export const PlainTrialBalance = () => {
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
    pageNumber: pageNumber.toString()
  });

  const {
    pagedRecords: getAllPlainTrialBalanceData = [],
    totalDr = 0,
    totalCr = 0,
    bkBalance = 0
  } = plainTrialBalanceList || {};

  React.useEffect(() => {
    if (getAllPlainTrialBalanceData?.length > 0) {
      const mapPlainTrailBalance = getAllPlainTrialBalanceData.map((item) => ({
        glNumber: item.glNumber,
        oldGlNo: item.oldGLno,
        acctName: item.acctName,
        debit: `NGN ${formatCurrency(item.dr)}`,
        credit: `NGN ${formatCurrency(item.cr)}`
      }));

      setExportData(mapPlainTrailBalance as []);
      setReportType('PlainTrialBalance');
    }
  }, [getAllPlainTrialBalanceData, setExportData, setReportType]);


  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '50px'
      }}
    >

      {branches && (
        <FilterSection branches={branches} onSearch={handleSearch} />
      )}
      <Box sx={{ paddingX: '24px' }}>
        {isPlainTrailBalanceDataLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <Box sx={{ width: '100%' }}>
            <TableV2
              isSearched={search}
              tableConfig={{
                hasActions: false,
                paintedColumns: ['dr', 'cr'],
                totalRow: ['Total', '', '', `${formatCurrency(totalDr)}`, `${formatCurrency(totalCr)}`],
                grandTotalRow: ['Balance in Book', '', '', '', `${formatCurrency(bkBalance)}`]
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
