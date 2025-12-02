'use client';
import React from 'react';
import { Box } from '@mui/material';
import moment from 'moment';
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
import { useGetBranches } from '@/api/general/useBranches';
import { useGetStatus } from '@/api/general/useStatus';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { Status } from '@/components/Labels';


export const ChequeBookStatus = () => {
  const { isLoading } = useGlobalLoadingState();
  const { dateValue } = React.useContext(DateRangePickerContext);
  const { setExportData, setReportType } = React.useContext(
    DownloadReportContext
  );

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
    isLoading: isChequeBookDataLoading,
    totalRecords
  } = useGetCheckbookStatus({
    ...searchParams,
    pageNumber: String(page)
  });

  const { chequeBookList: downloadData } = useGetCheckbookStatus({
    ...searchParams,
    pageNumber: String(page),
    getAll: true
  });

  const rowsPerPage = 10;
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
                hasActions: false
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
              totalElements={totalRecords}
              totalPages={Math.ceil(totalRecords / rowsPerPage)}
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
                          ? moment(dataItem.createdate).format(
                              'MMMM Do YYYY, h:mm:ss a'
                            )
                          : 'N/A'}
                      </StyledTableCell>

                      <StyledTableCell component="th" scope="row">
                        {dataItem?.range || 'N/A'}
                      </StyledTableCell>

                      <StyledTableCell component="th" scope="row">
                        <span
                          className=" truncate overflow-hidden max-w-xs block"
                          title={dataItem?.narration || 'N/A'}
                        >
                          {dataItem?.narration || 'N/A'}
                        </span>
                      </StyledTableCell>

                      <StyledTableCell component="th" scope="row">
                        {(() => {
                          switch (dataItem?.status) {
                            case 'Active':
                              return <Status label="Active" status="success" />;
                            case 'Used':
                              return <Status label="Used" status="pending" />;
                            case 'Closed':
                              return <Status label="closed" status="pending" />;
                            case 'Hotlisted':
                              return (
                                <Status label="Hotlisted" status="danger" />
                              );
                            default:
                              return null;
                          }
                        })()}
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
