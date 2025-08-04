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

export const ChartAccount = () => {
  const [search, setSearch] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [page, setPage] = React.useState(1);
  const { branches } = useGetBranches();

  const { setReportType, setExportData } = React.useContext(
    DownloadReportContext
  );

  const handleSearch = async (params: ISearchParams | null) => {
    setSearch(true);
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

  React.useEffect(() => {
    if (
      Array.isArray(getAllChartOfAccountData) &&
      getAllChartOfAccountData.length > 0
    ) {
      const mapChartOfAccount = getAllChartOfAccountData.map((item) => ({
        glnumber: item.glnumber,
        acctname: item.acctname
      }));

      setExportData(mapChartOfAccount as []);
      setReportType('ChartOfAccount');
    }
  }, [getAllChartOfAccountData, setExportData, setReportType]);

  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '50px'
      }}
    >
      {branches && (
        <FilterSection branches={branches} onSearch={handleSearch} />
      )}

      <Box sx={{ paddingX: '24px' }}>
        {isChartOfAccountLoading ? (
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
                mainTitle: 'Chart Of Account ',
                secondaryTitle:
                  'See a directory of all Chart of Account in this system.'
              }}
              data={getAllChartOfAccountData}
              totalElements={totalRecords}
              totalPages={Math.ceil((totalRecords ?? 0) / 10)}
              setPage={setPage}
              page={page}
            >
              {search ? (
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
