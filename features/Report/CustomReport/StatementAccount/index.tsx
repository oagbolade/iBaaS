'use client';
import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import AnimateHeight, { Height } from 'react-animate-height';
import { FilterSection } from './FilterSection';
import { COLUMN } from './COLUMNS';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Details,
  SubTitle,
} from './AccountDetailsAccordion';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { useGetBranches } from '@/api/general/useBranches';
import { ISearchParams } from '@/app/api/search/route';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import {
  useGetAccountDetails,
  useGetAllCustomerAccountProducts,
} from '@/api/customer-service/useCustomer';
import { MuiTableContainer } from '@/components/Table';
import { renderEmptyTableBody, StyledTableRow } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { ChevronDown } from '@/assets/svg';
import { encryptData } from '@/utils/encryptData';
import { useGetStatementOfAccount } from '@/api/reports/useStatementOfAccount';
import { FormSkeleton } from '@/components/Loaders';
import { useGetProductType } from '@/api/general/useProductType';
import { IProductType } from '@/api/ResponseTypes/general';
import { useGetProductClass } from '@/api/setup/useProduct';
import { IProducts } from '@/api/ResponseTypes/setup';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

export const StatementAccount = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState<Height>('auto');
  const expandRef = React.useRef(null);
  const [expanded, setExpanded] = useState(true);
  const { branches } = useGetBranches();
  const { bankproducts } = useGetAllCustomerAccountProducts();
  const { setDirection } = useSetDirection();
  const { productTypes } = useGetProductType();
  const { products } = useGetProductClass();
  const { dateValue, isDateFilterApplied } = React.useContext(
    DateRangePickerContext,
  );
  const { setExportData, setReportType, setReportQueryParams } =
    React.useContext(DownloadReportContext);
  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage,
  } = usePersistedSearch<ISearchParams>('statement-of-account');
  const [accountNumber, setAccountNumber] = useState('');
  const [productCode, setProductCode] = useState('');

  const { accDetailsResults, isLoading: loadingDetails } = useGetAccountDetails(
    accountNumber ? (encryptData(accountNumber) as string) : '',
  );

  const { rptStatementList, isLoading: loadingStatements } =
    useGetStatementOfAccount(searchParams);

  useEffect(() => {
    if (searchActive && accDetailsResults) {
      setHeight('auto');
      setIsOpen(true);
    }
  }, [searchActive, accDetailsResults]);

  useEffect(() => {
    if (rptStatementList && rptStatementList?.pagedRecords.length > 0) {
      setExportData?.(rptStatementList?.pagedRecords);
      setReportType('StatementOfAccount');
    }
  }, [rptStatementList, searchParams, setExportData, setReportType]);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
    setHeight(isOpen ? 0 : 'auto');
  };

  const handleSearch = async (params: ISearchParams) => {
    if (!params.accountNumber) return;
    setSearchActive(true);
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

      <div className="mx-5 mt-8">
        {branches && products && (
          <FilterSection
            branches={branches}
            bankproducts={bankproducts || []}
            onSearch={handleSearch}
            products={products as IProducts[]}
          />
        )}
      </div>

      {searchActive && (
        <div>
          {(() => {
            if (loadingDetails) {
              return (
                <div className="mx-5">
                  <FormSkeleton noOfLoaders={3} />
                </div>
              );
            }
            if (accDetailsResults) {
              return (
                <Accordion
                  sx={{ width: { mobile: '100%', desktop: '100%' } }}
                  expanded
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
                          padding: {
                            mobile: '10px 17px',
                            desktop: '20px 32px',
                          },
                        }}
                      >
                        <Grid
                          item
                          mobile={12}
                          tablet={3}
                          justifyContent="center"
                        >
                          <SubTitle title="Account Name" />
                          <Details
                            title={accDetailsResults.accounttitle || 'N/A'}
                          />
                        </Grid>

                        <Grid
                          item
                          mobile={12}
                          tablet={3}
                          justifyContent="center"
                        >
                          <SubTitle title="Account Number" />
                          <Details
                            title={accDetailsResults.accountnumber || 'N/A'}
                          />
                        </Grid>

                        <Grid
                          item
                          mobile={12}
                          tablet={3}
                          justifyContent="center"
                        >
                          <SubTitle title="Opening Balance" />
                          <Details title="N/A" />
                        </Grid>

                        <Grid
                          item
                          mobile={12}
                          tablet={3}
                          justifyContent="center"
                        >
                          <SubTitle title="Closing Balance" />
                          <Details title="N/A" />
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
                              <Details
                                title={accDetailsResults.holdBal || 'N/A'}
                              />
                            </Grid>

                            <Grid
                              item
                              mobile={12}
                              tablet={3}
                              justifyContent="center"
                            >
                              <SubTitle title="Total COT" />
                              <Details title="N/A" />
                            </Grid>

                            <Grid
                              item
                              mobile={12}
                              tablet={3}
                              justifyContent="center"
                            >
                              <SubTitle title="Total VAT" />
                              <Details title="N/A" />
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
                            {isOpen
                              ? 'close more details'
                              : 'view more details'}
                          </Typography>
                          <Box
                            mt={0}
                            sx={{
                              transform: isOpen
                                ? 'rotate(180deg)'
                                : 'rotate(0deg)',
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
              );
            }
            return (
              <div className="mx-5">
                {renderEmptyTableBody(accDetailsResults)}
              </div>
            );
          })()}
        </div>
      )}

      <div className="mx-5">
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
            {searchActive && rptStatementList ? (
              rptStatementList?.pagedRecords?.map((statement, index) => (
                <StyledTableRow key={`${statement.accountnumber || index}`}>
                  <StyledTableCell component="th" scope="row">
                    {statement.trandate}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {statement.narration}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {statement.refNo}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {statement.enddate}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {statement.debit}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {statement?.credit || 'N/A'}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {statement.bkBalance || '0.0'}
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
      </div>
    </Box>
  );
};
