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
import { FormSkeleton } from '@/components/Loaders';
import { useGetSystemDate } from '@/api/general/useSystemDate';

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
  }, [isSubmitting]);
  const handleAccountSource = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountNumber(e.target.value);
  };
  const handleAccountDesination = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestinationAccountNumber(e.target.value);
  };

  const { sysmodel } = useGetSystemDate();
  const systemDate = dayjs(sysmodel?.systemDate || new Date());

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

  if (isLoading) return <FormSkeleton noOfLoaders={5} />;

  return (
    <Formik
      initialValues={{
        ...ChequeDepositInitialValues,
        valueDate: sysmodel?.systemDate
      }}
      onSubmit={(values) => {
        onSubmit(values);
      }}
      validationSchema={chequeDeposit}
    >
      <Form>
        <Grid container spacing={2} sx={{ marginTop: '90px', width: '100%' }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
            <Box sx={BatchContainer} ml={{ desktop: 1, mobile: 5 }}>
              <PageTitle title="Cheque Deposit" styles={BatchTitle} />
              <Grid container>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                  width={{ mobile: '100%', tablet: 0 }}
                  mb={5}
                >
                  <FormTextInput
                    name="accountNumber1"
                    placeholder="Enter Account Number"
                    label="Account Source Number"
                    value={accountNumber?.toString()}
                    onChange={handleAccountSource}
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>

                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                  width={{ mobile: '100%', tablet: 0 }}
                  mb={5}
                >
                  <FormTextInput
                    name="accountNumber2"
                    placeholder="Enter Account Destination Number"
                    label="Account Destination Number"
                    value={destinationAccountNumber?.toString()}
                    onChange={handleAccountDesination}
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
                    <FormikDateTimePicker
                      label="Value Date"
                      name="valueDate"
                      value={systemDate}
                    />
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
