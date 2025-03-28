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
  templateUpload,
  templateUploadContainer,
  templateTitle,
  documentUpload
} from '@/features/Operation/Forms/style';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { EditOperations } from '@/constants/OperationOptions';
import { Formik, Form } from 'formik';
import { user as userSchema } from '@/schemas/auth';
import { CustomStyleI, userInitialValues } from '@/constants/types';
import { useCurrentBreakpoint } from '@/utils';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { ActionButton } from '@/components/Revamp/Buttons';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  submitButton,
  cancelButton
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { MobileModalContainer } from '@/components/Revamp/Modal/mobile/ModalContainer';
import { FileUploadPath, UploadDocument } from '@/assets/svg';
import { VisuallyHiddenInput } from '@/features/Operation/Forms/BulkUpload';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import { downloadDocument, accountUpload } from './style';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <PrimaryIconButton buttonTitle="Submit" customStyle={{ ...submitButton }} />
    ,
  </Box>
];

export const CreateMandate = () => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();

  const onSubmit = (
    values: any,
    actions: { setSubmitting: (arg0: boolean) => void }
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
          <Box sx={BatchContainer} ml={{ desktop: 50, mobile: 5 }}>
            <PageTitle title="Create Mandate" styles={BatchTitle} />
            <Grid container>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="name"
                  placeholder="Enter Customer ID"
                  label="Customer ID"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="name"
                  placeholder="Enter Director ID"
                  label="Director ID"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="name"
                  placeholder="Enter Director Name"
                  label="Director Name"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Box>
                <Grid item={isTablet} mobile={12} spacing={3}>
                  <PageTitle title="Upload Photo & Signature" />
                  <Box sx={templateUploadContainer}>
                    <Button
                      component="label"
                      startIcon={<UploadDocument />}
                      sx={templateUpload}
                    >
                      <VisuallyHiddenInput type="file" />
                    </Button>
                    <PageTitle title="Tap here to upload your document" />
                    <PageTitle
                      title="JPG or PNG. File size, no more than 10MB"
                      styles={{ ...templateTitle }}
                    />
                  </Box>
                </Grid>
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Form>
    </Formik>
  );
};
