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
  const { mutate, isError } = useChangePassword();
  const roleId = useGetParams('roleId') || 'N/A';
  const departmentId = useGetParams('deptId') || 'N/A';

  const { mappedDepartments, mappedRole } = useMapSelectOptions({
    roles,
    departments
  });

  const onSubmit = async (values: any, actions: { resetForm: Function }) => {
    await mutate?.(values);

    if (!isError) {
      actions.resetForm();
    }
  };

  const handleClickShowPassword = () => {
    return setShowPassword((show) => {
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
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                  width={{ mobile: '100%', tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%')
                    }}
                    name="userid"
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
                      width: setWidth(isMobile ? '285px' : '100%')
                    }}
                    name="fullname"
                    placeholder="Omodayo Oluwafunke"
                    label="Staff Name"
                    required
                    disabled
                  />{' '}
                </Grid>
                <Grid mb={1} item={isTablet} mobile={12}>
                  <FormSelectInput
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%'),
                      fontSize: '14px'
                    }}
                    name="role"
                    options={mappedRole}
                    label="Role Name"
                    placeholder="IT Department"
                    value={roleId}
                    disabled
                  />{' '}
                </Grid>
                <Grid mb={1} item={isTablet} mobile={12}>
                  <FormSelectInput
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%'),
                      fontSize: '14px'
                    }}
                    name="department"
                    options={mappedDepartments}
                    label="Department"
                    placeholder="IT Department"
                    disabled
                    value={departmentId}
                  />{' '}
                </Grid>
                {/* We cannot validate old password for a user */}
                {/* <Grid item={isTablet} mobile={12}>
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
                </Grid> */}
                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    type={showPassword ? 'text' : 'password'}
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%')
                    }}
                    name="newPassword"
                    placeholder="Enter password"
                    label="New Password"
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
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%')
                    }}
                    name="accessKey"
                    placeholder="38944849"
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
