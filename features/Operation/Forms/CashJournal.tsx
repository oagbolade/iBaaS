import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form, useFormikContext } from 'formik';
import { AlertColor } from '@mui/material';
import dayjs from 'dayjs';
import {
  BatchContainer,
  BatchTitle,
  PostingContainer,
  cashContentStyle,
  previewContentStyle,
  title
} from './style';
import { PageTitle } from '@/components/Typography';
import {
  FormTextInput,
  FormSelectField,
  FormikRadioButton,
  FormikDateTimePicker,
  FormSelectInput
} from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { SubTitle } from '@/features/Administrator/Role/ViewRole';
import { IAccountDetailsResults } from '@/api/ResponseTypes/customer-service';
import { ICurrency } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { cashJournalSchema } from '@/schemas/operation';
import { Details } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { PrimaryIconButton } from '@/components/Buttons';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { CreateCashJournlInitalValues } from '@/schemas/schema-values/operation';
import { useCreateCashJournal } from '@/api/operation/useCashJournal';
import { useGetGLByGLNumber } from '@/api/admin/useCreateGLAccount';
import {
  cashJournalRadioOptions,
  transactionTypeOption
} from '@/constants/OperationOptions';
import { NoDataAvailable } from '@/components/Alert/Warning/NoDataAvailable';
import { useGetTellerBalanceByUserId } from '@/api/operation/useVaultManagement';
import { encryptData } from '@/utils/encryptData';
import { FormAmountInput } from '@/components/FormikFields/FormAmountInput';
import { GLAccountPreviewContent } from '@/features/Setup/Operations/Form/GLPreviewContent/GlAccountPreview';
import { IGLAccount } from '@/api/ResponseTypes/admin';
import { CustomStyleI } from '@/constants/types';
import { MobileModalContainer } from '@/components/Revamp/Modal/mobile/ModalContainer';
import { toast } from '@/utils/toast';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { useGetSystemDate } from '@/api/general/useSystemDate';
import { StyledSearchableDropdown } from '@/features/CustomerService/Form/CreateAccount';
import { ActionButtonWithPopper } from '@/components/Revamp/Buttons';
import { SearchIcon } from '@/assets/svg';
import { filterGeneralLedgerDropdownSearch } from '@/utils/filterDropdownSearch';
import { OptionsI } from '@/components/FormikFields/FormSelectField';
import { dropDownWithSearch } from '@/features/CustomerService/Form/style';
import { useGetAllGLWithBranchCode } from '@/api/setup/useProduct';

interface Props {
  accountDetails?: IAccountDetailsResults | undefined;
}
interface CashJournalProps {
  currencies: ICurrency[] | Array<any>;
  commBanks?: any;
}

