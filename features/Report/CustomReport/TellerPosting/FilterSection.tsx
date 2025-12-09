import React from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Form, Formik } from 'formik';
import { buttonBackgroundColor } from '../AccountDebit/style';
import { IBranches } from '@/api/ResponseTypes/general';
import {
  FormSelectField,
  FormTextInput,
} from '@/components/FormikFields';
import {
  ActionButton,
} from '@/components/Revamp/Buttons';
import { inputFields } from '@/features/Report/CustomReport/style';
import { ITellerPostingParams } from '@/api/reports/useGetTellerPosting';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { useCurrentBreakpoint } from '@/utils';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { searchFieldsSchema } from '@/schemas/common';

type Props = {
  onSearch: (params: ITellerPostingParams | null) => void;
  branches?: IBranches[];
};

export const FilterSection = ({ branches, onSearch }: Props) => {
  const { setWidth } = useCurrentBreakpoint();

  const { dateValue } = React.useContext(DateRangePickerContext);
  const endDate = dateValue[1];

  const { mappedBranches } = useMapSelectOptions({
    branches
  });

  const initialValues = {
    branchCode: '',
    search: '',
    reportDate: endDate?.format('YYYY-MM-DD')
  };

  const onSubmit = async (values: any) => {
    const params = {
      branchCode: values.branchCode.toString().length > 0 ? values.branchCode : null,
      search: values.search.trim().length > 0 ? values.search : null
    };

    onSearch?.(params);
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values) => onSubmit(values)}
      validationSchema={searchFieldsSchema}
    >
      <Form>
        <Box sx={{ height: '120px' }}>
          <Grid container spacing={2}>
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
                  fontSize: '14px',
                  ...inputFields
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
              tablet={8}
              justifyContent="center"
            >
              <FormTextInput
                customStyle={{
                  width: setWidth(),
                  fontSize: '14px',
                  ...inputFields
                }}
                icon={<SearchIcon />}
                name="search"
                label="Teller/User ID"
                placeholder="Search a Teller or User ID"
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
      </Form>
    </Formik>
  );
};
