import React from 'react';
import { Box, Typography, Stack, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { allBranchesStyle } from '../../Overview/styles';
import {
  FormSelectField,
  FormTextInput,
  TextInput,
} from '@/components/FormikFields';
import colors from '@/assets/colors';
import {
  ActionButtonWithPopper,
  ActionButton,
} from '@/components/Revamp/Buttons';
import { ChevronDown } from '@/assets/svg';
import { labelTypography } from '@/components/FormikFields/styles';
import {
  Wrapper,
  branchOptions,
  selectButton,
} from '@/features/Report/CustomReport/IncomeAssuranceReport/FilterSection';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { useCurrentBreakpoint } from '@/utils';
import { IBranches } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { ISearchParams } from '@/app/api/search/route';
import { Formik, Form } from 'formik';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { chequebookSchema, dormantAccountSchema } from '@/schemas/reports';
import { inputFields } from '../style';

type Props = {
  branches?: IBranches[];
  onSearch?: Function;
};

export const FilterSection = ({ branches, onSearch }: Props) => {
  const { setDirection } = useSetDirection();
  const { isMobile, setWidth } = useCurrentBreakpoint();
  const { mappedBranches } = useMapSelectOptions({
    branches,
  });

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      accountNumber: values.accountNumber ? values.accountNumber : null,
      branchID: values.branchID.toString().length > 0 ? values.branchID : null,
      searchWith:
        values.searchWith?.toString().trim().length > 0
          ? values.searchWith
          : null,
      getAll: false,
      pageSize: '10',
    };
    onSearch?.(params);
  };

  return (
    <Box>
      <Formik
        initialValues={searchFilterInitialValues}
        onSubmit={(values) => onSubmit(values)}
        validationSchema={dormantAccountSchema}
      >
        <Form>
          <Box
            sx={{
              marginTop: '30px',
            }}
          >
            <Box>
              <Grid container spacing={2}>
                <Grid item mobile={12} tablet={3} justifyContent="center">
                  <FormSelectField
                    customStyle={{
                      width: setWidth(),
                      ...inputFields,
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
                  marginTop={3}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(),
                      ...inputFields,
                    }}
                    icon={<SearchIcon />}
                    name="searchWith"
                    placeholder="Search by Account Title or  Account number"
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
                      color: `${colors.white}`,
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
