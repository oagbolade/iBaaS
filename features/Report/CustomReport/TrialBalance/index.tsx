'use client';
import React, { useContext, useEffect } from 'react';
import { Box } from '@mui/material';
import { centraliseNoDataAvailable } from '../style';
import { FilterSection } from './FilterSection';
import { ShortCards } from '@/components/CustomCardsReports/ShortCards';

import {
  totalContainer,
  totalTitle
} from '@/components/CustomCardsReports/style';
import { PageTitle } from '@/components/Typography';
import { FormSkeleton } from '@/components/Loaders';
import { useGetBranches } from '@/api/general/useBranches';
import { ISearchParams } from '@/app/api/search/route';
import { useGetTrialBalanceGroup } from '@/api/reports/useGetTrialBalanceGroup';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { NoDataAvailable } from '@/components/Alert/Warning/NoDataAvailable';
import { ITrialBalanceGroup } from '@/api/ResponseTypes/reports';
import { useGetGLType } from '@/api/admin/useCreateGLAccount';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';

import { TopOverViewSingeCalendarSection } from '@/features/Report/Overview/TopOverViewSingleCalenderSection';

export const TrialBalance = () => {
  const { isLoading } = useGlobalLoadingState();
  const { branches } = useGetBranches();
  const { glType } = useGetGLType();
  const { setExportData, setReportType } = useContext(DownloadReportContext);
  const { dateValue } = useContext(DateRangePickerContext);

  const { searchParams, setSearchParams, setSearchActive, page } =
    usePersistedSearch<ISearchParams>('trial-balance');

  const { trialBydateList = [], isLoading: isLoadingTrialBydategroupList } =
    useGetTrialBalanceGroup({
      ...searchParams,
      pageSize: '20',
      pageNumber: String(page)
    });

  const { trialBydateList: downloadData = [] } = useGetTrialBalanceGroup({
    ...searchParams,
    pageSize: '20',
    pageNumber: String(page),
    getAll: true
  });

  const handleSearch = async (params: ISearchParams | null) => {
    setSearchActive(true);
    setSearchParams({
      ...params,
      startDate: dateValue[0]?.format('YYYY-MM-DD') || ''
    });
  };

  useEffect(() => {
    if (!downloadData || downloadData.length === 0) {
      // setExportData([]);
    }

    if (trialBydateList.length > 0) {
      const formattedExportData = downloadData.map((item) => ({
        'GL Class Name': item?.gl_classname || '',
        Balance: item?.balance || '',
        'GL Code': item?.gl_classcode || '',
        'Product Type Code': item?.prodtypecode || '',
        'GL Nodecode': item?.gl_nodecode || ''
      }));

      // Ensure no blank row or misplaced headers
      setExportData(formattedExportData);
      setReportType('TrialBalanceByDate');
    }
  }, [downloadData]);

  const calculateTotalBalance = (accounts: ITrialBalanceGroup[]): number => {
    return accounts.reduce((total, account) => total + account.balance, 0);
  };

  return (
    <Box
      sx={{
        width: '100%'
      }}
    >
      <TopOverViewSingeCalendarSection />

      <Box sx={{ paddingX: '24px', marginTop: '40px' }}>
        {branches && glType && (
          <FilterSection
            branches={branches}
            glType={glType}
            onSearch={handleSearch}
          />
        )}
      </Box>

      <Box>
        {isLoading || isLoadingTrialBydategroupList ? (
         <Box sx={{ paddingX: '24px' }}>
             <FormSkeleton noOfLoaders={3} />
          </Box>
        ) : (
          <Box>
            {trialBydateList.length > 0 ? (
              <Box sx={{ paddingX: '40px' }}>
                {trialBydateList.map((item, index) => (
                  <Box key={index}>
                    <ShortCards
                      title={item?.gl_classname}
                      numberOfAccounts={`₦ ${item.balance.toLocaleString()}`}
                      link={`/report/custom-report/trial-balance/main-cash?name=${item?.gl_classname}&classCode=${item?.gl_classcode}&reportType=${searchParams?.reportType}&glNodeCode=${item?.gl_nodecode}&glTypeCode=${item?.prodtypecode}&branchID=${searchParams?.branchID}&customerID=${searchParams?.customerID}`}
                    />
                  </Box>
                ))}

                <Box sx={totalContainer}>
                  <PageTitle title="Total Asset" styles={{ ...totalTitle }} />
                  <Box>
                    <PageTitle
                      title={`₦ ${calculateTotalBalance(trialBydateList).toLocaleString()}`}
                      styles={{ ...totalTitle }}
                    />
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box sx={centraliseNoDataAvailable}>
                <Box mb={3} sx={{ width: '200px', height: '200px' }}>
                  <NoDataAvailable
                    message="No reports found. Try searching with different parameters."
                    width={200}
                    height={200}
                  />
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};
