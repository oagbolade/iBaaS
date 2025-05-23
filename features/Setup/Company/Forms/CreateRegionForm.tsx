import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import { useSearchParams } from 'next/navigation';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { FormikRadioButton, FormTextInput } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { FormSkeleton } from '@/components/Loaders';
import { createRegionInitialValues } from '@/schemas/schema-values/setup';
import { useCreateRegion, useGetRegionById } from '@/api/setup/useCreateRegion';
import { createRegionSchema } from '@/schemas/setup';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import { decryptData } from '@/utils/decryptData';
import { encryptData } from '@/utils/encryptData';

type Props = {
  regionId?: string;
  isSubmitting: boolean;
  setIsSubmitting: (submit: boolean) => void;
};

export const CreateRegionForm = ({
  regionId,
  isSubmitting,
  setIsSubmitting
}: Props) => {
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const { mutate } = useCreateRegion(
    Boolean(isEditing),
    decryptData(regionId ?? '') || null
  );
  const { region, isLoading } = useGetRegionById(
    decryptData(regionId ?? '') || null
  );
  const onSubmit = async (values: any, actions: { resetForm: Function }) => {
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
        <LargeTitle title={`${isEditing ? 'Edit' : 'Create'} Region`} />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' }
        }}
      >
        <Formik
          initialValues={region || createRegionInitialValues}
          onSubmit={(values, actions) => onSubmit(values, actions)}
          validationSchema={createRegionSchema}
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
                      name="regionCode"
                      placeholder="enter region Code"
                      label="Region Code"
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
                    name="regionName"
                    placeholder="Enter region Name"
                    label="Region Name"
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
                    name="regionmne"
                    placeholder="Enter Region Mnemonic "
                    label="Region Mnemonic"
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
                      { label: 'Active', value: '1' },
                      { label: 'Disabled', value: '3' }
                    ]}
                    title="Status"
                    name="regionStatus"
                    value="regionStatus"
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
