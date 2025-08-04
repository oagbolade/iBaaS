import React from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Form, Formik } from 'formik';
import { FormSelectField, FormTextInput } from '@/components/FormikFields';
import { ActionButton } from '@/components/Revamp/Buttons';
import { useCurrentBreakpoint } from '@/utils';
import { ISearchParams } from '@/app/api/search/route';
import { EditOperations } from '@/constants/OperationOptions';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { IProductType, IStatus } from '@/api/ResponseTypes/general';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import { filterSectionSchema } from '@/schemas/setup';

type Props = {
  onSearch?: (params: ISearchParams) => Promise<void>;
};

export const FilterSection = ({ onSearch }: Props) => {
  const { isMobile, setWidth } = useCurrentBreakpoint();

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      behaviour:
        values.behaviour?.toString().length > 0 ? values.behaviour : '',
      exceptionDesc:
        values.exceptionDesc?.toString().length > 0 ? values.exceptionDesc : '',
      exceptioncode:
        values.exceptioncode?.toString().length > 0 ? values.exceptioncode : ''
    };
    onSearch?.(params);
  };

  return (
    <Formik
      initialValues={searchFilterInitialValues}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={filterSectionSchema}
    >
      <Form>
        <Box>
          <Grid container spacing={2}>
            <Grid
              mb={{ tablet: 3 }}
              item
              mobile={12}
              tablet={2}
              justifyContent="center"
            >
              <FormSelectField
                customStyle={{
                  width: setWidth(),
                  fontSize: '14px',
                  ...inputFields
                }}
                name="behaviour"
                options={EditOperations.behaviour}
                label="Behaviour"
              />{' '}
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
                name="exceptionDesc"
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
