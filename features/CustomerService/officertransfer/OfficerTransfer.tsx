'use client';
import React from 'react';
import { Formik, Form } from 'formik';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { ModalActions } from '@/components/Modal';
import { user as userSchema } from '@/constants/schemas';
import { userInitialValues } from '@/constants/types';
import { FormTextInput, FormSelectField } from '@/components/TextFields';
import { EditUser } from '@/constants/AdminOptions';
import { CustomerServiceContainer } from '@/features/CustomerService';
import { Typography } from '@mui/material';

const ModalForm = () => {
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
      initialValues={userInitialValues}
      onSubmit={(values, actions) => onSubmit(values, actions)}
      validationSchema={userSchema}
    >
      <Form>
        <Box>
          <Typography>
            <span style={{}}>
              You must be a regional or area manager to use this module
            </span>
            . Fill details below to proceed.
          </Typography>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <FormTextInput
                name="idNumber"
                placeholder="Enter ID Number"
                label="ID Number"
                required
              />{' '}
            </Grid>
            <Grid item md={6}>
              <FormSelectField
                name="role"
                options={EditUser.branch}
                label="Role"
                required
              />{' '}
            </Grid>
            <Grid container mt={9} ml={2}>
              <ModalActions />
            </Grid>
          </Grid>
        </Box>
      </Form>
    </Formik>
  );
};

export const OfficerTransfer = () => {
  return (
    <CustomerServiceContainer
      isOfficerTransfer
      form={<ModalForm />}
      title="Officer Transfer"
      modalTitle="Officer Transfer"
      buttonTitle="Create New Customer"
      tableTitle="View All Officer Details"
      searchTitle="Search list"
    />
  );
};
