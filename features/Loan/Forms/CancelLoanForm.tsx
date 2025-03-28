import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { FormTextInput, FormikDateTimePicker } from '@/components/FormikFields';
import { setCancelValues } from '@/schemas/schema-values/loan/index';
import { cancelLoanSchema } from '@/schemas/loan/index';
import { useCurrentBreakpoint } from '@/utils';
import { useCancelLoan } from '@/api/loans/useCreditFacility';

export const CancelLoanForm = ({
  accountNumber,
  customerID,
  isSubmitting,
  setIsSubmitting
}: {
  accountNumber: string;
  customerID: string;
  isSubmitting?: boolean;
  setIsSubmitting: (submit: boolean) => void;
}) => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const { mutate } = useCancelLoan();

  const onSubmit = (values: any) => {
    const data = {
      accountNumber,
      oPrincipal: values.oPrincipal,
      oInterest: values.oInterest,
      oPenalInt: values.oPenalInt,
      oExtinterest: values.oExtinterest
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

  return (
    <Box>
      <Box>
        <LargeTitle title="Cancel Loan" />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' }
        }}
      >
        <Formik
          initialValues={setCancelValues}
          onSubmit={(values) => onSubmit(values)}
        >
          <Form>
            <Box mt={4}>
              <Grid container>
                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="customerID"
                    placeholder="0011"
                    label="Customer ID"
                    value={customerID}
                    required
                    disabled
                  />{' '}
                </Grid>

                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="accountNumber"
                    placeholder="0011223344"
                    label="Loan Account"
                    value={accountNumber}
                    required
                    disabled
                  />{' '}
                </Grid>

                <Grid item={isTablet} mobile={12}>
                  <FormikDateTimePicker
                    label="Value Date"
                    name="valueDate"
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
