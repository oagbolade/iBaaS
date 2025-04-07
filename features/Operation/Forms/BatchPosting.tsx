/* eslint-disable import/no-cycle */
'use client';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form, FormikHelpers } from 'formik';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useQuery } from '@tanstack/react-query';
import { AlertColor, Button } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { PreviewContentOne } from '../posting';
import {
  BatchContainer,
  BatchTitle,
  DeleteSavedBatches,
  PostingContainer,
  postingDetails,
  previewContentStyle,
  saveBatches,
  saveBatchesDetails,
  savePosting,
  viewSavedBatches
} from './style';
import { PageTitle } from '@/components/Typography';
import {
  FormTextInput,
  FormSelectField,
  FormikDateTimePicker,
  FormSelectInput
} from '@/components/FormikFields';
import { CustomStyleI } from '@/constants/types';
import { useCurrentBreakpoint } from '@/utils';
import {
  ActionButton,
  ActionButtonWithPopper
} from '@/components/Revamp/Buttons';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  submitButton,
  cancelButton
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { MobileModalContainer } from '@/components/Revamp/Modal/mobile/ModalContainer';
import { AddIcon, SearchIcon } from '@/assets/svg';
import DateTimePicker from '@/components/Revamp/FormFields/DateTimePicker';
import { StyledSearchableDropdown } from '@/features/CustomerService/Form/CreateAccount';
import { OptionsI } from '@/components/FormikFields/FormSelectField';
import { dropDownWithSearch } from '@/features/CustomerService/Form/style';
import { mapCustomerAccountNumberSearch } from '@/utils/mapCustomerSearch';
import { ICurrency } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { ITransactionType } from '@/api/ResponseTypes/setup';
import {
  useCreateBatchPosting,
  useGetGenerateBatchNo
} from '@/api/operation/useBatchPosting';
import {
  searchCustomer,
  useGetAccountDetails
} from '@/api/customer-service/useCustomer';
import { queryKeys } from '@/react-query/constants';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { extractIdFromDropdown } from '@/utils/extractIdFromDropdown';
import { toast } from '@/utils/toast';
import { BatchPostingInitialValues } from '@/schemas/schema-values/operation';
import { batchPosting } from '@/schemas/operation';
import { encryptData } from '@/utils/encryptData';
import { FormAmountInput } from '@/components/FormikFields/FormAmountInput';
import colors from '@/assets/colors';
import { getStoredUser } from '@/utils/user-storage';
import { MenuItemsType } from '@/api/ResponseTypes/login';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <ActionButton
      customStyle={{ ...cancelButton }}
      buttonTitle="Save Batch"
      icon={<AddIcon />}
      iconPosition="start"
    />
    <PrimaryIconButton
      buttonTitle="Post Batch"
      customStyle={{ ...submitButton }}
    />
  </Box>
];

