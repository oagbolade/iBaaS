'use client';
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form } from 'formik';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AlertColor } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';
import {
  BatchContainer,
  BatchTitle,
  PostingContainer,
  totalText,
  inputText,
  ChequelContentStyle
} from './style';
import { MobilePreviewContent, actionButtons } from './BatchPosting';
import { PreviewContentOne } from './CashDeposit';
import { PageTitle } from '@/components/Typography';
import {
  FormTextInput,
  FormSelectField,
  FormikDateTimePicker,
  FormSelectInput
} from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { Tabs } from '@/components/Revamp/Tabs';
import DateTimePicker from '@/components/Revamp/FormFields/DateTimePicker';
import { toast } from '@/utils/toast';
import { queryKeys } from '@/react-query/constants';
import { extractIdFromDropdown } from '@/utils/extractIdFromDropdown';
import {
  searchCustomer,
  useGetAccountDetails
} from '@/api/customer-service/useCustomer';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { OptionsI } from '@/components/FormikFields/FormSelectField';
import { ICurrency } from '@/api/ResponseTypes/general';
import { mapCustomerAccountNumberSearch } from '@/utils/mapCustomerSearch';
import { SearchIcon } from '@/assets/svg';
import { StyledSearchableDropdown } from '@/features/CustomerService/Form/CreateAccount';
import { ActionButtonWithPopper } from '@/components/Revamp/Buttons';
import { dropDownWithSearch } from '@/features/CustomerService/Form/style';
import {
  useCreateChequeDeposit,
  useForwardtoAppOffChequeDep
} from '@/api/operation/useChequeDeposit';
import { ChequeDepositInitialValues } from '@/schemas/schema-values/operation';
import { chequeDeposit } from '@/schemas/operation';
import { useFinancialLastDate } from '@/utils/financialDates';
import { encryptData } from '@/utils/encryptData';
import { FormAmountInput } from '@/components/FormikFields/FormAmountInput';

type SearchFilters = {
  accountNumber: string | OptionsI[];
  destinationAccountNumber: string | OptionsI[];
  [key: string]: any;
};

