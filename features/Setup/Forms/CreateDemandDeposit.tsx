'use client';
import React from 'react';
import { Formik, Form } from 'formik';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {
  FormTextInput,
  CheckboxInput,
  FormSelectField,
} from '@/components/FormikFields';
import { EditUser } from '@/constants/AdminOptions';
import { user as userSchema } from '@/constants/schemas';
import { userInitialValues } from '@/constants/types';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  ModalBackButton,
  ModalSaveButton,
  ResetButton,
} from '@/components/Modal/styles';
import { PageTitle, InputAdornmentText } from '@/components/Typography';

type Props = {
  setStep: (isNext: boolean) => void;
  isFormOne?: boolean | undefined;
};

export const ActionButtons = ({ setStep, isFormOne = false }: Props) => {
  return (
    <Grid container mt={9} ml={2}>
      <Grid item mobile={3}>
        {!isFormOne && (
          <PrimaryIconButton
            onClick={() => setStep(false)}
            buttonTitle="Back"
            customStyle={ModalBackButton}
          />
        )}
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        item
        mobile={6}
      >
        <Button variant="text">
          <PageTitle title="Reset" styles={ResetButton} />
        </Button>
      </Grid>
      <Grid item mobile={3}>
        <PrimaryIconButton
          // type="submit" to do handle submit together with setStep
          onClick={() => setStep(true)}
          buttonTitle="Next"
          customStyle={ModalSaveButton}
        />
      </Grid>
    </Grid>
  );
};

export const FormOne = ({ setStep }: Props) => {
  const onSubmit = (
    values: any,
    actions: { setSubmitting: (arg0: boolean) => void }
  ) => {
    setStep(true);
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
        <Box ml={{ desktop: 5 }}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item desktop={6}>
              <FormTextInput
                endAdornment={
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <InputAdornmentText>Day(s)</InputAdornmentText>
                  </IconButton>
                }
                name="calculationBasis"
                placeholder="Enter a number"
                label="Interest Calculation Basis"
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormTextInput
                name="staffName"
                placeholder="002789765"
                label="Staff Name"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormTextInput
                name="address"
                placeholder="002789765"
                label="Email Address"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormTextInput
                name="mobileNumber"
                placeholder="002789765"
                label="Mobile Number"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormSelectField
                name="branch"
                options={EditUser.branch}
                label="Branch"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormSelectField
                name="department"
                options={EditUser.branch}
                label="Department"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormSelectField
                name="role"
                options={EditUser.branch}
                label="Role"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormSelectField
                name="directReport"
                options={EditUser.branch}
                label="Direct Report"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormSelectField
                name="staffStatus"
                options={EditUser.branch}
                label="Staff Status"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormSelectField
                name="sbuUnit"
                options={EditUser.branch}
                label="SBU Unit"
                required
              />{' '}
            </Grid>

            <Grid
              sx={{
                display: { mobile: 'flex', desktop: 'block' },
                justifyContent: 'center',
              }}
              item
              mr={{ mobile: 5, desktop: 0 }}
              mobile={12}
              desktop={6}
            >
              <CheckboxInput label="Does this staff supervise others?" />
            </Grid>
            <Grid
              sx={{
                display: { mobile: 'flex', desktop: 'block' },
                justifyContent: 'center',
              }}
              mr={{ mobile: 5, desktop: 0 }}
              item
              mobile={12}
              desktop={6}
            >
              <CheckboxInput label="Can this staff print statements?" />
            </Grid>
            <ActionButtons isFormOne setStep={setStep} />
          </Grid>
        </Box>
      </Form>
    </Formik>
  );
};

export const FormTwo = ({ setStep }: Props) => {
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
        <Box ml={{ desktop: 5 }}>
          <Grid container spacing={2}>
            <Grid item desktop={6}>
              <FormTextInput
                name="staffId"
                placeholder="enter actual rate"
                label="Actual Rate"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormTextInput
                name="staffName"
                placeholder="Enter penalty rate"
                label="Penalty Rate"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormTextInput
                name="address"
                placeholder="Enter Maximum Term"
                label="Maximum Term"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormTextInput
                name="mobileNumber"
                placeholder="002789765"
                label="Mobile Number"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormSelectField
                name="branch"
                options={EditUser.branch}
                label="Interest Type"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormSelectField
                name="department"
                options={EditUser.branch}
                label="Minimum Term"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormSelectField
                name="role"
                options={EditUser.branch}
                label="Loan Type"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormSelectField
                name="directReport"
                options={EditUser.branch}
                label="Direct Report"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormSelectField
                name="staffStatus"
                options={EditUser.branch}
                label="Staff Status"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormSelectField
                name="sbuUnit"
                options={EditUser.branch}
                label="SBU Unit"
                required
              />{' '}
            </Grid>

            {/* Checkboxes */}
            <Grid item desktop={6}>
              <CheckboxInput label="Does this staff supervise others?" />
            </Grid>
            <Grid item desktop={6}>
              <CheckboxInput label="Can this staff print statements?" />
            </Grid>
            {/* Checkboxes */}

            <ActionButtons setStep={setStep} />
          </Grid>
        </Box>
      </Form>
    </Formik>
  );
};

