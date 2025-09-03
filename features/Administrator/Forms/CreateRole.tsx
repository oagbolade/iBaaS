/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { AlertColor, Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import styled from 'styled-components';
import { PrivilegeSection } from '../Role/CreateRole/PrivilegeSection';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { FormSelectInput, FormTextInput } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import {
  useGetRoles,
  useCreateRole,
  useGetRoleByID
} from '@/api/admin/useRole';
import { roleInitialValues } from '@/schemas/schema-values/admin';
import { TimeOptions } from '@/constants/Administrator/selectOptions';
import { getStoredUser } from '@/utils/user-storage';
import { MenuIDList } from '@/utils/getCheckedMenus';
import { FormSkeleton } from '@/components/Loaders';
import { toast } from '@/utils/toast';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { encryptData } from '@/utils/encryptData';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { IPermissionValues } from '@/constants/types';
import { role as roleSchema } from '@/schemas/admin';
import { useGetSystemDate } from '@/api/general/useSystemDate';

type Props = {
  permissionValues: IPermissionValues;
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  showPermission?: boolean;
};

const HideDropdownIcon = styled.div`
  .MuiSvgIcon-root {
    display: none;
  }
`;

export const CreateRole = ({
  isSubmitting,
  setIsSubmitting,
  showPermission,
  permissionValues
}: Props) => {
  const roleid = useGetParams('roleid') || '';
  const toastActions = React.useContext(ToastMessageContext);
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const [authPriviledgeList, setAuthPriviledgeCheckList] =
    React.useState<MenuIDList>([]);
  const [dataCaptureList, setDataCaptureCheckList] = React.useState<MenuIDList>(
    []
  );
  const { mutate } = useCreateRole(
    Boolean(isEditing),
    encryptData(roleid as string)
  );
  const { role, isLoading } = useGetRoleByID(encryptData(roleid));
  const { roles, isLoading: areRolesLoading } = useGetRoles();
  const { sysmodel } = useGetSystemDate();

  const onSubmit = async (values: any) => {
    const canauth = permissionValues?.canauth ? 1 : 0;
    const isoperation = permissionValues?.isoperation ? 1 : 0;

    const toastMessage = {
      title: 'Role not assigned priviledges',
      severity: 'error',
      capturePriviledgesValue: {
        message: 'Please check your authorization or data capture priviledges'
      }
    };

    if (
      !isEditing &&
      dataCaptureList.length === 0 &&
      Boolean(canauth) &&
      authPriviledgeList.length === 0
    ) {
      toast(
        toastMessage.capturePriviledgesValue.message,
        toastMessage.title,
        toastMessage.severity as AlertColor,
        toastActions
      );

      return;
    }

    await mutate({
      ...values,
      canauth,
      isoperation,
      userid: getStoredUser()?.profiles.userid,
      authid: sysmodel?.approvingOfficer,
      rolemenu: dataCaptureList,
      authmenu: authPriviledgeList
    });
  };

  useEffect(() => {
    const submit = document.getElementById('submitButton');
    if (isSubmitting) {
      submit?.click();
    }

    return () => {
      setIsSubmitting(false);
    };
  }, [isSubmitting]);

  if (isEditing && (isLoading || areRolesLoading)) {
    return <FormSkeleton noOfLoaders={5} />;
  }

  return (
    <Box>
      <Box>
        <LargeTitle title={`${isEditing ? 'Edit Role' : 'Create New Role'}`} />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' }
        }}
      >
        <Formik
          initialValues={
            isEditing
              ? { ...role, tellerflg: role?.tellerflg ?? 0 }
              : roleInitialValues
          }
          onSubmit={(values) => onSubmit(values)}
          validationSchema={roleSchema}
        >
          <Form>
            <Box mt={4}>
              <Grid container>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                  width={{ mobile: '100%', tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="role_name"
                    placeholder="Enter Role Name"
                    label="Role Name"
                  />{' '}
                </Grid>

                <Box sx={{ width: '50%' }}>
                  <Grid p={{ mobile: 2, desktop: 0 }} spacing={2} container>
                    <Grid item={isTablet} mobile={9} tablet={9}>
                      <FormTextInput
                        customStyle={{
                          width: setWidth(isMobile ? '140px' : '100%')
                        }}
                        name="userTimeOut"
                        placeholder="Enter Idle Time Out"
                        label="Idle Time Out"
                      />{' '}
                    </Grid>
                    <Grid mt={3} item={isTablet} tablet={3} mobile={3}>
                      <HideDropdownIcon>
                        <FormSelectInput
                          customStyle={{
                            width: setWidth(isMobile ? '113px' : '200px'),
                            fontSize: '14px',
                            ...inputFields,
                            height: '56px',
                            marginLeft: `${isMobile ? '80px' : '0'}`
                          }}
                          name="minutes"
                          options={TimeOptions.roles}
                          placeholder="Minutes"
                          value="minutes"
                          disabled
                        />{' '}
                      </HideDropdownIcon>
                    </Grid>
                  </Grid>

                  <Grid p={{ mobile: 2, desktop: 0 }} spacing={2} container>
                    <Grid item={isTablet} mobile={9} tablet={9}>
                      <FormTextInput
                        customStyle={{
                          width: setWidth(isMobile ? '140px' : '100%')
                        }}
                        name="access_days"
                        placeholder="EnterAccess Days"
                        label="Access Days"
                      />{' '}
                    </Grid>
                    <Grid mt={3} item={isTablet} tablet={3} mobile={3}>
                      <HideDropdownIcon>
                        <FormSelectInput
                          customStyle={{
                            width: setWidth(isMobile ? '113px' : '200px'),
                            fontSize: '14px',
                            ...inputFields,
                            height: '56px',
                            marginLeft: `${isMobile ? '80px' : '0'}`
                          }}
                          name="days"
                          options={TimeOptions.roles}
                          value="days"
                          placeholder="Days"
                          disabled
                        />{' '}
                      </HideDropdownIcon>
                    </Grid>
                  </Grid>
                </Box>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="roleLevel"
                    placeholder="Enter Role Level"
                    label="Role Level"
                  />{' '}
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="roledesc"
                    placeholder="Role Description"
                    label="Role Description"
                  />{' '}
                </Grid>
              </Grid>
            </Box>
            <button id="submitButton" type="submit" style={{ display: 'none' }}>
              submit alias
            </button>
          </Form>
        </Formik>
        <PrivilegeSection
          setSumbissionCheckList={setDataCaptureCheckList}
          title="Data Capture Privileges"
          roles={roles}
        />
        {showPermission && (
          <PrivilegeSection
            setSumbissionCheckList={setAuthPriviledgeCheckList}
            authPriviledge
            title="Authorisation Privileges"
            roles={roles}
          />
        )}
      </Box>
    </Box>
  );
};
