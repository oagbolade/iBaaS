import React from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Form, Formik } from 'formik';
import { FormSelectField, FormTextInput } from '@/components/FormikFields';
import { ActionButton } from '@/components/Revamp/Buttons';
import { useCurrentBreakpoint } from '@/utils';
import { ISearchParams } from '@/app/api/search/route';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { IProductType, IStatus } from '@/api/ResponseTypes/general';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

type Props = {
  onSearch?: (params: ISearchParams) => Promise<void>;
  status?: IStatus[];
};

export const FilterSection = ({ onSearch, status }: Props) => {
  const { searchParams } = usePersistedSearch<ISearchParams>('commercial-bank');
  const { isMobile, setWidth } = useCurrentBreakpoint();
  const { mappedStatus } = useMapSelectOptions({
    status,
  });

  const initialValues = {
    bankName: searchParams?.bankName ?? '',
    status: searchParams?.status ?? '',
    bankCode: searchParams?.bankCode ?? '',
    bankshortname: searchParams?.bankshortname ?? '',
  };

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      status: values.status?.toString().length > 0 ? values.status : null,
      bankName: values.bankName?.toString().length > 0 ? values.bankName : null,
      bankCode: values.bankCode?.toString().length > 0 ? values.bankCode : null,
      bankshortname:
        values.bankshortname?.toString().length > 0
          ? values.bankshortname
          : null,
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
                  ...inputFields,
                }}
                icon={<SearchIcon />}
                name="bankName"
                placeholder="Search by Bank name"
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
