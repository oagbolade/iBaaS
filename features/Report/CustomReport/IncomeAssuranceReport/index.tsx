'use client';
import { read } from 'fs';
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
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { useGetIAReportType } from '@/api/general/useIAReportType';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

export const IncomeAssuranceReport = () => {
  const { productTypes } = useGetProductType();
  const { branches } = useGetBranches();
  const { data: IAreportType } = useGetIAReportType();

  const { dateValue } = React.useContext(DateRangePickerContext);

  const { setExportData, setReportType, readyDownload, setReadyDownload } =
    React.useContext(DownloadReportContext);

  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage,
  } = usePersistedSearch<ISearchParams>('income-assurance');
  const {
    data = [],
    isLoading,
    totalRecords,
  } = useGetIncomeAssuranceReport({
    ...searchParams,
    page,
    getAll: readyDownload,
    pageSize: '10',
  });

  React.useEffect(() => {
    if (readyDownload) {
      setSearchParams((prev) => ({
        ...prev,
        getAll: true,
      }));
    }
  }, [readyDownload]);

  React.useEffect(() => {
    if (data?.length > 0 && !isLoading && readyDownload) {
      const formattedExportData = data?.map((item) => ({
        'Acc No': item?.accountnumber || 'N/A',
        'Account Name': item?.fullname || 'N/A',
        'Start Date': item?.startdate?.split('T')[0] || 'N/A',
        'Maturity Date': item?.matdate?.split('T')[0] || 'N/A',
        'Intrest Rate': item?.intrate || 'N/A',
        'Loan Amount': item?.loanamount?.toLocaleString() || 0,
        'product Name': item?.productName || 'N/A',
        'Accured Intrest': item?.accrued_Int?.toLocaleString() || 0,
        Branch: item?.branchName || 'N/A',
        'Product Code': item?.productCode || 'N/A',
      }));

      // Ensure no blank row or misplaced headers
      setExportData(formattedExportData);
      setReportType('IncomeAssuranceReport');
    }
  }, [data, isLoading, readyDownload, setExportData, setReportType]);

  const rowsPerPage = 10;
  const totalPages = Math.ceil((totalRecords || 0) / rowsPerPage);

  const handleSearch = async (params: ISearchParams | null) => {
    setReadyDownload(false);
    setSearchActive(true);
    setSearchParams({
      ...params,
      startDate: dateValue[0]?.format('YYYY-MM-DD') || '',
      endDate: dateValue[1]?.format('YYYY-MM-DD') || '',
    });
  };
  return (
    <Box sx={{ width: '100%' }}>
      <TopOverViewSection useBackButton />
      {branches && IAreportType && (
        <FilterSection
          branches={branches}
          onSearch={handleSearch}
          iAReportType={IAreportType}
          productTypes={productTypes}
        />
      )}
      <Box sx={{ padding: '25px', width: '100%' }}>
        {isLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <MuiTableContainer
            columns={COLUMN}
            data={data}
            showHeader={{
              mainTitle: ' Income Assurance Report',
              secondaryTitle:
                'See a directory of Income Assurance Report in this system.',
              hideFilterSection: true,
            }}
            setPage={setPage}
            page={page}
            totalPages={totalPages}
            totalElements={totalRecords}
          >
            {searchActive ? (
              data?.map((dataItem: IIncomeAssurance, i) => {
                return (
                  <StyledTableRow key={i}>
                    <StyledTableCell component="th" scope="row">
                      {dataItem?.accountnumber || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.fullname || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.startdate?.split('T')[0] || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.matdate?.split('T')[0] || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.intrate || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.loanamount?.toLocaleString() || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.productName || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.accrued_Int?.toLocaleString() || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.branchName || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem?.productCode || dataItem?.productcode || 'N/A'}
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
                  {renderEmptyTableBody(data)}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </MuiTableContainer>
        )}
      </Box>
    </Box>
  );
};
