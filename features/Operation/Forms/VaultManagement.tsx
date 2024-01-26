'use client';
import React from 'react';
import Box from '@mui/material/Box';
import { BatchContainer, textInput } from './style';
import Grid from '@mui/material/Grid';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { EditOperations } from '@/constants/OperationOptions';
import { Formik, Form } from 'formik';
import { user as userSchema } from '@/constants/schemas';
import { userInitialValues } from '@/constants/types';
import { useCurrentBreakpoint } from '@/utils';
import { Tabs } from '@/components/Revamp/Tabs';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { actionButtons } from './BatchPosting';

const PreviewFormOne = () => {
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
      initialValues={userInitialValues}
      onSubmit={(values, actions) => onSubmit(values, actions)}
      validationSchema={userSchema}
    >
      <Form>
        <Grid container spacing={2}>
          <Box sx={BatchContainer}>
            <Grid container item direction="column">
              <Grid item ml={{ tablet: 3, mobile: 3 }} justifyContent="center">
                <Box
                  sx={{ justifyContent: 'center' }}
                  ml={{ desktop: 3, tablet: 3, mobile: 4 }}
                >
                  <FormTextInput
                    name="name"
                    placeholder="Enter name"
                    label="Name"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '560px'),
                    }}
                  />
                </Box>
              </Grid>
              <Grid item ml={{ tablet: 3, mobile: 3 }} justifyContent="center">
                <Box
                  sx={{ justifyContent: 'center' }}
                  ml={{ desktop: 3, tablet: 3, mobile: 4 }}
                >
                  <FormSelectField
                    name="Select a Branch"
                    options={EditOperations.department}
                    label="Select a Branch"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '560px'),
                    }}
                  />
                </Box>
              </Grid>
              <Grid item ml={{ tablet: 3, mobile: 3 }} justifyContent="center">
                <Box
                  sx={{ justifyContent: 'center' }}
                  ml={{ desktop: 3, tablet: 3, mobile: 4 }}
                >
                  <FormTextInput
                    name="name"
                    placeholder="Enter user"
                    label="Name"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '560px'),
                    }}
                  />
                </Box>
              </Grid>
              <Grid item ml={{ tablet: 3, mobile: 3 }} justifyContent="center">
                <Box
                  sx={{ justifyContent: 'center' }}
                  ml={{ desktop: 3, tablet: 3, mobile: 4 }}
                >
                  <FormTextInput
                    name="name"
                    placeholder="Enter number"
                    label="Name"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '560px'),
                    }}
                  />
                </Box>
              </Grid>
              <Grid item ml={{ tablet: 3, mobile: 3 }} justifyContent="center">
                <Box
                  sx={{ justifyContent: 'center' }}
                  ml={{ desktop: 3, tablet: 3, mobile: 4 }}
                >
                  <FormTextInput
                    name="name"
                    placeholder="Enter currency"
                    label="Name"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '560px'),
                    }}
                  />
                </Box>
              </Grid>
              <Grid item ml={{ tablet: 3, mobile: 3 }} justifyContent="center">
                <Box
                  sx={{ justifyContent: 'center' }}
                  ml={{ desktop: 3, tablet: 3, mobile: 4 }}
                >
                  <FormTextInput
                    name="Narration"
                    placeholder="Enter Narration"
                    label="Narration"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '560px'),
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Form>
    </Formik>
  );
};

const PreviewFormTwo = () => {
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
      initialValues={userInitialValues}
      onSubmit={(values, actions) => onSubmit(values, actions)}
      validationSchema={userSchema}
    >
      <Form>
        <Grid container spacing={2}>
          <Box sx={BatchContainer}>
            <Grid container item direction="column">
              <Grid item ml={{ tablet: 3, mobile: 3 }} justifyContent="center">
                <Box
                  sx={{ justifyContent: 'center' }}
                  ml={{ desktop: 3, tablet: 3, mobile: 4 }}
                >
                  <FormTextInput
                    name="name"
                    placeholder="Enter name"
                    label="Name"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '560px'),
                    }}
                  />
                </Box>
              </Grid>
              <Grid item ml={{ tablet: 3, mobile: 3 }} justifyContent="center">
                <Box
                  sx={{ justifyContent: 'center' }}
                  ml={{ desktop: 3, tablet: 3, mobile: 4 }}
                >
                  <FormSelectField
                    name="Select a Branch"
                    options={EditOperations.department}
                    label="Select a Branch"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '560px'),
                    }}
                  />
                </Box>
              </Grid>
              <Grid item ml={{ tablet: 3, mobile: 3 }} justifyContent="center">
                <Box
                  sx={{ justifyContent: 'center' }}
                  ml={{ desktop: 3, tablet: 3, mobile: 4 }}
                >
                  <FormTextInput
                    name="name"
                    placeholder="Enter user"
                    label="Name"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '560px'),
                    }}
                  />
                </Box>
              </Grid>
              <Grid item ml={{ tablet: 3, mobile: 3 }} justifyContent="center">
                <Box
                  sx={{ justifyContent: 'center' }}
                  ml={{ desktop: 3, tablet: 3, mobile: 4 }}
                >
                  <FormTextInput
                    name="name"
                    placeholder="Enter number"
                    label="Name"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '560px'),
                    }}
                  />
                </Box>
              </Grid>
              <Grid item ml={{ tablet: 3, mobile: 3 }} justifyContent="center">
                <Box
                  sx={{ justifyContent: 'center' }}
                  ml={{ desktop: 3, tablet: 3, mobile: 4 }}
                >
                  <FormTextInput
                    name="name"
                    placeholder="Enter currency"
                    label="Name"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '560px'),
                    }}
                  />
                </Box>
              </Grid>
              <Grid item ml={{ tablet: 3, mobile: 3 }} justifyContent="center">
                <Box
                  sx={{ justifyContent: 'center' }}
                  ml={{ desktop: 3, tablet: 3, mobile: 4 }}
                >
                  <FormTextInput
                    name="Narration"
                    placeholder="Enter Narration"
                    label="Narration"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '560px'),
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Form>
    </Formik>
  );
};

const tabTitle = ['Buy from Vault', 'Sell to Vault'];
const pageMenu = [<PreviewFormOne />, <PreviewFormTwo />];
const PreviewContent: React.FC = () => {
  return (
    <Box sx={{ width: '100%' }} ml={35}>
      <Tabs
        tabTitle={tabTitle}
        pageMenu={pageMenu}
        customStyle={{ ...textInput }}
      />
    </Box>
  );
};

export const VaultManagement = () => {
  return (
    <Box sx={{ marginTop: '60px' }}>
      <TopActionsArea actionButtons={actionButtons} />
      <Box sx={BatchContainer}>
        <PreviewContent />
      </Box>
    </Box>
  );
};
