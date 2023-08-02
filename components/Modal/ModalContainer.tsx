'use client';
import { useContext } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { ModalHeader } from './ModalHeader';
import { ModalContainer as ModalContainerStyle } from './styles';
import { AdminContext } from '@/features/Admin/AdminContext';

type Props = {
  title: string | undefined;
  form: any;
};

export const ModalContainer = ({ title, form }: Props) => {
  const { open, toggleModal, isEditing } = useContext(AdminContext);
  const newTitle = title?.replace('Edit', 'Add New');

  return (
    <Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={toggleModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={{
          backgroundColor: 'rgba(0, 66, 95, 0.5)',
        }}
      >
        <Fade in={open}>
          <Box sx={ModalContainerStyle}>
            <ModalHeader title={isEditing ? title : newTitle} />
            {form}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};
