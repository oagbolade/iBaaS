import React from 'react';
import { Box, Grid, Stack } from '@mui/material';
import { Formik, Form } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { exportData, dateFilter, inputFields } from '../style';
import {
  FormTextInput,
  FormSelectField,
  FormikRadioButton
} from '@/components/FormikFields';
import colors from '@/assets/colors';
import {
  ActionButtonWithPopper,
  ActionButton,
  BackButton
} from '@/components/Revamp/Buttons';
import { ExportIcon } from '@/assets/svg';

import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { useCurrentBreakpoint } from '@/utils';
import { IBranches } from '@/api/ResponseTypes/general';
import { ISearchParams } from '@/app/api/search/route';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { trialBalanceSchema } from '@/schemas/reports';

type Props = {
  branches?: IBranches[];
  onSearch?: Function;
};

export const FilterSection = ({ branches, onSearch }: Props) => {
  const { setDirection } = useSetDirection();
  const { setWidth } = useCurrentBreakpoint();
  const { mappedBranches } = useMapSelectOptions({
    branches
  });

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      branchID:
        values.branchID?.toString().trim().length > 0 ? values.branchID : null,
      reportDate:
        values.reportDate?.toString().trim().length > 0
          ? values.reportDate
          : null,
      reportType:
        values.reportType?.toString().trim().length > 0
          ? values.reportType
          : null
    };
    onSearch?.(params);
  };

  return (
    <Box marginTop={10}>
      <Formik
        initialValues={searchFilterInitialValues}
        onSubmit={(values) => onSubmit(values)}
        validationSchema={trialBalanceSchema}
      >
        <Form>
          <Stack
            sx={{
              borderBottom: '1px solid #E8E8E8',
              marginTop: '10px',
              paddingX: '24px'
            }}
            direction={setDirection()}
            justifyContent="space-between"
          >
            <Box>
              <Box mt={2.3}>
                <BackButton />
              </Box>
            </Box>
            <Stack
              mt={1}
              direction={setDirection()}
              spacing={2}
              justifyContent="space-between"
            >
              <Box>
                <ActionButtonWithPopper
                  searchGroupVariant="ExportReport"
                  customStyle={{ ...exportData }}
                  icon={<ExportIcon />}
                  iconPosition="start"
                  buttonTitle="Export Data"
                />
              </Box>
              <Box>
                <ActionButtonWithPopper
                  searchGroupVariant="DateRangePicker"
                  customStyle={{ ...dateFilter }}
                  icon={
                    <CalendarTodayOutlinedIcon
                      sx={{
                        color: `${colors.Heading}`
                      }}
                    />
                  }
                  iconPosition="end"
                  buttonTitle="Aug 22 - Sep 23"
                />
              </Box>
            </Stack>
          </Stack>

          <Box
            sx={{
              marginTop: '30px',
              paddingX: '24px'
            }}
          >
            <Box>
              <Grid container spacing={2}>
                <Grid item mobile={12} tablet={3} justifyContent="center">
                  <FormikRadioButton
                    options={[
                      { label: 'Balance Sheet', value: '1' },
                      { label: 'Profit & Loss', value: '0' }
                    ]}
                    title="Select Report Type"
                    name="reportType"
                    value="1"
                  />
                </Grid>
                <Grid
                  mb={{ tablet: 6 }}
                  item
                  mobile={12}
                  tablet={3}
                  justifyContent="center"
                >
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
                  tablet={5}
                  justifyContent="center"
                >
                  <FormSelectField
                    customStyle={{
                      width: setWidth(),
                      ...inputFields
                    }}
                    name="assetLiability"
                    options={[
                      { name: 'Asset', value: '1' },
                      { name: 'Liabilities and Provision', value: '2' }
                    ]}
                    label="Filter"
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
