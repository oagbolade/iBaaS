import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useDebounce } from '@uidotdev/usehooks';
import SearchIcon from '@mui/icons-material/Search';
import { useFormikContext } from 'formik';
import {
  FormTextInput,
  FormSelectInput,
  FormikRadioButton,
  FormSelectField,
  CheckboxInput
} from '@/components/FormikFields';

import { useCurrentBreakpoint } from '@/utils';
import { BatchContainer } from '@/features/Operation/Forms/style';
import { StyledSearchableDropdown } from '@/features/CustomerService/Form/CreateAccount';
import { ActionButtonWithPopper } from '@/components/Revamp/Buttons';
import { OptionsI } from '@/components/FormikFields/FormSelectField';
import { dropDownWithSearch } from '@/features/CustomerService/Form/style';
import { filterDropdownSearch } from '@/utils/filterDropdownSearch';
import { IntroducerType } from '@/constants/CustomerService/viewCustomerDetails';
import { useSearchStaff } from '@/api/customer-service/useSearchStaff';
import { mapCustomerSearch, mapStaffSearch } from '@/utils/mapCustomerSearch';
import {
  useGetCustomerByIdCodes,
  useSearchCustomer
} from '@/api/customer-service/useCustomer';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { IAccountOfficers } from '@/api/ResponseTypes/admin';
import { CustomerCreationContext } from '@/context/CustomerCreationContext';
import { IBranches } from '@/api/ResponseTypes/general';
import { IGroup } from '@/api/ResponseTypes/customer-service';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import {
  CreateCorporateCustomerFormValues,
  CreateIndividualCustomerFormValues
} from '@/schemas/schema-values/customer-service';
import { useHandleCompletedFields } from '@/utils/hooks/useHandleCompletedFields';
import { useCreateValidationKeysMapper } from '@/utils/hooks/useCreateValidationKeysMapper';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { encryptData } from '@/utils/encryptData';
import { RadioButtonTitle } from '@/components/Revamp/Radio/style';
import { extractIdFromDropdown } from '@/utils/extractIdFromDropdown';

export type SearchFilters = {
  introid: string | OptionsI[];
  acctOfficer: string | OptionsI[];
  staff?: [];
  customer?: [];
  [key: string]: any;
};

export type Introducer = {
  customer: string;
  staff: string;
};

export type IntroducerCorporate = {
  customer: string;
  staff: string;
};
type Props = {
  officers?: IAccountOfficers[];
  groups?: IGroup[];
  branches?: IBranches[];
};

