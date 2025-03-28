import React, { useState, useEffect } from 'react';
import { Box, Grid, Stack } from '@mui/material';
import { Formik, Form } from 'formik';
import { useQuery } from '@tanstack/react-query';
import SearchIcon from '@mui/icons-material/Search';
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
import { useCurrentBreakpoint } from '@/utils';
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
import {frequencyTermsDays} from '@/utils'

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
  const [formValues, setFormValue] = useState<any>({});
  const [productDetail, setProductDetail] = useState({});

  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [customerAccount, setCustomerAccount] = useState('');

  const [filteredValues, setFilteredValues] = useState<[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const [loanRate, setLoanRate] = useState('');
  const [loanTerm, setLoanTerm] = useState<string>('');

  const [penalRate, setPenalRate] = useState<string>('');
  const [penalrateCalcMethod, setPenalrateCalcMethod] = useState<string>('');
  const [moratorium, setMoratorium] = useState<string>('');

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
  
  const GetLoanProductByCode = (productCode: string) => {
    getLoanProductDetailByProductCode(
      encryptData(productCode) as string,
      toastActions
    ).then((resp) => {
      if (typeof resp.loanProducts === 'object' && resp.loanProducts !== null) {
        setFormValue(resp.loanProducts);
        setProductDetail(resp.loanProducts);


        setLoanRate(
          (resp.loanProducts as { actualRAte?: string }).actualRAte || ''
        );
        setPenalRate(
          (resp.loanProducts as { penalrate?: string }).penalrate || ''
        );
        setPenalrateCalcMethod(
          (resp.loanProducts as { penalrateCalcMethod?: string })
            .penalrateCalcMethod || ''
        );
        setMoratorium(
          (resp.loanProducts as { moratorium?: string }).moratorium || ''
        );
      }
    });
  };

  const handleSelectedValue = (value: any) => {
    setSelectedCustomer(value);
    setCustomerAccount(value.customer.accountnumber);
    setSearchValue(value);
  };

  const getGroup = (e: any) => {
    if (e === false) {
      setGroup(1);
    } else {
      setGroup(0);
    }
  };

  const { data, isLoading: isSearchLoading } = useQuery({
    queryKey: [queryKeys.searchCustomer, searchValue],
    queryFn: () => searchCustomer(toastActions, searchValue as string),
    enabled: Boolean(searchValue.length > 0)
  });

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);

    if (data) {
      const { accountDetailsResults } = data;
      const first20Customers = accountDetailsResults.slice(0, 20);
      // TODO : optimize this to proper search customer ----> this only return the first 20 customers
      const mappedSearchResults = mapCustomerSearchLoan(first20Customers);
      setFilteredValues(mappedSearchResults as []);
    }

    if (value.trim().length === 0) {
      setFilteredValues([]);
    }
  };

  const checkMaxMinLoanRate = (value: string) => {
    if (value > formValues.maxintrate) {
      toast(
        'Interest Rate is Higher than Maximum Interest Rate',
        'Loan Rate',
        'error',
        toastActions
      );
    } else {
      setLoanRate(value);
    }
  };

  const checkMaxMinLoanTerm = (value: string) => {
    if (value > formValues.maxterm) {
      toast(
        'Loan Term is Higher than Maximum Loan Term',
        'Loan Term',
        'error',
        toastActions
      );
    } else {
      setLoanTerm(value);
    }
  };

  const user = getStoredUser();
  const userLoanMenuid = Array.isArray(user?.menuItems)
    ? user.menuItems.find((resp: any) => resp.menu_id === 69)
    : null;

  const onSubmit = (values: any) => {
    const { customer } = selectedCustomer;
    const selectcustomerID = String(customer?.customerid);
    const selectcustomerAccount = String(customer?.accountnumber);
    const loanPurposes = String(values.loanPurpose);

    const selectedTermFrequency = frequencyTermsDays.find(
      (term) => term.label === values.termFrequency
    );
    const calcLoanDays =
      Number(values.loanTerm) * Number(selectedTermFrequency?.value);

    const {
      loanPurpose,
      customerId,
      settlementAcct1,
      userId,
      rolelevel,
      menuId,
      loanAppNo,
      loanDays,
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
      loanDays: calcLoanDays,
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
                        placeholder="0902238455"
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
                            options={[
                              { name: 'Days', value: '001' },
                              { name: 'Weeks', value: '002' },
                              { name: 'Forthnight', value: '003' },
                              { name: 'Month', value: '004' },
                              { name: 'Quarter', value: '005' },
                              { name: 'Bi-Annual', value: '006' },
                              { name: 'Annual', value: '007' }
                            ]}
                            name="termFrequency"
                            label=""
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
                        name="loanAmount"
                        placeholder="0.0"
                        label="Request Amount"
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
                        label="Approved Amount"
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
