'use client';
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { FilterSection } from './FilterSection';
import { DeleteConfirmationModal } from '@/features/Administrator/Forms/DeleteConfirmationModal';
import { AdminContainer } from '@/features/Administrator/AdminContainer';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { MuiTableContainer, TableSingleAction } from '@/components/Table';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { ToastMessage } from '@/components/Revamp/ToastMessage';
import { ModalContainerV2 } from '@/components/Revamp/Modal';

const actionButtons: any = [
  <Box ml={{ mobile: 12, desktop: 0 }}>
    <Link href="/finance/general-ledger/create">
      <PrimaryIconButton
        buttonTitle="Create General Ledger"
        customStyle={{
          ...submitButton,
          width: { mobile: '125px', desktop: '236px' },
          height: '40px',
        }}
      />
    </Link>
  </Box>,
];

export const GeneralLedger = () => {
  const [deleteStep, setDeleteStep] = useState<
    null | 'isConfirmation' | 'showToast' | 'password'
  >(null);

  const toastMessageMapper = {
    userDelete: {
      title: 'User Deleted',
      body: '[User-Name] has been successfully deleted and will no longer be able to access the platform.',
    },
    userCreated: { title: '', body: '' },
    userReset: { title: '', body: '' },
    userLocked: { title: '', body: '' },
  };

  useEffect(() => {
    if (deleteStep === 'showToast') {
      setTimeout(() => {
        setDeleteStep(null);
      }, 3000);
    }
  }, [deleteStep]);

  const handleDelete = (
    currentStep: null | 'isConfirmation' | 'showToast' | 'password' = null,
  ) => {
    setDeleteStep(currentStep);
  };

  const ActionMenuProps: React.FC = () => {
    return (
      <Link href="/finance/general-ledger/create?isEditing=true">
        {' '}
        <TableSingleAction actionName="Edit" />
      </Link>
    );
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
            showHeader={{
              mainTitle: 'General Ledger',
              secondaryTitle:
                'See a directory of all general ledgers on this system.',
              hideFilterSection: true,
            }}
            ActionMenuProps={ActionMenuProps}
          />
        </Box>
        <Box />
        {deleteStep === 'showToast' && (
          <ToastMessage
            title={toastMessageMapper.userDelete.title}
            body={toastMessageMapper.userDelete.body}
          />
        )}
        {deleteStep !== null && deleteStep !== 'showToast' && (
          <ModalContainerV2
            handleClose={handleDelete}
            form={
              <DeleteConfirmationModal
                modalTitle=""
                modalDescription=""
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
