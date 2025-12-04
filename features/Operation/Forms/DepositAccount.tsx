'use client';
import React, { useEffect, useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form } from 'formik';
import { AlertColor } from '@mui/material';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import SearchIcon from '@mui/icons-material/Search';
import {
  BatchContainer,
  BatchTitle,
  PostingContainer,
  inputText,
  ChequelContentStyle
} from './style';
import { MobilePreviewContent } from './BatchPosting';
import { PreviewContentOne } from './CashDeposit';
import { PageTitle } from '@/components/Typography';
import {
  FormTextInput,
  FormikDateTimePicker,
  FormSelectInput
} from '@/components/FormikFields';
import { useCurrentBreakpoint, frequencyOptions } from '@/utils';
import { Tabs } from '@/components/Revamp/Tabs';
import { toast } from '@/utils/toast';
import { queryKeys } from '@/react-query/constants';
import {
  searchCustomer,
  useGetAccountDetails
} from '@/api/customer-service/useCustomer';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { ICurrency } from '@/api/ResponseTypes/general';
import { useCreateChequeDeposit } from '@/api/operation/useChequeDeposit';
import { ChequeDepositInitialValues } from '@/schemas/schema-values/operation';
import { encryptData } from '@/utils/encryptData';
import { FormAmountInput } from '@/components/FormikFields/FormAmountInput';
import { FormSkeleton } from '@/components/Loaders';
import { useGetSystemDate } from '@/api/general/useSystemDate';
import { fundsTransferRadioOptions } from '@/constants/SetupOptions';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';

import colors from '@/assets/colors';
import { StyledSearchableDropdown } from '@/features/CustomerService/Form/CreateAccount';
import { ActionButtonWithPopper } from '@/components/Revamp/Buttons';

