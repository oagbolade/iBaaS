'use client';
import React, { useContext, useEffect } from 'react';
import { Box } from '@mui/material';
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
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { ISearchParams } from '@/app/api/search/route';

export const PortfolioAtRisk = () => {
  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage,
  } = usePersistedSearch<ISearchParams>('portfolio-at-risk');

  const { setDetailedPortfolioAtRiskReportData } =
    useContext(ReportModuleContext);
  const { setReportType, setExportData } = useContext(DownloadReportContext);

  const pageSize = 20;

  const { portfolioatRiskList = [], isLoading } = useGetAllPortfolioAtRisk({
    pageNumber: page,
    pageSize,
  });

  useEffect(() => {
    setExportData(portfolioatRiskList as []);
    setReportType('PortfolioAtRiskProductList');
  }, [portfolioatRiskList, setExportData, setReportType]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchParams({ search: value });
    setSearchActive(true);
  };

  const filteredPortfolioAtRiskList = portfolioatRiskList.filter(
    (product: IPortfolioAtRiskProduct) =>
      product.productName
        .toLowerCase()
        .includes(searchParams?.search?.toLowerCase() || '') ||
      product.productCode
        .toLowerCase()
        .includes(searchParams?.search?.toLowerCase() || ''),
  );

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
          width: '100%',
        }}
      >
        <TextInput
          customStyle={{ width: '100%' }}
          label="Product Name/Code"
          name="Search"
          placeholder="Search for product code or name"
          icon={<SearchIcon />}
          value={searchParams?.search || ''}
          onChange={handleSearchChange}
        />
      </Box>

      <Box sx={{ marginTop: '10px' }}>
        {filteredPortfolioAtRiskList.length > 0 ? (
          filteredPortfolioAtRiskList.map(
            (product: IPortfolioAtRiskProduct, index) => (
              <Box key={index}>
                <PortfolioCard
                  PortfolioOption={product}
                  link="/report/custom-report/portfolio-risk/individual-loan"
                  contextSetter={setDetailedPortfolioAtRiskReportData}
                />
              </Box>
            ),
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
    </Box>
  );
};
