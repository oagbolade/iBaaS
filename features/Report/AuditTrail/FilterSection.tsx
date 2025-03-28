import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { Formik, Form } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { exportData, dateFilter } from './styles';
import { allBranchesStyle } from '@/features/Report/Overview/styles';
import { TextInput } from '@/components/FormikFields';
import colors from '@/assets/colors';
import { ChevronDown, ExportIcon } from '@/assets/svg';
import {
  ActionButtonWithPopper,
  ActionButton
} from '@/components/Revamp/Buttons';
import { labelTypography } from '@/components/FormikFields/styles';
import {
  Wrapper,
  branchOptions,
  selectButton
} from '@/features/Report/CustomReport/IncomeAssuranceReport/FilterSection';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { ISearchParams } from '@/app/api/search/route';
import { useCurrentBreakpoint } from '@/utils';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';

type Props = {
  onSearch?: Function;
};

export const FilterSection = ({ onSearch }: Props) => {
  const { setDirection } = useSetDirection();
  const { isMobile, setWidth } = useCurrentBreakpoint();

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      startDate: values.startDate?.trim().length > 0 ? values.startDate : null,
      endDate:
        values.endDate.toString().trim().length > 0 ? values.endDate : null
    };
    onSearch?.(params);
  };

  return (
    <Box>
      <Formik
        initialValues={searchFilterInitialValues}
        onSubmit={(values) => onSubmit(values)}
      >
        <Form>
          <Stack direction={setDirection()} justifyContent="end">
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
                  customStyle={{ ...dateFilter }}
                  name="startDate"
                  icon={
                    <CalendarTodayOutlinedIcon
                      sx={{
                        color: `${colors.Heading}`
                      }}
                    />
                  }
                  iconPosition="end"
                  buttonTitle="Aug 22 - Sep 23"
                />
              </Box>
            </Stack>
          </Stack>

          <Stack
            direction={setDirection()}
            ml={{ mobile: 4, tablet: 0 }}
            spacing={2}
          >
            <Wrapper>
              <Typography sx={labelTypography}>Module</Typography>
              <ActionButtonWithPopper
                searchGroupVariant="BasicSearchGroup"
                options={branchOptions}
                customStyle={{
                  ...allBranchesStyle,
                  ...selectButton
                }}
                icon={
                  <ChevronDown
                    color={`${colors.Heading}`}
                    props={{
                      position: 'relative',
                      marginRight: '70px',
                      width: '12px',
                      height: '12px'
                    }}
                  />
                }
                iconPosition="end"
                buttonTitle="Select"
              />
            </Wrapper>
            <Wrapper>
              <Typography sx={labelTypography}>Action</Typography>
              <ActionButtonWithPopper
                searchGroupVariant="BasicSearchGroup"
                options={branchOptions}
                customStyle={{ ...allBranchesStyle, ...selectButton }}
                icon={
                  <ChevronDown
                    color={`${colors.Heading}`}
                    props={{ width: '12px', height: '12px' }}
                  />
                }
                iconPosition="end"
                buttonTitle="Select"
              />
            </Wrapper>
            <Wrapper>
              <Typography sx={labelTypography}>User Id</Typography>
              <TextInput
                name="Search"
                placeholder="Search"
                icon={<SearchIcon />}
                customStyle={{
                  width: setWidth(isMobile ? '240px' : '600px'),
                  marginTop: '10px'
                }}
              />
            </Wrapper>

            <Box>
              <ActionButton
                customStyle={{
                  backgroundColor: `${colors.activeBlue400}`,
                  border: `1px solid ${colors.activeBlue400}`,
                  color: `${colors.white}`,
                  marginTop: '35px'
                }}
                buttonTitle="Search"
                type="submit"
              />
            </Box>
          </Stack>
        </Form>
      </Formik>
    </Box>
  );
};
