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
import { useFilterRegionSearch } from '@/api/setup/useCreateRegion';
import { useGetStatus } from '@/api/general/useStatus';
import { ISearchParams } from '@/app/api/search/route';
import { FormSkeleton } from '@/components/Loaders';
import { StyledTableRow, renderEmptyTableBody } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { SearchRegionResponse } from '@/api/ResponseTypes/setup';
import { Status } from '@/components/Labels';
import { decryptData } from '@/utils/decryptData';

const actionButtons: any = [
  <Box ml={{ mobile: 12, desktop: 0 }}>
    <Link href="/setup/company/region/create">
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

export const Region = () => {
  const [page, setPage] = useState(1);
  const { status } = useGetStatus();
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [search, setSearch] = useState<boolean>(false);
  const {
    totalPages,
    totalElements,
    data: regionData,
    isLoading
  } = useFilterRegionSearch({ ...searchParams, page });
  const handleSearch = async (params: any) => {
    setSearchParams(params);
    setSearch(true);
  };

  const ActionMenu = ({
    regionCode
  }: {
    regionCode: string;
  }): React.ReactElement => {
    return (
      <Link
        href={`/setup/company/region/create?isEditing=true&id=${regionCode}`}
      >
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
              data={regionData}
              showHeader={{
                mainTitle: 'Region',
                secondaryTitle:
                  'See a directory of all regions in this system.',
                hideFilterSection: true
              }}
              ActionMenuProps={ActionMenu}
              totalPages={totalPages}
              setPage={setPage}
              totalElements={totalElements}
              page={page}
            >
              {search ? (
                regionData?.map((dataItem: SearchRegionResponse) => {
                  return (
                    <StyledTableRow key={dataItem.userId}>
                      <StyledTableCell component="th" scope="row">
                        {dataItem.regionCode}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem.regionName}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem.regionmne}
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
                        <ActionMenu regionCode={dataItem.regionCode} />
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
                    {renderEmptyTableBody(regionData)}
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
