import React from 'react';
import { Box, Grid, Stack } from '@mui/material';
import { Formik, Form } from 'formik';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { DateCalendar } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { exportData, dateFilter, inputFields } from '../style';
import { buttonBackgroundColor } from '../AccountDebit/style';
import { FormSelectField } from '@/components/FormikFields';
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
import { trialBalanceGroupSchema } from '@/schemas/reports';
import { IGLType } from '@/api/ResponseTypes/admin';
import useFormattedDates from '@/utils/hooks/useFormattedDates';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

type Props = {
  branches?: IBranches[];
  onSearch?: Function;
  glType?: IGLType[] | Array<any>;
};

export const FilterSection = ({ branches, onSearch, glType }: Props) => {
  const { searchParams } = usePersistedSearch<ISearchParams>('profit-and-loss');
  const { setDirection } = useSetDirection();
  const { setWidth } = useCurrentBreakpoint();
  const { mappedBranches } = useMapSelectOptions({
    branches
  });

  const { currentDate } = useFormattedDates();
  const [reportDate, setReportDate] = React.useState<Dayjs>(dayjs(currentDate));

  const initialValues = {
    branchID: searchParams?.branchID ?? '',
    reportDate: searchParams?.reportDate ?? ''
  };

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      branchID:
        values.branchID?.toString().trim().length > 0 ? values.branchID : null,
      reportDate: reportDate.format('YYYY-MM-DD')
    };
    onSearch?.(params);
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values) => onSubmit(values)}
      validationSchema={trialBalanceGroupSchema}
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
                CustomDateRangePicker={
                  <DateCalendar
                    value={reportDate}
                    onChange={(date) => setReportDate(date)}
                  />
                }
                iconPosition="end"
                buttonTitle={reportDate.format('YYYY-MM-DD')}
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
              <Grid
                mb={{ tablet: 10 }}
                item
                mobile={12}
                tablet={10}
                justifyContent="center"
              >
                <FormSelectField
                  customStyle={{
                    width: setWidth(),
                    ...inputFields
                  }}
                  name="branchID"
                  options={mappedBranches}
                  label="Branch"
                />{' '}
              </Grid>
              <Grid
                item
                mobile={12}
                tablet={1}
                sx={{ display: 'flex', marginLeft: '30px' }}
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
    </Formik>
  );
};
