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
import { useGetAllChequeBooks } from '@/api/customer-service/useCheque';
import { ISearchParams } from '@/app/api/search/route';
import { useFilterChequeSearch } from '@/api/setup/useCheque';
import { FormSkeleton } from '@/components/Loaders';
import { SearchChequeBookResponse } from '@/api/ResponseTypes/setup';
import { StyledTableRow, renderEmptyTableBody } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <Link href="/setup/operations/add-cheque">
      <PrimaryIconButton
        buttonTitle="Add Chequebook"
        customStyle={{ ...submitButton }}
      />
    </Link>
  </Box>
];

export const ChequebookTable = () => {
  const { checkbooks } = useGetAllChequeBooks();
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);

  const [search, setSearch] = useState<boolean>(false);
  const {
    totalPages,
    totalElements,
    data: chequeData,
    isLoading
  } = useFilterChequeSearch({ ...searchParams, page });
  const handleSearch = async (params: any) => {
    setSearchParams(params);
    setSearch(true);
  };

  const ActionMenu = ({ typeId }: { typeId: string }): React.ReactElement => {
    return (
      <Link href={`/setup/operations/add-cheque?isEditing=true&id=${typeId}`}>
        <TableSingleAction actionName="Edit" />
      </Link>
    );
  };

  return (
    <Box>
      <TopActionsArea actionButtons={actionButtons} />
      <Box sx={{ padding: '25px', marginTop: '10px' }}>
        {checkbooks !== undefined && (
          <FilterSection checkbooks={checkbooks} onSearch={handleSearch} />
        )}
      </Box>
      <Box sx={{ padding: '25px', width: '100%' }}>
        {isLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <MuiTableContainer
            columns={COLUMNS}
            data={chequeData}
            showHeader={{
              hideFilterSection: true,
              mainTitle: 'Chequebook',
              secondaryTitle:
                'See a directory of all chequebooks setup in this system.'
            }}
            ActionMenuProps={ActionMenu}
            totalPages={totalPages}
            setPage={setPage}
            totalElements={totalElements}
            page={page}
          >
            {search ? (
              chequeData?.map((dataItem: SearchChequeBookResponse) => {
                return (
                  <StyledTableRow key={dataItem.userId}>
                    <StyledTableCell component="th" scope="row">
                      {dataItem.typeId}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.typeDesc}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.numberOfleaves}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.currentCost}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <ActionMenu typeId={dataItem.typeId} />
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
                  {renderEmptyTableBody(chequeData)}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </MuiTableContainer>
        )}
      </Box>
    </Box>
  );
};
