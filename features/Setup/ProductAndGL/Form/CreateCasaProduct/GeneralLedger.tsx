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
  accountNumber?: string | OptionsI[];
  [key: string]: any;
};
export const GeneralCasaLedgerForm = ({
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
    liabilityBal: '',
    suspendedAsset: '',
    assetBalance: '',
    interestReceivable: '',
    unearnincome: '',
    interestExpense: '',
    interestIncome: '',
    suspendedIntIncome: '',
    interestPayable: '',
    interbr: '',
    taxabsorbed1: '',
    acctClosegl: '',
    unearnexp: ''
  });

  const [filteredValues, setFilteredValues] = React.useState<SearchFilters>({
    liabilityBal: [],
    suspendedAsset: [],
    assetBalance: [],
    interestReceivable: [],
    unearnincome: [],
    interestExpense: [],
    interestIncome: [],
    suspendedIntIncome: [],
    interestPayable: [],
    interbr: [],
    taxabsorbed1: [],
    acctClosegl: [],
    unearnexp: []
  });
  const [selectedValue, setSelectedValue] = React.useState<SearchFilters>({
    liabilityBal: '',
    suspendedAsset: '',
    assetBalance: '',
    interestReceivable: '',
    unearnincome: '',
    interestExpense: '',
    interestIncome: '',
    suspendedIntIncome: '',
    interestPayable: '',
    interbr: '',
    taxabsorbed1: '',
    acctClosegl: '',
    unearnexp: ''
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
    const filteredGLItems = filterGeneralLedgerDropdownSearch(
      mappedWithBranchCode,
      value
    );

    setFilteredValues((prev) => ({
      ...prev,
      [name]: filteredGLItems
    }));

    if (value.trim().length === 0) {
      setFilteredValues({
        liabilityBal: mappedWithBranchCode,
        suspendedAsset: mappedWithBranchCode,
        assetBalance: mappedWithBranchCode,
        interestReceivable: mappedWithBranchCode,
        unearnincome: mappedWithBranchCode,
        interestExpense: mappedWithBranchCode,
        interestIncome: mappedWithBranchCode,
        suspendedIntIncome: mappedWithBranchCode,
        interestPayable: mappedWithBranchCode,
        interbr: mappedWithBranchCode,
        taxabsorbed1: mappedWithBranchCode,
        acctClosegl: mappedWithBranchCode,
        unearnexp: mappedWithBranchCode
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
              handleSelectedValue(value, 'unearnexp')
            }
            label="Unearned Interest"
            name="unearnexp"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.unearnexp as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.unearnexp as string) || 'Search Principal Balance'
            }
            onChange={handleSearch}
            searchValue={searchValue.unearnexp as string}
          />
        </StyledSearchableDropdown>
      </Grid>
      <Grid item={isTablet} mobile={12} tablet={6}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'suspendedAsset')
            }
            label="Suspended Asset"
            name="suspendedAsset"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.suspendedAsset as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.suspendedAsset as string) ||
              'Search Suspended Asse'
            }
            onChange={handleSearch}
            searchValue={searchValue.suspendedAsset as string}
          />
        </StyledSearchableDropdown>
      </Grid>
      <Grid item={isTablet} mobile={12} tablet={6}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'assetBalance')
            }
            label="Asset Balance"
            name="assetBalance"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.assetBalance as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.assetBalance as string) || 'Search Asset Balance'
            }
            onChange={handleSearch}
            searchValue={searchValue.assetBalance as string}
          />
        </StyledSearchableDropdown>
      </Grid>
      <Grid item={isTablet} mobile={12} tablet={6}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'interestReceivable')
            }
            label="Int. Receivable"
            name="interestReceivable"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.interestReceivable as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.interestReceivable as string) ||
              'Search Int. Receivable'
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
              handleSelectedValue(value, 'unearnincome')
            }
            label="Interest Unpaid (Accrued)"
            name="unearnincome"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.unearnincome as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.unearnincome as string) ||
              'Search  Interest Unpaid'
            }
            onChange={handleSearch}
            searchValue={searchValue.unearnincome as string}
          />
        </StyledSearchableDropdown>
      </Grid>
      <Grid item={isTablet} mobile={12} tablet={6}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'liabilityBal')
            }
            label="Liability Balances"
            name="liabilityBal"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.liabilityBal as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.liabilityBal as string) ||
              'Search  Liability Balances'
            }
            onChange={handleSearch}
            searchValue={searchValue.liabilityBal as string}
          />
        </StyledSearchableDropdown>
      </Grid>
      <Grid item={isTablet} mobile={12} tablet={6}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'interestExpense')
            }
            label="Interest Expense"
            name="interestExpense"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.interestExpense as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.interestExpense as string) ||
              'Search Interest Expense'
            }
            onChange={handleSearch}
            searchValue={searchValue.interestExpense as string}
          />
        </StyledSearchableDropdown>
      </Grid>
      <Grid item={isTablet} mobile={12} tablet={6}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'interestIncome')
            }
            label="Int Income"
            name="interestIncome"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.interestIncome as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.interestIncome as string) || 'Search Int Income'
            }
            onChange={handleSearch}
            searchValue={searchValue.interestIncome as string}
          />
        </StyledSearchableDropdown>
      </Grid>
      <Grid item={isTablet} mobile={12} tablet={6}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'suspendedIntIncome')
            }
            label="Suspended Interest"
            name="suspendedIntIncome"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.suspendedIntIncome as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.suspendedIntIncome as string) ||
              'Search Suspended Interest'
            }
            onChange={handleSearch}
            searchValue={searchValue.suspendedIntIncome as string}
          />
        </StyledSearchableDropdown>
      </Grid>
      <Grid item={isTablet} mobile={12} tablet={6}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'interestPayable')
            }
            label="Interest Payable"
            name="interestPayable"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.interestPayable as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.interestPayable as string) ||
              'Search Interest Payable'
            }
            onChange={handleSearch}
            searchValue={searchValue.interestPayable as string}
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
              handleSelectedValue(value, 'taxabsorbed1')
            }
            label="Tax Account"
            name="taxabsorbed1"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.taxabsorbed1 as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.taxabsorbed1 as string) || 'Search Tax Account'
            }
            onChange={handleSearch}
            searchValue={searchValue.taxabsorbed1 as string}
          />
        </StyledSearchableDropdown>
      </Grid>
      <Grid item={isTablet} mobile={12} tablet={6}>
        <StyledSearchableDropdown>
          <ActionButtonWithPopper
            handleSelectedValue={(value: string) =>
              handleSelectedValue(value, 'acctClosegl')
            }
            label="Closing GL Account"
            name="acctClosegl"
            searchGroupVariant="GLSearchGroup"
            dropDownOptions={filteredValues.acctClosegl as OptionsI[]}
            customStyle={{ ...dropDownWithSearch, width: '960px' }}
            icon={<SearchIcon />}
            iconPosition="end"
            buttonTitle={
              (selectedValue.acctClosegl as string) ||
              'Search Closing GL Account'
            }
            onChange={handleSearch}
            searchValue={searchValue.acctClosegl as string}
          />
        </StyledSearchableDropdown>
      </Grid>
    </Grid>
  );
};
