'use client';
import React from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { FilterSection } from './FilterSection';
import { COLUMN } from './COLUMNS';
import { MuiTableContainer, TableSingleAction } from '@/components/Table';
import { useGetStandingIntruction } from '@/api/reports/useStandingInstructions';
import { useGetBranches } from '@/api/general/useBranches';
import { ISearchParams } from '@/app/api/search/route';
import { FormSkeleton } from '@/components/Loaders';
import { StyledTableCell } from '@/components/Table/style';
import { renderEmptyTableBody, StyledTableRow } from '@/components/Table/Table';
import { IStandingInstruction } from '@/api/ResponseTypes/reports';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';

export const ActionMenu: React.FC = () => {
  return (
    <Link href="/report/custom-report/view-report">
      <TableSingleAction actionName="View" />
    </Link>
  );
};

export const StandingInstructions = () => {
  const { isLoading: isGlobalLoading } = useGlobalLoadingState();
  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<ISearchParams>('standing-instruction');
  const { branches } = useGetBranches();
  const { dateValue } = React.useContext(DateRangePickerContext);

  const { siTransactions, isLoading } = useGetStandingIntruction({
    ...searchParams
  });

  const { siTransactions: downloadData } = useGetStandingIntruction({
    ...searchParams,
    getAll: true
  });

  const { setReportType, setExportData } =
    React.useContext(DownloadReportContext);

  React.useEffect(() => {
    if (!downloadData || downloadData.length === 0) {
      setExportData([]);
    }

    if ((downloadData ?? []).length > 0) {
      setExportData(downloadData as []);
    }
  }, [downloadData]);

  const handleSearch = async (params: ISearchParams | null) => {
    setSearchActive(true);
    setSearchParams({
      ...params,
      startDate: dateValue[0]?.format('YYYY-MM-DD') || '',
      endDate: dateValue[1]?.format('YYYY-MM-DD') || '',
      page
    });

    setReportType('StandingInstructionReport');
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TopOverViewSection useBackButton />

      {branches && (
        <div className="mx-5 mt-20">
          <FilterSection branches={branches} onSearch={handleSearch} />
        </div>
      )}
      <div className="mx-5">
        {isGlobalLoading || isLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <MuiTableContainer
            columns={COLUMN}
            data={siTransactions}
            showHeader={{
              mainTitle: 'Standing Instructions',
              secondaryTitle:
                'See a directory of all standing instructions this system.',
              hideFilterSection: true
            }}
            setPage={setPage}
            page={page}
          >
            {searchActive ? (
              siTransactions?.map((dataItem: IStandingInstruction) => {
                return (
                  <StyledTableRow key={dataItem.sinumber}>
                    <StyledTableCell component="th" scope="row">
                      {dataItem?.fromaccountnumber || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.toaccountnumber || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.create_dt || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.nextDate || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.toaccountnumber || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.frequency || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.sireason || 'N/A'}
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
                  {renderEmptyTableBody(siTransactions)}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </MuiTableContainer>
        )}
      </div>
    </Box>
  );
};
