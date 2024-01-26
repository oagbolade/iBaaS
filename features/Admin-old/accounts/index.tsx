'use client';
import React from 'react';
import { AdminContainer } from '@/features/Admin-old';
import { Formik, Form } from 'formik';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { ModalBackButton } from '@/components/Modal/styles';
import { role as roleSchema } from '@/constants/schemas';
import { roleInitialValues } from '@/constants/types';
import {
  FormTextInput,
  CheckboxInput,
  FormSelectField,
} from '@/components/FormikFields';
import { EditRole } from '@/constants/AdminOptions';
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
      initialValues={roleInitialValues}
      onSubmit={(values, actions) => onSubmit(values, actions)}
      validationSchema={roleSchema}
    >
      <Form>
        <Box ml={{ desktop: 2 }}>
          <Grid container spacing={2}>
            <Grid
              item={isTablet}
              container={isMobile}
              mobile={12}
              tablet={6}
              justifyContent="center"
              ml={{ mobile: 3, tablet: 0 }}
            >
              <FormTextInput
                customStyle={{
                  width: setWidth(),
                }}
                name="roleName"
                placeholder="Business Development"
                label="Role Name"
                required
              />{' '}
            </Grid>
            <Grid
              item={isTablet}
              container={isMobile}
              mobile={12}
              tablet={6}
              justifyContent="center"
              ml={{ mobile: 3, tablet: 0 }}
            >
              <FormTextInput
                customStyle={{
                  width: setWidth(),
                }}
                name="roleDescription"
                placeholder="Business Development"
                label="Role Description"
                required
              />{' '}
            </Grid>
            <Grid
              item={isTablet}
              container={isMobile}
              mobile={12}
              tablet={6}
              justifyContent="center"
              ml={{ mobile: 3, tablet: 0 }}
            >
              <FormSelectField
                customStyle={{
                  width: setWidth(),
                }}
                name="branch"
                options={EditRole.idleTimeOut}
                label="Idle TimeOut"
                required
              />{' '}
            </Grid>
            <Grid
              item={isTablet}
              container={isMobile}
              mobile={12}
              tablet={6}
              justifyContent="center"
              ml={{ mobile: 3, tablet: 0 }}
            >
              <FormSelectField
                customStyle={{
                  width: setWidth(),
                }}
                name="accessDays"
                options={EditRole.accessDays}
                label="Access Days"
                required
              />{' '}
            </Grid>
            <Grid
              item={isTablet}
              container={isMobile}
              mobile={12}
              tablet={6}
              justifyContent="center"
              ml={{ mobile: 3, tablet: 0 }}
            >
              <FormSelectField
                customStyle={{
                  width: setWidth(),
                }}
                name="roleLevel"
                options={EditRole.roleLevel}
                label="Role Level"
                required
              />{' '}
            </Grid>
            <Grid
              item={isTablet}
              container={isMobile}
              mobile={12}
              tablet={6}
              justifyContent="center"
              ml={{ mobile: 3, tablet: 0 }}
            >
              <FormSelectField
                customStyle={{
                  width: setWidth(),
                }}
                name="directReport"
                options={EditRole.dataCapturePrivileges}
                label="Application Data Capture Privileges"
                required
              />{' '}
            </Grid>
            {/* Checkboxes */}
            <Grid
              item={isTablet}
              container={isMobile}
              mobile={12}
              tablet={6}
              justifyContent={{ desktop: 'center' }}
              ml={{ mobile: 4, tablet: 0 }}
              mr={{ mobile: 3, tablet: 0 }}
            >
              <CheckboxInput label="Does this staff authorise roles?" />
            </Grid>
            <Grid
              item={isTablet}
              container={isMobile}
              ml={{ mobile: 2, tablet: 0 }}
              mobile={12}
              tablet={6}
              justifyContent={{ desktop: 'center' }}
              mr={{ tablet: 1, desktop: 0 }}
              sx={{ whiteSpace: { mobile: 'break-spaces' } }}
            >
              <CheckboxInput label="Can this staff post operation transaction?" />
            </Grid>
            {/* Checkboxes */}
            <Grid
              item={isTablet}
              marginRight={{ mobile: '49px', desktop: '25px' }}
              container={isMobile}
              mobile={12}
              tablet={12}
              ml={{ mobile: 4, tablet: 0 }}
            >
              <ModalActions
                BackButtonTitle="Back"
                SaveButtonTitle="Save Changes"
                StyleBack={ModalBackButton}
              />
            </Grid>{' '}
          </Grid>
        </Box>
      </Form>
    </Formik>
  );
};

export const ManageAccount = () => {
  return (
    <AdminContainer
      form={<ModalForm />}
      title="Manage GL Account"
      modalTitle="Edit GL Account"
      buttonTitle="Add New GL Account"
      tableTitle="View All GL Account"
      searchTitle="Search GL Account"
    />
  );
};
