'use client';
import React from 'react';
import { Box, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Formik, Form } from 'formik';
import dayjs from 'dayjs';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from '@tanstack/react-query';
import { PreviewDirectorInformation } from '../Director/CreateDirector/PreviewDirectorInformation';
import { ILocationDetails } from './CreateCustomerForms/BusinessDetailsForm';
import { PageTitle } from '@/components/Typography';
import {
  BatchContainer,
  BatchTitle,
  previewContentStyle
} from '@/features/Operation/Forms/style';
import {
  FormTextInput,
  FormSelectField,
  FormikRadioButton,
  FormikDateTimePicker
} from '@/components/FormikFields';
import { CustomStyleI } from '@/constants/types';
import { useCurrentBreakpoint } from '@/utils';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { PrimaryIconButton } from '@/components/Buttons';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { MobileModalContainer } from '@/components/Revamp/Modal/mobile/ModalContainer';
import {
  CreateDirectorFormValues,
  createDirectorInitialValues
} from '@/schemas/schema-values/customer-service';
import {
  useCreateDirector,
  useGetDirectorsByCustomerId
} from '@/api/customer-service/useDirectors';
import { Gender } from '@/constants/CustomerService/viewCustomerDetails';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { ICountries, ITitle } from '@/api/ResponseTypes/customer-service';
import { StyledSearchableDropdown } from '@/features/CustomerService/Form/CreateAccount';
import { ActionButtonWithPopper } from '@/components/Revamp/Buttons';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { mapCustomerSearch } from '@/utils/mapCustomerSearch';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { queryKeys } from '@/react-query/constants';
import { extractIdFromDropdown } from '@/utils/extractIdFromDropdown';
import { OptionsI } from '@/components/FormikFields/FormSelectField';
import {
  searchCustomer,
  useGetCustomerById
} from '@/api/customer-service/useCustomer';
import { dropDownWithSearch } from '@/features/CustomerService/Form/style';
import { createDirector } from '@/schemas/customer-service';
import { encryptData } from '@/utils/encryptData';
import {
  useGetStateByCountryCode,
  useGetTownByStateCode
} from '@/api/general/useGeography';

