import React from 'react';
import { useSearchParams } from 'next/navigation';
import { AlertColor, Box, Grid } from '@mui/material';
import { Formik, Form, useFormikContext } from 'formik';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { throttle } from 'lodash';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { FormSelectField, FormTextInput } from '@/components/FormikFields';
import { createUser as createUserSchema } from '@/schemas/admin';
import { useCurrentBreakpoint } from '@/utils';
import {
  CreateUserFormValues,
  createUserInitialValues
} from '@/schemas/schema-values/admin';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import {
  IBranches,
  IDepartments,
  IRoles,
  IStatus
} from '@/api/ResponseTypes/general';
import {
  useCreateUser,
  getSupervisorByID,
  useGetUserByID
} from '@/api/admin/useAdminUsers';
import { FormSkeleton } from '@/components/Loaders';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { OptionsI } from '@/components/FormikFields/FormSelectField';
import { getStoredUser } from '@/utils/user-storage';
import { toast } from '@/utils/toast';
import { encryptData } from '@/utils/encryptData';

type Props = {
  unitTestInitialValues?: any;
  isSubmitting: boolean;
  userid?: string;
  branches: IBranches[] | Array<any>;
  departments: IDepartments[] | Array<any>;
  roles: IRoles[] | Array<any>;
  status: IStatus[] | Array<any>;
  setIsSubmitting: (submit: boolean) => void;
};

interface MyFormValues {
  branchcode: string;
  deptcode: string;
}

const TrackBranchAndDepartmentFields = ({
  setSupervisors
}: {
  setSupervisors: Function | undefined;
}) => {
  const toastActions = React.useContext(ToastMessageContext);
  const { values } = useFormikContext<MyFormValues>();

  React.useEffect(() => {
    const { branchcode, deptcode } = values as {
      branchcode: string;
      deptcode: string;
    };

    const delay = 1200000; // 20mins
    if (
      branchcode?.toString().trim().length > 0 &&
      deptcode?.toString().trim().length > 0 &&
      branchcode !== 'unittestbranch'
    ) {
      const throttleFunction = throttle(
        () => {
          getSupervisorByID(toastActions, branchcode, deptcode).then((data) => {
            const mappedSupervisors: OptionsI[] | undefined =
              data.supervisors?.map((supervisor) => ({
                name: supervisor.fullname,
                value: supervisor.userid
              }));

            setSupervisors?.(mappedSupervisors);
          });
        },
        delay,
        { trailing: false }
      );

      throttleFunction();
    }
  }, [values.branchcode, values.deptcode]);

  return null;
};

