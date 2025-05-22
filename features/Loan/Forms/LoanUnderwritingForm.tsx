import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, Grid, Stack } from '@mui/material';
import { Formik, Form } from 'formik';
import { useQuery } from '@tanstack/react-query';
import SearchIcon from '@mui/icons-material/Search';
import dayjs, { Dayjs } from 'dayjs';
import { PreviewContent } from '../LoanDirectory/PreviewLoan';
import {
  FormTextInput,
  FormSelectField,
  FormikRadioButton,
  FormikDateTimePicker
} from '@/components/FormikFields';
import colors from '@/assets/colors';
import { LargeTitle } from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { loanUnderWriteSchema } from '@/schemas/loan';
import { useCurrentBreakpoint, frequencyTermsDays, frequencyOptions } from '@/utils';
import { options } from '@/constants/Loan/selectOptions';
import {
  loanUnderwritingInitialValues,
  IProductDetails
} from '@/schemas/schema-values/loan';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import {
  getLoanProductDetailByProductCode,
  useCreatLoanUnderwriting,
  useGetNextApplicationNo
} from '@/api/loans/useCreditFacility';
import { useSetDirection } from '@/utils/hooks/useSetDirection';
import { ActionButtonWithPopper } from '@/components/Revamp/Buttons';
import { searchCustomer } from '@/api/customer-service/useCustomer';
import { StyledSearchableDropdown } from '@/features/CustomerService/Form/CreateAccount';
import { mapCustomerSearchLoan } from '@/utils/mapCustomerSearch';
import { queryKeys } from '@/react-query/constants';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { dropDownWithSearch } from '@/features/CustomerService/Form/style';
import { getStoredUser } from '@/utils/user-storage';
import { toast } from '@/utils/toast';
import { FormAmountInput } from '@/components/FormikFields/FormAmountInput';
import { encryptData } from '@/utils/encryptData';

type Props = {
  isSubmitting: boolean;
  setIsSubmitting: (submit: boolean) => void;
  loans: any;
  branches: any;
  loansPurpose: any;
  repaymentTypes: any;
  loansources: any;
  collaterals: any;
};