type MobilePreviewContentProps = {
  PreviewContent: any;
  customStyle?: CustomStyleI;
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

export const PreviewContentOne = ({ accountDetails }: Props) => {
  if (!accountDetails) {
    return (
      <Box mb={3} sx={{ width: '200px', height: '200px' }}>
        <NoDataAvailable
          message="No account information available, please select an account number"
          width={200}
          height={200}
        />
      </Box>
    );
  }

  return (
    <Box
      mb={{ mobile: 30, tablet: 0 }}
      sx={{
        padding: { mobile: 6, tablet: 0 },
        alignItems: { mobile: 'center', tablet: 'normal' }
      }}
    >
      <PageTitle title="GL Account Information" styles={title} />

      <SubTitle title="Account Name" />
      <Details title={accountDetails.accounttitle || 'NIL'} />

      <SubTitle title="Product Type Name" />
      <Details title="NIL" />

      <SubTitle title="GL NODE NAME" />
      <Details title="NIL" />

      <SubTitle title="GL CLASS" />
      <Details title="NIL" />

      <SubTitle title="GL NAME" />
      <Details title="NIL" />

      <SubTitle title="Book Balance" />
      <Details title={accountDetails.bkbal || 'NIL'} />

      <SubTitle title="Branch" />
      <Details title={accountDetails.branch || 'NIL'} />
    </Box>
  );
};

type SearchFilters = {
  accountNumber: string | OptionsI[];
  [key: string]: any;
};

export const CashJournal = ({ currencies, commBanks }: CashJournalProps) => {
  const { data: dataWithCode } = useGetAllGLWithBranchCode();
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const [transactionType, setTransactionType] = React.useState<boolean>(false);
  const [, setIsLoading] = React.useState(true);
  const [selectedCurrency, setSelectedCurrency] = React.useState('');
  const [filteredValues, setFilteredValues] = React.useState<SearchFilters>({
    accountNumber: []
  });

  const [selectedValue, setSelectedValue] = React.useState<SearchFilters>({
    accountNumber: ''
  });

  const toastActions = useContext(ToastMessageContext);

  const { mutate } = useCreateCashJournal();

  // eslint-disable-next-line no-lone-blocks
  {
    /* ON hold till the endpoint is ready*/
  }
  const { mappedWithBranchCode, mappedCurrency, mappedCommercialBank } =
    useMapSelectOptions({
      currencies,
      commBanks,
      dataWithCode
    });

  const [searchValue, setSearchValue] = React.useState<SearchFilters>({
    accountNumber: ''
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

  const { total } = useGetTellerBalanceByUserId();

  const { bankgl: accountData } = useGetGLByGLNumber(
    encryptData(selectedValue?.accountNumber as string)
  );
  const onSubmit = async (values: any) => {
    const toastMessage = {
      title: 'Validation error',
      severity: 'error',
      selectedCurrency: {
        message: 'Currency is required'
      },
      glAccountNumber: {
        message: 'GL Account Number is required'
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

    if (selectedValue?.accountNumber === '') {
      toast(
        toastMessage.glAccountNumber.message,
        toastMessage.title,
        toastMessage.severity as AlertColor,
        toastActions
      );
      return;
    }

    const getAllValues = {
      ...values,
      debitAcct: selectedValue?.accountNumber,
      creditAcct: selectedValue?.accountNumber,
      currencyCode: selectedCurrency
    };

    mutate(getAllValues);
  };

  const handleSelected = (value: boolean) => {
    setTransactionType(value);
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

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setSearchValue((prev) => ({
      ...prev,
      [name]: value
    }));

    const filteredGlItems = filterGeneralLedgerDropdownSearch(
      mappedWithBranchCode,
      value
    );

    setFilteredValues((prev) => ({
      ...prev,
      [name]: filteredGlItems
    }));

    if (value.trim().length === 0) {
      setFilteredValues({
        accountNumber: mappedWithBranchCode
      });
    }
  };

  const handleSelectedValue = (value: string, name: string) => {
    mappedWithBranchCode?.filter((item) => {
      if (item.value === value) {
        setSelectedValue((prev) => ({
          ...prev,
          [name]: `${item.branchCode}${value}`
        }));
      }

      return null;
    });
  };

  return (
    <Formik
      initialValues={{
        ...CreateCashJournlInitalValues,
        valuedate: sysmodel?.systemDate
      }}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={cashJournalSchema}
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
            <PageTitle title="Cash Journal Posting" styles={BatchTitle} />
            <Grid container>
              <Grid item mobile={12} tablet={12} desktop={6}>
                <FormikRadioButton
                  name="cleartype"
                  title="Select Transaction Type"
                  options={cashJournalRadioOptions}
                  value={transactionType?.toString()}
                  handleCheck={(e: boolean) => handleSelected(e)}
                />
              </Grid>
              {transactionType && (
                <Grid sx={{ marginTop: 2 }} item={isTablet} mobile={12}>
                  <FormSelectField
                    name="bankcode"
                    options={mappedCommercialBank}
                    label="Select Bank"
                    customStyle={{
                      width: setWidth(isMobile ? '250px' : '100%')
                    }}
                  />
                </Grid>
              )}

              <Grid item={isTablet} mobile={12}>
                <StyledSearchableDropdown>
                  <ActionButtonWithPopper
                    handleSelectedValue={(value: string) =>
                      handleSelectedValue(value, 'accountNumber')
                    }
                    label="GL Account Number"
                    name="accountNumber"
                    searchGroupVariant="GLSearchGroup"
                    dropDownOptions={filteredValues.accountNumber as OptionsI[]}
                    customStyle={{ ...dropDownWithSearch, width: '960px' }}
                    icon={<SearchIcon />}
                    iconPosition="end"
                    buttonTitle={
                      (selectedValue.accountNumber as string) ||
                      'Search Account Number'
                    }
                    onChange={handleSearch}
                    searchValue={searchValue.accountNumber as string}
                  />
                </StyledSearchableDropdown>
              </Grid>

              <Grid sx={{ marginTop: 2 }} item={isTablet} mobile={12}>
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
              <Grid sx={{ marginTop: 2 }} item={isTablet} mobile={12}>
                <FormSelectField
                  name="chequetype"
                  options={transactionTypeOption}
                  label="Transaction Type"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid sx={{ marginTop: 2 }} item={isTablet} mobile={12}>
                <FormTextInput
                  name="balancedAmount"
                  label="Balanced Amount"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                  disabled
                  placeholder="Enter Balance Amount"
                  value={accountData?.BKBalance}
                />
              </Grid>
              <Grid sx={{ marginTop: 2 }} item={isTablet} mobile={12}>
                <FormAmountInput
                  name="tranamount"
                  label="Pay Amount"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                  placeholder="Enter pay amount"
                />
              </Grid>
              <Grid sx={{ marginTop: 2 }} item={isTablet} mobile={12}>
                <FormTextInput
                  name="voucherNumber"
                  label="Voucher Number"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                  placeholder="Enter Voucher Number"
                  disabled
                />
              </Grid>
              <Grid sx={{ marginTop: 2 }} item={isTablet} mobile={12}>
                <FormTextInput
                  name="crossrate"
                  label="Rate"
                  disabled
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                  placeholder="Enter Rate"
                />
              </Grid>
              <Grid sx={{ marginTop: 2 }} item={isTablet} mobile={12}>
                <FormTextInput
                  name="tranamount"
                  label="Transaction Amount"
                  disabled
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid sx={{ marginTop: 2 }} item={isTablet} mobile={12}>
                <FormTextInput
                  name="balancedAmount"
                  disabled
                  label="Till Balance"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                  value={total?.toString()}
                />
              </Grid>
              <Grid sx={{ marginTop: 2 }} item={isTablet} mobile={12}>
                <Box>
                  <FormikDateTimePicker
                    label="Value Date"
                    name="valuedate"
                    value={systemDate}
                  />
                </Box>
              </Grid>
              <Grid sx={{ marginTop: 2 }} item={isTablet} mobile={12}>
                <FormTextInput
                  name="narration1"
                  label="Narration"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                  placeholder="Enter narration"
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={PostingContainer}>
            {isMobile ? (
              <MobilePreviewContent
                PreviewContent={
                  <GLAccountPreviewContent
                    accountDetails={accountData as IGLAccount}
                  />
                }
                customStyle={{ ...cashContentStyle }}
              />
            ) : (
              <GLAccountPreviewContent
                accountDetails={accountData as IGLAccount}
              />
            )}
          </Box>
        </Grid>
      </Form>
    </Formik>
  );
};
