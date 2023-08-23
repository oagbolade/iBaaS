'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { SetupContainer } from '@/features/Setup';
import { Formik, Form } from 'formik';
import { FormTextInput } from '@/components/TextFields';
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

export const ModalForm = () => {
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
        <Box>
          <Grid container columns={16} spacing={1}>
            <Grid item xs={12}>
              <FormTextInput
                name="bankName"
                placeholder="Enter Bank Name"
                label="Bank Name"
                required
                customStyle={{ ...InputStyle }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <FormTextInput
                name="bankCode"
                placeholder="Enter Bank Code "
                label="Bank Code"
                required
              />
            </Grid>
            <Grid item md={6}>
              <FormTextInput
                name="bankMnemonic"
                placeholder=" Enter bank Mnemonic"
                label="bank Mnemonic"
                required
              />
            </Grid>
            <Grid container mt={9} ml={2}>
              {/* Button */}
              <Grid item md={3}>
                <PrimaryIconButton
                  buttonTitle="Cancel"
                  customStyle={ModalBackButton}
                />
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                item
                md={6}
              >
                <Button variant="text">
                  <PageTitle title="Reset" styles={ResetButton} />
                </Button>
              </Grid>
              <Grid item md={3}>
                <PrimaryIconButton
                  type="submit"
                  buttonTitle="Create Branch"
                  customStyle={ModalSaveButton}
                />
              </Grid>
              {/* Button */}
            </Grid>
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
