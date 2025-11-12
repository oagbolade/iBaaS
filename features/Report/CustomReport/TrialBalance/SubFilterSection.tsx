import React from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import { inputFields } from '../style';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import colors from '@/assets/colors';
import { ActionButton } from '@/components/Revamp/Buttons';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { useCurrentBreakpoint } from '@/utils';
import { IBranches } from '@/api/ResponseTypes/general';
import { ISearchParams } from '@/app/api/search/route';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { trialBalanceSchema } from '@/schemas/reports';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';

type Props = {
  branches?: IBranches[];
  onSearch?: Function;
  selectedBranch?: string;
};

export const FilterSection = ({
  branches,
  onSearch,
  selectedBranch
}: Props) => {
  const { setWidth } = useCurrentBreakpoint();
  const { mappedBranches } = useMapSelectOptions({
    branches
  });

  const { dateValue } = React.useContext(DateRangePickerContext);

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      branchID:
        values.branchID?.toString().trim().length > 0 ? values.branchID : null,

      customerID:
        values.customerID?.toString().length > 0 ? values.customerID : null,

      reportDate: dateValue[0]?.format('YYYY-MM-DD')
    };
    onSearch?.(params);
  };

  return (
    <Box marginTop={10}>
      <Formik
        initialValues={{
          ...searchFilterInitialValues,
          branchID: selectedBranch || ''
        }}
        onSubmit={(values) => onSubmit(values)}
        validationSchema={trialBalanceSchema}
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
                <Grid item mobile={12} tablet={4} justifyContent="center">
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
                  tablet={7}
                  justifyContent="center"
                  marginTop={3}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(),
                      ...inputFields
                    }}
                    icon={<SearchIcon />}
                    name="customerID"
                    placeholder="Search by GL Account Number or  Account Name"
                    label=""
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