type Props = {
  currencies: ICurrency[] | Array<any>;
  isSubmitting?: boolean;
  setIsSubmitting?: (submit: boolean) => void;
  setIsSubmittingForward?: (submit: boolean) => void;
  isSubmittingForward?: boolean;
  loans: any;
  branches: any;
  repaymentTypes: any;
};
export const DepositAccount = ({
  setIsSubmitting,
  isSubmitting,
  currencies,
  setIsSubmittingForward,
  isSubmittingForward,
  loans,
  branches,
  repaymentTypes
}: Props) => {
  const toastActions = React.useContext(ToastMessageContext);
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const { mappedCurrency } = useMapSelectOptions({
    currencies
  });

  const { mappedLoansProduct, mappedBranches, mappedLoanRepayment } =
    useMapSelectOptions({
      loans,
      branches,
      repaymentTypes
    });

  const [selectedCurrency, setSelectedCurrency] = React.useState('');
  const { mutate } = useCreateChequeDeposit();
  const [accountNumber, setAccountNumber] = React.useState<string | null>(null);
  const [destinationAccountNumber, setDestinationAccountNumber] =
    React.useState<string | null>(null);
  const {
    accDetailsResults: accountSourceData,
    isLoading: isAccountSourceDetailsLoading
  } = useGetAccountDetails(encryptData(accountNumber) || '');
  const {
    accDetailsResults: accountDestinationData,
    isLoading: isAccountDestinationLoading
  } = useGetAccountDetails(encryptData(destinationAccountNumber) || '');

  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [customerAccount, setCustomerAccount] = useState('');
  const [filteredValues, setFilteredValues] = useState<[]>([]);

  const tabTitle = ['Account  Information', 'Product  Information'];
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
      selectedCurrency: {
        message: 'Currency is required'
      }
    };

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
  }, [isSubmitting, setIsSubmitting]);

  const { data, isLoading: isSearchLoading } = useQuery({
    queryKey: [queryKeys.searchCustomer, searchValue],
    queryFn: () => searchCustomer(toastActions, searchValue as string),
    enabled: Boolean(searchValue.length > 0)
  });

  const handleAccountSource = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountNumber(e.target.value);
  };

  // Handle customer selection
  const handleSelectedValue = useCallback((value: any) => {
    setSelectedCustomer(value);
    setCustomerAccount(value.customer.accountnumber);
    setSearchValue(value.customer.accounttitle);
  }, []);

  // Handle search input
  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    },
    []
  );

  const handleAccountDesination = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestinationAccountNumber(e.target.value);
  };

  const { sysmodel } = useGetSystemDate();
  const systemDate = dayjs(sysmodel?.systemDate || new Date());

  return (
    <Formik
      initialValues={{
        ...ChequeDepositInitialValues,
        valueDate: sysmodel?.systemDate
      }}
      onSubmit={(values) => {
        onSubmit(values);
      }}
      validationSchema={{}}
    >
      <Form>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%'
          }}
        >
          <Box sx={BatchContainer}>
            <PageTitle title="Create Deposit Account" styles={BatchTitle} />
            <Grid container>
              <Grid
                item={isTablet}
                mobile={12}
                mr={{ mobile: 35, tablet: 0 }}
                width={{ mobile: '100%', tablet: 0 }}
                mb={5}
              >
                <StyledSearchableDropdown style={{ width: '100%' }}>
                  <ActionButtonWithPopper
                    loading={isSearchLoading}
                    handleSelectedValue={(value: any) =>
                      handleSelectedValue(value)
                    }
                    label="Customer Name"
                    name="customerId"
                    searchGroupVariant="LoanCustomerSearch"
                    loanDropDownOptions={filteredValues || []}
                    customStyle={{
                      width: '100%',
                      height: '54px',
                      borderRadius: '4px',
                      padding: '12px',
                      border: `1px solid ${colors.neutral200}`,
                      backgroundColor: `${colors.neutral200}`,
                      color: `${colors.neutral600}`,
                      fontSize: '16px',
                      fontWeight: 400
                    }}
                    icon={<SearchIcon />}
                    iconPosition="end"
                    buttonTitle={
                      (selectedCustomer?.customer?.accounttitle as string) ||
                      'Search Customer Name'
                    }
                    onChange={handleSearch}
                    searchValue={searchValue as string}
                  />
                </StyledSearchableDropdown>
              </Grid>

              <Grid item={isTablet} mobile={12}>
                <FormSelectInput
                  name="tdProduct"
                  options={mappedLoansProduct}
                  label="TD Product"
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
                <FormSelectInput
                  name="branchCode"
                  options={mappedBranches}
                  label="Branch"
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
                <FormSelectInput
                  name="settlementAccount"
                  placeholder="select settlement account"
                  options={[]}
                  label="Settlement Account"
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
                  name="tdAmount  "
                  placeholder="Enter"
                  label="TD Amount"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>

              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="tdRate"
                  placeholder="Enter"
                  label="TD Rate (%)"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>

              <Grid item={isTablet} mobile={12} mr={{ mobile: 35, tablet: 0 }}>
                <Grid p={{ mobile: 2, desktop: 0 }} spacing={4} container>
                  <Grid item={isTablet} tablet={4} mobile={4}>
                    <FormSelectInput
                      customStyle={{
                        width: setWidth(isMobile ? '350px' : '100%'),
                        fontSize: '14px'
                      }}
                      options={frequencyOptions}
                      name="newTerm"
                      label="New Term "
                    />{' '}
                  </Grid>

                  <Grid item={isTablet} mobile={4} tablet={4}>
                    <FormTextInput
                      customStyle={{
                        width: setWidth(isMobile ? '350px' : '100%')
                      }}
                      name="frequencyCount"
                      placeholder="Enter"
                      label="Frequency Count"
                    />{' '}
                  </Grid>

                  <Grid item={isTablet} mobile={4} tablet={4}>
                    <FormTextInput
                      customStyle={{
                        width: setWidth(isMobile ? '350px' : '100%')
                      }}
                      name="durationDays"
                      placeholder="Enter"
                      label="Duration (Days)"
                    />{' '}
                  </Grid>
                </Grid>
              </Grid>

              <Grid item={isTablet} mobile={12}>
                <FormSelectInput
                  name="repaymentType"
                  options={mappedLoanRepayment}
                  label="Repayment Type"
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
                <FormSelectInput
                  name="instrumentType"
                  options={[]}
                  label="Instrument Type"
                  placeholder="Enter instrumemtn type"
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
                  <FormikDateTimePicker
                    label="Posting Date"
                    name="valueDate"
                    value={systemDate}
                  />
                </Box>
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <Box>
                  <FormikDateTimePicker
                    label="Start Date"
                    name="valueDate"
                    value={systemDate}
                  />
                </Box>
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <Box>
                  <FormikDateTimePicker
                    label="Maturity Date"
                    name="valueDate"
                    value={systemDate}
                  />
                </Box>
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <Box>
                  <FormikDateTimePicker
                    label="First Payment Date"
                    name="valueDate"
                    value={systemDate}
                  />
                </Box>
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormSelectInput
                  name="paymentMode"
                  options={[]}
                  label="Payment Mode"
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
                <FormAmountInput
                  name="transAmount"
                  placeholder="Enter Transfer Account"
                  label="Transfer Account"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormAmountInput
                  name="transAmount"
                  placeholder="Enter Cheque Number"
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
                  label="Operating Bank"
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
                  name="rate"
                  placeholder="."
                  label="Total Tax Amount"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="narration"
                  placeholder="Enter Total Interest Amount"
                  label="Total Interest Amount"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="narration"
                  placeholder="Enter Total Maturity Amount"
                  label="Total Maturity Amount"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid mt={1} item={isTablet} mobile={12}>
                <RadioButtons
                  options={fundsTransferRadioOptions}
                  title="Include Tax?"
                  name="reversal"
                  value="1"
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="narration"
                  placeholder="Enter Penal Rate"
                  label="Penal Rate"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
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
              <Grid item={isTablet} mobile={12}>
                <FormSelectInput
                  name="narration"
                  options={[]}
                  label="Action at Maturity "
                  placeholder="Enter Action at Maturity"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                  value={selectedCurrency}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setSelectedCurrency(e.target.value)
                  }
                />
              </Grid>
            </Grid>
          </Box>
          <Box mt={3} sx={PostingContainer}>
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

        <button id="submitButton" type="submit" style={{ display: 'none' }}>
          submit alias
        </button>
      </Form>
    </Formik>
  );
};
