import React from 'react';
import { Box, Grid, Stack } from '@mui/material';
import { Formik, Form } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import { exportData, inputFields } from '../style';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import colors from '@/assets/colors';
import {
  ActionButtonWithPopper,
  ActionButton,
  BackButton
} from '@/components/Revamp/Buttons';
import { ExportIcon } from '@/assets/svg';
import { searchFilterInitialValues } from '@/schemas/schema-values/common';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { useCurrentBreakpoint } from '@/utils';
import { IBranches } from '@/api/ResponseTypes/general';
import { ISearchParams } from '@/app/api/search/route';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { groupMembershipSchema } from '@/schemas/reports';
import { IGroup } from '@/api/ResponseTypes/customer-service';
import { IAccountOfficers } from '@/api/ResponseTypes/admin';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

type Props = {
  branches?: IBranches[];
  officers?: IAccountOfficers[];
  groups: IGroup[];
  onSearch?: Function;
};

export const FilterSection = ({
  branches,
  officers,
  groups,
  onSearch
}: Props) => {
  const { searchParams } =
    usePersistedSearch<ISearchParams>('group-membership');
  const { setDirection } = useSetDirection();
  const { setWidth } = useCurrentBreakpoint();
  const { mappedBranches, mappedAccountOfficers, mappedGroups } =
    useMapSelectOptions({
      branches,
      officers,
      groups
    });

  const initialValues = {
    branchID: searchParams?.branchID ?? '',
    groupId: searchParams?.groupId ?? '',
    officerCode: searchParams?.officerCode ?? '',
    searchWith: searchParams?.searchWith ?? ''
  };

  const onSubmit = async (values: any) => {
    const params: ISearchParams = {
      branchID:
        values.branchID?.toString().trim().length > 0 ? values.branchID : null,
      groupId:
        values.groupId?.toString().trim().length > 0 ? values.groupId : '000',
      officerCode:
        values.officerCode?.toString().trim().length > 0
          ? values.officerCode
          : '000',
      searchWith:
        values.searchWith?.toString().trim().length > 0
          ? values.searchWith
          : null,
      pageSize: '10'
    };
    onSearch?.(params);
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values) => onSubmit(values)}
      validationSchema={groupMembershipSchema}
    >
      <Form>
        <Box
          sx={{
            marginTop: '20px',
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
                  name="officerCode"
                  options={mappedAccountOfficers}
                  label="Officer ID"
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
                  label="Group Name"
                />{' '}
              </Grid>

              <Grid
                mb={{ tablet: 4 }}
                item
                mobile={12}
                tablet={3}
                justifyContent="center"
                marginTop={3}
              >
                <FormTextInput
                  customStyle={{
                    width: setWidth(),
                    ...inputFields
                  }}
                  icon={<SearchIcon />}
                  name="searchWith"
                  placeholder="Search by group name or group id"
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
  );
};
