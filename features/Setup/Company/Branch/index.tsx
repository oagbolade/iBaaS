'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import DOMPurify from 'dompurify';
import { FilterSection } from './FilterSection';
import { COLUMNS } from './COLUMNS';
import { MuiTableContainer, TableSingleAction } from '@/components/Table';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { SetupContainer } from '@/features/Setup/SetupContainer';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { useGetStatus } from '@/api/general/useStatus';
import { useFilterBranchSearch } from '@/api/setup/useSetUpBranches';
import { SearchBranchResponse } from '@/api/ResponseTypes/setup';
import { ISearchParams } from '@/app/api/search/route';
import { FormSkeleton } from '@/components/Loaders';
import { StyledTableRow, renderEmptyTableBody } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { Status } from '@/components/Labels';
import { BranchSearchParams } from '@/schemas/schema-values/setup';

const actionButtons: any = [
  <Box ml={{ mobile: 12, desktop: 0 }}>
    <Link href="/setup/company/branch/create">
      <PrimaryIconButton
        buttonTitle="Add New Branch"
        customStyle={{
          ...submitButton,
          width: { mobile: '119px', desktop: '218px' },
          height: { mobile: '30px', desktop: '40px' }
        }}
      />
    </Link>
  </Box>
];

export const Branch = () => {
  const [page, setPage] = React.useState(1);
  const { status } = useGetStatus();

  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);

  const [search, setSearch] = useState<boolean>(false);
  const {
    totalPages,
    totalElements,
    data: branchData,
    isLoading
  } = useFilterBranchSearch({ ...searchParams, page });
  const handleSearch = async (params: any) => {
    setSearchParams(params);
    setSearch(true);
  };
  const ActionMenu = ({
    branchCode
  }: {
    branchCode: string;
  }): React.ReactElement => {
    return (
      <Link
        href={`/setup/company/branch/create?isEditing=true&id=${DOMPurify.sanitize(branchCode)}`}
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
              data={branchData}
              showHeader={{
                mainTitle: 'Manage Branch',
                secondaryTitle:
                  'See a directory of all branches in this system.',
                hideFilterSection: true
              }}
              ActionMenuProps={ActionMenu}
              totalPages={totalPages}
              setPage={setPage}
              totalElements={totalElements}
              page={page}
            >
              {search ? (
                branchData?.map((dataItem: SearchBranchResponse) => {
                  return (
                    <StyledTableRow key={dataItem.userId}>
                      <StyledTableCell component="th" scope="row">
                        {dataItem.branchCode}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem.branchName}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Status
                          label={
                            Number(dataItem.status) === 1
                              ? 'Active'
                              : 'Inactive'
                          }
                          status={
                            Number(dataItem.status) === 1
                              ? 'success'
                              : 'warning'
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <ActionMenu branchCode={dataItem.branchCode} />
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
                    {renderEmptyTableBody(branchData)}
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
