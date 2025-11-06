import React from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Form, Formik } from 'formik';
import { ActionButton } from '@/components/Revamp/Buttons';
import { FormSelectField, FormTextInput } from '@/components/FormikFields';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import { IBranches } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { ISearchParams } from '@/app/api/search/route';
import { useCurrentBreakpoint } from '@/utils';
import colors from '@/assets/colors';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

type Props = {
  branches?: IBranches[];
  onSearch?: (params: ISearchParams) => Promise<void>;
};

export const FilterSection = ({ branches, onSearch }: Props) => {
  const { setWidth } = useCurrentBreakpoint();
  const { searchParams } = usePersistedSearch<ISearchParams>('teller-balance');
  const { dateValue } = React.useContext(DateRangePickerContext);
  const { mappedBranches } = useMapSelectOptions({
    branches
  });

  const initialValues = {
    branchCode: searchParams?.branchCode ?? '',
    searchWith: searchParams?.searchWith ?? '',
    startOfDate: searchParams?.startDate ?? '',
    endOfDate: searchParams?.endDate ?? ''
  };

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    const params: ISearchParams = {
      branchCode:
        values.branchCode.toString().length > 0 ? values.branchCode : null,
      searchWith: values.searchWith ? values.searchWith : null,
      startDate: dateValue[0]?.format('YYYY-MM-DD') || '',
      endDate: dateValue[1]?.format('YYYY-MM-DD') || ''
    };
    await onSearch?.(params);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize // Ensures form updates when searchParams change
    >
      {({ handleSubmit }) => (
        <Form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent default form submission
            handleSubmit();
          }}
        >
          <Box sx={{ marginTop: '20px', paddingX: '20px' }}>
            <Grid container spacing={2}>
              <Grid item mobile={12} tablet={4} justifyContent="center">
                <FormSelectField
                  customStyle={{ width: setWidth(), ...inputFields }}
                  name="branchCode"
                  options={mappedBranches}
                  label="Branch Name"
                />
              </Grid>
              <Grid
                mb={{ tablet: 6 }}
                item
                mobile={12}
                tablet={6}
                justifyContent="center"
              >
                <FormTextInput
                  customStyle={{ width: setWidth(), ...inputFields }}
                  icon={<SearchIcon />}
                  name="searchWith"
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
        </Form>
      )}
    </Formik>
  );
};
