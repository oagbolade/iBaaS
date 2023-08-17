'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import {
  FormTextInput,
  FormSelectField,
  CheckboxInput,
  CountrySelectField,
  LargeFormMultiSelectField,
} from '@/components/TextFields';
import { user as userSchema } from '@/constants/schemas';
import { userInitialValues } from '@/constants/types';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  ModalSaveButton,
} from '@/components/Modal/styles';
import { InputAdornmentText } from '@/components/Typography';
import { handleRedirect } from '@/utils';
import { currencies } from '@/constants/SetupOptions';

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
  const router = useRouter();

  return (
    <Grid container mt={8}>
      <Grid item md={12}>
        <PrimaryIconButton
          // type="submit" todo: handle submit together with setStep
          onClick={() => {
            if (isFormOne) return setStep(true);
            handleRedirect(router, '/admin/users');
          }}
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
              {/* Uses Large Multiselect */}
              <LargeFormMultiSelectField label="Product Charge" />
            </Grid>
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
                name="companyName"
                placeholder="Enter your company name"
                label="Company Name"
                required
              />{' '}
            </Grid>
            <Grid item md={12}>
              <FormTextInput
                customStyle={{
                  width: '100%',
                }}
                name="cbnCode"
                placeholder="Enter your company CBN code"
                label="Central Bank of Nigeria (CBN) Code"
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
              <FormSelectField
                customStyle={{
                  width: '100%',
                }}
                name="currency"
                options={currencies}
                label="Currency"
              />{' '}
            </Grid>
            <Grid item md={3}>
              <CountrySelectField name="countryCode" label="Phone Number" />{' '}
            </Grid>
            <Grid item md={9} mt={3}>
              <FormTextInput
                customStyle={{
                  width: '100%',
                }}
                name="phone"
                placeholder="908 7878 987"
                label=""
              />{' '}
            </Grid>
            
            <Grid item md={12}>
              <FormTextInput
                customStyle={{
                  width: '100%',
                }}
                name="email"
                placeholder="Enter company's email address"
                label="Email Address"
              />{' '}
            </Grid>
            <Grid item md={6}>
              <FormTextInput
                customStyle={{
                  width: '225px',
                }}
                name="serverName"
                placeholder="Enter server name"
                label="Server Name"
                required
              />{' '}
            </Grid>
            <Grid item md={6}>
              <FormTextInput
                customStyle={{
                  width: '225px',
                }}
                name="lendingRate"
                placeholder="Enter prime lending rate"
                label="Prime Lending Rate"
                required
              />{' '}
            </Grid>
            <Grid item md={6}>
            <FormSelectField
                customStyle={{
                  width: '100%',
                }}
                name="lastFinancialYear"
                options={currencies}
                label="Last Financial Year"
              />{' '}
            </Grid>
            <Grid item md={6}>
            <FormSelectField
                customStyle={{
                  width: '100%',
                }}
                name="nextFinancialYear"
                options={currencies}
                label="Next Financial Year"
              />{' '}
            </Grid>
            <Grid item md={12}>
              <CheckboxInput label="Treat sub-branch as branch" />
            </Grid>
            <Grid item md={12}>
              <CheckboxInput label="Allow multiple account on the same product" />
            </Grid>
            <Grid item md={12}>
              <CheckboxInput label="Allow system inventory" />
            </Grid>
            <Grid item md={12}>
              <CheckboxInput label="Require alert" />
            </Grid>
          </Grid>
          <ActionButtons setStep={setStep} />
        </Box>
      </Form>
    </Formik>
  );
};
