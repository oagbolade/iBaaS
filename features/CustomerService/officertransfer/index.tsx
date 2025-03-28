'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { COLUMNS } from './COLUMNS';
import { FilterSection } from './FilterSection';
import { PrimaryIconButton } from '@/components/Buttons';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { MuiTableContainer, TableSingleAction } from '@/components/Table';
import { StyledTableRow, renderEmptyTableBody } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { ISearchParams } from '@/app/api/search/route';
import { useFilterAccountOfficerSearch } from '@/api/admin/useAccountOfficer';
import { useGetBranches } from '@/api/general/useBranches';
import { FormSkeleton } from '@/components/Loaders';
import { SearchAccountOfficersResponse } from '@/api/ResponseTypes/admin';

export interface IOptions {
  buttonTitle: string;
  link?: string;
  onClick?: () => void;
}

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <Link href="/customer-service/officer-transfer/transfer-officer">
      <PrimaryIconButton
        buttonTitle="Transfer Officer"
        customStyle={{ ...submitButton }}
      />
    </Link>{' '}
  </Box>
];

const ActionMenuProps = ({ officercode }: { officercode: string }) => {
  return (
    <Link
      href={`/customer-service/officer-transfer/transfer-officer/?transferFromId=${officercode}`}
    >
      <TableSingleAction actionName="Transfer Officer" />
    </Link>
  );
};

export const OfficeTransferTable = () => {
  const [search, setSearch] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const { branches } = useGetBranches();
  const [page, setPage] = React.useState(1);

  const {
    totalPages,
    totalElements,
    data: accountOfficerData,
    isLoading: areAccountOfficersDataLoading
  } = useFilterAccountOfficerSearch({
    ...searchParams,
    page
  });

  const handleSearch = (params: ISearchParams | null) => {
    setSearchParams(params);
    setSearch(true);
  };

  return (
    <Box mt={6}>
      <TopActionsArea actionButtons={actionButtons} />
      <Box sx={{ padding: '25px' }}>
        {branches && (
          <FilterSection branches={branches} onSearch={handleSearch} />
        )}
      </Box>
      <Box sx={{ padding: '25px', width: '100%' }}>
        {areAccountOfficersDataLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <MuiTableContainer
            columns={COLUMNS}
            tableConfig={{
              hasActions: true
            }}
            showHeader={{
              hideFilterSection: true,
              mainTitle: 'Officer’s Overview',
              secondaryTitle: 'See a directory of all Officers on this system.'
            }}
            data={accountOfficerData}
            setPage={setPage}
            page={page}
            totalPages={totalPages}
            totalElements={totalElements}
          >
            {search ? (
              accountOfficerData?.map(
                (dataItem: SearchAccountOfficersResponse) => {
                  return (
                    <StyledTableRow key={dataItem.officercode}>
                      <StyledTableCell align="right">
                        {dataItem.officerName || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {dataItem.officercode}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        N/A
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {dataItem.branchcode}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem.dept || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        Authoriser
                      </StyledTableCell>
                      <StyledTableCell align="right">Role</StyledTableCell>
                      <StyledTableCell align="right">
                        <ActionMenuProps
                          officercode={dataItem.officercode || 'N/A'}
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
                  {renderEmptyTableBody(accountOfficerData)}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </MuiTableContainer>
        )}
      </Box>
    </Box>
  );
};
