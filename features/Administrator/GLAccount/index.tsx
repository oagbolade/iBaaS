'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { FilterSection } from './FilterSection';
import { COLUMNS } from './COLUMNS';
import { TableActionMenu } from './TableActionMenu';
import { AdminContainer } from '@/features/Administrator/AdminContainer';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { MuiTableContainer } from '@/components/Table';
import { useFilterGLAccountSearch } from '@/api/admin/useCreateGLAccount';
import { StyledTableRow, renderEmptyTableBody } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { ISearchParams } from '@/app/api/search/route';
import { SearchGLAccountResponse } from '@/api/ResponseTypes/admin';
import { FormSkeleton } from '@/components/Loaders';
import { useGetBranches } from '@/api/general/useBranches';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';
import { formatDateAndTime } from '@/utils/hooks/useDateFormat';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

const actionButtons: any = [
  <Link href="/admin/gl-account/create">
    <PrimaryIconButton
      buttonTitle="Create General Ledger"
      customStyle={{ ...submitButton, width: '236px', height: '40px' }}
    />
  </Link>
];

export const GLAccount = () => {
  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<ISearchParams>('gl-account');

  const {
    totalPages,
    totalElements,
    data: glData,
    isLoading: isGLDataLoading
  } = useFilterGLAccountSearch({
    ...searchParams,
    page
  });

  const handleSearch = async (params: ISearchParams | null) => {
    setSearchParams(params);
    setSearchActive(true);
  };

  const { branches } = useGetBranches();

  const ActionMenuProps = ({
    glNumber,
    pointing,
    post,
    populate,
    swing,
    typeP
  }: {
    glNumber: string;
    pointing?: number;
    post?: number;
    populate?: number;
    swing?: number;
    typeP?: string;
  }): React.ReactElement => {
    return (
      <TableActionMenu
        glNumber={glNumber}
        pointing={pointing}
        post={post}
        populate={populate}
        swing={swing}
        typeP={typeP}
      />
    );
  };

  return (
    <>
      <TopActionsArea
        showBackButon={false}
        customStyle={{ width: '100%' }}
        actionButtons={actionButtons}
      />
      <AdminContainer>
        {branches && (
          <FilterSection branches={branches} onSearch={handleSearch} />
        )}
        <Box
          sx={{
            position: { mobile: 'relative' },
            bottom: '25px',
            width: '100%'
          }}
        >
          {isGLDataLoading ? (
            <FormSkeleton noOfLoaders={3} />
          ) : (
            <MuiTableContainer
              columns={COLUMNS}
              tableConfig={{
                hasActions: true
              }}
              data={glData}
              setPage={setPage}
              page={page}
              totalPages={totalPages}
              totalElements={totalElements}
            >
              {searchActive ? (
                glData?.map(
                  (dataItem: SearchGLAccountResponse, index: number) => {
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="row">
                          {dataItem.glnumber}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {dataItem.acctName}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {formatDateAndTime(dataItem.dateOpened)}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {formatCurrency(dataItem.bkbalance)}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <ActionMenuProps
                            glNumber={dataItem.glnumber}
                            pointing={dataItem.pointing}
                            typeP={dataItem.typeP}
                            post={dataItem.post}
                            populate={dataItem.populate}
                            swing={dataItem.swing}
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  }
                )
              ) : (
                <StyledTableRow>
                  <StyledTableCell
                    colSpan={COLUMNS.length + 1}
                    component="th"
                    scope="row"
                  >
                    {renderEmptyTableBody()}
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </MuiTableContainer>
          )}
        </Box>
        <Box />
      </AdminContainer>
    </>
  );
};
