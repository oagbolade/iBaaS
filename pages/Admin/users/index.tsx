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
import { user as userSchema } from '@/constants/schemas';
import { userInitialValues } from '@/constants/types';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  FormTextInput,
  CheckboxInput,
  FormSelectField,
} from '@/components/TextFields';
import { PageTitle } from '@/components/Typography';
import { EditUser } from '@/constants/AdminOptions';
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
      initialValues={userInitialValues}
      onSubmit={(values, actions) => onSubmit(values, actions)}
      validationSchema={userSchema}
    >
      <Form>
        <Box>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <FormTextInput
                name="staffId"
                placeholder="002789765"
                label="Staff Id"
                required
              />{' '}
            </Grid>
            <Grid item md={6}>
              <FormTextInput
                name="staffName"
                placeholder="002789765"
                label="Staff Name"
                required
              />{' '}
            </Grid>
            <Grid item md={6}>
              <FormTextInput
                name="address"
                placeholder="002789765"
                label="Email Address"
                required
              />{' '}
            </Grid>
            <Grid item md={6}>
              <FormTextInput
                name="mobileNumber"
                placeholder="002789765"
                label="Mobile Number"
                required
              />{' '}
            </Grid>
            <Grid item md={6}>
              <FormSelectField
                name="branch"
                options={EditUser.branch}
                label="Branch"
                required
              />{' '}
            </Grid>
            <Grid item md={6}>
              <FormSelectField
                name="department"
                options={EditUser.branch}
                label="Department"
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
            <Grid item md={6}>
              <FormSelectField
                name="directReport"
                options={EditUser.branch}
                label="Direct Report"
                required
              />{' '}
            </Grid>
            <Grid item md={6}>
              <FormSelectField
                name="staffStatus"
                options={EditUser.branch}
                label="Staff Status"
                required
              />{' '}
            </Grid>
            <Grid item md={6}>
              <FormSelectField
                name="sbuUnit"
                options={EditUser.branch}
                label="SBU Unit"
                required
              />{' '}
            </Grid>

            {/* Checkboxes */}
            <Grid item md={6}>
              <CheckboxInput label="Does this staff supervise others?" />
            </Grid>
            <Grid item md={6}>
              <CheckboxInput label="Can this staff print statements?" />
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

export const Users = () => {
  const { isEditing } = useContext(AdminContext);

  return (
    <AdminContainer
      form={<ModalForm />}
      title="Manage Users"
      modalTitle="Edit User"
      buttonTitle="Add New User"
      tableTitle='View All Users'
      searchTitle='Search users'
    />
  );
};
