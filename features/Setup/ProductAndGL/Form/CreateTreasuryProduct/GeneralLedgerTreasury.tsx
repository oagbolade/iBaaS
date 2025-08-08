import React from 'react';
import { Box, Grid } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { Field, useFormikContext } from 'formik';
import { useCurrentBreakpoint } from '@/utils';
import { BatchContainer } from '@/features/Operation/Forms/style';
import {
  ITitle,
  ICountries,
  IStates,
  ITown
} from '@/api/ResponseTypes/customer-service';
import {
  IEducation,
  IGLWithBranchCode,
  IOccupation,
  IProdCodeType,
  IProdType,
  ISector
} from '@/api/ResponseTypes/setup';
import { CustomerCreationContext } from '@/context/CustomerCreationContext';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import {
  FormikDateTimePicker,
  FormSelectField,
  FormTextInput
} from '@/components/FormikFields';
import { ICurrency, IProductType } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { StyledSearchableDropdown } from '@/features/CustomerService/Form/CreateAccount';
import { ActionButtonWithPopper } from '@/components/Revamp/Buttons';
import { SearchIcon } from '@/assets/svg';
import { extractIdFromDropdown } from '@/utils/extractIdFromDropdown';
import { dropDownWithSearch } from '@/features/CustomerService/Form/style';
import { OptionsI } from '@/components/FormikFields/FormSelectField';
import {
  searchCustomer,
  useGetAccountDetails
} from '@/api/customer-service/useCustomer';
import { queryKeys } from '@/react-query/constants';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { mapCustomerAccountNumberSearch } from '@/utils/mapCustomerSearch';
import { IGLAccount } from '@/api/ResponseTypes/admin';
import {
  filterDropdownSearch,
  filterGeneralLedgerDropdownSearch
} from '@/utils/filterDropdownSearch';

