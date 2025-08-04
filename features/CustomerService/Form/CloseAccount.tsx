'use client';
import React from 'react';
import Box from '@mui/material/Box';
import dayjs, { Dayjs } from 'dayjs';
import Grid from '@mui/material/Grid';
import { Formik, Form } from 'formik';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useSearchParams } from 'next/navigation';
import { PreviewAccountInfo } from '../Customer/CloseAccount/PreviewAccountInfo';
import { actionButtons } from './AddLien';
import { PageTitle } from '@/components/Typography';
import {
  BatchContainer,
  BatchTitle,
  PostingContainer
} from '@/features/Operation/Forms/style';
import {
  FormTextInput,
  FormikDateTimePicker,
  TextInput
} from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { MobilePreviewContent } from '@/features/Operation/Forms//BatchPosting';
import {
  useCloseCustomerAccount,
  useGetAccountDetails
} from '@/api/customer-service/useCustomer';
import { closeCustomerAccountInitialValues } from '@/schemas/schema-values/customer-service';
import { closeCustomerAccount } from '@/schemas/customer-service';
import { FormSkeleton } from '@/components/Loaders';
import { getCurrentDate } from '@/utils/getCurrentDate';
import { encryptData } from '@/utils/encryptData';

export const CloseAccount = () => {
  const searchParams = useSearchParams();
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const accountnumber = searchParams.get('accountNumber') || '';
  const urlState = searchParams.get('urlState');

  const { mutate } = useCloseCustomerAccount(urlState as string);
  const { accDetailsResults, isLoading: isAccountDetailsLoading } =
    useGetAccountDetails(encryptData(accountnumber) as string);
  const currentDate = dayjs(getCurrentDate());

  const onSubmit = (values: any) => {
    const getAllValues = {
      ...values,
      accountnumber,
      intDebit: accDetailsResults?.dintrate,
      intcredit: accDetailsResults?.cintrate
    };

    mutate(getAllValues);
  };

  if (isAccountDetailsLoading) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={3} />
      </Box>
    );
  }

  return (
    <Formik
      initialValues={{
        ...closeCustomerAccountInitialValues,
        settlementAcct: accountnumber
      }}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={closeCustomerAccount}
    >
      <Form>
        {/* <Box sx={{ marginTop: '60px' }}> */}
          <TopActionsArea actionButtons={actionButtons} />
        {/* </Box> */}
        <Grid container spacing={2}>
          <Box sx={BatchContainer} ml={{ desktop: 1, mobile: 5 }}>
            <PageTitle title="Close Account" styles={BatchTitle} />
            <Grid container>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="settlementAcct"
                  placeholder="Enter settlement account number"
                  label="Account Number"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                  disabled
                  required
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="chargeDue"
                  placeholder="Enter total charge due"
                  label="Total Charge"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                  required
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="closeBalance"
                  placeholder="Enter close balance"
                  label="Close Balance"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                  required
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <TextInput
                  name="narration"
                  placeholder="Enter narration"
                  label="Narration"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                  disabled
                  value={`Account Closure In Favour Of: ${accDetailsResults?.accounttitle || 'N/A'}`}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <Box>
                  <DemoContainer components={['DatePicker']}>
                    <FormikDateTimePicker
                      disabled
                      label="Value Date"
                      value={currentDate as Dayjs}
                    />
                  </DemoContainer>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={PostingContainer}>
            {isMobile ? (
              <MobilePreviewContent
                PreviewContent={
                  <PreviewAccountInfo accDetailsResults={accDetailsResults} />
                }
              />
            ) : (
              <PreviewAccountInfo accDetailsResults={accDetailsResults} />
            )}
          </Box>
        </Grid>
      </Form>
    </Formik>
  );
};
