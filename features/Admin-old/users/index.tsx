'use client';
import React from 'react';
import { Formik, Form } from 'formik';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { ModalBackButton } from '@/components/Modal/styles';
import { user as userSchema } from '@/constants/schemas';
import { userInitialValues } from '@/constants/types';
import {
  FormTextInput,
  CheckboxInput,
  FormSelectField,
} from '@/components/FormikFields';
import { EditUser } from '@/constants/AdminOptions';
import { AdminContainer } from '@/features/Admin-old';
import { useCurrentBreakpoint } from '@/utils';
import { ModalActions } from '@/components/Shared/ActionButtons';

const ModalForm = () => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();

  const onSubmit = (
    values: any,
    actions: { setSubmitting: (arg0: boolean) => void },
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
        <Box ml={{ desktop: 3 }}>
          <Grid container spacing={2}>
            <Grid
              item={isTablet}
              ml={{ mobile: 3, tablet: 0 }}
              container={isMobile}
              mobile={12}
              tablet={6}
              justifyContent="center"
            >
              <FormTextInput
                customStyle={{
                  width: setWidth(),
                  height: { mobile: '20px' },
                }}
                name="staffId"
                placeholder="002789765"
                label="Staff Id"
                required
              />{' '}
            </Grid>
            <Grid
              item={isTablet}
              ml={{ mobile: 3, tablet: 0 }}
              container={isMobile}
              mobile={12}
              tablet={6}
              justifyContent="center"
            >
              <FormTextInput
                customStyle={{
                  width: setWidth(),
                }}
                name="staffName"
                placeholder="002789765"
                label="Staff Name"
                required
              />{' '}
            </Grid>
            <Grid
              item={isTablet}
              ml={{ mobile: 3, tablet: 0 }}
              container={isMobile}
              mobile={12}
              tablet={6}
              justifyContent="center"
            >
              <FormTextInput
                customStyle={{
                  width: setWidth(),
                }}
                name="address"
                placeholder="002789765"
                label="Email Address"
                required
              />{' '}
            </Grid>
            <Grid
              item={isTablet}
              ml={{ mobile: 3, tablet: 0 }}
              container={isMobile}
              mobile={12}
              tablet={6}
              justifyContent="center"
            >
              <FormTextInput
                customStyle={{
                  width: setWidth(),
                }}
                name="mobileNumber"
                placeholder="002789765"
                label="Mobile Number"
                required
              />{' '}
            </Grid>
            <Grid
              item={isTablet}
              ml={{ mobile: 3, tablet: 0 }}
              container={isMobile}
              mobile={12}
              tablet={6}
              justifyContent="center"
            >
              <FormSelectField
                customStyle={{
                  width: setWidth(),
                }}
                name="branch"
                options={EditUser.branch}
                label="Branch"
                required
              />{' '}
            </Grid>
            <Grid
              item={isTablet}
              ml={{ mobile: 3, tablet: 0 }}
              container={isMobile}
              mobile={12}
              tablet={6}
              justifyContent="center"
            >
              <FormSelectField
                customStyle={{
                  width: setWidth(),
                }}
                name="department"
                options={EditUser.branch}
                label="Department"
                required
              />{' '}
            </Grid>
            <Grid
              item={isTablet}
              ml={{ mobile: 3, tablet: 0 }}
              container={isMobile}
              mobile={12}
              tablet={6}
              justifyContent="center"
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
              item={isTablet}
              ml={{ mobile: 3, tablet: 0 }}
              container={isMobile}
              mobile={12}
              tablet={6}
              justifyContent="center"
            >
              <FormSelectField
                customStyle={{
                  width: setWidth(),
                }}
                name="directReport"
                options={EditUser.branch}
                label="Direct Report"
                required
              />{' '}
            </Grid>
            <Grid
              item={isTablet}
              ml={{ mobile: 3, tablet: 0 }}
              container={isMobile}
              mobile={12}
              tablet={6}
              justifyContent="center"
            >
              <FormSelectField
                customStyle={{
                  width: setWidth(),
                }}
                name="staffStatus"
                options={EditUser.branch}
                label="Staff Status"
                required
              />{' '}
            </Grid>
            <Grid
              item={isTablet}
              ml={{ mobile: 3, tablet: 0 }}
              container={isMobile}
              mobile={12}
              tablet={6}
              justifyContent="center"
            >
              <FormSelectField
                customStyle={{
                  width: setWidth(),
                }}
                name="sbuUnit"
                options={EditUser.branch}
                label="SBU Unit"
                required
              />{' '}
            </Grid>

            {/* Checkboxes */}
            <Grid item={isTablet} container={isMobile} mobile={12} tablet={6}>
              <CheckboxInput label="Does this staff supervise others?" />
            </Grid>
            <Grid
              item={isTablet}
              mr={{ tablet: 1, desktop: 0 }}
              container={isMobile}
              mobile={12}
              tablet={6}
            >
              <CheckboxInput label="Can this staff print statements?" />
            </Grid>
            {/* Checkboxes */}
            <Grid
              item={isTablet}
              mt={{ mobile: 9, tablet: 0 }}
              container={isMobile}
              mobile={12}
              tablet={12}
              top={{ mobile: -100, tablet: 0 }}
            >
              <ModalActions
                BackButtonTitle="Back"
                SaveButtonTitle="Save Changes"
                StyleBack={ModalBackButton}
              />
            </Grid>
          </Grid>
        </Box>
      </Form>
    </Formik>
  );
};

export const Users = () => {
  return (
    <AdminContainer
      form={<ModalForm />}
      title="Manage Users"
      modalTitle="Edit User"
      buttonTitle="Add New User"
      tableTitle="View All Users"
      searchTitle="Search users"
    />
  );
};
