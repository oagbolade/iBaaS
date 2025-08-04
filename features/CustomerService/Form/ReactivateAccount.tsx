'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import dayjs, { Dayjs } from 'dayjs';
import { Formik, Form } from 'formik';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { PreviewAccountInfo } from '../Customer/CloseAccount/PreviewAccountInfo';
import { actionButtons } from './AddLien';
import { PageTitle } from '@/components/Typography';
import {
  BatchContainer,
  BatchTitle,
  PostingContainer
} from '@/features/Operation/Forms/style';
import { FormTextInput, TextInput } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { MobilePreviewContent } from '@/features/Operation/Forms//BatchPosting';
import DateTimePicker from '@/components/Revamp/FormFields/DateTimePicker';
import { useGetParams } from '@/utils/hooks/useGetParams';
import {
  useGetAccountDetails,
  useReactivateCustomerAccount
} from '@/api/customer-service/useCustomer';
import { FormSkeleton } from '@/components/Loaders';
import { reactivateAccount } from '@/schemas/customer-service';
import { reactivateCustomerAccountInitialValues } from '@/schemas/schema-values/customer-service';
import { getCurrentDate } from '@/utils/getCurrentDate';
import { encryptData } from '@/utils/encryptData';

export const ReactivateAccount = () => {
  const accountnumber = useGetParams('accountNumber') || '';
  const urlState = useGetParams('urlState');

  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const { accDetailsResults, isLoading: isAccountDetailsLoading } =
    useGetAccountDetails(encryptData(accountnumber) as string);
  const { mutate } = useReactivateCustomerAccount(urlState as string);
  const currentDate = dayjs(getCurrentDate());

  const onSubmit = (values: any) => {
    const valuedate = dayjs(values.valuedate).toISOString();

    const getAllValues = {
      ...values,
      valuedate,
      accountnumber
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
      initialValues={reactivateCustomerAccountInitialValues}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={reactivateAccount}
    >
      <Form>
        <TopActionsArea actionButtons={actionButtons} />
        <Grid container spacing={2}>
          <Box sx={BatchContainer} ml={{ desktop: 1, mobile: 5 }}>
            <PageTitle title="Reactivate Account" styles={BatchTitle} />

            <Grid container>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="accountnumber"
                  placeholder="Enter settlement account number"
                  label="Account Number"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                  value={accountnumber}
                  disabled
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <Box>
                  <DemoContainer components={['DatePicker']}>
                    <DateTimePicker
                      disabled
                      label="Value Date"
                      name="valuedate"
                      value={currentDate as Dayjs}
                    />
                  </DemoContainer>
                </Box>
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="chargeDue"
                  placeholder="Enter account number"
                  label="Reactivation Charge"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
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
                  value={`Account Reactivation In Favour Of: ${accDetailsResults?.accounttitle || 'N/A'}`}
                />
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
