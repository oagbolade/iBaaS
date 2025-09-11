'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { sanitize } from 'dompurify';
import { FilterSection } from './FilterSection';
import { COLUMNS } from './COLUMNS';
import { MuiTableContainer, TableSingleAction } from '@/components/Table';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { SetupContainer } from '@/features/Setup/SetupContainer';
import { useGetStatus } from '@/api/general/useStatus';
import { ISearchParams } from '@/app/api/search/route';
import { useGetAllStates } from '@/api/general/useGeography';
import { FormSkeleton } from '@/components/Loaders';
import { StyledTableRow, renderEmptyTableBody } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { SearchStateResponse } from '@/api/ResponseTypes/setup';
import { Status } from '@/components/Labels';
import { useGetRegion } from '@/api/setup/useCreateRegion';
import { useFilterStateSearch } from '@/api/setup/useCreateState';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';

export const StateManagement = () => {
  const { isLoading: isGlobalLoading } = useGlobalLoadingState();
  const { status } = useGetStatus();
  const { states } = useGetAllStates();
  const { region } = useGetRegion();

  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage,
  } = usePersistedSearch<ISearchParams>('company-states');
  const {
    totalPages,
    totalElements,
    data: statementData,
    isLoading,
  } = useFilterStateSearch({ ...searchParams, page });
  const handleSearch = async (params: any) => {
    setSearchParams(params);
    setSearchActive(true);
  };

  const ActionMenu = ({
    stateCode,
  }: {
    stateCode: string;
  }): React.ReactElement => {
    return (
      <Link
        href={`/setup/company/state-management/create?isEditing=true&id=${sanitize(stateCode)}`}
      >
        <TableSingleAction actionName="Edit" />
      </Link>
    );
  };

  return (
    <>
      <TopActionsArea customStyle={{ width: '100%' }} />{' '}
      <SetupContainer>
        {status !== undefined &&
          states !== undefined &&
          region !== undefined && (
            <FilterSection
              states={Array.isArray(states) ? states : []}
              onSearch={handleSearch}
              status={Array.isArray(status) ? status : []}
              region={Array.isArray(region) ? region : []}
            />
          )}
        <Box
          sx={{
            position: { mobile: 'relative' },
            bottom: '25px',
            width: '100%',
          }}
        >
          {isGlobalLoading || isLoading ? (
            <FormSkeleton noOfLoaders={3} />
          ) : (
            <MuiTableContainer
              columns={COLUMNS}
              data={statementData}
              showHeader={{
                mainTitle: 'State',
                secondaryTitle:
                  'See a directory of all state management in this system.',
                hideFilterSection: true,
              }}
              ActionMenuProps={ActionMenu}
              totalPages={totalPages}
              setPage={setPage}
              totalElements={totalElements}
              page={page}
            >
              {searchActive ? (
                statementData?.map((dataItem: SearchStateResponse) => {
                  return (
                    <StyledTableRow key={dataItem.userId}>
                      <StyledTableCell component="th" scope="row">
                        {dataItem.stateCode}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem.stateName}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem.regionName}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Status
                          label={
                            Number(dataItem?.status) === 1
                              ? 'Active'
                              : 'Inactive'
                          }
                          status={
                            Number(dataItem?.status) === 1
                              ? 'success'
                              : 'Inactive'
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <ActionMenu stateCode={dataItem.stateCode} />
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })
              ) : (
                <StyledTableRow>
                  <StyledTableCell
                    colSpan={COLUMNS.length + 1}
                    component="th"
                    scope="row"
                  >
                    {renderEmptyTableBody(statementData)}
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </MuiTableContainer>
          )}
        </Box>
      </SetupContainer>
    </>
  );
};
