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
import { IBankProducts, IGroup } from '@/api/ResponseTypes/customer-service';
import { weeklyLoanRepaySchema } from '@/schemas/reports';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';

type Props = {
  branches?: IBranches[];
  bankproducts: IBankProducts[] | Array<any>;
  groups: IGroup[];
  onSearch?: Function;
};

export const FilterSection = ({
  branches,
  bankproducts,
  groups,
  onSearch
}: Props) => {
  const { setDirection } = useSetDirection();
  const { setWidth } = useCurrentBreakpoint();
  const { dateValue } = React.useContext(DateRangePickerContext);

  const { mappedBranches, mappedBankproducts, mappedGroups } =
    useMapSelectOptions({
      branches,
      bankproducts,
      groups
    });

  const formattedDateRange = useMemo(() => {
    const startMonthAndDay = `${dateValue?.[0]?.format('MMM') ?? ''} ${dateValue?.[0]?.format('DD') ?? ''}`;
    const endMonthAndDay = `${dateValue?.[1]?.format('MMM') ?? ''} ${dateValue?.[1]?.format('DD') ?? ''}`;
    return `${startMonthAndDay} - ${endMonthAndDay}`;
  }, [dateValue]);

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
      getAll: values.getAll,
      groupId:
        values.groupId?.toString().trim().length > 0 ? values.groupId : null
    };
    onSearch?.(params);
  };

  return (
    <Formik
      initialValues={searchFilterInitialValues}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={weeklyLoanRepaySchema}
    >
      <Form>
        <Box
          sx={{
            marginTop: '30px',
            paddingX: '24px'
          }}
        >
          <Grid container spacing={2.5}>
            <Grid item mobile={12} tablet={2.5} justifyContent="center">
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
              mb={{ tablet: 2.5 }}
              item
              mobile={12}
              tablet={2.5}
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

            <Grid
              mb={{ tablet: 2.5 }}
              item
              mobile={12}
              tablet={2.5}
              justifyContent="center"
            >
              <FormSelectField
                customStyle={{
                  width: setWidth(),
                  ...inputFields
                }}
                name="groupId"
                options={mappedGroups}
                label="Group"
              />{' '}
            </Grid>

            <Grid
              mb={{ tablet: 3.5 }}
              item
              mobile={12}
              tablet={3.5}
              justifyContent="center"
            >
              <FormTextInput
                customStyle={{
                  width: setWidth(),
                  ...inputFields
                }}
                icon={<SearchIcon />}
                name="searchWith"
                placeholder="Search by Account number"
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
  );
};
