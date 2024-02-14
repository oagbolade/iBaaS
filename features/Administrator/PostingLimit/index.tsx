'use client';
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { DeleteConfirmationModal } from '../Forms/DeleteConfirmationModal';
import { FilterSection } from './FilterSection';
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
  <Link href="/admin/posting-limit/create">
    <PrimaryIconButton
      buttonTitle="Create New Limit"
      customStyle={{ ...submitButton }}
    />
  </Link>,
];

export const PostingLimit = () => {
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
      <Link href="/admin/posting-limit/create?isEditing=true">
        {' '}
        <TableSingleAction actionName="Edit Limit" />
      </Link>
    );
  };
  return (
    <>
      <TopActionsArea
        showBackButon={false}
        customStyle={{ width: '100%' }}
        actionButtons={actionButtons}
      />
      <AdminContainer>
        <FilterSection />
        <Box
          sx={{
            position: { mobile: 'relative' },
            bottom: '25px',
            width: '100%',
          }}
        >
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
