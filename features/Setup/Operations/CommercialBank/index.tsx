'use client';
import { Box } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import { FilterSection } from './FilterSection';
import { COLUMNS } from './COLUMNS';
import { PrimaryIconButton } from '@/components/Buttons';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { MuiTableContainer } from '@/components/Table';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { TableSingleAction } from '@/components/Revamp/TableV2';
import { ISearchParams } from '@/app/api/search/route';
import { useFilterCommercialBankSearch } from '@/api/setup/useCommercialBank';
import { useGetStatus } from '@/api/general/useStatus';
import { FormSkeleton } from '@/components/Loaders';
import { StyledTableRow, renderEmptyTableBody } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { SearchCommercialBankResponse } from '@/api/ResponseTypes/setup';
import { Status } from '@/components/Labels';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <Link href="/setup/operations/add-bank">
      <PrimaryIconButton
        buttonTitle="Add Bank"
        customStyle={{ ...submitButton }}
      />
    </Link>
  </Box>
];

export const CommercialBankTable = () => {
  const { status } = useGetStatus();

  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);

  const [search, setSearch] = useState<boolean>(false);
  const {
    totalPages,
    totalElements,
    data: commercialData,
    isLoading
  } = useFilterCommercialBankSearch({ ...searchParams, page });
  const handleSearch = async (params: any) => {
    setSearchParams(params);
    setSearch(true);
  };

  const ActionMenu = ({
    bankCode
  }: {
    bankCode: string;
  }): React.ReactElement => {
    return (
      <Link href={`/setup/operations/add-bank?isEditing=true&id=${bankCode}`}>
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
            data={commercialData}
            showHeader={{
              hideFilterSection: true,
              mainTitle: 'Commercial Bank',
              secondaryTitle:
                'See a directory of all commercial banks setup in this system.'
            }}
            ActionMenuProps={ActionMenu}
            totalPages={totalPages}
            setPage={setPage}
            totalElements={totalElements}
            page={page}
          >
            {search ? (
              commercialData?.map((dataItem: SearchCommercialBankResponse) => {
                return (
                  <StyledTableRow key={dataItem.userId}>
                    <StyledTableCell component="th" scope="row">
                      {dataItem.bankcode}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.bankName}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.bankshortname}
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
                      <ActionMenu bankCode={dataItem.bankcode} />
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
                  {renderEmptyTableBody(commercialData)}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </MuiTableContainer>
        )}
      </Box>
    </Box>
  );
};
