import React from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Formik, Form } from 'formik';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { ActionButton } from '@/components/Revamp/Buttons';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { ISearchParams } from '@/app/api/search/route';
import { IBranches } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { searchFieldsSchema } from '@/schemas/common';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { IProdType } from '@/api/ResponseTypes/setup';

type Props = {
  onSearch?: Function;
  branches?: IBranches[];
  data?: IProdType[];
};

export const FilterSection = ({ onSearch, branches, data }: Props) => {
  const { searchParams } = usePersistedSearch<ISearchParams>('finance-account');
  const { mappedBranches, mappedProductTypeId } = useMapSelectOptions({
    branches,
    data
  });
  const { setWidth } = useCurrentBreakpoint();
  const initialValues = {
    branchID: searchParams?.branchID ?? '',
    accountNumber: searchParams?.accountNumber ?? '',
    search: searchParams?.status ?? '',
    productCode: searchParams?.productCode ?? ''
  };

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      status:
        values.status?.toString().trim().length > 0 ? values.search : null,
      branchID:
        values.branchID.toString().trim().length > 0 ? values.branchID : null,
      accountNumber:
        values.accountNumber.toString().trim().length > 0
          ? values.accountNumber
          : null,
      productCode:
        values.productCode.toString().length > 0 ? values.productCode : null
    };

    onSearch?.(params);
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
              mobile={12}
              tablet={7}
              justifyContent="center"
            >
              <FormTextInput
                customStyle={{
                  width: setWidth(),
                  fontSize: '14px',
                  ...inputFields
                }}
                icon={<SearchIcon />}
                name="accountNumber"
                placeholder="Search Account Number"
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
