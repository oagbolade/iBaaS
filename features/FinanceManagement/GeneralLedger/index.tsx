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
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';

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
  const { isLoading } = useGlobalLoadingState();
  const { branches } = useGetBranches();

  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<ISearchParams>('general-ledger');
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
      <Link
        href={`/finance/general-ledger/create?isEditing=true&glNumber=${glNumber}&pointing=${pointing}&post=${post}&populate=${populate}&swing=${swing}&typeP=${typeP}&post=${post}`}
      >
        {' '}
        <TableSingleAction actionName="Edit" />
      </Link>
    );
  };
  const handleSearch = async (params: ISearchParams | null) => {
    setSearchActive(true);
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
      <TopActionsArea
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
          {isLoading || isGeneralLedgerLoading ? (
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
                {searchActive ? (
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
