'use client';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import Link from 'next/link';
import { FilterSection } from './FilterSection';
import { COLUMN } from './Column';
import {
  MuiTableContainer,
  StyledTableRow,
  renderEmptyTableBody
} from '@/components/Table/Table';
import { useGetBranches } from '@/api/general/useBranches';
import { FormSkeleton } from '@/components/Loaders';
import { ISearchParams } from '@/app/api/search/route';
import { useGetMaturityLoan } from '@/api/reports/useMaturityLoan';
import { ILoanMaturityReport } from '@/api/ResponseTypes/reports';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { useGetAllProduct } from '@/api/setup/useProduct';
import { StyledTableCell } from '@/components/Table/style';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';

import colors from '@/assets/colors';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

interface ActionMenuProps {
  detail: string;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ detail }) => {
  return (
    <Link
      href={`/report/custom-report/view-report/?getMaturityLoan=maturityLoan&loanDetail=${detail}`}
      style={{ color: `${colors.activeBlue400}` }}
    >
      View
    </Link>
  );
};

export const MaturityLoan = () => {
  const { branches } = useGetBranches();
  const { bankproducts } = useGetAllProduct();
  const { dateValue } = React.useContext(DateRangePickerContext);

  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<ISearchParams>('maturity-loan-report');

  const { setReportType, setExportData } = React.useContext(
    DownloadReportContext
  );

  const handleSearch = async (params: ISearchParams | null) => {
    setSearchActive(true);
    setSearchParams({
      ...params,
      startDate: dateValue[0]?.format('YYYY-MM-DD') || '',
      endDate: dateValue[1]?.format('YYYY-MM-DD') || '',
      pageNumber: String(page),
      pageSize: '10'
    });
    setReportType('MaturityLoan');
  };

  const { loanMaturityList, totalRecords, isLoading } = useGetMaturityLoan({
    ...searchParams
  });

  React.useEffect(() => {
    if (loanMaturityList?.length > 0) {
      setExportData(loanMaturityList);
    }
  }, [loanMaturityList, setExportData, setReportType]);

  return (
    <Box sx={{ width: '100%' }}>
      <TopOverViewSection useBackButton />

      {branches && bankproducts && (
        <FilterSection
          branches={branches}
          bankproducts={bankproducts}
          onSearch={handleSearch}
        />
      )}

      <Box sx={{ paddingX: '24px' }}>
        {isLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <MuiTableContainer
            showHeader={{
              mainTitle: 'Maturity Loan',
              secondaryTitle:
                'See a directory of all Maturity Loan Report in this system.',
              hideFilterSection: true
            }}
            tableConfig={{
              hasActions: true
            }}
            columns={COLUMN}
            data={loanMaturityList}
            setPage={setPage}
            page={page}
            ActionMenuProps={ActionMenu}
          >
            {searchActive ? (
              loanMaturityList?.map((dataItem: ILoanMaturityReport) => {
                return (
                  <StyledTableRow key={dataItem.accountNumber}>
                    <StyledTableCell component="th" scope="row">
                      {dataItem?.accountNumber || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.customerID || 'N/A'}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      {dataItem?.fullName || 'N/A'}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      {dataItem?.branch || 'N/A'}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      {dataItem?.productCode || 'N/A'}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      {dataItem?.settlementAcct1 || 'N/A'}
                    </StyledTableCell>

                    <StyledTableCell component="th" scope="row">
                      <ActionMenu detail={JSON.stringify(dataItem) as string} />
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
                  {renderEmptyTableBody(loanMaturityList)}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </MuiTableContainer>
        )}
      </Box>
    </Box>
  );
};
