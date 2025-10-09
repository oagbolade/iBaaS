'use client';
import * as React from 'react';
import { Box, Typography } from '@mui/material';

import { FilterSection } from './FilterSection';
import { totalInflowContainerStyle, totalStyle } from './style';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { TableV2 } from '@/components/Revamp/TableV2';
import { FormSkeleton } from '@/components/Loaders';

import { useGetBranches } from '@/api/general/useBranches';
import {
  useGetInflowOutflowReport,
  IInflowOutflowParams
} from '@/api/reports/useGetInflowOutflowReport';
import { inflowOutflowReportColumn } from '@/constants/Reports/COLUMNS';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';

export const InflowOutflowReport = () => {
  const { isLoading: isGlobalLoading } = useGlobalLoadingState();
  const { branches } = useGetBranches();
  const { setReportType, setExportData } = React.useContext(
    DownloadReportContext
  );
  const { dateValue } = React.useContext(
    DateRangePickerContext
  );

  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<IInflowOutflowParams>('outflow-report');
  const { branchId, tellerId } = searchParams || {};

  const {
    inflowOutflowList = [],
    totalInflow,
    totalOutflow,
    totalRecords,
    isLoading
  } = useGetInflowOutflowReport({
    ...searchParams,
    branchId,
    tellerId,
    pageSize: 10,
    pageNumber: page
  });

  const { inflowOutflowList: downloadData } = useGetInflowOutflowReport({
    ...searchParams,
    branchId,
    tellerId,
    pageSize: 10,
    pageNumber: page,
    getAll: true
  });

  React.useEffect(() => {
    if (!downloadData || downloadData?.length === 0) {
      setExportData([]);
      return;
    }

    if (downloadData && downloadData?.length > 0) {
      const formattedExportData = downloadData.map((item) => ({
        'Account Number': item.accountnumber || '',
        'Account Name': item.accounttitle || '',
        'Product Code': item.productcode || '',
        'Product Name': item.productName || '',
        'Branch Code': item.branchcode || '',
        Inflow: item.inflow || '',
        Outflow: item.outflow || ''
      }));

      setExportData(formattedExportData);
      setReportType('InflowOutflow');
    }
  }, [downloadData]);

  const handleSearch = (params: IInflowOutflowParams | null) => {
    setSearchParams({
      ...params,
      startDate: dateValue[0]?.format('YYYY-MM-DD') || '',
      endDate: dateValue[1]?.format('YYYY-MM-DD') || ''
    });
    setSearchActive(true);
    setPage(1);
  };

  return (
    <Box sx={{ width: '100%', marginTop: '50px' }}>
      <TopOverViewSection useBackButton />

      {branches && (
        <FilterSection branches={branches} onSearch={handleSearch} />
      )}

      <Box mx={4}>
        {isGlobalLoading || isLoading ? (
          <FormSkeleton noOfLoaders={5} />
        ) : (
          <Box>
            <TableV2
              columns={inflowOutflowReportColumn}
              data={inflowOutflowList}
              keys={[
                'accountnumber',
                'accounttitle',
                'productcode',
                'productName',
                'branchcode',
                'inflow',
                'outflow'
              ]}
              showHeader={{
                mainTitle: 'Inflow/Outflow Report',
                secondaryTitle: "See a directory of all inflow/outflow reports in this system."
              }}
              hideFilterSection
              isSearched={searchActive}
              page={page}
              setPage={setPage}
              totalPages={Math.ceil((totalRecords ?? 0) / 10)}
              totalElements={totalRecords}
            />

            {inflowOutflowList.length > 0 && (
              <Box sx={totalInflowContainerStyle}>
                <Typography>Total Amount</Typography>

                <Box sx={totalStyle}>
                  <Typography>₦{totalOutflow?.toLocaleString()}</Typography>
                  <Typography>₦{totalInflow?.toLocaleString()}</Typography>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};
