'use client';
import React from 'react';
import Link from 'next/link';
import { Formik, Form } from 'formik';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { user as userSchema } from '@/constants/schemas';
import { userInitialValues } from '@/constants/types';
import { FormTextInput, FormSelectInput } from '@/components/FormikFields';
import { EditUser } from '@/constants/AdminOptions';
import { CustomerServiceContainer } from '@/features/CustomerService';
import { CustomerAccountType } from './CustomerAccountType';
import {
  IndividualCustomerIcon,
  CorporateCustomerIcon,
} from '@/assets/svg/icons';
import { PrimaryIconButton } from '@/components/Buttons';
import { useCurrentBreakpoint } from '@/utils';
import { ModalActions } from '@/components/Shared/ActionButtons';
import { ModalBackButton } from '@/components/Modal/styles';

const EditFormModal = () => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();

  const onSubmit = (
    values: any,
    actions: { setSubmitting: (arg0: boolean) => void }
  ) => {
    console.log({ values, actions });
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={userInitialValues}
      onSubmit={(values, actions) => onSubmit(values, actions)}
      validationSchema={userSchema}
    >
      <Form>
        <Box ml={{ desktop: 4 }}>
          <Grid container spacing={2}>
            <Grid
              item={isTablet}
              ml={{ mobile: 4, tablet: 0 }}
              container={isMobile}
              mobile={12}
              tablet={6}
              justifyContent="center"
            >
              <FormTextInput
                customStyle={{
                  width: setWidth(),
                }}
                name="customerName"
                placeholder="002789765"
                label="Customer Name"
                required
              />{' '}
            </Grid>
            <Grid
              item={isTablet}
              ml={{ mobile: 4, tablet: 0 }}
              container={isMobile}
              mobile={12}
              tablet={6}
              justifyContent="center"
            >
              <FormTextInput
                customStyle={{
                  width: setWidth(),
                }}
                name="customerID"
                placeholder="002789765"
                label="Customer ID"
                required
              />{' '}
            </Grid>
            <ModalActions
              BackButtonTitle="Back"
              SaveButtonTitle="Save Changes"
              StyleBack={ModalBackButton}
            />
          </Grid>
        </Box>
      </Form>
    </Formik>
  );
};

const CustomerTypeModal = () => {
  return (
    <Box ml={{ desktop: 2, mobile: 3 }}>
      <CustomerAccountType
        title="Individual Customer"
        description="Retail banking is the part of a bank that deals directly with individual, non-business customers."
        icon={<IndividualCustomerIcon />}
        value="individual"
      />
      <CustomerAccountType
        title="Corporate Customer"
        description="Corporate Customer means any body corporate, sole proprietorship, partnership or other legal entity."
        icon={<CorporateCustomerIcon />}
        value="corporate"
      />
      <Stack justifyContent="center" direction="row">
        <Link href="/customer-service/customer-creation/steps">
          <PrimaryIconButton
            buttonTitle="Create Account"
            customStyle={{
              width: '274px',
              height: '56px',
              color: 'white',
              fontSize: '16px',
              fontWeight: 600,
              lineHeight: '24px',
            }}
          />
        </Link>
      </Stack>
    </Box>
  );
};

const SearchFilters = () => {
  return (
    <Box
      sx={{
        marginBottom: '15px',
      }}
    >
      <FormSelectInput
        name="filterCustomers"
        placeholder="filterCustomers"
        options={EditUser.branch}
        customStyle={{
          width: '13%',
        }}
      />
    </Box>
  );
};

const modals = {
  edit: <EditFormModal />,
  customerType: <CustomerTypeModal />,
};

export const CustomerCreation = () => {
  return (
    <CustomerServiceContainer
      isCustomerCreation
      form={modals}
      searchFilters={<SearchFilters />}
      title="Customer Creation"
      modalTitle="Choose Customer Type"
      buttonTitle="Create New Customer"
      tableTitle="View All Customers"
      searchTitle="Search customer list"
    />
  );
};
