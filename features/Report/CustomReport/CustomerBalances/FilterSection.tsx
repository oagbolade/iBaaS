import React, { useMemo, useCallback } from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { exportData, dateFilter, inputFields } from '../style';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import colors from '@/assets/colors';
import {
  ActionButtonWithPopper,
  ActionButton,
  BackButton
} from '@/components/Revamp/Buttons';
import { ExportIcon } from '@/assets/svg';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { useCurrentBreakpoint } from '@/utils';
import { IBranches } from '@/api/ResponseTypes/general';
import { ISearchParams } from '@/app/api/search/route';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { customerBalanceSchema } from '@/schemas/reports';
import { IBankProducts } from '@/api/ResponseTypes/customer-service';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { useGetProductType } from '@/api/general/useProductType';
import { log } from 'console';

type Props = {
  branches?: IBranches[];
  bankproducts: IBankProducts[] | Array<any>;
  onSearch?: Function;
};

export const FilterSection = ({ branches, bankproducts, onSearch }: Props) => {
  const { searchParams } =
    usePersistedSearch<ISearchParams>('customer-balances');
  const { setDirection } = useSetDirection();
  const { setWidth } = useCurrentBreakpoint();
  const { mappedBranches, mappedBankproducts } = useMapSelectOptions({
    branches,
    bankproducts
  });

  const { productTypes } = useGetProductType();

  // memoize mapped product types to avoid recreating options each render
  const mappedProductTypes = useMemo(
    () =>
      (productTypes || []).map((product) => ({
        name: product.producttypedesc,
        value: product.producttypeid?.toString() ?? ''
      })),
    [productTypes]
  );

  const initialValues = useMemo(
    () => ({
      branchID: searchParams?.branchID ?? '',
      pCode: searchParams?.pCode ?? '',
      searchWith: searchParams?.searchWith ?? ''
    }),
    [searchParams]
  );

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      branchID:
        values.branchID?.toString().trim().length > 0 ? values.branchID : null,
      searchWith:
        values.searchWith?.toString().trim().length > 0
          ? values.searchWith
          : null,
      pCode: values.pCode?.toString().trim().length > 0 ? values.pCode : null,
      pageSize: '10'
    };
    onSearch?.(params);
  };

  // stable submit handler for Formik
  const handleSubmit = useCallback(
    (values: any) => {
      onSubmit(values);
    },
    [onSearch]
  );

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
        validationSchema={customerBalanceSchema}
      >
        <Form>
          <Box
            sx={{
              marginTop: '20px',
              paddingX: '20px'
            }}
          >
            <Box>
              <Grid container spacing={2}>
                <Grid item mobile={12} tablet={3} justifyContent="center">
                  <FormSelectField
                    customStyle={{
                      width: setWidth(),
                      ...inputFields
                    }}
                    name="branchID"
                    options={mappedBranches}
                    label="Branch Name"
                  />{' '}
                </Grid>
                <Grid
                  mb={{ tablet: 3 }}
                  item
                  mobile={12}
                  tablet={4}
                  justifyContent="center"
                >
                  <FormSelectField
                    customStyle={{
                      width: setWidth(),
                      ...inputFields
                    }}
                    name="pCode"
                    options={mappedProductTypes}
                    label="Product Type"
                  />{' '}
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
                    name="searchWith"
                    placeholder="Search by Account number or Account title"
                    label=""
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
                    customStyle={{
                      backgroundColor: `${colors.activeBlue400}`,
                      border: `1px solid ${colors.activeBlue400}`,
                      color: `${colors.white}`
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

FilterSection.displayName = 'FilterSection';
