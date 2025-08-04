'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form } from 'formik';
import { PreviewAccountOfficerTransferSection } from '../OfficerTransfer/TransferOfficer/PreviewAccountOfficerTransferSection';
import { AssignedCustomersSection } from '../OfficerTransfer/TransferOfficer/AssignedCustomersSection';
import { StyledSearchableDropdown } from './CreateAccount';
import { dropDownWithSearch } from './style';
import { PageTitle } from '@/components/Typography';
import {
  BatchContainer,
  BatchTitle,
  PostingContainer,
  previewContentStyle
} from '@/features/Operation/Forms/style';
import { FormikRadioButton, FormTextInput } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { PrimaryIconButton } from '@/components/Buttons';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { MobileModalContainer } from '@/components/Revamp/Modal/mobile/ModalContainer';
import {
  useGetAccountOfficerByCode,
  useTransferAccountOfficer
} from '@/api/admin/useAccountOfficer';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { officerTransferSchema } from '@/schemas/customer-service';
import { officerTransferInitialValues } from '@/schemas/schema-values/customer-service';
import { getStoredUser } from '@/utils/user-storage';
import { ActionButtonWithPopper } from '@/components/Revamp/Buttons';
import { SearchIcon } from '@/assets/svg';
import { OptionsI } from '@/components/FormikFields/FormSelectField';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { filterDropdownSearch } from '@/utils/filterDropdownSearch';
import { IAccountOfficers, IMParam } from '@/api/ResponseTypes/admin';
import {
  extractIdFromDropdown,
  extractNameFromDropdown
} from '@/utils/extractIdFromDropdown';
import { getCurrentIsoDate } from '@/utils/getCurrentDate';
import { encryptData } from '@/utils/encryptData';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <PrimaryIconButton
      type="submit"
      buttonTitle="Submit"
      customStyle={{ ...submitButton }}
    />
  </Box>
];

type Props = {
  PreviewContent: any;
};

export const MobilePreviewContent = ({ PreviewContent }: Props) => {
  return (
    <MobileModalContainer
      ShowPreview={PreviewContent}
      customStyle={{ ...previewContentStyle }}
    />
  );
};

type TransferOfficerProps = {
  officers?: IAccountOfficers[];
};

type SearchFilters = {
  transferFromAcctOfficer?: string | OptionsI[];
  transferToAcctOfficer?: string | OptionsI[];
  [key: string]: any;
};

