'use client';
import { Box, IconButton } from '@mui/material';
import { Formik, Form } from 'formik';
import Close from '@mui/icons-material/Close';
import {
  ModalTitle,
  textTypography,
  TypographyText,
  TypographyButton,
  TypographyConfirm,
  RejectedModal,
  textTitle,
  modalTable,
  modalText,
  pageText,
  TextAreaContainer,
  CancelButton,
  ConfirmButton,
  RejectedLoadButtonContainer,
  RejectedLoanStyle,
  RejectedButton,
  TextArea
} from '../style';
import { PrimaryIconButton } from '@/components/Buttons/PrimaryIconButton';
import { user as userSchema } from '@/schemas/auth';
import { userInitialValues } from '@/constants/types';
import { TextFieldArea } from '@/components/FormikFields';
import { PageTitle } from '@/components/Typography';

type Props = {
  handleClose?: () => void;
  showToast?: () => void;
};

export const RejectLoan = ({ handleClose, showToast }: Props) => {
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
      initialValues={userInitialValues}
      onSubmit={(values, actions) => {
        return onSubmit(values, actions);
      }}
      validationSchema={userSchema}
    >
      <Form>
        <Box sx={RejectedModal}>
          <Box sx={ModalTitle}>
            <Box sx={textTitle}>
              <PageTitle title="Reject Loan" styles={{ ...textTypography }} />
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </Box>
            <Box sx={modalTable}>
              <Box sx={modalText}>
                <Box>
                  <Box sx={pageText}>
                    <PageTitle
                      title="Please enter a reason for rejection to reject this loan"
                      styles={{ ...TypographyText }}
                    />
                  </Box>
                </Box>
                <Box sx={TextAreaContainer}>
                  <TextFieldArea
                    customStyle={{ ...TextArea }}
                    label="Reason for Rejection"
                    title="Short text..."
                    placeholder="short text...."
                  />
                </Box>
              </Box>
              <Box sx={RejectedLoadButtonContainer}>
                <Box>
                  <Box sx={RejectedLoanStyle}>
                    <Box sx={RejectedButton}>
                      <Box sx={CancelButton}>
                        <PrimaryIconButton
                          buttonTitle="Cancel"
                          customStyle={{ ...TypographyButton }}
                        />
                      </Box>
                      <Box sx={ConfirmButton}>
                        <PrimaryIconButton
                          onClick={showToast}
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
        </Box>
      </Form>
    </Formik>
  );
};
