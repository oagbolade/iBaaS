import React from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Formik, Form } from 'formik';
import { ActionButton } from '@/components/Revamp/Buttons';
import { useCurrentBreakpoint } from '@/utils';
import { IBranches, IProductType, IStatus } from '@/api/ResponseTypes/general';
import { ISearchParams } from '@/app/api/search/route';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { FormSelectField, FormTextInput } from '@/components/FormikFields';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { searchFieldsSchema } from '@/schemas/common';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { IProdType } from '@/api/ResponseTypes/setup';

type Props = {
  onSearch: Function;
  branches: IBranches[];
  status: IStatus[];
  productTypes: IProductType[] | Array<any>;
  data: IProdType[];
};

export const AccountFilterSection = ({
  onSearch,
  branches,
  status,
  productTypes,
  data
}: Props) => {

  const {
    mappedBranches,
    mappedStatus,
    mappedProductClass,
    mappedProductTypeId
  } = useMapSelectOptions({
    branches,
    status,
    productTypes,
    data
  });

  const { setWidth } = useCurrentBreakpoint();

  const { searchParams } =
    usePersistedSearch<ISearchParams>('account-overview');

  const initialValues = {
    branchID: searchParams?.branchID ?? '',
    status: searchParams?.status ?? '',
    accountType: searchParams?.accountType ?? '',
    search: searchParams?.accountNumber ?? '',
    productCode: searchParams?.productCode ?? ''
  };

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      status: values.status.toString().length > 0 ? values.status : null,
      branchID: values.branchID.toString().length > 0 ? values.branchID : null,
      accountNumber: values.search.toString().length > 0 ? values.search : null,
      productCode:
        values.productCode.toString().length > 0 ? values.productCode : null
    };

    onSearch(params);
  };
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values) => onSubmit(values)}
      validationSchema={searchFieldsSchema}
    >
      <Form>
        <Box sx={{ height: '120px' }}>
          <Grid container spacing={2}>
            <Grid
              mb={{ tablet: 6 }}
              item
              mobile={12}
              tablet={2}
              justifyContent="center"
            >
              <FormSelectField
                customStyle={{
                  width: setWidth(),
                  fontSize: '14px',
                  ...inputFields
                }}
                name="branchID"
                options={mappedBranches}
                label="Branch ID"
              />{' '}
            </Grid>
            <Grid
              mb={{ tablet: 6 }}
              item
              mobile={12}
              tablet={2}
              justifyContent="center"
            >
              <FormSelectField
                customStyle={{
                  width: setWidth(),
                  fontSize: '14px',
                  ...inputFields
                }}
                name="status"
                options={mappedStatus}
                label="Status"
              />{' '}
            </Grid>
            <Grid
              mb={{ tablet: 6 }}
              item
              mobile={12}
              tablet={2}
              justifyContent="center"
            >
              <FormSelectField
                customStyle={{
                  width: setWidth(),
                  fontSize: '14px',
                  ...inputFields
                }}
                name="productCode"
                options={[
                  {
                    value: '1',
                    name: 'CURRENT'
                  },
                  {
                    value: '9',
                    name: 'GL TRANSACTIONS'
                  },
                  {
                    value: '3',
                    name: 'LOAN'
                  },
                  {
                    value: '2',
                    name: 'SAVINGS'
                  },
                  {
                    value: '5',
                    name: 'TREASURY ASSETS'
                  },
                  {
                    value: '4',
                    name: 'TREASURY LIABILITIES'
                  }
                ]}
                label="Account Type"
              />{' '}
            </Grid>
            <Grid
              mb={{ tablet: 4 }}
              item
              mobile={8}
              tablet={4}
              justifyContent="center"
            >
              <FormTextInput
                customStyle={{
                  width: setWidth(),
                  fontSize: '14px',
                  ...inputFields
                }}
                icon={<SearchIcon />}
                name="search"
                placeholder="Search by account number"
                label="Search"
              />{' '}
            </Grid>
            <Grid
              item
              mobile={12}
              tablet={1}
              sx={{ display: 'flex' }}
              justifyContent="flex-end"
              mt={{ tablet: 3.2 }}
              mr={{ mobile: 30, tablet: 0 }}
              mb={{ mobile: 6, tablet: 0 }}
            >
              <ActionButton type="submit" buttonTitle="Search" />
            </Grid>
          </Grid>
        </Box>
      </Form>
    </Formik>
  );
};
