'use client';
import React, { useContext, useState } from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { centraliseNoDataAvailable } from '../style';
import { PortfolioCard } from './PortfolioCards';
import { TextInput } from '@/components/FormikFields';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { useGetAllPortfolioAtRisk } from '@/api/reports/useGetAllPortfolioAtRisk';
import { FormSkeleton } from '@/components/Loaders';
import { IPortfolioAtRiskProduct } from '@/api/ResponseTypes/reports';
import { ReportModuleContext } from '@/context/ReportModuleContext';
import { NoDataAvailable } from '@/components/Alert/Warning/NoDataAvailable';
import { DownloadReportContext } from '@/context/DownloadReportContext';


export const PortfolioAtRisk = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [searchQuery, setSearchQuery] = useState<string>('');
 
  const { setDetailedPortfolioAtRiskReportData } =
    useContext(ReportModuleContext);
  const { portfolioatRiskList = [], isLoading } = useGetAllPortfolioAtRisk({
    pageNumber,
    pageSize
  });

  const { setReportType, setExportData } = React.useContext(
    DownloadReportContext
  );

  const filteredPortfolioAtRiskList = portfolioatRiskList.filter(
    (product: IPortfolioAtRiskProduct) =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.productCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  React.useEffect(() => {
    setExportData(portfolioatRiskList as []);
    setReportType('PortfolioAtRiskProductList');
  }, [portfolioatRiskList, setExportData, setReportType]);

  if (isLoading) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={5} />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', marginTop: '50px' }}>
      <TopOverViewSection useBackButton />
      <Box
        sx={{
          marginTop: '30px',
          marginBottom: '30px',
          marginLeft: '20px',
          width: '100%'
        }}
      >
        <Grid container>
          <TextInput
            customStyle={{ width: '100%' }}
            label="Product Name/Code"
            name="Search"
            placeholder="Search for product code or name"
            icon={<SearchIcon />}
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
          />
        </Grid>

        <Grid container >
          <Box sx={{ marginTop: '10px' }}>
            {filteredPortfolioAtRiskList.length > 0 ? (
              filteredPortfolioAtRiskList.map(
                (product: IPortfolioAtRiskProduct, index) => (
                  <Box sx={{ width: '100%' }} key={index}>
                    <PortfolioCard
                      PortfolioOption={product}
                      link="/report/custom-report/portfolio-risk/individual-loan"
                      contextSetter={setDetailedPortfolioAtRiskReportData}
                    />
                  </Box>
                )
              )
            ) : (
              <Box sx={centraliseNoDataAvailable}>
                <Box mb={3} sx={{ width: '200px', height: '200px' }}>
                  <NoDataAvailable
                    message="No reports found"
                    width={200}
                    height={200}
                  />
                </Box>
              </Box>
            )}
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};
