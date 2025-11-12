import React from 'react';
import { Box, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import { inputFields } from '../style';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import colors from '@/assets/colors';
import { ActionButton } from '@/components/Revamp/Buttons';

import { useCurrentBreakpoint } from '@/utils';
import { IBranches, IStatus } from '@/api/ResponseTypes/general';
import { ISearchParams } from '@/app/api/search/route';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { chequebookSchema } from '@/schemas/reports';
// import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

type Props = {
  branches?: IBranches[];
  status?: IStatus[] | Array<any>;
  onSearch?: Function;
};

export const FilterSection = ({ branches, onSearch, status }: Props) => {
  const { searchParams } =
    usePersistedSearch<ISearchParams>('checkbook-status');
  const { setWidth } = useCurrentBreakpoint();
  const { mappedBranches, mappedStatus } = useMapSelectOptions({
    branches,
    status
  });

  const initialValues = {
    branchID: searchParams?.branchID ?? '',
    status: searchParams?.status ?? '',
    accountNumber: searchParams?.accountNumber ?? ''
  };

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      accountNumber: values.accountNumber ? values.accountNumber : '',
      status: values.status.toString().length > 0 ? values.status : '',
      branchID: values.branchID.toString().length > 0 ? values.branchID : null,
      getAll: false,
      pageSize: '10'
    };
    onSearch?.(params);
  };

  return (
    <Box marginTop={10}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(values) => onSubmit(values)}
        validationSchema={chequebookSchema}
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
                  <FormSelectField
                    customStyle={{
                      width: setWidth(),
                      ...inputFields
                    }}
                    name="branchID"
                    options={mappedBranches}
                    label="Branch Name"
                    required
                  />{' '}
                </Grid>
                <Grid
                  mb={{ tablet: 3 }}
                  item
                  mobile={12}
                  tablet={4}
                  justifyContent="center"
                >
                  <FormSelectField
                    customStyle={{
                      width: setWidth(),
                      ...inputFields
                    }}
                    name="status"
                    options={mappedStatus}
                    label="Status"
                    required
                  />{' '}
                </Grid>
                <Grid
                  mb={{ tablet: 6 }}
                  item
                  mobile={12}
                  tablet={4}
                  justifyContent="center"
                  marginTop={3}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(),
                      ...inputFields
                    }}
                    icon={<SearchIcon />}
                    name="accountNumber"
                    placeholder="Search by Account number"
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
