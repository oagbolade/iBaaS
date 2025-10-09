'use client';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import { PageTitle } from '@/components/Typography';
import {
  ViewAccountTitle,
  ViewStyle,
  ViewTitle
} from '@/components/ViewReport/style';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import {
  useGetProductSummaryDetails
} from '@/api/reports/useGetProductSummaryDetails';
import { FormSkeleton } from '@/components/Loaders';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { TableV2 } from '@/components/Revamp/TableV2';
import { ProductSummaryDetailsColumns } from '@/constants/MOCK_COLUMNSv2';
import { TextInput } from '@/components/FormikFields';
import { SearchIcon } from '@/assets/svg';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';

export const ProductSummaryDetails = () => {
  const productCode = useGetParams('productCode') || '';
  const productName = useGetParams('productName') || '';
  const numberOfAccount = useGetParams('numberOfAccount') || '';
  const crProductBalance = useGetParams('crProductBalance') || '';
  const drProductBalance = useGetParams('drProductBalance') || '';
  const totalProductBalance = useGetParams('totalProductBalance') || '';

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const [page, setPage] = React.useState(1);
  const { setExportData, setReportType } =
    React.useContext(DownloadReportContext);

  const {
    data: productSummaryDetails,
    isLoading: isloadingproductSumaryDetails,
    totalRecords
  } = useGetProductSummaryDetails({
    productCode,
    pageNumber: page,
    pageSize: 10,
  });

  const {
    data: downloadData,
  } = useGetProductSummaryDetails({
    productCode,
    pageNumber: page,
    pageSize: 10,
    getAll: true
  });

  const filteredDetails = productSummaryDetails?.pagedProductSummaries
    ?.filter(
      (details) =>
        details?.accountnumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        details?.accounttitle?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    ?.map((item) => ({
      branchname: item.branchname,
      accountnumber: item.accountnumber,
      accounttitle: item.accounttitle,
      dateopened: item.dateopened,
      bkbalance:  `NGN ${formatCurrency(item.bkbalance || 0) || 'N/A'}` || '',
      availBal:  `NGN ${formatCurrency(item.availBal || 0) || 'N/A'}` || '',
      lastdatepay: item.lastdatepay,
      holdbal: item.holdbal,
      pendingCC: item.pendingCC
    }));

  React.useEffect(() => {
    if (!downloadData || downloadData?.pagedProductSummaries?.length === 0) {
      setExportData([]);
      return;
    }
    
    if (
      (downloadData?.pagedProductSummaries?.length ?? 0) > 0
    ) {
      const formattedExportData =
        downloadData?.pagedProductSummaries.map((item) => ({
          'Product Code': item?.productcode || '',
          'Product Name': item?.productname || '',
          'Number of Accounts': numberOfAccount || '',
          'CR Product Balance': crProductBalance || '',
          'DR Product Balance': drProductBalance || '',
          'Total Balance': totalProductBalance || '',
          Branch: item?.branchname || '',
          'Account No': item?.accountnumber || '',
          'Account Title': item?.accounttitle || '',
          'Date Opened': item?.dateopened || '',
          'Book Balance': item?.bkbalance || '',
          'Available Bal': item?.availBal || '',
          'Last Transaction': item?.lastdatepay || '',
          'Uncleared Bal': item?.holdbal || '',
          'Pending Chg': item?.pendingCC || ''
        }));

      // Ensure no blank row or misplaced headers
      setExportData(formattedExportData || []);
      setReportType('ProductSummaryDetails');
    }
  }, [
    downloadData
  ]);

  return (
    <Box sx={{ marginTop: '60px' }}>
      <TopOverViewSection useBackButton />

      <Box
        sx={{
          margin: '90px 0px 50px 50px',
          width: '95%',
          padding: '50px',
          border: '1px solid #E1E6ED'
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            rowGap: '60px',
            columnGapGap: '20px'
          }}
        >
          <Box sx={ViewStyle}>
            <PageTitle title="PRODUCT CODE" styles={{ ...ViewAccountTitle }} />
            <PageTitle title={productCode} styles={{ ...ViewTitle }} />
          </Box>

          <Box sx={ViewStyle}>
            <PageTitle
              title="NUMBER OF ACCOUNTS"
              styles={{ ...ViewAccountTitle }}
            />
            <PageTitle title={numberOfAccount} styles={{ ...ViewTitle }} />
          </Box>

          <Box sx={ViewStyle}>
            <PageTitle
              title="CR PRODUCT BALANCE"
              styles={{ ...ViewAccountTitle }}
            />
            <PageTitle
              title={Number(crProductBalance).toLocaleString()}
              styles={{ ...ViewTitle }}
            />
          </Box>

          <Box sx={ViewStyle}>
            <PageTitle
              title="DR PRODUCT BALANCE"
              styles={{ ...ViewAccountTitle }}
            />
            <PageTitle
              title={Number(drProductBalance).toLocaleString()}
              styles={{ ...ViewTitle }}
            />
          </Box>

          <Box sx={ViewStyle}>
            <PageTitle title="PRODUCT NAME" styles={{ ...ViewAccountTitle }} />
            <PageTitle title={productName} styles={{ ...ViewTitle }} />
          </Box>

          <Box sx={ViewStyle}>
            <PageTitle title="TOTAL BALANCE" styles={{ ...ViewAccountTitle }} />
            <PageTitle
              title={Number(totalProductBalance).toLocaleString()}
              styles={{ ...ViewTitle }}
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          padding: '25px',
          width: '100%'
        }}
      >
        {isloadingproductSumaryDetails ? (
          <FormSkeleton noOfLoaders={5} />
        ) : (
          <div>
            <Box
              sx={{
                marginBottom: '30px',
                width: '100%'
              }}
            >
              <TextInput
                name="Search"
                placeholder="Search"
                icon={<SearchIcon />}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Box>

            <TableV2
              tableConfig={{
                hasActions: false,
                totalRow: [
                  'Total',
                  '',
                  '',
                  '',
                  `${productSummaryDetails?.totalBookeBalance.toLocaleString()}`,
                  `${productSummaryDetails?.totalAvailableBalance?.toLocaleString()}`,
                  '',
                  '',
                  `${productSummaryDetails?.totalPendingBalance?.toLocaleString()}`
                ],
                grandTotalRow: [
                  'Balance',
                  '',
                  '',
                  '',
                  '',
                  '',
                  '',
                  '',
                  `${productSummaryDetails?.totalAvailableBalance?.toLocaleString()}`
                ]
              }}
              columns={ProductSummaryDetailsColumns}
              data={filteredDetails || []}
              keys={[
                'branchname',
                'accountnumber',
                'accounttitle',
                'dateopened',
                'bkbalance',
                'availBal',
                'lastdatepay',
                'holdbal',
                'pendingCC'
              ]}
              isSearched
              ActionMenuProps="h"
              page={page}
              setPage={setPage}
              totalPages={Math.ceil((totalRecords || 0) / 10)}
              totalElements={totalRecords}
            />
          </div>
        )}
      </Box>
    </Box>
  );
};
