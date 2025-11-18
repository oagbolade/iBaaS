'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import { GrandTotal, ShortCardWithAccordion } from './ShortCardWithAccordion';
import { FilterSection } from './FilterSection';
import { column } from '@/constants/Reports/ASSETS_DATA';
import { useGetBranches } from '@/api/general/useBranches';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';
import { useGetAllBalanceSheet } from '@/api/reports/useGetBalanceSheet';
import { FormSkeleton } from '@/components/Loaders';
import { renderEmptyTableBody } from '@/components/Table/Table';
import { IBalanceSheetList } from '@/api/ResponseTypes/reports';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { TopOverViewSingeCalendarSection } from '@/features/Report/Overview/TopOverViewSingleCalenderSection';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { ISearchParams } from '@/app/api/search/route';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

export const BalanceSheet = () => {
  const { isLoading: isGlobalLoading } = useGlobalLoadingState();

  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<ISearchParams>('balance-sheet');
  const { branches } = useGetBranches();
  const [pageSize, setPageSize] = React.useState(10);
  const [isLoading, setIsLoading] = React.useState(false);

  const { dateValue } = React.useContext(DateRangePickerContext);

  const [filters, setFilters] = React.useState({
    searchWith: '',
    branchID: '',
    startFrom: dateValue[0]?.format('YYYY-MM-DD') || ''
  });

  const { data: balanceSheetData, isLoading: isDataLoading } =
    useGetAllBalanceSheet({
      pageSize,
      page,
      getAll: false,
      searchWith: filters.searchWith,
      branchID: filters.branchID,
      startFrom: filters.startFrom
    });

  const handleSearch = (values: { searchWith: any; branchID: any }) => {
    setIsLoading(true);
    setFilters((prev) => ({
      ...prev,
      searchWith: values.searchWith || '',
      branchID: values.branchID || '',
      startFrom: dateValue[0]?.format('YYYY-MM-DD') || ''

    }));
  };

  const grandTotal = React.useMemo(() => {
    if (!balanceSheetData) return 0;
    return balanceSheetData.reduce(
      (sum, item) => sum + parseFloat(String(item.sumbalance)),
      0
    );
  }, [balanceSheetData]);

  return (
    <Box sx={{ width: '100%', marginTop: '70px' }}>
      <TopOverViewSingeCalendarSection />

      <Box mt={2} sx={{ paddingX: '24px' }}>
        {branches && (
          <FilterSection branches={branches} onSearch={handleSearch} />
        )}
      </Box>

      <Box sx={{ padding: '25px', width: '100%' }}>
        {isDataLoading || isGlobalLoading  ? (
          <Box sx={{ padding: '20px', textAlign: 'center' }}>
            <FormSkeleton noOfLoaders={3} />
          </Box>
        ) : (
          <div>
            {balanceSheetData && balanceSheetData.length > 0 ? (
              <>
                {balanceSheetData.map((item: IBalanceSheetList) => (
                  <ShortCardWithAccordion
                    key={item.itemid}
                    column={column}
                    defaultData={[]}
                    itemcode={item.itemid.toString()}
                    title={item.groupname}
                    assetCount={item.noOfItems || 0}
                    assetValue={`${formatCurrency(item.sumbalance)}` || 0}
                  />
                ))}
                <GrandTotal
                  title="Grand Total"
                  amount={`${formatCurrency(grandTotal)}`}
                />
              </>
            ) : (
              renderEmptyTableBody(balanceSheetData)
            )}
          </div>
        )}
      </Box>
    </Box>
  );
};