export const ReferrerDetailsForm = ({ officers, groups, branches }: Props) => {
  const customerId = useGetParams('customerId') || '';

  const { customerResult: customerResultCodes } = useGetCustomerByIdCodes(
    encryptData(customerId) as string
  );

  const {
    setAccountOfficerValue,
    setIntroducerIdValue,
    setIntroducerTypeValue
  } = React.useContext(CustomerCreationContext);

  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const [isGroupMember, setIsGroupMember] = React.useState<string>('true');
  const [selectedValue, setSelectedValue] = React.useState<SearchFilters>({
    introid: customerResultCodes?.introid || '',
    acctOfficer: customerResultCodes?.acctOfficer || ''
  });
  const [searchValue, setSearchValue] = React.useState<SearchFilters>({
    introid: '',
    acctOfficer: ''
  });
  const [introducerType, setIntroducerType] = React.useState<Introducer>({
    customer: '',
    staff: ''
  });
  const [filteredValues, setFilteredValues] = React.useState<SearchFilters>({
    staff: [],
    customer: [],
    acctOfficer: [],
    introid: []
  });
  const debouncedSearchValue = useDebounce(searchValue.introid, 500);
  const { users, isLoading: isStaffSearchLoading } = useSearchStaff(
    introducerType?.staff && introducerType.staff.length > 0
      ? (debouncedSearchValue as string)
      : ''
  );
  const { accountDetailsResults, isLoading: isCustomerSearchLoading } =
    useSearchCustomer(
      introducerType?.customer && introducerType.customer.length > 0
        ? (encryptData(debouncedSearchValue as string) as string)
        : ''
    );
  const { mappedAccountOfficers, mappedBranches, mappedGroups } =
    useMapSelectOptions({
      officers,
      branches,
      groups
    });

  React.useEffect(() => {
    setFilteredValues({
      staff: [],
      customer: [],
      introid: [],
      acctOfficer: mappedAccountOfficers
    });
  }, [mappedAccountOfficers]);

  React.useEffect(() => {
    const mappedCustomer = mapCustomerSearch(accountDetailsResults);
    const mappedStaff = mapStaffSearch(users);

    // 2. Choose which one to use
    const selected =
      // eslint-disable-next-line no-nested-ternary
      introducerType.customer
        ? mappedCustomer
        : introducerType.staff
          ? mappedStaff
          : [];
    setFilteredValues((prev) => ({
      ...prev,
      introid: selected
    }));
  }, [
    isCustomerSearchLoading,
    isStaffSearchLoading,
    accountDetailsResults,
    introducerType.customer,
    introducerType.staff,
    users
  ]);

  const { customerType, setCompleted } = React.useContext(
    CustomerCreationContext
  );
  const isEditing = useGetParams('isEditing');
  const individual = '1';
  const shouldRemoveCorporateDetails = Boolean(
    isEditing && customerType === individual
  );
  const { validationKeysMapper } = useCreateValidationKeysMapper(
    shouldRemoveCorporateDetails
  );
  const { handleCompletedFields } = useHandleCompletedFields<
    CreateIndividualCustomerFormValues | CreateCorporateCustomerFormValues
  >(setCompleted, validationKeysMapper);
  const { values, setFieldValue } = useFormikContext<
    CreateIndividualCustomerFormValues | CreateCorporateCustomerFormValues
  >();

  const selectInputRef = React.useRef<Record<string, string>>({});

  const handleSelectedValue = (
    value: string,
    name: 'acctOfficer' | 'introid' | 'introducerType'
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

    if (name === 'introducerType') {
      setIntroducerTypeValue(value);
    }
  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    localStorage.setItem('introducerType', value);
    handleSelectedValue(value, 'introducerType');
    setIntroducerType({
      customer: value === 'customer' ? value : '',
      staff: value === 'staff' ? value : ''
    });
    setIntroducerTypeValue(value);
  };

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

  const handleCheck = (booleanValue: string, value: string) => {
    setIsGroupMember(value);
  };

  const searchCustomer = mapCustomerSearch(accountDetailsResults);
  const searchStaff = mapStaffSearch(users);

  const rawSource = selectedValue.introid;
  const extractedId = extractIdFromDropdown(
    typeof rawSource === 'string' ? rawSource : null
  );

  const selectedCustomer = searchCustomer.find(
    (item) => item.value === extractedId
  ) || { name: 'No customer found', phone: '' };

  const selectedStaff = searchStaff.find(
    (item) => item.value === extractedId
  ) || { name: '', phone: '' };

  const customerName = selectedCustomer.name;
  const customerPhone = selectedCustomer?.phone;
  const staffName = selectedStaff.name;
  const staffPhone = selectedStaff?.phone || 'No phone Number';

  let finalName = customerName;
  if (finalName === 'No customer found') {
    finalName = staffName;
  } else {
    finalName = customerName;
  }

  return (
    <Grid container spacing={2}>
      <Box sx={BatchContainer} ml={{ desktop: 1, mobile: 5 }}>
        <Grid container>
          <Grid item={isTablet} mobile={12}>
            <FormSelectInput
              onChange={handleSelectChange}
              name={`${isEditing ? 'introType' : 'introducerType'}`}
              options={IntroducerType}
              label="Introducer Type"
              value={introducerType.customer || introducerType.staff || ''}
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
                required
              />
            </StyledSearchableDropdown>
          </Grid>

          <Grid item={isTablet} mobile={12}>
            <StyledSearchableDropdown>
              <ActionButtonWithPopper
                handleSelectedValue={(value: string) =>
                  handleSelectedValue(value, 'acctOfficer')
                }
                label="Account Officer"
                name="acctOfficer"
                searchGroupVariant="BasicSearchGroup"
                dropDownOptions={filteredValues.acctOfficer as OptionsI[]}
                customStyle={dropDownWithSearch}
                icon={<SearchIcon />}
                required
                iconPosition="end"
                buttonTitle={(selectedValue.acctOfficer as string) || 'Search'}
                onChange={handleSearch}
                searchValue={searchValue.acctOfficer as string}
              />
            </StyledSearchableDropdown>
          </Grid>
          <Grid item={isTablet} mobile={12}>
            <FormTextInput
              name="refname"
              placeholder="Enter first name"
              label="Name"
              value={finalName}
              customStyle={{
                width: setWidth(isMobile ? '250px' : '100%')
              }}
              disabled
            />
          </Grid>
          <Grid item={isTablet} mobile={12}>
            <FormTextInput
              name="refphone"
              placeholder="Enter phone number"
              value={customerPhone || staffPhone}
              label="Phone Number"
              customStyle={{
                width: setWidth(isMobile ? '250px' : '100%')
              }}
              disabled
            />
          </Grid>

          {introducerType.customer && (
            <div className="w-full mt-3">
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
                <>
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
                    <FormSelectField
                      name="groupcode"
                      options={mappedGroups}
                      label="Group"
                      customStyle={{
                        width: setWidth(isMobile ? '250px' : '100%')
                      }}
                    />
                  </Grid>
                </>
              )}
            </div>
          )}

          <Grid item={isTablet} mobile={12}>
            <FormikRadioButton
              options={[
                { label: 'Yes', value: '1' },
                { label: 'No', value: '0' }
              ]}
              title="Is Customer a Signatory to Another Account?"
              name="signacct"
              value="1"
            />
          </Grid>
          <Grid item={isTablet} mobile={12}>
            <FormikRadioButton
              options={[
                { label: 'Yes', value: '1' },
                { label: 'No', value: '0' }
              ]}
              title="Is Customer Related to Another Customer in the Bank?"
              name="relcustid"
              value="1"
            />
          </Grid>
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
        </Grid>
      </Box>
    </Grid>
  );
};
