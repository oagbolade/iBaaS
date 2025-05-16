import React from 'react';
import { Box, Grid, Stack } from '@mui/material';
import { Formik, Form } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { exportData, dateFilter, inputFields } from '../style';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import colors from '@/assets/colors';
import {
  ActionButtonWithPopper,
  ActionButton,
  BackButton,
} from '@/components/Revamp/Buttons';
import { ExportIcon } from '@/assets/svg';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { useCurrentBreakpoint } from '@/utils';
import { IBranches } from '@/api/ResponseTypes/general';
import { ISearchParams } from '@/app/api/search/route';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { customerBalanceSchema } from '@/schemas/reports';
import { IBankProducts } from '@/api/ResponseTypes/customer-service';

type Props = {
  branches?: IBranches[];
  onSearch?: Function;
};

export const FilterSection = ({ branches, onSearch }: Props) => {
  const { setDirection } = useSetDirection();
  const { setWidth } = useCurrentBreakpoint();
  const { mappedBranches } = useMapSelectOptions({
    branches,
  });

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      branchID:
        values.branchID?.toString().trim().length > 0 ? values.branchID : null,
      searchWith:
        values.searchWith?.toString().trim().length > 0
          ? values.searchWith
          : null,
      pCode: values.pCode?.toString().trim().length > 0 ? values.pCode : null,
      pageSize: '10',
    };
    onSearch?.(params);
  };

  return (
    <Box>
      <Formik
        initialValues={searchFilterInitialValues}
        onSubmit={(values) => onSubmit(values)}
        validationSchema={customerBalanceSchema}
      >
        <Form>
          <Box
            sx={{
              marginTop: '20px',
              paddingX: '24px',
            }}
          >
            <Box>
              <Grid container spacing={2}>
                <Grid item mobile={12} tablet={3} justifyContent="center">
                  <FormSelectField
                    customStyle={{
                      width: setWidth(),
                      ...inputFields,
                    }}
                    name="branchID"
                    options={mappedBranches}
                    label="Branch"
                  />{' '}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Form>
      </Formik>
    </Box>
  );
};
