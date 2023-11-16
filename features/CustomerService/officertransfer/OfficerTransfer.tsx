'use client';
import React from 'react';
import { Formik, Form } from 'formik';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { user as userSchema } from '@/constants/schemas';
import { userInitialValues } from '@/constants/types';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { EditUser } from '@/constants/AdminOptions';
import { CustomerServiceContainer } from '@/features/CustomerService';
import { Typography } from '@mui/material';
import { useCurrentBreakpoint } from '@/utils';
import { ModalActions } from '@/components/Shared/ActionButtons';
import Stack from '@mui/material/Stack';
import { ModalBackButton } from '@/components/Modal/styles';

const ModalForm = () => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
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
      initialValues={userInitialValues}
      onSubmit={(values, actions) => onSubmit(values, actions)}
      validationSchema={userSchema}
    >
      <Form>
        <Box ml={{ desktop: 2, mobile: 2, tablet: 4 }}>
          <Grid item container desktop={6} tablet={6}>
            <Typography
              sx={{
                marginTop: '20px',
                margin: '10px',
                whiteSpace: {
                  mobile: 'break-spaces',
                  lineHeight: { mobile: 20 },
                },
              }}
            >
              <span style={{ font: '16px arial' }}>
                You must be a regional or area manager to use this module
              </span>
              . Fill details below to proceed.
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            <Grid
              item={isTablet}
              container={isMobile}
              ml={{ mobile: 5, tablet: 4 }}
              mobile={12}
              tablet={5}
              justifyContent="center"
              mr={{ mobile: 3, tablet: 0 }}
            >
              <FormTextInput
                customStyle={{
                  width: setWidth(),
                }}
                name="idNumber"
                placeholder="Enter ID Number"
                label="ID Number"
                required
              />{' '}
            </Grid>
            <Grid
              item={isTablet}
              container={isMobile}
              ml={{ mobile: 3, tablet: 0 }}
              mobile={12}
              tablet={5}
              justifyContent="center"
              mr={{ mobile: 3, tablet: 0 }}
            >
              <FormSelectField
                customStyle={{
                  width: setWidth(),
                }}
                name="role"
                options={EditUser.branch}
                label="Role"
                required
              />{' '}
            </Grid>
            <Grid
              item
              marginLeft={{ mobile: '159px', desktop: '30px' }}
              container
              desktop={12}
              mobile={6}
              tablet={12}
              justifyContent="center"
              ml={{ tablet: 4 }}
            >
              <ModalActions
                StyleBack={ModalBackButton}
                BackButtonTitle="Back"
                SaveButtonTitle="Save Charges"
              />
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
