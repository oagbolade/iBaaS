import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import { useSearchParams } from 'next/navigation';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import {
  FormTextInput,
  FormSelectField,
  FormikRadioButton
} from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { FormSkeleton } from '@/components/Loaders';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import {
  useCreateTown,
  useGetTownByCode,
  useGetTownByName
} from '@/api/setup/userCreateTown';
import { createTownInitialValues } from '@/schemas/schema-values/setup';
import { createTownSchema } from '@/schemas/setup';
import { IStates } from '@/api/ResponseTypes/customer-service';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import { encryptData } from '@/utils/encryptData';
import { decryptData } from '@/utils/decryptData';

type Props = {
  townId?: string | null;
  isSubmitting: boolean;
  setIsSubmitting: (submit: boolean) => void;
  states: IStates[] | Array<any>;
};

export const CreateTownForm = ({
  townId,
  isSubmitting,
  setIsSubmitting,
  states
}: Props) => {
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');
  const { mutate } = useCreateTown(
    Boolean(isEditing),
    decryptData(townId ?? '') || null
  );
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const { mappedState } = useMapSelectOptions({
    states
  });
  const { town, isLoading } = useGetTownByCode(
    decryptData(townId ?? '') || null
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
        <LargeTitle title={`${isEditing ? 'Edit' : 'Create'} Town`} />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' }
        }}
      >
        <Formik
          initialValues={town || createTownInitialValues}
          onSubmit={(values, actions) => onSubmit(values, actions)}
          validationSchema={createTownSchema}
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
                    name="townName"
                    placeholder="+234"
                    label="Town Code"
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
                    name="townshortname"
                    placeholder="Nigeria"
                    label="Town Name"
                    required
                    disabled
                  />{' '}
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormSelectField
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%'),
                      fontSize: '14px'
                    }}
                    name="stateCode"
                    options={mappedState}
                    label="State"
                    disabled
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
                      { label: 'Inactive', value: '3' }
                    ]}
                    title="Status"
                    name="townstatus"
                    value="townstatus"
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
