'use client';
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form } from 'formik';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useQuery } from '@tanstack/react-query';
import { AlertColor } from '@mui/material';
import {
  BatchContainer,
  BatchTitle,
  PostingContainer,
  inputText,
  cashContentStyle
} from './style';
import { MobilePreviewContent } from './BatchPosting';
import { PreviewContentOne } from './CashDeposit';
import { PageTitle } from '@/components/Typography';
import {
  FormTextInput,
  FormSelectField,
  FormikRadioButton,
  FormikDateTimePicker
} from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { Tabs } from '@/components/Revamp/Tabs';
import { OptionsI } from '@/components/FormikFields/FormSelectField';
import { ICurrency } from '@/api/ResponseTypes/general';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { extractIdFromDropdown } from '@/utils/extractIdFromDropdown';
import {
  searchCustomer,
  useGetAccountDetails
} from '@/api/customer-service/useCustomer';
import { queryKeys } from '@/react-query/constants';
import { mapCustomerAccountNumberSearch } from '@/utils/mapCustomerSearch';
import { toast } from '@/utils/toast';
import { StyledSearchableDropdown } from '@/features/CustomerService/Form/CreateAccount';
import { ActionButtonWithPopper } from '@/components/Revamp/Buttons';
import { SearchIcon } from '@/assets/svg';
import { dropDownWithSearch } from '@/features/CustomerService/Form/style';
import {
  useCreateChequeWithdrawal,
  useGetCounterCheqNo
} from '@/api/operation/useChequeWithdrawal';
import { ChequeWithdrawalInitialValues } from '@/schemas/schema-values/operation';
import { chequeWithdraw } from '@/schemas/operation';
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
};

export const ChequeWithdrawal = ({
  currencies,
  isSubmitting,
  setIsSubmitting
}: Props) => {
  const toastActions = React.useContext(ToastMessageContext);
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const { mappedCurrency } = useMapSelectOptions({
    currencies
  });

  const { mutate } = useCreateChequeWithdrawal();
  const [selectValue, setSelectValue] = React.useState<boolean>(false);
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
  const { nextCounterCheqNo } = useGetCounterCheqNo(accountId);
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
  const tabTitle = ['Account Information', 'Signatory  Information'];
  const pageMenu = [
    <PreviewContentOne accountDetails={accountData} />,
    <PreviewContentOne accountDetails={accountData} />
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

  const onSubmit = async (values: any, actions: { resetForm: Function }) => {
    const toastMessage = {
      title: 'Validation error',
      severity: 'error',
      accountNumber1: {
        message: 'Account Name is required'
      }
    };
    if (searchValue.accountNumber1 === '') {
      toast(
        toastMessage.accountNumber1.message,
        toastMessage.title,
        toastMessage.severity as AlertColor,
        toastActions
      );

      return;
    }

    const getAllValues = {
      ...values,
      accountNumber1: accountData?.accountnumber as string
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

  const handleRadioButton = (value: boolean) => {
    setSelectValue(value);
  };
  return (
    <Formik
      initialValues={ChequeWithdrawalInitialValues}
      onSubmit={(values, actions) => onSubmit(values, actions)}
      validationSchema={chequeWithdraw}
    >
      <Form>
        <Grid container spacing={2}>
          <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={BatchContainer} ml={{ desktop: 1, mobile: 5 }}>
              <PageTitle title="Cheque Withdrawal" styles={BatchTitle} />
              <Grid container>
                <Grid item={isTablet} mobile={12}>
                  <FormikRadioButton
                    options={[
                      { label: 'Bank Cheques', value: '0' },
                      { label: 'Counter Cheques', value: '1' }
                    ]}
                    title="Select In-house Cheque Type"
                    name="action"
                    value={ChequeWithdrawalInitialValues.action}
                    handleCheck={handleRadioButton}
                  />
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <StyledSearchableDropdown>
                    <ActionButtonWithPopper
                      loading={isSearchLoading}
                      handleSelectedValue={(value: string) =>
                        handleSelectedValue(value, 'accountNumber')
                      }
                      label="Account Name"
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
                    name="currencyCode"
                    options={mappedCurrency}
                    label="Currency"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  {selectValue === true ? (
                    <FormTextInput
                      name="cheqNumber"
                      placeholder="Enter Cheques Number "
                      label="Cheque Number"
                      customStyle={{
                        width: setWidth(isMobile ? '250px' : '100%')
                      }}
                      value={nextCounterCheqNo?.toString() || '0'}
                      disabled
                    />
                  ) : (
                    <FormTextInput
                      name="cheqNumber"
                      placeholder="Enter Cheque Number"
                      label="Cheque Number"
                      customStyle={{
                        width: setWidth(isMobile ? '250px' : '100%')
                      }}
                    />
                  )}
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
                  customStyle={{ ...cashContentStyle }}
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
