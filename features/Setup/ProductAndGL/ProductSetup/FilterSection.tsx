import React from 'react';
import { Box, Typography, Stack, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Form, Formik } from 'formik';
import {
  FormSelectField,
  FormTextInput,
  TextInput
} from '@/components/FormikFields';
import { ActionButton } from '@/components/Revamp/Buttons';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { useCurrentBreakpoint } from '@/utils';
import { IProductType } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { ISearchParams } from '@/app/api/search/route';
import { IProducts } from '@/api/ResponseTypes/setup';

type Props = {
  onSearch?: (params: ISearchParams) => Promise<void>;
  productTypes: IProductType[] | Array<any>;
  products?: IProducts[] | Array<any>;
};
export const FilterSection = ({ productTypes, onSearch, products }: Props) => {
  const { isMobile, setWidth } = useCurrentBreakpoint();
  const { mappedProductType, mappedProductClass } = useMapSelectOptions({
    productTypes,
    products
  });
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
      initialValues={searchFilterInitialValues}
      onSubmit={(values) => onSubmit(values)}
    >
      <Form>
        <Box>
          <Grid container spacing={2}>
            <Grid
              mb={{ tablet: 3 }}
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
                name="productClass"
                options={mappedProductClass}
                label="Product Class"
              />{' '}
            </Grid>
            <Grid
              mb={{ tablet: 6 }}
              item
              mobile={12}
              tablet={9}
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
