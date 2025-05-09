'use client';
import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { useGetBranches } from '@/api/general/useBranches';
import { FilterSection } from './FilterSection';
import { ISearchParams } from '@/app/api/search/route';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import {
  useGetAccountDetails,
  useGetAllCustomerAccountProducts,
} from '@/api/customer-service/useCustomer';
import { MuiTableContainer } from '@/components/Table';
import { COLUMN } from './COLUMNS';
import { renderEmptyTableBody, StyledTableRow } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Details,
  SubTitle,
} from './AccountDetailsAccordion';
import AnimateHeight, { Height } from 'react-animate-height';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { ChevronDown } from '@/assets/svg';
import { useSearchParams } from 'next/navigation';
import { encryptData } from '@/utils/encryptData';
import { useGetStatementOfAccount } from '@/api/reports/useStatementOfAccount';
import { FormSkeleton } from '@/components/Loaders';

export const StatementAccount = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState<Height>('auto');
  const expandRef = React.useRef(null);
  const [expanded, setExpanded] = useState(true);
  const { branches } = useGetBranches();
  const { bankproducts } = useGetAllCustomerAccountProducts();
  const { setDirection } = useSetDirection();

  const { dateValue, isDateFilterApplied } = React.useContext(
    DateRangePickerContext,
  );
  const { setExportData, setReportType, setReportQueryParams } =
    React.useContext(DownloadReportContext);
  const [search, setSearch] = useState(false);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [productCode, setProductCode] = useState('');

  const { accDetailsResults, isLoading: loadingDetails } = useGetAccountDetails(
    accountNumber ? (encryptData(accountNumber) as string) : '',
  );

  const { rptStatementList, isLoading: loadingStatements } =
    useGetStatementOfAccount(searchParams);

  useEffect(() => {
    if (search && accDetailsResults) {
      setHeight('auto');
      setIsOpen(true);
    }
  }, [search, accDetailsResults]);

  useEffect(() => {
    if (rptStatementList && rptStatementList?.pagedRecords.length > 0) {
      setExportData?.(rptStatementList?.pagedRecords);
      setReportType('StatementOfAccount');
    }
  }, [
    rptStatementList,
    searchParams,
    setExportData,
    setReportType,
    // setReportQueryParams,
  ]);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
    setHeight(isOpen ? 0 : 'auto');
  };

  const handleSearch = async (params: ISearchParams) => {
    if (!params.accountNumber) return;
    setSearch(true);
    setAccountNumber(params.accountNumber);
    setProductCode(params.accttype || '');

    const queryParams: ISearchParams = {
      accountNumber: params.accountNumber,
      productCode: params.accttype,
      branchID: params.branchID,
      startDate: dateValue[0]?.format('YYYY-MM-DD') || '',
      endDate: dateValue[1]?.format('YYYY-MM-DD') || '',
      page,
      getAll: false,
    };

    setSearchParams(queryParams);
  };

  return (
    <Box sx={{ marginTop: '50px', width: '100%' }}>
      <TopOverViewSection useBackButton />

      <Box sx={{ marginTop: '30px', padding: '0 25px' }}>
        {branches && (
          <FilterSection
            branches={branches}
            bankproducts={bankproducts || []}
            onSearch={handleSearch}
          />
        )}
      </Box>

      {search && (
        <Box sx={{ margin: '20px 0' }}>
          {loadingDetails ? (
            <Box sx={{ padding: '20px', textAlign: 'center' }}>
              <FormSkeleton noOfLoaders={3} />
            </Box>
          ) : accDetailsResults ? (
            <Accordion
              sx={{ width: { mobile: '100%', desktop: '100%' } }}
              expanded={true}
            >
              <AccordionDetails>
                <AnimateHeight
                  id="account-details-panel"
                  duration={350}
                  height={height}
                >
                  <Grid
                    container
                    spacing={2}
                    sx={{
                      padding: { mobile: '10px 17px', desktop: '20px 32px' },
                    }}
                  >
                    <Grid item mobile={12} tablet={3} justifyContent="center">
                      <SubTitle title="Account Name" />
                      <Details
                        title={accDetailsResults.accounttitle || 'N/A'}
                      />
                    </Grid>

                    <Grid item mobile={12} tablet={3} justifyContent="center">
                      <SubTitle title="Account Number" />
                      <Details
                        title={accDetailsResults.accountnumber || 'N/A'}
                      />
                    </Grid>

                    <Grid item mobile={12} tablet={3} justifyContent="center">
                      <SubTitle title="Opening Balance" />
                      <Details title={'N/A'} />
                    </Grid>

                    <Grid item mobile={12} tablet={3} justifyContent="center">
                      <SubTitle title="Closing Balance" />
                      <Details title={'N/A'} />
                    </Grid>

                    {isOpen && (
                      <>
                        <Grid
                          item
                          mobile={12}
                          tablet={3}
                          justifyContent="center"
                        >
                          <SubTitle title="Uncleared Balance" />
                          <Details title={accDetailsResults.holdBal || 'N/A'} />
                        </Grid>

                        <Grid
                          item
                          mobile={12}
                          tablet={3}
                          justifyContent="center"
                        >
                          <SubTitle title="Total COT" />
                          <Details title={'N/A'} />
                        </Grid>

                        <Grid
                          item
                          mobile={12}
                          tablet={3}
                          justifyContent="center"
                        >
                          <SubTitle title="Total VAT" />
                          <Details title={'N/A'} />
                        </Grid>

                        <Grid
                          item
                          mobile={12}
                          tablet={3}
                          justifyContent="center"
                        >
                          <SubTitle title="DR Rate" />
                          <Details
                            title={accDetailsResults.dintrate || 'N/A'}
                          />
                        </Grid>

                        <Grid
                          item
                          mobile={12}
                          tablet={3}
                          justifyContent="center"
                        >
                          <SubTitle title="CR Rate" />
                          <Details
                            title={accDetailsResults.cintrate || 'N/A'}
                          />
                        </Grid>
                      </>
                    )}
                  </Grid>
                </AnimateHeight>

                <AccordionSummary>
                  <IconButton onClick={handleClick}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography mr={1} sx={{ textAlign: 'center' }}>
                        Click to{' '}
                        {isOpen ? 'close more details' : 'view more details'}
                      </Typography>
                      <Box
                        mt={0}
                        sx={{
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease',
                        }}
                      >
                        <ChevronDown />
                      </Box>
                    </Stack>
                  </IconButton>
                </AccordionSummary>
              </AccordionDetails>
            </Accordion>
          ) : (
            <Box sx={{ padding: '20px', textAlign: 'center' }}>
              {renderEmptyTableBody(accDetailsResults)}
            </Box>
          )}
        </Box>
      )}

      <Box sx={{ padding: '25px', width: '100%' }}>
        {loadingStatements ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <MuiTableContainer
            columns={COLUMN}
            data={rptStatementList?.pagedRecords}
            showSearch
            setPage={setPage}
            page={page}
          >
            {search && rptStatementList ? (
              rptStatementList?.pagedRecords?.map((statement, index) => (
                <StyledTableRow key={`${statement.accountnumber || index}`}>
                  <StyledTableCell component="th" scope="row">
                    {'N/A'}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {'N/A'}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {'N/A'}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {'N/A'}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {'N/A'}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {'N/A'}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {'N/A'}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell
                  colSpan={COLUMN.length + 1}
                  component="th"
                  scope="row"
                >
                  {renderEmptyTableBody(rptStatementList?.pagedRecords)}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </MuiTableContainer>
        )}
      </Box>
    </Box>
  );
};
