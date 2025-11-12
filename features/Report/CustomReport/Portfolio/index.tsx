'use client';
import React, { useContext, useState } from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { centraliseNoDataAvailable } from '../style';
import { FilterSection } from './FilterSection';
import { PortfolioCard } from './PortfolioCards';
import { useGetBranches } from '@/api/general/useBranches';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { ISearchParams } from '@/app/api/search/route';
import { TextInput } from '@/components/FormikFields';
import { useGetAllPortfolioAtRisk } from '@/api/reports/useGetAllPortfolioAtRisk';
import { FormSkeleton } from '@/components/Loaders';
import { IPortfolioAtRiskProduct } from '@/api/ResponseTypes/reports';
import { ReportModuleContext } from '@/context/ReportModuleContext';
import { NoDataAvailable } from '@/components/Alert/Warning/NoDataAvailable';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { TopOverViewSingeCalendarSection } from '@/features/Report/Overview/TopOverViewSingleCalenderSection';

export const PortfolioAtRisk = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { branches } = useGetBranches();

  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<ISearchParams>('plain-trial-balance');

  const { setDetailedPortfolioAtRiskReportData } =
    useContext(ReportModuleContext);
  const { portfolioatRiskList = [], isLoading } = useGetAllPortfolioAtRisk({
    pageNumber,
    pageSize
  });

  const { portfolioatRiskList: downloadData = [] } = useGetAllPortfolioAtRisk({
    pageNumber,
    pageSize,
    getAll: true
  });

  const { setReportType, setExportData } = React.useContext(
    DownloadReportContext
  );

  const filteredPortfolioAtRiskList = portfolioatRiskList.filter(
    (product: IPortfolioAtRiskProduct) =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.productCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDownloadData = downloadData.filter(
    (product: IPortfolioAtRiskProduct) =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.productCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  React.useEffect(() => {
    if (!downloadData || downloadData?.length === 0) {
      // setExportData([]);
      return;
    }

    setExportData(downloadData as []);
    setReportType('PortfolioAtRiskProductList');
  }, [downloadData, filteredDownloadData, setExportData, setReportType]);

  if (isLoading) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={5} />
      </Box>
    );
  }

  const handleSearch = async (params: ISearchParams | null) => {
    setSearchActive(true);
    setSearchParams(params);
  };
  return (
    <Box sx={{ width: '100%', marginTop: '60px' }}>
      <TopOverViewSingeCalendarSection />

      <Box
        sx={{
          marginTop: '30px',
          paddingX: '24px'
        }}
      >
        <Grid>
          {/* This is commented to be discuss with the backend later */}
          {/* {branches && (
            <FilterSection branches={branches} onSearch={handleSearch} />
          )} */}

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

        <Box sx={{ marginTop: '10px' }}>
          {filteredPortfolioAtRiskList.length > 0 ? (
            filteredPortfolioAtRiskList.map(
              (product: IPortfolioAtRiskProduct, index) => (
                <Box sx={{ width: '100%' }} key={index}>
                  <PortfolioCard
                    PortfolioOption={product}
                    link={`/report/custom-report/portfolio-risk/individual-loan?productCode=${product.productCode}&productName=${product.productName}&branchCode=${product.branch}`}
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
      </Box>
    </Box>
  );
};
