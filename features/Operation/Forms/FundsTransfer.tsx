'use client';

import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form, useFormikContext } from 'formik';
import { useQuery } from '@tanstack/react-query';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AlertColor, Typography } from '@mui/material';
import { PreviewBeneficiaryInformation } from '../fundsTransfer/PreviewSection/PreviewBeneficiaryInformation';
import { PreviewDebitInformation } from '../fundsTransfer/PreviewSection/PreviewDebitInformation';
import {
  BatchContainer,
  BatchTitle,
  PostingContainer,
  inputText,
  fundsContentStyle
} from './style';
import { MobilePreviewContent } from './BatchPosting';
import { PageTitle } from '@/components/Typography';
import {
  FormTextInput,
  FormSelectField,
  FormikRadioButton,
  TextInput,
  FormikDateTimePicker
} from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { dropDownWithSearch } from '@/features/CustomerService/Form/style';
import { Tabs } from '@/components/Revamp/Tabs';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { StyledSearchableDropdown } from '@/features/CustomerService/Form/CreateAccount';
import { ActionButtonWithPopper } from '@/components/Revamp/Buttons';
import { queryKeys } from '@/react-query/constants';
import {
  searchCustomer,
  useGetAccountDetails
} from '@/api/customer-service/useCustomer';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { mapCustomerAccountNumberSearch } from '@/utils/mapCustomerSearch';
import { SearchIcon } from '@/assets/svg';
import { OptionsI } from '@/components/FormikFields/FormSelectField';
import { extractIdFromDropdown } from '@/utils/extractIdFromDropdown';
import { ICurrency } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { IGetCommercialBank } from '@/api/ResponseTypes/setup';
import { FundTransferSchema } from '@/schemas/operation';
import { FundTransferInitialValues } from '@/schemas/schema-values/operation';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  CashDepositForwardToApprovingOfficerButtonStyle,
  submitButton
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import {
  useForwardTransferApprovingOffice,
  useFundsTransfer
} from '@/api/operation/useFundsTransfer';
import { toast } from '@/utils/toast';
import { fundsTransferRadioOptions } from '@/constants/SetupOptions';
import { encryptData } from '@/utils/encryptData';
import { FormAmountInput } from '@/components/FormikFields/FormAmountInput';

