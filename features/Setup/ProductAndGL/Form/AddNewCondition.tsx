'use client';
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form } from 'formik';
import { useSearchParams } from 'next/navigation';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { EditOperations } from '@/constants/OperationOptions';
import { useCurrentBreakpoint } from '@/utils';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  submitButton,
  cancelButton
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { FormSkeleton } from '@/components/Loaders';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import {
  useGetSetupConditionByCode,
  useSetupCondition
} from '@/api/setup/useSetupCondition';
import { createSetupConditionInitialValue } from '@/schemas/schema-values/setup';
import { createSetupConditionSchema } from '@/schemas/setup';
import { encryptData } from '@/utils/encryptData';
import { decryptData } from '@/utils/decryptData';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <PrimaryIconButton buttonTitle="Submit" customStyle={{ ...submitButton }} />
  </Box>
];

type Props = {
  conditionId: string | null;
  setIsSubmitting: (submit: boolean) => void;
  isSubmitting: boolean;
};

export const CreateConditionPrecedent = ({
  conditionId,
  setIsSubmitting,
  isSubmitting
}: Props) => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');
  const { mutate } = useSetupCondition(
    Boolean(isEditing),
    decryptData(conditionId ?? '')
  );
  const { conditionPrecedence, isLoading } = useGetSetupConditionByCode(
    decryptData(conditionId as string) as string
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
        <LargeTitle title={`${isEditing ? 'Edit' : 'Add'} New`} />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' }
        }}
      >
        <Formik
          initialValues={
            conditionPrecedence || createSetupConditionInitialValue
          }
          onSubmit={(values, actions) => onSubmit(values, actions)}
          validationSchema={createSetupConditionSchema}
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
                    name="description"
                    placeholder="Enter Condition Type"
                    label="Condition Description"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>
                {isEditing && (
                  <Grid
                    item={isTablet}
                    mobile={12}
                    mr={{ mobile: 35, tablet: 0 }}
                    width={{ mobile: '100%', tablet: 0 }}
                  >
                    <FormTextInput
                      name="code"
                      placeholder="Enter Condition Code"
                      label="Condition Code"
                      customStyle={{
                        width: setWidth(isMobile ? '250px' : '100%')
                      }}
                      disabled
                    />
                  </Grid>
                )}
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
