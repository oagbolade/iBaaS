import React from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import { PrivilegeSection } from '../Role/CreateRole/PrivilegeSection';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { FormSelectInput, FormTextInput } from '@/components/FormikFields';
import { user as userSchema } from '@/constants/schemas';
import { userInitialValues } from '@/constants/types';
import { useCurrentBreakpoint } from '@/utils';
import { Loan } from '@/constants/Loan/selectOptions';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';

export const CreateRole = () => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();

  const onSubmit = (values: any, actions: { setSubmitting: Function }) => {
    actions.setSubmitting(false);
  };

  return (
    <Box>
      <Box>
        <LargeTitle title="Create New Role" />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' },
        }}
      >
        <Formik
          initialValues={userInitialValues}
          onSubmit={(values, actions) => onSubmit(values, actions)}
          validationSchema={userSchema}
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
                      width: setWidth(isMobile ? '285px' : '100%'),
                    }}
                    name="roleName"
                    placeholder="Enter Role Name"
                    label="Role Name"
                  />{' '}
                </Grid>

                <Grid p={{ mobile: 2, desktop: 0 }} spacing={2} container>
                  <Grid item={isTablet} mobile={9} tablet={9}>
                    <FormTextInput
                      customStyle={{
                        width: setWidth(isMobile ? '140px' : '100%'),
                      }}
                      name="idleTimeOut"
                      placeholder="Enter Idle Time Out"
                      label="Idle Time Out"
                    />{' '}
                  </Grid>
                  <Grid mt={3} item={isTablet} tablet={3} mobile={3}>
                    <FormSelectInput
                      customStyle={{
                        width: setWidth(isMobile ? '113px' : '100%'),
                        fontSize: '14px',
                        ...inputFields,
                        height: '56px',
                        marginLeft: `${isMobile ? '80px' : '0'}`,
                      }}
                      name="customerType"
                      options={Loan.status}
                      placeholder="Seconds"
                    />{' '}
                  </Grid>
                </Grid>

                <Grid p={{ mobile: 2, desktop: 0 }} spacing={2} container>
                  <Grid item={isTablet} mobile={9} tablet={9}>
                    <FormTextInput
                      customStyle={{
                        width: setWidth(isMobile ? '140px' : '100%'),
                      }}
                      name="accessDays"
                      placeholder="EnterAccess Days"
                      label="Access Days"
                    />{' '}
                  </Grid>
                  <Grid mt={3} item={isTablet} tablet={3} mobile={3}>
                    <FormSelectInput
                      customStyle={{
                        width: setWidth(isMobile ? '113px' : '100%'),
                        fontSize: '14px',
                        ...inputFields,
                        height: '56px',
                        marginLeft: `${isMobile ? '80px' : '0'}`,
                      }}
                      name="customerType"
                      options={Loan.status}
                      placeholder="Seconds"
                    />{' '}
                  </Grid>
                </Grid>

                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%'),
                    }}
                    name="email"
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
                      width: setWidth(isMobile ? '285px' : '100%'),
                    }}
                    name="roleDescription"
                    placeholder="Role Description"
                    label="Role Description"
                  />{' '}
                </Grid>
              </Grid>
            </Box>
          </Form>
        </Formik>
        <PrivilegeSection title="Data Capture Privileges" />
        <PrivilegeSection title="Authorisation Privileges" />
      </Box>
    </Box>
  );
};
