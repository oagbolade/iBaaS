import React from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Formik, Form } from 'formik';
import { FormSelectField, FormTextInput } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { ActionButton } from '@/components/Revamp/Buttons';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { ISearchParams } from '@/app/api/search/route';
import { IStatus } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { ISector } from '@/api/ResponseTypes/setup';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

type Props = {
  onSearch?: (params: ISearchParams) => Promise<void>;
  status?: IStatus[];
  sectors?: ISector[];
};

export const FilterSection = ({ onSearch, status, sectors }: Props) => {
  const { searchParams } = usePersistedSearch<ISearchParams>('industry');

  const { mappedStatus, mappedSectors } = useMapSelectOptions({
    status,
    sectors,
  });
  const { setWidth } = useCurrentBreakpoint();

  const initialValues = {
    industryCode: searchParams?.industryCode ?? '',
    status: searchParams?.status ?? '',
    industryName: searchParams?.industryName ?? '',
  };

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      status: values.status?.toString().length > 0 ? values.status : null,
      industryCode:
        values.industryCode?.toString().length > 0 ? values.industryCode : null,
      industryName:
        values.industryName?.toString().length > 0 ? values.industryName : null,
    };
    onSearch?.(params);
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values) => onSubmit(values)}
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
                  ...inputFields,
                }}
                name="status"
                options={mappedStatus}
                label="Status"
              />{' '}
            </Grid>
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
                  ...inputFields,
                }}
                name="industryCode"
                options={mappedSectors}
                label="Sectors"
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
                  fontSize: '14px',
                }}
                icon={<SearchIcon />}
                name="industryName"
                placeholder="Search by industry name"
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
