'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { FilterSection } from './FilterSection';
import { COLUMNS } from './COLUMNS';
import { MuiTableContainer, TableSingleAction } from '@/components/Table';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { SetupContainer } from '@/features/Setup/SetupContainer';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { ISearchParams } from '@/app/api/search/route';
import { useFilterEducationSearch } from '@/api/setup/useEducation';
import { StyledTableRow, renderEmptyTableBody } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { SearchEducationResponse } from '@/api/ResponseTypes/setup';
import { FormSkeleton } from '@/components/Loaders';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

const actionButtons: any = [
  <Box ml={{ mobile: 12, desktop: 0 }}>
    <Link href="/setup/kyc/education/create">
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

export const Education = () => {
  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage,
  } = usePersistedSearch<ISearchParams>('education');
  const {
    totalPages,
    totalElements,
    data: educationData,
    isLoading,
  } = useFilterEducationSearch({ ...searchParams, page });
  const handleSearch = async (params: ISearchParams | null) => {
    setSearchParams(params);
    setSearchActive(true);
  };

  const ActionMenu = ({
    educationCode,
  }: {
    educationCode: string;
  }): React.ReactElement => {
    return (
      <Link
        href={`/setup/kyc/education/create?isEditing=true&id=${educationCode}`}
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
        <FilterSection onSearch={handleSearch} />
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
              data={educationData}
              showHeader={{
                mainTitle: 'Education',
                secondaryTitle:
                  'See a directory of all educations in this system.',
                hideFilterSection: true,
              }}
              ActionMenuProps={ActionMenu}
              totalPages={totalPages}
              setPage={setPage}
              totalElements={totalElements}
              page={page}
            >
              {searchActive ? (
                educationData?.map((dataItem: SearchEducationResponse) => {
                  return (
                    <StyledTableRow key={dataItem.userId}>
                      <StyledTableCell component="th" scope="row">
                        {dataItem.educationCode}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem.educationname}
                      </StyledTableCell>
                      <StyledTableCell>
                        <ActionMenu educationCode={dataItem.educationCode} />
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
                    {renderEmptyTableBody(educationData)}
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
