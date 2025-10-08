import React, { ChangeEvent, useState } from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Form, Formik } from 'formik';
import { buttonBackgroundColor } from '../AccountEnquiry/style';
import {
  FormSelectField,
  FormSelectInput,
  FormTextInput,
  TextInput
} from '@/components/FormikFields';
import { ActionButton } from '@/components/Revamp/Buttons';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import { IBranches } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { IEnquiryParams } from '@/api/reports/useGetAccountEnquiryBybranchId';
import { ISearchParams } from '@/app/api/search/route';
import { useCurrentBreakpoint } from '@/utils';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import colors from '@/assets/colors';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';

type Props = {
  branches?: IBranches[];
  onSearch: (params: ISearchParams | null) => void;
};

export const FilterSection = ({ branches, onSearch }: Props) => {
  const { setWidth } = useCurrentBreakpoint();

  const { searchParams } = usePersistedSearch<ISearchParams>('teller-balance');
  const { dateValue, isDateFilterApplied } = React.useContext(
    DateRangePickerContext
  );
  const { mappedBranches } = useMapSelectOptions({
    branches
  });

  const initialValues = {
    branchID: searchParams?.branchID ?? '',
    customerID: searchParams?.customerID ?? '',
    searchWith: searchParams?.searchWith ?? '',
    reportDate: searchParams?.reportDate ?? ''
  };

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      branchID: values.branchID.toString().length > 0 ? values.branchID : null,
      customerID: values.customerID.length > 0 ? values.customerID : null,
      searchWith: values.searchWith ? values.searchWith : null,
      reportDate: dateValue[0]?.format('YYYY-MM-DD') || ''
    };
    onSearch?.(params);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => onSubmit(values)}
    >
      <Form>
        <Form>
          <Box
            sx={{
              marginTop: '20px',
              paddingX: '20px'
            }}
          >
            <Box>
              <Grid container spacing={2}>
                <Grid item mobile={12} tablet={4} justifyContent="center">
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
                  mb={{ tablet: 6 }}
                  item
                  mobile={12}
                  tablet={6}
                  justifyContent="center"
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(),
                      ...inputFields
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
                  tablet={2}
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
      </Form>
    </Formik>
  );
};
