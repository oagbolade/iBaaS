'use client';
import React from 'react';
import { SetupContainer } from '@/features/Setup-old';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { PrimaryIconButton } from '@/components/Buttons';
import { PageTitle } from '@/components/Typography';
import { EditRole } from '@/constants/AdminOptions';
import { Formik, Form } from 'formik';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {
  ModalBackButton,
  ModalSaveButton,
  ResetButton
} from '@/components/Modal/styles';
import { role as roleSchema } from '@/schemas/admin';

import { roleInitialValues } from '@/constants/types';
import { useCurrentBreakpoint } from '@/utils';

const ModalForm = () => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();

  const onSubmit = (
    values: any,
    actions: { setSubmitting: (arg0: boolean) => void }
  ) => {
    console.log({ values, actions });
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  };

  const setDirection = () => {
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
        <Box ml={{ desktop: 5, mobile: 4 }}>
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
            >
              <FormTextInput
                customStyle={{
                  width: setWidth()
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
            >
              <FormSelectField
                customStyle={{
                  width: setWidth()
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
            >
              <FormSelectField
                customStyle={{
                  width: setWidth()
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
            >
              <FormSelectField
                customStyle={{
                  width: setWidth()
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
            >
              <FormSelectField
                customStyle={{
                  width: setWidth()
                }}
                name="directReport"
                options={EditRole.dataCapturePrivileges}
                label="Application Data Capture Privileges"
                required
              />{' '}
            </Grid>
            <Grid container mt={9} ml={5}>
              {/* Button */}
              <Grid item tablet={3}>
                <PrimaryIconButton
                  buttonTitle="Cancel"
                  customStyle={ModalBackButton}
                />
              </Grid>
              <Grid
                container
                direction={setDirection()}
                justifyContent="center"
                item
                tablet={6}
              >
                <Grid item mobile={12} desktop={6}>
                  <Button variant="text">
                    <PageTitle title="Reset" styles={ResetButton} />
                  </Button>
                </Grid>
              </Grid>
              <Grid item tablet={3}>
                <PrimaryIconButton
                  type="submit"
                  buttonTitle="Create Bank"
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

export const BranchManageContainer = () => {
  return (
    <SetupContainer
      form={<ModalForm />}
      title="Manage Branches"
      modalTitle="Create Branch"
      buttonTitle="Create new branch"
      tableTitle="List of Branches"
      searchTitle="Search by name or description"
    />
  );
};
