import React, { ChangeEvent, useState } from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { buttonBackgroundColor } from '../AccountEnquiry/style';
import {
  FormSelectField,
  FormSelectInput,
  FormTextInput,
  TextInput,
} from '@/components/FormikFields';
import { ActionButton } from '@/components/Revamp/Buttons';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import { IBranches } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { IEnquiryParams } from '@/api/reports/useGetAccountEnquiryBybranchId';
import { ISearchParams } from '@/app/api/search/route';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { Form, Formik } from 'formik';

type Props = {
  branches?: IBranches[];
  onSearch: (params: ISearchParams | null) => void;
};

export const FilterSection = ({ branches, onSearch }: Props) => {
  const { searchParams } = usePersistedSearch<ISearchParams>('teller-balance');

  const { mappedBranches } = useMapSelectOptions({
    branches,
  });

  const initialValues = {
    branchID: searchParams?.branchID ?? '',
    customerID: searchParams?.customerID ?? '',
  };

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      branchID: values.branchID.toString().length > 0 ? values.branchID : null,
      customerID: values.customerID.length > 0 ? values.customerID : undefined,
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
            <Box sx={{ height: '120px', marginTop: '20px' }}>
              <Grid
                sx={{ padding: '15px 30px', display: 'flex', gap: '35px' }}
              >
                <Grid
                  mb={{ tablet: 3 }}
                  item
                  mobile={12}
                  tablet={5}
                  justifyContent="center"
                >
                  <FormSelectField
                    customStyle={{
                      width: '400px',
                      fontSize: '14px',
                      ...inputFields,
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
                  tablet={6}
                  justifyContent="center"
                >
                  <FormTextInput
                    customStyle={{
                      width: '500px',
                      fontSize: '14px',
                      ...inputFields,
                    }}
                    icon={<SearchIcon />}
                    name="search"
                    placeholder="Search a customer by Till Name or Till Number"
                    label="Till Name/Number"
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
          </Box>
        </Form>
      )}
    </Formik>
  );
};
