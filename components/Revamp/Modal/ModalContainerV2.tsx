'use client';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import { ModalStyleContainer } from './style';

type Props = {
  form: React.ReactElement;
  handleClose?: () => void;
};

export const ModalContainerV2 = ({ form, handleClose }: Props) => {
  const [open, setOpen] = useState(true);

  return (
    <Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={{
          backgroundColor: 'rgb(34, 40, 52, 0.4)',
        }}
      >
        <Fade in={open}>
          <Box sx={ModalStyleContainer}>{form}</Box>
        </Fade>
      </Modal>
    </Box>
  );
};
