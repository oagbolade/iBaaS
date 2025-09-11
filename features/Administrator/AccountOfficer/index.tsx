'use client';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { FilterSection } from './FilterSection';
import { TableActionMenu } from './TableActionMenu';
import { COLUMNS } from './COLUMNS';
import { DeleteConfirmationModal } from '@/features/Administrator/Forms/DeleteConfirmationModal';
import { AdminContainer } from '@/features/Administrator/AdminContainer';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { MuiTableContainer } from '@/components/Table';
import { StyledTableRow, renderEmptyTableBody } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { ToastMessage } from '@/components/Revamp/ToastMessage';
import { ModalContainerV2 } from '@/components/Revamp/Modal';
import {
  IAccountOfficers,
  SearchAccountOfficersResponse
} from '@/api/ResponseTypes/admin';
import { useGetBranches } from '@/api/general/useBranches';
import { FormSkeleton } from '@/components/Loaders';
import { ISearchParams } from '@/app/api/search/route';
import {
  useDeleteAccountOfficer,
  useFilterAccountOfficerSearch
} from '@/api/admin/useAccountOfficer';
import { ModalTitleDescriptionMapper } from '@/features/Administrator/Users';
import { DeleteActionSteps } from '@/constants/Steps';
import { useValidatePassword } from '@/api/admin/useAdminUsers';
import { getStoredUser } from '@/utils/user-storage';
import { ValidatePasswordRequest } from '@/api/RequestTypes/admin';
import { useGetStatus } from '@/api/general/useStatus';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { FetchingLoader } from '@/components/Loaders/useFetchingLoader';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';

const actionButtons: any = [
  <Box ml={{ mobile: 12, desktop: 0 }}>
    <Link href="/admin/account-officers/create">
      <PrimaryIconButton
        buttonTitle="Add Account Officer"
        customStyle={{
          ...submitButton,
          width: { mobile: '119px', desktop: '218px' },
          height: { mobile: '30px', desktop: '40px' }
        }}
      />
    </Link>
  </Box>
];

export const AccountOfficers = () => {
  const { isLoading } = useGlobalLoadingState();
  const [deleteStep, setDeleteStep] = useState<DeleteActionSteps>(null);
  const [currentOfficer, setCurrentOfficer] = useState<IAccountOfficers>();
  const { mutate: validatePassword } = useValidatePassword();
  const { mutate } = useDeleteAccountOfficer();
  const toastMessageMapper = {
    officerDelete: {
      title: 'Officer Deleted',
      body: '[User-Name] has been successfully deleted and will no longer be able to access the platform.'
    }
  };

  const modalTitleDescriptionMapper: ModalTitleDescriptionMapper = {
    isDeleteConfirmation: {
      title: 'Delete Officer',
      body: 'When you delete an officer, the officer wont’t be able to access this platform, would you like to proceed?'
    },
    isPassword: { title: 'Delete User', body: '' }
  };

  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<ISearchParams>('account-officers');

  const { branches } = useGetBranches();
  const { status } = useGetStatus();

  const {
    totalPages,
    totalElements,
    data: accountOfficerData,
    isLoading: areAccountOfficersDataLoading
  } = useFilterAccountOfficerSearch({
    ...searchParams,
    page
  });

  useEffect(() => {
    if (deleteStep === 'showToast') {
      setTimeout(() => {
        setDeleteStep(null);
      }, 3000);
    }
  }, [deleteStep]);

  const handleSearch = async (params: ISearchParams | null) => {
    setSearchParams(params);
    setSearchActive(true);
  };

  const refetch = () => {
    handleSearch(searchParams);
  };

  const handleDelete = async (
    currentStep: DeleteActionSteps = null,
    officer: IAccountOfficers | null = null,
    password: string | null = null
  ) => {
    if (officer) {
      setCurrentOfficer(officer);
    }

    if (currentStep === 'proceedToDelete') {
      const body: ValidatePasswordRequest = {
        oldpassword: password as string,
        tenantid: getStoredUser()?.companyCode as string,
        userid: getStoredUser()?.profiles.userid as string
      };

      await validatePassword?.(body);
      await mutate?.(currentOfficer?.officercode);
      setDeleteStep(null);
      refetch();
      return;
    }

    setDeleteStep(currentStep);
  };

  const ActionMenuProps = ({
    officercode,
    officer
  }: {
    officercode: string;
    officer: IAccountOfficers;
  }): React.ReactElement => {
    return (
      <TableActionMenu
        officer={officer}
        officercode={officercode}
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
        {branches && status && (
          <FilterSection
            branches={branches}
            status={status}
            onSearch={handleSearch}
          />
        )}
        <Box
          sx={{
            position: { mobile: 'relative' },
            bottom: '25px',
            width: '100%'
          }}
        >
          {isLoading || areAccountOfficersDataLoading ? (
            <FormSkeleton noOfLoaders={3} />
          ) : (
            <>
            <MuiTableContainer
              columns={COLUMNS}
              tableConfig={{ hasActions: true }}
              data={accountOfficerData}
              setPage={setPage}
              page={page}
              totalPages={totalPages}
              totalElements={totalElements}
              showHeader={{
                mainTitle: 'Account Officers Overview',
                secondaryTitle: 'See a directory of all account officers on this system.',
                hideFilterSection: true
              }}
            >
              {searchActive ? (
                accountOfficerData?.map(
                  (dataItem: SearchAccountOfficersResponse) => (
                    <StyledTableRow key={dataItem.officercode}>
                      <StyledTableCell component="th" scope="row">
                        {dataItem.officercode}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {dataItem.staffID}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem.officerName}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem.deptName || 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <ActionMenuProps
                          officercode={dataItem.officercode || 'N/A'}
                          officer={dataItem}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  )
                )
              ) : (
                <StyledTableRow>
                  <StyledTableCell
                    colSpan={COLUMNS.length + 1}
                    component="th"
                    scope="row"
                  >
                    {renderEmptyTableBody(accountOfficerData)}
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </MuiTableContainer>
            </>
          )}
        </Box>
        {deleteStep === 'showToast' && (
          <ToastMessage
            title={toastMessageMapper.officerDelete.title}
            body={toastMessageMapper.officerDelete.body}
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
