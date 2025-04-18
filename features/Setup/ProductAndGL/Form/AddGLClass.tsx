'use client';
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form } from 'formik';
import { useSearchParams } from 'next/navigation';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { PrimaryIconButton } from '@/components/Buttons';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { FormSkeleton } from '@/components/Loaders';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import {
  useGetGlClassByCode,
  useCreateGlClass
} from '@/api/setup/useGeneralClass';
import { createGlClassInitialValue } from '@/schemas/schema-values/setup';
import { createGlClassSchema } from '@/schemas/setup';
import { INodeType } from '@/api/ResponseTypes/admin';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { decryptData } from '@/utils/decryptData';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <PrimaryIconButton buttonTitle="Submit" customStyle={{ ...submitButton }} />
  </Box>
];

type Props = {
  classId: string;
  isSubmitting: boolean;
  setIsSubmitting: (submit: boolean) => void;
  node: INodeType[] | Array<any>;
};

export const CreateGLClass = ({
  classId,
  isSubmitting,
  setIsSubmitting,
  node
}: Props) => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');
  const { mutate } = useCreateGlClass(
    Boolean(isEditing),
    decryptData(classId ?? '') || null
  );
  const { mappedNode } = useMapSelectOptions({ node });
  const { gl, isLoading } = useGetGlClassByCode(
    decryptData(classId ?? '') || null
  );
  const onSubmit = async (values: any, actions: { resetForm: Function }) => {
    const combinedCode = `${values.nodeCode}${values.gL_ClassCode}`.trim();

    await mutate({
      ...values,
      gL_ClassCode: combinedCode
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
        <LargeTitle title={`${isEditing ? 'Edit' : 'Add '} GL Class`} />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' }
        }}
      >
        <Formik
          initialValues={gl || createGlClassInitialValue}
          onSubmit={(values, actions) => onSubmit(values, actions)}
          validationSchema={createGlClassSchema}
        >
          <Form>
            <Box mt={4}>
              <Grid container spacing={2}>
                {' '}
                {/* Added spacing for better separation */}
                {/* Row 1: GL Node Type */}
                <Grid item mobile={12}>
                  <FormSelectField
                    name="nodeCode"
                    options={mappedNode}
                    label="GL Node Type"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>
                {/* Row 2: GL Node and GL Class Code side by side */}
                <Grid container item mobile={12} spacing={2}>
                  <Grid item mobile={6} tablet={4}>
                    <FormTextInput
                      name="nodeCode"
                      placeholder="Enter GL Class Code"
                      label="GL Node"
                      customStyle={{
                        width: '100%' // Full width within its grid item
                      }}
                      disabled
                    />
                  </Grid>
                  <Grid item mobile={6} tablet={8}>
                    <FormTextInput
                      name="gL_ClassCode"
                      placeholder="Enter GL Class Code"
                      label="GL Class Code"
                      customStyle={{
                        width: '100%'
                      }}
                    />
                  </Grid>
                </Grid>
                {/* Row 3: GL Class Name */}
                <Grid item mobile={12}>
                  <FormTextInput
                    name="gL_ClassName"
                    placeholder="Enter GL Class Name"
                    label="GL Class Name"
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
