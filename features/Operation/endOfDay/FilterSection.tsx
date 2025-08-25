import React from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Form, Formik } from 'formik';
import dayjs from 'dayjs';
import {
  FormikDateTimePicker,
  FormSelectField,
  FormTextInput
} from '@/components/FormikFields';
import { ActionButton } from '@/components/Revamp/Buttons';
import { useCurrentBreakpoint } from '@/utils';
import { ISearchParams } from '@/app/api/search/route';
import { EditOperations } from '@/constants/OperationOptions';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { IProductType, IStatus } from '@/api/ResponseTypes/general';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import { filterSectionSchema } from '@/schemas/setup';
import { formatFormikDatePickerToISO } from '@/utils/convertDateToISOFormat';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

type Props = {
  onSearch?: (params: ISearchParams) => Promise<void>;
};

export const FilterSection = ({ onSearch }: Props) => {
  const { isMobile, setWidth } = useCurrentBreakpoint();
  const { searchParams } = usePersistedSearch<ISearchParams>('EOD-Overview');
  const initialValues = {
    searchDate: searchParams?.searchDate,
    searchWith: searchParams?.searchWith
  };
  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      searchDate: formatFormikDatePickerToISO(
        dayjs(values.searchDate?.toString().length > 0 ? values.searchDate : '')
      ),
      searchWith:
        values.searchWith?.toString().length > 0 ? values.searchWith : ''
    };
    onSearch?.(params);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => onSubmit(values)}
    >
      <Form>
        <Box>
          <Grid container spacing={2}>
            <Grid mb={{ tablet: 3 }} item mobile={5} tablet={2}>
              <FormikDateTimePicker
                label="Date"
                name="searchDate"
                value="searchDate"
              />
            </Grid>
            <Grid
              mb={{ tablet: 6 }}
              item
              mobile={12}
              tablet={9}
              justifyContent="center"
            >
              <FormTextInput
                customStyle={{
                  width: setWidth(),
                  fontSize: '14px',
                  ...inputFields
                }}
                icon={<SearchIcon />}
                name="searchWith"
                placeholder="Search"
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
              <ActionButton type="submit" buttonTitle="Search" />
            </Grid>
          </Grid>
        </Box>
      </Form>
    </Formik>
  );
};
