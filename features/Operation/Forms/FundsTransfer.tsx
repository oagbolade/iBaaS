'use client';

import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form, useFormikContext } from 'formik';
import { useQuery } from '@tanstack/react-query';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AlertColor, Typography } from '@mui/material';
import dayjs from 'dayjs';
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
  FormikDateTimePicker,
  FormSelectInput
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
import { RadioButtons } from '@/components/Revamp/Radio/RadioButton';
import { FormSkeleton } from '@/components/Loaders';
import { useGetSystemDate } from '@/api/general/useSystemDate';

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
  const [selectedCurrency, setSelectedCurrency] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [transferType, setTransferType] = useState('0');
  const [isReversal, setIsReversal] = useState<boolean>(false);
  const toastActions = useContext(ToastMessageContext);
  const { mutate } = useFundsTransfer();
  const [debitAccount, setDebitAccount] = React.useState<string | null>(null);
  const [creditAccount, setCreditAccount] = React.useState<string | null>(null);
  const { submitForm } = useFormikContext() ?? {};
  const { accDetailsResults: accountData } = useGetAccountDetails(
    encryptData(debitAccount) || ''
  );
  const { accDetailsResults: beneficiaryData } = useGetAccountDetails(
    encryptData(creditAccount) || ''
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

  const beneficiaryAccount = beneficiaryData?.accountnumber?.toString();
  const onSubmit = async (values: any) => {
    const toastMessage = {
      title: 'Validation error',
      severity: 'error',
      selectedCurrency: {
        message: 'Currency is required'
      },
      transferType: {
        message: 'Transfer type is required'
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
    if (transferType === '') {
      toast(
        toastMessage.transferType.message,
        toastMessage.title,
        toastMessage.severity as AlertColor,
        toastActions
      );
      return;
    }

    const getAllValues = {
      ...values,
      reversal: String(Number(isReversal)),
      transfertype: transferType,
      currencyCode: selectedCurrency
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

  const handleDebitAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDebitAccount(e.target.value);
  };
  const handleCreditAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreditAccount(e.target.value);
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
        ...FundTransferInitialValues,
        valuedate: sysmodel?.systemDate
      }}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={FundTransferSchema}
    >
      <Form>
        <Box
          sx={{
            marginTop: '60px',
            position: 'fixed',
            top: 0,
            width: 'calc(100vw - 300px)',
            zIndex: 1
          }}
        >
          <TopActionsArea actionButtons={actionButtons} />
        </Box>
        <Grid container spacing={2} sx={{ marginTop: '90px', width: '100%' }}>
          <Box sx={BatchContainer} ml={{ desktop: 1, mobile: 5 }}>
            <PageTitle title="Funds Transfer" styles={BatchTitle} />
            <Grid container>
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
                <FormSelectInput
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
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setTransferType(e.target.value)
                  }
                  value={transferType}
                />
              </Grid>
              <Grid mt={1} item={isTablet} mobile={12}>
                <RadioButtons
                  options={fundsTransferRadioOptions}
                  title="Reversal"
                  name="reversal"
                  value={isReversal ? '1' : '0'}
                  handleCheck={(value: boolean) => {
                    setIsReversal(value);
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
                  name="debitAcct"
                  placeholder="Enter Debit Account Number"
                  label="Debit Account Number"
                  value={debitAccount?.toString()}
                  onChange={handleDebitAccount}
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
                  name="creditAcct"
                  placeholder="Enter Credit Account Number"
                  label="Credit Account Number"
                  value={creditAccount?.toString()}
                  onChange={handleCreditAccount}
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <Box>
                  <DemoContainer components={['DatePicker']}>
                    <FormikDateTimePicker
                      label="Value Date"
                      name="valuedate"
                      value={systemDate}
                    />
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
