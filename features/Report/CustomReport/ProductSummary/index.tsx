'use client';
import * as React from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { FilterSection } from './FilterSection';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { TableV2 } from '@/components/Revamp/TableV2';
import { ProductSumarryColumn } from '@/constants/MOCK_COLUMNSv2';
import colors from '@/assets/colors';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import {
  IProdutSummaryParams,
  useGetProductSummary
} from '@/api/reports/useGetProductSummary';
import { FormSkeleton } from '@/components/Loaders';
import { useGetBranches } from '@/api/general/useBranches';
import { IpagedProductSummaries } from '@/api/ResponseTypes/reports';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';

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
  const { isLoading } = useGlobalLoadingState();
  const { branches } = useGetBranches();

  const { setExportData, setReportType } = React.useContext(
    DownloadReportContext
  );

  interface ProductSummaryRow {
    productcode: string;
    productname: string;
    noofaccts: string | number;
    crproductbalance: number | string;
    drproductbalance: number | string;
    totproductbalance: number | string;
  }

  const [productSummaryData, setProductSummaryData] = React.useState<
    ProductSummaryRow[]
  >([]);

  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<IProdutSummaryParams>('product-summary');

  const {
    productSummaryList,
    isLoading: isloadingproductSumary,
    totalRecords
  } = useGetProductSummary({
    ...searchParams,
    pageNumber: page,
    pageSize: 10
  });

  const { productSummaryList: downloadData } = useGetProductSummary({
    ...searchParams,
    pageNumber: page,
    pageSize: 10,
    getAll: true
  });

  React.useEffect(() => {
    if (!downloadData || downloadData.pagedProductSummaries?.length === 0) {
      setExportData([]);
      return;
    }

    if (downloadData?.pagedProductSummaries?.length > 0) {
      const formattedExportData = downloadData?.pagedProductSummaries.map(
        (item) => ({
          'Product Code': item?.productcode || '',
          'Product Name': item?.productname || '',
          'Number of Accounts': item?.noofaccts || '',
          'CR Product Balance':
            `NGN ${formatCurrency(item.crproductbalance || 0) || '0'}` || '',
          'DR Product Balance':
            `NGN ${formatCurrency(item?.drproductbalance) || '0'}` || '',
          'Total Balance': item?.totproductbalance || ''
        })
      );

      const data = productSummaryList?.pagedProductSummaries.map((item) => ({
        productcode: item?.productcode || '',
        productname: item?.productname || '',
        noofaccts: item?.noofaccts || '',
        crproductbalance: item?.crproductbalance ?? 0,
        drproductbalance: item?.drproductbalance ?? 0,
        totproductbalance: item?.totproductbalance ?? 0
      }));

  setProductSummaryData(data || []);
      if (downloadData) {
        setExportData(formattedExportData || []);
        setReportType('ProductSummary');
      }
    } else {
      setProductSummaryData([]);
    }
  }, [
    downloadData?.pagedProductSummaries,
    downloadData,
    productSummaryList?.pagedProductSummaries,
    setExportData,
    setReportType
  ]);

  const handleSearch = (params: IProdutSummaryParams | null) => {
    setSearchParams({
      ...params
    });
    setSearchActive(true);
  };

  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '50px'
      }}
    >
      <TopOverViewSection useBackButton />

      <Box
        sx={{
          padding: '25px',
          width: '100%'
        }}
      >
        <Box sx={{ marginTop: '20px', marginBottom: '30px' }}>
          <FilterSection branches={branches} onSearch={handleSearch} />
        </Box>

        {isLoading || isloadingproductSumary ? (
          <FormSkeleton noOfLoaders={5} />
        ) : (
          <TableV2
            tableConfig={{
              hasActions: true,
              paintedColumns: ['crproductbalance', 'drproductbalance'],
              totalRow: [
                'Total',
                '',
                `${productSummaryList?.totalAccount?.toLocaleString()}`,
                `NGN ${productSummaryList?.totalCr?.toLocaleString()}`,
                `NGN ${productSummaryList?.totalDr?.toLocaleString()}`,
                `NGN ${productSummaryList?.totalProductBal?.toLocaleString()}`,
                ''
              ]
            }}
            columns={ProductSumarryColumn}
            data={productSummaryData}
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
            isSearched={searchActive}
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
