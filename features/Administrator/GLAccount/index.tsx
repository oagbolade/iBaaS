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

const actionButtons: any = [
  <Link href="/admin/gl-account/create">
    <PrimaryIconButton
      buttonTitle="Create General Ledger"
      customStyle={{ ...submitButton, width: '236px', height: '40px' }}
    />
  </Link>
];

export const GLAccount = () => {
  const [search, setSearch] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [page, setPage] = React.useState(1);

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
    setSearch(true);
  };

  const ActionMenuProps = ({
    glNumber
  }: {
    glNumber: string;
  }): React.ReactElement => {
    return <TableActionMenu glNumber={glNumber} />;
  };
  const { branches } = useGetBranches();

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
              {search ? (
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
                          <ActionMenuProps glNumber={dataItem.glnumber} />
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
