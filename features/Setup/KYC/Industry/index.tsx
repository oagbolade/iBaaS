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
import { useGetStatus } from '@/api/general/useStatus';
import { useGetAllSectors } from '@/api/setup/useSector';
import { ISearchParams } from '@/app/api/search/route';
import { useFilterIndustrySearch } from '@/api/setup/useIndustry';
import { FormSkeleton } from '@/components/Loaders';
import { StyledTableRow, renderEmptyTableBody } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { SearchIndustryResponse } from '@/api/ResponseTypes/setup';
import { Status } from '@/components/Labels';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';

const actionButtons: any = [
  <Box ml={{ mobile: 12, desktop: 0 }}>
    <Link href="/setup/kyc/industry/create">
      <PrimaryIconButton
        buttonTitle="Add New"
        customStyle={{
          ...submitButton,
          width: { mobile: '119px', desktop: '218px' },
          height: { mobile: '30px', desktop: '40px' }
        }}
      />
    </Link>
  </Box>
];

export const Industry = () => {
  const { isLoading: isGlobalLoading } = useGlobalLoadingState();
  const { status } = useGetStatus();
  const { sectors } = useGetAllSectors();
  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<ISearchParams>('industry');
  const {
    totalPages,
    totalElements,
    data: industryData,
    isLoading
  } = useFilterIndustrySearch({ ...searchParams, page });
  const handleSearch = async (params: ISearchParams | null) => {
    setSearchParams(params);
    setSearchActive(true);
  };

  const ActionMenu = ({
    industryCode
  }: {
    industryCode: string;
  }): React.ReactElement => {
    return (
      <Link
        href={`/setup/kyc/industry/create?isEditing=true&id=${industryCode}`}
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
          <FilterSection
            sectors={sectors}
            status={status}
            onSearch={handleSearch}
          />
        )}
        <Box
          sx={{
            position: { mobile: 'relative' },
            bottom: '25px',
            width: '100%'
          }}
        >
          {isGlobalLoading || isLoading ? (
            <FormSkeleton noOfLoaders={3} />
          ) : (
            <MuiTableContainer
              columns={COLUMNS}
              data={industryData}
              showHeader={{
                mainTitle: 'Industry',
                secondaryTitle:
                  'See a directory of all industries in this system.',
                hideFilterSection: true
              }}
              ActionMenuProps={ActionMenu}
              totalPages={totalPages}
              setPage={setPage}
              totalElements={totalElements}
              page={page}
            >
              {searchActive ? (
                industryData?.map((dataItem: SearchIndustryResponse) => {
                  return (
                    <StyledTableRow key={dataItem.userId}>
                      <StyledTableCell component="th" scope="row">
                        {dataItem.industryCode}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem.industryName}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem.sectorName}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Status
                          label={
                            Number(dataItem?.industryStatus) === 1
                              ? 'Active'
                              : 'Inactive'
                          }
                          status={
                            Number(dataItem?.industryStatus) === 1
                              ? 'success'
                              : 'warning'
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <ActionMenu industryCode={dataItem.industryCode} />
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
                    {renderEmptyTableBody(industryData)}
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
