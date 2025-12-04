import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useDebounce } from '@uidotdev/usehooks';
import { useFormikContext } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import dayjs, { Dayjs } from 'dayjs';
import { IntroducerCorporate, SearchFilters } from './ReferrerDetailsForm';
import {
  FormTextInput,
  FormSelectField,
  FormikDateTimePicker,
  FormSelectInput,
  CheckboxInput
} from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import {
  ITitle,
  ICountries,
  IStates,
  ITown,
  IGroup
} from '@/api/ResponseTypes/customer-service';
import { IEducation, IOccupation, ISector } from '@/api/ResponseTypes/setup';
import { FormAmountInput } from '@/components/FormikFields/FormAmountInput';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import { IAccountOfficers } from '@/api/ResponseTypes/admin';
import { CustomerCreationContext } from '@/context/CustomerCreationContext';
import { IBranches } from '@/api/ResponseTypes/general';
import { StyledSearchableDropdown } from '@/features/CustomerService/Form/CreateAccount';
import { ActionButtonWithPopper } from '@/components/Revamp/Buttons';
import { dropDownWithCorporateSearch } from '@/features/CustomerService/Form/style';
import { encryptData } from '@/utils/encryptData';
import { useGetParams } from '@/utils/hooks/useGetParams';
import {
  useGetCustomerByIdCodes,
  useSearchCustomer
} from '@/api/customer-service/useCustomer';
import { useSearchStaff } from '@/api/customer-service/useSearchStaff';
import { OptionsI } from '@/components/FormikFields/FormSelectField';
import { IntroducerTypeCorp } from '@/constants/CustomerService/viewCustomerDetails';
import {
  CreateCorporateCustomerFormValues,
  CreateIndividualCustomerFormValues
} from '@/schemas/schema-values/customer-service';
import { useHandleCompletedFields } from '@/utils/hooks/useHandleCompletedFields';
import { useCreateValidationKeysMapper } from '@/utils/hooks/useCreateValidationKeysMapper';
import { mapCustomerSearch, mapStaffSearch } from '@/utils/mapCustomerSearch';
import { formatDateOfBirth } from '@/utils/formatDateOfBirth';
import { RadioButtonTitle } from '@/components/Revamp/Radio/style';
import { filterCustomerDropdownSearch } from '@/utils/filterDropdownSearch';

import {
  useGetStateByCountryCode,
  useGetTownByStateCode
} from '@/api/general/useGeography';

import { isEmptyObject } from '@/utils/isEmptyObject';

// Define Props interface
type Props = {
  titles?: ITitle[];
  sectors?: ISector[];
  education?: IEducation[];
  countries?: ICountries[];
  states?: IStates[];
  towns?: ITown[];
  professions?: IOccupation[];
  officers?: IAccountOfficers[];
  groups?: IGroup[];
  branches?: IBranches[];
};

// Update SearchFilters to support both string and OptionsI[] for acctOfficer and introid
interface IResidentDetails {
  residentCountry: string;
  residentState: string;
  residentTown: string;
  nationality: string;
  statecode: string;
}

