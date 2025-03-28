import React from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { FormSelectInput, FormTextInput } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { useResetUser } from '@/api/admin/useAdminUsers';
import {
  resetUserInitialValies,
  ResetUserFormValues
} from '@/schemas/schema-values/admin';
import { resetUser } from '@/schemas/admin';
import { IRoles } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { toast } from '@/utils/toast';

type Props = {
  isSubmitting: boolean;
  setIsSubmitting: (submit: boolean) => void;
  userid?: string;
  fullname?: string;
  roles?: IRoles[] | Array<any>;
  roleId?: string;
  showPassWordField: boolean;
};

export const ResetUserDetails = ({
  userid,
  fullname,
  setIsSubmitting,
  isSubmitting,
  roles,
  roleId,
  showPassWordField
}: Props) => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowconFirmPassword] = React.useState(false);
  const toastActions = React.useContext(ToastMessageContext);

  const { mutate } = useResetUser();
  const { mappedRole } = useMapSelectOptions({
    roles
  });

  const handleClickShowPassword = () => {
    return setShowPassword((show) => {
      return !show;
    });
  };

  const handleClickShowConfirmPassword = () => {
    return setShowconFirmPassword((show) => {
      return !show;
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit = async (values: ResetUserFormValues) => {
    const updatedValues = {
      ...values,
      resetpassword: showPassWordField ? 1 : 0,
      newPassword: showPassWordField ? values.newPassword : '',
      confirmPassword: showPassWordField ? values.confirmPassword : ''
    };

    if (showPassWordField && values.newPassword !== values.confirmPassword) {
      toast('Passwords do not match', 'No Match', 'error', toastActions);
      return;
    }

    const permissionOptions = document.getElementsByClassName(
      'permissionOptions'
    ) as HTMLCollectionOf<HTMLInputElement>;

    const resetLoginCount = Number(permissionOptions[0].value) || 0;
    const allowMultipleLogin = Number(permissionOptions[1].value) || 0;
    const lockStatus = Number(permissionOptions[2].value) || 0;

    await mutate?.({
      updatedValues,
      userId: userid,
      resetLoginCount,
      allowMultipleLogin,
      lockStatus
    });
  };

  React.useEffect(() => {
    const submit = document.getElementById('submitButton');
    if (isSubmitting) {
      submit?.click();
    }

    return () => {
      setIsSubmitting(false);
    };
  }, [isSubmitting, setIsSubmitting]);

  return (
    <Box>
      <Box>
        <LargeTitle title="Reset User Details" />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' }
        }}
      >
        <Formik
          initialValues={{
            ...resetUserInitialValies,
            userId: userid || '',
            fullname: fullname || ''
          }}
          onSubmit={(values: ResetUserFormValues) => onSubmit(values)}
          validationSchema={resetUser}
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
                    name="userId"
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
                    disabled
                  />{' '}
                </Grid>

                <Grid mb={1} item={isTablet} mobile={12}>
                  <FormSelectInput
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%'),
                      fontSize: '14px'
                    }}
                    name="role_id"
                    options={mappedRole}
                    label="Role"
                    placeholder="Role"
                    value={roleId}
                    disabled
                  />{' '}
                </Grid>

                {showPassWordField && (
                  <Grid mb={1} item={isTablet} mobile={12}>
                    <Grid mb={1} item={isTablet} mobile={12}>
                      <FormTextInput
                        type={showPassword ? 'text' : 'password'}
                        customStyle={{
                          width: '100%'
                        }}
                        name="newPassword"
                        placeholder="Enter password"
                        label="Password"
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

                    <Grid mb={1} item={isTablet} mobile={12}>
                      <FormTextInput
                        type={showPassword ? 'text' : 'password'}
                        customStyle={{
                          width: '100%'
                        }}
                        name="confirmPassword"
                        placeholder="Enter password"
                        label="Confirm Password"
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
                  </Grid>
                )}
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
