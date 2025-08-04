'use client';
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { DeleteConfirmationModal } from '../Forms/DeleteConfirmationModal';
import { FilterSection } from './FilterSection';
import { TableActionMenu } from './TableActionMenu';
import { COLUMNS } from './COLUMNS';
import { AdminContainer } from '@/features/Administrator/AdminContainer';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { MuiTableContainer } from '@/components/Table';
import { ModalContainerV2 } from '@/components/Revamp/Modal';
import { useDeleteRole, useFilterRoleSearch } from '@/api/admin/useRole';
import { StyledTableCell } from '@/components/Table/style';
import { StyledTableRow, renderEmptyTableBody } from '@/components/Table/Table';
import { ISearchParams } from '@/app/api/search/route';
import { ToastMessage } from '@/components/Revamp/ToastMessage';
import { FormSkeleton } from '@/components/Loaders';
import { IRoles, SearchRoleResponse } from '@/api/ResponseTypes/admin';
import { ModalTitleDescriptionMapper } from '@/features/Administrator/Users';
import { DeleteActionSteps } from '@/constants/Steps';
import { useValidatePassword } from '@/api/admin/useAdminUsers';
import { getStoredUser } from '@/utils/user-storage';
import { ValidatePasswordRequest } from '@/api/RequestTypes/admin';

const actionButtons: any = [
  <Box ml={{ mobile: 12, desktop: 0 }}>
    <Link href="/admin/roles/create">
      <PrimaryIconButton
        buttonTitle="Add New Role"
        customStyle={{ ...submitButton }}
      />
    </Link>
  </Box>
];

export const Roles = () => {
  const [deleteStep, setDeleteStep] = useState<DeleteActionSteps>(null);
  const { mutate: validatePassword } = useValidatePassword();
  const [currentRole, setCurrentRole] = useState<IRoles>();
  const { mutate } = useDeleteRole();

  const toastMessageMapper = {
    roleDelete: {
      title: 'Role Deleted',
      body: '[User-Name] has been successfully deleted and will no longer be able to access the platform.'
    }
  };

  const modalTitleDescriptionMapper: ModalTitleDescriptionMapper = {
    isDeleteConfirmation: {
      title: 'Delete Role',
      body: 'When you delete a role, the role wont’t be available on this platform, would you like to proceed?'
    },
    isPassword: { title: 'Delete Role', body: '' }
  };

  useEffect(() => {
    if (deleteStep === 'showToast') {
      setTimeout(() => {
        setDeleteStep(null);
      }, 3000);
    }
  }, [deleteStep]);

  const [search, setSearch] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [page, setPage] = React.useState(1);
 
  const {
    totalPages,
    totalElements,
    data: rolesData,
    isLoading: areRoleDataLoading
  } = useFilterRoleSearch({
    ...searchParams,
    page
  });

  const handleSearch = async (params: ISearchParams | null) => {
    setSearchParams(params);
    setSearch(true);
  };

  const refetch = () => {
    handleSearch(searchParams);
  };

  const handleDelete = async (
    currentStep: DeleteActionSteps = null,
    role: IRoles | null = null,
    password: string | null = null
  ) => {
    if (role) {
      setCurrentRole(role);
    }

    if (currentStep === 'proceedToDelete') {
      const body: ValidatePasswordRequest = {
        oldpassword: password as string,
        tenantid: 'RV00001', // TODO: figure out how to get tenantID, probably save on login stage
        userid: getStoredUser()?.profiles.userid as string
      };

      await validatePassword?.(body);
      await mutate?.(currentRole?.role_id);
      setDeleteStep(null);

      // do a refetch here
      refetch();
      return;
    }

    setDeleteStep(currentStep);
  };

  const ActionMenuProps = ({
    roleid,
    role
  }: {
    roleid: string;
    role: IRoles;
  }): React.ReactElement => {
    return (
      <TableActionMenu
        role={role}
        roleid={roleid}
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
        <FilterSection onSearch={handleSearch} />
        <Box
          sx={{
            position: { mobile: 'relative' },
            bottom: '25px',
            width: '100%'
          }}
        >
          {areRoleDataLoading ? (
            <FormSkeleton noOfLoaders={3} />
          ) : (
            <MuiTableContainer
              columns={COLUMNS}
              tableConfig={{
                hasActions: true
              }}
              data={rolesData}
              setPage={setPage}
              page={page}
              totalPages={totalPages}
              totalElements={totalElements}
            >
              {search ? (
                rolesData?.map((dataItem: SearchRoleResponse) => {
                  return (
                    <StyledTableRow key={dataItem?.role_id}>
                      <StyledTableCell component="th" scope="row">
                        {dataItem.role_name || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {dataItem.roledesc || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem.noOfMembers || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <ActionMenuProps
                          roleid={dataItem.role_id || 'N/A'}
                          role={dataItem}
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
                    {renderEmptyTableBody(rolesData)}
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </MuiTableContainer>
          )}
        </Box>
        <Box />
        {deleteStep === 'showToast' && (
          <ToastMessage
            title={toastMessageMapper.roleDelete.title}
            body={toastMessageMapper.roleDelete.body}
          />
        )}
        {deleteStep !== null && deleteStep !== 'showToast' && (
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
