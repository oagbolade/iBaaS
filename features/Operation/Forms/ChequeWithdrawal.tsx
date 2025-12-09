'use client';
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form } from 'formik';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useQuery } from '@tanstack/react-query';
import { AlertColor } from '@mui/material';
import dayjs from 'dayjs';
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
  FormikDateTimePicker,
  FormSelectInput
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
import { FormSkeleton } from '@/components/Loaders';
import { useGetSystemDate } from '@/api/general/useSystemDate';
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import { RadioButtons2 } from '@/components/Revamp/Radio/RadioButton2';

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

  const [selectedCurrency, setSelectedCurrency] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  const { mutate } = useCreateChequeWithdrawal();
  const [accountNumber, setAccountNumber] = React.useState<string | null>(null);
  const [selectValue, setSelectValue] = React.useState<any>();

  const { nextCounterCheqNo } = useGetCounterCheqNo(encryptData(accountNumber));
  const { accDetailsResults: accountData } =
    useGetAccountDetails(encryptData(accountNumber) || '');
  const handleAccountNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountNumber(e.target.value);
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
      currencyCode: selectedCurrency,
      cheqNumber:
        selectValue === '2'
          ? nextCounterCheqNo || ChequeWithdrawalInitialValues.cheqNumber // Bank Cheques → auto number
          : values.cheqNumber, // Counter Cheques → user input
      action: selectValue
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

  const handleRadioButton = (value: string) => {
    setSelectValue(value);
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
        ...ChequeWithdrawalInitialValues,
        valueDate: sysmodel?.systemDate,
        action: ChequeWithdrawalInitialValues.action
      }}
      onSubmit={(values, actions) => onSubmit(values, actions)}
      validationSchema={chequeWithdraw}
    >
      <Form>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            padding: '10px',
            width: '100%'
          }}
        >
          <Box sx={BatchContainer}>
            <PageTitle title="Cheque Withdrawal" styles={BatchTitle} />
            <Grid container>
              <Grid item={isTablet} mobile={12}>
                <RadioButtons2
                  options={[
                    { label: 'Bank Cheques', value: '1' },
                    { label: 'Counter Cheques', value: '2' }
                  ]}
                  title="Select In-house Cheque Type"
                  name="action"
                  value={selectValue?.toString()}
                  handleCheck={handleRadioButton}
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
                  name="accountNumber1"
                  placeholder="Enter Account Number"
                  label="Account Number"
                  value={accountNumber?.toString()}
                  onChange={handleAccountNumber}
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
                {selectValue === '2' ? (
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
                      value={systemDate}
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

        <button id="submitButton" type="submit" style={{ display: 'none' }}>
          submit alias
        </button>
      </Form>
    </Formik>
  );
};
