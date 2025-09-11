'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { FilterSection } from './FilterSection';
import { COLUMNS } from './COLUMNS';
import { MuiTableContainer, TableSingleAction } from '@/components/Table';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { SetupContainer } from '@/features/Setup/SetupContainer';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { useFilterDocumentSearch } from '@/api/setup/useDocument';
import { ISearchParams } from '@/app/api/search/route';
import { useGetStatus } from '@/api/general/useStatus';
import { FormSkeleton } from '@/components/Loaders';
import { SearchDocumentResponse } from '@/api/ResponseTypes/setup';
import { StyledTableRow, renderEmptyTableBody } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { Status } from '@/components/Labels';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';

const actionButtons: any = [
  <Box ml={{ mobile: 12, desktop: 0 }}>
    <Link href="/setup/kyc/document/create">
      <PrimaryIconButton
        buttonTitle="Add New"
        customStyle={{
          ...submitButton,
          width: { mobile: '119px', desktop: '218px' },
          height: { mobile: '30px', desktop: '40px' },
        }}
      />
    </Link>
  </Box>,
];

export const Document = () => {
  const { isLoading: isGlobalLoading } = useGlobalLoadingState();
  const { status } = useGetStatus();

  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage,
  } = usePersistedSearch<ISearchParams>('document-kyc');
  const {
    totalPages,
    totalElements,
    data: documentData,
    isLoading,
  } = useFilterDocumentSearch({ ...searchParams, page });

  const handleSearch = async (params: ISearchParams | null) => {
    setSearchParams(params);
    setSearchActive(true);
  };

  const ActionMenu = ({ docId }: { docId: string }): React.ReactElement => {
    return (
      <Link href={`/setup/kyc/document/create?isEditing=true&id=${docId}`}>
        <TableSingleAction actionName="Edit" />
      </Link>
    );
  };

  return (
    <>
      <TopActionsArea
        customStyle={{ width: '100%' }}
        actionButtons={actionButtons}
      />{' '}
      <SetupContainer>
        {status !== undefined && (
          <FilterSection status={status} onSearch={handleSearch} />
        )}
        <Box
          sx={{
            position: { mobile: 'relative' },
            bottom: '25px',
            width: '100%',
          }}
        >
          {isGlobalLoading || isLoading ? (
            <FormSkeleton noOfLoaders={3} />
          ) : (
            <MuiTableContainer
              columns={COLUMNS}
              data={documentData}
              showHeader={{
                mainTitle: 'Document',
                secondaryTitle:
                  'See a directory of all documents in this system.',
                hideFilterSection: true,
              }}
              ActionMenuProps={ActionMenu}
              totalPages={totalPages}
              setPage={setPage}
              totalElements={totalElements}
              page={page}
            >
              {searchActive ? (
                documentData?.map((dataItem: SearchDocumentResponse) => {
                  return (
                    <StyledTableRow key={dataItem.userId}>
                      <StyledTableCell component="th" scope="row">
                        {dataItem.docId}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem.docName}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Status
                          label={
                            Number(dataItem?.status) === 1
                              ? 'Active'
                              : 'Inactive'
                          }
                          status={
                            Number(dataItem?.status) === 1
                              ? 'success'
                              : 'warning'
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell>
                        <ActionMenu docId={dataItem.docId} />
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
                    {renderEmptyTableBody(documentData)}
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </MuiTableContainer>
          )}
        </Box>
      </SetupContainer>
    </>
  );
};
