'use client';
import React, { useContext, useState } from 'react';
import { Box } from '@mui/material';
import { FilterSection } from './FilterSection';
import { ShortCardWithAccordion } from './ShortCardWithAccordion';
import { ShortCards } from '@/components/CustomCardsReports/ShortCards';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import {
  totalContainer,
  totalTitle
} from '@/components/CustomCardsReports/style';
import { PageTitle } from '@/components/Typography';
import { FormSkeleton } from '@/components/Loaders';
import { ISearchParams } from '@/app/api/search/route';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { useGetBranches } from '@/api/general/useBranches';
import { useGetGLType } from '@/api/setup/useGeneralNode';
import { useGetProfitAndLossGroup } from '@/api/reports/useGetProfitAndLossGroup';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { renderEmptyTableBody } from '@/components/Table/Table';
import { DataGroup } from '@/api/ResponseTypes/reports';
import { column, profitAndLossColumn } from '@/constants/Reports/ASSETS_DATA';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';

export const ProfitLoss = () => {
  const { isLoading } = useGlobalLoadingState();
  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<ISearchParams>('profit-and-loss');
  const { branches } = useGetBranches();
  const { setExportData, setReportType } =
    useContext(DownloadReportContext);
  const { dateValue, isDateFilterApplied } = useContext(DateRangePickerContext);

  const { branchID } = searchParams || {};

  const { data = [], isLoading: isLoadingProfitAndLoss } =
    useGetProfitAndLossGroup({
      ...searchParams,
      branchID,
      pageSize: '20',
      pageNumber: String(page),
    });

  const { data: downloadData = []} =
    useGetProfitAndLossGroup({
      ...searchParams,
      branchID,
      pageSize: '20',
      pageNumber: String(page),
      getAll: true
    });

  React.useEffect(() => {
    if (!downloadData || downloadData?.length === 0) {
      setExportData([]);
      return;
    }

    if (downloadData?.length > 0) {
      const formattedExportData = downloadData.flatMap((group) =>
        group.groupItem.map((item) => ({
          'Group Name': group.groupName || '',
          Balance: item.balance || 0,
          'Item Description': item.itemDesc || ''
        }))
      );

      setExportData(formattedExportData || []);
      setReportType('ProfitAndLoss');
    }
  }, [downloadData]);

  const handleSearch = async (params: ISearchParams | null) => {
    setSearchParams({
      ...params
    });
  };

  return (
    <Box sx={{ marginTop: '50px', width: '100%' }}>
      <Box>
        {branches && (
          <FilterSection branches={branches} onSearch={handleSearch} />
        )}
      </Box>

      <div className="mx-5">
        {isLoading || isLoadingProfitAndLoss ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <Box>
            {data && data?.length > 0 ? (
              <Box>
                {data?.map((item: DataGroup, i: number) => (
                  <ShortCardWithAccordion
                    key={i}
                    column={profitAndLossColumn}
                    defaultData={item?.groupItem}
                    itemcode={i.toString()}
                    title={item?.groupName}
                    assetCount={item.groupItem?.length || 0}
                    assetValue={`${formatCurrency(item?.totalBal)}` || 0}
                  />
                ))}
              </Box>
            ) : (
              renderEmptyTableBody(data as DataGroup[] | undefined)
            )}
          </Box>
        )}
      </div>
    </Box>
  );
};