type SearchFilters = {
  accountNumber: string | OptionsI[];
  [key: string]: any;
};
type Props = {
  PreviewContent: any;
  customStyle?: CustomStyleI;
};
type CreateBatchPostingProps = {
  currencies: ICurrency[] | Array<any>;
  details?: ITransactionType[] | Array<any>;
  isSubmitting?: boolean;
  setIsSubmitting?: (submit: boolean) => void;
};
export const MobilePreviewContent = ({
  PreviewContent,
  customStyle
}: Props) => {
  return (
    <MobileModalContainer
      ShowPreview={PreviewContent}
      customStyle={{ ...previewContentStyle, ...customStyle }}
    />
  );
};
type MenuItemType = {
  menu_name: string;
  menu_id?: string; // Optional property if menu_id might not exist
};
export const BatchPosting = ({
  currencies,
  details,
  setIsSubmitting,
  isSubmitting
}: CreateBatchPostingProps) => {
  const toastActions = React.useContext(ToastMessageContext);
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const { mappedCurrency, mappedTransactionType } = useMapSelectOptions({
    currencies,
    details
  });
  const [selectedCurrency, setSelectedCurrency] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  const { mutate } = useCreateBatchPosting();
  const { batchno } = useGetGenerateBatchNo();
  const [savedBatchData, setSavedBatchData] = useState<any[]>([]);
  // Temporary storage for saved form data
  const batchPostingNo = batchno ? batchno.toString() : '';
  const [searchValue, setSearchValue] = React.useState<SearchFilters>({
    accountNumber: ''
  });

  const [filteredValues, setFilteredValues] = React.useState<SearchFilters>({
    accountNumber: []
  });
  const [selectedValue, setSelectedValue] = React.useState<SearchFilters>({
    accountNumber: ''
  });
  const accountId = String(
    extractIdFromDropdown(selectedValue.accountNumber as string)
  );
  const { accDetailsResults: accountData, isLoading: isAccountDetailsLoading } =
    useGetAccountDetails(encryptData(accountId) || '');
  const handleSelectedValue = (value: string, name: string) => {
    setSelectedValue((prev) => ({
      ...prev,
      [name]: value
    }));
  };

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
  const handleViewPosting = (value: any) => {
    const updatedBatches = [...savedBatchData];
    setSavedBatchData(updatedBatches);
  };
  const handleDeletePosting = (index: Number) => {
    const updatedBatches = [...savedBatchData];
    updatedBatches.splice(Number(index), 1);
    setSavedBatchData(updatedBatches);
  };
  const rawMenuItems = getStoredUser()?.menuItems;
  const menuItems: MenuItemsType[] = Array.isArray(rawMenuItems)
    ? (rawMenuItems as MenuItemsType[])
    : [];
  const manageCharges =
    menuItems.find((item) => item.menu_name === 'BATCH POSTING') ?? null;
  const menuId = manageCharges?.menu_id ?? '';
  const handleSaveBatch = (values: any, resetForm: () => void) => {
    const formattedDate = dayjs(values.valueDate).format('YYYY-MM-DD');
    const newBatchData = {
      ...values,
      batchno: batchPostingNo,
      accountNumber: accountData?.accountnumber,
      valueDate: formattedDate,
      menuid: Number(menuId)
    };
    setSavedBatchData((prevBatches) => [...prevBatches, newBatchData]); // Add the new batch
    resetForm();
  };
  const onSubmit = async (values: any, { resetForm }: any) => {
    const toastMessage = {
      title: 'Validation error',
      severity: 'error',
      accountNumber: {
        message: 'Account Number is required'
      },
      selectedCurrency: {
        message: 'Currency is required'
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

    if (selectedCurrency === '') {
      toast(
        toastMessage.selectedCurrency.message,
        toastMessage.title,
        toastMessage.severity as AlertColor,
        toastActions
      );
      return;
    }
    const latestSavedBatches = savedBatchData.slice(-3);
    if (latestSavedBatches.length > 0) {
      // eslint-disable-next-line array-callback-return
      latestSavedBatches.map((batch) => {
        mutate({
          accountNumber: batch.accountNumber,
          batchno: batch.batchno,
          chequeno: batch.chequeno,
          userid: `${getStoredUser()?.profiles?.userid}`,
          computedAmount: batch.computedAmount,
          currency: selectedCurrency,
          narration: batch.narration,
          tellerno: batch.tellerno,
          trancode: batch.trancode,
          valueDate: batch.valueDate,
          rolelevel: 0,
          menuid: batch.menuid
        });
      });
      resetForm();
      setSavedBatchData([]);
    }
  };
  useEffect(() => {
    if (isSubmitting) {
      document.getElementById('submitButton')?.click(); // Programmatically submit form
      setIsSubmitting?.(false); // Reset isSubmitting to avoid repeat submissions
    }
  }, [isSubmitting]);

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

  if (isLoading) return <div>Loading currencies...</div>;
  return (
    <Formik
      initialValues={BatchPostingInitialValues}
      onSubmit={(values, { resetForm }) => onSubmit(values, { resetForm })}
    >
      {({ values, resetForm }) => (
        <Form>
          <Grid container spacing={2}>
            <Box sx={{ display: 'flex', width: '100%' }}>
              <Box sx={BatchContainer} ml={{ desktop: 1, mobile: 5 }}>
                <PageTitle title="Batch Posting" styles={BatchTitle} />
                <Grid container>
                  <Grid item={isTablet} mobile={12}>
                    <StyledSearchableDropdown>
                      <ActionButtonWithPopper
                        loading={isSearchLoading}
                        handleSelectedValue={(value: string) =>
                          handleSelectedValue(value, 'accountNumber')
                        }
                        label="Account Number"
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
                    <FormSelectField
                      name="trancode"
                      options={mappedTransactionType}
                      label="Transaction Type"
                      customStyle={{
                        width: setWidth(isMobile ? '250px' : '100%')
                      }}
                    />
                  </Grid>
                  <Grid item={isTablet} mobile={12}>
                    <DemoContainer components={['DatePicker']}>
                      <DateTimePicker label="Value Date" name="valueDate" />
                    </DemoContainer>
                  </Grid>
                  <Grid item={isTablet} mobile={12}>
                    <FormSelectInput
                      name="currency"
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
                      name="computedAmount"
                      placeholder="Enter Pay Amount"
                      label="Pay Amount"
                      customStyle={{
                        width: setWidth(isMobile ? '250px' : '100%')
                      }}
                    />
                  </Grid>
                  <Grid item={isTablet} mobile={12}>
                    <FormTextInput
                      name="batchno"
                      value={batchPostingNo || ''}
                      placeholder="Enter Batch Posting"
                      label="Batch Posting"
                      customStyle={{
                        width: setWidth(isMobile ? '250px' : '100%')
                      }}
                      disabled
                    />
                  </Grid>
                  <Grid item={isTablet} mobile={12}>
                    <FormTextInput
                      name="narration"
                      placeholder="Enter narration"
                      label="Narration"
                      customStyle={{
                        width: setWidth(isMobile ? '250px' : '100%')
                      }}
                    />
                  </Grid>
                  <Grid item={isTablet} mobile={12}>
                    <FormTextInput
                      name="tellerno"
                      placeholder="Enter voucher number"
                      label="Voucher Number"
                      customStyle={{
                        width: setWidth(isMobile ? '250px' : '100%')
                      }}
                    />
                  </Grid>
                  <Grid item={isTablet} mobile={12}>
                    <FormTextInput
                      name="chequeno"
                      placeholder="Enter Cheque Number"
                      label="Cheque Number"
                      customStyle={{
                        width: setWidth(isMobile ? '250px' : '100%')
                      }}
                    />
                  </Grid>
                  <Grid item={isTablet} mobile={12}>
                    <FormTextInput
                      name="accnttype"
                      placeholder="Enter Rate"
                      label="Rate"
                      customStyle={{
                        width: setWidth(isMobile ? '250px' : '100%')
                      }}
                      disabled
                    />
                  </Grid>
                  <Grid item={isTablet} mobile={12}>
                    <FormTextInput
                      name="computedAmount"
                      placeholder="Enter value"
                      label="Transaction Amount"
                      customStyle={{
                        width: setWidth(isMobile ? '250px' : '100%')
                      }}
                      disabled
                    />
                  </Grid>
                  <Grid item={isTablet} mobile={12} mt={4}>
                    <PrimaryIconButton
                      buttonTitle="Save Batch"
                      customStyle={{ ...savePosting }}
                      icon={<AddIcon />}
                      onClick={(e) => handleSaveBatch(values, resetForm)}
                    />
                  </Grid>
                </Grid>
                {savedBatchData.length > 0 && (
                  <Box sx={postingDetails}>
                    <Grid item={isTablet} mobile={12} mt={4}>
                      <PageTitle title="Saved Batches" />
                    </Grid>
                    {savedBatchData.map((batch, index) => (
                      <Box key={index} sx={saveBatches}>
                        <Box sx={saveBatchesDetails}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '32px',
                              flex: '1 0 0'
                            }}
                          >
                            <Box>
                              <PageTitle title={batch.chequeno} />
                              <PageTitle title={batch.accountNumber} />
                            </Box>
                            <Box>
                              <PageTitle title={batch.trancode} />
                              <PageTitle title={batch.tellerno} />
                            </Box>
                            <Box>
                              <PageTitle title={batch.narration} />
                              <PageTitle title={batch.currency} />
                            </Box>
                            <Box>
                              <PageTitle title={batch.computedAmount} />
                              <PageTitle title={batch.batchno} />
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '16px'
                            }}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                                gap: '4px'
                              }}
                            >
                              <Box sx={{ display: 'flex', gap: '16px' }}>
                                <Box>
                                  <ActionButton
                                    buttonTitle="View"
                                    customStyle={{
                                      ...DeleteSavedBatches,
                                      border: 'none',
                                      backgroundColor: `${colors.white}`
                                    }}
                                    onClick={() => handleViewPosting(index)}
                                  />
                                </Box>
                                <Box>
                                  <ActionButton
                                    buttonTitle="Delete"
                                    customStyle={{
                                      ...viewSavedBatches,
                                      border: 'none',
                                      backgroundColor: `${colors.white}`
                                    }}
                                    onClick={() => handleDeletePosting(index)}
                                  />
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
              <Box>
                <Box sx={PostingContainer}>
                  {isMobile ? (
                    <MobilePreviewContent
                      PreviewContent={
                        <PreviewContentOne
                          accountDetails={accountData}
                          loading={isAccountDetailsLoading}
                        />
                      }
                    />
                  ) : (
                    <PreviewContentOne
                      accountDetails={accountData}
                      loading={isAccountDetailsLoading}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </Grid>
          <button id="submitButton" type="submit" style={{ display: 'none' }}>
            submit alias
          </button>
        </Form>
      )}
    </Formik>
  );
};