type Props = {
  titles?: ITitle[];
  sectors?: ISector[];
  education?: IEducation[];
  countries?: ICountries[];
  states?: IStates[];
  towns?: ITown[];
  professions?: IOccupation[];
  productTypes?: IProductType[] | Array<any>;
  currencies?: ICurrency[] | Array<any>;
  bankgl?: IGLAccount[] | Array<any>;
  dataWithCode?:
    | IProdType[]
    | IProdCodeType[]
    | IGLWithBranchCode[]
    | Array<any>;
};
type SearchFilters = {
  intaccrual: string | OptionsI[];
  InterestExpense: string | OptionsI[];
  intIncome: string | OptionsI[];
  maturedGL: string | OptionsI[];
  principal: string | OptionsI[];
  interbr: string | OptionsI[];
  upfront: string | OptionsI[];
  PaymentGL: string | OptionsI[];
  suspint: string | OptionsI[];
  susprinc: string | OptionsI[];
  ttax: string | OptionsI[];
  ttax2: string | OptionsI[];
  [key: string]: any;
};
export const GeneralLedgerTreasuryForm = ({
  titles,
  sectors,
  education,
  countries,
  states,
  towns,
  professions,
  productTypes,
  currencies,
  bankgl,
  dataWithCode
}: Props) => {
  const { customerType, setCustomerType } = React.useContext(
    CustomerCreationContext
  );
  const { isTablet, setWidth, isMobile } = useCurrentBreakpoint();
  const {
    mappedProductType,
    mappedCurrency,
    mappedGlAccount,
    mappedWithBranchCode
  } = useMapSelectOptions({
    productTypes,
    currencies,
    bankgl,
    dataWithCode
  });
  const toastActions = React.useContext(ToastMessageContext);
  const searchParams = useSearchParams();

  const { setFieldValue, values } = useFormikContext<any>();

  const [searchValue, setSearchValue] = React.useState<SearchFilters>({
    intaccrual: '',
    InterestExpense: '',
    intIncome: '',
    maturedGL: '',
    principal: '',
    interbr: '',
    upfront: '',
    PaymentGL: '',
    suspint: '',
    susprinc: '',
    ttax: '',
    ttax2: ''
  });

  const [filteredValues, setFilteredValues] = React.useState<SearchFilters>({
    intaccrual: [],
    InterestExpense: [],
    intIncome: [],
    maturedGL: [],
    principal: [],
    interbr: [],
    upfront: [],
    PaymentGL: [],
    suspint: [],
    susprinc: [],
    ttax: [],
    ttax2: []
  });

  const [selectedValue, setSelectedValue] = React.useState<SearchFilters>({
    intaccrual: '',
    InterestExpense: '',
    intIncome: '',
    maturedGL: '',
    principal: '',
    interbr: '',
    upfront: '',
    PaymentGL: '',
    suspint: '',
    susprinc: '',
    ttax: '',
    ttax2: ''
  });

  const handleSelectedValue = (value: string, name: string) => {
    setSelectedValue((prev) => ({
      ...prev,
      [name]: value
    }));

    setFieldValue(name, value);
  };

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setSearchValue((prev) => ({
      ...prev,
      [name]: value
    }));

    const filteredGlItems = filterGeneralLedgerDropdownSearch(
      mappedWithBranchCode,
      value
    );
    setFilteredValues((prev) => ({
      ...prev,
      [name]: filteredGlItems
    }));

    if (value.trim().length === 0) {
      setFilteredValues({
        intaccrual: mappedWithBranchCode,
        InterestExpense: mappedWithBranchCode,
        intIncome: mappedWithBranchCode,
        maturedGL: mappedWithBranchCode,
        principal: mappedWithBranchCode,
        interbr: mappedWithBranchCode,
        upfront: mappedWithBranchCode,
        PaymentGL: mappedWithBranchCode,
        suspint: mappedWithBranchCode,
        susprinc: mappedWithBranchCode,
        ttax: mappedWithBranchCode,
        ttax2: mappedWithBranchCode
      });
    }
  };

  return (
    <>
      <Grid item={isTablet} mobile={12}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'intaccrual')
            }
            label="GL Account Number"
            name="intaccrual"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.intaccrual as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.intaccrual as string) || 'Search Account Number'
            }
            onChange={handleSearch}
            searchValue={searchValue.intaccrual as string}
          />
        </StyledSearchableDropdown>
      </Grid>

      <Grid item={isTablet} mobile={12}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'InterestExpense')
            }
            label="Principal Balance"
            name="InterestExpense"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.InterestExpense as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.InterestExpense as string) ||
              'Search Principal Balance'
            }
            onChange={handleSearch}
            searchValue={searchValue.InterestExpense as string}
          />
        </StyledSearchableDropdown>
      </Grid>

      <Grid item={isTablet} mobile={12}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'intIncome')
            }
            label="Suspended Asset"
            name="intIncome"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.intIncome as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.intIncome as string) || 'Search Suspended Asset'
            }
            onChange={handleSearch}
            searchValue={searchValue.intIncome as string}
          />
        </StyledSearchableDropdown>
      </Grid>

      <Grid item={isTablet} mobile={12}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'maturedGL')
            }
            label="Interest Accrual"
            name="maturedGL"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.maturedGL as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.maturedGL as string) || 'Search Interest Accrual'
            }
            onChange={handleSearch}
            searchValue={searchValue.maturedGL as string}
          />
        </StyledSearchableDropdown>
      </Grid>

      <Grid item={isTablet} mobile={12}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'principal')
            }
            label="Interest Income"
            name="principal"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.principal as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.principal as string) || 'Search Interest Income'
            }
            onChange={handleSearch}
            searchValue={searchValue.principal as string}
          />
        </StyledSearchableDropdown>
      </Grid>

      <Grid item={isTablet} mobile={12}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'interbr')
            }
            label="Inter Branch GL"
            name="interbr"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.interbr as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.interbr as string) || 'Search Inter Branch GL'
            }
            onChange={handleSearch}
            searchValue={searchValue.interbr as string}
          />
        </StyledSearchableDropdown>
      </Grid>

      <Grid item={isTablet} mobile={12}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'upfront')
            }
            label="Penal Accrual"
            name="upfront"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.upfront as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.upfront as string) || 'Search Penal Accrual'
            }
            onChange={handleSearch}
            searchValue={searchValue.upfront as string}
          />
        </StyledSearchableDropdown>
      </Grid>

      <Grid item={isTablet} mobile={12}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'PaymentGL')
            }
            label="Interest Receivable"
            name="PaymentGL"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.PaymentGL as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.PaymentGL as string) ||
              'Search Interest Receivable'
            }
            onChange={handleSearch}
            searchValue={searchValue.PaymentGL as string}
          />
        </StyledSearchableDropdown>
      </Grid>

      <Grid item={isTablet} mobile={12}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'suspint')
            }
            label="Suspended Principal"
            name="suspint"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.suspint as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.suspint as string) || 'Search Suspended Principal'
            }
            onChange={handleSearch}
            searchValue={searchValue.suspint as string}
          />
        </StyledSearchableDropdown>
      </Grid>

      <Grid item={isTablet} mobile={12}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'susprinc')
            }
            label="Unearned Income GL"
            name="susprinc"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.susprinc as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.susprinc as string) || 'Search Unearned Income GL'
            }
            onChange={handleSearch}
            searchValue={searchValue.susprinc as string}
          />
        </StyledSearchableDropdown>
      </Grid>

      <Grid item={isTablet} mobile={12}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'ttax')
            }
            label="Miscellaneous income"
            name="ttax"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.ttax as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.ttax as string) || 'Search Miscellaneous income'
            }
            onChange={handleSearch}
            searchValue={searchValue.ttax as string}
          />
        </StyledSearchableDropdown>
      </Grid>

      <Grid item={isTablet} mobile={12}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'ttax2')
            }
            label="Penal Interest"
            name="ttax2"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.ttax2 as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.ttax2 as string) || 'Search Penal Interest'
            }
            onChange={handleSearch}
            searchValue={searchValue.ttax2 as string}
          />
        </StyledSearchableDropdown>
      </Grid>
    </>
  );
};
