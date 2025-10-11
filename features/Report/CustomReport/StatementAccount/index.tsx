'use client';
import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import AnimateHeight, { Height } from 'react-animate-height';
import moment from 'moment';
import { FilterSection } from './FilterSection';
import { COLUMN } from './COLUMNS';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Details,
  SubTitle
} from './AccountDetailsAccordion';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { useGetBranches } from '@/api/general/useBranches';
import { ISearchParams } from '@/app/api/search/route';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { useGetAccountDetails } from '@/api/customer-service/useCustomer';
import { MuiTableContainer } from '@/components/Table';
import { renderEmptyTableBody, StyledTableRow } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { ChevronDown } from '@/assets/svg';
import { encryptData } from '@/utils/encryptData';
import { useGetStatementOfAccount } from '@/api/reports/useStatementOfAccount';
import { FormSkeleton } from '@/components/Loaders';
import { useGetProductClass } from '@/api/setup/useProduct';
import { IProducts } from '@/api/ResponseTypes/setup';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';
import { formatDateAndTime } from '@/utils/hooks/useDateFormat';

export const StatementAccount = () => {
  const { isLoading } = useGlobalLoadingState();
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState<Height>('auto');
  const [expanded, setExpanded] = useState(true);
  const { branches } = useGetBranches();
  const { products } = useGetProductClass();

  const selectedProduct = products?.filter(
    (product): product is IProducts =>
      typeof (product as IProducts).prodclass !== 'undefined' &&
      (product as IProducts).prodclass !== '99' // this is gl transaction
  );

  const { dateValue } = React.useContext(DateRangePickerContext);
  const { setExportData, setReportType, setReportQueryParams } =
    React.useContext(DownloadReportContext);

  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<ISearchParams>('statement-of-account');
  const [accountNumber, setAccountNumber] = useState('');
  const [productCode, setProductCode] = useState('');

  const { accDetailsResults, isLoading: loadingDetails } = useGetAccountDetails(
    accountNumber ? (encryptData(accountNumber) as string) : ''
  );

  const { rptStatementList, isLoading: loadingStatements } =
    useGetStatementOfAccount(searchParams);

  const { rptStatementList: downloadData } = useGetStatementOfAccount({
    ...searchParams,
    getAll: true
  });

  useEffect(() => {
    if (searchActive && accDetailsResults) {
      setHeight('auto');
      setIsOpen(true);
    }
  }, [searchActive, accDetailsResults]);

  useEffect(() => {
    if (!downloadData || downloadData?.pagedRecords.length === 0) {
      setExportData?.([]);
      return;
    }

    if (downloadData && downloadData?.pagedRecords.length > 0) {
      setExportData?.(downloadData?.pagedRecords);
      const isTD =
        productCode && ['TD', 'FD'].some((code) => productCode.includes(code));
      setReportType(isTD ? 'StatementOfAccountTD' : 'StatementOfAccountCASA');
    }
  }, [downloadData]);

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
      getAll: false
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
            onSearch={handleSearch}
            products={selectedProduct as IProducts[]}
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
                            desktop: '20px 32px'
                          }
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
                            className=" overflow-hidden text-ellipsis block w-64"
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
                              transition: 'transform 0.3s ease'
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
        {isLoading || loadingStatements ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <MuiTableContainer
            columns={COLUMN}
            data={rptStatementList?.pagedRecords}
            showSearch
            setPage={setPage}
            page={page}
            tableConfig={{
              hasActions: false
            }}
          >
            {searchActive && rptStatementList ? (
              rptStatementList?.pagedRecords?.map((statement, index) => (
                <StyledTableRow key={`${statement.accountnumber || index}`}>
                  <StyledTableCell component="th" scope="row">
                    {statement.trandate
                      ? moment(statement.trandate).format(
                          'MMMM Do YYYY, h:mm:ss a'
                        )
                      : 'N/A'}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    <span className=" overflow-hidden text-ellipsis block w-64">
                      {statement.narration}
                    </span>
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {statement.refNo}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {formatDateAndTime(statement?.enddate)}
                  </StyledTableCell>
                  
                  <StyledTableCell component="th" scope="row">
                    {statement?.debit
                      ? `NGN ${formatCurrency(statement.debit)}`
                      : '0.0'}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {statement?.credit
                      ? `NGN ${formatCurrency(statement.credit)}`
                      : '0.0'}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {statement?.bkBalance
                      ? `NGN ${formatCurrency(statement.bkBalance)}`
                      : '0.0'}
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
