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

export const TermDepositMaturityReport = () => {
  const { setReportType, setExportData } = React.useContext(
    DownloadReportContext
  );
  const { dateValue, isDateFilterApplied } = React.useContext(
    DateRangePickerContext
  );

  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [isSearched, setSearched] = useState<boolean>(false);
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
    isLoading,
    tdMaturityReportList,
    tdMaturityReportByDateList,
    totalRecords
  } = useTermDeporitMaturityReport({
    ...searchParams,
    pageNumber: String(page),
    pageSize: '10',
    reportType: '5',
    getAll: isDateFilterApplied
  });

  React.useEffect(() => {
    const mapTDMaturityReport = tdMaturityReportList?.map((item) => {
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
    setExportData(mappedReportList as []);
    setReportType('TermDepositMaturity');
    setTdReportList(mappedReportList || []);
  }, [tdMaturityReportList]);

  const handleSearch = async (params: ISearchParams | null) => {
    setSearched(true);
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
       
        {isLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <TableV2
            isSearched={isSearched}
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
