import React from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import { FormTextInput } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { ActionButton } from '@/components/Revamp/Buttons';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import colors from '@/assets/colors';
import { ISearchParams } from '@/app/api/search/route';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { searchFieldsSchema } from '@/schemas/common';
import { useGetParams } from '@/utils/hooks/useGetParams';

type Props = {
  onSearch: Function;
};

export const FilterSection = ({ onSearch }: Props) => {
  const { setWidth } = useCurrentBreakpoint();
  const roleID = useGetParams('roleid') || null;
  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      userID: values.userID.toString().length > 0 ? values.userID : null,
      fullName: values.search.toString().length > 0 ? values.search : null,
      roleID
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
          <Grid container spacing={2}>
            <Grid
              mb={{ tablet: 6 }}
              item
              mobile={12}
              tablet={3}
              justifyContent="center"
            >
              <FormTextInput
                customStyle={{
                  width: setWidth(),
                  fontSize: '14px',
                  ...inputFields
                }}
                name="userID"
                placeholder="46362727"
                label="User ID"
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
                placeholder="Search"
                label="User Name"
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
                buttonTitle="Search"
                type="submit"
              />
            </Grid>
          </Grid>
        </Box>
      </Form>
    </Formik>
  );
};
