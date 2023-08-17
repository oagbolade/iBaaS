'use client';
import React from 'react';
import { SetupContainer } from '@/features/Setup';
import { FormTextInput, FormSelectField } from '@/components/TextFields';
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
  ResetButton,
} from '@/components/Modal/styles';
import { role as roleSchema } from '@/constants/schemas';
import { roleInitialValues } from '@/constants/types';

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
      initialValues={roleInitialValues}
      onSubmit={(values, actions) => onSubmit(values, actions)}
      validationSchema={roleSchema}
    >
      <Form>
        <Box>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <FormTextInput
                name="roleName"
                placeholder="Business Development"
                label="Role Name"
                required
              />{' '}
            </Grid>
            <Grid item md={6}>
              <FormTextInput
                name="roleDescription"
                placeholder="Business Development"
                label="Role Description"
                required
              />{' '}
            </Grid>
            <Grid item md={6}>
              <FormSelectField
                name="branch"
                options={EditRole.idleTimeOut}
                label="Idle TimeOut"
                required
              />{' '}
            </Grid>
            <Grid item md={6}>
              <FormSelectField
                name="accessDays"
                options={EditRole.accessDays}
                label="Access Days"
                required
              />{' '}
            </Grid>
            <Grid item md={6}>
              <FormSelectField
                name="roleLevel"
                options={EditRole.roleLevel}
                label="Role Level"
                required
              />{' '}
            </Grid>
            <Grid item md={6}>
              <FormSelectField
                name="directReport"
                options={EditRole.dataCapturePrivileges}
                label="Application Data Capture Privileges"
                required
              />{' '}
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
