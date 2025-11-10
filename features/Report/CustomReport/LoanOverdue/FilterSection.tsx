import React, { ChangeEvent, useMemo, useState } from 'react';
import { Box, Grid, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { DateCalendar } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { dateFilter, exportData, inputFields } from '../style';
import { buttonBackgroundColor } from '../AccountEnquiry/style';
import {
  FormSelectField,
  FormSelectInput,
  FormTextInput,
  TextInput
} from '@/components/FormikFields';
import {
  ActionButton,
  ActionButtonWithPopper,
  BackButton
} from '@/components/Revamp/Buttons';
import { IBranches } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { LoanOverdueParams } from '@/api/reports/useGetLoanOverdueReport';
import { IBankProducts } from '@/api/ResponseTypes/customer-service';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { ExportIcon } from '@/assets/svg';
import colors from '@/assets/colors';
import useFormattedDates from '@/utils/hooks/useFormattedDates';
import { useCurrentBreakpoint } from '@/utils';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { Form, Formik } from 'formik';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';

type Props = {
  branches?: IBranches[];
  onSearch: (params: LoanOverdueParams | null) => void;
  bankproducts: IBankProducts[] | Array<any>;
};

export const FilterSection = ({ branches, onSearch, bankproducts }: Props) => {
  const { searchParams } =
    usePersistedSearch<LoanOverdueParams>('loan-overdue');
  const { setDirection } = useSetDirection();
  const { dateValue, setDateValue } = React.useContext(DateRangePickerContext);
  const endDate = dateValue[1];
  const { setWidth } = useCurrentBreakpoint();

  const { mappedBranches, mappedBankproducts } = useMapSelectOptions({
    branches,
    bankproducts
  });

  const initialValues = {
    branch: searchParams?.branch ?? '',
    product: searchParams?.product ?? '',
    search: searchParams?.search ?? '',
    reportDate: searchParams?.reportDate ?? ''
  };

  const onSubmit = async (values: any) => {
    const params: LoanOverdueParams = {
      branch: values.branch.toString().length > 0 ? values.branch : null,
      product: values.product.length > 0 ? values.product : undefined,
      search: values.search.length > 0 ? values.search : undefined,
      reportDate: endDate?.format('YYYY-MM-DD')
    };
    onSearch?.(params);
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values) => onSubmit(values)}
    >
      {() => (
        <Form>
          <Box>
            <Stack
              sx={{
                position: 'sticky',
                top: '60px',
                zIndex: 3,
                backgroundColor: `${colors.white}`,
                borderLeft: `1px solid ${colors.loanTitleColor}`,
                borderBottom: `1px solid ${colors.loanTitleColor}`,
                paddingLeft: '10px',
                paddingRight: '10px'
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

                <Box>
             <ActionButtonWithPopper
                           searchGroupVariant="DateRangePicker"
                           CustomDateRangePicker={
                             <DateCalendar
                               value={endDate}
                               onChange={(date) =>
                                 setDateValue([dateValue[0], date], { allowSingle: true })
                               }
                             />
                           }
                           customStyle={{ ...dateFilter }}
                           icon={
                             <CalendarTodayOutlinedIcon
                               sx={{
                                 color: `${colors.Heading}`
                               }}
                             />
                           }
                           iconPosition="end"
                           buttonTitle={endDate?.format('YYYY-MM-DD')}
                         />               
                         </Box>
              </Stack>
            </Stack>

            <Box
              sx={{
                marginTop: '30px',
                paddingX: '24px'
              }}
            >
              <Box>
                <Grid container spacing={2}>
                  <Grid item mobile={12} tablet={3}>
                    <FormSelectField
                      customStyle={{
                        width: setWidth(),
                        ...inputFields
                      }}
                      name="branch"
                      options={mappedBranches}
                      label="Branch Name"
                      required
                    />
                  </Grid>

                  <Grid item mobile={12} tablet={3}>
                    <FormSelectField
                      customStyle={{
                        width: setWidth(),
                        ...inputFields
                      }}
                      name="product"
                      options={mappedBankproducts}
                      label="Product"
                    />
                  </Grid>

                  <Grid item mobile={12} tablet={4}>
                    <FormTextInput
                      customStyle={{
                        width: setWidth(),
                        ...inputFields
                      }}
                      icon={<SearchIcon />}
                      name="search"
                      placeholder="Search for Account Number"
                      label="Search for Account Number"
                    />{' '}
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
                      type="submit"
                      customStyle={buttonBackgroundColor}
                      buttonTitle="Search"
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
