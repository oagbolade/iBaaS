'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form } from 'formik';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';
import { chequeBook, chequeBookTitle } from './style';
import { PageTitle } from '@/components/Typography';
import { BatchContainer, BatchTitle } from '@/features/Operation/Forms/style';
import {
  FormTextInput,
  FormikRadioButton,
  FormikDateTimePicker
} from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { PrimaryIconButton } from '@/components/Buttons';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { CheckBookIcon } from '@/assets/svg';
import { editChequeBookInitialValues } from '@/schemas/schema-values/customer-service';
import { useEditChequeBook } from '@/api/customer-service/useCheque';
import { editCheque } from '@/schemas/customer-service';

import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';

export const EditChequebook = () => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const searchParams = useSearchParams();
  const accountNumber = searchParams.get('accountNumber') || '';

  const urlState = searchParams.get('urlState');

  const { isLoading } = useGlobalLoadingState();

  const { mutate } = useEditChequeBook(urlState);
  const actionButtons: any = [
    <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
      <PrimaryIconButton
        type="submit"
        isLoading={isLoading}
        buttonTitle="Submit"
        customStyle={{ ...submitButton }}
      />
    </Box>
  ];

  const onSubmit = (values: any) => {
    const valueDate = dayjs(values.valueDate).toISOString();
    const { checktype } = values;
    const endSerialNo = Number(values.endSerialNo);
    const startSerialNo = Number(values.startSerialNo);
    const getAllValues = {
      ...values,
      valueDate,
      accountNumber,
      checktype,
      endSerialNo,
      startSerialNo
    };
    mutate(getAllValues);
  };

  return (
    <Formik
      initialValues={editChequeBookInitialValues}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={editCheque}
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
                  <Box
                    sx={{
                      display: 'flex',
                      width: '528px',
                      height: '60px',
                      gap: '8px'
                    }}
                  >
                    <CheckBookIcon />
                    <PageTitle
                      title="Enter a Range of Cheque number(s) to be hotlisted Or De-hotlisted. 
                      If you have 1 Cheque, Please enter the same Cheque Number as the Start No and End No."
                      styles={{ ...chequeBookTitle }}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item={isTablet} mobile={12} mt={3}>
                <FormikRadioButton
                  options={[
                    { label: 'Hotlisted', value: '1' },
                    { label: 'De-hotlisted ', value: '0' }
                  ]}
                  title="Please Select Action"
                  name="checktype"
                  value="1"
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="startSerialNo"
                  placeholder="Enter start number"
                  label="Start No"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="endSerialNo"
                  placeholder="Enter end number"
                  label="End No"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <Box>
                  <DemoContainer components={['DatePicker']}>
                    <FormikDateTimePicker label="Value Date" name="valueDate" />
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
