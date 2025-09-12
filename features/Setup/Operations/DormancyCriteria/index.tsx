'use client';
import { Box } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import { sanitize } from 'dompurify';
import { FilterSection } from './FilterSection';
import { COLUMNS } from './COLUMNS';
import { PrimaryIconButton } from '@/components/Buttons';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { MuiTableContainer } from '@/components/Table';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { TableSingleAction } from '@/components/Revamp/TableV2';
import { useGetStatus } from '@/api/general/useStatus';
import { ISearchParams } from '@/app/api/search/route';
import { useFilterDormancySearch } from '@/api/setup/useDormancy';
import { FormSkeleton } from '@/components/Loaders';
import { SearchDormancyResponse } from '@/api/ResponseTypes/setup';
import { StyledTableRow, renderEmptyTableBody } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { Status } from '@/components/Labels';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <Link href="/setup/operations/add-dormancy">
      <PrimaryIconButton
        buttonTitle="Add New"
        customStyle={{ ...submitButton }}
      />
    </Link>
  </Box>
];

export const DormancyCriteriaTable = () => {
  const { isLoading: isGlobalLoading } = useGlobalLoadingState();
  const { status } = useGetStatus();
    const {
      searchParams,
      setSearchParams,
      searchActive,
      setSearchActive,
      page,
      setPage
    } = usePersistedSearch<ISearchParams>('dormancy-criteria');
  const {
    totalPages,
    totalElements,
    data: dormancyData,
    isLoading
  } = useFilterDormancySearch({ ...searchParams, page });

  const handleSearch = async (params: any) => {
    setSearchParams(params);
    setSearchActive(true);
  };

  const ActionMenu = ({
    productCode
  }: {
    productCode: string;
  }): React.ReactElement => {
    return (
      <Link
        href={`/setup/operations/add-dormancy?isEditing=true&id=${sanitize(productCode)}`}
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
        { isGlobalLoading || isLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <MuiTableContainer
            columns={COLUMNS}
            data={dormancyData}
            showHeader={{
              hideFilterSection: true,
              mainTitle: 'Dormancy Criteria',
              secondaryTitle:
                'See a directory of all Dormancy Criteria in this system.'
            }}
            ActionMenuProps={ActionMenu}
            totalPages={totalPages}
            setPage={setPage}
            totalElements={totalElements}
            page={page}
          >
            {searchActive ? (
              dormancyData?.map((dataItem: SearchDormancyResponse) => {
                return (
                  <StyledTableRow key={dataItem.userId}>
                    <StyledTableCell component="th" scope="row">
                      {dataItem.productCode}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.penalty}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.productName || 'NIL'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.duration}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.narration}
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
                      <ActionMenu productCode={dataItem.productCode} />
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
                  {renderEmptyTableBody(dormancyData)}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </MuiTableContainer>
        )}
      </Box>
    </Box>
  );
};
