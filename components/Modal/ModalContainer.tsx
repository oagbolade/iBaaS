'use client';

import { useContext } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { ModalHeader } from './ModalHeader';
import { ModalContainer as ModalContainerStyle } from './styles';
import { AdminContext } from '@/features/Admin-old/AdminContext';
import { SetupContext } from '@/features/Setup/SetupContext';
import { CustomerServiceContext } from '@/features/CustomerService/CustomerServiceContext';

type Props = {
  title: string | undefined;
  form: any;
  isCustomerCreation?: boolean;
  isAccountRecord?: boolean;
};

export const ModalContainer = ({
  title,
  form,
  isCustomerCreation,
  isAccountRecord,
}: Props) => {
  const { open, toggleModal, isEditing } = useContext(AdminContext);
  const { isSetupModalOpen, toggleSetupModal, isEditingSetup } =
    useContext(SetupContext);
  const {
    isCustomerServiceModalOpen,
    toggleCustomerServiceModal,
    isEditingCustomerService,
  } = useContext(CustomerServiceContext);
  let newTitle = title?.replace('Edit', 'Add New');

  if (isCustomerCreation && isEditingCustomerService) {
    newTitle = 'Edit Customer';
  }

  if (isAccountRecord && isEditingCustomerService) {
    newTitle = 'Edit Account Record';
  }

  const handleClose = () => {
    if (isSetupModalOpen) return toggleSetupModal(isEditingSetup);
    if (isCustomerServiceModalOpen)
      return toggleCustomerServiceModal(isEditingCustomerService);
    toggleModal(isEditing);
  };

  return (
    <Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open || isSetupModalOpen || isCustomerServiceModalOpen}
        onClose={() => {
          return handleClose();
        }}
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
        <Fade in={open || isSetupModalOpen || isCustomerServiceModalOpen}>
          <Box sx={ModalContainerStyle}>
            <ModalHeader title={isEditing ? title : newTitle} />
            {!isCustomerCreation && form}
            {isCustomerCreation && isEditingCustomerService
              ? form.edit
              : form.customerType}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};
