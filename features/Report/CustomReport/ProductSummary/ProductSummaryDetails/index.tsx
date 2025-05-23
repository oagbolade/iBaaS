'use client';
import { Box, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { PageTitle } from '@/components/Typography';
import {
  tellerPostingContainerStyles,
  ViewAccountContainer,
  ViewAccountTitle,
  ViewStyle,
  ViewTellerPostingStyle,
  ViewTitle
} from '@/components/ViewReport/style';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { BackButton } from '@/components/Revamp/Buttons';
import { backButtonContainerStyle } from '@/features/Requests/styles';
import {
  IProdutSummaryDetailsParams,
  useGetProductSummaryDetails
} from '@/api/reports/useGetProductSummaryDetails';
import { FormSkeleton } from '@/components/Loaders';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { TableV2 } from '@/components/Revamp/TableV2';
import { ProductSummaryDetailsColumns } from '@/constants/MOCK_COLUMNSv2';
import { TextInput } from '@/components/FormikFields';
import { SearchIcon } from '@/assets/svg';

export const ProductSummaryDetails = () => {
  const productCode = useGetParams('productCode') || '';
  const productName = useGetParams('productName') || '';
  const numberOfAccount = useGetParams('numberOfAccount') || '';
  const crProductBalance = useGetParams('crProductBalance') || '';
  const drProductBalance = useGetParams('drProductBalance') || '';
  const totalProductBalance = useGetParams('totalProductBalance') || '';

  const [searchParams, setSearchParams] =
    React.useState<IProdutSummaryDetailsParams | null>(null);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const [page, setPage] = React.useState(1);
  const { setExportData, setReportType, readyDownload, setReadyDownload } =
    React.useContext(DownloadReportContext);

  const { search } = searchParams || {};

  const {
    data: productSummaryDetails,
    isLoading: isloadingproductSumaryDetails,
    totalRecords
  } = useGetProductSummaryDetails({
    productCode,
    pageNumber: page,
    pageSize: 10,
    getAll: readyDownload
  });

  const filteredDetails = productSummaryDetails?.pagedProductSummaries.filter(
    (details) =>
      details?.accountnumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      details?.accounttitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  React.useEffect(() => {
    if (
      (productSummaryDetails?.pagedProductSummaries?.length ?? 0) > 0 &&
      readyDownload
    ) {
      const formattedExportData =
        productSummaryDetails?.pagedProductSummaries.map((item) => ({
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
    productSummaryDetails?.pagedProductSummaries,
    setExportData,
    setReportType,
    readyDownload,
    setReadyDownload,
    numberOfAccount,
    crProductBalance,
    drProductBalance,
    totalProductBalance
  ]);

  return (
    <Box sx={{ marginTop: '100px' }}>
      <Box sx={{ width: '1300px' }}>
        <TopOverViewSection useBackButton />
      </Box>
      <Box
        sx={{
          margin: '90px 0 50px 50px',
          width: 'inset',
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
          <Box>
            <Box>
              <Box>
                <Box sx={ViewStyle}>
                  <PageTitle
                    title="PRODUCT CODE"
                    styles={{ ...ViewAccountTitle }}
                  />
                  <PageTitle title={productCode} styles={{ ...ViewTitle }} />
                </Box>
              </Box>
            </Box>
          </Box>

          <Box>
            <Box>
              <Box>
                <Box sx={ViewStyle}>
                  <PageTitle
                    title="NUMBER OF ACCOUNTS"
                    styles={{ ...ViewAccountTitle }}
                  />
                  <PageTitle
                    title={numberOfAccount}
                    styles={{ ...ViewTitle }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          <Box>
            <Box>
              <Box>
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
              </Box>
            </Box>
          </Box>

          <Box>
            <Box>
              <Box>
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
              </Box>
            </Box>
          </Box>

          <Box>
            <Box>
              <Box>
                <Box sx={ViewStyle}>
                  <PageTitle
                    title="PRODUCT NAME"
                    styles={{ ...ViewAccountTitle }}
                  />
                  <PageTitle title={productName} styles={{ ...ViewTitle }} />
                </Box>
              </Box>
            </Box>
          </Box>

          <Box>
            <Box>
              <Box>
                <Box sx={ViewStyle}>
                  <PageTitle
                    title="TOTAL BALANCE"
                    styles={{ ...ViewAccountTitle }}
                  />
                  <PageTitle
                    title={Number(totalProductBalance).toLocaleString()}
                    styles={{ ...ViewTitle }}
                  />
                </Box>
              </Box>
            </Box>
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
          <Box>
            <Box
              sx={{
                marginTop: '10px',
                marginBottom: '30px',
                marginLeft: '20px',
                width: '100%'
              }}
            >
              <TextInput
                customStyle={{ width: '90%' }}
                name="Search"
                placeholder="Search"
                icon={<SearchIcon />}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Box>

            <TableV2
              tableConfig={{
                hasActions: true,
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
          </Box>
        )}
      </Box>
    </Box>
  );
};