export const TransferOfficer = ({ officers }: TransferOfficerProps) => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const transferFromId = useGetParams('transferFromId');
  const { mutate } = useTransferAccountOfficer();

  const [selectedValue, setSelectedValue] = React.useState<SearchFilters>({
    transferFromAcctOfficer: '',
    transferToAcctOfficer: ''
  });

  const [filteredValues, setFilteredValues] = React.useState<SearchFilters>({
    transferToAcctOfficer: [],
    transferFromAcctOfficer: []
  });

  const [searchValue, setSearchValue] = React.useState<SearchFilters>({
    transferFromAcctOfficer: '',
    transferToAcctOfficer: ''
  });

  const [customerAccountsCheckList, setCustomerAccountsCheckList] =
    React.useState<IMParam[]>([]);

  const { officer: officerFromInformation, isLoading: isOfficerFromLoading } =
    useGetAccountOfficerByCode(
      encryptData(
        transferFromId ||
          (extractIdFromDropdown(
            selectedValue.transferFromAcctOfficer as string
          ) as string)
      ) || ''
    );
  const { officer: officerToInformation, isLoading: isOfficerToLoading } =
    useGetAccountOfficerByCode(
      encryptData(
        extractIdFromDropdown(
          selectedValue.transferToAcctOfficer as string
        ) as string
      ) || ''
    );
  const { mappedAccountOfficers } = useMapSelectOptions({
    officers
  });

  const populateOfficerNameOrCode = (
    type: 'officerCode' | 'officerName'
  ): string => {
    if (transferFromId && type === 'officerName') {
      return officerFromInformation?.officerName || 'N/A';
    }

    if (transferFromId && type === 'officerCode') {
      return officerFromInformation?.officercode || 'N/A';
    }

    if (type === 'officerCode') {
      return (
        extractIdFromDropdown(
          selectedValue.transferFromAcctOfficer as string
        ) || ''
      );
    }

    if (type === 'officerName') {
      return (
        extractNameFromDropdown(
          selectedValue.transferFromAcctOfficer as string
        ) || ''
      );
    }

    return 'N/A';
  };

  const onSubmit = async () => {
    const submissionValues = {
      mParam: customerAccountsCheckList,
      fromAcctofficer:
        transferFromId ||
        extractIdFromDropdown(
          selectedValue.transferFromAcctOfficer as string
        ) ||
        '',
      mParam2: [
        {
          id: 0,
          acctofficer: 'string',
          newacctofficer: 'string',
          create_dt: getCurrentIsoDate()
        }
      ],
      toAcctofficer: `${extractIdFromDropdown(selectedValue.transferToAcctOfficer as string)}`,
      userId: `${getStoredUser()?.profiles.userid}`
    };

    mutate(submissionValues);
  };

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

    if (name === 'transferFromAcctOfficer' && value.trim().length === 0) {
      setFilteredValues({
        transferFromAcctOfficer: mappedAccountOfficers
      });
    }

    if (name === 'transferToAcctOfficer' && value.trim().length === 0) {
      setFilteredValues({
        transferToAcctOfficer: mappedAccountOfficers
      });
    }
  };

  return (
    <Formik
      initialValues={officerTransferInitialValues}
      onSubmit={() => onSubmit()}
      validationSchema={officerTransferSchema}
    >
      <Form>
        <TopActionsArea actionButtons={actionButtons} />

        <Grid container spacing={2}>
          <Box
            sx={{
              ...BatchContainer,
            }}
            ml={{ desktop: 1, mobile: 5 }}
          >
            <PageTitle title="Officer Transfer" styles={BatchTitle} />
            <Grid>
              <Grid item={isTablet} mobile={12}>
                <FormikRadioButton
                  options={[
                    { label: 'Individual', value: 'individual' },
                    { label: 'Group', value: 'group' }
                  ]}
                  title="Select Transfer Type"
                  name="transferType"
                  value="individual"
                />
              </Grid>

              {transferFromId ? (
                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    name="name"
                    placeholder="Enter Transfer From"
                    label="Transfer From"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                    value={`ID ${officerFromInformation?.officercode?.trim()}: ${officerFromInformation?.officerName}`}
                    disabled
                  />
                </Grid>
              ) : (
                <Grid item={isTablet} mobile={12}>
                  <StyledSearchableDropdown>
                    <ActionButtonWithPopper
                      handleSelectedValue={(value: string) =>
                        handleSelectedValue(value, 'transferFromAcctOfficer')
                      }
                      label="Transfer From"
                      name="transferFromAcctOfficer"
                      searchGroupVariant="BasicSearchGroup"
                      dropDownOptions={
                        filteredValues.transferFromAcctOfficer as OptionsI[]
                      }
                      customStyle={dropDownWithSearch}
                      icon={<SearchIcon />}
                      iconPosition="end"
                      buttonTitle={
                        (selectedValue.transferFromAcctOfficer as string) ||
                        'Search Account Officer'
                      }
                      onChange={handleSearch}
                      searchValue={
                        searchValue.transferFromAcctOfficer as string
                      }
                    />
                  </StyledSearchableDropdown>
                </Grid>
              )}

              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="officerCode"
                  placeholder="Enter Officer ID"
                  label="Officer ID"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                  value={populateOfficerNameOrCode('officerCode')}
                  disabled
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="officerName"
                  placeholder="Enter Officer Name"
                  label="Officer Name"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                  value={populateOfficerNameOrCode('officerName')}
                  disabled
                />
              </Grid>

              <Grid item={isTablet} mobile={12}>
                <StyledSearchableDropdown>
                  <ActionButtonWithPopper
                    handleSelectedValue={(value: string) =>
                      handleSelectedValue(value, 'transferToAcctOfficer')
                    }
                    label="Transfer to"
                    name="transferToAcctOfficer"
                    searchGroupVariant="BasicSearchGroup"
                    dropDownOptions={
                      filteredValues.transferToAcctOfficer as OptionsI[]
                    }
                    customStyle={dropDownWithSearch}
                    icon={<SearchIcon />}
                    iconPosition="end"
                    buttonTitle={
                      (selectedValue.transferToAcctOfficer as string) ||
                      'Search Account Officer'
                    }
                    onChange={handleSearch}
                    searchValue={searchValue.transferToAcctOfficer as string}
                  />
                </StyledSearchableDropdown>
              </Grid>
              {(transferFromId ||
                (extractIdFromDropdown(
                  selectedValue.transferFromAcctOfficer as string
                )?.length ?? 0) > 0) && (
                <AssignedCustomersSection
                  title="Customers"
                  setSumbissionCheckList={setCustomerAccountsCheckList}
                  transferFromId={
                    transferFromId ||
                    extractIdFromDropdown(
                      selectedValue.transferFromAcctOfficer as string
                    ) ||
                    ''
                  }
                />
              )}
            </Grid>
          </Box>
          <Box sx={{ ...PostingContainer }}>
            {isMobile ? (
              <MobilePreviewContent
                PreviewContent={
                  <PreviewAccountOfficerTransferSection
                    isOfficerToLoading={isOfficerToLoading}
                    officerToInformation={officerToInformation}
                    officerFromInformation={officerFromInformation}
                  />
                }
              />
            ) : (
              <PreviewAccountOfficerTransferSection
                isOfficerToLoading={isOfficerToLoading}
                officerToInformation={officerToInformation}
                officerFromInformation={officerFromInformation}
              />
            )}
          </Box>
        </Grid>
      </Form>
    </Formik>
  );
};