type Props = {
  PreviewContent: any;
  customStyle?: CustomStyleI;
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

type CreateDirectorProps = {
  titles?: ITitle[];
  countries?: ICountries[];
  unitTestingInitialValues?: any;
};

type SearchFilters = {
  customerId: string | OptionsI[];
  [key: string]: any;
};

export const CreateDirector = ({
  titles,
  countries,
  unitTestingInitialValues
}: CreateDirectorProps) => {
  const { isLoading } = useGlobalLoadingState();

  const actionButtons: any = [
    <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
      <PrimaryIconButton
        isLoading={isLoading}
        type="submit"
        buttonTitle="Submit"
        customStyle={{ ...submitButton }}
      />
    </Box>
  ];

  const toastActions = React.useContext(ToastMessageContext);
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const [selectedValue, setSelectedValue] = React.useState<SearchFilters>({
    customerId: ''
  });
  const [searchValue, setSearchValue] = React.useState<SearchFilters>({
    customerId: ''
  });
  const [filteredValues, setFilteredValues] = React.useState<SearchFilters>({
    customerId: []
  });

  const customerId = extractIdFromDropdown(
    selectedValue.customerId as string
  ) as string;
  const { mutate } = useCreateDirector();
  const { directorDetails, isLoading: areDirectorsLoading } =
    useGetDirectorsByCustomerId(customerId);
  const { customerResult, isLoading: isCustomerInfoLoading } =
    useGetCustomerById(encryptData(customerId) as string);

  const [locationDetails, setLocationDetails] =
    React.useState<ILocationDetails>({
      country: '',
      state: '',
      town: ''
    });

  const { states: allNationStates } = useGetStateByCountryCode(
    encryptData(locationDetails.country) as string
  );
  const { towns: allStateTowns } = useGetTownByStateCode(
    encryptData(locationDetails.state) as string
  );

  const {
    mappedTitles,
    mappedCountries,
    mappedNationStates,
    mappedStateTowns
  } = useMapSelectOptions({
    titles,
    countries,
    allStateTowns,
    allNationStates
  });

  const handleSelectedValue = (value: string, name: string) => {
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

  const onSubmit = async (values: CreateDirectorFormValues) => {
    const isCeo = values.rank === 'ceo' ? 1 : 0;
    const isChairman = values.rank === 'chairman' ? 1 : 0;
    const dob = dayjs(values.dob).toISOString();

    await mutate({ ...values, dob, customeriD: customerId, isCeo, isChairman });
  };

  return (
    <Formik
      initialValues={unitTestingInitialValues || createDirectorInitialValues}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={createDirector}
    >
      <Form>
        <TopActionsArea actionButtons={actionButtons} />

        <Stack
          sx={{ minHeight: '150vh' }}
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Box sx={{ ...BatchContainer, width: { tablet: '500px', mobile: '500px' } }} ml={{ desktop: 1, mobile: 5 }}>
            <PageTitle title="Create Director" styles={BatchTitle} />
            <Grid container>
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
                    dropDownOptions={filteredValues.customerId as OptionsI[]}
                    customStyle={{ ...dropDownWithSearch, width: '450px' }}
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
                <FormikRadioButton
                  options={[
                    { label: 'Ceo', value: 'ceo' },
                    { label: 'Chairman', value: 'chairman' }
                  ]}
                  title="Select Director Rank"
                  name="rank"
                  value="ceo"
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormSelectField
                  name="titlecode"
                  options={mappedTitles}
                  label="Title"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="firstName"
                  placeholder="Enter name"
                  label="First Name"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="othername"
                  placeholder="Enter value"
                  label="Middle Name"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="surName"
                  placeholder="Enter user"
                  label="Last Name"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <Box sx={{ width: { mobile: '250px', tablet: '450px' } }}>
                  <FormikDateTimePicker
                    label="Date of Birth"
                    name="dob"
                    disableFuture
                  />
                </Box>
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormSelectField
                  name="gender"
                  options={Gender}
                  label="Gender"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormSelectField
                  name="nationality"
                  options={mappedCountries}
                  label="Nationality"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                  required
                  onChange={(e) => {
                    setLocationDetails((prev) => ({
                      ...prev,
                      country: e.target.value
                    }));
                  }}
                  value={locationDetails.country || null}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormSelectField
                  name="statecode"
                  options={mappedNationStates}
                  label="State of Origin"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                  required
                  onChange={(e) => {
                    setLocationDetails((prev) => ({
                      ...prev,
                      state: e.target.value
                    }));
                  }}
                  value={locationDetails.state || null}
                  disabled={mappedNationStates?.length === 0}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormSelectField
                  name="townCode"
                  options={mappedStateTowns}
                  label="LGA/City/Town of Origin"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                  required
                  onChange={(e) => {
                    setLocationDetails((prev) => ({
                      ...prev,
                      town: e.target.value
                    }));
                  }}
                  value={locationDetails.town || null}
                  disabled={mappedStateTowns?.length === 0}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="address"
                  placeholder="Enter address"
                  label="Address"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="phone"
                  placeholder="Enter phone number"
                  label="Phone Number"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ marginTop: '17px' }}>
            {isMobile ? (
              <MobilePreviewContent
                PreviewContent={
                  <PreviewDirectorInformation
                    customerResult={customerResult}
                    directorDetails={directorDetails || []}
                    loading={areDirectorsLoading || isCustomerInfoLoading}
                    customerId={customerId}
                  />
                }
              />
            ) : (
              <PreviewDirectorInformation
                customerResult={customerResult}
                directorDetails={directorDetails || []}
                loading={areDirectorsLoading || isCustomerInfoLoading}
                customerId={customerId}
              />
            )}
          </Box>
        </Stack>
      </Form>
    </Formik>
  );
};
