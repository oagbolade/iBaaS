/* eslint-disable react/no-unused-prop-types */
'use client';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Formik, Form } from 'formik';
import { styled } from '@mui/material/styles';
import * as XLSX from 'xlsx';
import { AlertColor, Typography } from '@mui/material';
import {
  BatchContainer,
  BatchTitle,
  PostingTitle,
  downloadDocument,
  documentUpload,
  templateUploadContainer,
  templateCopy,
  templateDownload,
  templateTitle,
  templateStyle
} from './style';
import { PageTitle } from '@/components/Typography';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { PrimaryIconButton } from '@/components/Buttons';
import { EditOperations } from '@/constants/OperationOptions';
import { FileUploadPath, UploadDocument } from '@/assets/svg';
import { useCurrentBreakpoint } from '@/utils';
import colors from '@/assets/colors';
import { useGetGenerateBatchNo } from '@/api/operation/useBatchPosting';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { isImageValid } from '@/utils/isImageValid';
import { formatFileSize } from '@/utils/formatFileSize';
import {
  fileDetailsContainer,
  removeAndSizeContainer,
  fileName,
  fileSize,
  removeButton
} from '@/features/Signup/styles';
import {
  useCreateBulkUpload,
  useCreateInsPostBulk
} from '@/api/operation/useBulkUpload';
import {
  BulkInsPostBulkInitialValues,
  BulkUploadInitialValues
} from '@/schemas/schema-values/operation';
import { toast } from '@/utils/toast';

export const VisuallyHiddenInput = styled('input')({
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
  boxShadow: 'none'
});

