'use client';
import { Box } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import { sanitize } from 'dompurify';
import { FilterSection } from './FilterSection';
import { COLUMNS } from './COLUMNS';
import { PrimaryIconButton } from '@/components/Buttons';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { MuiTableContainer } from '@/components/Table';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { TableSingleAction } from '@/components/Revamp/TableV2';
import { useGetStatus } from '@/api/general/useStatus';
import { ISearchParams } from '@/app/api/search/route';
import { useFilterDormancySearch } from '@/api/setup/useDormancy';
import { FormSkeleton } from '@/components/Loaders';
import { SearchDormancyResponse } from '@/api/ResponseTypes/setup';
import { StyledTableRow, renderEmptyTableBody } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { Status } from '@/components/Labels';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <Link href="/setup/operations/add-dormancy">
      <PrimaryIconButton
        buttonTitle="Add New"
        customStyle={{ ...submitButton }}
      />
    </Link>
  </Box>
];

export const DormancyCriteriaTable = () => {
  const { status } = useGetStatus();

  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);

  const [search, setSearch] = useState<boolean>(false);
  const {
    totalPages,
    totalElements,
    data: dormancyData,
    isLoading
  } = useFilterDormancySearch({ ...searchParams, page });

  const handleSearch = async (params: any) => {
    setSearchParams(params);
    setSearch(true);
  };

  const ActionMenu = ({
    prodCode
  }: {
    prodCode: string;
  }): React.ReactElement => {
    return (
      <Link
        href={`/setup/operations/add-dormancy?isEditing=true&id=${sanitize(prodCode)}`}
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
            data={dormancyData}
            showHeader={{
              hideFilterSection: true,
              mainTitle: 'Dormancy Criteria',
              secondaryTitle:
                'See a directory of all Dormancy Criteria in this system.'
            }}
            ActionMenuProps={ActionMenu}
            totalPages={totalPages}
            setPage={setPage}
            totalElements={totalElements}
            page={page}
          >
            {search ? (
              dormancyData?.map((dataItem: SearchDormancyResponse) => {
                return (
                  <StyledTableRow key={dataItem.userId}>
                    <StyledTableCell component="th" scope="row">
                      {dataItem.prodCode}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.penalty}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.penalty}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.duration}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.narration}
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
                      <ActionMenu prodCode={dataItem.prodCode} />
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
                  {renderEmptyTableBody(dormancyData)}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </MuiTableContainer>
        )}
      </Box>
    </Box>
  );
};
