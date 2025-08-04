import React from 'react';
import { Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Formik, Form } from 'formik';
import { FormSelectField, FormTextInput } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { ActionButton } from '@/components/Revamp/Buttons';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { ISearchParams } from '@/app/api/search/route';
import { IBranches } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { searchFieldsSchema } from '@/schemas/common';

type Props = {
  onSearch: Function;
  branches: IBranches[];
};

export const FilterSection = ({ onSearch, branches }: Props) => {
  const { mappedBranches } = useMapSelectOptions({ branches });
  const { setWidth } = useCurrentBreakpoint();

  const onSubmit = async (values: any) => {
    const statusOption = document.getElementsByClassName(
      'statusOption'
    ) as HTMLCollectionOf<HTMLInputElement>;
    const status = statusOption[0].value || '';

    const params: ISearchParams = {
      status: status?.trim().length > 0 ? status : null,
      branchID: values.branchID.toString().length > 0 ? values.branchID : null,
      fullName: values.search.toString().length > 0 ? values.search : null
    };

    onSearch(params);
  };

  return (
    <Formik
      initialValues={searchFilterInitialValues}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={searchFieldsSchema}
    >
      <Form>
        <Box>
          <Grid
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '50px',
              gap: '20px'
            }}
          >
            <Grid>
              <RadioButtons
                className="statusOption"
                options={[
                  { label: 'Active', value: '1' },
                  { label: 'Disabled', value: '3' }
                ]}
                title="User Status"
                name="status"
                value=""
              />
            </Grid>
            <Grid>
              <FormSelectField
                customStyle={{
                  width: '200px',
                  fontSize: '14px'
                }}
                name="branchID"
                options={mappedBranches}
                label="Branch ID"
              />{' '}
            </Grid>
            <Grid>
              <FormTextInput
                customStyle={{
                  width: '250px',
                  fontSize: '14px',
                  marginTop: '5px'
                }}
                icon={<SearchIcon />}
                name="search"
                placeholder="Enter name"
                label="Search By User Name"
              />{' '}
            </Grid>
            <Grid sx={{ marginTop: '18px' }}>
              <ActionButton type="submit" buttonTitle="Search" />
            </Grid>
          </Grid>
        </Box>
      </Form>
    </Formik>
  );
};
