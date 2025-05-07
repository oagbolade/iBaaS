'use client';
import React, { useState } from 'react';
import { MuiTableContainer, TableSingleAction } from '@/components/Table';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { Box } from '@mui/material';
import Link from 'next/link';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { FilterSection } from './FilterSection';
import { useGetAllDormantAccount } from '@/api/reports/useDormantAccount';
import { ISearchParams } from '@/app/api/search/route';
import { useGetBranches } from '@/api/general/useBranches';
import { COLUMN } from './Column';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { IDormantAccountList } from '@/api/ResponseTypes/reports';
import { renderEmptyTableBody, StyledTableRow } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { FormSkeleton } from '@/components/Loaders';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';

export const DormantAccount = () => {
  const { dateValue, isDateFilterApplied } = React.useContext(
    DateRangePickerContext,
  );
  const { setExportData, setReportType, setReportQueryParams } =
    React.useContext(DownloadReportContext);
  const [search, setSearch] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [page, setPage] = React.useState(1);
  const { branches } = useGetBranches();
  const {
    dormantAccountList: getAllDormantAccountData,
    isLoading: isDormantAccountDataLoading,
  } = useGetAllDormantAccount({
    ...searchParams,
    page,
  });

  const handleSearch = async (params: ISearchParams | null) => {
    setSearch(true);
    setSearchParams({
      ...params,
      startDate: dateValue[0]?.format('YYYY-MM-DD') || '',
      endDate: dateValue[1]?.format('YYYY-MM-DD') || '',
    });
    setReportType('DormantAccount');
  };

  // Set export data when getAllChequeBookStatusData is retrieved
  React.useEffect(() => {
    if ((getAllDormantAccountData ?? []).length > 0) {
      setExportData(getAllDormantAccountData as []);
    }
  }, [getAllDormantAccountData, setExportData, setReportType]);

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
      <Box sx={{ marginTop: '30px', padding: '25px' }}>
        {branches && (
          <FilterSection branches={branches} onSearch={handleSearch} />
        )}
      </Box>
      <Box sx={{ padding: '25px', width: '100%' }}>
        {isDormantAccountDataLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <MuiTableContainer
            columns={COLUMN}
            tableConfig={{
              hasActions: true,
            }}
            data={getAllDormantAccountData}
            setPage={setPage}
            page={page}
            showHeader={{
              mainTitle: 'Dormant Account',
              secondaryTitle:
                'See a directory of all account enquiry on this system.',
              hideFilterSection: true,
            }}
            ActionMenuProps={ActionMenu}
          >
            {search ? (
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
      </Box>
    </Box>
  );
};
