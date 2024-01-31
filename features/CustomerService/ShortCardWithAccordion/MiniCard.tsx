import React from 'react';
import Link from 'next/link';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { miniCardContainer } from '@/features/Report/CustomReport/GroupReport/styles';
import { greetingStyle } from '@/components/NavBar/styles';
import colors from '@/assets/colors';
import { Formik, Form } from 'formik';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { CustomStyleI, userInitialValues } from '@/constants/types';
import { user as userSchema } from '@/constants/schemas';
import { useCurrentBreakpoint } from '@/utils';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import { EditOperations } from '@/constants/OperationOptions';
import {
  submitButton,
  cancelButton,
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import {
  BatchContainer,
  BatchTitle,
  PostingContainer,
  previewContentStyle,
  templateUpload,
  templateUploadContainer,
  templateTitle,
  documentUpload,
} from '@/features/Operation/Forms/style';
import { PageTitle } from '@/components/Typography';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import DateTimePicker from '@/components/Revamp/FormFields/DateTimePicker';

type Props = {
  title: string;
};

export const MiniCard = ({ title }: Props) => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();

  const onSubmit = (
    values: any,
    actions: { setSubmitting: (arg0: boolean) => void },
  ) => {
    console.log({ values, actions });
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  };
  return (
    <Formik
      onSubmit={(values, actions) => onSubmit(values, actions)}
      initialValues={userInitialValues}
      validationSchema={userSchema}
    >
      <Form>
        <Grid container spacing={2}>
          <Box sx={BatchContainer} ml={{ desktop: 1, mobile: 5 }}>
            <PageTitle title={title} styles={BatchTitle} />
            <Grid container>
              <Grid item={isTablet} mobile={12}>
                <RadioButtons
                  options={[
                    { label: 'Ceo', value: 'bankCheques' },
                    { label: 'Chairman', value: 'counterCheques' },
                  ]}
                  title="Select Director Rank"
                  name="actions"
                  value="mianAction"
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormSelectField
                  name="branch"
                  options={EditOperations.branch}
                  label="Title"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%'),
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormSelectField
                  name="department"
                  options={EditOperations.department}
                  label="Gender"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%'),
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormSelectField
                  name="user"
                  options={EditOperations.user}
                  label="Nationality"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%'),
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormSelectField
                  name="user"
                  options={EditOperations.user}
                  label="LGA/City/Town of Origin"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%'),
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormSelectField
                  name="user"
                  options={EditOperations.user}
                  label="State of Origin"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%'),
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="name"
                  placeholder="Enter name"
                  label="First Name"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%'),
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="name"
                  placeholder="Enter value"
                  label="Middle Name"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%'),
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="name"
                  placeholder="Enter user"
                  label="Last Name"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%'),
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="name"
                  placeholder="Enter currency"
                  label="Address"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%'),
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="name"
                  placeholder="Enter currency"
                  label="Phone Number"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%'),
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <Box>
                  <DemoContainer components={['DatePicker']}>
                    <DateTimePicker label="Date of Birth" />
                  </DemoContainer>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Form>
    </Formik>
  );
};
