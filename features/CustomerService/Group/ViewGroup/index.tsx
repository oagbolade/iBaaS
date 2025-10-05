'use client';
import React from 'react';
import { Box, Grid } from '@mui/material';
import {
  accountNumber,
  accountTitle,
  divider,
  mandateContainer,
  mandateImageContainer,
  mandateStyle,
  mandateTitle,
  removeMandate
} from '@/features/CustomerService/Form/style';
import { Details, SubTitle } from '@/features/Administrator/Role/ViewRole';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { AdminContainer } from '@/features/Administrator/AdminContainer';
import { FormSkeleton } from '@/components/Loaders';
import { NoDataAvailable } from '@/components/Alert/Warning/NoDataAvailable';
import { ModalContainerV2 } from '@/components/Revamp/Modal';
import { DeleteActionSteps } from '@/constants/Steps';
import { DeleteConfirmationModal } from '@/features/Administrator/Forms/DeleteConfirmationModal';
import { PrimaryIconButton } from '@/components/Buttons';
import { PageTitle } from '@/components/Typography';
import {
  useGetGroupById,
  useGetGroupMembersbyGroupId,
  useRemoveGroupMembers
} from '@/api/general/useGroup';
import { viewOfficerContainer } from '@/features/Administrator/AccountOfficer/ViewAccountOfficer/styles';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { encryptData } from '@/utils/encryptData';
import { checkMultipleUserRoleAccess } from '@/utils/checkUserRoleAccess';

export const ViewGroup = () => {
  const [shouldDisableAccess, setShouldDisableAccess] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    const shouldDisable = !checkMultipleUserRoleAccess(
      'Groups',
      'MANAGE GROUP MEMBERS'
    );

    setShouldDisableAccess(shouldDisable);
  }, []);
  const [deleteStep, setDeleteStep] = React.useState<DeleteActionSteps>(null);
  const [currentGroupMember, setCurrentGroupMember] = React.useState('');
  const groupId = useGetParams('groupId') || '';
  const { group, isLoading: isGroupLoading } = useGetGroupById(
    encryptData(groupId) as string
  );
  const { groupInfo, isLoading: areMembersLoading } =
    useGetGroupMembersbyGroupId(encryptData(groupId) as string);
  const { mutate, isPending } = useRemoveGroupMembers();

  if (areMembersLoading || isGroupLoading) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={3} />
      </Box>
    );
  }

  const handleDelete = async (
    currentStep: DeleteActionSteps = null,
    id: string | null = null
  ) => {
    if (id) {
      setDeleteStep('isDeleteConfirmation');
      setCurrentGroupMember(id as string);
    }

    if (currentStep === 'isPassword') {
      const submitValues = {
        members: [
          {
            memberCode: currentGroupMember,
            groupCode: groupId
          }
        ]
      };

      await mutate(submitValues);
      setDeleteStep(null);
    }
  };

  const closeModalQuickly = () => {
    setDeleteStep(null);
  };

  return (
    <>
      <TopActionsArea customStyle={{ width: '100%' }} />
      <AdminContainer>
        <Box sx={viewOfficerContainer}>
          <Grid container spacing={2}>
            <Grid item tablet={4}>
              <SubTitle title="Group Code" />
              <Details title={group?.groupID || 'N/A'} />{' '}
            </Grid>
            <Grid item tablet={4}>
              <SubTitle title="Group Name" />
              <Details title={group?.groupName || 'N/A'} />{' '}
            </Grid>
            <Grid item tablet={4}>
              <SubTitle title="Group Member Limit" />
              <Details title={group?.memberLimit?.toString() || 'N/A'} />{' '}
            </Grid>

            <Grid item tablet={4}>
              <SubTitle title="Group Address" />
              <Details title={group?.groupAddress || 'N/A'} />{' '}
            </Grid>
          </Grid>
        </Box>

        <Box
          mb={10}
          sx={{
            ...mandateContainer,
            width: '100%',
            marginLeft: { mobile: '44px', tablet: '0px' }
          }}
        >
          <PageTitle title="Group Members" styles={accountNumber} />
          <Box sx={divider} />
          {groupInfo?.length === 0 && (
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                height: '300px'
              }}
              mb={3}
            >
              <NoDataAvailable
                message="Group has no members"
                width={200}
                height={200}
              />
            </Box>
          )}
          {groupInfo?.map((member) => {
            return (
              <Box sx={{ ...mandateImageContainer, height: '77px' }}>
                <Box sx={{ ...mandateStyle, width: '100%' }}>
                  <Box sx={{ ...mandateTitle, width: '33%' }}>
                    <PageTitle title="Member ID" styles={accountTitle} />
                    <PageTitle
                      title={member?.membercode || 'N/A'}
                      styles={accountNumber}
                    />
                  </Box>
                  <Box sx={{ ...mandateTitle, width: '33%' }}>
                    <PageTitle title="Name" styles={accountTitle} />
                    <PageTitle title={member?.fullname || 'N/A'} />
                  </Box>
                  <Box sx={{ ...mandateTitle, width: '33%' }}>
                    <PrimaryIconButton
                      disabled={shouldDisableAccess}
                      onClick={() => handleDelete(null, member.membercode)}
                      buttonTitle="Delete Member"
                      customStyle={removeMandate}
                      isLoading={
                        isPending && currentGroupMember === member.membercode
                      }
                    />
                  </Box>
                </Box>
                <Box sx={divider} />
              </Box>
            );
          })}

          {deleteStep !== null && deleteStep !== 'showToast' && (
            <ModalContainerV2
              handleClose={handleDelete}
              form={
                <DeleteConfirmationModal
                  modalTitle="Remove Member"
                  modalDescription="Are you sure you want to remove this member?"
                  deleteStep={deleteStep}
                  handleClose={handleDelete}
                  closeModalQuickly={closeModalQuickly}
                />
              }
            />
          )}
        </Box>
      </AdminContainer>
    </>
  );
};
