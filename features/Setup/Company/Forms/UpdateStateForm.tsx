import React, { useContext, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import { useSearchParams } from 'next/navigation';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { FormikRadioButton, FormTextInput } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { FormSkeleton } from '@/components/Loaders';
import { updateStatementInitialValue } from '@/schemas/schema-values/setup';
import { updateStateSchema } from '@/schemas/setup';
import { useGetStateById, useCreateState } from '@/api/setup/useCreateState';
import { decryptData } from '@/utils/decryptData';
import { SetupAndCustomerModuleContext } from '@/context/SetupAndCustomerContext';

type Props = {
  stateId?: string;
  isSubmitting: boolean;
  setIsSubmitting: (submit: boolean) => void;
};

export const UpdateStateForm = ({
  stateId,
  isSubmitting,
  setIsSubmitting
}: Props) => {
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const { mutate } = useCreateState(decryptData(stateId ?? '') || null);
  const { state, isLoading } = useGetStateById(
    decryptData(stateId ?? '') || null
  );

  const { setSetupAndCustomerData } = useContext(SetupAndCustomerModuleContext);

  const onSubmit = async (values: any) => {
    setSetupAndCustomerData({
      stateCode: values.stateCode,
      emailalert: false,
      smsalert: false
    });

    await mutate({
      ...values
    });
  };

  useEffect(() => {
    const submit = document.getElementById('submitButton');

    if (isSubmitting) {
      submit?.click();
    }

    return () => {
      setIsSubmitting(false);
    };
  }, [isSubmitting]);

  if (isEditing && isLoading) {
    return <FormSkeleton noOfLoaders={5} />;
  }

  return (
    <Box>
      <Box>
        <LargeTitle title={`${isEditing ? 'Edit' : 'Create'} State`} />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' }
        }}
      >
        <Formik
          initialValues={state || updateStatementInitialValue}
          onSubmit={(values) => onSubmit(values)}
          validationSchema={updateStateSchema}
        >
          <Form>
            <Box mt={4}>
              <Grid container>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                  width={{ mobile: '100%', tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%')
                    }}
                    name="stateName"
                    placeholder="Enter state name"
                    label="State Name"
                    required
                  />{' '}
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%')
                    }}
                    name="stateCode"
                    placeholder="Enter state code"
                    label="State Code"
                    required
                    disabled
                  />{' '}
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%')
                    }}
                    name="capital"
                    placeholder="Enter State Capital"
                    label="State Capital"
                    required
                  />{' '}
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%')
                    }}
                    name="statemne"
                    placeholder="Enter State Mnouomic"
                    label="State Mneumonic"
                    required
                  />{' '}
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%')
                    }}
                    name="region"
                    placeholder="NGN"
                    label="Region"
                    required
                  />{' '}
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                  mt={2}
                >
                  <FormikRadioButton
                    className="permissionOptions"
                    options={[
                      { label: 'Active', value: 1 },
                      { label: 'Inactive', value: 3 }
                    ]}
                    title="State Status"
                    name="status"
                    value={Number(state?.status)}
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
