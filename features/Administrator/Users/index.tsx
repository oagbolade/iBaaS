'use client';
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { FilterSection } from './FilterSection';
import { TableActionMenu } from './TableActionMenu';
import MOCK_DATA from './MOCK_DATA.json';
import { DeleteConfirmationModal } from '@/features/Administrator/Forms/DeleteConfirmationModal';
import { AdminContainer } from '@/features/Administrator/AdminContainer';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  MuiTableContainer,
  StyledTableRow,
  renderEmptyTableBody,
} from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import { ToastMessage } from '@/components/Revamp/ToastMessage';
import { ModalContainerV2 } from '@/components/Revamp/Modal';

const actionButtons: any = [
  <Box ml={{ mobile: 12, desktop: 0 }}>
    <Link href="/admin/users/create">
      <PrimaryIconButton
        buttonTitle="Create User"
        customStyle={{ ...submitButton }}
      />
    </Link>
  </Box>,
];

export const Users = () => {
  const [deleteStep, setDeleteStep] = useState<
    null | 'isConfirmation' | 'showToast' | 'password'
  >(null);
  const [search, setSearch] = useState<boolean>(false);

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

  const handleSearch = () => {
    setSearch(true);
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
        <FilterSection onSearch={handleSearch} />
        <Box sx={{ width: '100%' }}>
          <MuiTableContainer
            columns={MOCK_COLUMNS}
            tableConfig={{
              hasActions: true,
            }}
            ActionMenuProps={ActionMenuProps}
          >
            {search ? (
              MOCK_DATA.map((dataItem) => {
                return (
                  <StyledTableRow key={dataItem.name}>
                    <StyledTableCell component="th" scope="row">
                      {dataItem.staffId}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.department}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.role}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.date}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <ActionMenuProps />
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })
            ) : (
              <StyledTableRow>
                <StyledTableCell
                  colSpan={MOCK_COLUMNS.length + 1}
                  component="th"
                  scope="row"
                >
                  {renderEmptyTableBody()}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </MuiTableContainer>
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
                modalTitle="Delete User"
                modalDescription="When you delete a user, the user wont’t be able to access this platform any longer, would you like to proceed"
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
