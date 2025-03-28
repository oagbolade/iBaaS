'use client';
import React from 'react';
import { Box, Stack, Grid } from '@mui/material';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from '@tanstack/react-query';
import {
  GroupsPreviewSection,
  IGroup
} from '@/features/CustomerService/Group/CreateGroup/GroupsPreviewSection';
import { PageTitle } from '@/components/Typography';
import {
  BatchTitle,
  PostingContainer,
  previewContentStyle
} from '@/features/Operation/Forms/style';
import { TextInput } from '@/components/FormikFields';
import { CustomStyleI } from '@/constants/types';
import { useCurrentBreakpoint } from '@/utils';
import { TopActionsArea } from '@/components/Revamp/Shared';
import {
  ActionButton,
  ActionButtonWithPopper
} from '@/components/Revamp/Buttons';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  submitButton,
  cancelButton
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { MobileModalContainer } from '@/components/Revamp/Modal/mobile/ModalContainer';
import { AddIcon } from '@/assets/svg';
import { StyledSearchableDropdown } from '@/features/CustomerService/Form/CreateAccount';
import { OptionsI } from '@/components/FormikFields/FormSelectField';
import {
  dropDownWithSearch,
  addGroup
} from '@/features/CustomerService/Form/style';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { addGroupMemberInitialValues } from '@/schemas/schema-values/customer-service';
import {
  searchCustomer,
  useGroupMemberOnboarding
} from '@/api/customer-service/useCustomer';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { mapCustomerSearch } from '@/utils/mapCustomerSearch';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { queryKeys } from '@/react-query/constants';
import {
  extractIdFromDropdown,
  extractNameFromDropdown
} from '@/utils/extractIdFromDropdown';
import { useGetParams } from '@/utils/hooks/useGetParams';

export const StyledContainer = styled.div`
  form {
    height: 0;
  }
`;

type Props = {
  PreviewContent: any;
  customStyle?: CustomStyleI;
};

type SearchFilters = {
  customerId: string | OptionsI[];
  [key: string]: any;
};

export const MobilePreviewContent = ({
  PreviewContent,
  customStyle
}: Props) => {
  return (
    <MobileModalContainer
      ShowPreview={PreviewContent}
      customStyle={{ ...previewContentStyle, ...customStyle }}
    />
  );
};

export const AddGroupMembersForm = () => {
  const { isLoading: isGlobalLoading } = useGlobalLoadingState();
  const toastActions = React.useContext(ToastMessageContext);
  const { setDirection } = useSetDirection();
  const groupId = useGetParams('groupId') || '';
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const [groups, setGroups] = React.useState<IGroup[]>([]);
  const [selectedValue, setSelectedValue] = React.useState<SearchFilters>({
    customerId: ''
  });
  const [selectedName, setSelectedName] = React.useState<string>('');
  const [searchValue, setSearchValue] = React.useState<SearchFilters>({
    customerId: ''
  });
  const [filteredValues, setFilteredValues] = React.useState<SearchFilters>({
    customerId: []
  });

  const { mutate: groupMemberOnboarding } = useGroupMemberOnboarding();
  const handleSetGroups = (group: IGroup[]) => {
    setGroups(group);
  };

  const handleSelectedValue = (value: string, name: string) => {
    setSelectedName(extractNameFromDropdown(value) as string);
    setSelectedValue((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const { data, isLoading: isSearchLoading } = useQuery({
    queryKey: [queryKeys.searchCustomer, searchValue],
    queryFn: () =>
      searchCustomer(toastActions, searchValue.customerId as string),
    enabled: Boolean(searchValue.customerId.length > 0)
  });

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setSearchValue((prev) => ({
      ...prev,
      [name]: value
    }));

    const mappedSearchResults = mapCustomerSearch(data?.accountDetailsResults);

    setFilteredValues((prev) => ({
      ...prev,
      [name]: mappedSearchResults
    }));

    if (value.trim().length === 0) {
      setFilteredValues({
        customerId: []
      });
    }
  };

  const mapGroups = (groupsArray: IGroup[], curentGroupId: string) => {
    return groupsArray.map((group) => ({
      groupId: curentGroupId,
      memberId: group.customerId
    }));
  };

  const onGroupSubmit = () => {
    const group: IGroup = {
      customerName: selectedName,
      customerId: extractIdFromDropdown(
        selectedValue.customerId as string
      ) as string
    };

    setGroups((prev) => [...prev, group]);
    setSelectedValue({ customerId: '' });
    setSelectedName('');
  };

  const addGroupMembers = async () => {
    const mapped = await mapGroups(groups, groupId);
    await groupMemberOnboarding({ list: [...mapped] });
  };

  const actionButtons: any = [
    <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
      <PrimaryIconButton
        onClick={addGroupMembers}
        isLoading={isGlobalLoading}
        buttonTitle="Submit"
        customStyle={{ ...submitButton }}
      />
    </Box>
  ];

  return (
    <StyledContainer>
      <Box sx={{ marginTop: '25px' }}>
        <TopActionsArea actionButtons={actionButtons} />
      </Box>
      <Stack direction={setDirection()} justifyContent="space-between">
        <Grid container spacing={2} sx={{ width: '700px' }}>
          <Formik
            initialValues={addGroupMemberInitialValues}
            onSubmit={() => onGroupSubmit()}
          >
            <Form>
              <Box sx={addGroup} mt={6} ml={{ desktop: 5, mobile: 5 }}>
                <PageTitle title="Add Group Member" styles={BatchTitle} />
                <Grid container sx={{ width: '100%' }}>
                  <Grid item={isTablet} mobile={12}>
                    <StyledSearchableDropdown>
                      <ActionButtonWithPopper
                        loading={isSearchLoading}
                        handleSelectedValue={(value: string) =>
                          handleSelectedValue(value, 'customerId')
                        }
                        label="Customer Name"
                        name="customerId"
                        searchGroupVariant="BasicSearchGroup"
                        dropDownOptions={
                          filteredValues.customerId as OptionsI[]
                        }
                        customStyle={{ ...dropDownWithSearch, width: '500px' }}
                        icon={<SearchIcon />}
                        iconPosition="end"
                        buttonTitle={
                          (selectedValue.customerId as string) ||
                          'Search Customer Name'
                        }
                        onChange={handleSearch}
                        searchValue={searchValue.customerId as string}
                      />
                    </StyledSearchableDropdown>
                  </Grid>
                  <Grid item={isTablet} mobile={12}>
                    <TextInput
                      name="customerName"
                      placeholder="Enter customer name"
                      label="Customer Name"
                      customStyle={{
                        width: setWidth(isMobile ? '250px' : '500px')
                      }}
                      disabled
                      value={selectedName}
                    />
                    <ActionButton
                      type="submit"
                      icon={<AddIcon />}
                      customStyle={{
                        ...cancelButton,
                        marginTop: '20px'
                      }}
                      buttonTitle="Add"
                      iconPosition="start"
                    />
                  </Grid>
                </Grid>
              </Box>
            </Form>
          </Formik>
        </Grid>

        <Box sx={PostingContainer}>
          {isMobile ? (
            <MobilePreviewContent
              PreviewContent={
                <GroupsPreviewSection
                  groups={groups}
                  handleSetGroups={handleSetGroups}
                />
              }
            />
          ) : (
            <GroupsPreviewSection
              groups={groups}
              handleSetGroups={handleSetGroups}
            />
          )}
        </Box>
      </Stack>
    </StyledContainer>
  );
};
