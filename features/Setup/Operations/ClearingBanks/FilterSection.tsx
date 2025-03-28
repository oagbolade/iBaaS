import React from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FormSelectField, FormTextInput } from '@/components/FormikFields';
import { ActionButton } from '@/components/Revamp/Buttons';
import { useCurrentBreakpoint } from '@/utils';
import { ISearchParams } from '@/app/api/search/route';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { IProductType, IStatus } from '@/api/ResponseTypes/general';
import { Form, Formik } from 'formik';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import { ClearingSearchParams } from '@/schemas/schema-values/setup';

type Props = {
  onSearch?: (params: ISearchParams) => Promise<void>;
  status?: IStatus[];
};

export const FilterSection = ({ onSearch, status }: Props) => {
  const { isMobile, setWidth } = useCurrentBreakpoint();
  const { mappedStatus } = useMapSelectOptions({
    status
  });

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      status: values.status?.toString().length > 0 ? values.status : null,
      bankName: values.bankName?.toString().length > 0 ? values.bankName : null,
      bankCode: values.bankCode?.toString().length > 0 ? values.bankCode : null
    };

    onSearch?.(params);
  };

  return (
    <>
      <Formik
        initialValues={searchFilterInitialValues}
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
                    ...inputFields
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
                    ...inputFields
                  }}
                  icon={<SearchIcon />}
                  name="bankName"
                  placeholder="Search by clearing bank"
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
    </>
  );
};
