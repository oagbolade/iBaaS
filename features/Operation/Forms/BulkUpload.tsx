'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Formik, Form } from 'formik';
import { styled } from '@mui/material/styles';
import {
  BatchContainer,
  BatchTitle,
  PostingContainer,
  PostingTitle,
  downloadDocument,
  documentUpload,
  templateUploadContainer,
  templateUpload,
  templateCopy,
  templateDownload,
  templateTitle,
  bulkContentStyle,
  templateStyle,
} from './style';
import { PageTitle } from '@/components/Typography';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { PrimaryIconButton } from '@/components/Buttons';
import { EditOperations } from '@/constants/OperationOptions';
import { FileUploadPath, UploadDocument } from '@/assets/svg';
import { user as userSchema } from '@/constants/schemas';
import { userInitialValues } from '@/constants/types';
import { useCurrentBreakpoint } from '@/utils';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { MobilePreviewContent, actionButtons } from './BatchPosting';
import colors from '@/assets/colors';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 2,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 2,
  border: `1px solid ${colors.activeBlue400}`,
  boxShadow: 'none',
});
export const PreviewBulkUpload: React.FC = () => {
  return (
    <Box>
      <Box ml={{ mobile: 1, tablet: 0 }}>
        <PageTitle
          title="Steps required for a bulk upload"
          styles={PostingTitle}
        />
      </Box>
      <Grid item ml={{ mobile: 1, tablet: 0 }}>
        <PageTitle title="Step 1" />
        <PageTitle title="Choose File Type" styles={{ ...templateCopy }} />
        <PageTitle
          title="Select the file template to download. you can download the file <Button>here</Button>"
          styles={{ ...templateDownload }}
        />
      </Grid>
      <Grid item ml={{ mobile: 1, tablet: 0 }}>
        <PageTitle title="Step 2" />
        <PageTitle
          title="Download Template Copy"
          styles={{ ...templateCopy }}
        />
        <PageTitle
          title="Download the template copy and fill it on your device"
          styles={{ ...templateStyle }}
        />
      </Grid>
      <Grid item ml={{ mobile: 1, tablet: 0 }}>
        <PageTitle title="Step 3" />
        <PageTitle
          title="Reupload Template Copy"
          styles={{ ...templateCopy }}
        />
        <PageTitle
          title="Reupload the template after youve successfully filled the template"
          styles={{ ...templateStyle }}
        />
      </Grid>
    </Box>
  );
};

export const BulkUpload = () => {
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
          <Box sx={BatchContainer} ml={{ desktop: 1, mobile: 3 }}>
            <PageTitle title="Bulk Upload" styles={BatchTitle} />
            <Grid container>
              <Grid item={isTablet} mobile={12}>
                <FormSelectField
                  name="Ms Office Excel Type"
                  options={EditOperations.branch}
                  label="Ms Office Excel Type"
                  customStyle={{
                    width: setWidth(isMobile ? '400px' : '100%'),
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <PageTitle title="Download Template below" />
                <Box sx={documentUpload}>
                  <FileUploadPath />

                  <PageTitle title="Transaction-Template.xls" />
                  <Box sx={{ marginLeft: { mobile: '50px', tablet: '150px' } }}>
                    <PageTitle title="101kb" />
                  </Box>
                  <PrimaryIconButton
                    buttonTitle="Download"
                    customStyle={{ ...downloadDocument }}
                  />
                </Box>
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <PageTitle title="Upload Template" />
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
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="Batch No"
                  placeholder=""
                  label="Batch No"
                  customStyle={{
                    width: setWidth(isMobile ? '400px' : '100%'),
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="Total Transaction Amount"
                  placeholder=""
                  label="Total Transaction Amount"
                  customStyle={{
                    width: setWidth(isMobile ? '400px' : '100%'),
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={PostingContainer}>
            {isMobile ? (
              <MobilePreviewContent
                PreviewContent={<PreviewBulkUpload />}
                customStyle={{ ...bulkContentStyle }}
              />
            ) : (
              <PreviewBulkUpload />
            )}
          </Box>
        </Grid>
      </Form>
    </Formik>
  );
};
