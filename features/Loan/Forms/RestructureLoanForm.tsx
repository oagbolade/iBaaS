/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import dayjs from 'dayjs';
import { InterestSection } from './InterestSection';
import { ContainerStyle } from './styles';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import {
  FormSelectField,
  FormTextInput,
  FormikDateTimePicker,
  FormikRadioButton
} from '@/components/FormikFields';
import { useCurrentBreakpoint, frequencyOptions } from '@/utils';
import { restructuredLoanSchema } from '@/schemas/loan/index';
import {
  SetRestructureLoanValues,
  ILoanAccDetails
} from '@/schemas/schema-values/loan';
import { useRestructureLoan } from '@/api/loans/useCreditFacility';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { getStoredUser } from '@/utils/user-storage';

const ACTION_OPTIONS = [
  { label: 'Add', value: '1' },
  { label: 'Write Off', value: '2' },
  { label: 'Partial Write Off', value: '3' }
];

export const RestructureLoanForm = ({
  isSubmitting,
  customerID,
  setIsSubmitting,
  loanDetails,
  repaymentTypes,
  loansources,
  collaterals,
  accountNumber,
  settlementAccount,
  productCode,
  branchCode
}: {
  customerID: string;
  isSubmitting?: boolean;
  setIsSubmitting: (submit: boolean) => void;
  loanDetails: ILoanAccDetails;
  repaymentTypes: any;
  loansources: any;
  collaterals: any;
  accountNumber: string;
  settlementAccount: string;
  productCode: string;
  branchCode: string;
}) => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const { mutate } = useRestructureLoan();
  const { mappedLoanRepayment, mappedLoansources, mappedLoanCollateral } =
    useMapSelectOptions({
      repaymentTypes,
      loansources,
      collaterals
    });

  const user = getStoredUser();
  const userLoanMenuid = Array.isArray(user?.menuItems)
    ? user.menuItems.find((resp: any) => resp.menu_id === 57)
    : null;

  const onSubmit = async (values: any) => {
    const data = {
      ...values,
      customerid: customerID,
      prodcode: productCode, // loanDetails.productcode,
      branchcode: branchCode, //  loanDetails?.branchCode,
      menuId: String(userLoanMenuid?.menu_id)
    };
    mutate(data);
    setIsSubmitting(false);
  };

  useEffect(() => {
    const submit = document.getElementById('submitButton');
    if (isSubmitting) {
      submit?.click();
    }

    return () => {
      setIsSubmitting?.(false);
    };
  }, [isSubmitting, setIsSubmitting]);

  // Add state to track selected restructure type
  const [selectedRestructureType, setSelectedRestructureType] = useState('1');

  // Add handler for radio button change
  const handleRestructureTypeChange = (value: string) => {
    setSelectedRestructureType(value);
  };

  return (
    <Box>
      <Box>
        <LargeTitle title="Restructure Loan" />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' }
        }}
      >
        <Formik
          initialValues={{
            ...SetRestructureLoanValues,
            restructureType: selectedRestructureType,
            days: loanDetails.totaldays,
            loanAccno: accountNumber,
            settlementAccno: settlementAccount,
            prodcode: loanDetails.productName,
            source: loanDetails?.loanSourceName,
            newPrincipal: '',
            amt_To_Liquidate: '',
            interestRate: loanDetails.intRate,
            term: loanDetails.loanTerm,
            termFreq: loanDetails.frequencyName,
            calcmethod: '',
            repaytype: '',
            postdate: '',
            collateralType: '',
            collateralvalue: loanDetails.collvalue,
            startdate: dayjs(loanDetails.startdate),
            drawdown: '',
            matdate: dayjs(loanDetails.matdate),
            firstdate: '',
            moratarium: '',
            moratatriumtype: '',
            takecharge: '',
            narration: 'loan restructure',
            outstandingPrincipal: loanDetails.loanAmount,
            outstandingInterest: loanDetails.out_Interest,
            outstandingPenalInterest: loanDetails.out_penal
          }}
          onSubmit={(values) => onSubmit(values)}
          validationSchema={restructuredLoanSchema}
          enableReinitialize
        >
          <Form>
            <Box mt={4}>
              <Grid container>
                <Grid my={2} item={isTablet} mobile={12}>
                  <FormikRadioButton
                    options={[
                      { label: 'Full Liquidation', value: '1' },
                      { label: 'Restructure', value: '3' }
                    ]}
                    title="Please select"
                    name="restructureType"
                    value="1"
                    handleCheck={(value: boolean) =>
                      handleRestructureTypeChange(value ? '1' : '3')
                    }
                  />
                </Grid>

                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="loanAccno"
                    placeholder="Loan Account Number"
                    label="Loan Account Number"
                    disabled
                  />{' '}
                </Grid>

                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="prodcode"
                    placeholder="Select loan product"
                    label="Loan Product"
                    disabled
                  />{' '}
                </Grid>

                <Grid item={isTablet} mobile={12}>
                  <FormSelectField
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%'),
                      fontSize: '14px'
                    }}
                    options={mappedLoansources}
                    label="Loan Source"
                    name="source"
                    required
                  />{' '}
                </Grid>

                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="settlementAccno"
                    placeholder="Settlement Account"
                    label="Settlement Account"
                    disabled
                    required
                  />{' '}
                </Grid>

                <Box sx={ContainerStyle}>
                  <Grid container>
                    <Grid item={isTablet} mobile={12}>
                      <FormTextInput
                        name="outstandingPrincipal"
                        label="Outstanding Principal"
                        disabled
                      />
                    </Grid>

                    <Grid my={2} item={isTablet} mobile={12}>
                      <FormikRadioButton
                        options={ACTION_OPTIONS}
                        title="Actions"
                        name="principalWriteOff_Type"
                        value="0"
                      />
                    </Grid>

                    <Grid item={isTablet} mobile={12}>
                      <FormTextInput
                        name="principal_To_WriteOff"
                        placeholder=""
                        label="Add Value"
                      />
                    </Grid>

                    <Grid item={isTablet} mobile={12}>
                      <FormTextInput
                        name="PrincipalWriteOff_GL"
                        placeholder=""
                        label="Enter GL Account"
                        required
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={ContainerStyle}>
                  <Grid container>
                    <Grid item={isTablet} mobile={12}>
                      <FormTextInput
                        name="outstandingInterest"
                        label="Accrued Interest"
                        disabled
                      />
                    </Grid>

                    <Grid my={2} item={isTablet} mobile={12}>
                      <FormikRadioButton
                        options={ACTION_OPTIONS}
                        title="Actions"
                        name="interestlWriteOff_Type"
                        value="0"
                      />
                    </Grid>

                    <Grid item={isTablet} mobile={12}>
                      <FormTextInput
                        name="interest_To_WriteOff"
                        placeholder=""
                        label="Add Value"
                      />
                    </Grid>

                    <Grid item={isTablet} mobile={12}>
                      <FormTextInput
                        name="InterestWriteOff_GL"
                        placeholder=""
                        label="Enter GL Account"
                        required
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={ContainerStyle}>
                  <Grid container>
                    <Grid item={isTablet} mobile={12}>
                      <FormTextInput
                        name="outstandingPenalInterest"
                        label="Accrued Panel Interest"
                        disabled
                      />
                    </Grid>

                    <Grid my={2} item={isTablet} mobile={12}>
                      <FormikRadioButton
                        options={ACTION_OPTIONS}
                        title="Actions"
                        name="penalWriteOff_Type"
                        value="0"
                      />
                    </Grid>

                    <Grid item={isTablet} mobile={12}>
                      <FormTextInput
                        name="penal_To_WriteOff"
                        placeholder=""
                        label="Add Value"
                      />
                    </Grid>

                    <Grid item={isTablet} mobile={12}>
                      <FormTextInput
                        name="PenalWriteOff_GL"
                        placeholder=""
                        label="Enter GL Account"
                        required
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="newPrincipal"
                    placeholder=""
                    label="New Principal"
                    required
                  />{' '}
                </Grid>

                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="amt_To_Liquidate"
                    placeholder=""
                    label="Amount to liquidate"
                    required
                  />{' '}
                </Grid>

                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="interestRate"
                    placeholder=""
                    label="Loan Rate (%)"
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
                        name="term"
                        placeholder="Enter Loan term"
                        label="Loan Term"
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
                        name="termFreq"
                        label=""
                      />{' '}
                    </Grid>
                  </Grid>
                </Grid>

                <Grid my={2} item={isTablet} mobile={12}>
                  <FormikRadioButton
                    options={[
                      { label: 'Flat Rate', value: '1' },
                      { label: 'Annualise', value: '0' }
                    ]}
                    title="Calculation Method"
                    name="calcmethod"
                    value="1"
                  />
                </Grid>

                <Grid item={isTablet} mobile={12}>
                  <FormSelectField
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%'),
                      fontSize: '14px'
                    }}
                    options={mappedLoanRepayment}
                    label="Repayment Type"
                    name="repaytype"
                  />{' '}
                </Grid>

                <Grid
                  item={isTablet}
                  mobile={12}
                  mb={2}
                  width={{ mobile: '560px' }}
                >
                  <FormikDateTimePicker label="Posting Date" name="postdate" />
                </Grid>

                <Grid item={isTablet} mobile={12}>
                  <FormSelectField
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%'),
                      fontSize: '14px'
                    }}
                    options={mappedLoanCollateral}
                    label="Collateral Type"
                    name="collateralType"
                    required
                  />{' '}
                </Grid>

                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="collateralvalue"
                    placeholder="1,432,532.53"
                    label="Collateral Value"
                    required
                  />{' '}
                </Grid>

                <Grid
                  item={isTablet}
                  mobile={12}
                  mb={2}
                  width={{ mobile: '560px' }}
                >
                  <FormikDateTimePicker label="Start Date" name="startdate" />
                </Grid>

                <Grid
                  item={isTablet}
                  mobile={12}
                  mb={2}
                  width={{ mobile: '560px' }}
                >
                  <FormikDateTimePicker
                    label="Drawn-down Date"
                    name="drawdown"
                  />
                </Grid>

                <Grid
                  item={isTablet}
                  mobile={12}
                  mb={2}
                  width={{ mobile: '560px' }}
                >
                  <FormikDateTimePicker label="Maturity Date" name="matdate" />
                </Grid>

                <Grid
                  item={isTablet}
                  mobile={12}
                  mb={2}
                  width={{ mobile: '560px' }}
                >
                  <FormikDateTimePicker
                    label="First Payment Date"
                    name="firstdate"
                  />
                </Grid>

                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="moratarium"
                    placeholder="Please enter"
                    label="Moratorium"
                    required
                  />{' '}
                </Grid>

                <Grid item={isTablet} mobile={12}>
                  <FormSelectField
                    name="moratatriumtype"
                    options={[
                      {
                        name: 'Interest and Principle',
                        value: '0'
                      },
                      {
                        name: 'Principle only',
                        value: '1'
                      },
                      {
                        name: 'Interest only',
                        value: '2'
                      }
                    ]}
                    label="Moratorium Type"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>

                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="narration"
                    placeholder="Please enter"
                    label="Narration"
                    required
                  />{' '}
                </Grid>

                <Grid my={2} item={isTablet} mobile={12}>
                  <FormikRadioButton
                    options={[
                      { label: 'Yes', value: '1' },
                      { label: 'No', value: '0' }
                    ]}
                    title="Will there be charges?"
                    name="takecharge"
                    value=""
                  />
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
