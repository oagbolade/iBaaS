import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import { useSearchParams } from 'next/navigation';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { FormTextInput } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { FormSkeleton } from '@/components/Loaders';
import { useCreateDocument, useGetDocumentById } from '@/api/setup/useDocument';
import { createDocumentSchema } from '@/schemas/setup';
import { createDepartmentInitialValue } from '@/schemas/schema-values/setup';
import { decryptData } from '@/utils/decryptData';

type Props = {
  documentId?: string;
  isSubmitting: boolean;
  setIsSubmitting: (submit: boolean) => void;
};

export const CreateDocumentForm = ({
  documentId,
  isSubmitting,
  setIsSubmitting
}: Props) => {
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();

  const { documents, isLoading } = useGetDocumentById(
    decryptData(documentId as string) || null
  );
  const { mutate } = useCreateDocument(
    Boolean(isEditing),
    decryptData(documentId ?? '') || null
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
        <LargeTitle title={`${isEditing ? 'Edit' : 'Create'} Document`} />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' }
        }}
      >
        <Formik
          initialValues={documents || createDepartmentInitialValue}
          onSubmit={(values, actions) => onSubmit(values, actions)}
          validationSchema={createDocumentSchema}
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
                      name="docid"
                      placeholder="202210107481"
                      label="Document Code"
                      required
                      disabled
                    />{' '}
                  </Grid>
                )}

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
                    name="docName"
                    placeholder="Enter Document Name"
                    label="Document Name"
                    required
                  />{' '}
                </Grid>
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
                    name="docShortname"
                    placeholder="Enter Document Mnemonic"
                    label="Document Mnemonic"
                    required
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
