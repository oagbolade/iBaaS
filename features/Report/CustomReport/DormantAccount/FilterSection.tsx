import React from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Formik, Form } from 'formik';
import { inputFields } from '../style';
import { FormSelectField, FormTextInput } from '@/components/FormikFields';
import colors from '@/assets/colors';
import {
  ActionButtonWithPopper,
  ActionButton
} from '@/components/Revamp/Buttons';
import { useCurrentBreakpoint } from '@/utils';
import { IBranches } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { ISearchParams } from '@/app/api/search/route';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { dormantAccountSchema } from '@/schemas/reports';

type Props = {
  branches?: IBranches[];
  onSearch?: Function;
};

export const FilterSection = ({ branches, onSearch }: Props) => {
  const { setWidth } = useCurrentBreakpoint();
  const { mappedBranches } = useMapSelectOptions({
    branches
  });

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      accountNumber: values.accountNumber ? values.accountNumber : '',
      branchID: values.branchID.toString().length > 0 ? values.branchID : '',
      searchWith:
        values.searchWith?.toString().trim().length > 0
          ? values.searchWith
          : '',
      getAll: false,
      pageSize: '10'
    };
    onSearch?.(params);
  };

  return (
    <Formik
      initialValues={searchFilterInitialValues}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={dormantAccountSchema}
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
                tablet={8}
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
                  placeholder=" Enter Account number"
                  label=""
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
  );
};
