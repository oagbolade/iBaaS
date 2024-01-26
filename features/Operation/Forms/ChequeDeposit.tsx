'use client';
import React from 'react';
import Box from '@mui/material/Box';
import { PageTitle } from '@/components/Typography';
import {
  BatchContainer,
  BatchTitle,
  PostingContainer,
  totalText,
  inputText,
  ChequelContentStyle,
} from './style';
import Grid from '@mui/material/Grid';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { EditOperations } from '@/constants/OperationOptions';
import { Formik, Form } from 'formik';
import { user as userSchema } from '@/constants/schemas';
import { userInitialValues } from '@/constants/types';
import { useCurrentBreakpoint } from '@/utils';
import { PreviewContentOne, PreviewContentTwo } from './NIPTransfer';
import { Tabs } from '@/components/Revamp/Tabs';
import DateTimePicker from '@/components/Revamp/FormFields/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { MobilePreviewContent, actionButtons } from './BatchPosting';

const tabTitle = ['Source Account', 'Destination Account'];
const pageMenu = [<PreviewContentOne />, <PreviewContentTwo />];
const PreviewContent: React.FC = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        tabTitle={tabTitle}
        pageMenu={pageMenu}
        customStyle={{ ...inputText }}
      />
    </Box>
  );
};

export const ChequeDeposit = () => {
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
            <PageTitle title="Cheque Deposit" styles={BatchTitle} />
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
                  name="Currency"
                  options={EditOperations.department}
                  label="Currency"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%'),
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="Cheque Number"
                  placeholder="Enter Cheque Number"
                  label="Cheque Number"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%'),
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <Box>
                  <DemoContainer components={['DatePicker']}>
                    <DateTimePicker label="Posting Date" />
                  </DemoContainer>
                </Box>
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="Pay Amount"
                  placeholder="Enter Pay Amount"
                  label="Pay Amount"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%'),
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="Rate"
                  placeholder="."
                  label="Rate"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%'),
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="Narration"
                  placeholder="Enter"
                  label="Narration"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%'),
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <PageTitle title="Total Amount" />
                <PageTitle title="₦0.00" styles={{ ...totalText }} />
              </Grid>
            </Grid>
          </Box>
          <Box sx={PostingContainer}>
            {isMobile ? (
              <MobilePreviewContent
                PreviewContent={<PreviewContent />}
                customStyle={{ ...ChequelContentStyle }}
              />
            ) : (
              <PreviewContent />
            )}
          </Box>
        </Grid>
      </Form>
    </Formik>
  );
};
