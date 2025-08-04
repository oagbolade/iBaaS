'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Formik, Form } from 'formik';
import { Typography, AlertColor } from '@mui/material';
import { useSearchParams } from 'next/navigation';
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
import {
  submitButton,
  cancelButton
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { UploadDocument, AddIcon } from '@/assets/svg';
import { VisuallyHiddenInput } from '@/features/Operation/Forms/BulkUpload';
import { useCreateCustomerMandate } from '@/api/customer-service/useCustomer';
import { textTitle } from '@/components/Revamp/FormFields/style';
import { SavedMandateCard } from '@/features/CustomerService/Customer/Mandate/CreateMandate/SavedMandateCard';
import { PreviewUploadedMandates } from '@/features/CustomerService/Customer/Mandate/CreateMandate/PreviewUploadedMandates';
import { ActionButton } from '@/components/Revamp/Buttons';
import colors from '@/assets/colors';
import { isImageValid } from '@/utils/isImageValid';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { toast } from '@/utils/toast';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <PrimaryIconButton
      type="submit"
      buttonTitle="Submit"
      customStyle={submitButton}
    />
  </Box>
];

type FileType = {
  photo: File | null;
  signature: File | null;
  title: string;
  photoType: string;
  signatureType: string;
};

export const AddMandate = () => {
  const searchParams = useSearchParams();
  const AccountNumber = searchParams.get('accountNumber') || '';
  const CustomerId = searchParams.get('customerId') || '';
  const BVN = searchParams.get('bvn') || '';

  const toastActions = React.useContext(ToastMessageContext);
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const [mandateName, setMandateName] = React.useState('');
  const [currentPhoto, setCurrentPhoto] = React.useState<File | null>(null);
  const [currentSignature, setCurrentSignature] = React.useState<File | null>(
    null
  );
  const [files, setFiles] = React.useState<FileType[] | []>([]);
  const { mutate } = useCreateCustomerMandate({ AccountNumber, CustomerId });

  type ImageType = 'photo' | 'signature';

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    imageType: ImageType
  ) => {
    const fileFromEvent = event.target.files?.[0];
    if (!fileFromEvent) return;
    if (!isImageValid(fileFromEvent, toastActions)) return;

    if (imageType === 'photo') {
      setCurrentPhoto(fileFromEvent);
    }

    if (imageType === 'signature') {
      setCurrentSignature(fileFromEvent);
    }
  };

  const addMoreMandates = () => {
    if (!currentPhoto || !currentSignature) {
      const message = {
        message: 'Please upload all mandates',
        title: 'Upload mandates',
        severity: 'error'
      };

      toast(
        message.message,
        message.title,
        message.severity as AlertColor,
        toastActions
      );

      return;
    }

    setFiles([
      ...files,
      {
        title: mandateName,
        photo: currentPhoto,
        signature: currentSignature,
        photoType: currentPhoto?.type || '',
        signatureType: currentSignature?.type || ''
      }
    ]);

    setMandateName('');
    setCurrentPhoto(null);
    setCurrentSignature(null);
  };

  const onSubmit = async () => {
    if (!currentPhoto || !currentSignature) {
      const message = {
        message: 'Please upload all mandates including photo and signature',
        title: 'Upload required mandates',
        severity: 'error'
      };

      toast(
        message.message,
        message.title,
        message.severity as AlertColor,
        toastActions
      );

      return;
    }

    const body = {
      AccountNumber,
      CustomerId,
      BVN,
      PictImgType: currentPhoto?.type,
      SignImageType: currentSignature?.type,
      customerPict: currentPhoto,
      customerSign: currentSignature
    };

    mutate(body);
  };

  const removeUpload = (uploadType: ImageType) => {
    if (uploadType === 'photo') {
      setCurrentPhoto(null);
    }

    if (uploadType === 'signature') {
      setCurrentSignature(null);
    }
  };

  const removeSavedMandate = (index: number) => {
    files.splice(index, 1);
    setFiles([...files]);
  };

  const labelStyle = {
    color: `${colors.neutral900}`,
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '16px',
    marginBottom: '12px'
  };

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setMandateName(value);
  };

  return (
    <Formik initialValues={{}} onSubmit={onSubmit}>
      <Form>
        {/* <Box ml={4} sx={{ marginTop: '60px' }}> */}
          <TopActionsArea actionButtons={actionButtons} />
        {/* </Box> */}
        <Grid container spacing={2}>
          <Box sx={BatchContainer} ml={{ desktop: 3, mobile: 5 }}>
            <PageTitle title="Add Mandate" styles={BatchTitle} />
            <Grid container>
              <Grid item={isTablet} mobile={12} mb={3}>
                <TextInput
                  value={mandateName}
                  name="title"
                  placeholder="Enter mandate description"
                  label="Mandate Description"
                  onChange={onTextChange}
                  customStyle={{
                    width: '560px',
                  }}
                />
              </Grid>

              <Grid item={isTablet} mb={3} mobile={12} spacing={3}>
                <PageTitle styles={labelStyle} title="Passport Photograph" />
                {currentPhoto === null ? (
                  <Box sx={templateUploadContainer}>
                    <Button component="label" startIcon={<UploadDocument />}>
                      <VisuallyHiddenInput
                        type="file"
                        onChange={(e) => handleImageUpload(e, 'photo')}
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

              <Grid item={isTablet} mobile={12} spacing={3}>
                <PageTitle styles={labelStyle} title="Signature" />
                {currentSignature === null ? (
                  <Box sx={templateUploadContainer}>
                    <Button component="label" startIcon={<UploadDocument />}>
                      <VisuallyHiddenInput
                        type="file"
                        onChange={(e) => handleImageUpload(e, 'signature')}
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
                    signature={currentSignature}
                    handleDelete={removeUpload}
                  />
                )}
              </Grid>
            </Grid>
            {files.length !== 0 && (
              <Box>
                <Typography sx={textTitle}>Saved Mandates</Typography>

                {files.map((eachFile, index) => {
                  return (
                    <SavedMandateCard
                      handleDelete={removeSavedMandate}
                      mandateInfo={{
                        title: eachFile.title,
                        photo: eachFile.photo,
                        signature: eachFile.signature,
                        fileIndex: index
                      }}
                    />
                  );
                })}
              </Box>
            )}
          </Box>
        </Grid>
      </Form>
    </Formik>
  );
};
