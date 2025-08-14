'use client';
import React from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import moment from 'moment';
import { FilterSection } from './FilterSection';
import { COLUMNS } from './COLUMNS';
import { TableActionMenu } from './TableActionMenu';
import { PrimaryIconButton } from '@/components/Buttons';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { MuiTableContainer } from '@/components/Table';
import { StyledTableCell } from '@/components/Table/style';
import { StyledTableRow, renderEmptyTableBody } from '@/components/Table/Table';
import { ISearchParams } from '@/app/api/search/route';
import { useFilterDirectorsSearch } from '@/api/customer-service/useDirectors';
import { FormSkeleton } from '@/components/Loaders';
import { SearchDirectorResponse } from '@/api/ResponseTypes/customer-service';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

export interface IOptions {
  buttonTitle: string;
  link?: string;
  onClick?: () => void;
}

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <Link href="/customer-service/director/create-director">
      <PrimaryIconButton
        buttonTitle="Create Director"
        customStyle={{ ...submitButton }}
      />
    </Link>{' '}
  </Box>,
];

export const DirectorTable = () => {
  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage,
  } = usePersistedSearch<ISearchParams>('directors');

  const {
    totalPages,
    totalElements,
    data: directorData,
    isLoading: areDirectorsDataLoading,
  } = useFilterDirectorsSearch({
    ...searchParams,
    page,
  });

  const handleSearch = async (params: ISearchParams | null) => {
    setSearchParams(params);
    setSearchActive(true);
  };

  const ActionMenuProps = ({
    directorId,
    customerId,
    directorName,
  }: {
    directorId: string;
    customerId: string;
    directorName: string;
  }): React.ReactElement => {
    return (
      <TableActionMenu
        directorName={directorName}
        directorId={directorId}
        customerId={customerId}
      />
    );
  };

  return (
    <Box>
      <TopActionsArea actionButtons={actionButtons} />
      <Box sx={{ padding: '25px' }}>
        <FilterSection onSearch={handleSearch} />
      </Box>
      <Box sx={{ padding: '25px', width: '100%' }}>
        {areDirectorsDataLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <MuiTableContainer
            showHeader={{
              hideFilterSection: true,
              mainTitle: 'Director’s Overview',
              secondaryTitle:
                'See a directory of all Directors on this system.',
            }}
            columns={COLUMNS}
            tableConfig={{
              hasActions: true,
            }}
            data={directorData}
            setPage={setPage}
            page={page}
            totalPages={totalPages}
            totalElements={totalElements}
          >
            {searchActive ? (
              directorData?.map((dataItem: SearchDirectorResponse) => {
                return (
                  <StyledTableRow key={dataItem?.id}>
                    <StyledTableCell component="th" scope="row">
                      {dataItem.customerId}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {dataItem.fullName}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {dataItem.isCeo && 'CEO'}
                      {dataItem.isChairman && 'Chairman'}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {dataItem.countryName}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {moment(dataItem.dob).format('MMMM Do YYYY') || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {dataItem.gender ? 'Male' : 'Female'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <ActionMenuProps
                        directorName={dataItem.fullName || 'N/A'}
                        directorId={dataItem.id || 'N/A'}
                        customerId={dataItem.customerId || 'N/A'}
                      />
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
                  {renderEmptyTableBody(directorData)}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </MuiTableContainer>
        )}
      </Box>
    </Box>
  );
};
