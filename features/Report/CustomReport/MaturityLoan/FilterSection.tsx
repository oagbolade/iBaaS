import React, { useMemo } from 'react';
import { Box, Stack, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Formik, Form } from 'formik';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { exportData, dateFilter, inputFields } from '../style';
import colors from '@/assets/colors';
import {
  ActionButtonWithPopper,
  ActionButton,
  BackButton
} from '@/components/Revamp/Buttons';
import { ExportIcon } from '@/assets/svg';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { IBranches } from '@/api/ResponseTypes/general';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { ISearchParams } from '@/app/api/search/route';
import { IBankProducts } from '@/api/ResponseTypes/customer-service';
import { maturityLoanSchema } from '@/schemas/reports';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

type Props = {
  branches?: IBranches[];
  bankproducts: IBankProducts[] | Array<any>;
  onSearch?: Function;
};

export const FilterSection = ({ branches, bankproducts, onSearch }: Props) => {
  const { searchParams } = usePersistedSearch<ISearchParams>(
    'maturity-loan-report'
  );
  const { setDirection } = useSetDirection();
  const { setWidth } = useCurrentBreakpoint();
  const { dateValue } = React.useContext(DateRangePickerContext);

  const { mappedBranches, mappedBankproducts } = useMapSelectOptions({
    branches,
    bankproducts
  });

  const formattedDateRange = useMemo(() => {
    const startMonthAndDay = `${dateValue?.[0]?.format('MMM') ?? ''} ${dateValue?.[0]?.format('DD') ?? ''}`;
    const endMonthAndDay = `${dateValue?.[1]?.format('MMM') ?? ''} ${dateValue?.[1]?.format('DD') ?? ''}`;
    return `${startMonthAndDay} - ${endMonthAndDay}`;
  }, [dateValue]);

  const initialValues = {
    branchID: searchParams?.branchID ?? '',
    prodCode: searchParams?.prodCode ?? '',
    searchWith: searchParams?.searchWith ?? ''
  };

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      branchID:
        values.branchID?.toString().trim().length > 0 ? values.branchID : null,
      searchWith:
        values.searchWith?.toString().trim().length > 0
          ? values.searchWith
          : null,
      prodCode:
        values.prodCode?.toString().trim().length > 0 ? values.prodCode : null,
      getAll: values.getAll
    };
    onSearch?.(params);
  };

  return (
    <Box marginTop={10}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(values) => onSubmit(values)}
        validationSchema={maturityLoanSchema}
      >
        <Form>
          <Box
            sx={{
              marginTop: '30px',
              paddingX: '24px'
            }}
          >
            <Grid container spacing={2}>
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
                  name="prodCode"
                  options={mappedBankproducts}
                  label="Product"
                  required
                />{' '}
              </Grid>

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
                mb={{ tablet: 6 }}
                item
                mobile={12}
                tablet={4}
                justifyContent="center"
              >
                <FormTextInput
                  customStyle={{
                    width: setWidth(),
                    ...inputFields
                  }}
                  icon={<SearchIcon />}
                  name="searchWith"
                  placeholder="Search by Account number or Account  Name"
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
        </Form>
      </Formik>
    </Box>
  );
};
