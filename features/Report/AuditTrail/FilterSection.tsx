import React from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import colors from '@/assets/colors';
import { ActionButton } from '@/components/Revamp/Buttons';

import { ISearchParams } from '@/app/api/search/route';
import { useCurrentBreakpoint } from '@/utils';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { FormTextInput } from '@/components/FormikFields';

type Props = {
  onSearch?: Function;
};

export const FilterSection = ({ onSearch }: Props) => {
  const { setWidth } = useCurrentBreakpoint();

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      searchWith: values.searchWith ? values.searchWith : null,
      userID: values.userID ? values.userID : null
    };
    onSearch?.(params);
  };

  return (
    <Formik
      initialValues={searchFilterInitialValues}
      onSubmit={(values) => onSubmit(values)}
    >
      <Form>
        <Box
          sx={{
            paddingX: '24px',
            marginTop: '16px'
          }}
        >
          <Grid container spacing={2}>
            <Grid
              mb={{ tablet: 10 }}
              item
              mobile={12}
              tablet={10}
              justifyContent="center"
            >
              <FormTextInput
                customStyle={{
                  width: setWidth()
                }}
                icon={<SearchIcon />}
                name="userID"
                placeholder="Search User id"
                label="Search"
              />
            </Grid>

            <Grid
              item
              mobile={12}
              tablet={2}
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
                type="submit"
                buttonTitle="Search"
              />
            </Grid>
          </Grid>
        </Box>
      </Form>
    </Formik>
  );
};
