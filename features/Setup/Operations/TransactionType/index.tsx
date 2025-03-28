'use client';
import { PrimaryIconButton } from '@/components/Buttons';
import { Box } from '@mui/material';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { FilterSection } from './FilterSection';
import { MuiTableContainer } from '@/components/Table';
import Link from 'next/link';
import React, { useState } from 'react';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { TableSingleAction } from '@/components/Revamp/TableV2';
import { ISearchParams } from '@/app/api/search/route';
import { useGetStatus } from '@/api/general/useStatus';
import { COLUMNS } from './COLUMNS';
import { useFilterTransactionSearch } from '@/api/setup/useTransactionType';
import { FormSkeleton } from '@/components/Loaders';
import { StyledTableRow, renderEmptyTableBody } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { SearchTransactionResponse } from '@/api/ResponseTypes/setup';
import { Status } from '@/components/Labels';
import { TransactionTypeSearchParams } from '@/schemas/schema-values/setup';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <Link href="/setup/operations/add-transaction">
      <PrimaryIconButton
        buttonTitle="Add New"
        customStyle={{ ...submitButton }}
      />
    </Link>
  </Box>
];

export const TransactionTypeTable = () => {
  const { status } = useGetStatus();

  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);

  const [search, setSearch] = useState<boolean>(false);
  const {
    totalPages,
    totalElements,
    data: transactionData,
    isLoading
  } = useFilterTransactionSearch({ ...searchParams, page });
  const handleSearch = async (params: any) => {
    setSearchParams(params);
    setSearch(true);
  };

  const ActionMenu = ({
    tranCode
  }: {
    tranCode: string;
  }): React.ReactElement => {
    return (
      <Link
        href={`/setup/operations/add-transaction?isEditing=true&id=${tranCode}`}
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
            data={transactionData}
            showHeader={{
              hideFilterSection: true,
              mainTitle: 'Transaction Type',
              secondaryTitle:
                'See a directory of all Transaction Type in this system.'
            }}
            ActionMenuProps={ActionMenu}
            totalPages={totalPages}
            setPage={setPage}
            totalElements={totalElements}
            page={page}
          >
            {search ? (
              transactionData?.map((dataItem: SearchTransactionResponse) => {
                return (
                  <StyledTableRow key={dataItem.userId}>
                    <StyledTableCell component="th" scope="row">
                      {dataItem.tranCode}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.tranName}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Status
                        label={dataItem?.status ? 'Active' : 'Inactive'}
                        status={dataItem?.status ? 'success' : 'warning'}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <ActionMenu tranCode={dataItem.tranCode} />
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
                  {renderEmptyTableBody(transactionData)}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </MuiTableContainer>
        )}
      </Box>
    </Box>
  );
};
