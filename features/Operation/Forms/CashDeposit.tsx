/* eslint-disable react/no-unused-prop-types */
/* eslint-disable import/no-cycle */
'use client';
import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form, useFormikContext } from 'formik';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { AlertColor } from '@mui/material';
import dayjs from 'dayjs';
import {
  BatchContainer,
  BatchTitle,
  PostingContainer,
  title,
  previewContentStyle,
  cashContentStyle
} from './style';
import { PageTitle } from '@/components/Typography';
import {
  FormTextInput,
  FormSelectField,
  FormikDateTimePicker,
  FormSelectInput
} from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import {
  Details,
  SubTitle
} from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { dropDownWithSearch } from '@/features/CustomerService/Form/style';
import { Status } from '@/components/Labels';
import { TopActionsArea } from '@/components/Revamp/Shared';
import {
  ActionButton,
  ActionButtonWithPopper
} from '@/components/Revamp/Buttons';
import { queryKeys } from '@/react-query/constants';
import { OptionsI } from '@/components/FormikFields/FormSelectField';
import {
  searchCustomer,
  useGetAccountDetails
} from '@/api/customer-service/useCustomer';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { extractIdFromDropdown } from '@/utils/extractIdFromDropdown';
import {
  submitButton,
  CashDepositForwardToApprovingOfficerButtonStyle
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { SearchIcon } from '@/assets/svg';
import { mapCustomerAccountNumberSearch } from '@/utils/mapCustomerSearch';
import { IAccountDetailsResults } from '@/api/ResponseTypes/customer-service';
import { CashDepositInitialValues } from '@/schemas/schema-values/operation';
import { cashDepositSchema } from '@/schemas/operation';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  useCreateCashDeposit,
  useCreateForwardtoAppOffCashDep
} from '@/api/operation/useCashDeposit';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { MobileModalContainer } from '@/components/Revamp/Modal/mobile/ModalContainer';
import { ICurrency } from '@/api/ResponseTypes/general';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';
import { toast } from '@/utils/toast';
import { CustomStyleI } from '@/constants/types';
import { encryptData } from '@/utils/encryptData';
import { FormAmountInput } from '@/components/FormikFields/FormAmountInput';
import { FormSkeleton } from '@/components/Loaders';
import { useGetSystemDate } from '@/api/general/useSystemDate';

interface Props {
  accountDetails?: IAccountDetailsResults | undefined;
  currencies?: ICurrency[] | Array<any>;
}

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

export const PreviewContentOne = ({ accountDetails }: Props) => {
  if (!accountDetails) {
    return null;
  }

  return (
    <Box
      mb={{ mobile: 30, tablet: 0 }}
      sx={{
        padding: { mobile: 6, tablet: 0 },
        alignItems: { mobile: 'center', tablet: 'normal' }
      }}
    >
      <PageTitle title="Account Information" styles={title} />

      <SubTitle title="Account Number" />
      <Details title={accountDetails.accountnumber || 'NIL'} />

      <SubTitle title="Account Name" />
      <Details title={accountDetails.accounttitle || 'NIL'} />

      <SubTitle title="Product Name" />
      <Details title={accountDetails.prodname || 'NIL'} />

      <SubTitle title="Branch" />
      <Details title={accountDetails.branch || 'NIL'} />

      <SubTitle title="Book Balance" />
      <Details
        title={`NGN ${formatCurrency(accountDetails?.bkbal || 0) || '0.00'}`}
      />

      <SubTitle title="Effective Balance" />
      <Details
        title={`NGN ${formatCurrency(accountDetails?.effbal || 0) || '0.00'}`}
      />

      <SubTitle title="Usable Balance" />
      <Details
        title={`NGN ${formatCurrency(accountDetails?.usebal || 0) || '0.00'}`}
      />

      <SubTitle title="Source Type" />
      <Details title={accountDetails.source || 'NIL'} />

      <SubTitle title="Source" />
      <Details title={accountDetails.source || 'NIL'} />

      <Box sx={{ marginBottom: '20px' }}>
        <SubTitle title="Account Status" />
        <Status
          label={accountDetails.acctstatus ? 'Active' : 'Inative'}
          status={accountDetails.acctstatus ? 'success' : 'danger'}
        />
      </Box>

      <SubTitle title="BVN" />
      <Details title={accountDetails.bvn || 'NIL'} />

      <SubTitle title="Total Charge" />
      <Details
        title={`NGN ${formatCurrency(accountDetails?.totalCharge || 0) || '0.00'}`}
      />
    </Box>
  );
};

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

export const CashDeposit = ({ currencies }: Props) => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const [selectedCurrency, setSelectedCurrency] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [accountNumber, setAccountNumber] = React.useState<string | null>(null);
  const { mutate } = useCreateCashDeposit();
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

  const toastActions = useContext(ToastMessageContext);

  const { accDetailsResults: accountData, isLoading: isAccountDetailsLoading } =
    useGetAccountDetails(encryptData(accountNumber) || '');

  const handleAccountNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountNumber(e.target.value);
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
      currencyCode: selectedCurrency
    };
    mutate(getAllValues);
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
        ...CashDepositInitialValues,
        valueDate: sysmodel?.systemDate
      }}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={cashDepositSchema}
    >
      <Form>
        <Box sx={{ marginTop: '60px' }}>
          <TopActionsArea actionButtons={actionButtons} />
        </Box>
        <Grid container spacing={2}>
          <Box sx={BatchContainer} ml={{ desktop: 1, mobile: 5 }}>
            <PageTitle title="Cash Deposit" styles={BatchTitle} />
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
                <Box>
                  <FormikDateTimePicker
                    label="Value Date"
                    name="valueDate"
                    value={systemDate}
                  />
                </Box>
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
                <FormAmountInput
                  name="transAmount"
                  label="Pay Amount"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                  placeholder="Enter Pay Amount"
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
                  placeholder="Enter Rate"
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="transAmount"
                  label="Transaction Amount"
                  disabled
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                  placeholder="Enter Transaction Amount"
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="tellerno"
                  label="Voucher Number"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                  placeholder="Enter Voucher Number"
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="depositorName"
                  label="Depositor's Name"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                  placeholder="Enter Depositor Name"
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="narration"
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
                PreviewContent={
                  <PreviewContentOne accountDetails={accountData} />
                }
                customStyle={{ ...cashContentStyle }}
              />
            ) : (
              <PreviewContentOne accountDetails={accountData} />
            )}
          </Box>
        </Grid>
      </Form>
    </Formik>
  );
};
