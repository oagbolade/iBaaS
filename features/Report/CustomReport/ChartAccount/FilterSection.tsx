import React from 'react';
import { Box, Grid, Stack } from '@mui/material';
import { Formik, Form } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { exportData, dateFilter, inputFields } from '../style';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import colors from '@/assets/colors';
import {
  ActionButtonWithPopper,
  ActionButton,
  BackButton,
} from '@/components/Revamp/Buttons';
import { ExportIcon } from '@/assets/svg';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { useCurrentBreakpoint } from '@/utils';
import { IBranches } from '@/api/ResponseTypes/general';
import { ISearchParams } from '@/app/api/search/route';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { chartOfAccountSchema } from '@/schemas/reports';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

type Props = {
  branches?: IBranches[];
  onSearch?: Function;
};
export const FilterSection = ({ branches, onSearch }: Props) => {
  const { searchParams } = usePersistedSearch<ISearchParams>('chart-account');
  const { setDirection } = useSetDirection();
  const { setWidth } = useCurrentBreakpoint();
  const { mappedBranches } = useMapSelectOptions({
    branches,
  });
  const initialValues = {
    branchID: searchParams?.branchID ?? '',
    searchWith: searchParams?.searchWith ?? '',
  };
  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      branchID:
        values.branchID?.toString().trim().length > 0 ? values.branchID : null,
      searchWith:
        values.searchWith?.toString().trim().length > 0
          ? values.searchWith
          : null,
    };
    onSearch?.(params);
  };
  return (
    <Box marginTop={3}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(values) => onSubmit(values)}
        validationSchema={chartOfAccountSchema}
      >
        <Form>
          <Box
            sx={{
              marginTop: '20px',
              paddingX: '24px',
            }}
          >
            <Box>
              <Grid container spacing={2}>
                <Grid item mobile={12} tablet={4} justifyContent="center">
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
                  tablet={7}
                  justifyContent="center"
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(),
                      ...inputFields,
                    }}
                    icon={<SearchIcon />}
                    name="searchWith"
                    placeholder="Search by Product Name or code"
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
