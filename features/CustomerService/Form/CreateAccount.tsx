'use client';
import React from 'react';
import styled from 'styled-components';
import { useDebounce } from '@uidotdev/usehooks';
import { Box, Stack, AlertColor } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Formik, Form, useFormikContext } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchParams } from 'next/navigation';
import { throttle } from 'lodash';
import { PreviewAccountEditingInfo } from '../Customer/CreateAccount/PreviewAccountEditingInfo';
import {
  DocumentSection,
  IDocumentList
} from '@/features/CustomerService/Customer/CreateAccount/DocumentSection';
import { PreviewCustomerAccountInfo } from '@/features/CustomerService/Customer/CreateAccount/PreviewCustomerAccountInfo';
import { PageTitle } from '@/components/Typography';
import {
  BatchContainer,
  BatchTitle,
  PostingContainer,
  previewContentStyle
} from '@/features/Operation/Forms/style';
import {
  FormTextInput,
  FormSelectField,
  FormikRadioButton
} from '@/components/FormikFields';
import { CustomStyleI } from '@/constants/types';
import { useCurrentBreakpoint } from '@/utils';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { ActionButtonWithPopper } from '@/components/Revamp/Buttons';
import { PrimaryIconButton } from '@/components/Buttons';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { MobileModalContainer } from '@/components/Revamp/Modal/mobile/ModalContainer';
import { dropDownWithSearch } from '@/features/CustomerService/Form/style';
import { IBranches } from '@/api/ResponseTypes/general';
import { useMapSelectOptions } from '@/utils/hooks/useMapSelectOptions';
import { OptionsI } from '@/components/FormikFields/FormSelectField';
import { createCustomerAccountInitialValues } from '@/schemas/schema-values/customer-service';
import { createCustomerAccount } from '@/schemas/customer-service';
import {
  useCreateCustomerAccount,
  useSearchCustomer,
  useGetCustomerAccountInfo,
  useGetDocuments,
  SubmissionType,
  useGetProductDetailsByPcode,
  useGetAccountDetails
} from '@/api/customer-service/useCustomer';
import {
  IAccountInfo,
  IBankProducts,
  IDocuments
} from '@/api/ResponseTypes/customer-service';
import { extractIdFromDropdown } from '@/utils/extractIdFromDropdown';
import { toast } from '@/utils/toast';
import { ToastMessageContext } from '@/context/ToastMessageContext';
import { filterDropdownSearch } from '@/utils/filterDropdownSearch';
import { mapCustomerSearch } from '@/utils/mapCustomerSearch';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { FormSkeleton } from '@/components/Loaders';
import { encryptData } from '@/utils/encryptData';
import { getStoredUser } from '@/utils/user-storage';
import { FormAmountInput } from '@/components/FormikFields/FormAmountInput';