export const CreateUserForm = ({
  isSubmitting,
  branches,
  roles,
  status,
  departments,
  setIsSubmitting,
  userid,
  unitTestInitialValues
}: Props) => {
  const toastActions = React.useContext(ToastMessageContext);
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const [showPassword, setShowPassword] = React.useState(false);
  const [getSupervisors, setSupervisors] = React.useState<
    Array<{ name: string; value: string }> | undefined
  >([]);
  const { mappedBranches, mappedDepartments, mappedStatus, mappedRole } =
    useMapSelectOptions({
      branches,
      departments,
      status,
      roles
    });

  const { mutate } = useCreateUser(Boolean(isEditing));
  const { userDetails, isLoading } = useGetUserByID(
    encryptData(userid as string)
  );

  const onSubmit = async (values: CreateUserFormValues) => {
    if (!isEditing && values.password.trim().length === 0) {
      const message = {
        message: 'Password field is required',
        title: 'Validation Error',
        severity: 'error'
      };
      toast(
        message.message,
        message.title,
        message.severity as AlertColor,
        toastActions
      );

      return false;
    }

    const permissionOptions = document.getElementsByClassName(
      'permissionOptions'
    ) as HTMLCollectionOf<HTMLInputElement>;

    const authtype = Number(permissionOptions[0]?.value) || 0;
    const statement = Number(permissionOptions[1]?.value) || 0;
    const globalAuth = Number(permissionOptions[2]?.value) || 0;

    await mutate({
      ...values,
      authtype,
      statement,
      globalAuth
    });
  };

  const handleClickShowPassword = () => {
    return setShowPassword((show) => {
      return !show;
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  React.useEffect(() => {
    const submit = document.getElementById('submitButton');

    if (isSubmitting) {
      submit?.click();
    }

    return () => {
      setIsSubmitting(false);
    };
  }, [isSubmitting]);

  if (isEditing && isLoading) {
    return <FormSkeleton noOfLoaders={5} />;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <LargeTitle title={`${isEditing ? 'Edit' : 'Create'} New User`} />
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
              ? {
                ...userDetails,
                status: userDetails?.status,
                role_id: userDetails?.role_id?.toString(),
                authListID: null,
                authid: getStoredUser()?.profiles.userid,
                menuid: 1,
                branchcode: userDetails?.branchcode?.trim()
              }
              : unitTestInitialValues || createUserInitialValues
          }
          onSubmit={(values: any) => onSubmit(values)}
          validationSchema={createUserSchema}
        >
          <Form>
            <TrackBranchAndDepartmentFields setSupervisors={setSupervisors} />
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
                    name="userid"
                    autoComplete="new-userid"
                    placeholder="202210107481"
                    label="Staff / Login ID"
                    required
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
                    name="fullname"
                    placeholder="Omodayo Oluwafunke"
                    label="Staff Name"
                    required
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
                    name="email"
                    placeholder="Omodayo_Oluwafunke@testcompany.com"
                    label="Email Address"
                    required
                  />{' '}
                </Grid>
                <Grid mb={1} item={isTablet} mobile={12}>
                  <FormSelectField
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%'),
                      fontSize: '14px'
                    }}
                    name="branchcode"
                    options={mappedBranches}
                    label="Branch"
                    required
                  />{' '}
                </Grid>
                <Grid mb={1} item={isTablet} mobile={12}>
                  <FormSelectField
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%'),
                      fontSize: '14px'
                    }}
                    name="deptcode"
                    options={mappedDepartments}
                    label="Department"
                    required
                  />{' '}
                </Grid>
                <Grid mb={1} item={isTablet} mobile={12}>
                  <FormSelectField
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%'),
                      fontSize: '14px'
                    }}
                    name="role_id"
                    options={mappedRole}
                    label="Role"
                    required
                  />{' '}
                </Grid>
                <Grid mb={1} item={isTablet} mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="phoneno"
                    label="Phone Number"
                    placeholder="090587483822"
                    required
                  />{' '}
                </Grid>
                <Grid mb={1} item={isTablet} mobile={12}>
                  <FormSelectField
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%'),
                      fontSize: '14px'
                    }}
                    name="reportlevel"
                    disabled={getSupervisors?.length === 0}
                    options={getSupervisors as OptionsI[]}
                    label="Reporting to?"
                  />{' '}
                </Grid>
                <Grid mb={1} item={isTablet} mobile={12}>
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%')
                    }}
                    name="acctno"
                    label="Till Account Number (Optional)"
                    placeholder="010777030922"
                  />{' '}
                </Grid>
                <Grid mb={1} item={isTablet} mobile={12}>
                  <FormSelectField
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%'),
                      fontSize: '14px'
                    }}
                    name="status"
                    options={mappedStatus}
                    label="Staff Status"
                    required
                  />{' '}
                </Grid>
                {!isEditing && (
                  <Grid item={isTablet} mobile={12}>
                    <FormTextInput
                      type={showPassword ? 'text' : 'password'}
                      customStyle={{
                        width: setWidth(isMobile ? '300px' : '100%')
                      }}
                      name="password"
                      autoComplete="new-password"
                      placeholder="Enter password"
                      label="Enter Password"
                      endAdornment={
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      }
                      required
                    />{' '}
                  </Grid>
                )}
              </Grid>
            </Box>
            <button
              data-testid="button"
              id="submitButton"
              type="submit"
              style={{ display: 'none' }}
            >
              submit alias
            </button>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};
