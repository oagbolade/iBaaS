'use client';

import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form, useFormikContext } from 'formik';
import { useQuery } from '@tanstack/react-query';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Dayjs } from 'dayjs';
import { AlertColor, SelectChangeEvent, Typography } from '@mui/material';
import { PreviewDebitInformation } from '../transfer/PreviewSection/PreviewDebitInformation';
import { PreviewBeneficiaryInformation } from '../transfer/PreviewSection/PreviewBeneficiaryInformation';
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
  FormSelectInput,
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
import DateTimePicker from '@/components/Revamp/FormFields/DateTimePicker';
import { NipTransferSchema } from '@/schemas/operation';
import { NipTransferInitialValues } from '@/schemas/schema-values/operation';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  CashDepositForwardToApprovingOfficerButtonStyle,
  submitButton
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { useNipTransfer } from '@/api/operation/useNipTransfer';
import { Details, SubTitle } from '@/features/Administrator/Role/ViewRole';
import { Status } from '@/components/Labels';
import { toast } from '@/utils/toast';
import { useFinancialLastDate } from '@/utils/financialDates';
import { nipTransferRadioOptions } from '@/constants/Operatons';
import { useNipGetBeneficiaryInformation } from '@/api/operation/useNipGetBeneficiaryInformation';
import { inputFields } from '@/features/Loan/LoanDirectory/styles';
import {
  labelTypography,
  nipBeneficiaryLabelTypography
} from '@/components/Labels/styles';
import { useGetNibbsBanks } from '@/api/operation/useGetNibbsBanks';
import { encryptData } from '@/utils/encryptData';
import { FormAmountInput } from '@/components/FormikFields/FormAmountInput';
import { INibbsBankData } from '@/api/ResponseTypes/operation';
import { decryptData } from '@/utils/decryptData';
import { NibbsBankRequest } from '@/schemas/schema-values/auth';

interface Props {
  currencies?: ICurrency[] | Array<any>;
  commBanks?: IGetCommercialBank[] | Array<any>;
}

export const PreviewContentTwo: React.FC = () => {
  return (
    <Box
      mb={{ mobile: 30, tablet: 0 }}
      sx={{
        padding: { mobile: 6, tablet: 0 },
        alignItems: { mobile: 'center', tablet: 'normal' }
      }}
    >
      <SubTitle title="Product Name" />
      <Details title="Compassianate Loan" />

      <SubTitle title="Settlement Account Name" />
      <Details title="Omodayo Oluwafunke" />

      <SubTitle title="Loan Amount" />
      <Details title="N1,800,320.54" />

      <SubTitle title="Loan Purpose" />
      <Details title="To buy equipments" />

      <SubTitle title="Repayment Mode" />
      <Details title="Equal principal & intrest" />

      <SubTitle title="First Repayment Date" />
      <Details title="02 January, 2023  11:03pm" />

      <SubTitle title="Total No. of Installment" />
      <Details title="4" />
      <Box mb={{ mobile: 5, tablet: 0 }}>
        <SubTitle title="Loan Status" />
        <Status label="Active" status="success" />
      </Box>
    </Box>
  );
};

export const PreviewContentOne: React.FC = () => {
  return (
    <Box
      mb={{ mobile: 30, tablet: 0 }}
      sx={{
        padding: { mobile: 6, tablet: 0 },
        alignItems: { mobile: 'center', tablet: 'normal' }
      }}
    >
      <SubTitle title="Product Name" />
      <Details title="Compassianate Loan" />

      <SubTitle title="Settlement Account Name" />
      <Details title="Omodayo Oluwafunke" />

      <SubTitle title="Loan Amount" />
      <Details title="N1,800,320.54" />

      <SubTitle title="Loan Purpose" />
      <Details title="To buy equipments" />

      <SubTitle title="Repayment Mode" />
      <Details title="Equal principal & intrest" />

      <SubTitle title="First Repayment Date" />
      <Details title="02 January, 2023  11:03pm" />

      <SubTitle title="Total No. of Installment" />
      <Details title="4" />
      <Box mb={{ mobile: 5, tablet: 0 }}>
        <SubTitle title="Loan Status" />
        <Status label="Active" status="success" />
      </Box>
    </Box>
  );
};

const tabTitle = ['Debit  Information', 'Beneficiary  Information'];

