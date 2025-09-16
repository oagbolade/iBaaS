import React from 'react';
import { Grid } from '@mui/material';
import { useFormikContext } from 'formik';
import { useCurrentBreakpoint } from '@/utils';
import {
  IGLWithBranchCode,
  IProdCodeType,
  IProdType
} from '@/api/ResponseTypes/setup';
import { ICurrency, IProductType } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { StyledSearchableDropdown } from '@/features/CustomerService/Form/CreateAccount';
import { ActionButtonWithPopper } from '@/components/Revamp/Buttons';
import { SearchIcon } from '@/assets/svg';
import { dropDownWithSearch } from '@/features/CustomerService/Form/style';
import { OptionsI } from '@/components/FormikFields/FormSelectField';
import { IGLAccount } from '@/api/ResponseTypes/admin';
import { filterGeneralLedgerDropdownSearch } from '@/utils/filterDropdownSearch';

type Props = {
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
  accountNumber: string | OptionsI[];
  [key: string]: any;
};
export const GeneralLedgerForm = ({
  productTypes,
  currencies,
  bankgl,
  dataWithCode
}: Props) => {
  const { isTablet } = useCurrentBreakpoint();
  const { mappedWithBranchCode } = useMapSelectOptions({
    productTypes,
    currencies,
    bankgl,
    dataWithCode
  });

  const { setFieldValue, values } = useFormikContext<any>();

  const [searchValue, setSearchValue] = React.useState<SearchFilters>({
    accountNumber: '',
    princbalBalance: '',
    susinterest: '',
    intaccrual: '',
    interestincome: '',
    interbr: '',
    penalIntAccrual: '',
    interestReceivable: '',
    susprinc: '',
    uid: '',
    micincome: '',
    penalInterest: '',
    penalIntSuspense: ''
  });

  const [filteredValues, setFilteredValues] = React.useState<SearchFilters>({
    accountNumber: [],
    princbalBalance: [],
    susinterest: [],
    intaccrual: [],
    interestincome: [],
    interbr: [],
    penalIntAccrual: [],
    interestReceivable: [],
    susprinc: [],
    uid: [],
    micincome: [],
    penalInterest: [],
    penalIntSuspense: []
  });

  const [selectedValue, setSelectedValue] = React.useState<SearchFilters>({
    accountNumber: '',
    princbalBalance: '',
    susinterest: '',
    intaccrual: '',
    interestincome: '',
    interbr: '',
    penalIntAccrual: '',
    interestReceivable: '',
    susprinc: '',
    uid: '',
    micincome: '',
    penalInterest: '',
    penalIntSuspense: ''
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
        accountNumber: mappedWithBranchCode,
        princbalBalance: mappedWithBranchCode,
        susinterest: mappedWithBranchCode,
        intaccrual: mappedWithBranchCode,
        interestincome: mappedWithBranchCode,
        interbr: mappedWithBranchCode,
        penalIntAccrual: mappedWithBranchCode,
        interestReceivable: mappedWithBranchCode,
        susprinc: mappedWithBranchCode,
        uid: mappedWithBranchCode,
        micincome: mappedWithBranchCode,
        penalInterest: mappedWithBranchCode,
        penalSuspense: mappedWithBranchCode
      });
    }
  };

  return (
    <Grid
      sx={{
        paddingLeft: '30px'
      }}
      container
      spacing={4}
    >
      <Grid item={isTablet} mobile={12} tablet={6}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'accountNumber')
            }
            label="GL Account Number"
            name="accountNumber"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.accountNumber as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.accountNumber as string) || 'Search Account Number'
            }
            onChange={handleSearch}
            searchValue={searchValue.accountNumber as string}
          />
        </StyledSearchableDropdown>
      </Grid>

      <Grid item={isTablet} mobile={12} tablet={6}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'princbalBalance')
            }
            label="Principal Balance"
            name="princbalBalance"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.princbalBalance as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.princbalBalance as string) ||
              'Search Principal Balance'
            }
            onChange={handleSearch}
            searchValue={searchValue.princbalBalance as string}
          />
        </StyledSearchableDropdown>
      </Grid>

      <Grid item={isTablet} mobile={12} tablet={6}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'susinterest')
            }
            label="Suspended Asset"
            name="susinterest"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.susinterest as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.susinterest as string) || 'Search Suspended Asset'
            }
            onChange={handleSearch}
            searchValue={searchValue.susinterest as string}
          />
        </StyledSearchableDropdown>
      </Grid>

      <Grid item={isTablet} mobile={12} tablet={6}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'intaccrual')
            }
            label="Interest Accrual"
            name="intaccrual"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.intaccrual as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.intaccrual as string) || 'Search Interest Accrual'
            }
            onChange={handleSearch}
            searchValue={searchValue.intaccrual as string}
          />
        </StyledSearchableDropdown>
      </Grid>

      <Grid item={isTablet} mobile={12} tablet={6}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'interestincome')
            }
            label="Interest Income"
            name="interestincome"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.interestincome as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.interestincome as string) ||
              'Search Interest Income'
            }
            onChange={handleSearch}
            searchValue={searchValue.interestincome as string}
          />
        </StyledSearchableDropdown>
      </Grid>

      <Grid item={isTablet} mobile={12} tablet={6}>
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

      <Grid item={isTablet} mobile={12} tablet={6}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'penalIntAccrual')
            }
            label="Penal Accrual"
            name="penalIntAccrual"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.penalIntAccrual as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.penalIntAccrual as string) ||
              'Search Penal Accrual'
            }
            onChange={handleSearch}
            searchValue={searchValue.penalIntAccrual as string}
          />
        </StyledSearchableDropdown>
      </Grid>

      <Grid item={isTablet} mobile={12} tablet={6}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'interestReceivable')
            }
            label="Interest Receivable"
            name="interestReceivable"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.interestReceivable as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.interestReceivable as string) ||
              'Search Interest Receivable'
            }
            onChange={handleSearch}
            searchValue={searchValue.interestReceivable as string}
          />
        </StyledSearchableDropdown>
      </Grid>

      <Grid item={isTablet} mobile={12} tablet={6}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'susprinc')
            }
            label="Suspended Principal"
            name="susprinc"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.susprinc as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.susprinc as string) || 'Search Suspended Principal'
            }
            onChange={handleSearch}
            searchValue={searchValue.susprinc as string}
          />
        </StyledSearchableDropdown>
      </Grid>

      <Grid item={isTablet} mobile={12} tablet={6}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'uid')
            }
            label="Unearned Income GL"
            name="uid"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.uid as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.uid as string) || 'Search Unearned Income GL'
            }
            onChange={handleSearch}
            searchValue={searchValue.uid as string}
          />
        </StyledSearchableDropdown>
      </Grid>

      <Grid item={isTablet} mobile={12} tablet={6}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'micincome')
            }
            label="Miscellaneous income"
            name="micincome"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.micincome as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.micincome as string) ||
              'Search Miscellaneous income'
            }
            onChange={handleSearch}
            searchValue={searchValue.micincome as string}
          />
        </StyledSearchableDropdown>
      </Grid>

      <Grid item={isTablet} mobile={12} tablet={6}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'penalInterest')
            }
            label="Penal Interest"
            name="penalInterest"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.penalInterest as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.penalInterest as string) || 'Search Penal Interest'
            }
            onChange={handleSearch}
            searchValue={searchValue.penalInterest as string}
          />
        </StyledSearchableDropdown>
      </Grid>

      <Grid item={isTablet} mobile={12} tablet={6}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'penalIntSuspense')
            }
            label="Penal Suspense"
            name="penalIntSuspense"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.penalIntSuspense as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.penalIntSuspense as string) ||
              'Search Penal Suspense'
            }
            onChange={handleSearch}
            searchValue={searchValue.penalIntSuspense as string}
          />
        </StyledSearchableDropdown>
      </Grid>
    </Grid>
  );
};
