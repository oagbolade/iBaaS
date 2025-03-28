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
import { StyledTableCell } from '@/components/Table/style';
import { StyledTableRow, renderEmptyTableBody } from '@/components/Table/Table';
import { SearchPostingLimitResponse } from '@/api/ResponseTypes/admin';
import { ISearchParams } from '@/app/api/search/route';
import { FormSkeleton } from '@/components/Loaders';
import { useGetBranches } from '@/api/general/useBranches';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';
import { useFilterPostingLimitSearch } from '@/api/admin/usePostingLimit';

const actionButtons: any = [
  <Link href="/admin/posting-limit/create">
    <PrimaryIconButton
      buttonTitle="Create New Limit"
      customStyle={{ ...submitButton }}
    />
  </Link>
];

export const PostingLimit = () => {
  const [search, setSearch] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [page, setPage] = React.useState(1);
  const {
    totalPages,
    totalElements,
    data: postingData,
    isLoading: isPostingDataLoading
  } = useFilterPostingLimitSearch({
    ...searchParams,
    page
  });

  const handleSearch = async (params: ISearchParams | null) => {
    setSearchParams(params);
    setSearch(true);
  };

  const ActionMenuProps = ({
    roleId,
    branchId
  }: {
    roleId: string;
    branchId: string;
  }): React.ReactElement => {
    return <TableActionMenu roleId={roleId} branchId={branchId} />;
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
          {isPostingDataLoading ? (
            <FormSkeleton noOfLoaders={3} />
          ) : (
            <MuiTableContainer
              columns={COLUMNS}
              tableConfig={{
                hasActions: true
              }}
              setPage={setPage}
              page={page}
              data={postingData}
              totalPages={totalPages}
              totalElements={totalElements}
            >
              {search ? (
                postingData?.map(
                  (dataItem: SearchPostingLimitResponse, index: number) => {
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="row">
                          {dataItem.role_name || 'N/A'}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {`NGN ${formatCurrency(dataItem.branchCredit || 0) || 'N/A'}`}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {`NGN ${formatCurrency(dataItem.branchDebit || 0) || 'N/A'}`}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <ActionMenuProps
                            roleId={dataItem.roleid}
                            branchId={dataItem.branchcode}
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
