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
  BatchContainer,
  BatchTitle,
  PostingContainer,
  previewContentStyle
} from '@/features/Operation/Forms/style';
import { FormTextInput, TextInput } from '@/components/FormikFields';
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
  addGroup,
  addGroupMemberTitle
} from '@/features/CustomerService/Form/style';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { addGroup as addGroupSchema } from '@/schemas/customer-service';
import {
  addGroupInitialValues,
  addGroupMemberInitialValues
} from '@/schemas/schema-values/customer-service';
import {
  searchCustomer,
  useCreateGroup,
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

export const CreateGroup = () => {
  const { isLoading: isGlobalLoading } = useGlobalLoadingState();
  const toastActions = React.useContext(ToastMessageContext);
  const { setDirection } = useSetDirection();
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
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
  const { mutate, isError } = useCreateGroup();
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

    const mappedSearchResults = mapCustomerSearch(data?.customers);

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

  const mapGroups = (groupsArray: IGroup[], groupId: string) => {
    return groupsArray.map((group) => ({
      groupId,
      memberId: group.customerId
    }));
  };

  const onSubmit = async (values: any, actions: { resetForm: Function }) => {
    const groupId = values.groupID;
    mutate(values);

    const mapped = await mapGroups(groups, groupId);
    await groupMemberOnboarding({ list: [...mapped] });

    if (!isError) {
      actions.resetForm();
    }
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

  React.useEffect(() => {
    const submit = document.getElementById('submitButton');

    if (isSubmitting) {
      submit?.click();
    }

    return () => {
      setIsSubmitting(false);
    };
  }, [isSubmitting]);

  const triggerSubmission = () => {
    setIsSubmitting(true);
  };

  const actionButtons: any = [
    <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
      <PrimaryIconButton
        onClick={triggerSubmission}
        isLoading={isGlobalLoading}
        type="submit"
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
            initialValues={addGroupInitialValues}
            onSubmit={(values, actions) => onSubmit(values, actions)}
            validationSchema={addGroupSchema}
          >
            <Form>
              <Box
                sx={{ ...BatchContainer, height: '0px' }}
                ml={{ desktop: 1, mobile: 5 }}
              >
                <PageTitle title="Create Group" styles={BatchTitle} />
                <Grid container>
                  <Grid item={isTablet} mobile={12}>
                    <FormTextInput
                      name="groupID"
                      placeholder="Enter group code"
                      label="Group Code"
                      customStyle={{
                        width: setWidth(isMobile ? '250px' : '100%')
                      }}
                    />
                  </Grid>
                  <Grid item={isTablet} mobile={12}>
                    <FormTextInput
                      name="groupName"
                      placeholder="Enter group name"
                      label="Group Name"
                      customStyle={{
                        width: setWidth(isMobile ? '250px' : '100%')
                      }}
                    />
                  </Grid>
                  <Grid item={isTablet} mobile={12}>
                    <FormTextInput
                      name="groupdesc"
                      placeholder="Enter group description"
                      label="Group Description"
                      customStyle={{
                        width: setWidth(isMobile ? '250px' : '100%')
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
              <button
                id="submitButton"
                type="submit"
                style={{ display: 'none' }}
              >
                Hidden submit alias
              </button>
            </Form>
          </Formik>

          <Formik
            initialValues={addGroupMemberInitialValues}
            onSubmit={() => onGroupSubmit()}
          >
            <Form>
              <PageTitle
                title="Add Group Member"
                styles={addGroupMemberTitle}
              />
              <Box sx={addGroup} ml={{ desktop: 5, mobile: 5 }}>
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
