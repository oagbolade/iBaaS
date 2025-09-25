import React from 'react';
import { AlertColor, Box, Button, Grid, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import dayjs from 'dayjs';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import {
  FormikDateTimePicker,
  FormSelectField,
  FormTextInput
} from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { ICurrency } from '@/api/ResponseTypes/general';
import { FormSkeleton } from '@/components/Loaders';
import {
  useCreateCompany,
  useGetCompanyByCode
} from '@/api/setup/useCreateCompany';
import { createCompanyInitialValues } from '@/schemas/schema-values/setup';
import { createCompanySchema } from '@/schemas/setup';
import { IStates } from '@/api/ResponseTypes/customer-service';
import { encryptData } from '@/utils/encryptData';
import { PageTitle } from '@/components/Typography';
import { UploadDocument } from '@/assets/svg';
import {
  templateTitle,
  templateUpload,
  templateUploadContainer
} from '@/features/Operation/Forms/style';
import { VisuallyHiddenInput } from '@/features/Operation/Forms/BulkUpload';
import { isImageValid } from '@/utils/isImageValid';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { toast } from '@/utils/toast';
import {
  fileDetailsContainer,
  fileName,
  fileSize,
  removeAndSizeContainer,
  removeButton
} from '@/features/Signup/styles';
import { formatFileSize } from '@/utils/formatFileSize';
import { convertImageToBase64 } from '@/utils/convertImageToBase64';
import { useUploadBankLogo } from '@/api/customer-service/useCustomer';

type Props = {
  isSubmitting: boolean;
  userid?: string | null;
  currencies: ICurrency[] | Array<any>;
  states: IStates[] | Array<any>;
  setIsSubmitting: (submit: boolean) => void;
};

export const SetupCompanyForm = ({
  isSubmitting,
  setIsSubmitting,
  userid,
  currencies,
  states
}: Props) => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const { mappedCurrency, mappedState } = useMapSelectOptions({
    currencies,
    states
  });

  const { bank, isLoading: isCompanyInfoLoading } = useGetCompanyByCode();
  const bankCode = bank?.bankCode || '';
  const { mutate } = useCreateCompany(bankCode);
  const toastActions = React.useContext(ToastMessageContext);

 const [uploadedPhotoUrl, setUploadedPhotoUrl] = React.useState<string | null>(null);
  const [currentPhoto, setCurrentPhoto] = React.useState<File | null>(null);
  const [base64Photo, setBase64Photo] = React.useState<string | null>(null);

  const onSubmit = async (values: any) => {
    const formattedLastFinancialyearDate = dayjs(
      values.last_financialyear
    ).format('YYYY-MM-DD');
    const formattedNextFinancialyearDate = dayjs(
      values.next_financialyear
    ).format('YYYY-MM-DD');
    const permissionOptions = document.getElementsByClassName(
      'permissionOptions'
    ) as HTMLCollectionOf<HTMLInputElement>;

    const authtype = Number(permissionOptions[0]?.value) || 0;
    const statement = Number(permissionOptions[1]?.value) || 0;
    const globalAuth = Number(permissionOptions[2]?.value) || 0;

    if (!uploadedPhotoUrl) {
      const message = {
        message: 'Please upload the new bank photo',
        title: 'Upload required Bank Photo',
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

    await mutate({
      ...values,
      authtype,
      statement,
      globalAuth,
      bankLogo: uploadedPhotoUrl,
      last_financialyear: formattedLastFinancialyearDate,
      next_financialyear: formattedNextFinancialyearDate
    });
  };

  type ImageType = 'photo' | 'signature';

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    imageType: ImageType
  ) => {
    const fileFromEvent = event.target.files?.[0];
    if (!fileFromEvent) return;
    if (!isImageValid(fileFromEvent, toastActions)) return;

    if (imageType === "photo") {
    setCurrentPhoto(fileFromEvent);

    try {
      const base64 = await convertImageToBase64(fileFromEvent);
      setBase64Photo(base64);

      const uploadedImage = await useUploadBankLogo(toastActions, fileFromEvent);

      if (uploadedImage?.url) {
        setUploadedPhotoUrl(uploadedImage.url); 
      } else {
        toast("Failed to upload photo", "Error", "error", toastActions);
      }
    } catch (error) {
      toast("Failed to process or upload image", "Error", "error", toastActions);
    }
  }
  };

  const removeUpload = (uploadType: ImageType) => {
    if (uploadType === 'photo') {
      setCurrentPhoto(null);
      setBase64Photo(null);
    }
  };



  React.useEffect(() => {
    const submit = document.getElementById('submitButton');
    if (isSubmitting) {
      submit?.click();
    }
    return () => {
      setIsSubmitting(false);
    };
  }, [isSubmitting]);

  if (isCompanyInfoLoading) {
    return <FormSkeleton noOfLoaders={5} />;
  }

  const initialValues = bank
    ? {
        ...createCompanyInitialValues,
        ...bank,
        last_financialyear: bank.last_financialyear
          ? dayjs(bank.last_financialyear)
          : null,
        next_financialyear: bank.next_financialyear
          ? dayjs(bank.next_financialyear)
          : null
      }
    : createCompanyInitialValues;

  return (
    <Box>
      <Box>
        <LargeTitle title="Setup Company" />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' }
        }}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => onSubmit(values)}
          validationSchema={createCompanySchema}
        >
          {({ values }) => (
            <Form>
              <Box mt={4}>
                <Grid container>
                  <Grid
                    item={isTablet}
                    mobile={12}
                    mr={{ mobile: 35, tablet: 0 }}
                    width={{ mobile: '100%', tablet: 0 }}
                  >
                    <FormTextInput
                      customStyle={{
                        width: setWidth(isMobile ? '285px' : '100%')
                      }}
                      name="bankName"
                      placeholder="Bosun MFB"
                      label="Company Name"
                      disabled
                    />
                  </Grid>
                  <Grid item={isTablet} mobile={12} spacing={3}>
                    <PageTitle title="Upload Bank Logo" />
                    <Box sx={templateUploadContainer}>
                      <Button component="label" startIcon={<UploadDocument />}>
                        <VisuallyHiddenInput
                          type="file"
                             onChange={(e) => handleImageUpload(e, "photo")}
                        />
                      </Button>
                      <PageTitle title="Tap here to upload your document" />
                      <PageTitle
                        title="JPG or PNG. File size, no more than 10MB"
                        styles={{ ...templateTitle }}
                      />
                    </Box>
                  </Grid>
                  <Grid item={isTablet} mobile={12} mt={3}>
                    {currentPhoto && (
                      <Box sx={fileDetailsContainer}>
                        <Typography sx={fileName}>
                          {currentPhoto?.name}
                        </Typography>
                        <Box sx={removeAndSizeContainer}>
                          <Typography sx={fileSize}>
                            {formatFileSize(currentPhoto?.size)}
                          </Typography>
                          <Typography
                            onClick={() => removeUpload('photo')} // Fixed typo
                            sx={removeButton}
                          >
                            Remove
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </Grid>
                  <Grid
                    item={isTablet}
                    mobile={12}
                    mr={{ mobile: 35, tablet: 0 }}
                  >
                    <FormTextInput
                      customStyle={{
                        width: setWidth(isMobile ? '285px' : '100%')
                      }}
                      name="cbncode"
                      placeholder="Enter Code"
                      label="CBN Code"
                    />
                  </Grid>
                  <Grid
                    item={isTablet}
                    mobile={12}
                    mr={{ mobile: 35, tablet: 0 }}
                  >
                    <FormTextInput
                      customStyle={{
                        width: setWidth(isMobile ? '285px' : '100%')
                      }}
                      name="webSite"
                      placeholder="Enter text"
                      label="Website"
                    />
                  </Grid>
                  <Grid
                    item={isTablet}
                    mobile={12}
                    mr={{ mobile: 35, tablet: 0 }}
                  >
                    <FormTextInput
                      customStyle={{
                        width: setWidth(isMobile ? '285px' : '100%')
                      }}
                      name="email"
                      placeholder="Enter Text"
                      label="Email Address"
                    />
                  </Grid>
                  <Grid
                    item={isTablet}
                    mobile={12}
                    mr={{ mobile: 35, tablet: 0 }}
                  >
                    <FormTextInput
                      customStyle={{
                        width: setWidth(isMobile ? '285px' : '100%')
                      }}
                      name="address"
                      placeholder="Enter text"
                      label="Company Address"
                    />
                  </Grid>
                  <Grid
                    item={isTablet}
                    mobile={12}
                    mr={{ mobile: 35, tablet: 0 }}
                  >
                    <FormTextInput
                      customStyle={{
                        width: setWidth(isMobile ? '285px' : '100%')
                      }}
                      name="phone"
                      placeholder="Enter text"
                      label="Phone Number"
                    />
                  </Grid>
                  <Grid mb={1} item={isTablet} mobile={12}>
                    <FormSelectField
                      customStyle={{
                        width: setWidth(isMobile ? '285px' : '100%'),
                        fontSize: '14px'
                      }}
                      name="currency"
                      options={mappedCurrency}
                      label="Currency"
                    />
                  </Grid>
                  <Grid mb={1} item={isTablet} mobile={12}>
                    <FormSelectField
                      customStyle={{
                        width: setWidth(isMobile ? '285px' : '100%'),
                        fontSize: '14px'
                      }}
                      name="state"
                      options={mappedState}
                      label="Head Office State"
                    />
                  </Grid>
                  <Grid mb={1} item={isTablet} mobile={12}>
                    <FormTextInput
                      customStyle={{
                        width: setWidth(isMobile ? '285px' : '100%')
                      }}
                      name="priorpandLacct"
                      label="Prime Lending Rate"
                      placeholder="Enter text"
                    />
                  </Grid>
                  <Grid
                    item={isTablet}
                    mobile={12}
                    mr={{ mobile: 35, tablet: 0 }}
                  >
                    <FormTextInput
                      customStyle={{
                        width: setWidth(isMobile ? '285px' : '100%')
                      }}
                      name="servername"
                      placeholder="Enter text"
                      label="Server Name"
                    />
                  </Grid>
                  <Grid
                    item={isTablet}
                    mobile={12}
                    mr={{ mobile: 35, tablet: 0 }}
                  >
                    <FormTextInput
                      customStyle={{
                        width: setWidth(isMobile ? '285px' : '100%')
                      }}
                      name="slogan"
                      placeholder="Enter text"
                      label="Slogan"
                    />
                  </Grid>
                  <Grid
                    item={isTablet}
                    mobile={12}
                    mr={{ mobile: 35, tablet: 0 }}
                  >
                    <FormTextInput
                      customStyle={{
                        width: setWidth(isMobile ? '285px' : '100%')
                      }}
                      name="pandLacct"
                      placeholder="Enter text"
                      label="P and L Account"
                    />
                  </Grid>
                  <Grid
                    item={isTablet}
                    mobile={12}
                    mr={{ mobile: 35, tablet: 0 }}
                  >
                    <FormTextInput
                      customStyle={{
                        width: setWidth(isMobile ? '285px' : '100%')
                      }}
                      name="eoYglacct"
                      placeholder="Enter text"
                      label="EOY P and L"
                    />
                  </Grid>
                  <Grid item={isTablet} mobile={12}>
                    <Box>
                      <FormikDateTimePicker
                        label="Last Financial Year"
                        name="last_financialyear"
                        value={values.last_financialyear ?? undefined} // Use Formik values
                      />
                    </Box>
                  </Grid>
                  <Grid item={isTablet} mobile={12}>
                    <Box>
                      <FormikDateTimePicker
                        label="Next Financial Year"
                        name="next_financialyear"
                        value={values.next_financialyear ?? undefined} // Use Formik values
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <button
                id="submitButton"
                type="submit"
                style={{ display: 'none' }}
              >
                submit alias
              </button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};
