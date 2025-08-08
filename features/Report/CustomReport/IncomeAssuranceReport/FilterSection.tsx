import React from 'react';
import { Box, Typography, Stack, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import { Form, Formik } from 'formik';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { exportData } from '../../AuditTrail/styles';
import { inputFields } from './style';
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
import { dateFilter } from '@/features/Report/CustomReport/style';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { useCurrentBreakpoint } from '@/utils';
import {
  IBranches,
  IIAReportType,
  IProductType
} from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { ISearchParams } from '@/app/api/search/route';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';

export const Wrapper = styled.section`
  margin-right: 20px;
  width: 120%;

  /* move the icon towards the end so it looks like a select */
  span {
    margin-left: 150px;
  }
`;

export const branchOptions = [
  'All',
  'ID-475747  Gbagada Branch',
  'ID-475748  Festac Branch',
  'ID-475749  Yaba Branch',
  'ID-475750  Coker Branch',
  'ID-475751  Somolu Branch'
];

export const selectButton = {
  width: '120%',
  height: '56px',
  marginTop: '10px',
  color: `${colors.neutral600}`,
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '20px'
};

type Props = {
  branches?: IBranches[];
  onSearch?: Function;
  productTypes?: IProductType[] | Array<any>;
  iAReportType?: IIAReportType[] | Array<any>;
};
export const FilterSection = ({
  branches,
  onSearch,
  productTypes,
  iAReportType
}: Props) => {
  const { setDirection } = useSetDirection();
  const { isMobile, setWidth } = useCurrentBreakpoint();
  const { mappedBranches, mappedIAReportType } = useMapSelectOptions({
    branches,
    productTypes,
    iAReportType
  });

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      branchID: values.branchID?.toString().length > 0 ? values.branchID : null,
      reportType:
        values.reportType?.toString().length > 0 ? values.reportType : null,
      search: values.search?.toString().length > 0 ? values.search : null,
      startDate:
        values.startDate.toString().length > 0 ? values.startDate : null,
      endDate: values.endDate.toString().length > 0 ? values.endDate : null
    };
    onSearch?.(params);
  };

  return (
    <Box marginTop={10}>
      <Formik
        initialValues={searchFilterInitialValues}
        onSubmit={(values) => onSubmit(values)}
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
                      ...inputFields,
                      width: setWidth()
                    }}
                    name="reportType"
                    options={mappedIAReportType}
                    label="Report Type"
                    required
                  />
                </Grid>
                <Grid item mobile={12} tablet={3} justifyContent="center">
                  <FormSelectField
                    customStyle={{
                      ...inputFields,
                      width: setWidth()
                    }}
                    name="branchID"
                    options={mappedBranches}
                    label="Branch Name"
                    required
                  />
                </Grid>

                <Grid
                  mb={{ tablet: 6 }}
                  item
                  mobile={12}
                  tablet={5}
                  justifyContent="center"
                >
                  <FormTextInput
                    customStyle={{
                      ...inputFields,
                      width: setWidth()
                    }}
                    icon={<SearchIcon />}
                    name="search"
                    placeholder="Search by Account Number"
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
