import React from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Form, Formik } from 'formik';
import { buttonBackgroundColor } from '../AccountDebit/style';
import { FormSelectField, FormTextInput } from '@/components/FormikFields';
import { ActionButton } from '@/components/Revamp/Buttons';
import { IBranches } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { IProdutSummaryParams } from '@/api/reports/useGetProductSummary';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

type Props = {
  branches?: IBranches[];
  onSearch?: (params: IProdutSummaryParams | null) => void;
};

export const FilterSection = ({ branches, onSearch }: Props) => {
  const { searchParams } =
    usePersistedSearch<IProdutSummaryParams>('product-summary');

  const { mappedBranches } = useMapSelectOptions({
    branches
  });

  const initialValues = {
    branchId: searchParams?.branchId ?? '',
    search: searchParams?.search ?? ''
  };

  const onSubmit = async (values: any) => {
    const params: IProdutSummaryParams = {
      branchId: values.branchId.toString().length > 0 ? values.branchId : null,
      search: values.search.length > 0 ? values.search : undefined
    };

    onSearch?.(params);
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values) => onSubmit(values)}
    >
      {() => (
        <Form>
          <Box>
            <Grid
              container
              spacing={2}
            >
              <Grid
               
                item
                mobile={12}
                tablet={4}
                justifyContent="center"
              >
                <FormSelectField
                  name="branchId"
                  options={mappedBranches}
                  label="Branch ID"
                />{' '}
              </Grid>

              <Grid
              
                item
                mobile={12}
                tablet={7}
                justifyContent="center"
              >
                <FormTextInput
                  icon={<SearchIcon />}
                  name="search"
                  placeholder="Search by product code or name"
                  label="Product Code/Name"
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
          </Box>
        </Form>
      )}
    </Formik>
  );
};
