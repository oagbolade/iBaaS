'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { FilterSection } from './FilterSection';
import { COLUMN } from './Column';
import { MuiTableContainer, TableSingleAction } from '@/components/Table';

import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { useGetAllDormantAccount } from '@/api/reports/useDormantAccount';
import { ISearchParams } from '@/app/api/search/route';
import { useGetBranches } from '@/api/general/useBranches';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { IDormantAccountList } from '@/api/ResponseTypes/reports';
import { renderEmptyTableBody, StyledTableRow } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { FormSkeleton } from '@/components/Loaders';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';

export const DormantAccount = () => {
  const { isLoading} = useGlobalLoadingState();
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
  } = usePersistedSearch<ISearchParams>('dormant-account');
  const { branches } = useGetBranches();
  const {
    dormantAccountList: getAllDormantAccountData,
    isLoading: isDormantAccountDataLoading
  } = useGetAllDormantAccount({
    ...searchParams,
    page
  });

  const {
    dormantAccountList: downloadData
  } = useGetAllDormantAccount({
    ...searchParams,
    page,
    getAll: true
  });

  const handleSearch = async (params: ISearchParams | null) => {
    setSearchActive(true);
    setSearchParams({
      ...params,
      startDate: dateValue[0]?.format('YYYY-MM-DD') || '',
      endDate: dateValue[1]?.format('YYYY-MM-DD') || ''
    });
    setReportType('DormantAccount');
  };

  // Set export data when getAllChequeBookStatusData is retrieved
  React.useEffect(() => {
    if (!downloadData || downloadData.length === 0) {
      setExportData([]);
    }
    
    if ((downloadData ?? []).length > 0) {
      setExportData(downloadData as []);
    }
  }, [downloadData]);

  const ActionMenu: React.FC = () => {
    return (
      <Link href="/report/custom-report/view-report">
        <TableSingleAction actionName="View" />
      </Link>
    );
  };
  return (
    <Box sx={{ marginTop: '50px', width: '100%' }}>
      <TopOverViewSection useBackButton />
      <div className="mx-5 mt-8">
        <FilterSection branches={branches} onSearch={handleSearch} />
      </div>
      <div className="mx-5">
        {isLoading || isDormantAccountDataLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <MuiTableContainer
            columns={COLUMN}
            tableConfig={{
              hasActions: true
            }}
            data={getAllDormantAccountData || []}
            setPage={setPage}
            page={page}
            showHeader={{
              mainTitle: 'Dormant Account',
              secondaryTitle:
                'See a directory of all dormant account on this system.',
              hideFilterSection: true
            }}
            ActionMenuProps={ActionMenu}
          >
            {searchActive ? (
              getAllDormantAccountData?.map((dataItem: IDormantAccountList) => {
                return (
                  <StyledTableRow key={dataItem.accountnumber}>
                    <StyledTableCell component="th" scope="row">
                      {dataItem?.accountnumber || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.accounttitle || 'N/A'}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      {dataItem?.officerName || 'N/A'}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      {formatCurrency(dataItem?.bkbalance || 'N/A')}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      {formatCurrency(dataItem?.averagebal || 'N/A')}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      {dataItem?.customerId || 'N/A'}
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
                  {renderEmptyTableBody(getAllDormantAccountData)}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </MuiTableContainer>
        )}
      </div>
    </Box>
  );
};
