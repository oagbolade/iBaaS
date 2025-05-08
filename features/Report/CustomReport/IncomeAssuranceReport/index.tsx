'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import { FilterSection } from './FilterSection';
import { COLUMN } from './COLUMNS';
import { MuiTableContainer } from '@/components/Table';
import { useGetIncomeAssuranceReport } from '@/api/reports/useIncomeAssuranceReport';
import { ISearchParams } from '@/app/api/search/route';
import { useGetProductType } from '@/api/general/useProductType';
import { useGetBranches } from '@/api/general/useBranches';
import { FormSkeleton } from '@/components/Loaders';
import { renderEmptyTableBody, StyledTableRow } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { IIncomeAssurance } from '@/api/ResponseTypes/reports';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';

export const IncomeAssuranceReport = () => {
    const { dateValue, isDateFilterApplied } = React.useContext(DateRangePickerContext);

  const [search, setSearch] = React.useState<boolean>(false);
  const [searchParams, setSearchParams] = React.useState<ISearchParams | null>(
    null
  );
  const [page, setPage] = React.useState(1);
  const { actionCode1Model, isLoading } = useGetIncomeAssuranceReport({
    ...searchParams,
    page
  });
  const { productTypes } = useGetProductType();
  const { branches } = useGetBranches();

  console.log('actionCode1Model', productTypes);
  console.log('actionCode1Modefrerel', branches);
  const handleSearch = async (params: ISearchParams | null) => {
    setSearch(true);
    setSearchParams({
      ...params,
      startDate: dateValue[0]?.format('YYYY-MM-DD') || '',
      endDate: dateValue[1]?.format('YYYY-MM-DD') || '',
    });
  };
  return (
    <Box sx={{ width: '100%' }}>
      {branches && productTypes && (
        <FilterSection
          branches={branches}
          onSearch={handleSearch}
          productTypes={productTypes}
        />
      )}
      <Box sx={{ padding: '25px', width: '100%' }}>
        {isLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <MuiTableContainer
            columns={COLUMN}
            data={actionCode1Model}
            showHeader={{
              mainTitle: ' Income Assurance Report',
              secondaryTitle:
                'See a directory of Income Assurance Report in this system.',
              hideFilterSection: true
            }}
            setPage={setPage}
            page={page}
          >
            {search ? (
              actionCode1Model?.map((dataItem: IIncomeAssurance) => {
                return (
                  <StyledTableRow key={dataItem.accountnumber}>
                    <StyledTableCell component="th" scope="row">
                      {dataItem?.accountnumber || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.fullname || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.startdate || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.matdate || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.loanamount || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.accrued_Int || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.intrate || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.productCode || 'N/A'}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })
            ) : (
              <StyledTableRow>
                <StyledTableCell
                  colSpan={COLUMN.length + 1}
                  component="th"
                  scope="row"
                >
                  {renderEmptyTableBody(actionCode1Model)}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </MuiTableContainer>
        )}
      </Box>
    </Box>
  );
};
