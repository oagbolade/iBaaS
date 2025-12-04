'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import moment from 'moment';
import { FilterSection } from './FilterSection';
import { COLUMN, COLUMN_PAYMENT } from './COLUMNS';
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
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';

export const IncomeAssuranceReport = () => {
  const { isLoading: isGlobalLoading } = useGlobalLoadingState();
  const { productTypes } = useGetProductType();
  const { branches } = useGetBranches();
  const { data: IAreportType } = useGetIAReportType();

  const { dateValue } = React.useContext(DateRangePickerContext);

  const { setExportData, setReportType } = React.useContext(
    DownloadReportContext
  );

  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<ISearchParams>('income-assurance');

  const reportType = Number(searchParams?.reportType);

  const isAllProductReport = reportType === 1;

  const {
    data = [],
    isLoading,
    totalRecords
  } = useGetIncomeAssuranceReport({
    ...searchParams,
    page,
    pageSize: '10'
  });

  const { data: downloadData } = useGetIncomeAssuranceReport({
    ...searchParams,
    page,
    getAll: true,
    pageSize: '10'
  });

  React.useEffect(() => {
    if (!downloadData || downloadData?.length === 0) {
      setExportData([]);
      return;
    }

    const formattedExportData = downloadData.map((item) => {
      if (isAllProductReport) {
        return {
          'Product Code': item?.productcode || 'N/A',
          'Branch Code': item?.branchcode || 'N/A',
          'Accrued Interest': item?.accrued_Int?.toLocaleString() || 0,
          'Branch Name': item?.branchName || 'N/A',
          'Product Name': item?.productName || 'N/A'
        };
      }

      // FULL REPORT EXPORT
      return {
        'Acc No': item?.accountnumber || 'N/A',
        'Account Name': item?.fullname || 'N/A',
        'Start Date': item?.startdate?.split('T')[0] || 'N/A',
        'Maturity Date': item?.matdate?.split('T')[0] || 'N/A',
        'Interest Rate': item?.intrate || 'N/A',
        'Loan Amount': item?.loanamount?.toLocaleString() || 0,
        'Product Name': item?.productName || 'N/A',
        'Accrued Interest': item?.accrued_Int?.toLocaleString() || 0,
        Branch: item?.branchName || 'N/A',
        'Product Code': item?.productCode || item?.productcode || 'N/A'
      };
    });

    setExportData(formattedExportData);
    setReportType('IncomeAssuranceReport');
  }, [downloadData, isAllProductReport]);

  const rowsPerPage = 10;
  const totalPages = Math.ceil((totalRecords || 0) / rowsPerPage);

  const handleSearch = async (params: ISearchParams | null) => {
    setSearchActive(true);
    setSearchParams({
      ...params,
      startDate: dateValue[0]?.format('YYYY-MM-DD') || '',
      endDate: dateValue[1]?.format('YYYY-MM-DD') || ''
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
        {isGlobalLoading || isLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <MuiTableContainer
            columns={isAllProductReport ? COLUMN_PAYMENT : COLUMN}
            data={data}
            tableConfig={{ hasActions: false }}
            showHeader={{
              mainTitle: 'Income Assurance Report',
              secondaryTitle:
                'See a directory of Income Assurance Report in this system.',
              hideFilterSection: true
            }}
            setPage={setPage}
            page={page}
            totalPages={totalPages}
            totalElements={totalRecords}
          >
            {searchActive ? (
              data?.map((row: IIncomeAssurance, i) => (
                <StyledTableRow key={i}>

                  {isAllProductReport ? (
                    <>
                      <StyledTableCell>{row.productcode || 'N/A'}</StyledTableCell>
                      <StyledTableCell>{row.branchcode || 'N/A'}</StyledTableCell>
                      <StyledTableCell>
                        {`NGN ${formatCurrency(row.accrued_Int || 0)}`}
                      </StyledTableCell>
                      <StyledTableCell>{row.branchName || 'N/A'}</StyledTableCell>
                      <StyledTableCell>{row.productName || 'N/A'}</StyledTableCell>
                    </>
                  ) : (
                    <>
                      <StyledTableCell>{row.accountnumber || 'N/A'}</StyledTableCell>
                      <StyledTableCell>{row.fullname || 'N/A'}</StyledTableCell>
                      <StyledTableCell>
                        {moment(row.startdate?.split('T')[0]).format('YYYY-MM-DD')}
                      </StyledTableCell>
                      <StyledTableCell>
                        {moment(row.matdate?.split('T')[0]).format('YYYY-MM-DD')}
                      </StyledTableCell>
                      <StyledTableCell>{row.intrate || 'N/A'}</StyledTableCell>
                      <StyledTableCell>
                        {`NGN ${formatCurrency(row.loanamount || 0)}`}
                      </StyledTableCell>
                      <StyledTableCell>{row.productName || 'N/A'}</StyledTableCell>
                      <StyledTableCell>
                        {`NGN ${formatCurrency(row.accrued_Int || 0)}`}
                      </StyledTableCell>
                      <StyledTableCell>{row.branchName || 'N/A'}</StyledTableCell>
                      <StyledTableCell>
                        {row.productCode || row.productcode || 'N/A'}
                      </StyledTableCell>
                    </>
                  )}

                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={COLUMN.length + 1}>
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