export const StyledSearchableDropdown = styled.div`
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

type Props = {
  PreviewContent: any;
  customStyle?: CustomStyleI;
};

type CreateAccountProps = {
  branches: IBranches[] | Array<any>;
  bankproducts: IBankProducts[] | Array<any>;
};

type SearchFilters = {
  customerid: string | OptionsI[];
  branchcode: string | OptionsI[];
  [key: string]: any;
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

interface MyFormValues {
  productcode: string;
}

const TrackProductCodeAndCustomerIdFields = ({
  setProductCode
}: {
  setProductCode: Function;
}) => {
  const { values } = useFormikContext<MyFormValues>();
  const { productcode } = values as {
    productcode: string;
  };
  setProductCode(productcode);
  return null;
};

export type SubmittedNotSubmittedDocuments = {
  submitted: IDocuments[] | undefined;
  notSubmitted: IDocuments[] | undefined;
};

export const CreateAccount = ({
  branches,
  bankproducts
}: CreateAccountProps) => {
  const toastActions = React.useContext(ToastMessageContext);
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('isEditing');
  const urlState = searchParams.get('urlState');
  const Accountno = searchParams.get('accountNumber');
  const { isLoading } = useGlobalLoadingState();
  const { accDetailsResults, isLoading: isAccountDetailsLoading } =
    useGetAccountDetails(encryptData(Accountno) as string);
  const [searchValue, setSearchValue] = React.useState<SearchFilters>({
    customerid: '',
    branchcode: ''
  });
  const [productcode, setProductCode] = React.useState<string>('');
  const submittedDocuments = React.useRef<IDocumentList[]>([]);
  const [customerIdForEditing, setCustomerIdForEditing] =
    React.useState<string>('');
  const [productCodeForEditing, setProductCodeForEditing] =
    React.useState<string>('');
  const debouncedSearchValue = useDebounce(searchValue.customerid, 500);
  const { isMobile, isTablet, setWidth } = useCurrentBreakpoint();
  const { mappedBranches, mappedBankproducts } = useMapSelectOptions({
    branches,
    bankproducts
  });
  const [filteredValues, setFilteredValues] = React.useState<SearchFilters>({
    branchcode: [],
    customerid: []
  });
  const [selectedValue, setSelectedValue] = React.useState<SearchFilters>({
    branchcode: accDetailsResults?.branch || '',
    customerid: accDetailsResults?.customerid || ''
  });

  const typeOne: SubmissionType = 'SUBMITTED';
  const typeTwo: SubmissionType = 'NOT_SUBMITTED';

  const customerId = extractIdFromDropdown(
    selectedValue?.customerid as string
  ) as string;

  const { productInfos, isLoading: isProductInfoLoading } =
    useGetProductDetailsByPcode(isEditing ? customerIdForEditing : customerId, isEditing ? productCodeForEditing : productcode);

  const { documents: submitted, isLoading: isSubmittedLoading } =
    useGetDocuments(
      typeOne,
      (extractIdFromDropdown(selectedValue.customerid as string) as string) ||
      customerIdForEditing,
      productcode || productCodeForEditing
    );
  const { documents: notSubmitted, isLoading: isNotSubmittedLoading } =
    useGetDocuments(
      typeTwo,
      (extractIdFromDropdown(selectedValue.customerid as string) as string) ||
      customerIdForEditing,
      productcode || productCodeForEditing
    );

  const documents = React.useRef<SubmittedNotSubmittedDocuments>({
    submitted: [],
    notSubmitted: []
  });

  const delay = 1200000; // 20mins
  if (
    productcode?.trim().length > 0 &&
    customerId?.trim().length > 0 &&
    !isSubmittedLoading &&
    !isNotSubmittedLoading
  ) {
    const throttleFunction = throttle(
      () => {
        documents.current = {
          submitted,
          notSubmitted
        };
      },
      delay,
      { trailing: false }
    );

    throttleFunction();
  }

  if (
    isEditing &&
    productCodeForEditing?.toString().trim().length > 0 &&
    customerIdForEditing?.toString().trim().length > 0 &&
    !isSubmittedLoading &&
    !isNotSubmittedLoading
  ) {
    const throttleFunction = throttle(
      () => {
        documents.current = {
          submitted,
          notSubmitted
        };
      },
      delay,
      { trailing: false }
    );

    throttleFunction();
  }

  const { accountInfo, isLoading: isCustomerAccountInfoLoading } =
    useGetCustomerAccountInfo(
      extractIdFromDropdown(selectedValue.customerid as string) as string
    );

  const { mutate } = useCreateCustomerAccount(
    Boolean(isEditing),
    encryptData(Accountno),
    urlState
  );

  const handleSubmittedDocuments = (submittedDocument: IDocumentList[]) => {
    submittedDocuments.current = submittedDocument;
  };

  const actionButtons: any = [
    <Box sx={{ display: 'flex' }} ml={{ mobile: 12, desktop: 0 }}>
      <PrimaryIconButton
        isLoading={isLoading}
        type="submit"
        buttonTitle="Submit"
        customStyle={{ ...submitButton }}
      />
    </Box>
  ];

  React.useEffect(() => {
    setFilteredValues({
      customerid: [],
      branchcode: mappedBranches
    });
  }, [mappedBranches]);

  React.useEffect(() => {
    setProductCodeForEditing(accDetailsResults?.productcode || '');
    setCustomerIdForEditing(accDetailsResults?.customerid || '');
    const placeholder = isEditing && 'Search customer name';

    // Set default values for branch and customer when editing
    const constructCustomerIDForExtraction = accDetailsResults
      ? `ID ${accDetailsResults?.customerid || ''}: ${accDetailsResults?.accounttitle || ''}`
      : placeholder;

    setSelectedValue({
      branchcode: accDetailsResults?.branch || '',
      customerid: constructCustomerIDForExtraction || ''
    });
  }, [accDetailsResults]);

  const handleSelectedValue = (value: string, name: string) => {
    setSelectedValue((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = async (values: any) => {
    const toastMessage = {
      title: 'Validation error',
      severity: 'error',
      branchCode: {
        message: 'Branch Code is required'
      },
      customerId: {
        message: 'Customer ID is required'
      }
    };

    if (selectedValue.branchcode === '') {
      toast(
        toastMessage.branchCode.message,
        toastMessage.title,
        toastMessage.severity as AlertColor,
        toastActions
      );

      return;
    }

    if (selectedValue.customerid === '') {
      toast(
        toastMessage.customerId.message,
        toastMessage.title,
        toastMessage.severity as AlertColor,
        toastActions
      );
      return;
    }

    const channelSelect = document.getElementById?.(
      'channelSelect'
    ) as HTMLInputElement | null;

    const formattedReqIds = await submittedDocuments.current.map(
      (document) => ({ reqID: document.reqId })
    );

    await mutate({
      ...values,
      branchcode: extractIdFromDropdown(selectedValue?.branchcode as string),
      customerid: extractIdFromDropdown(selectedValue?.customerid as string),
      channel: channelSelect?.value,
      json: formattedReqIds
    });
  };

  const { accountDetailsResults, isLoading: isSearchLoading } =
    useSearchCustomer(encryptData(debouncedSearchValue as string) as string);

  React.useEffect(() => {
    const mappedSearchResults = mapCustomerSearch(accountDetailsResults);

    setFilteredValues((prev) => ({
      ...prev,
      customerid: mappedSearchResults
    }));
  }, [isSearchLoading]);

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setSearchValue((prev) => ({
      ...prev,
      [name]: value
    }));

    if (name === 'branchcode') {
      const filteredItems = filterDropdownSearch(mappedBranches, value);

      setFilteredValues((prev) => ({
        ...prev,
        [name]: filteredItems
      }));
    }

    if (value.trim().length === 0) {
      setFilteredValues({
        customerid: [],
        branchcode: mappedBranches
      });
    }
  };

  if (isEditing && isAccountDetailsLoading) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={3} />
      </Box>
    );
  }

  const pickInitialValues = isEditing
    ? {
      productcode: accDetailsResults?.productcode,
      acctdesc: accDetailsResults?.accountdesc,
      cintrate: Number(accDetailsResults?.cintrate),
      dintrate: Number(accDetailsResults?.dintrate),
      customerid: accDetailsResults?.customerid,
      offc: accDetailsResults?.officercode,
      sweep: 'string', // TODO: Hardcoded until we know what "sweep" is
      stafid: `${getStoredUser()?.profiles.userid}`,
      disv: 0,
      eventlogid: 0,
      userid: `${getStoredUser()?.profiles.userid}`,
      authid: `${getStoredUser()?.profiles.userid}`,
      oldacct: accDetailsResults?.oldacctno
    }
    : {
      ...createCustomerAccountInitialValues,
      cintrate: String(productInfos?.crrate),
      dintrate: String(productInfos?.drrate),
    };

  return (
    <Formik
      initialValues={pickInitialValues}
      onSubmit={(values) => onSubmit(values)}
      validationSchema={createCustomerAccount}
    >
      <Form>
        <TrackProductCodeAndCustomerIdFields setProductCode={setProductCode} />
        <Box sx={{ marginTop: '60px' }}>
          <TopActionsArea actionButtons={actionButtons} />
        </Box>
        <Stack
          sx={{ minHeight: '150vh' }}
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Box
            sx={{ ...BatchContainer, width: '700px' }}
            ml={{ desktop: 1, mobile: 5 }}
          >
            <PageTitle
              title={`${isEditing ? 'Edit Account' : 'Create Account'}`}
              styles={BatchTitle}
            />
            <Grid container>
              <Grid item={isTablet} mobile={12}>
                <StyledSearchableDropdown>
                  <ActionButtonWithPopper
                    handleSelectedValue={(value: string) =>
                      handleSelectedValue(value, 'branchcode')
                    }
                    label="Branch"
                    name="branchcode"
                    searchGroupVariant="BasicSearchGroup"
                    dropDownOptions={filteredValues.branchcode as OptionsI[]}
                    customStyle={{ ...dropDownWithSearch, width: '635px' }}
                    icon={<SearchIcon />}
                    iconPosition="end"
                    buttonTitle={
                      (selectedValue.branchcode as string) || 'Search'
                    }
                    onChange={handleSearch}
                    searchValue={searchValue.branchcode as string}
                  />
                </StyledSearchableDropdown>
              </Grid>

              <Grid item={isTablet} mobile={12}>
                <StyledSearchableDropdown>
                  <ActionButtonWithPopper
                    loading={isSearchLoading}
                    handleSelectedValue={(value: string) =>
                      handleSelectedValue(value, 'customerid')
                    }
                    label="Customer Name"
                    name="customerid"
                    searchGroupVariant="BasicSearchGroup"
                    dropDownOptions={filteredValues.customerid as OptionsI[]}
                    customStyle={{ ...dropDownWithSearch, width: '635px' }}
                    icon={<SearchIcon />}
                    iconPosition="end"
                    buttonTitle={
                      (selectedValue.customerid as string) || 'Search'
                    }
                    onChange={handleSearch}
                    searchValue={searchValue.customerid as string}
                    disabled={!!isEditing}
                  />
                </StyledSearchableDropdown>
              </Grid>

              <Grid item={isTablet} mobile={12}>
                <FormSelectField
                  name="productcode"
                  options={mappedBankproducts}
                  label="Account Product"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>

              {/* TODO: need to find out how this is fed into the API */}
              <Grid item={isTablet} mobile={12} my={3}>
                <FormikRadioButton
                  id="channelSelect"
                  options={[
                    { label: 'Yes', value: 'yes' },
                    { label: 'No', value: 'no' }
                  ]}
                  title="Block view on Account?"
                  name="actions"
                  value="yes"
                />
              </Grid>

              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="dintrate"
                  placeholder="Debit Interest"
                  label="Debit Interest (Per Annum)"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                  value={String(productInfos?.drrate || 0)}
                />
              </Grid>

              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="cintrate"
                  placeholder="Credit interest"
                  label="Credit Interest (Per Annum)"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                  value={String(productInfos?.crrate || 0)}
                />
              </Grid>

              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="oldacct"
                  placeholder="Enter value"
                  label="Old Account Number"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                  disabled={!!isEditing}
                />
              </Grid>

              <Grid item={isTablet} mobile={12}>
                <FormTextInput
                  name="acctdesc"
                  placeholder="Enter account description"
                  label="Account Description"
                  customStyle={{
                    width: setWidth(isMobile ? '250px' : '100%')
                  }}
                />
              </Grid>

              {documents?.current?.submitted !== undefined && (
                <DocumentSection
                  handleSubmittedDocuments={handleSubmittedDocuments}
                  documents={documents.current}
                  loading={isSubmittedLoading || isNotSubmittedLoading}
                />
              )}
            </Grid>
          </Box>
          {isEditing ? (
            <PreviewAccountEditingInfo
              loading={isProductInfoLoading}
              productInfos={productInfos}
              accDetailsResults={accDetailsResults}
            />
          ) : (
            <Box
              sx={{
                ...PostingContainer,
                marginTop: '17px',
                minHeight: '150vh'
              }}
            >
              {!isEditing && isMobile && (
                <MobilePreviewContent
                  PreviewContent={
                    <PreviewCustomerAccountInfo
                      accountInfo={accountInfo as IAccountInfo}
                      loading={isCustomerAccountInfoLoading as boolean}
                    />
                  }
                />
              )}

              {!isEditing && !isMobile && (
                <PreviewCustomerAccountInfo
                  accountInfo={accountInfo as IAccountInfo}
                  loading={isCustomerAccountInfoLoading as boolean}
                />
              )}
            </Box>
          )}
        </Stack>
      </Form>
    </Formik>
  );
};
