'use client';
import React, { ReactElement } from 'react';
import Box from '@mui/material/Box';
import {
  PreviewContentOne,
  PreviewContentTwo,
} from '@/features/Operation/Forms/NIPTransfer';
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
import { Tabs } from '@/components/Revamp/Tabs';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <PrimaryIconButton
      buttonTitle="Save Changes"
      customStyle={{ ...submitButton }}
    />
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

const tabTitle = ['Account Information', 'Product  Information'];
const pageMenu = [<PreviewContentOne />, <PreviewContentTwo />];
const PreviewContent: React.FC = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs tabTitle={tabTitle} pageMenu={pageMenu} />
    </Box>
  );
};
export const EditAccount = () => {
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
            <PageTitle title="Edit Account" styles={BatchTitle} />
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
                <RadioButtons
                  options={[
                    { label: 'Bank Cheques', value: 'bankCheques' },
                    { label: 'Counter Cheques', value: 'counterCheques' },
                  ]}
                  title="Block view on Account?"
                  name="actions"
                  value="mianAction"
                />
              </Grid>
              <Box>
                <PageTitle title="Document Detail" />
                <Grid item={isTablet} mobile={12} spacing={2}>
                  <PageTitle title="Account Opening Document Submitted" />
                  <Box sx={documentUpload}>
                    <FileUploadPath />

                    <PageTitle title="Driver’s License.pdf" />
                    <Box
                      sx={{ marginLeft: { mobile: '50px', tablet: '200px' } }}
                    >
                      <PageTitle title="101kb" />
                    </Box>
                    <PrimaryIconButton
                      buttonTitle="Remove"
                      customStyle={{ ...downloadDocument }}
                    />
                  </Box>
                  <Box sx={documentUpload}>
                    <FileUploadPath />

                    <PageTitle title="PHCN Bill.pdf" />
                    <Box
                      sx={{ marginLeft: { mobile: '50px', tablet: '250px' } }}
                    >
                      <PageTitle title="101kb" />
                    </Box>
                    <PrimaryIconButton
                      buttonTitle="Remove"
                      customStyle={{ ...downloadDocument }}
                    />
                  </Box>
                </Grid>
              </Box>
              <Box>
                <PageTitle title="Account Opening Document Not Submitted" />
                <Grid item={isTablet} mobile={12} spacing={3}>
                  <PageTitle title="International Passport" />
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
          <Box sx={PostingContainer}>
            {isMobile ? (
              <MobilePreviewContent PreviewContent={<PreviewContent />} />
            ) : (
              <PreviewContent />
            )}
          </Box>
        </Grid>
      </Form>
    </Formik>
  );
};
