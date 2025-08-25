import { Box, Grid } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { inputFields } from '../../style';
import { buttonBackgroundColor } from '../style';
import { IBranches } from '@/api/ResponseTypes/general';
import {
  FormSelectField,
  FormSelectInput,
  FormTextInput,
  TextInput,
} from '@/components/FormikFields';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { SearchIcon } from '@/assets/svg';
import { ActionButton } from '@/components/Revamp/Buttons';
import { IDetailedPortfolioAtRiskParams } from '@/api/reports/useGetDetailedPortfolioReport';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { Form, Formik } from 'formik';

type Props = {
  branches?: IBranches[];
  onSearch: (params: IDetailedPortfolioAtRiskParams | null) => void;
};

export const FilterSection = ({ branches, onSearch }: Props) => {
  const { searchParams } = usePersistedSearch<IDetailedPortfolioAtRiskParams>(
    'portfolio-individual-loan',
  );

  const { mappedBranches } = useMapSelectOptions({
    branches,
  });

  const initialValues = {
    branchCode: searchParams?.branchCode ?? '',
    search: searchParams?.search ?? '',
  };

  const onSubmit = async (values: any) => {
    const params: IDetailedPortfolioAtRiskParams = {
      branchCode:
        values.branchCode.toString().length > 0 ? values.branchCode : null,
      search: values.search.length > 0 ? values.search : null,
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
            <Box sx={{ height: '120px' }}>
              <Grid
                sx={{ padding: '15px 30px', display: 'flex', gap: '35px' }}
                spacing={2}
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
                    name="branchCode"
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
                      width: '600px',
                      fontSize: '14px',
                      ...inputFields,
                    }}
                    icon={<SearchIcon />}
                    name="search"
                    placeholder="Search a customer by Name or Account Number"
                    label="Account Number/Name"
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
