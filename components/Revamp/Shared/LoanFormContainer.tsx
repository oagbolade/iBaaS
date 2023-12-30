/* We may use this container for other modules as well
  Still under observation
*/
'use client';
import React, { ReactNode } from 'react';
import { Box, Stack } from '@mui/material';
import { LargeTitle } from './LoanDetails/LoanDetails';
import { TopActionsArea } from '@/components/Revamp/Shared';
import colors from '@/assets/colors';
import { useSetDirection } from '@/utils/useSetDirection';
import { ToastMessage } from '@/components/Revamp/ToastMessage';
import { AccountPassword } from '@/components/Revamp/Modal/LoanForms/AccountPassword';
import { ModalContainerV2 } from '@/components/Revamp/Modal';
import { useCurrentBreakpoint } from '@/utils';

interface IToastMessage {
  title: string;
  body: string;
  open: boolean;
}

interface IActionModal {
  handleClose: () => void;
  toggleModal?: Function;
  openPasswordModal: boolean;
}

type Props = {
  FormFields: React.ComponentType;
  PreviewContent: React.ComponentType;
  actionButtons: Array<ReactNode>;
  ShowMobilePeview: React.ComponentType;
  toastMessage?: IToastMessage;
  actionModal?: IActionModal;
};

export const LoanFormContainer = ({
  FormFields,
  PreviewContent,
  actionButtons,
  toastMessage,
  actionModal,
  ShowMobilePeview,
}: Props) => {
  const { setDirection } = useSetDirection();
  const { isTablet } = useCurrentBreakpoint();

  return (
    <Box>
      {toastMessage?.open && (
        <ToastMessage title={toastMessage?.title} body={toastMessage?.body} />
      )}

      <TopActionsArea actionButtons={actionButtons} />
      <Box
        sx={{
          padding: { mobile: '0 5px', desktop: '0 25px' },
          width: '100%',
        }}
      >
        <ShowMobilePeview />
        <Stack direction={setDirection()}>
          <Box
            sx={{
              width: { mobile: '100%', desktop: '624px' },
              padding: '32px',
            }}
          >
            <FormFields />
          </Box>
          {isTablet && (
            <Box
              sx={{
                width: '477px',
                padding: '32px',
                gap: '24px',
                borderLeft: `1px solid ${colors.neutral300}`,
                background: `${colors.neutral100}`,
                display: {
                  tablet: 'block',
                  mobile: 'none',
                },
              }}
            >
              <LargeTitle title="Preview" />
              <Box mt={3} />
              <PreviewContent />
            </Box>
          )}
        </Stack>
      </Box>
      {actionModal?.openPasswordModal && (
        <ModalContainerV2
          handleClose={actionModal.handleClose}
          form={
            <AccountPassword
              showToast={() => actionModal.toggleModal?.('toast')}
              handleClose={actionModal.handleClose}
            />
          }
        />
      )}
    </Box>
  );
};
