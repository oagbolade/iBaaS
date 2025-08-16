import React from 'react';
import { Box, Grid , Typography} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useDebounce } from '@uidotdev/usehooks';
import { useFormikContext } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import dayjs, { Dayjs } from 'dayjs';
import { Introducer, SearchFilters } from './ReferrerDetailsForm';
import {
  FormTextInput,
  FormSelectField,
  FormikRadioButton,
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
import { dropDownWithSearch } from '@/features/CustomerService/Form/style';
import { encryptData } from '@/utils/encryptData';
import { useGetParams } from '@/utils/hooks/useGetParams';
import {
  useGetCustomerByIdCodes,
  useSearchCustomer
} from '@/api/customer-service/useCustomer';
import { useSearchStaff } from '@/api/customer-service/useSearchStaff';
import { OptionsI } from '@/components/FormikFields/FormSelectField';
import { IntroducerType } from '@/constants/CustomerService/viewCustomerDetails';
import {
  CreateCorporateCustomerFormValues,
  CreateIndividualCustomerFormValues
} from '@/schemas/schema-values/customer-service';
import { filterDropdownSearch } from '@/utils/filterDropdownSearch';
import { useHandleCompletedFields } from '@/utils/hooks/useHandleCompletedFields';
import { useCreateValidationKeysMapper } from '@/utils/hooks/useCreateValidationKeysMapper';
import { mapCustomerSearch, mapStaffSearch } from '@/utils/mapCustomerSearch';
import { formatDateOfBirth } from '@/utils/formatDateOfBirth';
import { RadioButtonTitle } from '@/components/Revamp/Radio/style';

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

export const CorporateCustomerPersonalDetailsForm = ({
  titles,
  sectors,
  education,
  countries,
  states,
  towns,
  professions,
  branches,
  groups,
  officers,

}: Props) => {
  const [isGroupMember, setIsGroupMember] = React.useState<string>('true');
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const customerId = useGetParams('customerId') || '';
  const { customerResult: customerResultCodes } = useGetCustomerByIdCodes(
    encryptData(customerId) as string
  );
  const isEditing = useGetParams('isEditing') || null;
  const [selectedValue, setSelectedValue] = React.useState<SearchFilters>({
    introid: customerResultCodes?.introducer || '',
    acctOfficer: customerResultCodes?.acctOfficer || ''
  });
  const {
    mappedSectors,
    mappedCountries,
    mappedStates,
    mappedTowns,
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
  const [introducerType, setIntroducerType] = React.useState<Introducer>({
    staff: '',
    customer: ''
  });
  const [filteredValues, setFilteredValues] = React.useState<SearchFilters>({
    staff: [],
    customer: [],
    acctOfficer: [],
    introid: []
  });
  const debouncedSearchValue = useDebounce(searchValue.introid, 500);

  const { values, setFieldValue } = useFormikContext<
    CreateIndividualCustomerFormValues | CreateCorporateCustomerFormValues
  >();

  const { customerType, setCompleted } = React.useContext(
    CustomerCreationContext
  );

  // const isEditing = useGetParams('isEditing');
  // const corporate = '2';

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
    if (selectInputRef.current) {
      (selectInputRef.current as Record<string, string>)[name] = value;
    }

    setFieldValue(name, value);

    handleCompletedFields({ ...values, ...selectInputRef.current });

    setSelectedValue((prev) => ({
      ...prev,
      [name]: value
    }));

    if (name === 'introid') {
      setIntroducerIdValue(value);
    }

    if (name === 'acctOfficer') {
      setAccountOfficerValue(value);
    }
  };

  const [dob, setDob] = React.useState(
    isEditing ? dayjs(formatDateOfBirth(customerResultCodes?.dob)) : ''
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setSearchValue((prev) => ({
      ...prev,
      [name]: value
    }));

    if (name === 'acctOfficer') {
      const filteredItems = filterDropdownSearch(mappedAccountOfficers, value);

      setFilteredValues((prev) => ({
        ...prev,
        [name]: filteredItems
      }));
    }

    if (value.trim().length === 0) {
      setFilteredValues({
        introid: [],
        acctOfficer: mappedAccountOfficers
      });
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setIntroducerType({ [value]: value });
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
      acctOfficer: mappedAccountOfficers
    });
  }, [mappedAccountOfficers]);

  React.useEffect(() => {
    const mappedSearchResults = mapCustomerSearch(accountDetailsResults);
    const mappedStaffSearchResults = mapStaffSearch(users);

    const pickResult = () => {
      if (introducerType.customer && introducerType.customer?.length > 0) {
        return mappedSearchResults;
      }

      if (introducerType.staff && introducerType.staff?.length > 0) {
        return mappedStaffSearchResults;
      }
    };

    setFilteredValues((prev) => ({
      ...prev,
      introid: pickResult() || []
    }));
  }, [isCustomerSearchLoading, isStaffSearchLoading, accountDetailsResults, users, introducerType]);

  return (
    <>
      <Grid mt={3} item={isTablet} mobile={12}>
        <FormTextInput
          name="compname"
          placeholder="Enter company name"
          label="Company Name"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="regno"
          placeholder="Enter company registration number"
          label="Company Registration Number"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <Box sx={{ width: '100%' }}>
          <DemoContainer components={['DatePicker']}>
            <FormikDateTimePicker
              required
              label="Date of Registration"
              handleDateChange={(newValue: Dayjs) => setDob(dayjs(newValue))}
              value={dob}
              name="dob"
              defaultValue=""
            />
          </DemoContainer>
        </Box>
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormSelectField
          name="nationality"
          options={mappedCountries}
          label="Country of Incorporation"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormSelectField
          name="companyStatecode"
          options={mappedStates}
          label="State of Incorporation"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormSelectField
          name="companyTowncode"
          options={mappedTowns}
          label="Company Town"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="address"
          placeholder="Enter address"
          label="Company Address"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormSelectField
          name="sectorcode"
          options={mappedSectors}
          label="Company Sector"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="bvn"
          placeholder="Enter bvn"
          label="BVN"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="zipCode"
          placeholder="Enter Zip Code"
          label="Zip Code"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="taxId"
          placeholder="Enter Tax Identification Number"
          label="Tax Identification Number"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="contact"
          placeholder="Enter Contact Person"
          label="Contact Person"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="compObjective"
          placeholder="Enter company's objectives"
          label="Company's Objectives"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="phone1"
          placeholder="Enter Office Phone 1"
          label="Office Phone 1"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="phone2"
          placeholder="Enter Office Phone 2"
          label="Office Phone 2"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="phone3"
          placeholder="Enter Office Phone 3"
          label="Office Phone 3"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="phone4"
          placeholder="Enter Office Phone 4"
          label="Office Phone 4"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="secName"
          placeholder="Enter Secretary's Name"
          label="Secretary's Name"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="secphone"
          placeholder="Enter Secretary's Phone Number"
          label="Secretary's Phone Number"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="email"
          placeholder="Enter email address"
          label="Email Address"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormikRadioButton
          options={[
            { label: 'Yes', value: '1' },
            { label: 'No', value: '0' }
          ]}
          title="Authorise Shared Capital?"
          name="shareCapital"
          value="0"
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormAmountInput
          name="turnOver"
          placeholder="Enter expected turnover"
          label="Expected Turnover"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormTextInput
          name="scuml"
          placeholder="Enter scuml"
          label="SCUML (Where Applicable)"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <FormSelectInput
          onChange={handleSelectChange}
          name="introType"
          options={IntroducerType}
          label="Introducer Type"
          value={introducerType.customer || introducerType.staff}
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
          required
        />
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'introid')
            }
            required
            label="Introducer"
            name="introid"
            searchGroupVariant="BasicSearchGroup"
            dropDownOptions={filteredValues.introid as OptionsI[]}
            customStyle={dropDownWithSearch}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={(selectedValue.introid as string) || 'Search'}
            onChange={handleSearch}
            searchValue={searchValue.introid as string}
            loading={isCustomerSearchLoading || isStaffSearchLoading}
            disabled={
              introducerType.customer?.length === 0 &&
              introducerType.staff?.length === 0
            }
          />
        </StyledSearchableDropdown>
      </Grid>
      <Grid item={isTablet} mobile={12}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            required
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'acctOfficer')
            }
            label="Account Officer"
            name="acctOfficer"
            searchGroupVariant="BasicSearchGroup"
            dropDownOptions={filteredValues.acctOfficer as OptionsI[]}
            customStyle={dropDownWithSearch}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={(selectedValue.acctOfficer as string) || 'Search'}
            onChange={handleSearch}
            searchValue={searchValue.acctOfficer as string}
          />
        </StyledSearchableDropdown>
      </Grid>

      <Grid item={isTablet} mobile={12}>
        <FormSelectField
          name="branchCode"
          options={mappedBranches}
          label="Branch"
          customStyle={{
            width: setWidth(isMobile ? '250px' : '100%')
          }}
        />
      </Grid>

      <Grid item={isTablet} mobile={12}>
        <RadioButtons
          options={[
            { label: 'Yes', value: 'true' },
            { label: 'No', value: 'false' }
          ]}
          title="Is Customer a Member of a Group?"
          name="isGroupMember"
          value={isGroupMember}
          handleCheck={handleCheck}
        />
      </Grid>

      {isGroupMember === 'true' && (
        <Grid item={isTablet} mobile={12}>
          <FormSelectField
            name="groupcode"
            options={mappedGroups}
            label="Group"
            customStyle={{
              width: setWidth(isMobile ? '250px' : '100%')
            }}
          />
        </Grid>
      )}

       <Grid item={isTablet} mobile={12}>
                  <Typography sx={{ ...RadioButtonTitle, display: 'inline' }}>
                    Alert type
                  </Typography>
                  <Box sx={{ marginTop: '10px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <CheckboxInput label="SMS" name="smsalert" id="test-sms" />
                      <CheckboxInput
                        label="Email"
                        name="emailalert"
                        id="test-email"
                      />
                    </Box>
                  </Box>
                </Grid>
    </>
  );
};
