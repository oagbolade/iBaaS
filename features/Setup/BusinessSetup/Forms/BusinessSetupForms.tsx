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
  CountrySelectField,
  FormSelectField,
} from '@/components/TextFields';
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
import { nextButton } from './Business.Forms.styles';

type Props = {
  setStep: (isNext: boolean) => void;
  isFormOne?: boolean | undefined;
};

const styles = {
  ...ModalSaveButton,
  width: '100%',
  borderRadius: '40px',
};

export const ActionButtons = ({ setStep, isFormOne = false }: Props) => {
  return (
    <Grid container mt={8}>
      <Grid item md={12}>
        <PrimaryIconButton
          // type="submit" todo: handle submit together with setStep
          onClick={() => setStep(true)}
          buttonTitle="Next"
          customStyle={styles}
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
        <Box ml={5}>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <FormTextInput
                customStyle={{
                  width: '100%',
                }}
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
            <Grid item md={12}>
              <FormTextInput
                customStyle={{
                  width: '100%',
                }}
                name="staffName"
                placeholder="002789765"
                label="Staff Name"
                required
              />{' '}
            </Grid>
            <Grid item md={12}>
              <CheckboxInput label="This a non-DBM Institution" />
            </Grid>
            <Grid item md={12}>
              <FormTextInput
                customStyle={{
                  width: '100%',
                }}
                name="website"
                placeholder="Enter company's website"
                label="Website"
                required
              />{' '}
            </Grid>
            <Grid item md={12}>
              <FormTextInput
                customStyle={{
                  width: '100%',
                }}
                name="address"
                placeholder="Enter company's address"
                label="Company Address"
                required
              />{' '}
            </Grid>
            <Grid item md={6}>
              <FormTextInput
                customStyle={{
                  width: '225px',
                }}
                name="address"
                placeholder="Enter state"
                label="State"
                required
              />{' '}
            </Grid>
            <Grid item md={6}>
              <FormTextInput
                customStyle={{
                  width: '225px',
                }}
                name="address"
                placeholder="LGA"
                label="Local Government Area"
                required
              />{' '}
            </Grid>
          </Grid>
          <ActionButtons isFormOne setStep={setStep} />
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
        <Box ml={5}>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <FormTextInput
                customStyle={{
                  width: '100%',
                }}
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
            <Grid item md={12}>
              <CountrySelectField
                // customStyle={{
                //   width: '100%',
                // }}
                name="staffName"
                placeholder="002789765"
                label="Staff Name"
                required
              />{' '}
            </Grid>
            <Grid item md={12}>
              <CheckboxInput label="This a non-DBM Institution" />
            </Grid>
            <Grid item md={12}>
              <FormTextInput
                customStyle={{
                  width: '100%',
                }}
                name="website"
                placeholder="Enter company's website"
                label="Website"
                required
              />{' '}
            </Grid>
            <Grid item md={12}>
              <FormTextInput
                customStyle={{
                  width: '100%',
                }}
                name="address"
                placeholder="Enter company's address"
                label="Company Address"
                required
              />{' '}
            </Grid>
            <Grid item md={6}>
              <FormTextInput
                customStyle={{
                  width: '225px',
                }}
                name="address"
                placeholder="Enter state"
                label="State"
                required
              />{' '}
            </Grid>
            <Grid item md={6}>
              <FormTextInput
                customStyle={{
                  width: '225px',
                }}
                name="address"
                placeholder="LGA"
                label="Local Government Area"
                required
              />{' '}
            </Grid>
          </Grid>
          <ActionButtons isFormOne setStep={setStep} />
        </Box>
      </Form>
    </Formik>
  );
};
