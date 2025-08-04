import React from 'react';
import { Box, Stack, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { exportData, dateFilter } from './styles';
import colors from '@/assets/colors';
import { ExportIcon } from '@/assets/svg';
import {
  ActionButtonWithPopper,
  ActionButton
} from '@/components/Revamp/Buttons';

import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { ISearchParams } from '@/app/api/search/route';
import { useCurrentBreakpoint } from '@/utils';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { FormTextInput } from '@/components/FormikFields';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';

type Props = {
  onSearch?: Function;
};

export const FilterSection = ({ onSearch }: Props) => {
  const { setDirection } = useSetDirection();
  const { setWidth } = useCurrentBreakpoint();
  const { dateValue } = React.useContext(DateRangePickerContext);

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      searchWith: values.searchWith ? values.searchWith : null,
      userID: values.userID ? values.userID : null,
      startDate: dateValue[0]?.format('YYYY-MM-DD') || '',
      endDate: dateValue[1]?.format('YYYY-MM-DD') || ''
    };
    onSearch?.(params);
  };

  return (
    <Formik
      initialValues={searchFilterInitialValues}
      onSubmit={(values) => onSubmit(values)}
    >
      <Form>
        <Stack direction={setDirection()} justifyContent="end">
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
                name="startDate"
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
            paddingX: '24px'
          }}
        >
          <Box>
            <Grid container spacing={2}>
              <Grid
                mb={{ tablet: 11 }}
                item
                mobile={12}
                tablet={11}
                justifyContent="center"
              >
                <FormTextInput
                  customStyle={{
                    width: setWidth()
                  }}
                  icon={<SearchIcon />}
                  name="userID"
                  placeholder="Search User id"
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
  );
};
