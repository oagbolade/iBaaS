'use client';
import { Box } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import { FilterSection } from './FilterSection';
import { COLUMNS } from './COLUMNS';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  submitButton,
  cancelButton
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { MuiTableContainer } from '@/components/Table';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { TableSingleAction } from '@/components/Revamp/TableV2';
import { useFilterInterestSearch } from '@/api/setup/useInterest';
import { useGetStatus } from '@/api/general/useStatus';
import { ISearchParams } from '@/app/api/search/route';
import { FormSkeleton } from '@/components/Loaders';
import { StyledTableRow, renderEmptyTableBody } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { SearchInterestResponse } from '@/api/ResponseTypes/setup';
import { Status } from '@/components/Labels';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <Link href="/setup/product-gl/add-interest">
      <PrimaryIconButton
        buttonTitle="Add New "
        customStyle={{ ...submitButton }}
      />
    </Link>
  </Box>
];

export const InterestTable = () => {
  const [page, setPage] = useState(1);
  const { status } = useGetStatus();
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);

  const [search, setSearch] = useState<boolean>(false);
  const {
    totalPages,
    totalElements,
    data: interestData,
    isLoading
  } = useFilterInterestSearch({ ...searchParams, page });
  const handleSearch = async (params: any) => {
    setSearchParams(params);
    setSearch(true);
  };
  const ActionMenu = ({
    interestCode
  }: {
    interestCode: string;
  }): React.ReactElement => {
    return (
      <Link
        href={`/setup/product-gl/add-interest?isEditing=true&id=${interestCode}`}
      >
        <TableSingleAction actionName="Edit" />
      </Link>
    );
  };
  return (
    <Box>
      <TopActionsArea actionButtons={actionButtons} />
      <Box sx={{ padding: '25px', marginTop: '10px' }}>
        {status !== undefined && (
          <FilterSection status={status} onSearch={handleSearch} />
        )}
      </Box>
      <Box sx={{ padding: '25px', width: '100%' }}>
        {isLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <MuiTableContainer
            columns={COLUMNS}
            data={interestData}
            showHeader={{
              hideFilterSection: true,
              mainTitle: 'Interest',
              secondaryTitle: 'See a directory of all Interest in this system.'
            }}
            ActionMenuProps={ActionMenu}
            totalPages={totalPages}
            setPage={setPage}
            totalElements={totalElements}
            page={page}
          >
            {search ? (
              interestData?.map((dataItem: SearchInterestResponse) => {
                return (
                  <StyledTableRow key={dataItem.userId}>
                    <StyledTableCell component="th" scope="row">
                      {dataItem.intcode}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.intName}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.maxRate}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.targetBase}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Status
                        label={
                          Number(dataItem.status) === 1 ? 'Active' : 'Inactive'
                        }
                        status={
                          Number(dataItem.status) === 1 ? 'success' : 'warning'
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <ActionMenu interestCode={dataItem.intcode} />
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
                  {renderEmptyTableBody(interestData)}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </MuiTableContainer>
        )}
      </Box>
    </Box>
  );
};
