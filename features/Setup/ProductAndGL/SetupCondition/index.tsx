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
import { useFilterSetupConditionSearch } from '@/api/setup/useSetupCondition';
import { ISearchParams } from '@/app/api/search/route';
import { FormSkeleton } from '@/components/Loaders';
import { renderEmptyTableBody, StyledTableRow } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { SearchSetupConditionResponse } from '@/api/ResponseTypes/setup';

// ON HOld untill the product gives us go ahead
export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <Link href="/setup/product-gl/add-condition">
      <PrimaryIconButton
        buttonTitle="Add New "
        customStyle={{ ...submitButton }}
      />
    </Link>
  </Box>
];

export const SetupConditionTable = () => {
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [search, setSearch] = useState<boolean>(false);

  const {
    totalPages,
    totalElements,
    data: setupConditionData,
    isLoading
  } = useFilterSetupConditionSearch({ ...searchParams, page });
  const handleSearch = async (params: any) => {
    setSearchParams(params);
    setSearch(true);
  };
  const ActionMenu = ({ code }: { code: string }): React.ReactElement => {
    return (
      <Link href={`/setup/product-gl/add-condition?isEditing=true&id=${code}`}>
        <TableSingleAction actionName="Edit" />
      </Link>
    );
  };
  return (
    <Box>
      {/* //ON HOld untill the product gives us go ahead */}
      <TopActionsArea actionButtons={actionButtons} />
      <Box sx={{ padding: '25px', marginTop: '10px' }}>
        <FilterSection onSearch={handleSearch} />
      </Box>
      <Box sx={{ padding: '25px', width: '100%' }}>
        {isLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <MuiTableContainer
            columns={COLUMNS}
            data={setupConditionData}
            showHeader={{
              hideFilterSection: true,
              mainTitle: 'Condition precedent',
              secondaryTitle:
                'See a directory of all Condition precedent in this system.'
            }}
            ActionMenuProps={ActionMenu}
            totalPages={totalPages}
            setPage={setPage}
            totalElements={totalElements}
            page={page}
          >
            {search ? (
              setupConditionData?.map(
                (dataItem: SearchSetupConditionResponse) => {
                  return (
                    <StyledTableRow key={dataItem.userId}>
                      <StyledTableCell component="th" scope="row">
                        {dataItem.code}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem.description}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <ActionMenu code={dataItem.code} />
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
                  {renderEmptyTableBody(setupConditionData)}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </MuiTableContainer>
        )}
      </Box>
    </Box>
  );
};
