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
import { IBranches, IStatus } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import colors from '@/assets/colors';

type Props = {
  onSearch?: Function;
  branches?: IBranches[];
  status?: IStatus[] | Array<any>;
};

export const FilterSection = ({ onSearch, branches, status }: Props) => {
  const { mappedBranches, mappedStatus } = useMapSelectOptions({
    branches,
    status
  });
  const { setWidth } = useCurrentBreakpoint();

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      // If no value input, return null
      branchID: `${values.branchID.trim()}`,
      customerID: `${values.search.trim()}`,
      status: values.status
    };
    onSearch?.(params);
  };

  return (
    <Formik
      initialValues={searchFilterInitialValues}
      onSubmit={(values) => onSubmit(values)}
    >
      <Form>
       
          <Grid container spacing={2}>
            <Grid
            
              item
              mobile={12}
              tablet={2.5}
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
                label="Branch Name"
                required
              />{' '}
            </Grid>
            <Grid
            
              item
              mobile={12}
              tablet={2.5}
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
                required
              />{' '}
            </Grid>
            <Grid
             
              item
              mobile={12}
              tablet={6}
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
              <ActionButton
                type="submit"
                buttonTitle="Search"
                customStyle={{
                  backgroundColor: `${colors.activeBlue400}`,
                  border: `1px solid ${colors.activeBlue400}`,
                  color: `${colors.white}`
                }}
              />
            </Grid>
          </Grid>
    
      </Form>
    </Formik>
  );
};
