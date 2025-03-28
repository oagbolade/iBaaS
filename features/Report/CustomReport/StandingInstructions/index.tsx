'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { FilterSection } from './FilterSection';
import { COLUMN } from './COLUMNS';
import { MuiTableContainer, TableSingleAction } from '@/components/Table';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { useGetStandingIntruction } from '@/api/reports/useStandingInstructions';
import { useGetBranches } from '@/api/general/useBranches';
import { ISearchParams } from '@/app/api/search/route';
import { FormSkeleton } from '@/components/Loaders';
import { StyledTableCell } from '@/components/Table/style';
import { renderEmptyTableBody, StyledTableRow } from '@/components/Table/Table';
import { IStandingInstruction } from '@/api/ResponseTypes/reports';

export const ActionMenu: React.FC = () => {
  return (
    <Link href="/report/custom-report/view-report">
      <TableSingleAction actionName="View" />
    </Link>
  );
};

export const StandingInstructions = () => {
  const [search, setSearch] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [page, setPage] = React.useState(1);
  const { branches } = useGetBranches();
  const { siTransactions, isLoading } = useGetStandingIntruction({
    ...searchParams,
    page
  });
  const handleSearch = async (params: ISearchParams | null) => {
    setSearch(true);
    setSearchParams(params);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {branches && (
        <FilterSection branches={branches} onSearch={handleSearch} />
      )}
      <Box sx={{ padding: '25px', width: '100%' }}>
        {isLoading ? (
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
            {search ? (
              siTransactions?.map((dataItem: IStandingInstruction) => {
                return (
                  <StyledTableRow key={dataItem.sinumber}>
                    <StyledTableCell component="th" scope="row">
                      {dataItem?.sinumber || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.fromaccountnumber || 'N/A'}
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
      </Box>
    </Box>
  );
};
