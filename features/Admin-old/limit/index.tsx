'use client';
import React from 'react';
import { Formik, Form } from 'formik';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { AdminContainer } from '@/features/Administrator';
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
import colors from '@/assets/colors';

export const ModalBackStyle = {
  height: { desktop: '40px', mobile: '38px' },
  width: { desktop: '86px', mobile: '76px' },
  fontSize: { desktop: '18px', mobile: '12px' },
  fontWeight: 600,
  color: `${colors.neutral900}`,
  backgroundColor: `${colors.white}`,
  borderRadius: '8px',
  border: `1px solid ${colors.neutral300}`,
};

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
                name="roleName"
                placeholder="Business Development"
                label="Role Name"
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
                name="roleDescription"
                placeholder="Business Development"
                label="Role Description"
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
                options={EditRole.idleTimeOut}
                label="Idle TimeOut"
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
                name="accessDays"
                options={EditRole.accessDays}
                label="Access Days"
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
                name="roleLevel"
                options={EditRole.roleLevel}
                label="Role Level"
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
            >
              <CheckboxInput label="Does this staff authorise roles?" />
            </Grid>
            <Grid
              item={isTablet}
              container={isMobile}
              ml={{ mobile: 1, tablet: 0 }}
              sx={{ whiteSpace: { mobile: 'break-spaces' } }}
              mobile={12}
              tablet={6}
              justifyContent={{ desktop: 'center' }}
              mr={{ tablet: 1, desktop: 0 }}
            >
              <CheckboxInput label="Can this staff post operation transaction?" />
            </Grid>
            {/* Checkboxes */}

            <Grid
              item={isTablet}
              ml={{ mobile: 4, tablet: 0 }}
              marginRight={{ mobile: '45px', desktop: '25px' }}
              justifyContent="center"
              mt={{ mobile: 8, tablet: 0 }}
              container={isMobile}
              mobile={12}
              tablet={12}
            >
              <ModalActions
                BackButtonTitle="Back"
                SaveButtonTitle="Save Changes"
                StyleBack={ModalBackStyle}
              />
            </Grid>
          </Grid>
        </Box>
      </Form>
    </Formik>
  );
};

export const PostingLimit = () => {
  return (
    <AdminContainer
      form={<ModalForm />}
      title="Manage Posting Limit"
      modalTitle="Edit Posting Limit"
      buttonTitle="Add New Posting Limit"
      tableTitle="View All Posting Limit"
      searchTitle="Search Posting list"
    />
  );
};