export const FormThree = ({ setStep }: Props) => {
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
        <Box ml={{ desktop: 5 }}>
          <Grid container spacing={2}>
            <Grid item desktop={6}>
              <FormTextInput
                name="staffId"
                placeholder="Enter Asset Balance"
                label="Asset Balance"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormTextInput
                name="staffName"
                placeholder="Enter Suspended asset"
                label="Suspended Asset"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormTextInput
                name="address"
                placeholder="Enter Int. Receivable"
                label="Int. Receivable"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormTextInput
                name="mobileNumber"
                placeholder="Enter Int Income"
                label="Int Income"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormSelectField
                name="branch"
                options={EditUser.branch}
                label="Branch"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormSelectField
                name="department"
                options={EditUser.branch}
                label="Department"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormSelectField
                name="role"
                options={EditUser.branch}
                label="Role"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormSelectField
                name="directReport"
                options={EditUser.branch}
                label="Direct Report"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormSelectField
                name="staffStatus"
                options={EditUser.branch}
                label="Staff Status"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormSelectField
                name="sbuUnit"
                options={EditUser.branch}
                label="SBU Unit"
                required
              />{' '}
            </Grid>

            {/* Checkboxes */}
            <Grid item desktop={6}>
              <CheckboxInput label="Does this staff supervise others?" />
            </Grid>
            <Grid item desktop={6}>
              <CheckboxInput label="Can this staff print statements?" />
            </Grid>
            {/* Checkboxes */}

            <ActionButtons setStep={setStep} />
          </Grid>
        </Box>
      </Form>
    </Formik>
  );
};

export const FormFour = ({ setStep }: Props) => {
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
        <Box ml={{ desktop: 5 }}>
          <Grid container spacing={2}>
            <Grid item desktop={6}>
              <FormTextInput
                name="staffId"
                placeholder="002789765"
                label="Form Four Staff Id"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormTextInput
                name="staffName"
                placeholder="002789765"
                label="Staff Name"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormTextInput
                name="address"
                placeholder="002789765"
                label="Email Address"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormTextInput
                name="mobileNumber"
                placeholder="002789765"
                label="Mobile Number"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormSelectField
                name="branch"
                options={EditUser.branch}
                label="Branch"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormSelectField
                name="department"
                options={EditUser.branch}
                label="Department"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormSelectField
                name="role"
                options={EditUser.branch}
                label="Role"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormSelectField
                name="directReport"
                options={EditUser.branch}
                label="Direct Report"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormSelectField
                name="staffStatus"
                options={EditUser.branch}
                label="Staff Status"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormSelectField
                name="sbuUnit"
                options={EditUser.branch}
                label="SBU Unit"
                required
              />{' '}
            </Grid>

            {/* Checkboxes */}
            <Grid item desktop={6}>
              <CheckboxInput label="Does this staff supervise others?" />
            </Grid>
            <Grid item desktop={6}>
              <CheckboxInput label="Can this staff print statements?" />
            </Grid>
            {/* Checkboxes */}

            <ActionButtons setStep={setStep} />
          </Grid>
        </Box>
      </Form>
    </Formik>
  );
};

export const FormFive = ({ setStep }: Props) => {
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
        <Box ml={{ desktop: 5 }}>
          <Grid container spacing={2}>
            <Grid item desktop={6}>
              <FormTextInput
                name="staffId"
                placeholder="002789765"
                label="Form Five Staff Id"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormTextInput
                name="staffName"
                placeholder="002789765"
                label="Staff Name"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormTextInput
                name="address"
                placeholder="002789765"
                label="Email Address"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormTextInput
                name="mobileNumber"
                placeholder="002789765"
                label="Mobile Number"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormSelectField
                name="branch"
                options={EditUser.branch}
                label="Precedence Conditions"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormSelectField
                name="department"
                options={EditUser.branch}
                label="Department"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormSelectField
                name="role"
                options={EditUser.branch}
                label="Subsequence Conditions"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormSelectField
                name="directReport"
                options={EditUser.branch}
                label="Direct Report"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormSelectField
                name="staffStatus"
                options={EditUser.branch}
                label="Staff Status"
                required
              />{' '}
            </Grid>
            <Grid item desktop={6}>
              <FormSelectField
                name="sbuUnit"
                options={EditUser.branch}
                label="SBU Unit"
                required
              />{' '}
            </Grid>

            {/* Checkboxes */}
            <Grid item desktop={6}>
              <CheckboxInput label="Manage Collection Date?" />
            </Grid>
            <Grid item desktop={6}>
              <CheckboxInput label="Health Insurance?" />
            </Grid>
            {/* Checkboxes */}

            <ActionButtons setStep={setStep} />
          </Grid>
        </Box>
      </Form>
    </Formik>
  );
};
