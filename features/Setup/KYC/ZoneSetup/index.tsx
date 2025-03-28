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
import { useFilterZoneSearch } from '@/api/setup/useZone';
import { useGetStatus } from '@/api/general/useStatus';
import { ISearchParams } from '@/app/api/search/route';
import { FormSkeleton } from '@/components/Loaders';
import { StyledTableRow, renderEmptyTableBody } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { SearchZoneResponse } from '@/api/ResponseTypes/setup';
import { Status } from '@/components/Labels';

const actionButtons: any = [
  <Box ml={{ mobile: 12, desktop: 0 }}>
    <Link href="/setup/kyc/zone-setup/create">
      <PrimaryIconButton
        buttonTitle="Add New"
        customStyle={{
          ...submitButton,
          width: { mobile: '119px', desktop: '218px' },
          height: { mobile: '30px', desktop: '40px' }
        }}
      />
    </Link>
  </Box>
];

export const ZoneSetup = () => {
  const [page, setPage] = useState(1);
  const { status } = useGetStatus();
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [search, setSearch] = useState<boolean>(false);
  const {
    totalPages,
    totalElements,
    data: zoneData,
    isLoading
  } = useFilterZoneSearch({ ...searchParams, page });
  const handleSearch = async (params: ISearchParams | null) => {
    setSearchParams(params);
    setSearch(true);
  };

  const ActionMenu = ({ zoneid }: { zoneid: string }): React.ReactElement => {
    return (
      <Link href={`/setup/kyc/zone-setup/create?isEditing=true&id=${zoneid}`}>
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
            width: '100%'
          }}
        >
          {isLoading ? (
            <FormSkeleton noOfLoaders={3} />
          ) : (
            <MuiTableContainer
              columns={COLUMNS}
              data={zoneData}
              showHeader={{
                mainTitle: 'Zone Setup',
                secondaryTitle:
                  'See a directory of all zone setups in this system.',
                hideFilterSection: true
              }}
              ActionMenuProps={ActionMenu}
              totalPages={totalPages}
              setPage={setPage}
              totalElements={totalElements}
              page={page}
            >
              {search ? (
                zoneData?.map((dataItem: SearchZoneResponse) => {
                  return (
                    <StyledTableRow key={dataItem.userId}>
                      <StyledTableCell component="th" scope="row">
                        {dataItem.zoneid}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem.zoneName}
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
                        <ActionMenu zoneid={dataItem.zoneid} />
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
                    {renderEmptyTableBody(zoneData)}
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
