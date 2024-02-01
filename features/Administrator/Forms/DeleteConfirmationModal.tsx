'use client';
import React from 'react';
import { Box, IconButton } from '@mui/material';
import { Formik, Form } from 'formik';
import Close from '@mui/icons-material/Close';
import {
  TypographyButton,
  TypographyConfirm,
  ButtonContainer,
  ButtonColorStyle,
  ButtonText,
  CancelButton,
  ConfirmButton,
  AccountPasswordContainer,
  AccountPasswordTitleContainer,
  AccountPasswordTitle,
  AccountTitle,
  AccountPasswordBodyContainer,
  AccountBody,
  AccountBodyPage,
  AccountInputContainer,
  AccountInputText,
} from '@/components/Revamp/Modal/style';
import { PrimaryIconButton } from '@/components/Buttons/PrimaryIconButton';
import { user as userSchema } from '@/constants/schemas';
import { userInitialValues } from '@/constants/types';
import { FormTextInput } from '@/components/FormikFields';
import { PageTitle } from '@/components/Typography';
import colors from '@/assets/colors';
import { useCurrentBreakpoint } from '@/utils';

type Props = {
  modalTitle: string;
  modalDescription: string;
  handleClose: Function;
  deleteStep?: string | 'isConfirmation' | 'showToast' | 'password' | null;
};

export const DeleteConfirmationModal = ({
  handleClose,
  deleteStep,
  modalTitle,
  modalDescription,
}: Props): React.ReactElement => {
  const onSubmit = (values: any, actions: { setSubmitting: Function }) => {
    actions.setSubmitting(false);
  };
  const { isMobile, setWidth } = useCurrentBreakpoint();

  const confirmations = [
    'isConfirmation',
    'isDisengageConfirmation',
    'isDeactivateConfirmation',
  ];

  type ConfirmationMapper = {
    isConfirmation: string;
    isDeactivateConfirmation: string;
    isDisengageConfirmation: string;
    isDeactivatePassword: string;
    isDisengagePassword: string;
    [key: string]: string;
  };

  const conditonalRenderConfirmationMapper: ConfirmationMapper = {
    isConfirmation: 'isPassword',
    isPassword: 'showToast',
    isDeactivateConfirmation: 'isDeactivatePassword',
    isDisengageConfirmation: 'isDisengagePassword',
    isDeactivatePassword: 'showToast',
    isDisengagePassword: 'showToast',
  };

  return (
    <Formik
      initialValues={userInitialValues}
      onSubmit={(values, actions) => {
        return onSubmit(values, actions);
      }}
      validationSchema={userSchema}
    >
      <Form>
        <Box sx={AccountPasswordContainer}>
          <Box sx={AccountPasswordTitleContainer}>
            <Box sx={AccountPasswordTitle}>
              <PageTitle title={modalTitle} styles={{ ...AccountTitle }} />
              <IconButton onClick={() => handleClose(null)}>
                <Close />
              </IconButton>
            </Box>
          </Box>
          <Box sx={AccountPasswordBodyContainer}>
            <Box sx={AccountBody}>
              {confirmations?.includes(deleteStep as string) ? (
                <Box>
                  <Box>
                    <PageTitle
                      title={modalDescription}
                      styles={{ ...AccountBodyPage }}
                    />
                  </Box>
                </Box>
              ) : (
                <>
                  <Box>
                    <Box>
                      <PageTitle
                        title="To confirm this is really you , please enter your account password to continue."
                        styles={AccountBodyPage}
                      />
                    </Box>
                  </Box>
                  <Box sx={AccountInputContainer}>
                    <FormTextInput
                      type="password"
                      customStyle={{
                        ...AccountInputText,
                        width: setWidth(isMobile ? '240px' : '440px'),
                      }}
                      name="name"
                      placeholder="Enter Password"
                      label="Enter Password"
                    />
                  </Box>
                </>
              )}
            </Box>
            <Box sx={ButtonContainer}>
              <Box sx={ButtonColorStyle}>
                <Box sx={ButtonText}>
                  <Box sx={{ ...CancelButton, background: 'none' }}>
                    <PrimaryIconButton
                      onClick={() => handleClose(null)}
                      buttonTitle="Cancel"
                      customStyle={{
                        ...TypographyButton,
                        width: `${isMobile ? '80px' : '131px'}`,
                        height: '40px',
                        padding: { mobile: '0 50px' },
                      }}
                    />
                  </Box>
                  <Box sx={{ ...ConfirmButton, background: 'none' }}>
                    <PrimaryIconButton
                      onClick={() => {
                        console.log('deleteStep', deleteStep);
                        handleClose(
                          conditonalRenderConfirmationMapper[deleteStep || ''],
                        );
                      }}
                      buttonTitle="Proceed"
                      customStyle={{
                        ...TypographyConfirm,
                        backgroundColor: `${colors.primaryRedBase}`,
                        width: `${isMobile ? '80px' : '131px'}`,
                        height: '40px',
                        borderRadius: '6px',
                        padding: { mobile: '8px 50px', desktop: '16px 78px' },
                        marginRight: { mobile: '70px', desktop: 0 },
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Form>
    </Formik>
  );
};
