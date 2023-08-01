'use client';
import React, { useContext }  from 'react';
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
} from '@/components/TextFields';
import { PageTitle } from '@/components/Typography';
import { EditRole } from '@/constants/AdminOptions';
import { AdminContainer } from '@/pages/Admin';
import { AdminContext } from '@/pages/Admin/AdminContext';

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
            {/* Checkboxes */}
            <Grid item md={6}>
              <CheckboxInput label="Does this staff authorise roles?" />
            </Grid>
            <Grid item md={6}>
              <CheckboxInput label="Can this staff post operation transaction?" />
            </Grid>
            {/* Checkboxes */}

            <Grid container mt={9} ml={2}>
              {/* Button */}
              <Grid item md={3}>
                <PrimaryIconButton
                  buttonTitle="Back"
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
                  buttonTitle="Save Changes"
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

export const Role = () => {
  const { isEditing } = useContext(AdminContext);

  return (
    <AdminContainer
      form={<ModalForm />}
      title="Manage Role"
      modalTitle={isEditing ? "Edit Role": "Add New Role"}
      buttonTitle="Add New Role"
      tableTitle="View All Roles"
      searchTitle="Search by name or description"
    />
  );
};
