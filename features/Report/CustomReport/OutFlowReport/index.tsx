'use client';
import * as React from 'react';
import { Box, Typography } from '@mui/material';

import { FilterSection } from './FilterSection';
import { totalInflowContainerStyle, totalStyle } from './style';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { TableV2 } from '@/components/Revamp/TableV2';
import { CustomTableHeader } from '@/components/Revamp/Shared/Table/CustomTableHeader';
import { FormSkeleton } from '@/components/Loaders';

import { useGetBranches } from '@/api/general/useBranches';
import {
  useGetInflowOutflowReport,
  IInflowOutflowParams
} from '@/api/reports/useGetInflowOutflowReport';
import { inflowOutflowReportColumn } from '@/constants/Reports/COLUMNS';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';

export const InflowOutflowReport = () => {
  const { branches } = useGetBranches();
  const { setReportType, setExportData } = React.useContext(
    DownloadReportContext
  );
  const { dateValue, isDateFilterApplied } = React.useContext(
    DateRangePickerContext
  );

  const [searchParams, setSearchParams] =
    React.useState<IInflowOutflowParams | null>(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [isSearched, setSearched] = React.useState(false);

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
    pageNumber,
    getAll: isDateFilterApplied
  });

  React.useEffect(() => {
    if (!inflowOutflowList.length) return;

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

  const handleSearch = (params: IInflowOutflowParams | null) => {
    setSearchParams({
      ...params,
      startDate: dateValue[0]?.format('YYYY-MM-DD') || '',
      endDate: dateValue[1]?.format('YYYY-MM-DD') || ''
    });
    setSearched(true);
    setPageNumber(1);
  };

  return (
    <Box sx={{ width: '100%', marginTop: '50px' }}>
      <Box sx={{ width: '1300px' }}>
        <TopOverViewSection useBackButton />
      </Box>

      <Box sx={{ padding: '25px', width: '100%' }}>
        <Box sx={{ marginTop: '20px', marginBottom: '30px' }}>
          <FilterSection branches={branches} onSearch={handleSearch} />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <CustomTableHeader
            mainTitle="Inflow/Outflow Report"
            secondaryTitle="See a directory of all inflow/outflow reports in this system."
            hideFilterSection
          />
        </Box>

        {isLoading ? (
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
              hideFilterSection
              isSearched={isSearched}
              page={pageNumber}
              setPage={setPageNumber}
              totalPages={totalRecords}
              totalElements={inflowOutflowList.length}
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
