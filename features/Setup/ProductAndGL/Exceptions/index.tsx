'use client';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import Link from 'next/link';
import { FilterSection } from './FilterSection';
import { COLUMNS } from './COLUMNS';
import { MuiTableContainer } from '@/components/Table';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { useFilterExceptionSearch } from '@/api/setup/useException';
import { ISearchParams } from '@/app/api/search/route';
import { FormSkeleton } from '@/components/Loaders';
import { renderEmptyTableBody, StyledTableRow } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { SearchExceptionResponse } from '@/api/ResponseTypes/setup';
import { Status } from '@/components/Labels';
import { PrimaryIconButton } from '@/components/Buttons';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';

// ON HOld untill the product gives us go ahead
export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    {/* // ON HOld untill the product gives us go ahead */}

    <Link href="/setup/product-gl/add-exception">
      <PrimaryIconButton
        buttonTitle="Add New "
        customStyle={{ ...submitButton }}
      />
    </Link>
  </Box>
];

export const ExceptionsTable = () => {
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [search, setSearch] = useState<boolean>(false);

  const {
    totalPages,
    totalElements,
    data: exceptionlData,
    isLoading
  } = useFilterExceptionSearch({ ...searchParams, page });
  const handleSearch = async (params: any) => {
    setSearchParams(params);
    setSearch(true);
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
            data={exceptionlData}
            showHeader={{
              hideFilterSection: true,
              mainTitle: 'Exceptions',
              secondaryTitle:
                'See a directory of all Exceptions in this system.'
            }}
            totalPages={totalPages}
            setPage={setPage}
            totalElements={totalElements}
            page={page}
          >
            {search ? (
              exceptionlData?.map((dataItem: SearchExceptionResponse) => {
                return (
                  <StyledTableRow key={dataItem.userId}>
                    <StyledTableCell component="th" scope="row">
                      {dataItem.exceptioncode}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.exceptionDesc}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Status
                        label={
                          Number(dataItem?.behaviour) === 1
                            ? 'Exception'
                            : 'Warning'
                        }
                        status={
                          Number(dataItem?.behaviour) === 1
                            ? 'success'
                            : 'warning'
                        }
                      />
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
                  {renderEmptyTableBody(exceptionlData)}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </MuiTableContainer>
        )}
      </Box>
    </Box>
  );
};
