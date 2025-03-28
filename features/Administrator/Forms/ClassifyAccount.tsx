import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import {
  FormTextInput,
  FormSelectField,
  FormikRadioButton
} from '@/components/FormikFields';
import { classifyAccount } from '@/schemas/customer-service';
import { classifyAccountInitialValues } from '@/schemas/schema-values/customer-service';
import { useCurrentBreakpoint } from '@/utils';
import { useAddAccountClassify } from '@/api/finance/useFinanceAccount';

type Props = {
  isSubmitting: boolean;
  setIsSubmitting: (submit: boolean) => void;
  accountNumber?: string;
};

export const ClassifyAccount = ({
  isSubmitting,
  setIsSubmitting,
  accountNumber
}: Props) => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const { mutate } = useAddAccountClassify();
  const onSubmit = async (values: any) => {
    const data: any = {
      ...values,
      accountNumber
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
    <Box sx={{ width: '100%' }}>
      <Box sx={{ width: '100%' }}>
        <LargeTitle title="Classify Account" />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' }
        }}
      >
        <Formik
          initialValues={classifyAccountInitialValues}
          onSubmit={(values) => onSubmit(values)}
          validationSchema={classifyAccount}
        >
          <Form>
            <Box mt={{ mobile: 2, tablet: 4 }}>
              <Grid container>
                <Grid mb={2} item={isTablet} mobile={12}>
                  <Box mt={2}>
                    <FormikRadioButton
                      options={[
                        { label: 'Classify', value: '1' },
                        { label: 'De-Classify', value: '0' }
                      ]}
                      title="Please select"
                      name="classify"
                      value="1"
                    />
                  </Box>
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                  width={{ mobile: '100%', tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    disabled
                    name="accountNumber"
                    placeholder="Account Number"
                    label="Account Number"
                    value={accountNumber}
                  />{' '}
                </Grid>
                <Grid
                  mb={2}
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                  width={{ mobile: '100%', tablet: 0 }}
                >
                  <FormSelectField
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%'),
                      fontSize: '14px'
                    }}
                    options={[
                      { name: 'Active Interest Accrual', value: '0' },
                      { name: 'Accure Into Suspense', value: '1' },
                      { name: 'Stop Insterest Accural', value: '2' }
                    ]}
                    label="Classification Type"
                    name="provisionType"
                  />{' '}
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
