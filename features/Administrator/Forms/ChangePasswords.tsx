import React from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { FormSelectInput, FormTextInput } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { changePasswordInitialValies } from '@/schemas/schema-values/admin';
import { changePassword } from '@/schemas/admin';
import { useChangePassword } from '@/api/admin/useAdminUsers';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { IDepartments, IRoles } from '@/api/ResponseTypes/general';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { toISOStringFormat } from '@/utils/convertDateToISOFormat';
import {
  getPasswordFromLocalStorage,
  getStoredUser
} from '@/utils/user-storage';
import { environment } from '@/axiosInstance';

type Props = {
  isSubmitting: boolean;
  setIsSubmitting: (submit: boolean) => void;
  userid?: string;
  fullname?: string;
  departments?: IDepartments[] | Array<any>;
  roles?: IRoles[] | Array<any>;
};

export const ChangePasswordForm = ({
  userid,
  fullname,
  setIsSubmitting,
  isSubmitting,
  departments,
  roles
}: Props) => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = React.useState(false);

  const { mutate, isError } = useChangePassword();
  const roleId = useGetParams('roleId') || 'N/A';
  const departmentId = useGetParams('deptId') || 'N/A';
  const { mappedDepartments, mappedRole } = useMapSelectOptions({
    roles,
    departments
  });
  const onSubmit = async (values: any, actions: { resetForm: Function }) => {
    await mutate?.({
      ...values,
      passchange_date: toISOStringFormat(
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      ),
      userid: `${getStoredUser()?.profiles?.userid}`
    });

    if (!isError) {
      actions.resetForm();
    }
  };

  const handleClickShowPassword = () => {
    return setShowPassword((show) => {
      return !show;
    });
  };

  const handleClickShowConfirmPassword = () => {
    return setshowConfirmPassword((show) => {
      return !show;
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  React.useEffect(() => {
    const submit = document.getElementById('submitButton');
    if (isSubmitting) {
      submit?.click();
    }

    return () => {
      setIsSubmitting(false);
    };
  }, [isSubmitting]);

  return (
    <Box>
      <Box>
        <LargeTitle title=" Change User Password" />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' }
        }}
      >
        <Formik
          initialValues={{ ...changePasswordInitialValies, userid, fullname }}
          onSubmit={(values, actions) => onSubmit(values, actions)}
          validationSchema={changePassword}
        >
          <Form>
            <Box mt={4}>
              <Grid container>
                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    type={showPassword ? 'text' : 'password'}
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%')
                    }}
                    name="oldpassword"
                    placeholder="Enter old password"
                    label="Old Password"
                    endAdornment={
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    }
                  />{' '}
                </Grid>

                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    type={showConfirmPassword ? 'text' : 'password'}
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%')
                    }}
                    name="newpassword"
                    placeholder="Enter New password"
                    label="New Password"
                    autoComplete={
                      environment === 'development' ? 'on' : 'new-password'
                    }
                    endAdornment={
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
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
                      width: setWidth(isMobile ? '285px' : '100%')
                    }}
                    name="sscode"
                    placeholder="Enter access key"
                    label="Access Key"
                    required
                  />{' '}
                </Grid>
              </Grid>
            </Box>
            <button id="submitButton" type="submit" style={{ display: 'none' }}>
              submit alias
            </button>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};
