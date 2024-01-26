'use client';
import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import { PageTitle } from '@/components/Typography';
import {
  BatchContainer,
  BatchTitle,
  PostingContainer,
  inputText,
  fundsContentStyle,
} from './style';
import Grid from '@mui/material/Grid';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { EditOperations } from '@/constants/OperationOptions';
import { Formik, Form } from 'formik';
import { user as userSchema } from '@/constants/schemas';
import { userInitialValues } from '@/constants/types';
import { useCurrentBreakpoint } from '@/utils';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import {
  Details,
  SubTitle,
} from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { Status } from '@/components/Labels';
import { Tabs } from '@/components/Revamp/Tabs';
import { MobilePreviewContent, actionButtons } from './BatchPosting';
import { TopActionsArea } from '@/components/Revamp/Shared';

export const PreviewContentTwo: React.FC = () => {
  return (
    <Box
      mb={{ mobile: 30, tablet: 0 }}
      sx={{
        padding: { mobile: 6, tablet: 0 },
        alignItems: { mobile: 'center', tablet: 'normal' },
      }}
    >
      <SubTitle title="Product Name" />
      <Details title="Compassianate Loan" />

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
      <Box mb={{ mobile: 5, tablet: 0 }}>
        <SubTitle title="Loan Status" />
        <Status label="Active" status="success" />
      </Box>
    </Box>
  );
};

export const PreviewContentOne: React.FC = () => {
  return (
    <Box
      mb={{ mobile: 30, tablet: 0 }}
      sx={{
        padding: { mobile: 6, tablet: 0 },
        alignItems: { mobile: 'center', tablet: 'normal' },
      }}
    >
      <SubTitle title="Product Name" />
      <Details title="Compassianate Loan" />

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
      <Box mb={{ mobile: 5, tablet: 0 }}>
        <SubTitle title="Loan Status" />
        <Status label="Active" status="success" />
      </Box>
    </Box>
  );
};

const tabTitle = ['Debit  Information', 'Beneficiary  Information'];
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

export const NIPTransfer = () => {
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
        <Box sx={{ marginTop: '70px' }}>
          <TopActionsArea actionButtons={actionButtons} />
        </Box>
        <Grid container spacing={2}>
          <Box sx={BatchContainer} ml={{ desktop: 1, mobile: 5 }}>
            <PageTitle title="NIP Transfer" styles={BatchTitle} />
            <Grid container>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="name"
                  placeholder="Enter account number"
                  label="Account Number"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%'),
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="Transaction Amount"
                  placeholder="Enter Transaction Amount"
                  label="Transaction Amount"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%'),
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <RadioButtons
                  options={[
                    { label: 'Is a Reversal', value: 'aReversal' },
                    { label: 'Is not a Reversal', value: 'notReversal' },
                  ]}
                  title="Reversal"
                  name="actions"
                  value="mianAction"
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="Value Date"
                  placeholder="04 August, 2023"
                  label="Value Date"
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
                <FormSelectField
                  name="Transfer Type"
                  options={EditOperations.department}
                  label="Transfer Type"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%'),
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="Narration"
                  placeholder=""
                  label="Narration"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%'),
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="name"
                  placeholder="Enter amount"
                  label="Pay Amount"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%'),
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="name"
                  placeholder="Enter voucher number"
                  label="Voucher number"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%'),
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="Rate"
                  placeholder="Enter Rate"
                  label="Rate"
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
                PreviewContent={<PreviewContent />}
                customStyle={{ ...fundsContentStyle }}
              />
            ) : (
              <PreviewContent />
            )}{' '}
          </Box>
        </Grid>
      </Form>
    </Formik>
  );
};
