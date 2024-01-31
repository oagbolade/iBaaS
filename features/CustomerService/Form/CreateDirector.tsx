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
  documentUpload,
} from '@/features/Operation/Forms/style';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
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
import { FileUploadPath, UploadDocument } from '@/assets/svg';
import { VisuallyHiddenInput } from '@/features/Operation/Forms/BulkUpload';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import { downloadDocument, accountUpload } from './style';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import DateTimePicker from '@/components/Revamp/FormFields/DateTimePicker';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <PrimaryIconButton buttonTitle="Submit" customStyle={{ ...submitButton }} />
    ,
  </Box>,
];

type Props = {
  PreviewContent: any;
  customStyle?: CustomStyleI;
};
export const MobilePreviewContent = ({
  PreviewContent,
  customStyle,
}: Props) => {
  return (
    <MobileModalContainer
      ShowPreview={PreviewContent}
      customStyle={{ ...previewContentStyle, ...customStyle }}
    />
  );
};
export const CreateDirector = () => {
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
            <PageTitle title="Create Director" styles={BatchTitle} />
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
              <Box>
                <Grid item={isTablet} mobile={12} spacing={3} mt={3}>
                  <PageTitle title="Upload Director’s Photo" />
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
              <Grid item={isTablet} mobile={12} mt={3}>
                <ActionButton
                  customStyle={{
                    ...cancelButton,
                  }}
                  buttonTitle="Add"
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={PostingContainer}>
            {isMobile ? (
              <MobilePreviewContent PreviewContent={<PreviewContentOne />} />
            ) : (
              <PreviewContentOne />
            )}
          </Box>
        </Grid>
      </Form>
    </Formik>
  );
};
