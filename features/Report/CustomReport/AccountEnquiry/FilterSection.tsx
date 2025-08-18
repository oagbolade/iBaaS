import React from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Formik, Form } from 'formik';
import { FormSelectField, FormTextInput } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { ActionButton } from '@/components/Revamp/Buttons';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { ISearchParams } from '@/app/api/search/route';
import { IBranches } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { searchFieldsSchema } from '@/schemas/common';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { buttonBackgroundColor } from './style';

type Props = {
  branches?: IBranches[];
  onSearch: (params: ISearchParams | null) => void;
};

export const FilterSection = ({ branches, onSearch }: Props) => {
  const { searchParams } = usePersistedSearch<ISearchParams>('account-enquiry');
  const { mappedBranches } = useMapSelectOptions({ branches });
  const { setWidth } = useCurrentBreakpoint();

  const initialValues = {
    branchID: searchParams?.branchID ?? '',
    accountNo: searchParams?.accountNo ?? '',
  };

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      branchID: values.branchID.toString().length > 0 ? values.branchID : null,
      accountNo: values.accountNo.length > 0 ? values.accountNo : undefined,
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
      {() => (
        <Form>
          <Box sx={{ marginTop: '20px', paddingX: '24px' }}>
            <Grid container spacing={2}>
              <Grid item mobile={12} tablet={3} justifyContent="center">
                <FormSelectField
                  customStyle={{
                    width: setWidth(),
                    fontSize: '14px',
                    ...inputFields,
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
                tablet={8}
                justifyContent="center"
              >
                <FormTextInput
                  customStyle={{
                    width: setWidth(),
                    fontSize: '14px',
                    ...inputFields,
                  }}
                  icon={<SearchIcon />}
                  name="accountNo"
                  placeholder="Search a customer by Name or Account Number"
                  label="Account Number"
                />
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
                  customStyle={buttonBackgroundColor}
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
