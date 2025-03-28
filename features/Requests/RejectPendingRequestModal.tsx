import {
  AlertColor,
  Backdrop,
  Box,
  Fade,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { Form, Formik } from 'formik';
import React, { ChangeEvent, useContext, useState } from 'react';
import {
  buttonContainer,
  cancelButton,
  confirmButton,
  reasonForRejection,
  reasonText,
  rejectRequest,
  rejectRequestModalContainer
} from './styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { textAreaIcon } from '@/components/FormikFields/styles';
import { TextAreaIcon } from '@/assets/svg';
import { IGetPendingRequest } from '@/api/ResponseTypes/loans';
import {
  rejectPendingRequestFormValues,
  rejectPendingRequestInitialValues
} from '@/schemas/schema-values/requests';
import { rejectPendingRequestSchema } from '@/schemas/requests';
import { useRejectPendingRequest } from '@/api/loans/useRejectPendingRequest';
import { toast } from '@/utils/toast';
import { ToastMessageContext } from '@/context/ToastMessageContext';

interface Props {
  isRejected: boolean;
  setIsRejected: React.Dispatch<React.SetStateAction<boolean>>;
  pendingRequestData: IGetPendingRequest;
}

export const RejectPendingRequestModal = ({
  isRejected,
  setIsRejected,
  pendingRequestData
}: Props) => {
  const { mutate } = useRejectPendingRequest();
  const [comment, setComment] = useState<string>('');
  const toastActions = useContext(ToastMessageContext);

  const onCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const onSubmit = (values: any) => {
    const toastMessage = {
      title: 'Validation error',
      severity: 'error',
      comment: {
        message: 'Type in a comment'
      }
    };

    if (comment.length < 2) {
      toast(
        toastMessage.comment.message,
        toastMessage.title,
        toastMessage.severity as AlertColor,
        toastActions
      );

      return;
    }

    const rejectpendingrequestData: rejectPendingRequestFormValues = {
      id: pendingRequestData?.id.toString(),
      comments: comment
    };

    mutate?.(rejectpendingrequestData);
    setComment('');
    setIsRejected(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isRejected}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Fade in={isRejected}>
          <Box sx={rejectRequestModalContainer}>
            <Box>
              <Grid container spacing={1}>
                <Grid item mobile={12}>
                  <Box sx={{ marginBottom: '10px' }}>
                    <Stack
                      sx={{
                        marginBottom: '10px'
                      }}
                    >
                      <Box>
                        <Typography sx={rejectRequest}>
                          Reject Request
                        </Typography>
                      </Box>
                      <Typography sx={reasonText}>
                        Please enter a reason for rejection to reject this
                        request
                      </Typography>

                      <Typography sx={reasonForRejection}>
                        Reason for Rejection
                      </Typography>
                      <Box>
                        <TextField
                          placeholder="Short text..."
                          rows={4}
                          multiline
                          onChange={onCommentChange}
                          name="comments"
                          value={comment}
                          sx={{
                            outline: 'none',
                            width: '100%',
                            marginTop: '10px',
                            padding: '0 20px'
                          }}
                          InputProps={{
                            endAdornment: (
                              <Box sx={textAreaIcon}>
                                <TextAreaIcon />
                              </Box>
                            )
                          }}
                        />
                      </Box>
                    </Stack>
                  </Box>
                </Grid>
                <Grid container mt={4} ml={1} mobile={12}>
                  <Box sx={buttonContainer}>
                    <PrimaryIconButton
                      onClick={() => setIsRejected(false)}
                      buttonTitle="Cancel"
                      customStyle={cancelButton}
                    />
                    <PrimaryIconButton
                      onClick={onSubmit}
                      buttonTitle="Confirm"
                      customStyle={confirmButton}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
