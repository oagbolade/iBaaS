'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import { FilterSection } from './FilterSection';
import { COLUMN } from './COLUMN';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { TableV2 } from '@/components/Revamp/TableV2';
import { useGetBranches } from '@/api/general/useBranches';
import { useGetGroupLoan } from '@/api/reports/useGroupLoanReport';
import { ISearchParams } from '@/app/api/search/route';
import { FormSkeleton } from '@/components/Loaders';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { DownloadReportContext } from '@/context/DownloadReportContext';

export const GroupLoanReport = () => {
  const { isLoading: isGlobalLoading } = useGlobalLoadingState();
  const { setExportData, setReportType, setReportQueryParams } =
    React.useContext(DownloadReportContext);
  const { branches } = useGetBranches();
  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<ISearchParams>('group-loan-report');

  const {
    groupLoanReportList = [],
    isLoading,
    totalRecords
  } = useGetGroupLoan({
    ...searchParams,
    page
  });

  const { groupLoanReportList: downloadData = [] } = useGetGroupLoan({
    ...searchParams,
    page,
    getAll: true
  });

  React.useEffect(() => {
    if (!downloadData || downloadData.length === 0) {
      setExportData?.([]);
      return;
    }

    if (downloadData && downloadData.length > 0) {
      setExportData?.(downloadData);
      setReportType?.('GroupLoanReport');
    }
  }, [downloadData]);

  const handleSearch = async (params: ISearchParams | null) => {
    setSearchActive(true);
    setSearchParams(params);
  };

  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '50px'
      }}
    >
      <TopOverViewSection useBackButton />

      <Box
        sx={{
          padding: '25px',
          width: '100%'
        }}
      >
        {branches && (
          <FilterSection branches={branches} onSearch={handleSearch} />
        )}
        <Box>
          {isGlobalLoading || isLoading ? (
            <FormSkeleton noOfLoaders={3} />
          ) : (
            <Box sx={{ width: '100%' }}>
              <TableV2
                tableConfig={{
                  hasActions: false,
                  paintedColumns: ['DR Product Balance', ''],
                  totalRow: ['Total Amount', '', '₦104,200.65', '₦104,200.65']
                }}
                columns={COLUMN}
                data={groupLoanReportList}
                hideFilterSection
                keys={['groupid', 'groupname', 'loanamount', 'currentbalance']}
                showHeader={{
                  mainTitle: 'Loan By Group Report',
                  secondaryTitle:
                    'See a directory of all Loan By Group Report in this system.'
                }}
                page={page}
                setPage={setPage}
                isSearched={searchActive}
                totalPages={totalRecords}
                totalElements={groupLoanReportList?.length}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
