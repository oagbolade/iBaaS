'use client';
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form } from 'formik';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useQuery } from '@tanstack/react-query';
import { AlertColor } from '@mui/material';
import { Dayjs } from 'dayjs';
import {
  BatchContainer,
  BatchTitle,
  PostingContainer,
  totalText,
  cashContentStyle
} from './style';
import { PreviewContentOne } from './CashDeposit';
import { MobilePreviewContent } from './BatchPosting';
import { PageTitle } from '@/components/Typography';
import {
  FormTextInput,
  FormSelectField,
  FormikDateTimePicker,
  FormSelectInput
} from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import DateTimePicker from '@/components/Revamp/FormFields/DateTimePicker';
import { IGetCommercialBank } from '@/api/ResponseTypes/setup';
import { ICurrency } from '@/api/ResponseTypes/general';
import { OptionsI } from '@/components/FormikFields/FormSelectField';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { extractIdFromDropdown } from '@/utils/extractIdFromDropdown';
import {
  searchCustomer,
  useGetAccountDetails
} from '@/api/customer-service/useCustomer';
import { useFinancialLastDate } from '@/utils/financialDates';
import { queryKeys } from '@/react-query/constants';
import { mapCustomerAccountNumberSearch } from '@/utils/mapCustomerSearch';
import { toast } from '@/utils/toast';
import { StyledSearchableDropdown } from '@/features/CustomerService/Form/CreateAccount';
import { ActionButtonWithPopper } from '@/components/Revamp/Buttons';
import { SearchIcon } from '@/assets/svg';
import { dropDownWithSearch } from '@/features/CustomerService/Form/style';
import { useCreateReturnCheque } from '@/api/operation/useReturnCheques';
import { ReturnChequeInitialValues } from '@/schemas/schema-values/operation';
import { returnCheque } from '@/schemas/operation';
import { encryptData } from '@/utils/encryptData';
import { FormAmountInput } from '@/components/FormikFields/FormAmountInput';

type SearchFilters = {
  accountNumber: string | OptionsI[];
  [key: string]: any;
};

type Props = {
  currencies: ICurrency[] | Array<any>;
  isSubmitting?: boolean;
  setIsSubmitting?: (submit: boolean) => void;
  commBanks: IGetCommercialBank[] | Array<any>;
};

export const ReturnCheque = ({
  commBanks,
  currencies,
  isSubmitting,
  setIsSubmitting
}: Props) => {
  const toastActions = React.useContext(ToastMessageContext);
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const { mappedCurrency, mappedCommercialBank } = useMapSelectOptions({
    currencies,
    commBanks
  });
  const [selectedCurrency, setSelectedCurrency] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const { mutate } = useCreateReturnCheque();
  const [searchValue, setSearchValue] = React.useState<SearchFilters>({
    accountNumber: ''
  });
  const [filteredValues, setFilteredValues] = React.useState<SearchFilters>({
    accountNumber: []
  });
  const [selectedValue, setSelectedValue] = React.useState<SearchFilters>({
    accountNumber: ''
  });
  const accountId = String(
    extractIdFromDropdown(selectedValue.accountNumber as string)
  );
  const { accDetailsResults: accountData, isLoading: isAccountDetailsLoading } =
    useGetAccountDetails(encryptData(accountId) || '');
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

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setSearchValue((prev) => ({
      ...prev,
      [name]: value
    }));

    const mappedSearchResults = mapCustomerAccountNumberSearch(
      data?.accountDetailsResults
    );

    setFilteredValues((prev) => ({
      ...prev,
      [name]: mappedSearchResults
    }));

    if (value.trim().length === 0) {
      setFilteredValues({
        accountNumber: []
      });
    }
  };
  const onSubmit = async (values: any, actions: { resetForm: Function }) => {
    const toastMessage = {
      title: 'Validation error',
      severity: 'error',
      accountNumber: {
        message: 'Account Number is required'
      },
      selectedCurrency: {
        message: 'Currency is required'
      }
    };
    if (searchValue.accountNumber === '') {
      toast(
        toastMessage.accountNumber.message,
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
      accountNumber: accountData?.accountnumber as string,
      currencyCode: selectedCurrency
    };
    await mutate(getAllValues);
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
      initialValues={ReturnChequeInitialValues}
      onSubmit={(values, actions) => onSubmit(values, actions)}
      validationSchema={returnCheque}
    >
      <Form>
        <Grid container spacing={2}>
          <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={BatchContainer} ml={{ desktop: 1, mobile: 5 }}>
              <PageTitle title="Return Cheques Reversal" styles={BatchTitle} />
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
                  <FormSelectField
                    name="clearingBankCode"
                    options={mappedCommercialBank}
                    label="Logment Bank"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    name="chequeNumber"
                    placeholder="Enter cheque number"
                    label="Cheque Number"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
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
                  <Box>
                    <DemoContainer components={['DatePicker']}>
                      <FormikDateTimePicker
                        label="Value Date"
                        name="valueDate"
                      />
                    </DemoContainer>
                  </Box>
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <Box>
                    <DemoContainer components={['DatePicker']}>
                      <FormikDateTimePicker label="Due Date" name="dueDate" />
                    </DemoContainer>
                  </Box>
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormAmountInput
                    name="payAmount"
                    placeholder="Enter pay amount"
                    label="Pay Amount"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    name="rate"
                    placeholder="Enter Rate"
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
                    placeholder="Enter narration "
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
                  PreviewContent={
                    <PreviewContentOne accountDetails={accountData} />
                  }
                  customStyle={{ ...cashContentStyle }}
                />
              ) : (
                <PreviewContentOne accountDetails={accountData} />
              )}{' '}
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
