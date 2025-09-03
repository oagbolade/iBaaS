import React, { useEffect } from 'react';
import { Box, Grid, AlertColor } from '@mui/material';
import { Formik, Form } from 'formik';
import { useSearchParams } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { FormTextInput, FormSelectField } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { FormSkeleton } from '@/components/Loaders';
import { ActionButtonWithPopper } from '@/components/Revamp/Buttons';
import { IBranches } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { IAccountOfficers, IGLAccount } from '@/api/ResponseTypes/admin';
import { OptionsI } from '@/components/FormikFields/FormSelectField';
import { filterDropdownSearch } from '@/utils/filterDropdownSearch';
import { dropDownWithSearch } from '@/features/CustomerService/Form/style';
import { toast } from '@/utils/toast';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { useCreateGroup, useGetGroupById } from '@/api/setup/useGroup';
import { createGroupInitialValues } from '@/schemas/schema-values/setup';
import { createGroupSchema } from '@/schemas/setup';
import {
  extractIdFromDropdown,
  extractNameFromDropdown
} from '@/utils/extractIdFromDropdown';
import { decryptData } from '@/utils/decryptData';

type Props = {
  isSubmitting: boolean;
  setIsSubmitting: Function;
  branches?: IBranches[] | Array<any>;
  officers?: IAccountOfficers[];
  bankgl?: IGLAccount[] | Array<any>;
  groupId?: string | null;
};

type SearchFilters = {
  secretary?: string | OptionsI[];
  acctOfficer?: string | OptionsI[];
  [key: string]: any;
  groupHead?: string | OptionsI[];
};

const StyledSearchableDropdown = styled.div`
  .MuiButtonBase-root {
    display: flex;
    justify-content: space-between;
  }

  .MuiPaper-root {
    > div {
      width: 560px;
    }

    .MuiPaper-root {
      > div {
        width: 560px;
      }
    }

    .MuiButton-endIcon > *:nth-of-type(1) {
      font-size: 32px;
    }
  }
`;

