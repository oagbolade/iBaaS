'use client';
import Box from '@mui/material/Box';
import { Formik, Form } from 'formik';
import { PasswordBody, PasswordChangeBody, PasswordTitleHeader, ResetButtonPassword } from './style';
import { PageTitle } from '@/components/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { FormTextInput } from '@/components/TextFields';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  ModalBackButton,
  ModalSaveButton,
  ResetButton,
} from '@/components/Modal/styles';
import { passwordChange } from '@/constants/types';
import { password as passwordSchema } from '@/constants/schemas';

export const PasswordChange = () => {
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
      initialValues={passwordChange}
      onSubmit={(values, actions) => onSubmit(values, actions)}
      validationSchema={passwordSchema}
    >
      <Form>
        <Box sx={PasswordBody}>
          <Box sx={PasswordTitleHeader}>
            <PageTitle title="Password Change" />
          </Box>
          <Box sx={PasswordChangeBody}>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <FormTextInput
                  placeholder="Enter old password"
                  name="OldPassword"
                  label="Old Password"
                  required
                  customStyle={{
                    width: '100%',
                  }}
                />{' '}
              </Grid>
              <Grid item md={6}>
                <FormTextInput
                  placeholder="Enter New Password"
                  name="Newpassword"
                  label="New Password"
                  required
                  customStyle={{
                    width: '100%',
                  }}
                />{' '}
              </Grid>
              <Grid item md={6}>
                <FormTextInput
                  placeholder="Enter Confirm New Password"
                  name="confirmPassword"
                  label="Confirm New Password"
                  required
                  customStyle={{
                    width: '100%',
                  }}
                />{' '}
              </Grid>
              <Grid item md={6}>
                <FormTextInput
                  placeholder="123"
                  label="Access Key"
                  name="accessKey"
                  required
                  customStyle={{
                    width: '100%',
                  }}
                />{' '}
              </Grid>
              <Grid container mt={9} ml={2}>
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
                  <Button variant="text" >
                    <PageTitle title="Reset" styles={ResetButtonPassword} />
                  </Button>
                </Grid>
                <Grid item md={3}>  
                  <PrimaryIconButton
                    buttonTitle="Save Changes"
                    customStyle={ModalSaveButton}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Form>
    </Formik>
  );
};
