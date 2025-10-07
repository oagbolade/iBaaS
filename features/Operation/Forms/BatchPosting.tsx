/* eslint-disable import/no-cycle */
'use client';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form, FormikHelpers } from 'formik';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AlertColor } from '@mui/material';
import dayjs from 'dayjs';
import { PreviewContentOne } from '../posting';
import {
  BatchTitle,
  DeleteSavedBatches,
  postingDetails,
  previewContentStyle,
  saveBatches,
  saveBatchesDetails,
  savePosting,
  viewSavedBatches,
  saveTitles
} from './style';
import { PageTitle } from '@/components/Typography';
import {
  FormTextInput,
  FormSelectField,
  FormSelectInput
} from '@/components/FormikFields';
import { CustomStyleI } from '@/constants/types';
import { useCurrentBreakpoint } from '@/utils';
import { ActionButton } from '@/components/Revamp/Buttons';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  submitButton,
  cancelButton
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { MobileModalContainer } from '@/components/Revamp/Modal/mobile/ModalContainer';
import { AddIcon } from '@/assets/svg';
import DateTimePicker from '@/components/Revamp/FormFields/DateTimePicker';
import { OptionsI } from '@/components/FormikFields/FormSelectField';
import { ICurrency } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { ITransactionType } from '@/api/ResponseTypes/setup';
import {
  useCreateBatchPosting,
  useGetGenerateBatchNo
} from '@/api/operation/useBatchPosting';
import { useGetAccountDetails } from '@/api/customer-service/useCustomer';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { toast } from '@/utils/toast';
import { BatchPostingInitialValues } from '@/schemas/schema-values/operation';
import { encryptData } from '@/utils/encryptData';
import { FormAmountInput } from '@/components/FormikFields/FormAmountInput';
import colors from '@/assets/colors';
import { getStoredUser } from '@/utils/user-storage';
import { MenuItemsType } from '@/api/ResponseTypes/login';
import { FormSkeleton } from '@/components/Loaders';
import { useGetSystemDate } from '@/api/general/useSystemDate';
import { useGetGLByGLNumber } from '@/api/admin/useCreateGLAccount';
import { IAccountDetailsResults } from '@/api/ResponseTypes/customer-service';
import { IGLAccount } from '@/api/ResponseTypes/admin';

