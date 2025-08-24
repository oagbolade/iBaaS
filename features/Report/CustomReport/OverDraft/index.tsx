'use client';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import { FilterSection } from './FilterSection';
import { COLUMN } from './Column';
import {
  MuiTableContainer,
  StyledTableRow,
  renderEmptyTableBody
} from '@/components/Table/Table';
import { useGetBranches } from '@/api/general/useBranches';
import { FormSkeleton } from '@/components/Loaders';
import { ISearchParams } from '@/app/api/search/route';
import { useGetOverdraftReport } from '@/api/reports/useOverdraft';
import { IOverdraftReport } from '@/api/ResponseTypes/reports';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { useGetAllProduct } from '@/api/setup/useProduct';
import { StyledTableCell } from '@/components/Table/style';
import { formatDate } from '@/utils/formatDateAndTime';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

export const OverDraft = () => {
  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<ISearchParams>('overdraft-report');
  const { branches } = useGetBranches();
  const { bankproducts } = useGetAllProduct();
  const { dateValue } = React.useContext(DateRangePickerContext);

  const { setReportType, setExportData } = React.useContext(
    DownloadReportContext
  );

  const handleSearch = async (params: ISearchParams | null) => {
    setSearchActive(true);
    setSearchParams({
      ...params,
      startDate: dateValue[0]?.format('YYYY-MM-DD') || '',
      endDate: dateValue[1]?.format('YYYY-MM-DD') || '',
      pageNumber: String(page),
      pageSize: '10'
    });
    setReportType('OverdraftReport');
  };

  const { overDraftReport, isLoading } = useGetOverdraftReport({
    ...searchParams
  });

  React.useEffect(() => {
    if (overDraftReport?.length > 0) {
      setExportData(overDraftReport);
    }
  }, [overDraftReport, setExportData, setReportType]);

  return (
    <Box sx={{ width: '100%' }}>
      <TopOverViewSection useBackButton />
      {branches && bankproducts && (
        <FilterSection branches={branches} onSearch={handleSearch} />
      )}

      <Box sx={{ paddingX: '24px' }}>
        {isLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <MuiTableContainer
            showHeader={{
              mainTitle: 'Overdraft Report',
              secondaryTitle:
                'See a directory of all Overdraft Report in this system.',
              hideFilterSection: true
            }}
            tableConfig={{
              hasActions: true
            }}
            columns={COLUMN}
            data={overDraftReport}
            setPage={setPage}
            page={page}
          >
            {searchActive ? (
              overDraftReport?.map((dataItem: IOverdraftReport) => {
                return (
                  <StyledTableRow key={dataItem.accountnumber}>
                    <StyledTableCell component="th" scope="row">
                      {dataItem?.accountnumber || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.accounttitle || 'N/A'}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      {dataItem?.productname || 'N/A'}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      {dataItem?.authorized || 'N/A'}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      {formatDate(dataItem?.expiry_Date) || 'N/A'}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      {dataItem?.unauthorized || 'N/A'}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      {dataItem?.age || 'N/A'}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      {dataItem?.branchname || 'N/A'}
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
                  {renderEmptyTableBody(overDraftReport)}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </MuiTableContainer>
        )}
      </Box>
    </Box>
  );
};
