'use client';
import React from 'react';
import { Formik, Form } from 'formik';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { user as userSchema } from '@/constants/schemas';
import { userInitialValues } from '@/constants/types';
import { FormTextInput, FormSelectInput } from '@/components/TextFields';
import { EditUser } from '@/constants/AdminOptions';
import { CustomerServiceContainer } from '@/features/CustomerService';
import { ModalActions } from '@/components/Modal';

const EditFormModal = () => {
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
          <Grid container spacing={2}>
            <Grid item md={6}>
              <FormTextInput
                name="customerName"
                placeholder="002789765"
                label="Customer Name"
                required
              />{' '}
            </Grid>
            <Grid item md={6}>
              <FormTextInput
                name="customerID"
                placeholder="002789765"
                label="Customer ID"
                required
              />{' '}
            </Grid>
            <ModalActions />
          </Grid>
        </Box>
      </Form>
    </Formik>
  );
};

const CustomerTypeModal = () => {
  return (
    <Box
      sx={{
        borderRadius: '8px',
        border: '1px solid var(--neutrals-text-neutral-400, #C8D2DF)',
      }}
    >
      <Stack direction="row" spacing={2}></Stack>
    </Box>
  );
};

const SearchFilters = () => {
  return (
    <Box
      sx={{
        marginBottom: '15px',
      }}
    >
      <FormSelectInput
        name="filterCustomers"
        options={EditUser.branch}
        customStyle={{
          width: '13%',
        }}
      />
    </Box>
  );
};

export const CustomerCreation = () => {
  return (
    <CustomerServiceContainer
      form={<CustomerTypeModal />}
      searchFilters={<SearchFilters />}
      title="Customer Creation"
      modalTitle="Choose Customer Type"
      buttonTitle="Create New Customer"
      tableTitle="View All Customers"
      searchTitle="Search customer list"
    />
  );
};
