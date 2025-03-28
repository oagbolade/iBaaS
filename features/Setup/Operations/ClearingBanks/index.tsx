'use client';
import { Box } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import { FilterSection } from './FilterSection';
import { COLUMNS } from './COLUMNS';
import { PrimaryIconButton } from '@/components/Buttons';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { MuiTableContainer } from '@/components/Table';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { TableSingleAction } from '@/components/Revamp/TableV2';
import { useGetStatus } from '@/api/general/useStatus';
import { ISearchParams } from '@/app/api/search/route';
import { useFilterClearingBankSearch } from '@/api/setup/useClearingBank';
import { FormSkeleton } from '@/components/Loaders';
import { SearchClearingBankResponse } from '@/api/ResponseTypes/setup';
import { StyledTableRow, renderEmptyTableBody } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { Status } from '@/components/Labels';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <Link href="/setup/operations/clearing-bank">
      <PrimaryIconButton
        buttonTitle="Add New"
        customStyle={{ ...submitButton }}
      />
    </Link>
  </Box>
];

export const ClearingBanksTable = () => {
  const { status } = useGetStatus();

  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);

  const [search, setSearch] = useState<boolean>(false);
  const {
    totalPages,
    totalElements,
    data: clearingBankData,
    isLoading
  } = useFilterClearingBankSearch({ ...searchParams, page });
  const handleSearch = async (params: any) => {
    setSearchParams(params);
    setSearch(true);
  };
  const ActionMenuComponent = ({
    bankCode
  }: {
    bankCode: string;
  }): React.ReactElement => {
    return (
      <Link
        href={`/setup/operations/clearing-bank?isEditing=true&id=${bankCode}`}
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
            data={clearingBankData}
            showHeader={{
              hideFilterSection: true,
              mainTitle: 'Clearing Banks',
              secondaryTitle:
                'See a directory of all Clearing Banks in this system.'
            }}
            ActionMenuProps={ActionMenuComponent}
            totalPages={totalPages}
            setPage={setPage}
            totalElements={totalElements}
            page={page}
          >
            {search ? (
              clearingBankData?.map((dataItem: SearchClearingBankResponse) => {
                return (
                  <StyledTableRow key={dataItem.userId}>
                    <StyledTableCell component="th" scope="row">
                      {dataItem.clearingID}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.commBankName}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.commBankshortname}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.chequeinClear}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.nostro}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.unclearedgl}
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
                      <ActionMenuComponent bankCode={dataItem.bankCode} />
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
                  {renderEmptyTableBody(clearingBankData)}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </MuiTableContainer>
        )}
      </Box>
    </Box>
  );
};
