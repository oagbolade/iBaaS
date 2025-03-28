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

export const ChequeBookStatus = () => {
  const { dateValue, isDateFilterApplied } = React.useContext(DateRangePickerContext);
  const { setExportData, setReportType } = React.useContext(
    DownloadReportContext
  );
  
  const [search, setSearch] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [page, setPage] = React.useState(1);
  const { branches } = useGetBranches();
  const { status } = useGetStatus();

  const handleSearch = async (params: ISearchParams | null) => {
    setSearch(true);
    setReportType('ChequeBookStatus');
    setSearchParams({
      ...params,
      startDate: dateValue[0]?.format('YYYY-MM-DD') || '',
      endDate: dateValue[1]?.format('YYYY-MM-DD') || '',
    });
  };

  const {
    chequeBookList: getAllChequeBookStatusData,
    isLoading: isChequeBookDataLoading
  } = useGetCheckbookStatus({
    ...searchParams,
    page,
    getAll: isDateFilterApplied
  });

    // Set export data when getAllChequeBookStatusData is retrieved
    React.useEffect(() => {
      if (getAllChequeBookStatusData?.length > 0) {
        setExportData(getAllChequeBookStatusData);
      }
    }, [getAllChequeBookStatusData]);

  return (
    <Box
      sx={{
        width: '100%'
      }}
    >
      {branches && status && (
        <FilterSection
          branches={branches}
          onSearch={handleSearch}
          status={status}
        />
      )}
      <Box sx={{ paddingX: '24px' }}>
        {isChequeBookDataLoading ? (
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
              {search ? (
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
                        {formatDateAndTime(dataItem?.createdate)}
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
