'use client';
import React from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { FilterSection } from './FilterSection';
import { TableActionMenu } from './TableActionMenu';
import { COLUMNS } from './COLUMNS';
import { PrimaryIconButton } from '@/components/Buttons';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { useFilterGroupSearch } from '@/api/general/useGroup';
import { ISearchParams } from '@/app/api/search/route';
import { useGetBranches } from '@/api/general/useBranches';
import {
  MuiTableContainer,
  StyledTableRow,
  renderEmptyTableBody
} from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { SearchGroupResponse } from '@/api/ResponseTypes/customer-service';
import { FormSkeleton } from '@/components/Loaders';
import { checkMultipleUserRoleAccess } from '@/utils/checkUserRoleAccess';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

export interface IOptions {
  buttonTitle: string;
  link?: string;
  onClick?: () => void;
}

export const GroupTable = () => {
  const [shouldDisableCreation, setShouldDisableCreation] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    const shouldDisable = !checkMultipleUserRoleAccess(
      'Groups',
      'MANAGE GROUPS'
    );

    setShouldDisableCreation(shouldDisable);
  }, []);

  const actionButtons: any = [
    <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
      <Link
        style={{
          pointerEvents: shouldDisableCreation ? 'none' : 'auto'
        }}
        aria-disabled={shouldDisableCreation}
        tabIndex={shouldDisableCreation ? -1 : undefined}
        href="/setup/kyc/group/create"
      >
        <PrimaryIconButton
          disabled={shouldDisableCreation}
          buttonTitle="Create Group"
          customStyle={{ ...submitButton }}
        />
      </Link>{' '}
    </Box>
  ];

  const { branches } = useGetBranches();
  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<ISearchParams>('groups');
  const {
    totalPages,
    totalElements,
    data: groupData,
    isLoading: isGroupDataLoading
  } = useFilterGroupSearch({
    ...searchParams,
    page
  });

  const handleSearch = async (params: ISearchParams | null) => {
    setSearchParams(params);
    setSearchActive(true);
  };

  const ActionMenuProps = ({
    groupId
  }: {
    groupId: string;
  }): React.ReactElement => {
    return <TableActionMenu groupId={groupId?.trim()} />;
  };

  return (
    <Box mt={1}>
      <TopActionsArea actionButtons={actionButtons} />
      <Box sx={{ padding: '25px', width: '100%' }}>
        <Box>
          {branches && (
            <FilterSection branches={branches} onSearch={handleSearch} />
          )}
        </Box>
        {isGroupDataLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <MuiTableContainer
            columns={COLUMNS}
            tableConfig={{
              hasActions: true
            }}
            showHeader={{
              hideFilterSection: true,
              mainTitle: 'Group’s Overview',
              secondaryTitle: 'See a directory of all Groups on this system.'
            }}
            data={groupData}
            totalPages={totalPages}
            totalElements={totalElements}
            setPage={setPage}
            page={page}
          >
            {searchActive ? (
              groupData?.map((dataItem: SearchGroupResponse) => {
                return (
                  <StyledTableRow key={dataItem.groupID}>
                    <StyledTableCell component="th" scope="row">
                      {dataItem.groupID || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {dataItem.groupName || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.memberLimit
                        ? dataItem.memberLimit
                        : 'No Limits'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <ActionMenuProps groupId={dataItem.groupID || 'N/A'} />
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
                  {renderEmptyTableBody(groupData)}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </MuiTableContainer>
        )}
      </Box>
    </Box>
  );
};
