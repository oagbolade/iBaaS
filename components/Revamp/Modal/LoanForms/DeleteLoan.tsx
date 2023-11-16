'use client';
import React from 'react';
import { Box, IconButton } from '@mui/material';
import Close from '@mui/icons-material/Close';
import {
  DeleteContainer,
  DeleteTitleContainer,
  DeleteTitle,
  DeleteTypograph,
  DeleteModalContainer,
  DeleteModal,
  DeleteTypographTitle,
  DeleteIcon,
  ButtonTitle,
  ButtonContainer,
  ButtonText,
  CancelButton,
  ConfirmButton,
  TypographyButton,
  TypographyConfirm,
} from '../style';
import { PrimaryIconButton } from '@/components/Buttons/PrimaryIconButton';
import { PageTitle } from '@/components/Typography';

type Props = {
  handleClose: () => void;
  showRejection?: () => void;
};

export const DeleteLoan = ({
  handleClose,
  showRejection,
}: Props): React.ReactElement => {
  return (
    <Box sx={DeleteContainer}>
      <Box sx={DeleteTitleContainer}>
        <Box sx={DeleteTitle}>
          <PageTitle title="Delete Loan" styles={{ ...DeleteTypograph }} />
          <Box sx={DeleteIcon}>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box sx={DeleteModalContainer}>
        <Box sx={DeleteModal}>
          <Box>
            <PageTitle
              styles={{ ...DeleteTypographTitle }}
              title="When you delete a loan, the loan will be deleted from your entire loan directory, would you like to proceed"
            />
          </Box>
        </Box>
        <Box sx={ButtonContainer}>
          <Box>
            <Box sx={ButtonTitle}>
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
  );
};
