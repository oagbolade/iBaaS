'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { FilterSection } from './FilterSection';
import { COLUMN } from './Column';
import {
  MuiTableContainer,
  StyledTableRow,
  renderEmptyTableBody
} from '@/components/Table/Table';
import moment from 'moment';
import { StyledTableCell } from '@/components/Table/style';
import { useGetCheckbookStatus } from '@/api/reports/useChequebook';
import { ISearchParams } from '@/app/api/search/route';
import { FormSkeleton } from '@/components/Loaders';
import { IChequeBookList } from '@/api/ResponseTypes/reports';
import { formatDateAndTime } from '@/utils/hooks/useDateFormat';
import { useGetBranches } from '@/api/general/useBranches';
import { useGetStatus } from '@/api/general/useStatus';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';

export const ChequeBookStatus = () => {
  const { isLoading } = useGlobalLoadingState();
  const { dateValue, isDateFilterApplied } = React.useContext(
    DateRangePickerContext
  );
  const { setExportData, setReportType, setReportQueryParams } =
    React.useContext(DownloadReportContext);

  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<ISearchParams>('checkbook-status');
  const { branches } = useGetBranches();
  const { status } = useGetStatus();

  const handleSearch = async (params: ISearchParams | null) => {
    setSearchActive(true);
    setReportType('ChequeBookStatus');
    setSearchParams({
      ...params,
      startDate: dateValue[0]?.format('YYYY-MM-DD') || '',
      endDate: dateValue[1]?.format('YYYY-MM-DD') || ''
    });

    setReportType('ChequeBookStatus');
  };

  const {
    chequeBookList: getAllChequeBookStatusData,
    isLoading: isChequeBookDataLoading
  } = useGetCheckbookStatus({
    ...searchParams,
    page,
    getAll: isDateFilterApplied
  });

  const {
    chequeBookList: downloadData
  } = useGetCheckbookStatus({
    ...searchParams,
    page,
    getAll: true
  });

  // Set export data when getAllChequeBookStatusData is retrieved
  React.useEffect(() => {
    if (!downloadData || downloadData?.length === 0) {
      return setExportData([]);
    }

    if (downloadData?.length > 0) {
      setExportData(downloadData);
    }
  }, [downloadData]);

  return (
    <Box
      sx={{
        width: '100%'
      }}
    >
      <TopOverViewSection useBackButton />

      {branches && status && (
        <FilterSection
          branches={branches}
          onSearch={handleSearch}
          status={status}
        />
      )}
      <Box sx={{ paddingX: '24px' }}>
        {isLoading || isChequeBookDataLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <Box sx={{ width: '100%' }}>
            <MuiTableContainer
              columns={COLUMN}
              tableConfig={{
                hasActions: true
              }}
              showHeader={{
                hideFilterSection: true,
                mainTitle: 'Chequebook Status',
                secondaryTitle:
                  'See a directory of all Cheque books in this system.'
              }}
              data={getAllChequeBookStatusData}
              setPage={setPage}
              page={page}
            >
              {searchActive ? (
                getAllChequeBookStatusData?.map((dataItem: IChequeBookList) => {
                  return (
                    <StyledTableRow key={dataItem.accountnumber}>
                      <StyledTableCell component="th" scope="row">
                        {dataItem?.accountnumber || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem?.serialno || 'N/A'}
                      </StyledTableCell>

                      <StyledTableCell component="th" scope="row">
                        {dataItem.createdate
                          ? moment(dataItem.createdate).format('MMMM Do YYYY, h:mm:ss a')
                          : 'N/A'}
                      </StyledTableCell>

                      <StyledTableCell component="th" scope="row">
                        {dataItem?.range || 'N/A'}
                      </StyledTableCell>

                      <StyledTableCell component="th" scope="row">
                        {dataItem?.narration || 'N/A'}
                      </StyledTableCell>

                      <StyledTableCell component="th" scope="row">
                        {dataItem?.status || 'N/A'}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })
              ) : (
                <StyledTableRow>
                  <StyledTableCell
                    colSpan={COLUMN.length + 1}
                    component="th"
                    scope="row"
                  >
                    {renderEmptyTableBody(getAllChequeBookStatusData)}
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </MuiTableContainer>
          </Box>
        )}
      </Box>
    </Box>
  );
};
