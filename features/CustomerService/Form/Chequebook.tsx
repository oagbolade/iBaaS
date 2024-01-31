'use client';
import React, { ReactElement } from 'react';
import Box from '@mui/material/Box';
import { PreviewContentOne } from '@/features/Operation/Forms/CashDeposit';
import { PageTitle } from '@/components/Typography';
import {
  BatchContainer,
  BatchTitle,
  PostingContainer,
  previewContentStyle,
} from '@/features/Operation/Forms/style';
import Grid from '@mui/material/Grid';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { EditOperations } from '@/constants/OperationOptions';
import { Formik, Form } from 'formik';
import { user as userSchema } from '@/constants/schemas';
import { CustomStyleI, userInitialValues } from '@/constants/types';
import { useCurrentBreakpoint } from '@/utils';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { ActionButton } from '@/components/Revamp/Buttons';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  submitButton,
  cancelButton,
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { MobileModalContainer } from '@/components/Revamp/Modal/mobile/ModalContainer';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import DateTimePicker from '@/components/Revamp/FormFields/DateTimePicker';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import { chequeBook, chequeBookTitle } from './style';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <PrimaryIconButton buttonTitle="Submit" customStyle={{ ...submitButton }} />
    ,
  </Box>,
];

export const EditChequebook = () => {
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
            <PageTitle title="Edit Chequebook" styles={BatchTitle} />
            <Grid container>
              <Grid item={isTablet} mobile={12} spacing={6}>
                <Box sx={chequeBook}>
                  <PageTitle
                    title="Enter a Range of Cheque number to be hotlisted Or De-hotlisted. 
If you have 1 Cheque, Please enter the same Cheque Number as the Start No and End No."
                    styles={{ ...chequeBookTitle }}
                  />
                </Box>
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <RadioButtons
                  options={[
                    { label: 'Hotlisted', value: 'aReversal' },
                    { label: 'De-hotlisted ', value: 'notReversal' },
                  ]}
                  title="Please Select Action"
                  name="actions"
                  value="mianAction"
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="name"
                  placeholder="Enter user"
                  label="Start No"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%'),
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="name"
                  placeholder="Enter value"
                  label="End No"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%'),
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <Box>
                  <DemoContainer components={['DatePicker']}>
                    <DateTimePicker label="Value Date" />
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
