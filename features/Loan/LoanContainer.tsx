'use client';
import React from 'react';
import Box from '@mui/material/Box';
import { MuiTableContainer } from '@/components/Table';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import { ModalContainerV2 } from '@/components/Revamp/Modal';
import { AccountPassword } from '@/components/Revamp/Modal/LoanForms/AccountPassword';
import { RejectLoan } from '@/components/Revamp/Modal/LoanForms/RejectedLoan';
import { DeleteLoan } from '@/components/Revamp/Modal/LoanForms/DeleteLoan';
import { ToastMessage } from '@/components/Revamp/ToastMessage';

interface HeaderI {
  mainTitle: string;
  secondaryTitle: string;
}

interface IActionModal {
  handleClose: () => void;
  toggleModal?: Function;
  openPasswordModal?: boolean;
  openRejectModal?: boolean;
  openDeleteModal?: boolean;
}

interface IToastMessage {
  title: string;
  body: string;
  open: boolean;
}

type Props = {
  showHeader?: HeaderI;
  TableActionItems?: any;
  checkBox?: any;
  actionModal?: IActionModal;
  toastMessage?: IToastMessage;
};

export const LoanContainer = ({
  actionModal,
  showHeader,
  TableActionItems,
  checkBox,
  toastMessage,
}: Props) => {
  const showRejection = () => {
    return actionModal?.toggleModal?.('reject');
  };

  return (
    <Box
      sx={{
        padding: '25px',
        width: {mobile: 900, tablet: '100%'}
      }}
    >
      <MuiTableContainer
        columns={MOCK_COLUMNS}
        data={MOCK_DATA}
        showHeader={showHeader}
        ActionMenuProps={TableActionItems}
        checkboxHeader={checkBox}
      />

      {toastMessage?.open && (
        <ToastMessage title={toastMessage?.title} body={toastMessage?.body} />
      )}

      {actionModal?.openRejectModal && (
        <ModalContainerV2
          handleClose={actionModal.handleClose}
          form={<RejectLoan showToast={() => actionModal.toggleModal?.('toast')} handleClose={actionModal.handleClose} />}
        />
      )}

      {actionModal?.openDeleteModal && (
        <ModalContainerV2
          handleClose={actionModal.handleClose}
          form={<DeleteLoan handleClose={actionModal.handleClose} />}
        />
      )}

      {actionModal?.openPasswordModal && (
        <ModalContainerV2
          handleClose={actionModal.handleClose}
          form={
            <AccountPassword
              showRejection={showRejection}
              handleClose={actionModal.handleClose}
            />
          }
        />
      )}
    </Box>
  );
};
