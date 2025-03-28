'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form } from 'formik';
import { ModalBackButton } from './style';
import { SetupContainer } from '@/features/Setup-old';
import { FormTextInput } from '@/components/FormikFields';
import { bankValues } from '@/constants/types';
import { useCurrentBreakpoint } from '@/utils/hooks/useCurrentBreakpoint';
import { ModalActions } from '@/components/Shared/ActionButtons';

export const ModalForm = () => {
  const { isMobile, isTablet } = useCurrentBreakpoint();

  const setWidth = (width: number | string = 0) => {
    if (isTablet) return width || '100%';
  };

  const onSubmit = (
    values: any,
    actions: { setSubmitting: (arg0: boolean) => void }
  ) => {
    console.log({ values, actions });
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={bankValues}
      onSubmit={(values, actions) => onSubmit(values, actions)}
      validationSchema={{}}
    >
      <Form>
        <Box ml={{ desktop: 2, mobile: 5 }}>
          <Grid container spacing={2}>
            <Grid
              item={isTablet}
              container={isMobile}
              mobile={12}
              tablet={6}
              justifyContent="center"
            >
              <FormTextInput
                customStyle={{
                  width: setWidth()
                }}
                name="bankName"
                placeholder="Enter Bank Name"
                label=" Bank Name"
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={3}>
            <Grid
              item={isTablet}
              container={isMobile}
              mobile={12}
              tablet={6}
              justifyContent="center"
            >
              <FormTextInput
                customStyle={{
                  width: setWidth()
                }}
                name="bankCode"
                placeholder="Enter Bank Code "
                label="Bank Code"
                required
              />
            </Grid>
            <Grid
              item={isTablet}
              container={isMobile}
              mobile={12}
              tablet={6}
              justifyContent="center"
            >
              <FormTextInput
                customStyle={{
                  width: setWidth()
                }}
                name="bankMnemonic"
                placeholder=" Enter bank Mnemonic"
                label="Bank Mnemonic"
                required
              />
            </Grid>
            <ModalActions
              BackButtonTitle="Cancel"
              SaveButtonTitle="Create Bank"
              StyleBack={ModalBackButton}
            />
          </Grid>
        </Box>
      </Form>
    </Formik>
  );
};

export const modalTitle = 'Create Commercial Bank';

export const CommercialBankContainer = () => {
  return (
    <SetupContainer
      form={<ModalForm />}
      title="Commercial Banks"
      modalTitle={modalTitle}
      buttonTitle="Create New Bank"
      tableTitle="List of commercial banks"
      searchTitle="Search users"
    />
  );
};
