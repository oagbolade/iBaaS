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
} from '@/components/FormikFields';
import { user as userSchema } from '@/constants/schemas';
import { userInitialValues } from '@/constants/types';
import { PrimaryIconButton } from '@/components/Buttons';
import { ModalSaveButton } from '@/components/Modal/styles';
import { InputAdornmentText } from '@/components/Typography';
import { handleRedirect, useCurrentBreakpoint } from '@/utils';
import { currencies } from '@/constants/SetupOptions';

type Props = {
  setStep: (isNext: boolean) => void;
  isFormOne?: boolean | undefined;
};

const styles = {
  ...ModalSaveButton,
  width: { tablet: '100%', mobile: '60%' },
  borderRadius: '40px',
};

export const ActionButtons = ({ setStep, isFormOne = false }: Props) => {
  const { isMobile, isTablet } = useCurrentBreakpoint();
  const router = useRouter();

  return (
    <Grid
      mt={8}
      container={isMobile}
      item={isTablet}
      justifyContent="center"
      mobile={12}
    >
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
  );
};

export const FormOne = ({ setStep }: Props) => {
  const { isMobile, isTablet } = useCurrentBreakpoint();

  const setWidth = (width: number | string = 0) => {
    if (isTablet) return width || '100%';
  };

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
          <Grid container>
            {/* <Grid item mobile={12}>
              <LargeFormMultiSelectField label="Product Charge" />
            </Grid> */}
            <Grid
              container={isMobile}
              item={isTablet}
              justifyContent="center"
              mobile={12}
            >
              <FormTextInput
                customStyle={{
                  width: setWidth(),
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
            <Grid
              container={isMobile}
              item={isTablet}
              justifyContent="center"
              mobile={12}
            >
              <FormTextInput
                customStyle={{
                  width: setWidth(),
                }}
                name="companyName"
                placeholder="Enter your company name"
                label="Company Name"
                required
              />{' '}
            </Grid>
            <Grid
              container={isMobile}
              item={isTablet}
              justifyContent="center"
              mobile={12}
            >
              <FormTextInput
                customStyle={{
                  width: setWidth(),
                }}
                name="cbnCode"
                placeholder="Enter your company CBN code"
                label="Central Bank of Nigeria (CBN) Code"
                required
              />{' '}
            </Grid>
            <Grid
              container={isMobile}
              item={isTablet}
              justifyContent="center"
              mobile={12}
            >
              <CheckboxInput label="This a non-DBM Institution" />
            </Grid>
            <Grid
              container={isMobile}
              item={isTablet}
              justifyContent="center"
              mobile={12}
            >
              <FormTextInput
                customStyle={{
                  width: setWidth(),
                }}
                name="website"
                placeholder="Enter company's website"
                label="Website"
                required
              />{' '}
            </Grid>
            <Grid
              container={isMobile}
              item={isTablet}
              justifyContent="center"
              mobile={12}
            >
              <FormTextInput
                customStyle={{
                  width: setWidth(),
                }}
                name="address"
                placeholder="Enter company's address"
                label="Company Address"
                required
              />{' '}
            </Grid>
            <Grid
              container={isMobile}
              item={isTablet}
              justifyContent="center"
              tablet={6}
              mobile={12}
            >
              <FormTextInput
                customStyle={{
                  width: setWidth(isMobile ? '100%' : '225px'),
                }}
                name="address"
                placeholder="Enter state"
                label="State"
                required
              />{' '}
            </Grid>
            <Grid
              container={isMobile}
              item={isTablet}
              justifyContent="center"
              tablet={6}
              mobile={12}
            >
              <FormTextInput
                customStyle={{
                  width: setWidth(isMobile ? '100%' : '225px'),
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
  const { isMobile, isTablet } = useCurrentBreakpoint();

  const setWidth = (width: number | string = 0) => {
    if (isTablet) return width || '100%';
  };

  const setPhoneWidth = (width: number | string = 0) => {
    if (isMobile) return width;
    return '100%';
  };

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
          <Grid
            container={isMobile}
            item={isTablet}
            justifyContent="center"
            spacing={2}
          >
            <Grid
              container={isMobile}
              item={isTablet}
              justifyContent="center"
              mobile={12}
            >
              <FormSelectField
                customStyle={{
                  width: setWidth(),
                }}
                name="currency"
                options={currencies}
                label="Currency"
              />{' '}
            </Grid>
            {isTablet && (
              <Grid container spacing={2}>
                <Grid item tablet={3}>
                  <CountrySelectField name="countryCode" label="Phone Number" />{' '}
                </Grid>
                <Grid item tablet={9} mt={3}>
                  <FormTextInput
                    customStyle={{
                      width: setWidth(),
                    }}
                    name="phone"
                    placeholder="908 7878 987"
                    label=""
                  />{' '}
                </Grid>
              </Grid>
            )}
            {isMobile && (
              <Grid
                mr={{ mobile: 10.5, desktop: 0 }}
                container
                justifyContent="center"
                spacing={1}
              >
                <Box>
                  <CountrySelectField
                    width={isMobile && '90px'}
                    name="countryCode"
                    label="Phone Number"
                  />{' '}
                </Box>
                <Box sx={{ width: '100px' }} mt={3}>
                  <FormTextInput
                    customStyle={{
                      width: setPhoneWidth('190px'),
                    }}
                    name="phone"
                    placeholder="908 7878 987"
                    label=""
                  />{' '}
                </Box>
              </Grid>
            )}

            <Grid
              container={isMobile}
              item={isTablet}
              justifyContent="center"
              mobile={12}
            >
              <FormTextInput
                customStyle={{
                  width: setWidth(),
                }}
                name="email"
                placeholder="Enter company's email address"
                label="Email Address"
              />{' '}
            </Grid>
            <Grid container>
              <Grid
                container={isMobile}
                item={isTablet}
                justifyContent="center"
                mobile={12}
                tablet={6}
              >
                <FormTextInput
                  customStyle={{
                    width: setWidth(isMobile ? '100%' : '225px'),
                  }}
                  name="serverName"
                  placeholder="Enter server name"
                  label="Server Name"
                  required
                />{' '}
              </Grid>
              <Grid
                container={isMobile}
                item={isTablet}
                justifyContent="center"
                mobile={12}
                tablet={6}
              >
                <FormTextInput
                  customStyle={{
                    width: setWidth(isMobile ? '100%' : '225px'),
                  }}
                  name="lendingRate"
                  placeholder="Enter prime lending rate"
                  label="Prime Lending Rate"
                  required
                />{' '}
              </Grid>
            </Grid>

            <Grid
              container={isMobile}
              item={isTablet}
              justifyContent="center"
              mobile={12}
              desktop={6}
            >
              <FormSelectField
                customStyle={{
                  width: setWidth(),
                }}
                name="lastFinancialYear"
                options={currencies}
                label="Last Financial Year"
              />{' '}
            </Grid>
            <Grid
              container={isMobile}
              item={isTablet}
              justifyContent="center"
              mobile={12}
              desktop={6}
            >
              <FormSelectField
                customStyle={{
                  width: setWidth(),
                }}
                name="nextFinancialYear"
                options={currencies}
                label="Next Financial Year"
              />{' '}
            </Grid>
            <Box ml={{ mobile: 9, desktop: 0 }}>
              <Grid container={isMobile} item={isTablet} mobile={8}>
                <CheckboxInput label="Treat sub-branch as branch" />
              </Grid>
              <Grid container={isMobile} item={isTablet} mobile={6}>
                <CheckboxInput label="Allow multiple account on the same product" />
              </Grid>
              <Grid container={isMobile} item={isTablet} mobile={8}>
                <CheckboxInput label="Allow system inventory" />
              </Grid>
              <Grid container={isMobile} item={isTablet} mobile={12}>
                <CheckboxInput label="Require alert" />
              </Grid>
            </Box>
          </Grid>
          <ActionButtons setStep={setStep} />
        </Box>
      </Form>
    </Formik>
  );
};
