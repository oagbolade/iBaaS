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
import { EditOperations } from '@/constants/OperationOptions';
import { useCurrentBreakpoint } from '@/utils';
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
import { IGetCommercialBank } from '@/api/ResponseTypes/setup';
import { StyledSearchableDropdown } from '@/features/CustomerService/Form/CreateAccount';
import { ActionButtonWithPopper } from '@/components/Revamp/Buttons';
import { SearchIcon } from '@/assets/svg';
import { dropDownWithSearch } from '@/features/CustomerService/Form/style';
import DateTimePicker from '@/components/Revamp/FormFields/DateTimePicker';
import {
  useCreateFwdAppOfficerInWardClearing,
  useCreateInwardClearing
} from '@/api/operation/useClearing';
import {
  IClearingParams,
  InwardClearingInitialValues
} from '@/schemas/schema-values/operation';
import { inwardClearing } from '@/schemas/operation';
import { useFinancialLastDate } from '@/utils/financialDates';
import { encryptData } from '@/utils/encryptData';
import { FormAmountInput } from '@/components/FormikFields/FormAmountInput';
import { FormSkeleton } from '@/components/Loaders';
import { useGetSystemDate } from '@/api/general/useSystemDate';

type SearchFilters = {
  accountNumber: string | OptionsI[];
  [key: string]: any;
};

type Props = {
  currencies: ICurrency[] | Array<any>;
  isSubmitting?: boolean;
  setIsSubmitting?: (submit: boolean) => void;
  commBanks: IGetCommercialBank[] | Array<any>;
  setIsSubmittingForward?: (submit: boolean) => void;
  isSubmittingForward?: boolean;
};
export const InWard = ({
  currencies,
  isSubmitting,
  setIsSubmitting,
  setIsSubmittingForward,
  isSubmittingForward,
  commBanks
}: Props) => {
  const toastActions = React.useContext(ToastMessageContext);
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const { mappedCurrency, mappedCommercialBank } = useMapSelectOptions({
    currencies,
    commBanks
  });
  const [selectedCurrency, setSelectedCurrency] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchParams, setSearchParams] = useState<IClearingParams>({
    bankcode: '',
    cleartype: ''
  });

  const { mutate } = useCreateInwardClearing({ ...searchParams });
  const [accountNumber, setAccountNumber] = React.useState<string | null>(null);

  const { accDetailsResults: accountData, isLoading: isAccountDetailsLoading } =
    useGetAccountDetails(encryptData(accountNumber) || '');

  const onSubmit = async (values: any, actions: { resetForm: Function }) => {
    const params: IClearingParams = {
      bankcode: values.bankcode?.toString().length > 0 ? values.bankcode : null,
      cleartype:
        values.cleartype?.toString().length > 0 ? values.cleartype : null
    };
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

    setSearchParams(params);

    const getAllValues = {
      ...values,
      currencyCode: selectedCurrency
    };
    await mutate(getAllValues);
  };
  useEffect(() => {
    const submit = document.getElementById('submitButton');

    if (isSubmitting) {
      submit?.click();
    }
    if (isSubmittingForward) {
      submit?.click();
    }
    return () => {
      setIsSubmittingForward?.(false);
      setIsSubmitting?.(false);
    };
  }, [isSubmitting, isSubmittingForward]);
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
        ...InwardClearingInitialValues,
        valuedate: sysmodel?.systemDate
      }}
      onSubmit={(values, actions) => onSubmit(values, actions)}
      validationSchema={inwardClearing}
    >
      <Form>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            marginTop: '90px'
          }}
        >
          <Box sx={BatchContainer}>
            <PageTitle title="Inward Clearing" styles={BatchTitle} />
            <Grid container>
              <Grid
                item={isTablet}
                mobile={12}
                mr={{ mobile: 35, tablet: 0 }}
                width={{ mobile: '100%', tablet: 0 }}
                mb={5}
              >
                <FormTextInput
                  name="debitAcct"
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
                <FormSelectField
                  name="cleartype"
                  options={EditOperations.clearingType}
                  label="Clearing Type"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormSelectField
                  name="bankcode"
                  options={mappedCommercialBank}
                  label="Clearing Bank"
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
                  placeholder="Enter number"
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
                      value={systemDate}
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

        <button id="submitButton" type="submit" style={{ display: 'none' }}>
          submit alias
        </button>
      </Form>
    </Formik>
  );
};
