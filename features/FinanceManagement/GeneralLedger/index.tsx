'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import moment from 'moment';
import { FilterSection } from './FilterSection';
import { AdminContainer } from '@/features/Administrator/AdminContainer';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  MuiTableContainer,
  renderEmptyTableBody,
  StyledTableRow
} from '@/components/Table/Table';
import { TableSingleAction } from '@/components/Table';
import { StyledTableCell } from '@/components/Table/style';
import { TableHeader } from '@/constants/COLUMN_LEDGER';

import { useGetBranches } from '@/api/general/useBranches';
import { ISearchParams } from '@/app/api/search/route';
import { useFilterGeneralLedgerSearch } from '@/api/finance/useFinanceAccount';
import { FormSkeleton } from '@/components/Loaders';

const actionButtons: any = [
  <Box ml={{ mobile: 12, desktop: 0 }}>
    <Link href="/finance/general-ledger/create">
      <PrimaryIconButton
        buttonTitle="Create General Ledger"
        customStyle={{
          ...submitButton,
          width: { mobile: '125px', desktop: '236px' },
          height: '40px'
        }}
      />
    </Link>
  </Box>
];

export const GeneralLedger = () => {
  const [search, setSearch] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);

  const [page, setPage] = React.useState(1);
  const { branches } = useGetBranches();

  const ActionMenuProps = ({
    glNumber
  }: {
    glNumber: string;
  }): React.ReactElement => {
    return (
      <Link
        href={`/finance/general-ledger/create?isEditing=true&glNumber=${glNumber}`}
      >
        {' '}
        <TableSingleAction actionName="Edit" />
      </Link>
    );
  };
  const handleSearch = async (params: ISearchParams | null) => {
    setSearch(true);
    setSearchParams(params);
  };

  const {
    totalPages,
    totalElements,
    data: generalLedgerData,
    isLoading: isGeneralLedgerLoading
  } = useFilterGeneralLedgerSearch({
    ...searchParams,
    page
  });

  return (
    <>
      <Box sx={{ width: '100%', padding: '0 13px' }}>
        <TopActionsArea
          customStyle={{ width: '100%' }}
          actionButtons={actionButtons}
        />
      </Box>
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
          {isGeneralLedgerLoading ? (
            <FormSkeleton noOfLoaders={3} />
          ) : (
            <div style={{ marginTop: '24px' }}>
              <MuiTableContainer
                columns={TableHeader}
                data={generalLedgerData}
                tableConfig={{
                  hasActions: true
                }}
                totalPages={totalPages}
                totalElements={totalElements}
                setPage={setPage}
                page={page}
                showHeader={{
                  mainTitle: 'General Ledger',
                  secondaryTitle:
                    'See a directory of all general ledgers on this system.',
                  hideFilterSection: true
                }}
              >
                {search ? (
                  generalLedgerData?.map((dataItem: any) => {
                    return (
                      <StyledTableRow key={dataItem.userid}>
                        <StyledTableCell component="th" scope="row">
                          {dataItem.glnumber}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {dataItem.acctName}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {dataItem.dateOpened
                            ? moment(dataItem.dateOpened).format(
                                'MMMM Do YYYY, h:mm:ss a'
                              )
                            : 'N/A'}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {dataItem.bkbalance}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          <ActionMenuProps glNumber={dataItem.glnumber} />
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })
                ) : (
                  <StyledTableRow>
                    <StyledTableCell
                      colSpan={TableHeader.length + 1}
                      component="th"
                      scope="row"
                    >
                      {renderEmptyTableBody(generalLedgerData)}
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </MuiTableContainer>
            </div>
          )}
        </Box>
        <Box />
      </AdminContainer>
    </>
  );
};
