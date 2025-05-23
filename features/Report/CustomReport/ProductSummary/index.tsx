'use client';
import * as React from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { FilterSection } from './FilterSection';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { TableV2 } from '@/components/Revamp/TableV2';
import { MOCK_COLUMNS_V2 } from '@/constants/MOCK_COLUMNSv2';
import colors from '@/assets/colors';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import {
  IProdutSummaryParams,
  useGetProductSummary
} from '@/api/reports/useGetProductSummary';
import { FormSkeleton } from '@/components/Loaders';
import { useGetBranches } from '@/api/general/useBranches';
import {
  GetProductSummaryReport,
  IpagedProductSummaries
} from '@/api/ResponseTypes/reports';

interface IViewMoreProps {
  data: IpagedProductSummaries;
}

const ViewMore = ({ data }: IViewMoreProps) => {
  return (
    <Link
      href={`/report/custom-report/view-product-summary-details/?showTableReport=true&branchId=${data?.branchcode}&productCode=${data?.productcode}&productName=${data?.productname}&numberOfAccount=${data?.noofaccts}&crProductBalance=${data?.crproductbalance}&drProductBalance=${data?.drproductbalance}&totalProductBalance=${data?.totproductbalance}`}
    >
      <Typography
        sx={{
          fontSize: '14px',
          fontWeight: 600,
          lineHeight: '20px',
          color: `${colors.activeBlue400}`,
          cursor: 'pointer'
        }}
      >
        View More
      </Typography>
    </Link>
  );
};
export const ProductSummary = () => {
  const [searchParams, setSearchParams] =
    React.useState<IProdutSummaryParams | null>(null);

  const { branches } = useGetBranches();

  const [page, setPage] = React.useState(1);
  const { setExportData, setReportType, readyDownload, setReadyDownload } =
    React.useContext(DownloadReportContext);

  const [isSearched, setSearched] = React.useState(false);

  const { search } = searchParams || {};

  const {
    productSummaryList,
    isLoading: isloadingproductSumary,
    totalRecords
  } = useGetProductSummary({
    ...searchParams,
    search,
    pageNumber: page,
    pageSize: 10,
    getAll: readyDownload
  });

  React.useEffect(() => {
    if (readyDownload) {
      setSearchParams((prev) => ({
        ...prev,
        getAll: true
      }));
    }
  }, [readyDownload]);

  React.useEffect(() => {
    if (
      (productSummaryList?.pagedProductSummaries?.length ?? 0) > 0 &&
      readyDownload
    ) {
      const formattedExportData = productSummaryList?.pagedProductSummaries.map(
        (item) => ({
          'Product Code': item?.productcode || '',
          'Product Name': item?.productname || '',
          'Number of Accounts': item?.noofaccts || '',
          'CR Product Balance': item?.crproductbalance || '',
          'DR Product Balance': item?.drproductbalance || '',
          'Total Balance': item?.totproductbalance || ''
        })
      );

      // Ensure no blank row or misplaced headers
      setExportData(formattedExportData || []);
      setReportType('ProductSummary');
    }
  }, [
    productSummaryList?.pagedProductSummaries,
    setExportData,
    setReportType,
    readyDownload,
    setReadyDownload
  ]);

  const handleSearch = (params: IProdutSummaryParams | null) => {
    setReadyDownload(false);
    setSearchParams({
      ...params
    });
    setSearched(true);
    setPage(1); // Reset to the first page on new search
  };

  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '50px'
      }}
    >
      <Box sx={{ width: '1300px' }}>
        <TopOverViewSection useBackButton />
      </Box>{' '}
      <Box
        sx={{
          padding: '25px',
          width: '100%'
        }}
      >
        <Box sx={{ marginTop: '20px', marginBottom: '30px' }}>
          <FilterSection branches={branches} onSearch={handleSearch} />
        </Box>

        {isloadingproductSumary ? (
          <FormSkeleton noOfLoaders={5} />
        ) : (
          <TableV2
            tableConfig={{
              hasActions: true,
              paintedColumns: ['CR Product Balalnce', 'DR Product Balance'],
              totalRow: [
                'Total',
                '',
                `${productSummaryList?.totalAccount?.toLocaleString()}`,
                `${productSummaryList?.totalCr?.toLocaleString()}`,
                `${productSummaryList?.totalDr?.toLocaleString()}`,
                `${productSummaryList?.totalProductBal?.toLocaleString()}`,
                ''
              ]
            }}
            columns={MOCK_COLUMNS_V2}
            data={productSummaryList?.pagedProductSummaries || []}
            keys={[
              'productcode',
              'productname',
              'noofaccts',
              'crproductbalance',
              'drproductbalance',
              'totproductbalance'
            ]}
            ActionMenuProps={ViewMore}
            hideFilterSection
            isSearched={isSearched}
            showHeader={{
              mainTitle: 'Product Summary',
              secondaryTitle:
                'See a directory of all Product Summary Report in this system.'
            }}
            page={page}
            setPage={setPage}
            totalPages={Math.ceil((totalRecords || 0) / 10)}
            totalElements={totalRecords}
          />
        )}
      </Box>
    </Box>
  );
};
