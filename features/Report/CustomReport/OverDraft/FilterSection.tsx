import React, { useMemo } from 'react';
import { Box, Stack, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Formik, Form } from 'formik';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { exportData, dateFilter, inputFields } from '../style';
import colors from '@/assets/colors';
import {
  ActionButtonWithPopper,
  ActionButton,
  BackButton,
} from '@/components/Revamp/Buttons';
import { ExportIcon } from '@/assets/svg';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { IBranches } from '@/api/ResponseTypes/general';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { ISearchParams } from '@/app/api/search/route';
import { overdraftSchema } from '@/schemas/reports';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

type Props = {
  branches?: IBranches[];
  onSearch?: Function;
};

export const FilterSection = ({ branches, onSearch }: Props) => {
  const { searchParams } =
    usePersistedSearch<ISearchParams>('overdraft-report');
  const { setDirection } = useSetDirection();
  const { setWidth } = useCurrentBreakpoint();
  const { dateValue } = React.useContext(DateRangePickerContext);

  const { mappedBranches } = useMapSelectOptions({
    branches,
  });

  const formattedDateRange = useMemo(() => {
    const startMonthAndDay = `${dateValue?.[0]?.format('MMM') ?? ''} ${dateValue?.[0]?.format('DD') ?? ''}`;
    const endMonthAndDay = `${dateValue?.[1]?.format('MMM') ?? ''} ${dateValue?.[1]?.format('DD') ?? ''}`;
    return `${startMonthAndDay} - ${endMonthAndDay}`;
  }, [dateValue]);

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
      getAll: values.getAll,
    };
    onSearch?.(params);
  };

  return (
    <Box marginTop={10}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(values) => onSubmit(values)}
        validationSchema={overdraftSchema}
      >
        <Form>
          <Box
            sx={{
              marginTop: '30px',
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
                    required
                  />{' '}
                </Grid>

                <Grid
                  mb={{ tablet: 7 }}
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
                    placeholder="Search by Account number or Account title"
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
