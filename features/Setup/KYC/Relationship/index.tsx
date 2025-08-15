'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { FilterSection } from './FilterSection';
import { COLUMNS } from './COLUMNS';
import { MuiTableContainer, TableSingleAction } from '@/components/Table';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { SetupContainer } from '@/features/Setup/SetupContainer';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { useGetStatus } from '@/api/general/useStatus';
import { ISearchParams } from '@/app/api/search/route';
import { useFilterRelationshipSearch } from '@/api/setup/useRelationship';
import { FormSkeleton } from '@/components/Loaders';
import { StyledTableRow, renderEmptyTableBody } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { SearchRelationshipResponse } from '@/api/ResponseTypes/setup';
import { Status } from '@/components/Labels';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

const actionButtons: any = [
  <Box ml={{ mobile: 12, desktop: 0 }}>
    <Link href="/setup/kyc/relationship/create">
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

export const Relationship = () => {
  const { status } = useGetStatus();
  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage,
  } = usePersistedSearch<ISearchParams>('relationship-kyc');
  const {
    totalPages,
    totalElements,
    data: relationshipData,
    isLoading,
  } = useFilterRelationshipSearch({ ...searchParams, page });
  const handleSearch = async (params: ISearchParams | null) => {
    setSearchParams(params);
    setSearchActive(true);
  };

  const ActionMenu = ({
    relationid,
  }: {
    relationid: string;
  }): React.ReactElement => {
    return (
      <Link
        href={`/setup/kyc/relationship/create?isEditing=true&id=${relationid}`}
      >
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
        {status !== undefined && (
          <FilterSection status={status} onSearch={handleSearch} />
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
              data={relationshipData}
              showHeader={{
                mainTitle: 'Relationship',
                secondaryTitle:
                  'See a directory of all relationships in this system.',
                hideFilterSection: true,
              }}
              ActionMenuProps={ActionMenu}
              totalPages={totalPages}
              setPage={setPage}
              totalElements={totalElements}
              page={page}
            >
              {searchActive ? (
                relationshipData?.map(
                  (dataItem: SearchRelationshipResponse) => {
                    return (
                      <StyledTableRow key={dataItem.userId}>
                        <StyledTableCell component="th" scope="row">
                          {dataItem.relationid}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {dataItem.relationname}
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
                          <ActionMenu relationid={dataItem.relationid} />
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  },
                )
              ) : (
                <StyledTableRow>
                  <StyledTableCell
                    colSpan={COLUMNS.length + 1}
                    component="th"
                    scope="row"
                  >
                    {renderEmptyTableBody(relationshipData)}
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
