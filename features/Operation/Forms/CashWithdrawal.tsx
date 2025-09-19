/* eslint-disable react/no-unused-prop-types */
'use client';
import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form, useFormikContext } from 'formik';
import { useQuery } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';
import { AlertColor } from '@mui/material';
import styled from 'styled-components';
import { AccountInformationPreview } from '../withdrawal/PreviewSection/AccountInformation';
import { SignatoryInformationPreview } from '../withdrawal/PreviewSection/SignatoryInformation';
import {
  BatchContainer,
  BatchTitle,
  PostingContainer,
  inputText,
  WithdrawalContentStyle,
  previewContentStyle
} from './style';
import { PageTitle } from '@/components/Typography';
import {
  FormTextInput,
  FormSelectField,
  FormikDateTimePicker,
  FormSelectInput
} from '@/components/FormikFields';
import { dropDownWithSearch } from '@/features/CustomerService/Form/style';
import { useCurrentBreakpoint } from '@/utils';
import { Tabs } from '@/components/Revamp/Tabs';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { ActionButtonWithPopper } from '@/components/Revamp/Buttons';
import { queryKeys } from '@/react-query/constants';
import {
  searchCustomer,
  useGetAccountDetails,
  useGetMandateDetailsByAccountNumber
} from '@/api/customer-service/useCustomer';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { OptionsI } from '@/components/FormikFields/FormSelectField';
import { SearchIcon } from '@/assets/svg';
import { extractIdFromDropdown } from '@/utils/extractIdFromDropdown';
import { mapCustomerAccountNumberSearch } from '@/utils/mapCustomerSearch';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import {
  IAccountDetailsResults,
  IMandateInfo
} from '@/api/ResponseTypes/customer-service';
import { ICurrency } from '@/api/ResponseTypes/general';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  CashDepositForwardToApprovingOfficerButtonStyle,
  submitButton
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { cashWithdrawalSchema } from '@/schemas/operation';
import { CashWithdrawalInitialValues } from '@/schemas/schema-values/operation';
import { useCreateCashWithdrawal } from '@/api/operation/useCreateCashWithdrawal';
import { toast } from '@/utils/toast';
import { encryptData } from '@/utils/encryptData';
import { MobileModalContainer } from '@/components/Revamp/Modal/mobile/ModalContainer';
import { CustomStyleI } from '@/constants/types';
import { FormAmountInput } from '@/components/FormikFields/FormAmountInput';
import { FormSkeleton } from '@/components/Loaders';
import { useGetSystemDate } from '@/api/general/useSystemDate';

interface Props {
  accountDetails?: IAccountDetailsResults | undefined;
  currencies?: ICurrency[] | Array<any>;
  mandateInfo?: IMandateInfo[] | undefined;
}

const tabTitle = ['Account Information', 'Signatory  Information'];

type MobilePreviewContentProps = {
  PreviewContent: any;
  customStyle?: CustomStyleI;
};

const StyledSearchableDropdown = styled.div`
  .MuiButtonBase-root {
    display: flex;
    justify-content: space-between;
  }

  .MuiPaper-root {
    > div {
      width: 560px;
    }
  }

  .MuiButton-endIcon > *:nth-of-type(1) {
    font-size: 32px;
  }
`;

const MobilePreviewContent = ({
  PreviewContent,
  customStyle
}: MobilePreviewContentProps) => {
  return (
    <MobileModalContainer
      ShowPreview={PreviewContent}
      customStyle={{ ...previewContentStyle, ...customStyle }}
    />
  );
};

export const PreviewContent = ({ accountDetails, mandateInfo }: Props) => {
  const pageMenu = [
    <AccountInformationPreview
      accountDetails={accountDetails}
      mandateInfo={mandateInfo}
    />,
    <SignatoryInformationPreview accountDetails={accountDetails} />
  ];

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

export const CashWithDrawal = ({ currencies }: Props) => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const { mutate } = useCreateCashWithdrawal();
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedCurrency, setSelectedCurrency] = React.useState('');
  const [accountNumber, setAccountNumber] = React.useState<string | null>(null);
  const toastActions = useContext(ToastMessageContext);

  const { mappedCurrency } = useMapSelectOptions({
    currencies
  });

  const { submitForm } = useFormikContext() ?? {};

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

  const { accDetailsResults: accountData } = useGetAccountDetails(
    encryptData(accountNumber) || ''
  );
  const { mandateInfo } = useGetMandateDetailsByAccountNumber(
    encryptData(accountNumber) || ''
  );

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
      currencyCode: selectedCurrency
    };
    mutate(getAllValues);
  };
  const handleAccountNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountNumber(e.target.value);
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
        ...CashWithdrawalInitialValues,
        valueDate: sysmodel?.systemDate
      }}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={cashWithdrawalSchema}
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
        <Grid container spacing={2} sx={{ marginTop: '70px', width: '100%' }}>
          <Box sx={BatchContainer} ml={{ desktop: 1, mobile: 5 }}>
            <PageTitle title="Cash Withdrawal" styles={BatchTitle} />
            <Grid container>
              <Grid
                item={isTablet}
                mobile={12}
                mr={{ mobile: 35, tablet: 0 }}
                width={{ mobile: '100%', tablet: 0 }}
                mb={5}
              >
                <FormTextInput
                  name="accountNumber"
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
                  label="Pay Amount"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="rate"
                  label="Rate"
                  disabled
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormAmountInput
                  name="transAmount"
                  label="Transaction Amount"
                  disabled
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="tellerno"
                  label="Voucher Number"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="narration"
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
                  <PreviewContent
                    accountDetails={accountData}
                    mandateInfo={mandateInfo}
                  />
                }
                customStyle={{ ...WithdrawalContentStyle }}
              />
            ) : (
              <PreviewContent
                accountDetails={accountData}
                mandateInfo={mandateInfo}
              />
            )}
          </Box>
        </Grid>
      </Form>
    </Formik>
  );
};