export const CreateLoanUnderwritingForm = ({
  isSubmitting,
  setIsSubmitting,
  loans,
  branches,
  loansPurpose,
  repaymentTypes,
  loansources,
  collaterals
}: Props) => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const { mutate } = useCreatLoanUnderwriting();
  const { setDirection } = useSetDirection();
  const [group, setGroup] = useState<number>(0);
  const [productDetail, setProductDetail] = useState<
    IProductDetails | undefined
  >(undefined);

  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [customerAccount, setCustomerAccount] = useState('');
  const [filteredValues, setFilteredValues] = useState<[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [loanRate, setLoanRate] = useState('');
  const [getCalcDays, setGetCalcDays] = useState<number>(0);
  const [loanTerm, setLoanTerm] = useState<string>('');
  const [penalRate, setPenalRate] = useState<string>('');
  const [penalrateCalcMethod, setPenalrateCalcMethod] = useState<string>('');
  const [moratorium, setMoratorium] = useState<string>('');
  const [maturityDate, setMaturitDate] = useState<Dayjs>();
  const [startDate, setStartDate] = useState<Dayjs>();
  const [termFreq, setTermFrequency] = useState<string>('');

  const toastActions = React.useContext(ToastMessageContext);
  const {
    mappedLoansProduct,
    mappedBranches,
    mappedLoanPurpose,
    mappedLoanRepayment,
    mappedLoansources,
    mappedLoanCollateral
  } = useMapSelectOptions({
    loans,
    branches,
    loansPurpose,
    repaymentTypes,
    loansources,
    collaterals
  });

  const { nextAppNo } = useGetNextApplicationNo();

  useEffect(() => {
    const submit = document.getElementById('submitButton');
    if (isSubmitting) {
      submit?.click();
    }

    return () => {
      setIsSubmitting?.(false);
    };
  }, [isSubmitting, setIsSubmitting]);

  // Fetch loan product details and update related fields
  const GetLoanProductByCode = useCallback(
    (productCode: string) => {
      getLoanProductDetailByProductCode(
        encryptData(productCode) as string,
        toastActions
      ).then((resp) => {
        // Type guard for IProductDetails
        const details = resp.loanProducts as IProductDetails;
        if (details && typeof details === 'object') {
          setProductDetail(details);
          setLoanRate(details.maxintrate ? String(details.maxintrate) : '');
          setPenalRate(details.penalrate ? String(details.penalrate) : '');
          setPenalrateCalcMethod(
            details.penalrateCalcMethod
              ? String(details.penalrateCalcMethod)
              : ''
          );
          setMoratorium(details.moratorium ? String(details.moratorium) : '');
        }
      });
    },
    [toastActions]
  );

  // Handle customer selection
  const handleSelectedValue = useCallback((value: any) => {
    setSelectedCustomer(value);
    setCustomerAccount(value.customer.accountnumber);
    setSearchValue(value);
  }, []);

  // Handle group selection
  const getGroup = useCallback((e: any) => {
    setGroup(e === false ? 1 : 0);
  }, []);

  const { data, isLoading: isSearchLoading } = useQuery({
    queryKey: [queryKeys.searchCustomer, searchValue],
    queryFn: () => searchCustomer(toastActions, searchValue as string),
    enabled: Boolean(searchValue.length > 0)
  });

  // Update filtered customer values on search
  useEffect(() => {
    if (data && data.accountDetailsResults) {
      const first20Customers = data.accountDetailsResults.slice(0, 20);
      setFilteredValues(mapCustomerSearchLoan(first20Customers) as []);
    } else if (!searchValue) {
      setFilteredValues([]);
    }
  }, [data, searchValue]);

  // Handle search input
  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    },
    []
  );

  // Validate and set loan rate
  const checkMaxMinLoanRate = useCallback(
    (value: string) => {
      if (productDetail && Number(value) > Number(productDetail?.maxintrate)) {
        toast(
          'Interest Rate is Higher than Maximum Interest Rate',
          'Loan Rate',
          'error',
          toastActions
        );
      } else {
        setLoanRate(value);
      }
    },
    [productDetail, toastActions]
  );

  // Validate and set loan term
  const checkMaxMinLoanTerm = useCallback(
    (value: string) => {
      if (productDetail && Number(value) > Number(productDetail?.maxterm)) {
        toast(
          'Loan Term is Higher than Maximum Loan Term',
          'Loan Term',
          'error',
          toastActions
        );
      } else {
        setLoanTerm(value);
      }
    },
    [productDetail, toastActions]
  );

  // Calculate number of days for loan
  const calNumberOfDays = useCallback(() => {
    const selectedTermFrequency = frequencyTermsDays.find(
      (term) => term.label === termFreq
    );
    const calcLoanDays =
      Number(loanTerm) * Number(selectedTermFrequency?.value);
    setGetCalcDays(calcLoanDays);
  }, [termFreq, loanTerm]);

  const handleDateChange = useCallback(() => {
    if (startDate) {
      const matDate = dayjs(startDate).add(getCalcDays, 'day');
      setMaturitDate(matDate);
    }
  }, [getCalcDays, startDate]);

  useEffect(() => {
    if (termFreq) {
      calNumberOfDays();
    }
  }, [termFreq, calNumberOfDays]);

  useEffect(() => {
    if (startDate) {
      handleDateChange();
    }
  }, [startDate, handleDateChange]);

  // Get user info
  const user = useMemo(() => getStoredUser(), []);
  const userLoanMenuid = useMemo(
    () =>
      Array.isArray(user?.menuItems)
        ? user.menuItems.find((resp: any) => resp.menu_id === 69)
        : null,
    [user]
  );

  const onSubmit = (values: any) => {
    const { customer } = selectedCustomer;
    const selectcustomerID = String(customer?.customerid);
    const selectcustomerAccount = String(customer?.accountnumber);
    const loanPurposes = String(values.loanPurpose);
    const {
      loanPurpose,
      customerId,
      settlementAcct1,
      userId,
      rolelevel,
      menuId,
      loanAppNo,
      loanDays,
      loanAmount,
      matDate,
      ...restValues
    } = values;

    const loanData = {
      customerId: selectcustomerID,
      settlementAcct1: selectcustomerAccount,
      userid: `${getStoredUser()?.profiles.userid}`,
      roleLevel: `${getStoredUser()?.profiles.rolelevel}`,
      loanPurpose: loanPurposes,
      menuId: userLoanMenuid?.menu_id,
      loanAppNo: nextAppNo,
      loanDays: getCalcDays,
      loanAmount: values.approvedAmount,
      matDate: maturityDate,
      startDate,
      ...restValues
    };
    mutate(loanData);
    setIsSubmitting(false);
  };

  return (
    <Stack direction={setDirection()}>
      <Box
        sx={{
          width: { mobile: '100%', desktop: '624px' },
          padding: '32px'
        }}
      >
        <Box>
          <Box>
            <LargeTitle title="Loan Underwriting" />
          </Box>
          <Box
            sx={{
              justifyContent: { mobile: 'center' },
              alignItems: { mobile: 'center' }
            }}
          >
            <Formik
              initialValues={loanUnderwritingInitialValues}
              onSubmit={(values) => onSubmit(values)}
              validationSchema={loanUnderWriteSchema}
            >
              <Form>
                <Box mt={4}>
                  <Grid container>
                    <Grid
                      item={isTablet}
                      mobile={12}
                      mr={{ mobile: 35, tablet: 0 }}
                      width={{ mobile: '100%', tablet: 0 }}
                    >
                      <FormikRadioButton
                        options={[
                          { label: 'Individual', value: '1' },
                          { label: 'Group', value: '0' }
                        ]}
                        title="Select User Type"
                        name="userType"
                        handleCheck={(e) => getGroup(e)}
                        value={loanUnderwritingInitialValues.userType}
                      />
                    </Grid>

                    {group === 1 && (
                      <Grid
                        item={isTablet}
                        mobile={12}
                        mr={{ mobile: 35, tablet: 0 }}
                        width={{ mobile: '300px', tablet: 0 }}
                        sx={{ marginBottom: '10px' }}
                      >
                        <div>
                          <FormSelectField
                            name="groupId"
                            options={options}
                            label="Group ID"
                            customStyle={{
                              width: setWidth(isMobile ? '300px' : '100%')
                            }}
                          />
                        </div>
                      </Grid>
                    )}

                    <Grid
                      item={isTablet}
                      mobile={12}
                      mr={{ mobile: 35, tablet: 0 }}
                      width={{ mobile: '300px', tablet: 0 }}
                      sx={{ marginBottom: '10px' }}
                    >
                      <StyledSearchableDropdown>
                        <ActionButtonWithPopper
                          loading={isSearchLoading}
                          handleSelectedValue={(value: any) =>
                            handleSelectedValue(value)
                          }
                          label="Customer Name"
                          name="customerId"
                          searchGroupVariant="LoanCustomerSearch"
                          loanDropDownOptions={filteredValues || []}
                          customStyle={{
                            ...dropDownWithSearch,
                            width: '560px'
                          }}
                          icon={<SearchIcon />}
                          iconPosition="end"
                          buttonTitle={
                            (selectedCustomer?.customer
                              ?.accounttitle as string) ||
                            'Search Customer Name'
                          }
                          onChange={handleSearch}
                          searchValue={searchValue as string}
                        />
                      </StyledSearchableDropdown>
                    </Grid>

                    <Grid
                      item={isTablet}
                      mobile={12}
                      mr={{ mobile: 35, tablet: 0 }}
                    >
                      <FormSelectField
                        customStyle={{
                          width: setWidth(isMobile ? '300px' : '100%'),
                          fontSize: '14px'
                        }}
                        options={mappedLoansProduct}
                        label="Loan Product"
                        name="productCode"
                        onChange={(e) => GetLoanProductByCode(e.target.value)}
                        required
                      />{' '}
                    </Grid>

                    <Grid
                      item={isTablet}
                      mobile={12}
                      mr={{ mobile: 35, tablet: 0 }}
                    >
                      <FormTextInput
                        customStyle={{
                          width: setWidth(isMobile ? '300px' : '100%')
                        }}
                        name="settlementAcct1"
                        placeholder="Enter Settlement account balance"
                        label="Settlement Account Balance"
                        value={customerAccount}
                        required
                      />{' '}
                    </Grid>

                    <Grid
                      item={isTablet}
                      mobile={12}
                      mr={{ mobile: 35, tablet: 0 }}
                    >
                      <FormSelectField
                        customStyle={{
                          width: setWidth(isMobile ? '300px' : '100%'),
                          fontSize: '14px'
                        }}
                        options={mappedLoansources}
                        label="Loan Source"
                        name="loanSource"
                        required
                      />{' '}
                    </Grid>

                    <Grid
                      item={isTablet}
                      mobile={12}
                      mr={{ mobile: 35, tablet: 0 }}
                    >
                      <FormSelectField
                        customStyle={{
                          width: setWidth(isMobile ? '300px' : '100%'),
                          fontSize: '14px'
                        }}
                        options={mappedLoanPurpose}
                        label="Loan Purpose"
                        name="loanPurpose"
                        required
                      />{' '}
                    </Grid>

                    <Grid
                      item={isTablet}
                      mobile={12}
                      mr={{ mobile: 35, tablet: 0 }}
                    >
                      <FormSelectField
                        customStyle={{
                          width: setWidth(isMobile ? '300px' : '100%'),
                          fontSize: '14px'
                        }}
                        options={mappedBranches}
                        label="Branch"
                        name="branch"
                        required
                      />{' '}
                    </Grid>

                    <Grid
                      item={isTablet}
                      mobile={12}
                      mr={{ mobile: 35, tablet: 0 }}
                    >
                      <FormTextInput
                        customStyle={{
                          width: setWidth(isMobile ? '300px' : '100%')
                        }}
                        name="interestRate"
                        placeholder="0"
                        label="Loan Rate %"
                        value={loanRate}
                        onChange={(e) => checkMaxMinLoanRate(e.target.value)}
                        required
                      />{' '}
                    </Grid>

                    <Grid
                      item={isTablet}
                      mobile={12}
                      mr={{ mobile: 35, tablet: 0 }}
                    >
                      <Grid p={{ mobile: 2, desktop: 0 }} spacing={2} container>
                        <Grid item={isTablet} mobile={6} tablet={6}>
                          <FormTextInput
                            customStyle={{
                              width: setWidth(isMobile ? '140px' : '100%')
                            }}
                            name="loanTerm"
                            placeholder="Enter Loan term"
                            label="Loan Term"
                            onChange={(e) =>
                              checkMaxMinLoanTerm(e.target.value)
                            }
                            required
                          />{' '}
                        </Grid>

                        <Grid mt={3} item={isTablet} tablet={6} mobile={3}>
                          <FormSelectField
                            customStyle={{
                              width: setWidth(isMobile ? '350px' : '105%'),
                              fontSize: '14px'
                            }}
                            options={frequencyOptions}
                            name="termFrequency"
                            label=""
                            onChange={(e) => setTermFrequency(e.target.value)}
                          />{' '}
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid
                      item={isTablet}
                      mobile={12}
                      mr={{ mobile: 35, tablet: 0 }}
                      width={{ mobile: '100%', tablet: 0 }}
                    >
                      <FormikRadioButton
                        options={[
                          { label: 'Flat Rate ', value: '1' },
                          { label: 'Annualize', value: '0' }
                        ]}
                        title="Calculate Method"
                        name="calcMethod"
                        value="1"
                      />
                    </Grid>

                    <Grid
                      item={isTablet}
                      mobile={12}
                      mr={{ mobile: 35, tablet: 0 }}
                    >
                      <FormAmountInput
                        customStyle={{
                          width: setWidth(isMobile ? '300px' : '100%')
                        }}
                        name="approvedAmount"
                        placeholder="Approved Amount"
                        label="Approved Amount"
                        required
                      />{' '}
                    </Grid>

                    <Grid
                      item={isTablet}
                      mobile={12}
                      mr={{ mobile: 35, tablet: 0 }}
                    >
                      <FormAmountInput
                        customStyle={{
                          width: setWidth(isMobile ? '300px' : '100%')
                        }}
                        name="approvedAmount"
                        placeholder="0.0"
                        label="Request Amount"
                        disabled
                        required
                      />{' '}
                    </Grid>

                    <Grid
                      item={isTablet}
                      mobile={12}
                      mr={{ mobile: 35, tablet: 0 }}
                    >
                      <FormikDateTimePicker
                        label="Posting Date"
                        name="postDate"
                      />
                    </Grid>

                    <Grid
                      item={isTablet}
                      mobile={12}
                      mr={{ mobile: 35, tablet: 0 }}
                      width={{ mobile: '100%', tablet: 0 }}
                    >
                      <FormSelectField
                        customStyle={{
                          width: setWidth(isMobile ? '300px' : '100%'),
                          fontSize: '14px'
                        }}
                        options={mappedLoanRepayment}
                        label="Repayment Type"
                        name="repayType"
                      />{' '}
                    </Grid>

                    <Grid
                      item={isTablet}
                      mobile={12}
                      mr={{ mobile: 35, tablet: 0 }}
                    >
                      <FormikDateTimePicker
                        label="Start Date"
                        name="startDate"
                        value={startDate}
                        handleDateChange={(e: any) => {
                          setStartDate(e);
                        }}
                      />
                    </Grid>

                    <Grid
                      item={isTablet}
                      mobile={12}
                      mr={{ mobile: 35, tablet: 0 }}
                    >
                      <FormikDateTimePicker
                        label="Drawn-down Date"
                        name="drawdown"
                      />
                    </Grid>

                    <Grid
                      item={isTablet}
                      mobile={12}
                      mr={{ mobile: 35, tablet: 0 }}
                    >
                      <FormikDateTimePicker
                        label="Maturity Date"
                        name="matDate"
                        disabled
                        value={maturityDate}
                      />
                    </Grid>

                    <Grid
                      item={isTablet}
                      mobile={12}
                      mr={{ mobile: 35, tablet: 0 }}
                    >
                      <FormikDateTimePicker
                        name="firstPay"
                        label="First Payment Date"
                      />
                    </Grid>

                    <Grid
                      item={isTablet}
                      mobile={12}
                      mr={{ mobile: 35, tablet: 0 }}
                    >
                      <FormSelectField
                        customStyle={{
                          width: setWidth(isMobile ? '300px' : '100%'),
                          fontSize: '14px'
                        }}
                        options={mappedLoanCollateral}
                        label="Collateral Type"
                        name="collType"
                        required
                      />{' '}
                    </Grid>

                    <Grid
                      item={isTablet}
                      mobile={12}
                      mr={{ mobile: 35, tablet: 0 }}
                    >
                      <FormTextInput
                        customStyle={{
                          width: setWidth(isMobile ? '300px' : '100%')
                        }}
                        name="penalRate"
                        placeholder="0902238455"
                        label="Penalty Rate (%)"
                        value={penalRate}
                        onChange={(e) => setPenalRate(e.target.value)}
                        required
                      />{' '}
                    </Grid>

                    <Grid
                      item={isTablet}
                      mobile={12}
                      mr={{ mobile: 35, tablet: 0 }}
                      width={{ mobile: '100%', tablet: 0 }}
                    >
                      <FormikRadioButton
                        options={[
                          { label: 'Flat Rate', value: '1' },
                          { label: 'Annualize', value: '0' }
                        ]}
                        title="Penalty Rate Calculation Method"
                        name="penalCalMthd"
                        value={penalrateCalcMethod}
                        required
                      />
                    </Grid>

                    <Grid
                      item={isTablet}
                      mobile={12}
                      mr={{ mobile: 35, tablet: 0 }}
                    >
                      <FormTextInput
                        customStyle={{
                          width: setWidth(isMobile ? '300px' : '100%')
                        }}
                        name="morat"
                        placeholder="Please enter"
                        value={moratorium}
                        onChange={(e) => setMoratorium(e.target.value)}
                        label="Moratorium"
                      />{' '}
                    </Grid>

                    <Grid
                      item={isTablet}
                      mobile={12}
                      mr={{ mobile: 35, tablet: 0 }}
                    >
                      <FormSelectField
                        customStyle={{
                          width: setWidth(isMobile ? '300px' : '100%'),
                          fontSize: '14px'
                        }}
                        options={[
                          {
                            name: 'Interest and Principle',
                            value: '0'
                          },
                          {
                            name: 'Principle only',
                            value: '1'
                          },
                          {
                            name: 'Interest only',
                            value: '2'
                          }
                        ]}
                        label="Moratorium Type"
                        name="moratType"
                      />{' '}
                    </Grid>
                  </Grid>
                </Box>

                <button
                  id="submitButton"
                  type="submit"
                  style={{ display: 'none' }}
                >
                  submit alias
                </button>
              </Form>
            </Formik>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: '477px',
          padding: '32px',
          gap: '24px',
          borderLeft: `1px solid ${colors.neutral300}`,
          background: `${colors.neutral100}`,
          display: {
            tablet: 'block',
            mobile: 'none'
          }
        }}
      >
        <LargeTitle title="Preview" />
        <Box mt={3} />
        <PreviewContent
          profileDetail={selectedCustomer?.customer}
          loanProduct={productDetail as IProductDetails}
        />
      </Box>
    </Stack>
  );
};
