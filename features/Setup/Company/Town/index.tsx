'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { FilterSection } from './FilterSection';
import { COLUMNS } from './COLUMNS';
import { importButton } from '@/features/Setup/Company/Country/styles';
import { MuiTableContainer, TableSingleAction } from '@/components/Table';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { SetupContainer } from '@/features/Setup/SetupContainer';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { ActionButton } from '@/components/Revamp/Buttons';
import { ImportIcon } from '@/assets/svg';
import { useGetStatus } from '@/api/general/useStatus';
import { ISearchParams } from '@/app/api/search/route';
import { useFilterTownSearch } from '@/api/setup/userCreateTown';
import { FormSkeleton } from '@/components/Loaders';
import { SearchTownResponse } from '@/api/ResponseTypes/setup';
import { StyledTableRow, renderEmptyTableBody } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { Status } from '@/components/Labels';
import { TownSearchParams } from '@/schemas/schema-values/setup';
import { useGetAllStates } from '@/api/general/useGeography';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

const actionButtons: any = [
  <Box ml={{ mobile: 12, desktop: 0 }}>
    <Link href="/setup/company/town/create">
      <PrimaryIconButton
        buttonTitle="Add New"
        customStyle={{
          ...submitButton,
          width: { mobile: '119px', desktop: '218px' },
          height: { mobile: '30px', desktop: '40px' },
        }}
      />
    </Link>
  </Box>,
];

export const Town = () => {
  const { status } = useGetStatus();
  const { states } = useGetAllStates();

  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage,
  } = usePersistedSearch<ISearchParams>('company-town');
  const {
    totalElements,
    totalPages,
    isLoading,
    data: townData,
  } = useFilterTownSearch({ ...searchParams, page });
  const handleSearch = async (params: any) => {
    setSearchParams(params);
    setSearchActive(true);
  };

  const ActionMenu = ({
    townCode,
  }: {
    townCode: string;
  }): React.ReactElement => {
    return (
      <Link href={`/setup/company/town/create?isEditing=true&id=${townCode}`}>
        <TableSingleAction actionName="Edit" />
      </Link>
    );
  };

  return (
    <>
      <TopActionsArea
        customStyle={{ width: '100%' }}
        actionButtons={actionButtons}
      />{' '}
      <SetupContainer>
        {states !== undefined && (
          <FilterSection states={states} onSearch={handleSearch} />
        )}
        <Box
          sx={{
            position: { mobile: 'relative' },
            bottom: '25px',
            width: '100%',
          }}
        >
          {isLoading ? (
            <FormSkeleton noOfLoaders={3} />
          ) : (
            <MuiTableContainer
              columns={COLUMNS}
              data={townData}
              showHeader={{
                mainTitle: 'Town',
                secondaryTitle: 'See a directory of all towns in this system.',
                hideFilterSection: true,
              }}
              ActionMenuProps={ActionMenu}
              totalPages={totalPages}
              setPage={setPage}
              totalElements={totalElements}
              page={page}
            >
              {searchActive ? (
                townData?.map((dataItem: SearchTownResponse) => {
                  return (
                    <StyledTableRow key={dataItem.userid}>
                      <StyledTableCell component="th" scope="row">
                        {dataItem.townCode}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem.townName}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem.stateName}
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
                              : 'warning'
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <ActionMenu townCode={dataItem.townCode} />
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
                    {renderEmptyTableBody(townData)}
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
