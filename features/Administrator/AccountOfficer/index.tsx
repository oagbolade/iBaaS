'use client';
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { FilterSection } from './FilterSection';
import { TableActionMenu } from './TableActionMenu';
import { DeleteConfirmationModal } from '@/features/Administrator/Forms/DeleteConfirmationModal';
import { AdminContainer } from '@/features/Administrator/AdminContainer';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { MuiTableContainer } from '@/components/Table';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { ToastMessage } from '@/components/Revamp/ToastMessage';
import { ModalContainerV2 } from '@/components/Revamp/Modal';

const actionButtons: any = [
  <Link href="/admin/account-officers/create">
    <PrimaryIconButton
      buttonTitle="Add Account Officer"
      customStyle={{ ...submitButton, width: '218px', height: '40px' }}
    />
  </Link>,
];

export const AccountOfficers = () => {
  const [deleteStep, setDeleteStep] = useState<
    | null
    | 'isDisengageConfirmation'
    | 'isDeactivateConfirmation'
    | 'isDeactivatePassword'
    | 'isDisengagePassword'
    | 'showToast'
  >(null);

  interface IToastMapper {
    title: string;
    body: string;
  }

  type ToastMessageMapper = {
    isDeactivatePassword: IToastMapper;
    isDisengagePassword: IToastMapper;
    officerCreated: IToastMapper;
    officerEdited: IToastMapper;
    [key: string]: IToastMapper;
  };

  const toastMessageMapper: ToastMessageMapper = {
    isDeactivatePassword: {
      title: 'Account Officer Created',
      body: '[Officer-name] has been successfully created.',
    },
    isDisengagePassword: {
      title: 'Officer Disengaged',
      body: '[Officer-name] has been successfully disengaged.',
    },
    officerCreated: { title: '', body: '' },
    officerEdited: { title: '', body: '' },
    showToast: { title: 'Success', body: 'Action successfully completed' },
  };

  useEffect(() => {
    if (deleteStep === 'showToast') {
      setTimeout(() => {
        setDeleteStep(null);
      }, 3000);
    }
  }, [deleteStep]);

  const handleDelete = (
    currentStep:
      | null
      | 'isDisengageConfirmation'
      | 'isDeactivateConfirmation'
      | 'showToast'
      | 'isDeactivatePassword'
      | 'isDisengagePassword' = null,
  ) => {
    setDeleteStep(currentStep);
  };

  const modalTitle = (): string => {
    const deactivate = ['isDeactivateConfirmation', 'isDeactivatePassword'];
    const disengage = ['isDisengageConfirmation', 'isDisengagePassword'];
    if (deactivate.includes(deleteStep as string)) {
      return 'Deactivate Officer';
    }

    if (disengage.includes(deleteStep as string)) {
      return 'Disengage Officer';
    }

    return '';
  };

  const modalDescription = (): string => {
    if (deleteStep === 'isDeactivateConfirmation') {
      return 'When you deactivate an officer, the officer wont’t be able to access this platform any longer, would you like to proceed?';
    }

    if (deleteStep === 'isDisengageConfirmation') {
      return 'When you disengage an officer, the officer wont’t be able to access this platform till you grant them access over again, would you like to proceed?';
    }

    return '';
  };
  const ActionMenuProps: React.FC = () => {
    return <TableActionMenu handleDelete={handleDelete} />;
  };

  return (
    <>
      <TopActionsArea
        customStyle={{ width: '100%' }}
        actionButtons={actionButtons}
      />
      <AdminContainer>
        <FilterSection />
        <Box sx={{ width: '100%' }}>
          <MuiTableContainer
            columns={MOCK_COLUMNS}
            data={MOCK_DATA}
            tableConfig={{
              hasActions: true,
            }}
            ActionMenuProps={ActionMenuProps}
          />
        </Box>
        <Box />
        {deleteStep === 'showToast' && (
          <ToastMessage
            title={toastMessageMapper[deleteStep].title}
            body={toastMessageMapper[deleteStep].body}
          />
        )}
        {deleteStep !== null && deleteStep !== 'showToast' && (
          <ModalContainerV2
            handleClose={handleDelete}
            form={
              <DeleteConfirmationModal
                modalTitle={modalTitle()}
                modalDescription={modalDescription()}
                deleteStep={deleteStep}
                handleClose={handleDelete}
              />
            }
          />
        )}
      </AdminContainer>
    </>
  );
};
