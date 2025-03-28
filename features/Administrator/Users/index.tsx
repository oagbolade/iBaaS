'use client';
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import moment from 'moment';
import Link from 'next/link';
import { FilterSection } from './FilterSection';
import { TableActionMenu } from './TableActionMenu';
import { COLUMNS } from './COLUMNS';
import { DeleteConfirmationModal } from '@/features/Administrator/Forms/DeleteConfirmationModal';
import { AdminContainer } from '@/features/Administrator/AdminContainer';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  MuiTableContainer,
  StyledTableRow,
  renderEmptyTableBody
} from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { ToastMessage } from '@/components/Revamp/ToastMessage';
import { ModalContainerV2 } from '@/components/Revamp/Modal';
import {
  useDeleteUser,
  useFilterUserSearch,
  useLockOrUnlockUser,
  useValidatePassword
} from '@/api/admin/useAdminUsers';
import { FormSkeleton } from '@/components/Loaders';
import { ISearchParams } from '@/app/api/search/route';
import { IUsers, SearchUserResponse } from '@/api/ResponseTypes/admin';
import { useGetBranches } from '@/api/general/useBranches';
import { DeleteActionSteps } from '@/constants/Steps';
import { ValidatePasswordRequest } from '@/api/RequestTypes/admin';
import { getStoredUser } from '@/utils/user-storage';

const actionButtons: any = [
  <Box ml={{ mobile: 12, desktop: 0 }}>
    <Link href="/admin/users/create">
      <PrimaryIconButton
        buttonTitle="Create User"
        customStyle={{ ...submitButton }}
      />
    </Link>
  </Box>
];

export type ModalTitleDescriptionMapper = {
  [key: string]: { title: string; body: string };
};

export const Users = () => {
  const [deleteStep, setDeleteStep] = useState<DeleteActionSteps>(null);
  const [search, setSearch] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [currentUser, setCurrentUser] = useState<IUsers>();
  const [page, setPage] = React.useState(1);
  const { branches } = useGetBranches();
  const currentUserID = currentUser?.userId as string;
  const lockStatus = currentUser?.lockcount ? 0 : 1;
  const { mutate } = useLockOrUnlockUser(currentUserID, lockStatus);
  const { mutate: validatePassword } = useValidatePassword();
  const { mutate: deleteUser } = useDeleteUser();
  const excludeSteps = ['proceedToLockOrUnlockUser'];
  const {
    totalPages,
    totalElements,
    data: userData,
    isLoading: isUserDataLoading
  } = useFilterUserSearch({
    ...searchParams,
    page
  });

  const toastMessageMapper = {
    userDelete: {
      title: 'User Deleted',
      body: '[User-Name] has been successfully deleted and will no longer be able to access the platform.'
    },
    userCreated: { title: '', body: '' },
    userReset: { title: '', body: '' },
    userLocked: {
      title: 'Confirmation!',
      body: 'Are you sure you cant to proceed?'
    }
  };

  const modalTitleDescriptionMapper: ModalTitleDescriptionMapper = {
    isDeleteConfirmation: {
      title: 'User Delete',
      body: 'When you delete a user, the user wont’t be able to access this platform any longer, would you like to proceed'
    },
    userCreated: { title: '', body: '' },
    userReset: { title: '', body: '' },
    isPassword: { title: 'Delete User', body: '' },
    isLockConfirmation: {
      title: 'Please Confirmation',
      body: 'Are you sure you want to proceed with this action?'
    }
  };

  useEffect(() => {
    if (deleteStep === 'showToast') {
      setTimeout(() => {
        setDeleteStep(null);
      }, 3000);
    }
  }, [deleteStep]);

  const handleSearch = async (params: ISearchParams | null) => {
    setSearchParams(params);
    setSearch(true);
  };

  const refetch = () => {
    handleSearch(searchParams);
  };

  const handleDelete = async (
    currentStep: DeleteActionSteps = null,
    user: IUsers | null = null,
    password: string | null = null
  ) => {
    if (user) {
      setCurrentUser(user);
    }

    if (currentStep === 'proceedToLockOrUnlockUser') {
      await mutate?.();
      refetch();
    }

    if (currentStep === 'proceedToDelete') {
      const body: ValidatePasswordRequest = {
        oldpassword: password as string,
        tenantid: `${getStoredUser()?.companyCode}`,
        userid: getStoredUser()?.profiles.userid as string
      };

      await validatePassword?.(body);
      await deleteUser?.(currentUser?.userId);
      setDeleteStep(null);

      refetch();
      return;
    }

    setDeleteStep(currentStep);
  };

  const ActionMenuProps = ({
    userid,
    user
  }: {
    userid: string;
    user: IUsers;
  }): React.ReactElement => {
    return (
      <TableActionMenu
        userid={userid?.trim()}
        user={user}
        handleDelete={handleDelete}
      />
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
        {branches && (
          <FilterSection branches={branches} onSearch={handleSearch} />
        )}
        <Box
          sx={{
            position: { mobile: 'relative' },
            bottom: '25px',
            width: '100%'
          }}
        >
          {isUserDataLoading ? (
            <FormSkeleton noOfLoaders={3} />
          ) : (
            <MuiTableContainer
              columns={COLUMNS}
              tableConfig={{
                hasActions: true
              }}
              data={userData}
              totalPages={totalPages}
              totalElements={totalElements}
              setPage={setPage}
              page={page}
            >
              {search ? (
                userData?.map((dataItem: SearchUserResponse & IUsers) => {
                  return (
                    <StyledTableRow key={dataItem.userId}>
                      <StyledTableCell component="th" scope="row">
                        {dataItem.userId}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem.fullname}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem.deptName || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem.role_name || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem.create_date
                          ? moment(dataItem.create_date).format(
                              'MMMM Do YYYY, h:mm:ss a'
                            )
                          : 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <ActionMenuProps
                          userid={dataItem.userId || 'N/A'}
                          user={dataItem}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })
              ) : (
                <StyledTableRow>
                  <StyledTableCell
                    colSpan={COLUMNS.length + 1}
                    component="th"
                    scope="row"
                  >
                    {renderEmptyTableBody(userData)}
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </MuiTableContainer>
          )}
        </Box>
        <Box />
        {deleteStep === 'showToast' && (
          <ToastMessage
            title={toastMessageMapper.userDelete.title}
            body={toastMessageMapper.userDelete.body}
          />
        )}
        {deleteStep !== null &&
          deleteStep !== 'showToast' &&
          !excludeSteps.includes(deleteStep) && (
            <ModalContainerV2
              handleClose={handleDelete}
              form={
                <DeleteConfirmationModal
                  modalTitle={`${
                    modalTitleDescriptionMapper[deleteStep]?.title || ''
                  }`}
                  modalDescription={`${
                    modalTitleDescriptionMapper[deleteStep]?.body || ''
                  }`}
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
