'use client';
import React from 'react';
import { Box, AlertColor } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Formik, Form } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchParams } from 'next/navigation';
import { PreviewAccountInfo } from '../Customer/CASAAccount/PreviewAccountInfo';
import { actionButtons } from './AddLien';
import { StyledSearchableDropdown } from './CreateAccount';
import { PageTitle } from '@/components/Typography';
import {
  BatchContainer,
  BatchTitle,
  PostingContainer,
  WithdrawalContentStyle
} from '@/features/Operation/Forms/style';
import { FormSelectField, TextInput } from '@/components/FormikFields';
import { useCurrentBreakpoint } from '@/utils';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { MobilePreviewContent } from '@/features/Operation/Forms//BatchPosting';
import { moveCASAAccountInitialValues } from '@/schemas/schema-values/customer-service';
import { moveCASAAccount } from '@/schemas/customer-service';
import {
  useGetAccountDetails,
  useMoveCASA
} from '@/api/customer-service/useCustomer';
import { ActionButtonWithPopper } from '@/components/Revamp/Buttons';
import { OptionsI } from '@/components/FormikFields/FormSelectField';
import { dropDownWithSearch } from '@/features/CustomerService/Form/style';
import { filterDropdownSearch } from '@/utils/filterDropdownSearch';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { IAccountOfficers } from '@/api/ResponseTypes/admin';
import { IBranches } from '@/api/ResponseTypes/general';
import { toast } from '@/utils/toast';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { extractIdFromDropdown } from '@/utils/extractIdFromDropdown';
import { useGetLoanAccountDetails } from '@/api/loans/useCreditFacility';
import { encryptData } from '@/utils/encryptData';

type SearchFilters = {
  newAcctOfficer: string | OptionsI[];
  [key: string]: any;
};

type Props = {
  officers?: IAccountOfficers[];
  branches?: IBranches[];
};

export const CasaAccount = ({ officers, branches }: Props) => {
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const toastActions = React.useContext(ToastMessageContext);
  const { mutate } = useMoveCASA();
  const searchParams = useSearchParams();
  const casaAccountno = searchParams.get('accountNumber') || '';
  const customerid = searchParams.get('customerId') || '';
  const action = '1';
  const { accDetailsResults, isLoading: areAccoutDetailsLoading } =
    useGetAccountDetails(encryptData(casaAccountno) as string);
  const { loanAccDetails, isLoading: areLoanDetailsLoading } =
    useGetLoanAccountDetails(encryptData(casaAccountno) as string, action);

  const [selectedValue, setSelectedValue] = React.useState<SearchFilters>({
    newAcctOfficer: ''
  });
  const [searchValue, setSearchValue] = React.useState<SearchFilters>({
    newAcctOfficer: ''
  });
  const [filteredValues, setFilteredValues] = React.useState<SearchFilters>({
    newAcctOfficer: []
  });
  const { mappedAccountOfficers, mappedBranches } = useMapSelectOptions({
    officers,
    branches
  });

  const handleSelectedValue = (value: string, name: string) => {
    setSelectedValue((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setSearchValue((prev) => ({
      ...prev,
      [name]: value
    }));

    const filteredItems = filterDropdownSearch(mappedAccountOfficers, value);

    setFilteredValues((prev) => ({
      ...prev,
      [name]: filteredItems
    }));

    if (value.trim().length === 0) {
      setFilteredValues({
        newAcctOfficer: mappedAccountOfficers
      });
    }
  };

  const onSubmit = (values: any) => {
    const toastMessage = {
      title: 'Validation error',
      severity: 'error',
      newAcctOfficer: {
        message: 'Account Officer is required'
      }
    };

    if (selectedValue.newAcctOfficer === '') {
      toast(
        toastMessage.newAcctOfficer.message,
        toastMessage.title,
        toastMessage.severity as AlertColor,
        toastActions
      );

      return;
    }

    const getAllValues = {
      ...values,
      casaAccountno,
      customerid,
      newAcctOfficer: extractIdFromDropdown(
        selectedValue.newAcctOfficer as string
      )
    };

    mutate(getAllValues);
  };

  return (
    <Formik
      initialValues={moveCASAAccountInitialValues}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={moveCASAAccount}
    >
      <Form>
        <TopActionsArea actionButtons={actionButtons} />

        <Grid container spacing={2}>
          <Box sx={BatchContainer} ml={{ desktop: 1, mobile: 5 }}>
            <PageTitle title="Move CASA Account" styles={BatchTitle} />
            <Grid container>
              <Grid item={isTablet} mobile={12}>
                <FormSelectField
                  name="newBranch"
                  options={mappedBranches}
                  label="New Branch"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>
              <Grid mb={2} item={isTablet} mobile={12}>
                <TextInput
                  name="officerCode"
                  placeholder="Account number"
                  label="Account Officer Code"
                  disabled
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                  value={
                    extractIdFromDropdown(
                      selectedValue.newAcctOfficer as string
                    ) || ''
                  }
                />
              </Grid>
              <Grid item={isTablet} mobile={12}>
                <StyledSearchableDropdown>
                  <ActionButtonWithPopper
                    handleSelectedValue={(value: string) =>
                      handleSelectedValue(value, 'newAcctOfficer')
                    }
                    label="Change Account Officer"
                    name="newAcctOfficer"
                    searchGroupVariant="BasicSearchGroup"
                    dropDownOptions={
                      filteredValues.newAcctOfficer as OptionsI[]
                    }
                    customStyle={dropDownWithSearch}
                    icon={<SearchIcon />}
                    iconPosition="end"
                    buttonTitle={
                      (selectedValue.newAcctOfficer as string) || 'Search'
                    }
                    onChange={handleSearch}
                    searchValue={searchValue.newAcctOfficer as string}
                  />
                </StyledSearchableDropdown>
              </Grid>
            </Grid>
          </Box>
          <Box sx={PostingContainer}>
            {isMobile ? (
              <MobilePreviewContent
                PreviewContent={
                  <PreviewAccountInfo
                    loading={areAccoutDetailsLoading || areLoanDetailsLoading}
                    accDetailsResults={accDetailsResults}
                    loanAccDetails={loanAccDetails}
                  />
                }
                customStyle={{ ...WithdrawalContentStyle }}
              />
            ) : (
              <PreviewAccountInfo
                loading={areAccoutDetailsLoading || areLoanDetailsLoading}
                accDetailsResults={accDetailsResults}
                loanAccDetails={loanAccDetails}
              />
            )}
          </Box>
        </Grid>
      </Form>
    </Formik>
  );
};
