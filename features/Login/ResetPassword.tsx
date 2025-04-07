import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import { Grid } from '@mui/material';
import {
  resetPasswordModal,
  resetPasswordModalHeading1,
  resetPasswordModalHeading2,
  resetPasswordButton
} from './styles';
import { resetpasswordInitialValues } from '@/constants/types';
import { PrimaryIconButton } from '@/components/Buttons';
import { resetPasswordSchema } from '@/schemas/reset-password';
import { FormTextInput } from '@/components/FormikFields';
import { useResetPassword } from '@/api/auth/useResetPassword';
import { ResetPasswordPayload } from '@/api/RequestTypes/admin';
import { toISOStringFormat } from '@/utils/convertDateToISOFormat';

interface Props {
  isFirstTimeUser: boolean;
  setIsFirstTimeUser: React.Dispatch<React.SetStateAction<boolean>>;
  oldPassword: string;
  userId: string;
}
const ResetPassword = ({
  isFirstTimeUser,
  setIsFirstTimeUser,
  oldPassword,
  userId
}: Props) => {
  const [isPasswordMatch, setIsPasswordMatch] = React.useState(true);

  const { mutate, isPending } = useResetPassword();

  const onSubmit = (values: any) => {
    const randomFourdigit = Math.floor(1000 + Math.random() * 9000);
    if (values.newPassword !== values.confirmPassword) {
      setIsPasswordMatch(false);
    } else {
      setIsPasswordMatch(true);
      const payload: ResetPasswordPayload = {
        Oldpassword: oldPassword,
        Newpassword: values.newPassword,
        sscode: String(randomFourdigit),
        passchange_date: new Date().toISOString(),
        userid: userId
      };

      mutate(payload, {
        onSuccess: () => setIsFirstTimeUser(false)
      });
    }
  };
  const validate = (values: any) => {
    const errors: any = {};
    if (values.newPassword !== values.confirmPassword) {
      setIsPasswordMatch(false);
      errors.confirmPassword = 'Passwords do not match';
    } else {
      setIsPasswordMatch(true);
    }
    return errors;
  };

  return (
    <div>
      <Box sx={resetPasswordModal}>
        <Typography sx={resetPasswordModalHeading1}>
          Create New Password
        </Typography>
        <Typography sx={resetPasswordModalHeading2}>
          Change your password to better secure your account
        </Typography>
        <Formik
          initialValues={resetpasswordInitialValues}
          onSubmit={(values) => {
            return onSubmit(values);
          }}
          validationSchema={resetPasswordSchema}
          validate={validate}
        >
          <Form>
            <Box sx={{ width: '100%', marginTop: '30px' }}>
              <Grid container spacing={1}>
                <Grid item mobile={12}>
                  <FormTextInput
                    type="password"
                    customStyle={{
                      width: '100%',
                      fontSize: '12px'
                    }}
                    name="newPassword"
                    placeholder="Enter password"
                    label="Create New Password"
                  />{' '}
                </Grid>
                <Grid item mobile={12}>
                  <FormTextInput
                    type="password"
                    customStyle={{
                      width: '100%',
                      fontSize: '12px'
                    }}
                    name="confirmPassword"
                    placeholder="Enter password"
                    label="Confirm Password"
                  />{' '}
                </Grid>

                <Grid container mt={4} ml={2} mobile={12}>
                  <Grid item mobile={12}>
                    <PrimaryIconButton
                      type="submit"
                      buttonTitle={`${isPending ? 'Loading...' : 'Update Password'}`}
                      customStyle={resetPasswordButton}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Form>
        </Formik>
      </Box>
    </div>
  );
};
export default ResetPassword;
