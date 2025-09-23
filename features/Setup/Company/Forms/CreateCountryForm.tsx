import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import { useSearchParams } from 'next/navigation';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { FormTextInput } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { FormSkeleton } from '@/components/Loaders';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import {
  useCreateCountry,
  useGetCountryByCode
} from '@/api/setup/useCreateCountry';
import { createCountryInitialValues } from '@/schemas/schema-values/setup';
import { createCountrySchema } from '@/schemas/setup';
import { encryptData } from '@/utils/encryptData';
import { decryptData } from '@/utils/decryptData';

type Props = {
  countryId?: string | null;
  isSubmitting: boolean;
  setIsSubmitting: (submit: boolean) => void;
};

export const CreateCountryForm = ({
  countryId,
  isSubmitting,
  setIsSubmitting
}: Props) => {
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');
  const { mutate } = useCreateCountry(
    Boolean(isEditing),
    decryptData(countryId as string)
  );
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const { country, isLoading } = useGetCountryByCode(
    decryptData(countryId as string) || null
  );
  const onSubmit = async (values: any, actions: { resetForm: Function }) => {
    await mutate({
      ...values
    });
  };

  React.useEffect(() => {
    const submit = document.getElementById('submitButton');
    if (isSubmitting) {
      submit?.click();
    }

    return () => {
      setIsSubmitting(false);
    };
  }, [isSubmitting]);

  if (isEditing && isLoading) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={3} />
      </Box>
    );
  }

  return (
    <Box>
      <Box>
        <LargeTitle title={`${isEditing ? 'Edit' : 'Create'} Country`} />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' }
        }}
      >
        <Formik
          initialValues={country || createCountryInitialValues}
          onSubmit={(values, actions) => onSubmit(values, actions)}
          validationSchema={createCountrySchema}
        >
          <Form>
            <Box mt={4}>
              <Grid container>
                {isEditing && (
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
                      name="countrycode"
                      placeholder="+234"
                      label="Country Code"
                      required
                      disabled
                    />{' '}
                  </Grid>
                )}
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%')
                    }}
                    name="countryName"
                    placeholder="Enter Country Name"
                    label="Country Name"
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
                    name="CountryMne"
                    placeholder="Enter Country Mne"
                    label="Country Mneumonic"
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
                    name="currencyName"
                    placeholder="Enter Currency Name"
                    label="Currency Name"
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
                    name="currencyMne"
                    placeholder="Enter Currency Mne"
                    label="Currency Mne"
                    required
                  />{' '}
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                  mt={2}
                >
                  <RadioButtons
                    className="permissionOptions"
                    options={[
                      { label: 'Active', value: '1' },
                      { label: 'Inactive', value: '0' }
                    ]}
                    title="Status"
                    name="status"
                    value="0"
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
