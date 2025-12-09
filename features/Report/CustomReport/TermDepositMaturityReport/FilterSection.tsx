import React from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Formik, Form } from 'formik';
import { ActionButton } from '@/components/Revamp/Buttons';
import { useCurrentBreakpoint } from '@/utils';
import { FormTextInput } from '@/components/FormikFields';
import { FormSelectField } from '@/components/FormikFields/FormSelectField';
import { searchFieldsSchema } from '@/schemas/common';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import { ISearchParams } from '@/app/api/search/route';
import { IBranches } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import colors from '@/assets/colors';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

type Props = {
  onSearch?: Function;
  branches?: IBranches[];
};

export const FilterSection = ({ onSearch, branches }: Props) => {
  const { searchParams } = usePersistedSearch<ISearchParams>(
    'team-deposit-maturity'
  );
  const { mappedBranches } = useMapSelectOptions({
    branches
  });
  const { setWidth } = useCurrentBreakpoint();

  const initialValues = {
    branchID: searchParams?.branchID ?? '',
    search: searchParams?.fullName ?? ''
  };

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      branchID: values.branchID.toString().length > 0 ? values.branchID : null,
      fullName: values.search.trim().length > 0 ? values.search : null
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
              tablet={3}
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
              tablet={8}
              justifyContent="center"
            >
              <FormTextInput
                customStyle={{
                  width: setWidth('100%'),
                  fontSize: '14px',
                  ...inputFields
                }}
                icon={<SearchIcon />}
                name="search"
                placeholder="Search Account Name"
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
              <ActionButton
                customStyle={{
                  backgroundColor: `${colors.activeBlue400}`,
                  color: `${colors.white}`
                }}
                type="submit"
                buttonTitle="Search"
              />
            </Grid>
          </Grid>
        </Box>
      </Form>
    </Formik>
  );
};