// Ensure OptionsI interface is defined
export const DependentCustomer = ({
  titles,
  sectors,
  education,
  countries,
  states,
  towns,
  professions,
  branches,
  groups,
  officers
}: Props) => {
  const isEditing = useGetParams('isEditing') || null;
  const [isGroupMember, setIsGroupMember] = React.useState<string>('true');
  const { isMobile, setWidth } = useCurrentBreakpoint();
  const customerId = useGetParams('customerId') || '';
  const { customerResult: customerResultCodes } = useGetCustomerByIdCodes(
    encryptData(customerId) as string
  );
  const [selectedValue, setSelectedValue] = React.useState<SearchFilters>({
    introid: customerResultCodes?.introducer || '',
    acctOfficer: customerResultCodes?.acctOfficer || ''
  });
  const {
    mappedSectors,
    mappedCountries,
    mappedBranches,
    mappedGroups,
    mappedAccountOfficers
  } = useMapSelectOptions({
    titles,
    sectors,
    education,
    countries,
    states,
    towns,
    professions,
    branches,
    groups,
    officers
  });
  const { setAccountOfficerValue, setIntroducerIdValue } = React.useContext(
    CustomerCreationContext
  );

  const [searchValue, setSearchValue] = React.useState<SearchFilters>({
    introid: '',
    acctOfficer: ''
  });
  const [introducerType, setIntroducerType] =
    React.useState<IntroducerCorporate>({
      staff: '',
      customer: ''
    });
  const [filteredValues, setFilteredValues] = React.useState<SearchFilters>({
    staff: [],
    customer: [],
    acctOfficer: mappedAccountOfficers.filter((item) => item.value) || [],
    introid: []
  });
  const debouncedSearchValue = useDebounce(searchValue.introid, 500);

  const { values, setFieldValue } = useFormikContext<
    CreateIndividualCustomerFormValues | CreateCorporateCustomerFormValues
  >();

  const { setCompleted } = React.useContext(CustomerCreationContext);

  const shouldRemoveCorporateDetails = false;

  const { validationKeysMapper } = useCreateValidationKeysMapper(
    shouldRemoveCorporateDetails
  );
  const { handleCompletedFields } = useHandleCompletedFields<
    CreateIndividualCustomerFormValues | CreateCorporateCustomerFormValues
  >(setCompleted, validationKeysMapper);

  const selectInputRef = React.useRef<Record<string, string>>({});

  const handleSelectedValue = (
    value: string,
    name: 'acctOfficer' | 'introid'
  ) => {
    if (!value) return; // Prevent setting empty values

    // Remove the colon and everything after it
    const cleanedValue = value.replace(':', ',');
    if (selectInputRef.current) {
      selectInputRef.current[name] = cleanedValue;
    }
    setFieldValue(name, cleanedValue);

    handleCompletedFields({ ...values, ...selectInputRef.current });

    setSelectedValue((prev) => ({
      ...prev,
      [name]: cleanedValue
    }));

    if (name === 'introid') {
      setIntroducerIdValue(cleanedValue);
    }

    if (name === 'acctOfficer') {
      setAccountOfficerValue(cleanedValue);
    }
  };

  const [dob, setDob] = React.useState<Dayjs | ''>(
    isEditing && customerResultCodes?.dob
      ? dayjs(formatDateOfBirth(customerResultCodes.dob))
      : ''
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setSearchValue((prev) => ({
      ...prev,
      [name]: value
    }));

    if (name === 'acctOfficer') {
      const filteredItems = filterCustomerDropdownSearch(
        mappedAccountOfficers.filter((item) => item.value) || [],
        value
      );
      setFilteredValues((prev) => ({
        ...prev,
        [name]: filteredItems
      }));
    }

    if (value.trim().length === 0) {
      setFilteredValues({
        introid: [],
        acctOfficer: mappedAccountOfficers.filter((item) => item.value) || []
      });
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value === 'staff') {
      setIntroducerType({ staff: value, customer: '' });
    } else if (value === 'customer') {
      setIntroducerType({ staff: '', customer: value });
    } else {
      setIntroducerType({ staff: '', customer: '' });
    }
  };

  const handleCheck = (booleanValue: string, value: string) => {
    setIsGroupMember(value);
  };

  const { users, isLoading: isStaffSearchLoading } = useSearchStaff(
    introducerType?.staff && introducerType.staff.length > 0
      ? (debouncedSearchValue as string)
      : ''
  );
  const { accountDetailsResults, isLoading: isCustomerSearchLoading } =
    useSearchCustomer(
      introducerType?.customer && introducerType.customer?.length > 0
        ? (encryptData(debouncedSearchValue as string) as string)
        : ''
    );
  React.useEffect(() => {
    setFilteredValues({
      staff: [],
      customer: [],
      introid: [],
      acctOfficer: mappedAccountOfficers.filter((item) => item.value) || []
    });
  }, [mappedAccountOfficers]);

  React.useEffect(() => {
    const mappedSearchResults = mapCustomerSearch(accountDetailsResults || []);
    const mappedStaffSearchResults = mapStaffSearch(users || []);

    const pickResult = () => {
      if (introducerType.customer && introducerType.customer?.length > 0) {
        return mappedSearchResults;
      }

      if (introducerType.staff && introducerType.staff?.length > 0) {
        return mappedStaffSearchResults;
      }

      return [];
    };

    setFilteredValues((prev) => ({
      ...prev,
      introid: pickResult()
    }));
  }, [
    isCustomerSearchLoading,
    isStaffSearchLoading,
    accountDetailsResults,
    users,
    introducerType
  ]);

  const [mappedResidentStates, setMappedResidentStates] = React.useState<
    OptionsI[]
  >([]);

  const [mappedResidentTowns, setMappedResidentTowns] = React.useState<
    OptionsI[]
  >([]);

  const [residentDetails, setResidentDetails] =
    React.useState<IResidentDetails>({
      residentCountry: customerResultCodes?.residentCountry || '',
      residentState: customerResultCodes?.residentStatecode || '',
      residentTown: customerResultCodes?.residentTowncode || '',
      nationality: customerResultCodes?.nationality || '',
      statecode: customerResultCodes?.statecode || ''
    });

  const formType = 'personal';
  const residentFormType = 'personal-resident';

  const { states: allNationStates } = useGetStateByCountryCode(
    encryptData(
      customerResultCodes?.nationality || residentDetails.nationality
    ) as string,
    formType
  );

  type LocationType = 'state' | 'town';

  const pickInitialLocationCode = (locationType: LocationType): string => {
    switch (locationType) {
      case 'state':
        if (residentDetails.residentCountry.length > 0) {
          return residentDetails.residentCountry;
        }

        return customerResultCodes?.residentCountry || '';
      case 'town':
        if (residentDetails.residentState.length > 0) {
          return residentDetails.residentState;
        }

        return customerResultCodes?.residentStatecode || '';
      default:
        return customerResultCodes?.statecode || '';
    }
  };

  const { states: allResidentNationStates, isLoading: isLoadingStates } =
    useGetStateByCountryCode(
      encryptData(pickInitialLocationCode('state')) as string,
      residentFormType
    );

  const { towns: allResidentStateTowns, isLoading: isLoadingTowns } =
    useGetTownByStateCode(
      encryptData(pickInitialLocationCode('town')) as string,
      formType
    );

  useEffect(() => {
    if (allResidentNationStates !== undefined) {
      const allResidentNationStatesArray = allResidentNationStates?.map(
        (state: IStates) => ({
          name: state.stateName,
          value: state.stateCode?.toString().trim()
        })
      );

      setMappedResidentStates(allResidentNationStatesArray);
    }
  }, [allResidentNationStates, isLoadingStates, residentDetails.residentState]);

  useEffect(() => {
    if (
      allResidentStateTowns !== undefined &&
      !isEmptyObject(allResidentStateTowns) &&
      !isLoadingTowns
    ) {
      const allResidentStateTownsArray = (allResidentStateTowns || [])?.map(
        (town: ITown) => ({
          name: town.townName,
          value: town.townCode?.toString().trim()
        })
      );

      setMappedResidentTowns(allResidentStateTownsArray);
    }
  }, [allResidentStateTowns, isLoadingTowns]);

  if (isEditing && isLoadingTowns && isLoadingStates) {
    return '...';
  }

  return (
    <Box>
      <Grid container spacing={3} paddingX={2}>
        <Grid item tablet={6} mobile={12}>
          <FormTextInput
            name="middle"
            placeholder="Enter Dependent Mobile Number"
            label="Dependent Middle Name"
            customStyle={{
              width: setWidth(isMobile ? '250px' : '100%')
            }}
            required
          />
        </Grid>
        <Grid item tablet={6} mobile={12}>
          <FormAmountInput
            name="email"
            placeholder="Dependent Email"
            label="Dependent Email"
            customStyle={{
              width: setWidth(isMobile ? '250px' : '100%')
            }}
            required
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} paddingX={2}>
        <Grid item tablet={6} mobile={12}>
          <FormTextInput
            name="scuml"
            placeholder="Enter Dependent Mobile Number"
            label="Dependent Mobile Number"
            customStyle={{
              width: setWidth(isMobile ? '250px' : '100%')
            }}
            required
          />
        </Grid>
        <Grid item tablet={6} mobile={12}>
          <FormTextInput
            name="depan"
            placeholder="Enter Dependent Mobile Number"
            label="Dependent Surname"
            customStyle={{
              width: setWidth(isMobile ? '250px' : '100%')
            }}
            required
          />
        </Grid>
      </Grid>
      <Grid spacing={2} paddingX={2}>
        <Grid item tablet={6} mobile={12}>
          <Box sx={{ width: '350px' }}>
            <DemoContainer components={['DatePicker']}>
              <FormikDateTimePicker
                disableFuture
                label="Dependent Date of Birth"
                name="dob"
                value={dob}
                handleDateChange={(newValue: Dayjs | string) =>
                  setDob(newValue as Dayjs)
                }
                required
              />
            </DemoContainer>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} paddingX={2}>
        <Grid item tablet={6} mobile={12}>
          <FormSelectField
            name="branchCode"
            options={mappedBranches || []}
            label="Gender"
            customStyle={{
              width: setWidth(isMobile ? '250px' : '100%')
            }}
          />
        </Grid>
        <Grid item tablet={6} mobile={12}>
          <FormSelectInput
            onChange={handleSelectChange}
            name="introType"
            options={IntroducerTypeCorp}
            label="Title"
            value={introducerType.customer || introducerType.staff || ''}
            customStyle={{
              width: setWidth(isMobile ? '250px' : '100%')
            }}
          />
        </Grid>

        <Grid item tablet={6} mobile={12}>
          <StyledSearchableDropdown>
            <ActionButtonWithPopper
              handleSelectedValue={(value: string) =>
                handleSelectedValue(value, 'introid')
              }
              label="Enter Guardian Customer ID"
              name="introid"
              searchGroupVariant="BasicSearchGroup"
              dropDownOptions={(filteredValues.introid as OptionsI[]) || []}
              customStyle={dropDownWithCorporateSearch}
              icon={<SearchIcon />}
              iconPosition="end"
              buttonTitle={selectedValue.introid.toString() || 'Search'}
              onChange={handleSearch}
              searchValue={searchValue.introid.toString() || ''}
              loading={isCustomerSearchLoading || isStaffSearchLoading}
              //   disabled={!introducerType.customer && !introducerType.staff}
            />
          </StyledSearchableDropdown>
        </Grid>
      </Grid>
    </Box>
  );
};
