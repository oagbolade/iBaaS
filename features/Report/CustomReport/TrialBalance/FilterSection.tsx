import React from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import { inputFields } from '../style';
import { FormSelectField, FormikRadioButton } from '@/components/FormikFields';
import colors from '@/assets/colors';
import { ActionButton } from '@/components/Revamp/Buttons';

import { useCurrentBreakpoint } from '@/utils';
import { IBranches } from '@/api/ResponseTypes/general';
import { ISearchParams } from '@/app/api/search/route';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { trialBalanceGroupSchema } from '@/schemas/reports';
import { IGLType } from '@/api/ResponseTypes/admin';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';

type Props = {
  branches?: IBranches[];
  onSearch?: Function;
  glType?: IGLType[] | Array<any>;
};

export const FilterSection = ({ branches, onSearch, glType }: Props) => {
  const { searchParams } = usePersistedSearch<ISearchParams>('trial-balance');
  const { setWidth } = useCurrentBreakpoint();
  const { mappedBranches, mappedGLType } = useMapSelectOptions({
    branches,
    glType
  });

  const { dateValue } = React.useContext(DateRangePickerContext);

  const initialValues = {
    branchID: searchParams?.branchID ?? '',
    customerID: searchParams?.customerID ?? '',
    reportType: searchParams?.reportType ?? '',
    reportDate: searchParams?.reportDate ?? ''
  };
  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      branchID:
        values.branchID?.toString().trim().length > 0 ? values.branchID : null,
      customerID:
        values.customerID?.toString().trim().length > 0
          ? values.customerID
          : null,
      reportType:
        values.reportType?.toString().trim().length > 0
          ? values.reportType
          : null,
      reportDate: dateValue[0]?.format('YYYY-MM-DD') || ''
    };
    onSearch?.(params);
  };

  return (
    <Box marginTop={10}>
      <Formik
        initialValues={initialValues }
        enableReinitialize
        onSubmit={(values) => onSubmit(values)}
        validationSchema={trialBalanceGroupSchema}
      >
        <Form>
          <Box
            sx={{
              marginTop: '30px',
              paddingX: '24px'
            }}
          >
            <Box>
              <Grid container spacing={2}>
                <Grid item mobile={12} tablet={3} justifyContent="center">
                  <FormikRadioButton
                    options={[
                      { label: 'Balance Sheet', value: '1' },
                      { label: 'Profit & Loss', value: '0' }
                    ]}
                    title="Select Report Type"
                    name="reportType"
                    value="1"
                  />
                </Grid>
                <Grid
                  mb={{ tablet: 6 }}
                  item
                  mobile={12}
                  tablet={3}
                  justifyContent="center"
                >
                  <FormSelectField
                    customStyle={{
                      width: setWidth(),
                      ...inputFields
                    }}
                    name="branchID"
                    options={mappedBranches}
                    label="Branch Name"
                  />{' '}
                </Grid>
                <Grid
                  mb={{ tablet: 6 }}
                  item
                  mobile={12}
                  tablet={5}
                  justifyContent="center"
                >
                  <FormSelectField
                    customStyle={{
                      width: setWidth(),
                      ...inputFields
                    }}
                    name="customerID"
                    options={mappedGLType}
                    label="Filter"
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
