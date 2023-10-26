'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { SetupContainer } from '@/features/Setup';
import { Formik, Form } from 'formik';
import { FormTextInput } from '@/components/FormikFields';
import { bank as bankSchema } from '@/constants/schemas';
import { bankValues } from '@/constants/types';
import { PageTitle } from '@/components/Typography';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  InputStyle,
  ModalBackButton,
  ModalSaveButton,
  ResetButton,
} from './style';
import { useCurrentBreakpoint } from '@/utils/useCurrentBreakpoint';
import { ModalActions } from '@/components/Shared/ActionButtons';

export const ModalForm = () => {
  const { isMobile, isTablet } = useCurrentBreakpoint();

  const setWidth = (width: number | string = 0) => {
    if (isTablet) return width || '100%';
  };
  const setDirction = () => {
    if (isMobile) return 'column';
    return 'row';
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
      validationSchema={bankSchema}
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
                  width: setWidth(),
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
                  width: setWidth(),
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
                  width: setWidth(),
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