// Define type for saved batch data
interface BatchData {
  accountNumber: string;
  trancode: string;
  valueDate: string;
  currency: string;
  computedAmount: string;
  batchno: string;
  narration: string;
  tellerno: string;
  chequeno: string;
  accnttype: string;
  menuid: number;
}

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
  menu_id?: string;
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
  const mapGLAccountToAccountDetails = (
    glAccount: IGLAccount | null
  ): IAccountDetailsResults | undefined => {
    if (!glAccount) return undefined;
    return {
      accountnumber: glAccount.glNumber,
      accounttitle: glAccount.acctName,
      source: '',
      odProd: '',
      allowSI: '',
      oldacctno: '',
      siFloor: '',
      allowLien: '',
      od: '',
      pendingc: '',
      cintrate: '',
      dintrate: '',
      apptype: '',
      customerid: '',
      acctty: '',
      bkbal: '',
      effbal: '',
      usebal: '',
      prodname: '',
      branch: '',
      status: '',
      acctstatus: '',
      prodstatus: '',
      totalCharge: '',
      proddesc: '',
      productcode: '',
      closingCharge: '',
      officercode: '',
      accountdesc: '',
      disableview: '',
      holdBal: '',
      bvn: '',
      phoneNumber: '',
      email: ''
    };
  };
  const [selectedCurrency, setSelectedCurrency] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const { mutate } = useCreateBatchPosting();
  const { batchno } = useGetGenerateBatchNo();
  const [savedBatchData, setSavedBatchData] = useState<BatchData[]>([]);
  const batchPostingNo = batchno ? batchno.toString() : '';
  const [accountNumber, setAccountNumber] = React.useState<string | null>(null);
  const isAccountNumber10Digits = accountNumber?.length === 10;

  const isBatchPosting = true;

  // Fetch Account Details when account number is less than 12 digits that is 11 and below
  const { accDetailsResults: accountData, isLoading: isAccountDetailsLoading } =
    useGetAccountDetails(encryptData(accountNumber) || '', isBatchPosting);

  // Fetch GL Account when account number is 12 digits and above
  const { bankgl: costAmountData } = useGetGLByGLNumber(
    encryptData(accountNumber) || '',
    isBatchPosting
  );

  const normalizedAccountDetails: IAccountDetailsResults | undefined =
    isAccountNumber10Digits
      ? accountData ?? undefined
      : mapGLAccountToAccountDetails(costAmountData as IGLAccount | null);

  const [selectedPostingIndex, setSelectedPostingIndex] = useState<
    number | null
  >(null);

  const handleViewPosting = (
    index: number,
    setValues: (values: any) => void
  ) => {
    setSelectedPostingIndex(index);

    const batch = savedBatchData[index];
    if (batch) {
      setValues({
        accountNumber: batch.accountNumber,
        trancode: batch.trancode,
        valueDate: dayjs(batch.valueDate), // Parse string to Dayjs
        currency: batch.currency,
        computedAmount: batch.computedAmount,
        batchno: batch.batchno,
        narration: batch.narration,
        tellerno: batch.tellerno,
        chequeno: batch.chequeno,
        accnttype: batch.accnttype
      });
      setSelectedCurrency(batch.currency);
      setAccountNumber(batch.accountNumber);
    }
  };

  const handleDeletePosting = (index: number) => {
    if (index >= 0 && index < savedBatchData.length) {
      const updatedBatches = [...savedBatchData];
      updatedBatches.splice(index, 1);
      setSavedBatchData(updatedBatches);
      toast(
        'Batch deleted successfully',
        'Success',
        'success' as AlertColor,
        toastActions
      );
    }
  };
  const rolelevel = getStoredUser()?.profiles?.rolelevel;
  const rawMenuItems = getStoredUser()?.menuItems;
  const menuItems: MenuItemsType[] = Array.isArray(rawMenuItems)
    ? (rawMenuItems as MenuItemsType[])
    : [];
  const manageCharges =
    menuItems.find((item) => item.menu_name === 'BATCH POSTING') ?? null;
  const menuId = manageCharges?.menu_id ?? '';

  const handleSaveBatch = (values: any, resetForm: () => void) => {
    const requiredFields = [
      { key: 'accountNumber', label: 'Account Number' },
      { key: 'trancode', label: 'Transaction Type' },
      { key: 'narration', label: 'Narration' },
      { key: 'tellerno', label: 'Voucher Number' },
      { key: 'chequeno', label: 'Cheque Number' },
      { key: 'computedAmount', label: 'Pay Amount' }
    ];

    const missingFields = requiredFields.filter(
      ({ key }) => !values[key] || values[key].toString().trim() === ''
    );

    if (missingFields.length > 0 || selectedCurrency === '') {
      const errorMessage =
        missingFields.length > 0
          ? `Please fill the following required fields: ${missingFields
              .map(({ label }) => label)
              .join(', ')}`
          : 'Please select a currency';
      toast(
        errorMessage,
        'Validation error',
        'error' as AlertColor,
        toastActions
      );
      return;
    }
    if (selectedPostingIndex !== null && savedBatchData.length > 0) {
      const updatedBatches = [...savedBatchData];
      const formattedDate = dayjs(values.valueDate).format('YYYY-MM-DD');
      const updatedBatchData: BatchData = {
        ...values,
        batchno: batchPostingNo,
        valueDate: formattedDate,
        menuid: Number(menuId),
        currency: selectedCurrency
      };
      updatedBatches[selectedPostingIndex] = updatedBatchData;
      setSavedBatchData(updatedBatches);
      setSelectedPostingIndex(null);
      resetForm();
      toast(
        'Batch updated successfully',
        'Success',
        'success' as AlertColor,
        toastActions
      );
      return;
    }

    const formattedDate = dayjs(values.valueDate).format('YYYY-MM-DD');
    const newBatchData: BatchData = {
      ...values,
      batchno: batchPostingNo,
      valueDate: formattedDate,
      menuid: Number(menuId),
      currency: selectedCurrency
    };

    setSavedBatchData((prevBatches) => [...prevBatches, newBatchData]);

    resetForm();
    toast(
      'Batch saved successfully',
      'Success',
      'success' as AlertColor,
      toastActions
    );
  };

  const onSubmit = async (values: any, { resetForm }: FormikHelpers<any>) => {
    const toastMessage = {
      title: 'Validation error',
      severity: 'error' as AlertColor,
      selectedCurrency: {
        message: 'Currency is required'
      }
    };
    if (selectedCurrency === '') {
      toast(
        toastMessage.selectedCurrency.message,
        toastMessage.title,
        toastMessage.severity,
        toastActions
      );
      return;
    }

    if (savedBatchData.length > 0) {
      // Prepare a single payload with all batches
      const batchPayload = savedBatchData.map((batch) => ({
        accountNumber: batch.accountNumber,
        batchno: batch.batchno,
        chequeno: batch.chequeno,
        userid: `${getStoredUser()?.profiles?.userid}`,
        computedAmount: batch.computedAmount,
        currency: batch.currency,
        narration: batch.narration,
        tellerno: batch.tellerno,
        trancode: batch.trancode,
        valueDate: batch.valueDate,
        rolelevel: Number(rolelevel),
        menuid: batch.menuid
      }));

      // Call the API once with the array of batches
      mutate(batchPayload);
    }
  };

  const handleAccountNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountNumber(e.target.value);
  };

  useEffect(() => {
    if (isSubmitting) {
      document.getElementById('submitButton')?.click();
      setIsSubmitting?.(false);
    }
  }, [isSubmitting, setIsSubmitting]);

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
  }, [mappedCurrency]);
  if (isLoading) return <FormSkeleton noOfLoaders={5} />;

  return (
    <Formik
      initialValues={{
        ...BatchPostingInitialValues,
        valueDate: systemDate
      }}
      onSubmit={onSubmit}
    >
      {({ values, resetForm, setValues }) => (
        <Form>
          <Grid container spacing={8}>
            <Grid item tablet={6} mobile={12}>
              <PageTitle title="Batch Posting" styles={BatchTitle} />
              <Grid container>
                <Grid
                  item={isTablet}
                  mobile={12}
                  mr={{ mobile: 35, tablet: 0 }}
                  width={{ mobile: '100%', tablet: 0 }}
                >
                  <FormTextInput
                    name="accountNumber"
                    placeholder="Enter Account Number"
                    label="Account Number"
                    required
                    value={accountNumber?.toString()}
                    onChange={handleAccountNumber}
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <FormSelectField
                    name="trancode"
                    options={mappedTransactionType}
                    label="Transaction Type"
                    required
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>
                <Grid item={isTablet} mobile={12}>
                  <DemoContainer components={['DatePicker']}>
                    <DateTimePicker
                      label="Value Date"
                      name="valueDate"
                      required
                      value={values.valueDate || systemDate}
                    />
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
                    required
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
                    onClick={() => handleSaveBatch(values, resetForm)}
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
                            <PageTitle title="Teller / Cheque No" />
                            <PageTitle
                              title={batch.chequeno}
                              styles={{ ...saveTitles }}
                            />
                          </Box>
                          <Box>
                            <PageTitle title="Account Number" />
                            <PageTitle
                              title={batch.accountNumber}
                              styles={{ ...saveTitles }}
                            />
                          </Box>
                          {batch.trancode === '523' && (
                            <Box>
                              <PageTitle title="DR" />
                              <PageTitle
                                title={batch.trancode}
                                styles={{ ...saveTitles }}
                              />
                            </Box>
                          )}
                          {batch.trancode === '002' && (
                            <Box>
                              <PageTitle title="CR" />
                              <PageTitle
                                title={batch.trancode}
                                styles={{ ...saveTitles }}
                              />
                            </Box>
                          )}
                          <Box>
                            <PageTitle title="Transaction Amount" />
                            <PageTitle
                              title={batch.computedAmount}
                              styles={{ ...saveTitles }}
                            />
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
                                  onClick={() =>
                                    handleViewPosting(index, setValues)
                                  }
                                />
                              </Box>
                              <Box sx={{ marginRight: '50px' }}>
                                <ActionButton
                                  buttonTitle="Delete"
                                  customStyle={{
                                    ...viewSavedBatches,
                                    border: 'none',
                                    backgroundColor: `${colors.white}`,
                                    marginRight: '90px'
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
            </Grid>

            <Grid item tablet={6} mobile={12}>
              {isMobile ? (
                <MobilePreviewContent
                  PreviewContent={
                    <PreviewContentOne
                      accountDetails={normalizedAccountDetails}
                      loading={isAccountDetailsLoading}
                    />
                  }
                />
              ) : (
                <PreviewContentOne
                  accountDetails={normalizedAccountDetails}
                  loading={isAccountDetailsLoading}
                />
              )}
            </Grid>
          </Grid>
          <button id="submitButton" type="submit" style={{ display: 'none' }}>
            submit alias
          </button>
        </Form>
      )}
    </Formik>
  );
};
