import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import { InterestSection } from './InterestSection';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import {
  FormSelectField,
  FormTextInput,
  TextFieldArea,
  FormikDateTimePicker,
  FormikRadioButton
} from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import { restructuredLoanSchema } from '@/schemas/loan/index';
import {
  SetRestructureLoanValues,
  ILoanAccDetails
} from '@/schemas/schema-values/loan';
import { useRestructureLoan } from '@/api/loans/useCreditFacility';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { getStoredUser } from '@/utils/user-storage';
import dayjs from 'dayjs';
import { frequencyOptions } from '@/utils';


export const RestructureLoanForm = ({
  accountNumber,
  settlementacct1,
  isSubmitting,
  customerID,
  setIsSubmitting,
  loanDetails,
  repaymentTypes,
  loansources,
  collaterals
}: {
  accountNumber: string;
  settlementacct1: string;
  customerID: string;
  isSubmitting?: boolean;
  setIsSubmitting: (submit: boolean) => void;
  loanDetails: ILoanAccDetails;
  repaymentTypes: any;
  loansources: any;
  collaterals: any;
}) => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const { mutate } = useRestructureLoan();
  const [loanDetail, setLoanDetail] = useState<ILoanAccDetails>(loanDetails);
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
    const {
      customerid,
      settlementAccno,
      loanAccno,
      prodcode,
      branchcode,
      menuId,
      PenalWriteOff_GL,
      InterestWriteOff_GL,
      PrincipalWriteOff_GL,
      outstandingPrincipal,
      ...restValues
    } = values;

    const data = {
      customerId: customerID,
      settlementAccno: settlementacct1,
      loanAccno: accountNumber,
      prodcode: loanDetail.productcode,
      branchcode: loanDetail?.branchCode,
      menuId: userLoanMenuid?.menu_id,
      outstandingPrincipal : Number(loanDetail?.outstandingPrincipal),
      PenalWriteOff_GL,
      InterestWriteOff_GL,
      PrincipalWriteOff_GL,
      ...restValues
    };
    console.log(data);
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
  }


  
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
            ...loanDetail,
            source: loanDetail?.loanSourceCode,
            collateraltype: loanDetail?.collateralType,
            collateralvalue: loanDetail?.collateralValue,
            restructureType: selectedRestructureType,
          }}
          onSubmit={(values) => onSubmit(values)}
          validationSchema={restructuredLoanSchema}
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
                    value='1'
                    handleCheck={(value: boolean) => handleRestructureTypeChange(value ? '1' : '3')}
                  />
                </Grid>


                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="loanAccno"
                    placeholder="95858483382"
                    label="Loan Account Number"
                    value={accountNumber}
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
                    value={loanDetail?.productname}
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
                    value={loanDetail?.loanSourceCode}
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
                    placeholder="95858483382"
                    value={settlementacct1}
                    label="Settlement Account"
                    disabled
                    required
                  />{' '}
                </Grid>




                <InterestSection
                  label="Outstanding Principal"
                  placeholder=""
                  sectionName='outstandingPrincipal'
                  writeOffValue="principal_To_WriteOff"
                  writeOffActionType="principalWriteOff_Type"
                  restructureType={selectedRestructureType}
                  glAccountNumber="principalWriteOff_GL"
                  sectionValue={loanDetail?.principaldue}
                />



                <InterestSection
                  label="Accrued Interest"
                  placeholder=""
                  writeOffValue='interest_To_WriteOff'
                  writeOffActionType='interestlWriteOff_Type'
                  sectionName='outstandingInterest'
                  restructureType={selectedRestructureType}
                  glAccountNumber='interestWriteOff_GL'
                  sectionValue={loanDetail?.accruedInterest}
                />



                <InterestSection
                  label="Accrued Panel Interest"
                  placeholder=""
                  writeOffValue='penal_To_WriteOff'
                  writeOffActionType='penalWriteOff_Type'
                  sectionName='outstandingPenalInterest'
                  restructureType={selectedRestructureType}
                  glAccountNumber='penalWriteOff_GL'
                  sectionValue={loanDetail?.outstandingPenalInterest}
                />



                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="newPrincipal"
                    placeholder=""
                    label="New Principal"
                    value={loanDetail?.principaldue}
                    required
                    disabled
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
                    value={loanDetail?.intrate}
                    onChange={(e) =>
                      setLoanDetail({ ...loanDetail, intrate: e.target.value })
                    }
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
                        value={loanDetail?.loanterm}
                        onChange={(e) =>
                          setLoanDetail({
                            ...loanDetail,
                            loanterm: e.target.value
                          })
                        }
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
                        value={loanDetail?.termfreq}
                        onChange={(e) =>
                          setLoanDetail({
                            ...loanDetail,
                            termfreq: e.target.value
                          })
                        }
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
                    value={loanDetail?.calcmethod}
                    handleCheck={(e: any) =>
                      setLoanDetail({ ...loanDetail, calcmethod: e })
                    }
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
                    value={loanDetail?.repaytype}
                    onChange={(e) =>
                      setLoanDetail({
                        ...loanDetail,
                        repaytype: e.target.value
                      })
                    }
                  />{' '}
                </Grid>

                <Grid
                  item={isTablet}
                  mobile={12}
                  mb={2}
                  width={{ mobile: '560px' }}
                >
                  <FormikDateTimePicker
                    label="Posting Date"
                    name="postdate"
                  />
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
                    value={loanDetail?.collateralType}
                    onChange={(e) =>
                      setLoanDetail({
                        ...loanDetail,
                        collateralType: e.target.value
                      })
                    }
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
                    value={loanDetail?.collateralValue}
                    required
                  />{' '}
                </Grid>

                <Grid item={isTablet} mobile={12}>
                  <TextFieldArea
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    placeholder="Short text..."
                    label="Collateral Details"
                    title="Collateral Value"
                  />{' '}
                </Grid>

                <Grid
                  item={isTablet}
                  mobile={12}
                  mb={2}
                  width={{ mobile: '560px' }}
                >
                  <FormikDateTimePicker
                    label="Start Date"
                    name="startdate"
                    value={dayjs(loanDetail?.startdate)}
                  />
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
                    value={dayjs(loanDetail?.drawDownDate)}

                  />
                </Grid>

                <Grid
                  item={isTablet}
                  mobile={12}
                  mb={2}
                  width={{ mobile: '560px' }}
                >
                  <FormikDateTimePicker
                    label="Maturity Date"
                    name="matdate"
                    value={dayjs(loanDetail?.matdate)}

                  />
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
                    value={dayjs(loanDetail?.firstpmtdate)}

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
                  <TextFieldArea
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    placeholder="Short text..."
                    label="Narration"
                    title="Narration"
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

            <button
              id="submitButton"
              type="submit"
              style={{ display: 'none' }}
            >
              submit alias
            </button>
          </Form>
        </Formik>
      </Box>
    </Box >
  );
};
