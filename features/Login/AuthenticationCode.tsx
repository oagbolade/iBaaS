import { AlertColor, Box } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import {
  authContainer,
  authTitle,
  titleStyle,
  subtitleStyle,
  authItem
} from './styles';
import { PageTitle } from '@/components/Typography';
import { FormTextInput } from '@/components/FormikFields';
import { TypographyConfirm } from '@/components/Revamp/Modal/style';
import { PrimaryIconButton } from '@/components/Buttons';
import colors from '@/assets/colors';
import { useCurrentBreakpoint } from '@/utils';
import { Auth2FaInitialValues } from '@/schemas/schema-values/auth';
import { useAuth2fa } from '@/api/auth/use2FA';
import { auth2faSchema } from '@/schemas/operation';
import { useUser } from '@/api/auth/useUser';
import { isTokenExistingOrExpired } from '@/utils/hooks/useAuthGuard';
import { getStoredUser } from '@/utils/user-storage';
import { MuiSnackbarContext } from '@/context/MuiSnackbarContext';
import { CloseIcon } from '@/assets/svg';

type Props = {
  handleClose: Function;
  handleVerifyCode: (authCode: string) => void;
  credentials: {
    companyCode: string;
    username: string;
    password: string;
  } | null;
};
export const AuthenticationCode = ({
  handleClose,
  handleVerifyCode,
  credentials
}: Props) => {
  const { isMobile, setWidth } = useCurrentBreakpoint();
  const router = useRouter();
  const { isPending, mutate } = useAuth2fa();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  const { toggleSnackbar, setMessage, setSeverity } =
    useContext(MuiSnackbarContext);
  const toast = (message: string, severity: AlertColor) => {
    toggleSnackbar();
    setMessage(message);
    setSeverity(severity);
  };

  useEffect(() => {
    const tokenExpiration = getStoredUser()?.tokenExpire;

    if (isTokenExistingOrExpired(tokenExpiration)) {
      return;
    }

    if (user) {
      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);

      toast('Login successful, redirecting please wait...', 'success');
    }
  }, []);

  const onSubmit = (values: any) => {
    const getAllValues = {
      ...values,
      userId: credentials?.username as string,
      tenantId: credentials?.companyCode as string
    };
    mutate(getAllValues, {
      onSuccess: (data) => {
        // Check responseCode from UseGetAllAuth2fa
        if (data.responseCode === '10') {
          toast('Invalid authentication code. Please try again.', 'error');
        } else {
          handleVerifyCode(values.otp); // Proceed with login
        }
        setIsSubmitting(false);
      },
      onError: (error: any) => {
        toast(
          `Verification failed: ${error.message || 'Unknown error'}`,
          'error'
        );
        setIsSubmitting(false);
      }
    });
  };
  return (
    <Formik
      onSubmit={(values) => {
        onSubmit(values);
      }}
      initialValues={Auth2FaInitialValues}
      validationSchema={auth2faSchema}
    >
      <Form>
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              cursor: 'pointer',
              color: '#333',
              width: '20px',
              height: '20px'
            }}
            onClick={() => handleClose()}
          >
            <CloseIcon />
          </Box>

          {/* Your existing code */}
          <Box sx={authItem}>
            <Box sx={authContainer}>
              <Box sx={authTitle}>
                <PageTitle
                  title="Enter your Authentication Code"
                  styles={{ ...titleStyle }}
                />
                <PageTitle
                  title="You can use your mobile application to get your authentication code"
                  styles={{ ...subtitleStyle }}
                />
              </Box>
              <Box sx={authTitle}>
                <FormTextInput
                  placeholder="Enter Code"
                  label="Enter Code"
                  name="otp"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '532px')
                  }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    marginTop: '33px',
                    marginBottom: '20px'
                  }}
                >
                  <PrimaryIconButton
                    type="submit"
                    buttonTitle={
                      isPending || isSubmitting
                        ? 'Submitting...'
                        : 'Confirm Code'
                    }
                    customStyle={{
                      ...TypographyConfirm,
                      backgroundColor: `${colors.activeBlue400}`,
                      width: `${isMobile ? '80px' : '532px'}`,
                      height: '45px',
                      borderRadius: '6px',
                      padding: { mobile: '8px 50px', desktop: '16px 32px' },
                      marginRight: { mobile: '70px', desktop: 0 }
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Form>
    </Formik>
  );
};
