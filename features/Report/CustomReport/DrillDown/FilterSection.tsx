import React from 'react';
import { Box, Stack, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Formik, Form } from 'formik';
import { exportData, inputFields } from '../style';
import { FormTextInput } from '@/components/FormikFields';
import colors from '@/assets/colors';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { drillDowndueSchema } from '@/schemas/reports';
import { useCurrentBreakpoint } from '@/utils';

import {
  ActionButtonWithPopper,
  ActionButton,
  BackButton
} from '@/components/Revamp/Buttons';
import { ExportIcon } from '@/assets/svg';
import { ISearchParams } from '@/app/api/search/route';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

type Props = {
  onSearch: (params: ISearchParams | null) => void;
};

export const FilterSection = ({ onSearch }: Props) => {
  const { searchParams } = usePersistedSearch<ISearchParams>('drill-down');
  const { setDirection } = useSetDirection();
  const { setWidth } = useCurrentBreakpoint();

  const initialValues = {
    branchCode: searchParams?.branchCode ?? '',
    gl_NodeCode: searchParams?.gl_NodeCode ?? ''
  };

  const onSubmit = (values: any) => {
    const searchParams: ISearchParams = {
      branchCode:
        values.branchCode?.toString().trim().length > 0
          ? values.branchCode
          : null,
      gl_NodeCode:
        values.gl_NodeCode?.toString().trim().length > 0
          ? values.gl_NodeCode
          : null
    };
    onSearch?.(searchParams);
  };

  return (
    <Box marginTop={10}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(values) => onSubmit(values)}
      >
        <Form>
          {/* <Stack
            sx={{
              borderBottom: '1px solid #E8E8E8',
              marginTop: '24px',
              paddingX: '24px'
            }}
            direction={setDirection()}
            justifyContent="space-between"
          >
            <Box>
              <Box mt={2.3}>
                <BackButton />
              </Box>
            </Box>
            <Stack
              mt={1}
              direction={setDirection()}
              spacing={2}
              justifyContent="space-between"
            >
              <Box>
                <ActionButtonWithPopper
                  searchGroupVariant="ExportReport"
                  customStyle={{ ...exportData }}
                  icon={<ExportIcon />}
                  iconPosition="start"
                  buttonTitle="Export Data"
                />
              </Box>
            </Stack>
          </Stack> */}

          <Box
            sx={{
              marginTop: '20px',
              paddingX: '24px'
            }}
          >
            <Box>
              <Grid container spacing={2}>
                <Grid
                  mb={{ tablet: 5 }}
                  item
                  mobile={12}
                  tablet={11}
                  justifyContent="center"
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(),
                      ...inputFields
                    }}
                    icon={<SearchIcon />}
                    name="gl_NodeCode"
                    placeholder="Search by GL Node Name or code"
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
          </Box>
        </Form>
      </Formik>
    </Box>
  );
};