export const PreviewBulkUpload: React.FC = () => {
  return (
    <Box>
      <Box ml={{ mobile: 1, tablet: 0 }}>
        <Grid item mb={3} spacing={3}>
          <PageTitle
            title="Steps required for a bulk upload"
            styles={PostingTitle}
          />
        </Grid>
      </Box>
      <Grid item ml={{ mobile: 1, tablet: 0 }}>
        <PageTitle title="Step 1" />
        <PageTitle title="Choose File Type" styles={{ ...templateCopy }} />
        <PageTitle
          title="Select the file template to download. you can download the file <Button>here</Button>"
          styles={{ ...templateDownload }}
        />
      </Grid>
      <Grid item ml={{ mobile: 1, tablet: 0 }} mt={4}>
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
      <Grid item ml={{ mobile: 1, tablet: 0 }} mt={4}>
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
type Props = {
  isSubmitting?: boolean;
  setIsSubmitting?: (submit: boolean) => void;
  onFileChange?: Function;
};

export const BulkUpload = ({
  isSubmitting,
  setIsSubmitting,
  onFileChange
}: Props) => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const { batchno } = useGetGenerateBatchNo();
  const batchPostingNo = batchno ? batchno.toString() : '';
  const [fileImage, setFileImage] = useState<any>();
  const toastActions = React.useContext(ToastMessageContext);
  const { mutate } = useCreateBulkUpload();
  const { mutate: createMutate } = useCreateInsPostBulk();

  const [fieldVale, setFieldValue] = React.useState<any>();
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValueFromProps: Function
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const validFileType =
      file.type ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    if (!validFileType) {
      toast(
        'Invalid file type. Please upload a valid .xlsx file.',
        'Validation Error',
        'error',
        toastActions
      );
      return;
    }
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast(
        `File size exceeds the limit of 10MB. Your file size is ${formatFileSize(file.size)}.`,
        'Validation Error',
        'error',
        toastActions
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target?.result;
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json: (string | number)[][] = XLSX.utils.sheet_to_json(worksheet, {
        header: 1
      });
      const amountColumnIndex = json[0]?.findIndex(
        (col) => typeof col === 'string' && col.toLowerCase() === 'amount'
      );
      const total = json
        .slice(1) // Skip the header row
        .reduce((sum, row) => {
          const value = row[amountColumnIndex];
          return sum + (typeof value === 'number' ? value : 0);
        }, 0);
      setFieldValue(total);
    };
    setFileImage(file);
    reader.readAsArrayBuffer(file);
  };
  const handleDownloadTemplate = () => {
    const link = document.createElement('a');
    link.href =
      'https://res.cloudinary.com/oladayoagbolade/raw/upload/v1721044194/hqofgunzsz45itce3ylk.xlsx'; // Ensure this path is correct
    link.download = 'bulkposting.xlsx';
    link.click();
  };
  const onSubmit = async (values: any, actions: { resetForm: Function }) => {
    const toastMessage = {
      title: 'Validation error',
      severity: 'error',
      file: {
        message: 'file is required'
      }
    };
    if (fileImage.name === '') {
      toast(
        toastMessage.file.message,
        toastMessage.title,
        toastMessage.severity as AlertColor,
        toastActions
      );

      return;
    }
    const getAllValues = {
      ...values,
      file: fileImage
    };
    const getValue = {
      ...values,
      Typ_BulkTran: fileImage,
      Menuid: 15
    };
    await mutate(getAllValues);
    await createMutate(getValue);
  };
  useEffect(() => {
    const submit = document.getElementById('submitButton');

    if (isSubmitting) {
      submit?.click();
    }

    return () => {
      setIsSubmitting?.(false);
    };
  }, [isSubmitting]);

  return (
    <Formik
      initialValues={BulkUploadInitialValues || BulkInsPostBulkInitialValues}
      onSubmit={(values, actions) => onSubmit(values, actions)}
    >
      <Form>
        <Grid container spacing={2}>
          <Box sx={BatchContainer} ml={{ desktop: 1, mobile: 3 }}>
            <PageTitle title="Bulk Upload" styles={BatchTitle} />
            <Grid container>
              <Grid item={isTablet} mobile={12}>
                <FormSelectField
                  name="fileType"
                  options={EditOperations.office}
                  label="Ms Office Excel Type"
                  customStyle={{
                    width: setWidth(isMobile ? '400px' : '100%')
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12} mt={3}>
                <PageTitle title="Upload Template" />
                <Box sx={templateUploadContainer}>
                  <Button
                    component="label"
                    className="file"
                    startIcon={<UploadDocument />}
                  >
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(e) => handleFileChange(e, setFieldValue)}
                    />
                  </Button>
                  <PageTitle title="Tap here to upload your document" />
                  <PageTitle
                    title="Xlsx. File size, no more than 10MB"
                    styles={{ ...templateTitle }}
                  />
                </Box>
              </Grid>
              <Grid item={isTablet} mobile={12} mt={3}>
                {fileImage && (
                  <Box sx={fileDetailsContainer}>
                    <Typography sx={fileName}>{fileImage?.name}</Typography>

                    <Box sx={removeAndSizeContainer}>
                      <Typography sx={fileSize}>
                        {formatFileSize(fileImage?.size)}
                      </Typography>

                      <Typography
                        onClick={() => setFileImage('')}
                        sx={removeButton}
                      >
                        Remove
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Grid>
              <Grid item={isTablet} mobile={12} mt={3}>
                <PageTitle title="Download Template below" />
                <Box sx={documentUpload}>
                  <FileUploadPath />

                  <PageTitle title="bulkposting.xlsx" />
                  <Box sx={{ marginLeft: { mobile: '50px', tablet: '150px' } }}>
                    <PageTitle title="101kb" />
                  </Box>
                  <PrimaryIconButton
                    buttonTitle="Download"
                    customStyle={{ ...downloadDocument }}
                    onClick={() => handleDownloadTemplate()}
                  />
                </Box>
              </Grid>
              <Grid item={isTablet} mobile={12} mt={3}>
                <FormTextInput
                  name="batchNo"
                  placeholder=""
                  label="Batch No"
                  customStyle={{
                    width: setWidth(isMobile ? '400px' : '100%')
                  }}
                  value={batchPostingNo}
                  disabled
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="transactionAmount"
                  placeholder=""
                  label="Total Transaction Amount"
                  customStyle={{
                    width: setWidth(isMobile ? '400px' : '100%')
                  }}
                  value={fieldVale?.toString()}
                  disabled
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <button id="submitButton" type="submit" style={{ display: 'none' }}>
          submit alias
        </button>
      </Form>
    </Formik>
  );
};
