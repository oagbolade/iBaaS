import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Form, Formik } from 'formik';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { stepOneProceedButton } from './styles';
import { SignupFormSubheading } from './SignupFormSubHeading';
import { SignupFormHeading } from './SignupFormHeading';
import {
  CountrySelectField,
  FormTextInput,
  FormikRadioButton
} from '@/components/FormikFields';
import { signUpFormStepOneInitialValues } from '@/constants/types';
import { signupStepOneSchema } from '@/schemas/signup';
import { PrimaryIconButton } from '@/components/Buttons';

interface Props {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export const StepOne = ({ step, setStep }: Props) => {
  const router = useRouter();

  const onSubmit = (values: any) => {
    setStep(2);
  };

  const radioOptions = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' }
  ];

  const StyledContainer = styled(Box)(({ theme }) => ({
    overflow: 'auto',
    scrollbarWidth: 'none', // Firefox
    '&::-webkit-scrollbar': {
      display: 'none' // Chrome, Safari, Opera
    }
  }));

  return (
    <Stack display="flex" flex={4}>
      <StyledContainer
        sx={{
          padding: {
            desktop: '30px 200px 0 200px',
            mobile: '50px 50px 0 50px'
          },
          width: { desktop: '55vw', mobile: '100vw' },
          overflowY: 'scroll',
          height: '100vh'
        }}
      >
        <SignupFormHeading text="Organisation Details" />

        <SignupFormSubheading text="Create your organisation account here" />
        <Formik
          initialValues={signUpFormStepOneInitialValues}
          onSubmit={(values, actions) => {
            onSubmit(values);
          }}
          validationSchema={signupStepOneSchema}
        >
          <Form>
            <Box sx={{ width: '100%' }}>
              <Grid container spacing={2}>
                <Grid item mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: '100%'
                    }}
                    name="cbnCode"
                    placeholder="Enter company code"
                    label="CBN Code"
                  />{' '}
                </Grid>
                <Grid item mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: '100%'
                    }}
                    name="companyName"
                    placeholder="Enter company name"
                    label="Company Name"
                  />{' '}
                </Grid>
                <Grid item mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: '100%'
                    }}
                    name="emailAddress"
                    placeholder="Enter email"
                    label="Email Address"
                  />{' '}
                </Grid>
                <Grid item mobile={12}>
                  <CountrySelectField
                    width="100%"
                    name="country"
                    label="Country"
                  />{' '}
                </Grid>
                <Grid mt={2} item mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: '100%'
                    }}
                    name="companyAddress"
                    placeholder="Enter address"
                    label="Company Address"
                  />{' '}
                </Grid>
                <Grid item mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: '100%'
                    }}
                    name="headOffice"
                    placeholder="Please enter"
                    label="Head Office"
                  />{' '}
                </Grid>
                <Grid item mobile={12} tablet={12} desktop={6}>
                  <FormikRadioButton
                    name="isNonDMBInstitution"
                    title="is this a Non-DMB Institution?"
                    options={radioOptions}
                    value={signUpFormStepOneInitialValues.isNonDMBInstitution}
                  />
                </Grid>

                <Grid container mt={3} mb={6} ml={2} mobile={12}>
                  <Grid item mobile={12}>
                    <PrimaryIconButton
                      type="submit"
                      buttonTitle="Proceed"
                      customStyle={stepOneProceedButton}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Form>
        </Formik>
      </StyledContainer>
    </Stack>
  );
};
