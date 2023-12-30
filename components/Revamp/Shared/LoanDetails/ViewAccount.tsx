'use client';
import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import Close from '@mui/icons-material/Close';
import { TableSingleAction } from '@/components/Table';
import {
  modalBody,
  modalBodyContainer,
  modalContainer,
  modalTitle,
  modalTitleContainer,
  modalTitleStyle,
  modalTyopgraphy,
  text,
  textField,
} from '@/features/Report/AuditTrail/style';

type Props = {
  open: boolean;
  toggleModal: () => void;
};

export const ViewAccount = ({ open, toggleModal }: Props) => {
  return (
    <Box sx={{ display: 'flex' }}>
      {open && (
        <Box>
          <Button sx={{ marginLeft: '190px' }} onClick={toggleModal}>
            <TableSingleAction actionName="View" />
          </Button>
          <Modal open={open} onClose={toggleModal}>
            <Box sx={modalContainer}>
              <Box sx={modalTitleContainer}>
                <Box sx={modalTitle}>
                  <Box sx={modalTitleStyle}>
                    <Typography sx={modalTyopgraphy}>Loan Account</Typography>
                    <Button onClick={toggleModal}>
                      <Close />
                    </Button>
                  </Box>
                </Box>
                <Box sx={modalBodyContainer}>
                  <Box sx={modalBody}>
                    <Box>
                      <Typography sx={text}>Account Name</Typography>
                      <Typography sx={textField}>Loan Account</Typography>
                    </Box>
                    <Box>
                      <Typography sx={text}>Book Balance</Typography>
                      <Typography sx={textField}>₦32,543,432,53</Typography>
                    </Box>
                    <Box>
                      <Typography sx={text}>Effective Balance</Typography>
                      <Typography sx={textField}>₦31,543,432,53</Typography>
                    </Box>
                    <Box>
                      <Typography sx={text}>Usable Balance</Typography>
                      <Typography sx={textField}>₦21,000,329,53</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Modal>
        </Box>
      )}
    </Box>
  );
};
