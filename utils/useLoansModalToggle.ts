import { useState, useEffect } from 'react';

export const useLoansModalToggle = () => {
  const [openPasswordModal, setPasswordModal] = useState(false);
  const [openRejectModal, setRejectModal] = useState(false);
  const [openDeleteModal, setDeleteModal] = useState(false);
  const [openToastMessage, setToastMessage] = useState(false);

  useEffect(() => {
    if (openToastMessage) {
      setTimeout(() => {
        setToastMessage(false);
      }, 3000);
    }
  }, [openToastMessage]);

  const toggleModal = (
    modalType?: 'password' | 'reject' | 'delete' | 'toast',
  ): void => {
    switch (modalType) {
      case 'password':
        setPasswordModal(!openPasswordModal);
        setRejectModal(false);
        setToastMessage(false);
        setDeleteModal(false);
        break;
      case 'reject':
        setRejectModal(!openRejectModal);
        setPasswordModal(false);
        setToastMessage(false);
        setDeleteModal(false);
        break;
      case 'delete':
        setDeleteModal(!openDeleteModal);
        setRejectModal(false);
        setPasswordModal(false);
        setToastMessage(false);
        break;
      case 'toast':
        setToastMessage(!openToastMessage);
        setDeleteModal(false);
        setRejectModal(false);
        setPasswordModal(false);
        break;
      default:
        setPasswordModal(false);
        setRejectModal(false);
        setDeleteModal(false);
        setToastMessage(false);
        break;
    }
  };

  const handleClose = (): void => {
    setPasswordModal(false);
    setRejectModal(false);
    setDeleteModal(false);
    setToastMessage(false);
  };

  return {
    openPasswordModal,
    openRejectModal,
    openDeleteModal,
    openToastMessage,
    handleClose,
    toggleModal,
  };
};
