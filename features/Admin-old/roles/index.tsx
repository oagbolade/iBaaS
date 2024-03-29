'use client';
import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {
  ModalBackButton,
  ModalSaveButton,
  ResetButton,
} from '@/components/Modal/styles';
import { role as roleSchema } from '@/constants/schemas';
import { roleInitialValues } from '@/constants/types';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  FormTextInput,
  CheckboxInput,
  FormSelectField,
} from '@/components/FormikFields';
import { PageTitle } from '@/components/Typography';
import { EditRole } from '@/constants/AdminOptions';
import { AdminContainer } from '@/features/Admin-old';
import { PlusIcon } from '@/assets/svg';
import { roleForm, roleTitle } from './style';
import { useCurrentBreakpoint } from '@/utils';
import { ModalActions } from '@/components/Shared/ActionButtons';
import colors from '@/assets/colors';

const ModalForm = () => {
  const onSubmit = (
    values: any,
    actions: { setSubmitting: (arg0: boolean) => void },
  ) => {
    console.log({ values, actions });
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  };

  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const setDirction = () => {
    if (isMobile) return 'column';
    return 'row';
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
              ml={{ mobile: 4, tablet: 0 }}
              justifyContent={{ desktop: 'center' }}
            >
              <CheckboxInput label="Does this staff authorise roles?" />
            </Grid>
            <Grid
              item={isTablet}
              container={isMobile}
              ml={{ mobile: 2, tablet: 0 }}
              mobile={12}
              tablet={6}
              mr={{ tablet: 1, desktop: 0 }}
              whiteSpace={{ mobile: 'break-spaces' }}
              justifyContent={{ desktop: 'center' }}
              lineHeight={{ mobile: '12px' }}
            >
              <CheckboxInput label="Can this staff post operation transaction?" />
            </Grid>
            {/* Checkboxes */}

            <Grid
              item={isTablet}
              marginRight={{ mobile: '48px', desktop: '25px' }}
              mt={{ mobile: 8, tablet: 0 }}
              container={isMobile}
              mobile={12}
              tablet={12}
              justifyContent="center"
              ml={{ mobile: 3, tablet: 0 }}
              top={{ mobile: -250, tablet: 0 }}
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

export const Role = () => {
  return (
    <AdminContainer
      form={<ModalForm />}
      role="Role"
      title="Manage Role"
      modalTitle="Edit Role"
      buttonTitle="Add New Role"
      tableTitle="View All Roles"
      searchTitle="Search by name or description"
    />
  );
};
