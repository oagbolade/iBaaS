'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { FilterSection } from './FilterSection';
import { COLUMNS } from './COLUMNS';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { TableV2 } from '@/components/Revamp/TableV2';
import { useTermDeporitMaturityReport } from '@/api/reports/useTermDeporitMaturityReport';
import { ISearchParams } from '@/app/api/search/route';
import { useGetBranches } from '@/api/general/useBranches';
import { FormSkeleton } from '@/components/Loaders';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { ITdMaturityReport } from '@/api/ResponseTypes/reports';

export const TermDepositMaturityReport = () => {
  const { isLoading: isGlobalLoading } = useGlobalLoadingState();
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
  } = usePersistedSearch<ISearchParams>('team-deposit-maturity');
  const { branches } = useGetBranches();

  const [tdReportList, setTdReportList] = useState<
    {
      fullName: string;
      accountNumber: string;
      tdAmount: string;
      tenor: string;
      totalDays: string;
      intRate: string;
    }[]
  >([]);

  const keys = [
    'fullName',
    'accountNumber',
    'tdAmount',
    'tenor',
    'totalDays',
    'intRate'
  ];

  const {
    tdMaturityReportList,
    isLoading,
    totalRecords
  } = useTermDeporitMaturityReport({
    ...searchParams,
    pageNumber: String(page),
    pageSize: '10',
    reportType: '5'
  });

  const {
    tdMaturityReportList: downloadData
  } = useTermDeporitMaturityReport({
    ...searchParams,
    pageNumber: String(page),
    pageSize: '10',
    reportType: '5',
    getAll: true
  });

  const mapReport = (reportList: ITdMaturityReport[]) => {
    const mapTDMaturityReport = reportList?.map((item) => {
      return {
        fullName: item.fullName,
        accountNumber: item.accountNumber,
        tdAmount: `NGN ${formatCurrency(item.tdAmount || 0) || 'N/A'}`,
        tenor: `${item.tenor} day(s)`,
        totalDays: item?.totalDays || 'N/A',
        intRate: `${item.intRate}%`
      };
    });

    const mappedReportList:
      | {
        fullName: string;
        accountNumber: string;
        tdAmount: string;
        tenor: string;
        totalDays: string;
        intRate: string;
      }[]
      | undefined = mapTDMaturityReport;

    return mappedReportList;
  };

  React.useEffect(() => {
    const mappedReportList = mapReport(tdMaturityReportList as ITdMaturityReport[]);

    setTdReportList(mappedReportList || []);
  }, [tdMaturityReportList]);

  React.useEffect(() => {
    const mappedReportList = mapReport(downloadData as ITdMaturityReport[]);

    setExportData(mappedReportList as []);
    setReportType('TermDepositMaturity');
    setTdReportList(mappedReportList || []);
  }, [downloadData]);

  const handleSearch = async (params: ISearchParams | null) => {
    setSearchActive(true);
    setSearchParams({
      ...params,
      startDate: dateValue[0]?.format('YYYY-MM-DD') || '',
      endDate: dateValue[1]?.format('YYYY-MM-DD') || ''
    });
  };

  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '60px'
      }}
    >
      <TopOverViewSection useBackButton />

      <Box
        sx={{
          padding: '25px',
          width: '100%'
        }}
      >
        <Box sx={{ marginTop: '10px', marginBottom: '30px' }}>
          <FilterSection
            branches={branches}
            onSearch={(params: ISearchParams) => handleSearch(params)}
          />
        </Box>

        {isGlobalLoading || isLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <TableV2
            isSearched={searchActive}
            tableConfig={{
              hasActions: true,
              paintedColumns: ['tdAmount', 'intRate'], // TODO: Pass keys to painted columns here
              totalRow: ['Total', '', '₦4,764,805,170.51', '', '', '599.70', '']
            }}
            keys={keys as []}
            columns={COLUMNS}
            data={tdReportList}
            hideFilterSection
            showHeader={{
              mainTitle: 'Term Deposit Maturity Report',
              secondaryTitle:
                'See a directory of all term deposit maturity report in this system.'
            }}
            setPage={setPage}
            totalElements={totalRecords}
            page={page}
          // ActionMenuProps={{}} Need to add this to view more
          />
        )}
      </Box>
    </Box>
  );
};
