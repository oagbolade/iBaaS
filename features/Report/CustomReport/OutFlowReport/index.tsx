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
  const { dateValue, isDateFilterApplied } = React.useContext(
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
<<<<<<< HEAD
=======
    pageNumber: page
  });

  const { inflowOutflowList: downloadData } = useGetInflowOutflowReport({
    ...searchParams,
    branchId,
    tellerId,
    pageSize: 10,
>>>>>>> 41974da916cfc4388821468386a8d46680be127d
    pageNumber: page,
    getAll: isDateFilterApplied
  });

  React.useEffect(() => {
    if (!inflowOutflowList.length) return;

<<<<<<< HEAD
    const formattedExportData = inflowOutflowList.map((item) => ({
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
  }, [inflowOutflowList]);
=======
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
>>>>>>> 41974da916cfc4388821468386a8d46680be127d

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
  );
};
