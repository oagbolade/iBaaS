import React, { useCallback, useEffect, useState } from 'react';
import { Box, Grid, Typography, SelectChangeEvent } from '@mui/material';
import { Formik, Form } from 'formik';
import dayjs, { Dayjs } from 'dayjs';
import {
  LargeTitle,
  Details
} from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { FormTextInput, FormikDateTimePicker } from '@/components/FormikFields';
import colors from '@/assets/colors';
import { partialPayOffSchema } from '@/schemas/loan/index';
import { setPartialPayOffvalues } from '@/schemas/schema-values/loan';
import { usePartialPayOfflLoan } from '@/api/loans/useCreditFacility';
import {
  frequencyTermsDays,
  useCurrentBreakpoint,
  frequencyOptions
} from '@/utils';
import { FormSelectField } from '@/components/FormikFields/FormSelectField';

export const Balance = ({ amount }: { amount: string }) => (
  <Typography
    sx={{
      color: `${colors.activeBlue400}`,
      fontSize: '20px',
      fontWeight: 700,
      lineHeight: '32px',
      position: 'relative',
      bottom: '20px'
    }}
  >
    {amount}
  </Typography>
);

export const LoanPartialPayOff = ({
  accountNumber,
  settlementacct1,
  isSubmitting,
  setIsSubmitting,
  loanDetails
}: {
  accountNumber: string;
  settlementacct1: string;
  isSubmitting?: boolean;
  setIsSubmitting: (submit: boolean) => void;
  loanDetails: any;
}) => {
  const { mutate } = usePartialPayOfflLoan();
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const [loanBalance, setLoanBalance] = useState('0');
  const [newRate, setNewRate] = useState(loanDetails?.intrate);
  const [newLoanTerm, setNewLoanTerms] = useState(loanDetails?.loanterm);
  const [totalLoanDays, setTotalLoanDays] = useState(0);
  const [termFreq, setTermFrequency] = useState(loanDetails?.termfreq);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [maturityDate, setMaturitDate] = useState<Dayjs | null>(null);

  const calcTotalLoanDays = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = Number(e.target.value);
    setNewLoanTerms(inputValue);

    const selectedTermFrequency = frequencyTermsDays.find(
      (term) => term.label === termFreq
    ) || { value: '1' };

    const calculatedLoanDaysTotal =
      inputValue * Number(selectedTermFrequency.value);
    setTotalLoanDays(calculatedLoanDaysTotal);
  };

  useEffect(() => {
    setNewRate(loanDetails?.intrate);

    // Properly convert dates to dayjs objects
    setMaturitDate(loanDetails?.matdate ? dayjs(loanDetails.matdate) : null);
    setStartDate(loanDetails?.startdate ? dayjs(loanDetails.startdate) : null);

    setNewLoanTerms(loanDetails?.loanterm);
    setTotalLoanDays(loanDetails?.totaldays);

    const principal = Number(loanDetails?.principaldue) || 0;
    const interest = Number(loanDetails?.intInterestDue) || 0;
    const total = (principal + interest).toFixed(2).toString();
    setLoanBalance(total);
  }, [loanDetails]);

  useEffect(() => {
    const submit = document.getElementById('submitButton');
    if (isSubmitting) {
      submit?.click();
    }

    return () => {
      setIsSubmitting?.(false);
    };
  }, [isSubmitting, setIsSubmitting]);

  const handleDateChange = useCallback(() => {
    if (startDate) {
      const matDate = dayjs(startDate).add(totalLoanDays, 'day');
      setMaturitDate(matDate);
    }
  }, [startDate, totalLoanDays]);

  useEffect(() => {
    handleDateChange();
  }, [startDate, totalLoanDays, handleDateChange]);

  const handleChageTermFrequency = (e: SelectChangeEvent<any>) => {
    const selectedTermFrequency = frequencyTermsDays.find(
      (term) => term.label === e.target.value
    ) || { value: '1' };
    setTermFrequency(e.target.value);
    const calculatedLoanDaysTotal =
      newLoanTerm * Number(selectedTermFrequency.value);
    setTotalLoanDays(calculatedLoanDaysTotal);
    if (startDate) {
      const matDate = dayjs(startDate).add(calculatedLoanDaysTotal, 'day');
      setMaturitDate(matDate);
    }
  };

  const onSubmit = async (values: any) => {
    const {
      loanacct,
      settlementAcct,
      newrate,
      totalDays,
      newtenor,
      matdate,
      newprincipal,
      intoutst,
      intpayout,
      startdate,
      ...restValues
    } = values;

    const data = {
      loanacct: accountNumber,
      settlementAcct: settlementacct1,
      newrate: newRate,
      totalDays: totalLoanDays,
      newtenor: newLoanTerm,
      matdate: maturityDate?.format('YYYY-MM-DD'),
      startdate: startDate?.format('YYYY-MM-DD'),

      newprincipal: loanDetails?.principal,
      intoutst: loanDetails?.intoutst,
      intpayout: loanDetails?.intpayout,
      ...restValues
    };
    mutate(data);
    setIsSubmitting(false);
  };

  return (
    <Box>
      <Box>
        <LargeTitle title="Loan Partial Payoff" />
      </Box>

      <Box>
        <Formik
          initialValues={setPartialPayOffvalues}
          onSubmit={(values) => onSubmit(values)}
          validationSchema={partialPayOffSchema}
        >
          <Form>
            <Box mt={4}>
              <Grid container>
                <Grid
                  item={isTablet}
                  mobile={12}
                  width={{ mobile: '100%', tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="newrate"
                    placeholder="3.2"
                    label="New Rate (%)"
                    value={newRate}
                    onChange={(e) => {
                      setNewRate(e.target.value);
                    }}
                    required
                  />{' '}
                </Grid>

                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <Grid p={{ mobile: 2, desktop: 0 }} spacing={2} container>
                    <Grid item={isTablet} mobile={6} tablet={6}>
                      <FormTextInput
                        customStyle={{
                          width: setWidth(isMobile ? '140px' : '100%')
                        }}
                        name="newtenor"
                        placeholder="Enter Loan term"
                        label="Loan Term"
                        value={newLoanTerm}
                        onChange={(e) => calcTotalLoanDays(e)}
                        required
                      />{' '}
                    </Grid>

                    <Grid mt={3} item={isTablet} tablet={6} mobile={3}>
                      <FormSelectField
                        customStyle={{
                          width: setWidth(isMobile ? '350px' : '105%'),
                          fontSize: '14px'
                        }}
                        options={frequencyOptions}
                        name="freq"
                        value={termFreq}
                        label=""
                        onChange={(e) => handleChageTermFrequency(e)}
                      />{' '}
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  item={isTablet}
                  mobile={12}
                  width={{ mobile: '100%', tablet: '100%' }}
                >
                  <FormikDateTimePicker
                    label="Start Date"
                    name="startdate"
                    value={startDate ?? ''}
                    handleDateChange={(e: any) => {
                      setStartDate(e);
                    }}
                    required
                  />
                </Grid>

                <Grid
                  item={isTablet}
                  mobile={12}
                  width={{ mobile: '100%', tablet: '100%'}}
                >
                  <FormikDateTimePicker
                    label="Maturity Date"
                    name="matdate"
                    value={maturityDate ?? ''}
                    disabled
                    required
                  />
                </Grid>

                <Grid
                  item={isTablet}
                  mobile={12}
                  width={{ mobile: '100%', tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="totalDays"
                    placeholder="365"
                    label="Total Days"
                    value={String(totalLoanDays)}
                    disabled
                  />{' '}
                </Grid>

                <Grid
                  item={isTablet}
                  mobile={12}
                  width={{ mobile: '100%', tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="newprincipal"
                    placeholder="33,432,432"
                    label="Principal Outstanding"
                    value={loanDetails?.principaldue}
                    disabled
                  />{' '}
                </Grid>

                <Grid
                  item={isTablet}
                  mobile={12}
                  width={{ mobile: '100%', tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="intoutst"
                    placeholder="32,432"
                    label="Interest Outstanding"
                    value={loanDetails?.outStandingInt}
                    disabled
                  />{' '}
                </Grid>

                <Grid
                  item={isTablet}
                  mobile={12}
                  width={{ mobile: '100%', tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="penintoutst"
                    placeholder="32,432"
                    label="Penal Interest Outstanding"
                    required
                  />{' '}
                </Grid>

                <Grid
                  item={isTablet}
                  mobile={12}
                  width={{ mobile: '100%', tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="princpayout"
                    placeholder="1,432,532.53"
                    label="Principal Payout"
                    required
                  />{' '}
                </Grid>

                <Grid
                  item={isTablet}
                  mobile={12}
                  width={{ mobile: '100%', tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="intpayout"
                    placeholder="2,532.53"
                    label="Interest Payout"
                    value={loanDetails?.interestpaid}
                  />{' '}
                </Grid>

                <Grid
                  item={isTablet}
                  mobile={12}
                  width={{ mobile: '100%', tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="penintpayout"
                    placeholder="2,532.53"
                    label="Penal Interest Payout"
                    disabled
                    required
                  />{' '}
                </Grid>

                <Grid item={isTablet} mobile={12}>
                  <Box>
                    <Details title="Balance After" />
                    <Balance amount={loanBalance} />
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <button id="submitButton" type="submit" style={{ display: 'none' }}>
              submit alias
            </button>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};
