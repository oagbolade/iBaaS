'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { FilterSection } from './FilterSection';
import { COLUMNS } from './COLUMNS';
import { importButton } from '@/features/Setup/Company/Country/styles';
import { MuiTableContainer, TableSingleAction } from '@/components/Table';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { SetupContainer } from '@/features/Setup/SetupContainer';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { ActionButton } from '@/components/Revamp/Buttons';
import { ImportIcon } from '@/assets/svg';
import { useGetStatus } from '@/api/general/useStatus';
import { ISearchParams } from '@/app/api/search/route';
import { useFilterCountrySearch } from '@/api/setup/useCreateCountry';
import { FormSkeleton } from '@/components/Loaders';
import { SearchCountryResponse } from '@/api/ResponseTypes/setup';
import { StyledTableRow, renderEmptyTableBody } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { Status } from '@/components/Labels';
import { CountrySearchParams } from '@/schemas/schema-values/setup';

const actionButtons: any = [
  <Box ml={{ mobile: 12, desktop: 0 }}>
    <Link href="/setup/company/country/create">
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

export const Country = () => {
  const { status } = useGetStatus();
  const [page, setPage] = React.useState(1);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [search, setSearch] = useState<boolean>(false);
  const {
    totalElements,
    totalPages,
    data: countryData,
    isLoading
  } = useFilterCountrySearch({ ...searchParams, page });
  const handleSearch = async (params: any) => {
    setSearchParams(params);
    setSearch(true);
  };

  const ActionMenu = ({
    countryCode
  }: {
    countryCode: string;
  }): React.ReactElement => {
    return (
      <Link
        href={`/setup/company/country/create?isEditing=true&id=${countryCode}`}
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
            width: '100%'
          }}
        >
          {isLoading ? (
            <FormSkeleton noOfLoaders={3} />
          ) : (
            <MuiTableContainer
              columns={COLUMNS}
              data={countryData}
              showHeader={{
                mainTitle: 'Country',
                secondaryTitle:
                  'See a directory of all countries in this system.',
                hideFilterSection: true
              }}
              ActionMenuProps={ActionMenu}
              totalElements={totalElements}
              setPage={setPage}
              page={page}
              totalPages={totalPages}
            >
              {search ? (
                countryData?.map((dataItem: SearchCountryResponse) => {
                  return (
                    <StyledTableRow key={dataItem.userid}>
                      <StyledTableCell component="th" scope="row">
                        {dataItem.countryCode}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem.countryName}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem.currencyName}
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
                        <ActionMenu countryCode={dataItem.countryCode} />
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
                    {renderEmptyTableBody(countryData)}
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
