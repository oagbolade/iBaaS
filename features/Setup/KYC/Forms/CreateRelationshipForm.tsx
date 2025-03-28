import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import {
  FormSelectInput,
  FormSelectField,
  FormTextInput
} from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { FormSkeleton } from '@/components/Loaders';
import {
  useCreateRelationship,
  useGetRelationshipById
} from '@/api/setup/useRelationship';
import { createRelationshipInitialValues } from '@/schemas/schema-values/setup';
import { createRelationshipSchema } from '@/schemas/setup';
import { encryptData } from '@/utils/encryptData';

type Props = {
  isSubmitting: boolean;
  relationshipId?: string;
  setIsSubmitting: (submit: boolean) => void;
};

export const CreateRelationshipForm = ({
  isSubmitting,
  setIsSubmitting,
  relationshipId
}: Props) => {
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const { mutate } = useCreateRelationship(
    Boolean(isEditing),
    encryptData(relationshipId as string)
  );
  const { relationship, isLoading } = useGetRelationshipById(
    encryptData(relationshipId as string)
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
    return <FormSkeleton noOfLoaders={5} />;
  }

  return (
    <Box>
      <Box>
        <LargeTitle title={`${isEditing ? 'Edit' : 'Add'} Relationship`} />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' }
        }}
      >
        <Formik
          initialValues={relationship || createRelationshipInitialValues}
          onSubmit={(values, actions) => onSubmit(values, actions)}
          validationSchema={createRelationshipSchema}
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
                      name="relationid"
                      placeholder="202210107481"
                      label="Relationship Code"
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
                    name="relationname"
                    placeholder="Enter Relationship name"
                    label="Relationship Name"
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
