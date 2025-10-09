'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { FilterSection } from './FilterSection';
import { COLUMN } from './COLUMN';
import {
  MuiTableContainer,
  StyledTableRow,
  renderEmptyTableBody
} from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { useGetChartOfAccount } from '@/api/reports/useChartAccount';
import { ISearchParams } from '@/app/api/search/route';
import { FormSkeleton } from '@/components/Loaders';
import { IChartOfAccount } from '@/api/ResponseTypes/reports';
import { useGetBranches } from '@/api/general/useBranches';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';

export const ChartAccount = () => {
  const { isLoading } = useGlobalLoadingState();
  const { branches } = useGetBranches();

  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<ISearchParams>('chart-account');

  const { setReportType, setExportData } = React.useContext(
    DownloadReportContext
  );

  const handleSearch = async (params: ISearchParams | null) => {
    setSearchActive(true);
    setSearchParams(params);
    setReportType('ChartOfAccount');
  };

  const {
    chartofAccountList: getAllChartOfAccountData,
    isLoading: isChartOfAccountLoading,
    totalRecords
  } = useGetChartOfAccount({
    ...searchParams,
    pageNumber: String(page)
  });

  const {
    chartofAccountList: downloadData,
  } = useGetChartOfAccount({
    ...searchParams,
    pageNumber: String(page),
    getAll: true
  });

  React.useEffect(() => {
    if (!downloadData || downloadData?.length === 0) {
      setExportData([]);
      return;
    }

    if (
      Array.isArray(downloadData) &&
      downloadData.length > 0
    ) {
      const mapChartOfAccount = downloadData.map((item) => ({
        glnumber: item.glnumber,
        acctname: item.acctname
      }));

      setExportData(mapChartOfAccount as []);
      setReportType('ChartOfAccount');
    }
  }, [downloadData]);

  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '50px'
      }}
    >
      <TopOverViewSection useBackButton showDatePicker={false} />

      {branches && (
        <FilterSection branches={branches} onSearch={handleSearch} />
      )}

      <Box sx={{ paddingX: '24px' }}>
        {isLoading || isChartOfAccountLoading ? (
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
                mainTitle: 'Chart Of Account',
                secondaryTitle:
                  'See a directory of all Chart of Account in this system.'
              }}
              data={getAllChartOfAccountData}
              totalElements={totalRecords}
              totalPages={Math.ceil((totalRecords ?? 0) / 10)}
              setPage={setPage}
              page={page}
            >
              {searchActive ? (
                getAllChartOfAccountData?.map((dataItem: IChartOfAccount) => {
                  return (
                    <StyledTableRow key={dataItem.glnumber}>
                      <StyledTableCell component="th" scope="row">
                        {dataItem?.glnumber || 'N/A'}
                      </StyledTableCell>

                      <StyledTableCell align="right">
                        {dataItem?.acctname || 'N/A'}
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
                    {renderEmptyTableBody(getAllChartOfAccountData || null)}
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
