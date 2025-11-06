import React from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Formik, Form } from 'formik';
import { inputFields } from '../style';
import { FormSelectField, FormTextInput } from '@/components/FormikFields';
import colors from '@/assets/colors';
import { ActionButton } from '@/components/Revamp/Buttons';
import { useCurrentBreakpoint } from '@/utils';
import { IBranches, IProductType } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { ISearchParams } from '@/app/api/search/route';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { statementOfAccountSchema } from '@/schemas/reports';
import { IBankProducts } from '@/api/ResponseTypes/customer-service';
import { IProducts } from '@/api/ResponseTypes/setup';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

type Props = {
  branches?: IBranches[];
  // bankproducts: IBankProducts[];
  onSearch?: Function;
  products: IProducts[] | Array<any>;
};


export const FilterSection = ({
  branches,
  onSearch,
  // bankproducts,
  products
}: Props) => {
  const { searchParams } = usePersistedSearch<ISearchParams>(
    'statement-of-account'
  );
  const { setWidth } = useCurrentBreakpoint();
  const { mappedBranches, mappedProductClass } = useMapSelectOptions({
    branches,
    // bankproducts,
    products
  });

  const initialValues = {
    branchID: searchParams?.branchID ?? '',
    productCode: searchParams?.productCode ?? '',
    accountNumber: searchParams?.accountNumber ?? ''
  };

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      accountNumber: values.accountNumber || values.searchWith,
      ...(values.productCode && { accttype: values.productCode }),
      ...(values.branchID && { branchID: values.branchID })
    };
    onSearch?.(params);
  };

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(values) => onSubmit(values)}
        validationSchema={statementOfAccountSchema}
      >
        <Form>
          <Box
            sx={{
              marginTop: '10px'
            }}
          >
            <Box>
              <Grid container spacing={2}>
                <Grid item mobile={12} tablet={3} justifyContent="center">
                  <FormSelectField
                    name="productCode"
                    options={mappedProductClass}
                    label="Account Type"
                    customStyle={{
                      width: setWidth(),
                      ...inputFields
                    }}
                  />
                </Grid>

                <Grid item mobile={12} tablet={3} justifyContent="center">
                  <FormSelectField
                    customStyle={{
                      width: setWidth(),
                      ...inputFields
                    }}
                    name="branchID"
                    options={mappedBranches}
                    label="Branch ID"
                  />
                </Grid>

                <Grid
                  mb={{ tablet: 6 }}
                  item
                  mobile={12}
                  tablet={4}
                  justifyContent="center"
                  marginTop={3}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(),
                      ...inputFields
                    }}
                    icon={<SearchIcon />}
                    name="accountNumber"
                    placeholder="Search by Account number"
                    label=""
                  />
                </Grid>
                <Grid
                  item
                  mobile={12}
                  tablet={2}
                  sx={{ display: 'flex' }}
                  justifyContent="flex-end"
                  mt={{ tablet: 3.2 }}
                  mr={{ mobile: 30, tablet: 0 }}
                  mb={{ mobile: 6, tablet: 0 }}
                  ml={{ mobile: 0, tablet: 0 }}
                >
                  <ActionButton
                    customStyle={{
                      backgroundColor: `${colors.activeBlue400}`,
                      border: `1px solid ${colors.activeBlue400}`,
                      color: `${colors.white}`,
                      width: '100%'
                    }}
                    type="submit"
                    buttonTitle="Search"
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Form>
      </Formik>
    </Box>
  );
};
