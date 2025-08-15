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
import { useFilterHolidaySearch } from '@/api/setup/useCreateHoliday';
import { useGetStatus } from '@/api/general/useStatus';
import { ISearchParams } from '@/app/api/search/route';
import { FormSkeleton } from '@/components/Loaders';
import { StyledTableRow, renderEmptyTableBody } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { SearchHolidaysResponse } from '@/api/ResponseTypes/setup';
import { Status } from '@/components/Labels';
import { HolidaySearchParams } from '@/schemas/schema-values/setup';
import { formatDate } from '@/utils/formatDateAndTime';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

const actionButtons: any = [
  <Box ml={{ mobile: 12, desktop: 0 }}>
    <Link href="/setup/company/holidays/create">
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

export const Holidays = () => {
  const { status } = useGetStatus();

  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage,
  } = usePersistedSearch<ISearchParams>('company-holidays');
  
  const {
    totalPages,
    totalElements,
    data: holidayData,
    isLoading,
  } = useFilterHolidaySearch({ ...searchParams, page });
  const handleSearch = async (params: any) => {
    setSearchParams(params);
    setSearchActive(true);
  };
  const ActionMenu = ({
    holidaydays,
  }: {
    holidaydays: string;
  }): React.ReactElement => {
    return (
      <Link
        href={`/setup/company/holidays/create?isEditing=true&id=${holidaydays}`}
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
              data={holidayData}
              showHeader={{
                mainTitle: 'Holidays',
                secondaryTitle:
                  'See a directory of all holidays in this system.',
                hideFilterSection: true,
              }}
              ActionMenuProps={ActionMenu}
              totalPages={totalPages}
              setPage={setPage}
              totalElements={totalElements}
              page={page}
            >
              {searchActive ? (
                holidayData?.map((dataItem: SearchHolidaysResponse) => {
                  return (
                    <StyledTableRow key={dataItem.userid}>
                      <StyledTableCell component="th" scope="row">
                        {dataItem.holidaydays || 'NIL'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem.holidaydesc || 'NIL'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {formatDate(dataItem.holidayends) || 'NIL'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {formatDate(dataItem.holidaydate) || 'NIL'}
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
                        <ActionMenu holidaydays={dataItem?.id} />
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
                    {renderEmptyTableBody(holidayData)}
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
