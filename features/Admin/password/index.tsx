'use client';
import Box from '@mui/material/Box';
import { Formik, Form } from 'formik';
import {
  PasswordBody,
  PasswordChangeBody,
  PasswordTitle,
  PasswordTitleHeader,
  ResetButtonPassword,
} from './style';
import { PageTitle } from '@/components/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { FormTextInput } from '@/components/FormikFields';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  ModalBackButton,
  ModalSaveButton,
  ResetButton,
} from '@/components/Modal/styles';
import { useCurrentBreakpoint } from '@/utils';

import { passwordChange } from '@/constants/types';
import { password as passwordSchema } from '@/constants/schemas';
import { ModalActions } from '@/components/Shared/ActionButtons';
import colors from '@/assets/colors';

export const PasswordChange = () => {
  const onSubmit = (
    values: any,
    actions: { setSubmitting: (arg0: boolean) => void }
  ) => {
    console.log({ values, actions });
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  };
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const setDirction = () => {
    if (isMobile) return 'column';
    return 'row';
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
            <PageTitle title="Password Change" styles={PasswordTitle} />
          </Box>
          <Box
            sx={PasswordChangeBody}
            ml={{ desktop: 5 }}
            justifyContent="center"
          >
            <Grid container spacing={2}>
              <Grid
                item={isTablet}
                container={isMobile}
                tablet={6}
                justifyContent="center"
                mobile={12}
              >
                <FormTextInput
                  placeholder="Enter old password"
                  name="OldPassword"
                  label="Old Password"
                  required
                  customStyle={{
                    width: setWidth(),
                  }}
                />{' '}
              </Grid>
              <Grid
                item={isTablet}
                container={isMobile}
                tablet={6}
                justifyContent="center"
                mobile={12}
                desktop={5}
              >
                <FormTextInput
                  placeholder="Enter New Password"
                  name="Newpassword"
                  label="New Password"
                  required
                  customStyle={{
                    width: setWidth(),
                  }}
                />{' '}
              </Grid>
              <Grid
                item={isTablet}
                container={isMobile}
                tablet={6}
                justifyContent="center"
                mobile={12}
              >
                <FormTextInput
                  placeholder="Enter Confirm New Password"
                  name="confirmPassword"
                  label="Confirm New Password"
                  required
                  customStyle={{
                    width: setWidth(),
                  }}
                />{' '}
              </Grid>
              <Grid
                item={isTablet}
                desktop={5}
                container={isMobile}
                tablet={6}
                justifyContent="center"
                mobile={12}
              >
                <FormTextInput
                  placeholder="123"
                  label="Access Key"
                  name="accessKey"
                  required
                  customStyle={{
                    width: setWidth(),
                  }}
                />{' '}
              </Grid>
              <Grid
                item={isTablet}
                container={isMobile}
                desktop={12}
                mobile={12}
                tablet={12}
              >
                <ModalActions
                  BackButtonTitle="Back"
                  SaveButtonTitle="Save Changes"
                  StyleBack={ModalBackStyle}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Form>
    </Formik>
  );
};

export const ModalBackStyle = {
  height: { desktop: '40px', mobile: '38px' },
  width: { desktop: '86px', mobile: '76px' },
  fontSize: { desktop: '18px', mobile: '12px' },
  fontWeight: 600,
  color: `${colors.neutral900}`,
  backgroundColor: `${colors.white}`,
  borderRadius: '8px',
  border: `1px solid ${colors.neutral300}`,
};
