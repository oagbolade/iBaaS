import React, { useEffect, useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import {
  FormTextInput,
  FormSelectField,
} from '@/components/FormikFields';
import { setDisburseLoanValues } from '@/schemas/schema-values/loan/index';
import { useCurrentBreakpoint } from '@/utils';
import { useDisburseLoan } from '@/api/loans/useCreditFacility';
import { getStoredUser } from '@/utils/user-storage';

export const DisburseLoanForm = ({
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
  const { mutate } = useDisburseLoan();

  const onSubmit = (values: any) => {
    const data = {
      ...values
    };
    mutate(data);
    setIsSubmitting(false);
  };

  // Get user info
  const user = useMemo(() => getStoredUser(), []);
  const userLoanMenuid = useMemo(
    () =>
      Array.isArray(user?.menuItems)
        ? user.menuItems.find((resp: any) => resp.menu_id === 31)
        : null,
    [user]
  );

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
        <LargeTitle title="Disburse Loan" />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' }
        }}
      >
        <Formik
          initialValues={{
            ...setDisburseLoanValues,
            accountNumber,
            userId: `${getStoredUser()?.profiles.userid}`
            // menuid: userLoanMenuid?.menu_id ?  userLoanMenuid?.menu_id : 0 TODO: replace with you confirm
          }}
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
                    name="accountNumber"
                    placeholder="0011223344"
                    label="Loan Account"
                    value={accountNumber}
                    required
                    disabled
                  />{' '}
                </Grid>

                <Grid mt={2} item={isTablet} mobile={12}>
                  <FormSelectField
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%'),
                      fontSize: '14px'
                    }}
                    options={[
                      { name: 'Bank', value: '0' },
                      { name: 'Cash', value: '1' }
                    ]}
                    label="Payment Mode"
                    name="paymode"
                    required
                  />{' '}
                </Grid>

                <Grid mt={2} item={isTablet} mobile={12}>
                  {/* // TODO: confirm later with eben */}
                  {/* <FormikRadioButton 
                    
                    options={[
                      { label: 'Yes', value: '1' },
                      { label: 'No', value: '0' }
                    ]}
                    title="Tranche Disbursement"
                    name="payBank"
                    value="1"
                  /> */}
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
