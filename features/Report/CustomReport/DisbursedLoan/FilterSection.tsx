import React from 'react';
import { Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Form, Formik } from 'formik';
import { buttonBackgroundColor } from '../AccountEnquiry/style';
import {
  FormSelectField,
  FormTextInput,
} from '@/components/FormikFields';
import { ActionButton } from '@/components/Revamp/Buttons';
import { IBranches } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { LoanOverdueParams } from '@/api/reports/useGetLoanOverdueReport';
import { IBankProducts } from '@/api/ResponseTypes/customer-service';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { ISearchParams } from '@/app/api/search/route';

type Props = {
  branches?: IBranches[];
  onSearch: (params: LoanOverdueParams | null) => void;
  bankproducts: IBankProducts[] | Array<any>;
};

export const FilterSection = ({ branches, onSearch, bankproducts }: Props) => {
  const { searchParams } =
    usePersistedSearch<LoanOverdueParams>('disbursed-loan');

  const { mappedBranches, mappedBankproducts } = useMapSelectOptions({
    branches,
    bankproducts,
  });

  const initialValues = {
    branchcode: searchParams?.branchcode ?? '',
    productcode: searchParams?.productcode ?? '',
    search: searchParams?.search ?? '',
  };

  const onSubmit = async (values: any) => {
    const params: LoanOverdueParams = {
      productcode:
        values.productcode.toString().length > 0 ? values.productcode : null,
      branchcode:
        values.branchcode.toString().length > 0 ? values.branchcode : null,
      search: values.search.length > 0 ? values.search : null,
    };
    onSearch(params);
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values) => onSubmit(values)}
    >
      {() => (
        <Form>
          <Grid
            sx={{ padding: '5px 5px', display: 'flex', gap: '35px' }}
            spacing={2}
          >
            <Grid
              mb={{ tablet: 3 }}
              item
              mobile={12}
              tablet={3}
              sx={{ display: 'flex', alignItems: 'center', gap: 5 }}
            >
              <FormSelectField
                name="branchcode"
                options={mappedBranches}
                label="Branch ID"
                required
              />{' '}
              <FormSelectField
                name="productcode"
                options={mappedBankproducts}
                label="Product"
              />{' '}
            </Grid>
            <Grid
              mb={{ tablet: 2 }}
              item
              mobile={12}
              tablet={2}
              justifyContent="center"
            >
              <FormTextInput
                icon={<SearchIcon />}
                name="search"
                placeholder="Search for Account Number"
                label="Search for Account Number"
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
              <ActionButton
                type="submit"
                customStyle={buttonBackgroundColor}
                buttonTitle="Search"
              />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
