import React from 'react';
import { Box, Typography, Stack, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { exportData } from '../../AuditTrail/styles';
import {
  transactionVolumeStyle,
  allBranchesStyle
} from '@/features/Report/Overview/styles';
import {
  FormSelectField,
  FormTextInput,
  TextInput
} from '@/components/FormikFields';
import colors from '@/assets/colors';
import {
  ActionButtonWithPopper,
  ActionButton,
  BackButton
} from '@/components/Revamp/Buttons';
import { ChevronDown, ExportIcon } from '@/assets/svg';
import { labelTypography } from '@/components/FormikFields/styles';
import { dateFilter, inputFields } from '@/features/Report/CustomReport/style';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { useCurrentBreakpoint } from '@/utils';
import { IBranches } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { ISearchParams } from '@/app/api/search/route';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

type Props = {
  branches?: IBranches[];
  onSearch?: Function;
};
export const FilterSection = ({ branches, onSearch }: Props) => {
  const { searchParams } = usePersistedSearch<ISearchParams>(
    'standing-instruction'
  );
  const { setDirection } = useSetDirection();
  const { setWidth } = useCurrentBreakpoint();
  const { mappedBranches } = useMapSelectOptions({
    branches
  });
  const initialValues = {
    branchID: searchParams?.branchID ?? '',
    searchWith: searchParams?.searchWith ?? '',
    startDate: searchParams?.startDate ?? '',
    endDate: searchParams?.endDate ?? ''
  };
  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      branchID:
        values.branchID?.toString().trim().length > 0 ? values.branchID : '',
      searchWith:
        values.searchWith?.toString().trim().length > 0
          ? values.searchWith
          : '',
      startDate:
        values.startDate.toString().trim().length > 0 ? values.startDate : '',
      endDate: values.endDate.toString().trim().length > 0 ? values.endDate : ''
    };
    onSearch?.(params);
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values) => onSubmit(values)}
    >
      <Form>
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
            mb={{ tablet: 7 }}
            item
            mobile={12}
            tablet={7}
            justifyContent="center"
          >
            <FormTextInput
              customStyle={{
                width: setWidth(),
                ...inputFields
              }}
              icon={<SearchIcon />}
              name="searchWith"
              placeholder="Search by accountnumber or account title"
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
      </Form>
    </Formik>
  );
};
