import React from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Form, Formik } from 'formik';
import { ActionButton } from '@/components/Revamp/Buttons';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { useCurrentBreakpoint } from '@/utils';
import { ISearchParams } from '@/app/api/search/route';
import { IStatus } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { FormSelectField, FormTextInput } from '@/components/FormikFields';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import {
  GlClassSearchParams,
  NodeSearchParams,
} from '@/schemas/schema-values/setup';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

type Props = {
  onSearch?: (params: ISearchParams) => Promise<void>;
  status?: IStatus[];
  placeholderProp: string;
};

export const FilterSection = ({ onSearch, status, placeholderProp }: Props) => {
  const { searchParams } = usePersistedSearch<ISearchParams>(
    'general-ledgers-node',
  );
  const { isMobile, setWidth } = useCurrentBreakpoint();
  const { mappedStatus } = useMapSelectOptions({
    status,
  });

  const initialValues = {
    gl_NodeName: searchParams?.gl_NodeName ?? '',
    status: searchParams?.status ?? '',
    gl_NodeCode: searchParams?.gl_NodeCode ?? '',
  };

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      status: values.status?.toString().length > 0 ? values.status : null,
      gl_NodeName:
        values.gl_NodeName?.toString().length > 0 ? values.gl_NodeName : null,
      gl_NodeCode:
        values.gl_NodeCode?.toString().length > 0 ? values.gl_NodeCode : null,
    };

    onSearch?.(params);
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
    >
      <Form>
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
              name="gl_NodeName"
              placeholder={placeholderProp}
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
      </Form>
    </Formik>
  );
};