type Props = {
  currencies: ICurrency[] | Array<any>;
  isSubmitting?: boolean;
  setIsSubmitting?: (submit: boolean) => void;
  setIsSubmittingForward?: (submit: boolean) => void;
  isSubmittingForward?: boolean;
};
export const ChequeDeposit = ({
  setIsSubmitting,
  isSubmitting,
  currencies,
  setIsSubmittingForward,
  isSubmittingForward
}: Props) => {
  const toastActions = React.useContext(ToastMessageContext);
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const { mappedCurrency } = useMapSelectOptions({
    currencies
  });

  const [selectedCurrency, setSelectedCurrency] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  const { mutate } = useCreateChequeDeposit();
  const { mutate: createMutate } = useForwardtoAppOffChequeDep();
  const [searchValue, setSearchValue] = React.useState<SearchFilters>({
    accountNumber: '',
    destinationAccountNumber: ''
  });

  const [filteredValues, setFilteredValues] = React.useState<SearchFilters>({
    accountNumber: [],
    destinationAccountNumber: []
  });
  const [selectedValue, setSelectedValue] = React.useState<SearchFilters>({
    accountNumber: '',
    destinationAccountNumber: ''
  });
  const accountId = String(
    extractIdFromDropdown(selectedValue.accountNumber as string)
  );
  const accountNumber = String(
    extractIdFromDropdown(selectedValue.destinationAccountNumber as string)
  );
  const {
    accDetailsResults: accountSourceData,
    isLoading: isAccountSourceDetailsLoading
  } = useGetAccountDetails(encryptData(accountId) || '');
  const {
    accDetailsResults: accountDestinationData,
    isLoading: isAccountDestinationLoading
  } = useGetAccountDetails(encryptData(accountNumber) || '');
  const handleSelectedValue = (value: string, name: string) => {
    setSelectedValue((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const { data, isLoading: isSearchLoading } = useQuery({
    queryKey: [queryKeys.searchCustomer, searchValue],
    queryFn: () =>
      searchCustomer(toastActions, searchValue.accountNumber as string),
    enabled: Boolean(searchValue.accountNumber.length > 0)
  });
  const { data: destinationData, isLoading: isSearchDataLoading } = useQuery({
    queryKey: [queryKeys.destinationAccount, searchValue],
    queryFn: () =>
      searchCustomer(
        toastActions,
        searchValue.destinationAccountNumber as string
      ),
    enabled: Boolean(searchValue.destinationAccountNumber.length > 0)
  });
  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setSearchValue((prev) => ({
      ...prev,
      [name]: value
    }));

    const mappedSearchResults = mapCustomerAccountNumberSearch(
      data?.accountDetailsResults
    );
    const mappedDestinationSearchResults = mapCustomerAccountNumberSearch(
      destinationData?.accountDetailsResults
    );
    setFilteredValues((prev) => ({
      ...prev,
      [name]: mappedSearchResults || mappedDestinationSearchResults
    }));
    if (value.trim().length === 0) {
      setFilteredValues({
        accountNumber: [],
        destinationAccountNumber: []
      });
    }
  };

  const handledestinationSearch = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, name } = event.target;

    setSearchValue((prev) => ({
      ...prev,
      [name]: value
    }));
    const mappedDestinationSearchResults = mapCustomerAccountNumberSearch(
      destinationData?.accountDetailsResults
    );
    setFilteredValues((prev) => ({
      ...prev,
      [name]: mappedDestinationSearchResults
    }));
    if (value.trim().length === 0) {
      setFilteredValues({
        accountNumber: [],
        destinationAccountNumber: []
      });
    }
  };
  const tabTitle = ['Source Account', 'Destination Account'];
  const pageMenu = [
    <PreviewContentOne accountDetails={accountSourceData} />,
    <PreviewContentOne accountDetails={accountDestinationData} />
  ];
  const PreviewContent: React.FC = () => {
    return (
      <Box sx={{ width: '100%' }}>
        <Tabs
          tabTitle={tabTitle}
          pageMenu={pageMenu}
          customStyle={{ ...inputText }}
        />
      </Box>
    );
  };

  const onSubmit = async (values: any) => {
    const toastMessage = {
      title: 'Validation error',
      severity: 'error',
      accountNumber1: {
        message: 'Account Source Number is required'
      },
      accountNumber2: {
        message: 'Account Desination Number is required'
      },
      selectedCurrency: {
        message: 'Currency is required'
      }
    };
    if (
      searchValue.accountNumber1 === '' ||
      searchValue.accountNumber2 === ''
    ) {
      toast(
        toastMessage.accountNumber1.message ||
          toastMessage.accountNumber2.message,
        toastMessage.title,
        toastMessage.severity as AlertColor,
        toastActions
      );

      return;
    }

    if (selectedCurrency === '') {
      toast(
        toastMessage.selectedCurrency.message,
        toastMessage.title,
        toastMessage.severity as AlertColor,
        toastActions
      );
      return;
    }

    const getAllValues = {
      ...values,
      accountNumber1: accountSourceData?.accountnumber as string,
      accountNumber2: accountDestinationData?.accountnumber as string,
      action: 0, // OME need to get back to me on it
      currencyCode: selectedCurrency
    };
    mutate(getAllValues);
  };
  useEffect(() => {
    const submit = document.getElementById('submitButton');

    if (isSubmitting) {
      submit?.click();
    }

    return () => {
      setIsSubmitting?.(false);
    };
  }, [isSubmitting]);

  React.useEffect(() => {
    if (mappedCurrency.length > 0) {
      const defaultCurrency =
        mappedCurrency.find((c) =>
          ['naira', 'nigeria', 'ngn'].some(
            (keyword) =>
              c.name.toLowerCase().includes(keyword) ||
              c.value.toLowerCase().includes(keyword)
          )
        )?.value ||
        mappedCurrency[0]?.value ||
        '';

      setSelectedCurrency(defaultCurrency);
      setIsLoading(false);
    }
  }, [mappedCurrency]); // Runs when mappedCurrency changes

  if (isLoading) return <div>Loading currencies...</div>;

  return (
    <Formik
      initialValues={ChequeDepositInitialValues}
      onSubmit={(values) => {
        onSubmit(values);
      }}
      validationSchema={chequeDeposit}
    >
      <Form>
        <Grid container spacing={2}>
          <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={BatchContainer} ml={{ desktop: 1, mobile: 5 }}>
              <PageTitle title="Cheque Deposit" styles={BatchTitle} />
              <Grid container>
                <Grid item={isTablet} mobile={12}>
                  <StyledSearchableDropdown>
                    <ActionButtonWithPopper
                      loading={isSearchLoading}
                      handleSelectedValue={(value: string) =>
                        handleSelectedValue(value, 'accountNumber')
                      }
                      label="Source Account"
                      name="accountNumber"
                      searchGroupVariant="BasicSearchGroup"
                      dropDownOptions={
                        filteredValues.accountNumber as OptionsI[]
                      }
                      customStyle={{ ...dropDownWithSearch, width: '560px' }}
                      icon={<SearchIcon />}
                      iconPosition="end"
                      buttonTitle={
                        extractIdFromDropdown(
                          selectedValue.accountNumber as string
                        ) || 'Search Source Number'
                      }
                      onChange={handleSearch}
                      searchValue={searchValue.accountNumber as string}
                    />
                  </StyledSearchableDropdown>
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <StyledSearchableDropdown>
                    <ActionButtonWithPopper
                      loading={isSearchDataLoading}
                      handleSelectedValue={(value: string) =>
                        handleSelectedValue(value, 'destinationAccountNumber')
                      }
                      label="Destination Account"
                      name="destinationAccountNumber"
                      searchGroupVariant="BasicSearchGroup"
                      dropDownOptions={
                        filteredValues.destinationAccountNumber as OptionsI[]
                      }
                      customStyle={{ ...dropDownWithSearch, width: '560px' }}
                      icon={<SearchIcon />}
                      iconPosition="end"
                      buttonTitle={
                        extractIdFromDropdown(
                          selectedValue.destinationAccountNumber as string
                        ) || 'Search  Destination Account'
                      }
                      onChange={handledestinationSearch}
                      searchValue={
                        searchValue.destinationAccountNumber as string
                      }
                    />
                  </StyledSearchableDropdown>
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormSelectInput
                    name="currencyCode"
                    options={mappedCurrency}
                    label="Currency"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                    value={selectedCurrency}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setSelectedCurrency(e.target.value)
                    }
                  />
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    name="cheqNumber"
                    placeholder="Enter Cheque Number"
                    label="Cheque Number"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    name="tellerno"
                    placeholder="Enter Teller Number"
                    label="Teller Number"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <Box>
                    <FormikDateTimePicker label="Value Date" name="valueDate" />
                  </Box>
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormAmountInput
                    name="transAmount"
                    placeholder="Enter Pay Amount"
                    label="Pay Amount"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    name="rate"
                    placeholder="."
                    label="Rate"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                    disabled
                  />
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    name="narration"
                    placeholder="Enter Narration"
                    label="Narration"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box sx={PostingContainer}>
              {isMobile ? (
                <MobilePreviewContent
                  PreviewContent={<PreviewContent />}
                  customStyle={{ ...ChequelContentStyle }}
                />
              ) : (
                <PreviewContent />
              )}
            </Box>
          </Box>
        </Grid>
        <button id="submitButton" type="submit" style={{ display: 'none' }}>
          submit alias
        </button>
      </Form>
    </Formik>
  );
};
