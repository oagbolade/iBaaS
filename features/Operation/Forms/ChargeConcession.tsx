'use client';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form } from 'formik';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { AlertColor } from '@mui/material';
import {
  BatchContainer,
  BatchTitle,
  chargeContentStyle,
  PostingContainer
} from './style';
import { MobilePreviewContent } from './BatchPosting';
import { PreviewContentOne } from './CashDeposit';
import { PageTitle } from '@/components/Typography';
import {
  FormTextInput,
  FormSelectField,
  FormSelectInput
} from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { useCreateChargeConcession } from '@/api/operation/useChargeConcession';
import {
  searchCustomer,
  useGetAccountDetails
} from '@/api/customer-service/useCustomer';
import { chargeConcessionInitialValues } from '@/schemas/schema-values/operation';
import { chargeConcession } from '@/schemas/operation';
import { IChargeConcessionType } from '@/api/ResponseTypes/operation';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { extractIdFromDropdown } from '@/utils/extractIdFromDropdown';
import { StyledSearchableDropdown } from '@/features/CustomerService/Form/CreateAccount';
import { OptionsI } from '@/components/FormikFields/FormSelectField';
import { dropDownWithSearch } from '@/features/CustomerService/Form/style';
import {
  ActionButton,
  ActionButtonWithPopper
} from '@/components/Revamp/Buttons';
import { SearchIcon } from '@/assets/svg';
import { queryKeys } from '@/react-query/constants';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { mapCustomerAccountNumberSearch } from '@/utils/mapCustomerSearch';
import { toast } from '@/utils/toast';
import { encryptData } from '@/utils/encryptData';
import { FormAmountInput } from '@/components/FormikFields/FormAmountInput';

type Props = {
  isSubmitting?: boolean;
  setIsSubmitting?: (submit: boolean) => void;
  charges?: IChargeConcessionType[] | Array<any>;
};
type SearchFilters = {
  accountNumber: string | OptionsI[];
  [key: string]: any;
};

export const ChargeConcession = ({
  isSubmitting,
  setIsSubmitting,
  charges
}: Props) => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const toastActions = React.useContext(ToastMessageContext);
  const searchParams = useSearchParams();
  const { mutate } = useCreateChargeConcession();
  const [searchValue, setSearchValue] = React.useState<SearchFilters>({
    accountNumber: ''
  });
  const [chargeConcessions, setChargeConcessions] = useState<
    Partial<IChargeConcessionType>
  >({
    chargeAmt: 0,
    chargeCode: ''
  });
  const [filteredValues, setFilteredValues] = React.useState<SearchFilters>({
    accountNumber: []
  });
  const [selectedValue, setSelectedValue] = React.useState<SearchFilters>({
    accountNumber: ''
  });
  const { mappedChargeConcessionType } = useMapSelectOptions({
    charges
  });
  const accountId = String(
    extractIdFromDropdown(selectedValue.accountNumber as string)
  );
  const { accDetailsResults: accountData } = useGetAccountDetails(
    encryptData(accountId) || ''
  );
  const { data, isLoading: isSearchLoading } = useQuery({
    queryKey: [queryKeys.searchCustomer, searchValue],
    queryFn: () =>
      searchCustomer(toastActions, searchValue.accountNumber as string),
    enabled: Boolean(searchValue.accountNumber.length > 0)
  });
  const handleSelectedValue = (value: string, name: string) => {
    setSelectedValue((prev) => ({
      ...prev,
      [name]: value
    }));
  };
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
    const toastMessage = {
      title: 'Validation error',
      severity: 'error',
      accountNumber: {
        message: 'Account Number is required'
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
    await mutate({
      ...values,
      accountnumber: accountData?.accountnumber as string,
      originatingAccount: accountData?.accountnumber as string,
      chargetype: chargeConcessions.chargeCode as string,
      chargeamount: chargeConcessions.chargeAmt as number
    });
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
  return (
    <Formik
      initialValues={chargeConcessionInitialValues}
      onSubmit={(values, actions) => onSubmit(values, actions)}
      validationSchema={chargeConcession}
    >
      <Form>
        <Grid container spacing={2}>
          <Box sx={{ display: 'flex' }}>
            <Box sx={BatchContainer} ml={{ desktop: 1, mobile: 5 }}>
              <PageTitle title="Charge Concession" styles={BatchTitle} />
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
                        ) || 'Search Account Number'
                      }
                      onChange={handleSearch}
                      searchValue={searchValue.accountNumber as string}
                    />
                  </StyledSearchableDropdown>
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormSelectInput
                    name="chargetype"
                    options={mappedChargeConcessionType}
                    label="Charge"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      const selectedCharge = charges?.find(
                        (charge) => charge.chargeCode === e.target.value
                      );
                      setChargeConcessions((prev) => ({
                        ...prev,
                        chargeAmt: selectedCharge?.chargeAmt || 0,
                        chargeCode: selectedCharge?.chargeCode || ''
                      }));
                    }}
                    value={chargeConcessions?.chargeCode}
                  />
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormTextInput
                    name="chargeamount"
                    placeholder="Enter charge amount"
                    label="Charge Amount"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                    value={chargeConcessions?.chargeAmt?.toString()}
                    disabled
                  />
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormAmountInput
                    name="amount"
                    placeholder="Enter amount"
                    label="Concession Amount"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box sx={PostingContainer} ml={{ desktop: 1, mobile: 5 }}>
              {isMobile ? (
                <MobilePreviewContent
                  PreviewContent={
                    <PreviewContentOne accountDetails={accountData} />
                  }
                  customStyle={{ ...chargeContentStyle }}
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
