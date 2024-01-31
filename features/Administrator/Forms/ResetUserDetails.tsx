import React from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { FormSelectInput, FormTextInput } from '@/components/FormikFields';
import { user as userSchema } from '@/constants/schemas';
import { userInitialValues } from '@/constants/types';
import { useCurrentBreakpoint } from '@/utils';
import { Loan } from '@/constants/Loan/selectOptions';

export const ResetUserDetailsForm = () => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = (values: any, actions: { setSubmitting: Function }) => {
    actions.setSubmitting(false);
  };

  const handleClickShowPassword = () => {
    return setShowPassword((show) => {
      return !show;
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <Box>
      <Box>
        <LargeTitle title="Reset User Details" />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' },
        }}
      >
        <Formik
          initialValues={userInitialValues}
          onSubmit={(values, actions) => onSubmit(values, actions)}
          validationSchema={userSchema}
        >
          <Form>
            <Box mt={4}>
              <Grid container>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                  width={{ mobile: '100%', tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%'),
                    }}
                    name="staffId"
                    placeholder="202210107481"
                    label="Staff / Login ID"
                    required
                    disabled
                  />{' '}
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%'),
                    }}
                    name="staffName"
                    placeholder="Omodayo Oluwafunke"
                    label="Staff Name"
                    required
                  />{' '}
                </Grid>
                <Grid mb={1} item={isTablet} mobile={12}>
                  <FormSelectInput
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%'),
                      fontSize: '14px',
                    }}
                    name="department"
                    options={Loan.status}
                    label="Role Name"
                    placeholder="IT Department"
                  />{' '}
                </Grid>
                <Grid mb={1} item={isTablet} mobile={12}>
                  <FormSelectInput
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%'),
                      fontSize: '14px',
                    }}
                    name="department"
                    options={Loan.status}
                    label="Role"
                    placeholder="IT Department"
                  />{' '}
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    type={showPassword ? 'text' : 'password'}
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%'),
                    }}
                    name="password"
                    placeholder="Enter password"
                    label="Old Password"
                    endAdornment={
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    }
                  />{' '}
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    type={showPassword ? 'text' : 'password'}
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%'),
                    }}
                    name="password"
                    placeholder="Enter password"
                    label="New Password"
                    endAdornment={
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    }
                  />{' '}
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%'),
                    }}
                    name="accessKey"
                    placeholder="38944849"
                    label="Access Key"
                    required
                  />{' '}
                </Grid>
              </Grid>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};
