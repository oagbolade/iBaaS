'use client';
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form } from 'formik';
import { useSearchParams } from 'next/navigation';
import { FormTextInput } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { PrimaryIconButton } from '@/components/Buttons';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { FormSkeleton } from '@/components/Loaders';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { createInterestInitialValue } from '@/schemas/schema-values/setup';
import {
  useGetInterestByCode,
  useCreateInterest
} from '@/api/setup/useInterest';
import { createInterestSchema } from '@/schemas/setup';

import { encryptData } from '@/utils/encryptData';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <PrimaryIconButton buttonTitle="Submit" customStyle={{ ...submitButton }} />
  </Box>
];

type Props = {
  interestId?: string | null;
  setIsSubmitting: (submit: boolean) => void;
  isSubmitting: boolean;
};
export const CreateInterest = ({
  setIsSubmitting,
  isSubmitting,
  interestId
}: Props) => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');
  const { mutate } = useCreateInterest(
    Boolean(isEditing),
    encryptData(interestId as string)
  );
  const { interest, isLoading } = useGetInterestByCode(
    encryptData(interestId as string) || null
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
        <LargeTitle title={`${isEditing ? 'Edit' : 'Add'} Interest`} />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' }
        }}
      >
        <Formik
          initialValues={interest || createInterestInitialValue}
          onSubmit={(values, actions) => onSubmit(values, actions)}
          validationSchema={createInterestSchema}
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
                      name="intCode"
                      placeholder="Enter Interest Code"
                      label="Interest Code"
                      customStyle={{
                        width: setWidth(isMobile ? '250px' : '100%')
                      }}
                      disabled
                    />
                  </Grid>
                )}
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                  width={{ mobile: '100%', tablet: 0 }}
                >
                  <FormTextInput
                    name="intName"
                    placeholder="Enter Interest Name"
                    label="Interest Name"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                  width={{ mobile: '100%', tablet: 0 }}
                >
                  <FormTextInput
                    name="minRate"
                    placeholder="Enter Minimum Rate"
                    label="Minimum Rate"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                  width={{ mobile: '100%', tablet: 0 }}
                >
                  <FormTextInput
                    name="maxRate"
                    placeholder="Enter Maxiumum Rate"
                    label="Maxiumum Rate"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
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
