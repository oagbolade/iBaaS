'use client';
import { Box } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import { FilterSection } from './FilterSection';
import { COLUMNS } from './COLUMNS';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  submitButton,
  cancelButton,
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { MuiTableContainer } from '@/components/Table';

import { TopActionsArea } from '@/components/Revamp/Shared';
import { TableSingleAction } from '@/components/Revamp/TableV2';
import { useGetStatus } from '@/api/general/useStatus';
import { ISearchParams } from '@/app/api/search/route';
import { useFilterDepartmentSearch } from '@/api/setup/useDepartment';
import { FormSkeleton } from '@/components/Loaders';
import { StyledTableRow, renderEmptyTableBody } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { SearchDepartmentResponse } from '@/api/ResponseTypes/setup';
import { Status } from '@/components/Labels';
import { DepartmentSearchParams } from '@/schemas/schema-values/setup';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <Link href="/setup/company/add-department">
      <PrimaryIconButton
        type="submit"
        buttonTitle="Add Department"
        customStyle={{ ...submitButton }}
      />
    </Link>
  </Box>,
];

export const DepartmentTable = () => {
  const { isLoading: isGlobalLoading } = useGlobalLoadingState();
  const { status } = useGetStatus();
  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage,
  } = usePersistedSearch<ISearchParams>('company-departments');
  const {
    totalPages,
    totalElements,
    data: departmentData,
    isLoading,
  } = useFilterDepartmentSearch({ ...searchParams, page });
  const handleSearch = async (params: any) => {
    setSearchParams(params);
    setSearchActive(true);
  };
  const ActionMenu = ({ deptid }: { deptid: string }): React.ReactElement => {
    return (
      <Link href={`/setup/company/add-department?isEditing=true&id=${deptid}`}>
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
        )}{' '}
      </Box>
      <Box sx={{ padding: '25px', width: '100%' }}>
        {isGlobalLoading || isLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <MuiTableContainer
            columns={COLUMNS}
            data={departmentData}
            showHeader={{
              hideFilterSection: true,
              mainTitle: 'Department',
              secondaryTitle:
                'See a directory of all departments setup in this system.',
            }}
            ActionMenuProps={ActionMenu}
            totalPages={totalPages}
            setPage={setPage}
            totalElements={totalElements}
            page={page}
          >
            {searchActive ? (
              departmentData?.map((dataItem: SearchDepartmentResponse) => {
                return (
                  <StyledTableRow key={dataItem.userId}>
                    <StyledTableCell component="th" scope="row">
                      {dataItem.deptid}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.deptName}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.deptShortname}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Status
                        label={
                          Number(dataItem?.status) === 1 ? 'Active' : 'Closed'
                        }
                        status={
                          Number(dataItem?.status) === 1 ? 'success' : 'danger'
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <ActionMenu deptid={dataItem.deptid} />
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
                  {renderEmptyTableBody(departmentData)}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </MuiTableContainer>
        )}
      </Box>
    </Box>
  );
};