export const CreateGroupForm = ({
  branches,
  officers,
  isSubmitting,
  setIsSubmitting,
  groupId,
  bankgl
}: Props) => {
  const toastActions = React.useContext(ToastMessageContext);
  const { mappedAccountOfficers, mappedBranches, mappedGlAccount } =
    useMapSelectOptions({
      officers,
      branches,
      bankgl
    });
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');
  const { group, isLoading } = useGetGroupById(
    decryptData(groupId as string) || null
  );
  const { mutate } = useCreateGroup(
    Boolean(isEditing),
    decryptData(groupId as string)
  );

  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const [selectedValue, setSelectedValue] = React.useState<SearchFilters>({
    acctOfficer: '',
    groupHead: ''
  });
  const [searchValue, setSearchValue] = React.useState<SearchFilters>({
    secretary: '',
    acctOfficer: '',
    groupHead: ''
  });

  const [filteredValues, setFilteredValues] = React.useState<SearchFilters>({
    acctOfficer: [],
    secretary: [],
    groupHead: []
  });

  useEffect(() => {
    if (isEditing && group) {
      setSelectedValue({
        acctOfficer: group.acctOfficer || '',
        groupHead: group.groupHead || '',
        secretary: group.secretary || ''
      });
      setSearchValue({
        acctOfficer: group.acctOfficer || '',
        groupHead: group.groupHead || '',
        secretary: group.secretary || ''
      });
      setFilteredValues({
        acctOfficer: mappedAccountOfficers,
        secretary: mappedAccountOfficers,
        groupHead: mappedAccountOfficers
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing, group, mappedAccountOfficers]);

  const onSubmit = async (values: any) => {
    const toastMessage = {
      title: 'Validation error',
      severity: 'error',
      acctOfficer: {
        message: 'Account officer is required'
      },
      groupHead: {
        message: 'Group Leader Name is required'
      },
      secretary: {
        message: 'secretary Name is required'
      }
    };
    if (selectedValue.acctOfficer === '') {
      toast(
        toastMessage.acctOfficer.message,
        toastMessage.title,
        toastMessage.severity as AlertColor,
        toastActions
      );

      return;
    }
    if (selectedValue.secretary === '') {
      toast(
        toastMessage.secretary.message,
        toastMessage.title,
        toastMessage.severity as AlertColor,
        toastActions
      );

      return;
    }
    if (selectedValue.groupHead === '') {
      toast(
        toastMessage.groupHead.message,
        toastMessage.title,
        toastMessage.severity as AlertColor,
        toastActions
      );

      return;
    }

    const getAllValues = {
      ...values,
      secretary: extractNameFromDropdown(selectedValue.secretary as string),
      acctOfficer: extractIdFromDropdown(selectedValue.acctOfficer as string),
      groupHead: extractIdFromDropdown(selectedValue.groupHead as string)
    };
    await mutate(getAllValues);
  };

  useEffect(() => {
    const submit = document.getElementById('submitButton');

    if (isSubmitting) {
      submit?.click();
    }

    return () => {
      setIsSubmitting(false);
    };
  }, [isSubmitting]);

  const handleSelectedValue = (value: string, name: string) => {
    setSelectedValue((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setSearchValue((prev) => ({
      ...prev,
      [name]: value
    }));

    const filteredItems = filterDropdownSearch(mappedAccountOfficers, value);

    setFilteredValues((prev) => ({
      ...prev,
      [name]: filteredItems
    }));

    if (value.trim().length === 0) {
      setFilteredValues({
        secretary: mappedAccountOfficers,
        acctOfficer: mappedAccountOfficers,
        groupHead: mappedAccountOfficers
      });
    }
  };

  if (isEditing && isLoading) {
    return <FormSkeleton noOfLoaders={5} />;
  }

  return (
    <Box>
      <Box>
        <LargeTitle title={`${isEditing ? 'Edit' : 'Create'} Group`} />
      </Box>
      <Box
        sx={{
          justifyContent: { mobile: 'center' },
          alignItems: { mobile: 'center' }
        }}
      >
        <Formik
          initialValues={
            isEditing
              ? {
                  ...group,
                  secretary: group?.secretary,
                  acctOfficer: group?.acctOfficer,
                  GroupHead: group?.groupHead
                }
              : createGroupInitialValues
          }
          onSubmit={(values) => onSubmit(values)}
          validationSchema={createGroupSchema}
        >
          <Form>
            <Box mt={4}>
              <Grid container>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%')
                    }}
                    name="groupName"
                    placeholder="Enter group name"
                    label="Group Name"
                    required
                  />{' '}
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <StyledSearchableDropdown>
                    <ActionButtonWithPopper
                      handleSelectedValue={(value: string) =>
                        handleSelectedValue(value, 'acctOfficer')
                      }
                      label="Account Officer"
                      name="acctOfficer"
                      searchGroupVariant="BasicSearchGroup"
                      dropDownOptions={filteredValues.acctOfficer as OptionsI[]}
                      customStyle={{ ...dropDownWithSearch, width: '440px' }}
                      icon={<SearchIcon />}
                      iconPosition="end"
                      buttonTitle={
                        (selectedValue.acctOfficer as string) || 'Search'
                      }
                      onChange={handleSearch}
                      searchValue={searchValue.acctOfficer as string}
                    />
                  </StyledSearchableDropdown>
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%')
                    }}
                    name="groupAddress"
                    placeholder="Enter group address"
                    label="Address"
                    required
                  />{' '}
                </Grid>
                <Grid mb={1} item={isTablet} mobile={12}>
                  <FormSelectField
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%'),
                      fontSize: '14px'
                    }}
                    name="branchcode"
                    options={mappedBranches}
                    label="Choose Branch"
                  />{' '}
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%')
                    }}
                    name="memberLimit"
                    placeholder="Enter member limit"
                    label="Member Limit"
                    required
                  />{' '}
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%')
                    }}
                    name="groupEmail"
                    placeholder="Enter Group Email"
                    label="Group Email"
                    required
                  />{' '}
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%')
                    }}
                    name="grouplimit"
                    placeholder="Enter Group Account Limit"
                    label="Group Account Limit"
                    required
                  />{' '}
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%')
                    }}
                    name="partLimit"
                    placeholder="Enter participation limit"
                    label="Participation Limit"
                    required
                  />{' '}
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <StyledSearchableDropdown>
                    <ActionButtonWithPopper
                      handleSelectedValue={(value: string) =>
                        handleSelectedValue(value, 'groupHead')
                      }
                      label="Group Leader Name"
                      name="groupHead"
                      searchGroupVariant="BasicSearchGroup"
                      dropDownOptions={filteredValues.groupHead as OptionsI[]}
                      customStyle={{ ...dropDownWithSearch, width: '440px' }}
                      icon={<SearchIcon />}
                      iconPosition="end"
                      buttonTitle={
                        (selectedValue.groupHead as string) || 'Search'
                      }
                      onChange={handleSearch}
                      searchValue={searchValue.groupHead as string}
                    />
                  </StyledSearchableDropdown>
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%')
                    }}
                    name="groupPhone"
                    placeholder="Enter group leader phone number"
                    label="Group Leader Phone Number"
                    required
                  />{' '}
                </Grid>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <StyledSearchableDropdown>
                    <ActionButtonWithPopper
                      handleSelectedValue={(value: string) =>
                        handleSelectedValue(value, 'secretary')
                      }
                      label="Secretary Name"
                      name="secretary"
                      searchGroupVariant="BasicSearchGroup"
                      dropDownOptions={filteredValues.secretary as OptionsI[]}
                      customStyle={{ ...dropDownWithSearch, width: '440px' }}
                      icon={<SearchIcon />}
                      iconPosition="end"
                      buttonTitle={
                        (selectedValue.secretary as string) ||
                        'Search Secretary Name'
                      }
                      onChange={handleSearch}
                      searchValue={searchValue.secretary as string}
                    />
                  </StyledSearchableDropdown>
                </Grid>

                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                >
                  <FormTextInput
                    customStyle={{
                      width: setWidth(isMobile ? '285px' : '100%')
                    }}
                    name="secretaryPhone"
                    placeholder="Enter secretary phone number"
                    label="Secretary Phone Number"
                    required
                  />{' '}
                </Grid>
              </Grid>
            </Box>
            <button id="submitButton" type="submit" style={{ display: 'none' }}>
              submit alias
            </button>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};
