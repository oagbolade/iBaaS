'use client';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form } from 'formik';
import dayjs, { Dayjs } from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { AlertColor } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import {
  BatchContainer,
  BatchTitle,
  PostingContainer,
  clearContentStyle
} from './style';
import { PreviewContentOne } from './CashDeposit';
import { MobilePreviewContent, actionButtons } from './BatchPosting';
import { PageTitle } from '@/components/Typography';
import {
  FormTextInput,
  FormSelectField,
  FormikDateTimePicker,
  FormSelectInput
} from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { OptionsI } from '@/components/FormikFields/FormSelectField';
import { ICurrency } from '@/api/ResponseTypes/general';
import { IGetCommercialBank } from '@/api/ResponseTypes/setup';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import {
  IClearingParams,
  OutwardClearingInitialValues
} from '@/schemas/schema-values/operation';
import {
  useCreateFwdAppOfficerOutWardClearing,
  useCreateOutwardClearing
} from '@/api/operation/useClearing';
import { IGetClearingBank, IGetZone } from '@/api/ResponseTypes/operation';
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
import { outwardClearing } from '@/schemas/operation';
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
  clearBanks: IGetClearingBank[] | Array<any>;
  zones: IGetZone[] | Array<any>;
  setIsSubmittingForward?: (submit: boolean) => void;
  isSubmittingForward?: boolean;
};

export const OutWard = ({
  clearBanks,
  isSubmitting,
  setIsSubmitting,
  commBanks,
  zones,
  currencies,
  setIsSubmittingForward,
  isSubmittingForward
}: Props) => {
  const toastActions = React.useContext(ToastMessageContext);
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const {
    mappedCurrency,
    mappedCommercialBank,
    mappedZone,
    mappedClearingBank
  } = useMapSelectOptions({
    currencies,
    commBanks,
    clearBanks,
    zones
  });
  const [searchParams, setSearchParams] = useState<IClearingParams>({
    bankcode: ''
  });

  const [selectedCurrency, setSelectedCurrency] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  const { mutate } = useCreateOutwardClearing({ ...searchParams });
  const { mutate: mutateOutWard } = useCreateFwdAppOfficerOutWardClearing({
    ...searchParams
  });
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
    setSearchParams((prev) => ({
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
    const params: IClearingParams = {
      bankcode: values.bankcode?.toString().length > 0 ? values.bankcode : null
    };
    const toastMessage = {
      title: 'Validation error',
      severity: 'error',
      accountNumber: {
        message: 'Account Name is required'
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
    setSearchParams(params);

    const getAllValues = {
      ...values,
      creditAcct: accountData?.accountnumber as string,
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
      setIsSubmittingForward?.(false);
      setIsSubmitting?.(false);
    };
  }, [isSubmitting, isSubmittingForward]);

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
      initialValues={OutwardClearingInitialValues}
      onSubmit={(values, actions) => onSubmit(values, actions)}
      validationSchema={outwardClearing}
    >
      <Form>
        <Grid container spacing={2}>
          <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={BatchContainer} ml={{ desktop: 1, mobile: 5 }}>
              <PageTitle title="Outward clearing" styles={BatchTitle} />
              <Grid container>
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
                        ) || 'Search  Destination Account'
                      }
                      onChange={handleSearch}
                      searchValue={searchValue.accountNumber as string}
                    />
                  </StyledSearchableDropdown>
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormSelectField
                    name="cleartype"
                    options={mappedClearingBank}
                    label="Logment Bank"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormSelectField
                    name="chequetype"
                    options={mappedZone}
                    label="Zone"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormSelectField
                    name="bankcode"
                    options={mappedCommercialBank}
                    label="Cheque Bank"
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
                  <FormTextInput
                    name="chkNum"
                    placeholder="Enter name"
                    label="Cheque Number"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormAmountInput
                    name="tranamount"
                    placeholder="Enter number"
                    label="Pay Amount"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    name="crossrate"
                    placeholder="Enter user"
                    label="Rate"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                    disabled
                  />
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <Box>
                    <DemoContainer components={['DatePicker']}>
                      <FormikDateTimePicker
                        label="Value Date"
                        name="valuedate"
                      />
                    </DemoContainer>
                  </Box>
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    name="narration1"
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
                  PreviewContent={
                    <PreviewContentOne accountDetails={accountData} />
                  }
                  customStyle={{ ...clearContentStyle }}
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
