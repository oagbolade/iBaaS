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

export const Town = () => {
  const [page, setPage] = React.useState(1);
  const { status } = useGetStatus();
  const { states } = useGetAllStates();
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);

  const [search, setSearch] = useState<boolean>(false);
  const {
    totalElements,
    totalPages,
    isLoading,
    data: townData
  } = useFilterTownSearch({ ...searchParams, page });
  const handleSearch = async (params: any) => {
    setSearchParams(params);
    setSearch(true);
  };

  const ActionMenu = ({
    townCode
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
      <TopActionsArea customStyle={{ width: '100%' }} />{' '}
      <SetupContainer>
        {states !== undefined && (
          <FilterSection states={states} onSearch={handleSearch} />
        )}
        <Box
          sx={{
            position: { mobile: 'relative' },
            bottom: '25px',
            width: '100%'
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
                hideFilterSection: true
              }}
              ActionMenuProps={ActionMenu}
              totalPages={totalPages}
              setPage={setPage}
              totalElements={totalElements}
              page={page}
            >
              {search ? (
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
