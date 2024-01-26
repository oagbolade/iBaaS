'use client';
import React from 'react';
import Box from '@mui/material/Box';
import { PageTitle } from '@/components/Typography';
import {
  BatchContainer,
  BatchTitle,
  PostingContainer,
  clearContentStyle,
} from './style';
import Grid from '@mui/material/Grid';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { EditOperations } from '@/constants/OperationOptions';
import { Formik, Form } from 'formik';
import { user as userSchema } from '@/constants/schemas';
import { userInitialValues } from '@/constants/types';
import { useCurrentBreakpoint } from '@/utils';
import { PreviewContentOne } from './CashDeposit';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { MobilePreviewContent, actionButtons } from './BatchPosting';

export const OutWard = () => {
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
        <Box sx={{ marginTop: '60px' }}>
          <TopActionsArea actionButtons={actionButtons} />
        </Box>
        <Grid container spacing={2}>
          <Box sx={BatchContainer} ml={{ desktop: 1, mobile: 5 }}>
            <PageTitle title="Outward clearing" styles={BatchTitle} />

            <Grid container>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="name"
                  placeholder="Enter name"
                  label="Name"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%'),
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormSelectField
                  name="department"
                  options={EditOperations.department}
                  label="Department"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%'),
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="name"
                  placeholder="Enter number"
                  label="Name"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%'),
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="name"
                  placeholder="Enter user"
                  label="Name"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%'),
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="name"
                  placeholder="Enter currency"
                  label="Name"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%'),
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="Narration"
                  placeholder="Enter Narration"
                  label="Narration"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%'),
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={PostingContainer}>
            {isMobile ? (
              <MobilePreviewContent
                PreviewContent={<PreviewContentOne />}
                customStyle={{ ...clearContentStyle }}
              />
            ) : (
              <PreviewContentOne />
            )}{' '}
          </Box>
        </Grid>
      </Form>
    </Formik>
  );
};
