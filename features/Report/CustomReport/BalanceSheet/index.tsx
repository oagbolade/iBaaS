'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import { GrandTotal, ShortCardWithAccordion } from './ShortCardWithAccordion';
import { FilterSection } from './FilterSection';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { column } from '@/constants/Reports/ASSETS_DATA';
import { useGetBranches } from '@/api/general/useBranches';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';
import { useGetAllBalanceSheet } from '@/api/reports/useGetBalanceSheet';
import { FormSkeleton } from '@/components/Loaders';
import { renderEmptyTableBody } from '@/components/Table/Table';
import { IBalanceSheetList } from '@/api/ResponseTypes/reports';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';

export const BalanceSheet = () => {
  const { isLoading: isGlobalLoading } = useGlobalLoadingState();
  const { branches } = useGetBranches();
  const [page, setPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [pageSize, setPageSize] = React.useState(10);

  const { data: balanceSheetData, isLoading } = useGetAllBalanceSheet({
    pageSize: pageSize.toString(),
    page,
    searchWith: searchTerm,
    getAll: false
  });

  const grandTotal = React.useMemo(() => {
    if (!balanceSheetData) return 0;
    return balanceSheetData?.reduce(
      (sum, item) => sum + parseFloat(String(item.sumbalance)),
      0
    );
  }, [balanceSheetData]);

  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '70px'
      }}
    >
      <TopOverViewSection useBackButton />
      <Box>{branches && <FilterSection branches={branches} />}</Box>
      <Box
        sx={{
          padding: '25px',
          width: '100%'
        }}
      >
        {isGlobalLoading || isLoading ? (
          <Box sx={{ padding: '20px', textAlign: 'center' }}>
            <FormSkeleton noOfLoaders={3} />
          </Box>
        ) : (
          <>
            {balanceSheetData && balanceSheetData?.length > 0 ? (
              <>
                {balanceSheetData?.map((item: IBalanceSheetList) => (
                  <ShortCardWithAccordion
                    key={item.itemid}
                    column={column}
                    defaultData={[]} // This will be replaced with API data when accordion is expanded
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
              renderEmptyTableBody(
                balanceSheetData as IBalanceSheetList[] | undefined
              )
            )}
          </>
        )}
      </Box>
    </Box>
  );
};
