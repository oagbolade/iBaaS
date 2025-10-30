'use client';
import React from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { FilterSection } from './FilterSection';
import { COLUMN } from './Column';
import {
  MuiTableContainer,
  StyledTableRow,
  renderEmptyTableBody
} from '@/components/Table/Table';

import { StyledTableCell } from '@/components/Table/style';
import { useGetPostingJournal } from '@/api/reports/usePostingJournal';
import { ISearchParams } from '@/app/api/search/route';
import { FormSkeleton } from '@/components/Loaders';
import { IPostingJournal } from '@/api/ResponseTypes/reports';
import { formatDateAndTime } from '@/utils/hooks/useDateFormat';
import { useGetBranches } from '@/api/general/useBranches';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import colors from '@/assets/colors';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';

interface ActionMenuProps {
  detail: string;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ detail }) => {
  return (
    <Link
      href={`/report/custom-report/view-report/?getPostingJournal=postingJournal&postingJournalDetail=${detail}`}
      style={{ color: `${colors.activeBlue400}` }}
    >
      View More
    </Link>
  );
};

export const PostingJournal = () => {
  const { isLoading: isGlobalLoading } = useGlobalLoadingState();
  const { dateValue } = React.useContext(DateRangePickerContext);
  const { setExportData, setReportType, setReportQueryParams } =
    React.useContext(DownloadReportContext);

  const { branches } = useGetBranches();
  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<ISearchParams>('posting-journal');

  const handleSearch = async (params: ISearchParams | null) => {
    setSearchActive(true);
    setSearchParams({
      ...params,
      startDate: dateValue[0]?.format('YYYY-MM-DD') || '',
      endDate: dateValue[1]?.format('YYYY-MM-DD') || ''
    });

    setReportType('PostingJournal');
  };

  const { postingJournalList, isLoading } = useGetPostingJournal({
    ...searchParams,
    page,
    getAll: false
  });

  const { postingJournalList: downloadData } = useGetPostingJournal({
    ...searchParams,
    page,
    getAll: true
  });

  // Set export data when postingJournalList is retrieved
  React.useEffect(() => {
    if (!downloadData || downloadData?.length === 0) {
      setExportData([]);
      return;
    }

    if (downloadData?.length > 0) {
      setExportData(downloadData);
    }
  }, [downloadData, setExportData, setReportType]);

  return (
    <Box
      sx={{
        width: '100%'
      }}
    >
      <TopOverViewSection useBackButton />
      {branches && (
        <FilterSection branches={branches} onSearch={handleSearch} />
      )}
      <Box sx={{ paddingX: '24px' }}>
        {isGlobalLoading || isLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <MuiTableContainer
            columns={COLUMN}
            tableConfig={{
              hasActions: true
            }}
            showHeader={{
              hideFilterSection: true,
              mainTitle: 'Posting Journal',
              secondaryTitle:
                'See a directory of all posting journal in this system.'
            }}
            data={postingJournalList}
            setPage={setPage}
            page={page}
          >
            {searchActive ? (
              postingJournalList?.map((dataItem: IPostingJournal) => {
                return (
                  <StyledTableRow key={dataItem.accountNumber}>
                    <StyledTableCell component="th" scope="row">
                      {dataItem?.accountNumber || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.accounttitle || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {dataItem?.tranname || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {dataItem?.tranDate
                        ? formatDateAndTime(dataItem?.tranDate)
                        : 'N/A'}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      {dataItem?.creditAcct || 'N/A'}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      {dataItem?.debitacct || 'N/A'}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      <ActionMenu detail={JSON.stringify(dataItem) as string} />
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
                  {renderEmptyTableBody(postingJournalList)}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </MuiTableContainer>
        )}
      </Box>
    </Box>
  );
};
