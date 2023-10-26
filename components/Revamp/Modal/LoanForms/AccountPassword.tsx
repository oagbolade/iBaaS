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
} from '../style';
import { PrimaryIconButton } from '@/components/Buttons/PrimaryIconButton';
import { user as userSchema } from '@/constants/schemas';
import { userInitialValues } from '@/constants/types';
import { FormTextInput } from '@/components/FormikFields';
import { PageTitle } from '@/components/Typography';

type Props = {
  handleClose: () => void;
  showRejection?: () => void;
  showToast?: () => void;
};

export const AccountPassword = ({
  handleClose,
  showRejection,
  showToast,
}: Props): React.ReactElement => {
  const onSubmit = (values: any, actions: { setSubmitting: Function }) => {
    actions.setSubmitting(false);
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
              <PageTitle
                title="Enter your account password"
                styles={{ ...AccountTitle }}
              />
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </Box>
          </Box>
          <Box sx={AccountPasswordBodyContainer}>
            <Box sx={AccountBody}>
              <Box>
                <Box>
                  <PageTitle
                    title="To confirm this is really you , please enter your account password to successfully cancel the loan."
                    styles={{ ...AccountBodyPage }}
                  />
                </Box>
              </Box>
              <Box sx={AccountInputContainer}>
                <FormTextInput
                  customStyle={{ ...AccountInputText }}
                  name="name"
                  placeholder="Enter Password"
                  label="Enter Password"
                />
              </Box>
            </Box>
            <Box sx={ButtonContainer}>
              <Box>
                <Box sx={ButtonColorStyle}>
                  <Box sx={ButtonText}>
                    <Box sx={CancelButton}>
                      <PrimaryIconButton
                        onClick={handleClose}
                        buttonTitle="Cancel"
                        customStyle={{ ...TypographyButton }}
                      />
                    </Box>
                    <Box sx={ConfirmButton}>
                      <PrimaryIconButton
                        onClick={showToast || showRejection}
                        buttonTitle="Confirm"
                        customStyle={{ ...TypographyConfirm }}
                      />
                    </Box>
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
