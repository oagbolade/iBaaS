'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Formik, Form } from 'formik';
import { AlertColor } from '@mui/material';
import { PageTitle } from '@/components/Typography';
import {
  BatchContainer,
  BatchTitle,
  templateUploadContainer,
  templateTitle
} from '@/features/Operation/Forms/style';
import { TextInput } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { PrimaryIconButton } from '@/components/Buttons';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { UploadDocument } from '@/assets/svg';
import { VisuallyHiddenInput } from '@/features/Operation/Forms/BulkUpload';
import { PreviewUploadedMandates } from '@/features/CustomerService/Customer/Mandate/CreateMandate/PreviewUploadedMandates';
import colors from '@/assets/colors';
import { isImageValid } from '@/utils/isImageValid';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { useCreateDirectorMandate } from '@/api/customer-service/useDirectors';
import { getStoredUser } from '@/utils/user-storage';
import { toast } from '@/utils/toast';
import { convertImageToBase64 } from '@/utils/convertImageToBase64';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <PrimaryIconButton
      type="submit"
      buttonTitle="Submit"
      customStyle={submitButton}
    />
  </Box>
];

export const AddDirectorMandate = () => {
  const directorId = useGetParams('directorId') || '';
  const customerId = useGetParams('customerId') || '';
  const directorName = useGetParams('directorName') || '';

  const toastActions = React.useContext(ToastMessageContext);
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const [currentPhoto, setCurrentPhoto] = React.useState<File | null>(null);
  const [base64IMG, setBase64IMG] = React.useState<string | null>(null);
  const [fileType, setFileType] = React.useState<string>('');
  const { mutate } = useCreateDirectorMandate();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromEvent = event.target.files?.[0];
    if (!fileFromEvent) return;
    if (!isImageValid(fileFromEvent, toastActions)) return;

    convertImageToBase64(fileFromEvent)
      .then((base64) => {
        setBase64IMG(base64);
        setFileType(event.target.files?.[0].type as string);
        setCurrentPhoto(fileFromEvent);
      })
      .catch((error) => {
        const message = {
          message: `Failed to process image ${error}`,
          title: 'Image Upload Error',
          severity: 'error'
        };

        toast(
          message.message,
          message.title,
          message.severity as AlertColor,
          toastActions
        );
      });
  };

  const onSubmit = () => {
    const body = {
      directorid: directorId,
      customeriD: customerId,
      userid: getStoredUser()?.profiles.userid as string,
      authid: getStoredUser()?.companyCode as string,
      designation: 'string',
      serial: 0,
      signatoryImg: base64IMG || '',
      imgtype2: fileType,
      mandatedesc1: ''
    };

    mutate(body);
  };

  const removeUpload = () => {
    setCurrentPhoto(null);
  };

  const labelStyle = {
    color: `${colors.neutral900}`,
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '16px',
    marginBottom: '12px'
  };

  return (
    <Formik initialValues={{}} onSubmit={onSubmit}>
      <Form>
        <Box ml={4} sx={{ marginTop: '60px' }}>
          <TopActionsArea actionButtons={actionButtons} />
        </Box>
        <Grid container spacing={2}>
          <Box sx={BatchContainer} ml={{ desktop: 3, mobile: 5 }}>
            <PageTitle title="Add Mandate" styles={BatchTitle} />
            <Grid container>
              <Grid item={isTablet} mb={3} mobile={12} spacing={3}>
                <PageTitle styles={labelStyle} title="Passport Photograph" />
                {currentPhoto === null ? (
                  <Box sx={templateUploadContainer}>
                    <Button component="label" startIcon={<UploadDocument />}>
                      <VisuallyHiddenInput
                        type="file"
                        onChange={(e) => handleImageUpload(e)}
                      />
                    </Button>
                    <PageTitle title="Tap here to upload your document" />
                    <PageTitle
                      title="JPG or PNG. File size, no more than 100KB"
                      styles={{ ...templateTitle }}
                    />
                  </Box>
                ) : (
                  <PreviewUploadedMandates
                    photo={currentPhoto}
                    handleDelete={removeUpload}
                  />
                )}
              </Grid>

              <Grid item={isTablet} mobile={12} mb={3}>
                <TextInput
                  disabled
                  value={customerId}
                  name="customerId"
                  label="Customer ID"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>

              <Grid item={isTablet} mobile={12} mb={3}>
                <TextInput
                  disabled
                  value={directorId}
                  name="directorId"
                  label="Director ID"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>

              <Grid item={isTablet} mobile={12} mb={3}>
                <TextInput
                  disabled
                  value={directorName}
                  name="directorName"
                  label="Director Name"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Form>
    </Formik>
  );
};
