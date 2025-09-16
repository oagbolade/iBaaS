import React from 'react';
import { Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Form, Formik } from 'formik';
import { FormSelectField, FormTextInput } from '@/components/FormikFields';
import { ActionButton } from '@/components/Revamp/Buttons';
import { useCurrentBreakpoint } from '@/utils';
import { IProductType } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import { ISearchParams } from '@/app/api/search/route';
import { IProducts } from '@/api/ResponseTypes/setup';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

type Props = {
  onSearch?: (params: ISearchParams) => Promise<void>;
  productTypes: IProductType[] | Array<any>;
  products?: IProducts[] | Array<any>;
};
export const FilterSection = ({ productTypes, onSearch, products }: Props) => {
  const { searchParams } = usePersistedSearch<ISearchParams>('product-setup');
  const { setWidth } = useCurrentBreakpoint();
  const { mappedProductClass } = useMapSelectOptions({
    productTypes,
    products
  });

  const initialValues = {
    productClass: searchParams?.productClass ?? '',
    productName: searchParams?.productName ?? '',
    productCode: searchParams?.productCode ?? ''
  };

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      productClass:
        values.productClass?.toString().length > 0 ? values.productClass : null,
      productName:
        values.productName?.toString().length > 0 ? values.productName : null,
      productCode:
        values.productCode?.toString().length > 0 ? values.productCode : null
    };

    onSearch?.(params);
  };
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values) => onSubmit(values)}
    >
      <Form>
        <Grid container spacing={2}>
          <Grid
            
            item
            mobile={12}
            tablet={4}
            justifyContent="center"
          >
            <FormSelectField
              customStyle={{
                width: setWidth(),
                fontSize: '14px',
                ...inputFields
              }}
              name="productClass"
              options={mappedProductClass}
              label="Product Class"
            />{' '}
          </Grid>
          <Grid
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
              name="productName"
              placeholder="Search by Product name"
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
            
          >
            <ActionButton type="submit" buttonTitle="Search" />
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};