export const NIPTransfer = ({ currencies, commBanks }: Props) => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const [selectedValue, setSelectedValue] = useState({ accountNumber: '' });
  const [benAccNum, setBenAccNum] = useState<null | string>(null);
  const [filteredValues, setFilteredValues] = useState({ accountNumber: [] });
  const [searchValue, setSearchValue] = useState({ accountNumber: '' });
  const [beneficiaryBankCode, setBeneficiaryBankCode] = useState<string>('');
  const [beneficiaryBankName, setBeneficiaryBankName] = useState<
    INibbsBankData | undefined
  >(undefined);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const toastActions = useContext(ToastMessageContext);

  const [token, setToken] = useState<string | null>(null);

  // Fetch token from localStorage on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('nipToken');
      const decryptedToken = storedToken ? decryptData(storedToken) : null;
      setToken(decryptedToken);
    }
  }, []);
  const { mutate } = useNipTransfer(token);

  const { submitForm } = useFormikContext() ?? {};

  useEffect(() => {
    const LocationToastMessage = {
      title: 'Validation error',
      severity: 'error',
      locationNeeded: {
        message: 'Location is needed for this module.'
      }
    };

    const getLocation = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (err) => {
            toast(
              err.message,
              LocationToastMessage.title,
              LocationToastMessage.severity as AlertColor,
              toastActions
            );
          }
        );
      } else {
        toast(
          LocationToastMessage.locationNeeded.message,
          LocationToastMessage.title,
          LocationToastMessage.severity as AlertColor,
          toastActions
        );
      }
    };

    getLocation();
  }, []);

  const accountId = String(extractIdFromDropdown(selectedValue.accountNumber));
  const { accDetailsResults: accountData } = useGetAccountDetails(
    encryptData(accountId) || ''
  );

  const { data: beneficiaryDetails, isLoading } =
    useNipGetBeneficiaryInformation(
      {
        bankCode: beneficiaryBankName?.bankCode ?? '',
        accountNumber: String(benAccNum),
        channelCode: '1' // hardcoded value as requested by Ugochukwu
      },
      token
    );

  const params: NibbsBankRequest = {
    sessionID: 'string',
    nameEnquiryRef: 'string',
    destinationInstitutionCode: 'string',
    channelCode: 'string',
    beneficiaryAccountName: 'string',
    beneficiaryAccountNumber: 'string',
    beneficiaryBankVerificationNumber: 'string',
    beneficiaryKYCLevel: 'string',
    originatorAccountName: 'string',
    originatorAccountNumber: 'string',
    originatorBankVerificationNumber: 'string',
    originatorKYCLevel: 'string',
    transactionLocation: 'string',
    narration: 'string',
    paymentReference: 'string',
    amount: 0
  };

  const { data: allNibbsBank = [] } = useGetNibbsBanks(params, token);

  const PreviewContent = () => {
    const pageMenu = [
      <PreviewDebitInformation accountDetails={accountData} />,
      <PreviewBeneficiaryInformation
        accountDetails={accountData}
        beneficiaryDetails={beneficiaryDetails}
        beneficiaryBank={beneficiaryBankName?.bankName}
      />
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

  const { mappedCurrency, mappedCommercialBank, nibbsCommercialBank } =
    useMapSelectOptions({
      currencies,
      commBanks,
      allNibbsBank
    });

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

  const handleBeneficiaryAccountNumberSearch = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, name } = event.target;

    setBenAccNum(value);

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
  const onSubmit = async (values: any) => {
    const toastMessage = {
      title: 'Validation error',
      severity: 'error',
      accountNumber: {
        message: 'Debit Account Number is required'
      },
      creditAcct: {
        message: 'Beneficiary Account Number is required'
      },
      beneficiayBank: {
        message: 'Beneficiary Bank is required'
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

    if (benAccNum === '') {
      toast(
        toastMessage.creditAcct.message,
        toastMessage.title,
        toastMessage.severity as AlertColor,
        toastActions
      );

      return;
    }

    if (beneficiaryBankName?.bankCode === '') {
      toast(
        toastMessage.beneficiayBank.message,
        toastMessage.title,
        toastMessage.severity as AlertColor,
        toastActions
      );

      return;
    }
    const getAllValues = {
      nameEnquiryRef: beneficiaryDetails?.nameInquiryReference ?? '',
      sourceBankCode: '999426',
      bankCode: beneficiaryBankName?.bankCode ?? '',
      channelCode: '1',
      beneficiaryAccountName: beneficiaryDetails?.accountName ?? '',
      beneficiaryAccountNumber: benAccNum ?? '',
      originatorAccountName: accountData?.accounttitle ?? '',
      originatorAccountNumber: accountId ?? '',
      originatorBvn: accountData?.bvn ?? '',
      originatorKycLevel: '3',
      location: `${latitude},${longitude}`,
      narration: values?.narration1,
      amount: Number(values.tranamount)
    };
    mutate(getAllValues);
  };

  const handleSelectedValue = (value: string, name: string) => {
    setSelectedValue((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Formik
      initialValues={NipTransferInitialValues}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={NipTransferSchema}
    >
      <Form>
        <Box sx={{ marginTop: '70px' }}>
          <TopActionsArea actionButtons={actionButtons} />
        </Box>
        <Grid container spacing={2}>
          <Box sx={BatchContainer} ml={{ desktop: 1, mobile: 5 }}>
            <PageTitle title="NIP Transfer" styles={BatchTitle} />
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
                  name="cleartype"
                  options={[
                    { name: 'Transfer with COT', value: 'Transfer with COT' },
                    {
                      name: 'Transfer with no COT',
                      value: 'Transfer with no COT'
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
                  options={nipTransferRadioOptions}
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
                    label="Debit Account Number"
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
              <Grid mt={1} item={isTablet} mobile={12}>
                <FormSelectInput
                  name="bankcode"
                  options={nibbsCommercialBank}
                  label="Beneficiary Bank"
                  onChange={(e: SelectChangeEvent<string>) => {
                    // Get the bank name based on the selected code
                    const selectedBankName = allNibbsBank.find(
                      (bank) => bank.bankName === e.target.value
                    );
                    setBeneficiaryBankName(selectedBankName);
                  }}
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                  value={beneficiaryBankName?.bankName || ''}
                />
              </Grid>
              <Grid mt={1} item={isTablet} mobile={12}>
                <Typography sx={nipBeneficiaryLabelTypography}>
                  Beneficiary Account Number
                </Typography>
                <Box mb={{ mobile: 2, desktop: 0 }}>
                  <TextInput
                    customStyle={{
                      width: setWidth(isMobile ? '300px' : '100%'),
                      fontSize: '14px',
                      ...inputFields
                    }}
                    placeholder="Enter a valid account number"
                    name="creditAcct"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleBeneficiaryAccountNumberSearch(event);
                    }}
                  />{' '}
                </Box>
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <Box>
                  <DemoContainer components={['DatePicker']}>
                    <FormikDateTimePicker name="valuedate" label="Value Date" />
                  </DemoContainer>
                </Box>
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormAmountInput
                  name="tranamount"
                  placeholder=""
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
                  disabled
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormAmountInput
                  name="tranamount"
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
                  label="Teller Number"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="narration1"
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