interface Props {
  currencies?: ICurrency[] | Array<any>;
  commBanks?: IGetCommercialBank[] | Array<any>;
}
type SearchFilters = {
  accountNumber: string | OptionsI[];
  beneficiaryNumber: string | OptionsI[];
  [key: string]: any;
};
export const FundsTransfer = ({ currencies, commBanks }: Props) => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const [selectedValue, setSelectedValue] = useState<SearchFilters>({
    accountNumber: '',
    beneficiaryNumber: ''
  });
  const [filteredValues, setFilteredValues] = useState<SearchFilters>({
    accountNumber: [],
    beneficiaryNumber: []
  });
  const [searchValue, setSearchValue] = useState<SearchFilters>({
    accountNumber: '',
    beneficiaryNumber: ''
  });
  const toastActions = useContext(ToastMessageContext);
  const { mutate } = useFundsTransfer();
  const { mutate: mutateForward } = useForwardTransferApprovingOffice();

  const { submitForm } = useFormikContext() ?? {};

  const accountId = String(
    extractIdFromDropdown(selectedValue.accountNumber as string)
  );
  const beneficiaryId = String(
    extractIdFromDropdown(selectedValue.beneficiaryNumber as string)
  );
  const { accDetailsResults: accountData } = useGetAccountDetails(
    encryptData(accountId) || ''
  );
  const { accDetailsResults: beneficiaryData } = useGetAccountDetails(
    encryptData(beneficiaryId) || ''
  );
  const tabTitle = ['Debit  Information', 'Beneficiary  Information'];
  const pageMenu = [
    <PreviewDebitInformation accountDetails={accountData} />,
    <PreviewBeneficiaryInformation accountDetails={beneficiaryData} />
  ];
  const PreviewContent = () => {
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

  const { mappedCurrency, mappedCommercialBank } = useMapSelectOptions({
    currencies,
    commBanks
  });

  const { data, isLoading: isSearchLoading } = useQuery({
    queryKey: [queryKeys.searchCustomer, searchValue],
    queryFn: () =>
      searchCustomer(toastActions, searchValue.accountNumber as string),
    enabled: Boolean(searchValue.accountNumber.length > 0)
  });
  const { data: beneficiaryDetail, isLoading: isbeneficiaryLoading } = useQuery(
    {
      queryKey: [queryKeys.beneficiaryCustomer, searchValue],
      queryFn: () =>
        searchCustomer(toastActions, searchValue.beneficiaryNumber as string),
      enabled: Boolean(searchValue.beneficiaryNumber.length > 0)
    }
  );

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
        accountNumber: [],
        beneficiaryNumber: []
      });
    }
  };

  const handleCreditSearch = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, name } = event.target;

    setSearchValue((prev) => ({
      ...prev,
      [name]: value
    }));

    const mappedbeneficiaryResults = mapCustomerAccountNumberSearch(
      beneficiaryDetail?.accountDetailsResults
    );
    setFilteredValues((prev) => ({
      ...prev,
      [name]: mappedbeneficiaryResults
    }));

    if (value.trim().length === 0) {
      setFilteredValues({
        accountNumber: [],
        beneficiaryNumber: []
      });
    }
  };
  const beneficiaryAccount = beneficiaryData?.accountnumber?.toString();
  const onSubmit = async (values: any) => {
    const toastMessage = {
      title: 'Validation error',
      severity: 'error',
      accountNumber: {
        message: 'Debit and Beneficiary Account Name are required'
      },
      creditAcct: {
        message: 'Beneficiary Account Name is required'
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

    if (searchValue.beneficiaryNumber === '') {
      toast(
        toastMessage.creditAcct.message,
        toastMessage.title,
        toastMessage.severity as AlertColor,
        toastActions
      );
      return;
    }

    const getAllValues = {
      ...values,
      debitAcct: accountId,
      creditAcct: beneficiaryAccount
    };

    mutate?.(getAllValues); // Call useFundsTransfer
  };
  const actionButtons = [
    <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
      <PrimaryIconButton
        type="submit"
        buttonTitle="Submit"
        customStyle={{ ...submitButton }}
        onClick={submitForm}
      />
    </Box>
  ];
  const handleSelectedValue = (value: string, name: string) => {
    setSelectedValue((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Formik
      initialValues={FundTransferInitialValues}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={FundTransferSchema}
    >
      <Form>
        <Box sx={{ marginTop: '70px' }}>
          <TopActionsArea actionButtons={actionButtons} />
        </Box>
        <Grid container spacing={2}>
          <Box sx={BatchContainer} ml={{ desktop: 1, mobile: 5 }}>
            <PageTitle title="Funds Transfer" styles={BatchTitle} />
            <Grid container>
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
                <FormSelectField
                  name="transfertype"
                  options={[
                    { name: 'Transfer with COT', value: '1' },
                    {
                      name: 'Transfer with no COT',
                      value: '0'
                    }
                  ]}
                  label="Transfer Type"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid mt={1} item={isTablet} mobile={12}>
                <FormikRadioButton
                  options={fundsTransferRadioOptions}
                  title="Reversal"
                  name="reversal"
                  value="mianAction"
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <StyledSearchableDropdown>
                  <ActionButtonWithPopper
                    loading={isSearchLoading}
                    handleSelectedValue={(value: string) =>
                      handleSelectedValue(value, 'accountNumber')
                    }
                    label="Debit Account Name"
                    name="accountNumber"
                    searchGroupVariant="BasicSearchGroup"
                    dropDownOptions={filteredValues.accountNumber as OptionsI[]}
                    customStyle={{ ...dropDownWithSearch, width: '560px' }}
                    icon={<SearchIcon />}
                    iconPosition="end"
                    buttonTitle={
                      extractIdFromDropdown(
                        selectedValue.accountNumber as string
                      ) || 'Search'
                    }
                    onChange={handleSearch}
                    searchValue={searchValue.accountNumber as string}
                  />
                </StyledSearchableDropdown>
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <StyledSearchableDropdown>
                  <ActionButtonWithPopper
                    loading={isbeneficiaryLoading}
                    handleSelectedValue={(value: string) =>
                      handleSelectedValue(value, 'beneficiaryNumber')
                    }
                    label="Credit Account Name"
                    name="beneficiaryNumber"
                    searchGroupVariant="BasicSearchGroup"
                    dropDownOptions={
                      filteredValues.beneficiaryNumber as OptionsI[]
                    }
                    customStyle={{ ...dropDownWithSearch, width: '560px' }}
                    icon={<SearchIcon />}
                    iconPosition="end"
                    buttonTitle={
                      extractIdFromDropdown(
                        selectedValue.beneficiaryNumber as string
                      ) || 'Search'
                    }
                    onChange={handleCreditSearch}
                    searchValue={searchValue.beneficiaryNumber as string}
                  />
                </StyledSearchableDropdown>
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <Box>
                  <DemoContainer components={['DatePicker']}>
                    <FormikDateTimePicker label="Value Date" name="valuedate" />
                  </DemoContainer>
                </Box>
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormAmountInput
                  name="tranamount"
                  placeholder="Enter Pay Amount"
                  label="Pay Amount"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="crossrate"
                  label="Rate"
                  placeholder="Enter Rate"
                  disabled
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="tranamount"
                  label="Transaction Amount"
                  placeholder="Enter Transaction Amount"
                  disabled
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="tellerno"
                  label="Teller Number"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                  placeholder="Enter Teller Number"
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="narration1"
                  label="Narration"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                  placeholder="Enter Narration"
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={PostingContainer}>
            {isMobile ? (
              <MobilePreviewContent
                PreviewContent={<PreviewContent />}
                customStyle={{ ...fundsContentStyle }}
              />
            ) : (
              <PreviewContent />
            )}{' '}
          </Box>
        </Grid>
      </Form>
    </Formik>
  );
};
