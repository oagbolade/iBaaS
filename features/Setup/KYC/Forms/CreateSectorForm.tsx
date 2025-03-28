import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import { useSearchParams } from 'next/navigation';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { FormTextInput, FormikRadioButton } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { FormSkeleton } from '@/components/Loaders';
import { useCreateSector, useGetSectorByCode } from '@/api/setup/useSector';
import { createSectorInitialValue } from '@/schemas/schema-values/setup';
import { createSectorSchema } from '@/schemas/setup';

import { encryptData } from '@/utils/encryptData';

type Props = {
  sectorId?: string;
  isSubmitting: boolean;
  setIsSubmitting: (submit: boolean) => void;
};

export const CreateSectorForm = ({
  sectorId,
  isSubmitting,
  setIsSubmitting
}: Props) => {
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const { mutate } = useCreateSector(
    Boolean(isEditing),
    encryptData(sectorId as string)
  );
  const { sector, isLoading } = useGetSectorByCode(
    encryptData(sectorId as string) || null
  );
  const sectorData = {
    sectorCode: sector?.sectorCode?.trim() || '',
    sectorName: sector?.sectorName?.trim() || '',
    sectorMne: sector?.sectorMne?.trim() || ''
  };
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
        <LargeTitle title={`${isEditing ? 'Edit' : 'Create'} Sector`} />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' }
        }}
      >
        <Formik
          initialValues={isEditing ? sectorData : createSectorInitialValue}
          onSubmit={(values, actions) => onSubmit(values, actions)}
          validationSchema={createSectorSchema}
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
                      name="sectorCode"
                      placeholder="+234"
                      label="Sector Code"
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
                    name="sectorName"
                    placeholder="Nigeria"
                    label="Sector Name"
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
                    name="sectorMne"
                    placeholder="NGN"
                    label="Sector Mneumonic"
                    required
                  />{' '}
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormikRadioButton
                    options={[
                      { label: 'Active', value: '1' },
                      { label: 'Inactive', value: '3' }
                    ]}
                    title="Sector Status"
                    name="status"
                    value={createSectorInitialValue.status}
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
