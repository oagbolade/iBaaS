import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { FormTextInput, FormikRadioButton } from '@/components/FormikFields';
import { terminateLoanSchema } from '@/schemas/loan/index';
import { setTerminateValues } from '@/schemas/schema-values/loan';
import { useCurrentBreakpoint } from '@/utils';
import { useWriteOffLoan, useCloseLoan } from '@/api/loans/useCreditFacility';
import { getStoredUser } from '@/utils/user-storage';

export const TerminateLoanForm = ({
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
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const { mutate: writeOffLoanMutate } = useWriteOffLoan();
  const { mutate: closeMutate } = useCloseLoan();

  const onSubmit = async (values: any) => {
    const data = {
      ...values,
      loanAcct: accountNumber,
      userid: `${getStoredUser()?.profiles.userid}`
    };
    if (values.loanWriteoff === '1') {
      const closeLoanData = {
        accountNumber,
        oPrincipal: values.oPrincipal,
        oInterest: values.oInterest,
        oPenalInt: values.oPenalInt,
        oExtinterest: values.oExtinterest
      };
      return closeMutate(closeLoanData);
    }
    writeOffLoanMutate(data);
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

  return (
    <Box>
      <Box>
        <LargeTitle title="Terminate Loan" />
      </Box>
      <Box>
        <Formik
          initialValues={setTerminateValues}
          onSubmit={(values) => onSubmit(values)}
        >
          {({ values }) => (
            <Form>
              <Box mt={4}>
                <Grid container>
                  <Grid item={isTablet} mobile={12}>
                    <FormikRadioButton
                      options={[
                        { label: 'Loan Closure ', value: '1' },
                        { label: 'Loan Write-Off', value: '0' }
                      ]}
                      title="Select Terminate Type"
                      name="loanWriteOff"
                      value="1"
                    />
                  </Grid>

                  <Grid item={isTablet} mobile={12}>
                    <FormTextInput
                      customStyle={{
                        width: setWidth(isMobile ? '300px' : '100%')
                      }}
                      name="loanAcct"
                      placeholder="0011223344"
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
                      name="settlementNumber"
                      placeholder="0011223344"
                      label="Settlement Number"
                      value={settlementacct1}
                      disabled
                    />{' '}
                  </Grid>

                  <Grid item={isTablet} mobile={12}>
                    <FormTextInput
                      customStyle={{
                        width: setWidth(isMobile ? '300px' : '100%')
                      }}
                      name="oPrincipal"
                      placeholder=""
                      label="Outstanding Principal"
                      value={loanDetails?.principaldue}
                      required
                      disabled
                    />{' '}
                  </Grid>

                  <Grid item={isTablet} mobile={12}>
                    <FormTextInput
                      customStyle={{
                        width: setWidth(isMobile ? '300px' : '100%')
                      }}
                      name="oInterest"
                      placeholder="33,432"
                      label="Accrued Interest"
                      value={loanDetails?.accruedInterest}
                      disabled
                      required
                    />{' '}
                  </Grid>

                  <Grid item={isTablet} mobile={12}>
                    <FormTextInput
                      customStyle={{
                        width: setWidth(isMobile ? '300px' : '100%')
                      }}
                      name="oPenalInt"
                      placeholder="33,432"
                      label="Accrued Penal Interest"
                      required
                    />{' '}
                  </Grid>

                  <Grid item={isTablet} mobile={12}>
                    <FormTextInput
                      customStyle={{
                        width: setWidth(isMobile ? '300px' : '100%')
                      }}
                      name="oExtinterest"
                      placeholder="32,432"
                      label="Accrued Extended Interest"
                      required
                    />{' '}
                  </Grid>

                  {values.loanWriteOff === '0' && (
                    <Grid item={isTablet} mobile={12}>
                      <FormTextInput
                        name="reasons"
                        placeholder="Enter text"
                        label="Reason"
                        customStyle={{
                          width: setWidth(isMobile ? '250px' : '100%')
                        }}
                      />
                    </Grid>
                  )}
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
          )}
        </Formik>
      </Box>
    </Box>
  );
};
