'use client';
import React from 'react';
import Box from '@mui/material/Box';
import { PageTitle } from '@/components/Typography';
import {
  BatchContainer,
  BatchTitle,
  PostingContainer,
  title,
  previewContentStyle,
  cashContentStyle,
} from './style';
import Grid from '@mui/material/Grid';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { EditOperations } from '@/constants/OperationOptions';
import { Formik, Form } from 'formik';
import { user as userSchema } from '@/constants/schemas';
import { userInitialValues } from '@/constants/types';
import { useCurrentBreakpoint } from '@/utils';
import {
  Details,
  SubTitle,
} from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { Status } from '@/components/Labels';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { MobilePreviewContent, actionButtons } from './BatchPosting';

export const PreviewContentOne: React.FC = () => {
  return (
    <Box
      mb={{ mobile: 30, tablet: 0 }}
      sx={{
        padding: { mobile: 6, tablet: 0 },
        alignItems: { mobile: 'center', tablet: 'normal' },
      }}
    >
      <PageTitle title="Account Information" styles={title} />

      <SubTitle title="Settlement Account" />
      <Details title="39483593939" />

      <SubTitle title="Settlement Account Name" />
      <Details title="Omodayo Oluwafunke" />

      <SubTitle title="Loan Amount" />
      <Details title="N1,800,320.54" />

      <SubTitle title="Loan Purpose" />
      <Details title="To buy equipments" />

      <SubTitle title="Repayment Mode" />
      <Details title="Equal principal & intrest" />

      <SubTitle title="First Repayment Date" />
      <Details title="02 January, 2023  11:03pm" />

      <SubTitle title="Total No. of Installment" />
      <Details title="4" />
      <Box mb={{ mobile: 15, tablet: 0 }}>
        <SubTitle title="Loan Status" />
        <Status label="Active" status="success" />
      </Box>
    </Box>
  );
};
export const CashDeposit = () => {
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
            <PageTitle title="Cash Deposit" styles={BatchTitle} />
            <Grid container>
              <Grid item={isTablet} mobile={12}>
                <FormSelectField
                  name="branch"
                  options={EditOperations.branch}
                  label="Branch"
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
                <FormSelectField
                  name="user"
                  options={EditOperations.user}
                  label="user"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%'),
                  }}
                />
              </Grid>
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
                  placeholder="Enter value"
                  label="Name"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%'),
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="name"
                  placeholder="Enter current"
                  label="Name"
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
                customStyle={{ ...cashContentStyle }}
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
