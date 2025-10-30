'use client';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { COLUMN } from '../COLUMN';
import { FilterSection } from '../SubFilterSection';
import { FormSkeleton } from '@/components/Loaders';
import { useGetBranches } from '@/api/general/useBranches';
import { ISearchParams } from '@/app/api/search/route';
import {
  MuiTableContainer,
  StyledTableRow,
  renderEmptyTableBody
} from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { ITrialBalance } from '@/api/ResponseTypes/reports';
import { useGetTrialBalance } from '@/api/reports/useTrialBalance';

import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';
import { DownloadReportContext } from '@/context/DownloadReportContext';

export const CommercialBanks = () => {
  const [search, setSearch] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [page, setPage] = React.useState(1);
  const { branches } = useGetBranches();
  const { setExportData, setReportType } = React.useContext(
    DownloadReportContext
  );

  const handleSearch = async (params: ISearchParams | null) => {
    setSearch(true);
    setSearchParams(params);
  };

  const {
    trialBydateList: getAllTrialBalanceData,
    isLoading: isTrialBalanceDataLoading
  } = useGetTrialBalance({
    ...searchParams,
    page
  });

  const { trialBydateList: downloadData } = useGetTrialBalance({
    ...searchParams,
    page,
    getAll: true
  });

  useEffect(() => {
    if (!downloadData || downloadData?.pagedTrialBalances?.length === 0) {
      setExportData?.([]);
      return;
    }

    if (downloadData && downloadData?.pagedTrialBalances?.length > 0) {
      setExportData?.(downloadData?.pagedTrialBalances);
      setReportType('TrialBalanceByDate');
    }
  }, [downloadData]);

  const trialBalanceData = getAllTrialBalanceData?.pagedTrialBalances || [];
  return (
    <Box
      sx={{
        width: '100%'
      }}
    >
      {branches && (
        <FilterSection branches={branches} onSearch={handleSearch} />
      )}
      <Box sx={{ paddingX: '24px' }}>
        {isTrialBalanceDataLoading ? (
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
                mainTitle: 'Balances held with commercial banks',
                secondaryTitle:
                  'See a directory of all Balances held with commercial banks Report in this system.'
              }}
              data={trialBalanceData}
              setPage={setPage}
              page={page}
            >
              {search ? (
                trialBalanceData?.map((dataItem: ITrialBalance) => {
                  return (
                    <StyledTableRow key={dataItem.acctno}>
                      <StyledTableCell component="th" scope="row">
                        {dataItem?.gl_nodecode || 'N/A'}
                      </StyledTableCell>

                      <StyledTableCell component="th" scope="row">
                        {dataItem?.acctname || 'N/A'}
                      </StyledTableCell>

                      <StyledTableCell component="th" scope="row">
                        {`NGN ${formatCurrency(dataItem?.last_night_balance2 || 0)}`}
                      </StyledTableCell>

                      <StyledTableCell component="th" scope="row">
                        {dataItem?.debitacct || 'N/A'}
                      </StyledTableCell>

                      <StyledTableCell component="th" scope="row">
                        {dataItem?.creditAcct || 'N/A'}
                      </StyledTableCell>

                      <StyledTableCell component="th" scope="row">
                        {dataItem?.totalname || 'N/A'}
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
                    {renderEmptyTableBody(trialBalanceData)}
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
