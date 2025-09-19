import React from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import { inputFields } from '../style';
import {
  FormTextInput,
  FormSelectField,
  FormikRadioButton
} from '@/components/FormikFields';
import colors from '@/assets/colors';
import { ActionButton } from '@/components/Revamp/Buttons';
import { useCurrentBreakpoint } from '@/utils';
import { IBranches } from '@/api/ResponseTypes/general';
import { ISearchParams } from '@/app/api/search/route';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { plainTrailBalanceSchema } from '@/schemas/reports';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';

type Props = {
  branches?: IBranches[];
  onSearch?: Function;
};

export const FilterSection = ({ branches, onSearch }: Props) => {
  const { searchParams } = usePersistedSearch<ISearchParams>(
    'plain-trial-balance'
  );
  const { setWidth } = useCurrentBreakpoint();
  const { mappedBranches } = useMapSelectOptions({
    branches
  });

  const { dateValue, isDateFilterApplied } = React.useContext(
    DateRangePickerContext
  );

  const initialValues = {
    branchID: searchParams?.branchID ?? '',
    reportType: searchParams?.reportType ?? '',
    searchWith: searchParams?.searchWith ?? '',
    reportDate: searchParams?.reportDate ?? ''
  };

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      branchID: values.branchID ? values.branchID : null,
      reportType: values.reportType ? values.reportType : null,
      searchWith: values.searchWith ? values.searchWith : null,
      reportDate: dateValue[0]?.format('YYYY-MM-DD') || '',
      getAll: isDateFilterApplied
    };
    onSearch?.(params);
  };

  return (
    <Box marginTop={10}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(values) => onSubmit(values)}
        validationSchema={plainTrailBalanceSchema}
      >
        <Form>
          <Box
            sx={{
              marginTop: '20px',
              paddingX: '24px'
            }}
          >
            <Box>
              <Grid container spacing={2}>
                <Grid
                  mb={{ tablet: 6 }}
                  item
                  mobile={12}
                  tablet={3}
                  justifyContent="center"
                >
                  <FormikRadioButton
                    options={[
                      { label: 'Balance Sheet', value: 'trialbalance' },
                      { label: 'Profit & Loss', value: 'pandl' }
                    ]}
                    title="Select Report Type"
                    name="reportType"
                    value="trailbalance"
                    required
                  />
                </Grid>

                <Grid item mobile={12} tablet={3} justifyContent="center">
                  <FormSelectField
                    customStyle={{
                      width: setWidth(),
                      ...inputFields
                    }}
                    name="branchID"
                    options={mappedBranches}
                    label="Branch Name"
                    required
                  />{' '}
                </Grid>

                <Grid
                  mb={{ tablet: 6 }}
                  item
                  mobile={12}
                  tablet={5}
                  justifyContent="center"
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(),
                      ...inputFields
                    }}
                    icon={<SearchIcon />}
                    name="searchWith"
                    placeholder="Search by Gl number or Gl name"
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
    </Box>
  );
};
