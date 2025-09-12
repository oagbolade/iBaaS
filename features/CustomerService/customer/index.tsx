'use client';
import { Box } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import { FilterSection as CustomerFilterSection } from './FilterSection';
import { tabStyle } from './style';
import { AccountFilterSection } from './AccountFilterSection';
import { COLUMNS, CUSTOMER_ACCOUNT_COLUMNS } from './COLUMNS';
import { TableActionMenu } from './TableActionMenu';
import { CustomerAccountTableActionMenu } from './CustomerAccountTableActionMenu';
import { PrimaryIconButton } from '@/components/Buttons';
import { ActionButton } from '@/components/Revamp/Buttons';
import { TopActionsArea } from '@/components/Revamp/Shared';
import {
  submitButton,
  cancelButton
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import {
  MuiTableContainer,
  StyledTableRow,
  renderEmptyTableBody
} from '@/components/Table/Table';
import { TabsV2 } from '@/components/Revamp/TabsV2';
import { useGetBranches } from '@/api/general/useBranches';
import { ISearchParams } from '@/app/api/search/route';
import { useGetStatus } from '@/api/general/useStatus';
import {
  useFilterCustomerAccountSearch,
  useFilterCustomerSearch
} from '@/api/customer-service/useCustomer';
import { FormSkeleton } from '@/components/Loaders';
import { StyledTableCell } from '@/components/Table/style';
import { SearchCustomerAccountResponse } from '@/api/ResponseTypes/customer-service';
import { Status } from '@/components/Labels';
import { checkMultipleUserRoleAccess } from '@/utils/checkUserRoleAccess';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { useGetProductType } from '@/api/general/useProductType';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';
import { ModalContainerV2 } from '@/components/Revamp/Modal';
import colors from '@/assets/colors';
import { useGetProductClassByCastegory } from '@/api/setup/useProduct';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';

export interface IOptions {
  buttonTitle: string;
  link?: string;
  onClick?: () => void;
}

const CustomerActionMenuProps = ({
  customerId,
  type
}: {
  customerId: string;
  type: string;
}): React.ReactElement => {
  return <TableActionMenu customerId={customerId} type={type} />;
};

const CustomerAccountActionMenuProps = ({
  customerId,
  accountNumber,
  status,
  productType,
  branchCode
}: {
  customerId: string;
  accountNumber: string;
  productType: string;
  branchCode: string;
  status: number;
}): React.ReactElement => {
  return (
    <CustomerAccountTableActionMenu
      productType={productType}
      branchCode={branchCode}
      customerId={customerId}
      accountNumber={accountNumber}
      status={status}
    />
  );
};

type CustomerOverviewTableProps = {
  isLoading: boolean;
  customerData: Array<any>;
  setPage: Function;
  page: number;
  totalElements: number;
  totalPages: number;
  search: boolean;
};

const CustomerOverviewTable = ({
  customerData,
  isLoading,
  setPage,
  page,
  search,
  totalPages,
  totalElements
}: CustomerOverviewTableProps) => {
  return (
    <Box
      sx={{
        position: { mobile: 'relative' },
        width: '100%'
      }}
    >
      {isLoading ? (
        <FormSkeleton noOfLoaders={3} />
      ) : (
        <MuiTableContainer
          columns={COLUMNS}
          tableConfig={{
            hasActions: true
          }}
          setPage={setPage}
          page={page}
          data={customerData}
          totalPages={totalPages}
          totalElements={totalElements}
          showHeader={{
            hideFilterSection: true,
            mainTitle: 'Customer Overview',
            secondaryTitle: 'See a directory of all customers on this system.'
          }}
        >
          {isLoading || search ? (
            customerData?.map((dataItem) => {
              return (
                <StyledTableRow key={dataItem.customerId}>
                  <StyledTableCell component="th" scope="row">
                    {dataItem.fullname}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {dataItem.customerId}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {dataItem.email}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {dataItem.phone1}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {dataItem.customerType === '1' && 'Individual'}
                    {dataItem.customerType === '2' && 'Corporate'}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {dataItem.accountCount || 'N/A'}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <CustomerActionMenuProps
                      customerId={dataItem.customerId || 'N/A'}
                      type={
                        dataItem.customerType === '1'
                          ? 'individual'
                          : 'corporate'
                      }
                    />
                  </StyledTableCell>
                </StyledTableRow>
              );
            })
          ) : (
            <StyledTableRow>
              <StyledTableCell
                colSpan={COLUMNS.length + 1}
                component="th"
                scope="row"
              >
                {renderEmptyTableBody(customerData)}
              </StyledTableCell>
            </StyledTableRow>
          )}
        </MuiTableContainer>
      )}
    </Box>
  );
};

const AccountOverviewTable = ({
  customerData,
  isLoading,
  setPage,
  page,
  search,
  totalPages,
  totalElements
}: CustomerOverviewTableProps) => {
  return (
    <Box
      sx={{
        position: { mobile: 'relative' },
        width: '100%'
      }}
    >
      {isLoading ? (
        <FormSkeleton noOfLoaders={3} />
      ) : (
        <MuiTableContainer
          columns={CUSTOMER_ACCOUNT_COLUMNS}
          tableConfig={{
            hasActions: true
          }}
          setPage={setPage}
          page={page}
          data={customerData}
          totalPages={totalPages}
          totalElements={totalElements}
          showHeader={{
            mainTitle: 'Account Overview',
            secondaryTitle: 'See a directory of all accounts on this system.',
            hideFilterSection: true
          }}
        >
          {search ? (
            customerData?.map((dataItem: SearchCustomerAccountResponse) => {
              return (
                <StyledTableRow key={dataItem.accountnumber}>
                  <StyledTableCell component="th" scope="row">
                    {dataItem?.accountnumber || 'N/A'}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {dataItem?.accounttitle || 'N/A'}
                  </StyledTableCell>
                  <StyledTableCell align="right">N/A</StyledTableCell>
                  <StyledTableCell align="right">
                    {formatCurrency(dataItem.bkbalance || 'N/A')}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {dataItem?.productName || 'N/A'}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Status
                      label={dataItem?.status === 1 ? 'Active' : 'Dormant'}
                      status={dataItem?.status === 1 ? 'success' : 'warning'}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <CustomerAccountActionMenuProps
                      productType={dataItem?.productName || 'N/A'}
                      customerId={dataItem?.customerid || 'N/A'}
                      status={dataItem?.status}
                      accountNumber={dataItem?.accountnumber || 'N/A'}
                      branchCode={dataItem?.branchcode || 'N/A'}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              );
            })
          ) : (
            <StyledTableRow>
              <StyledTableCell
                colSpan={COLUMNS.length + 1}
                component="th"
                scope="row"
              >
                {renderEmptyTableBody(customerData)}
              </StyledTableCell>
            </StyledTableRow>
          )}
        </MuiTableContainer>
      )}
    </Box>
  );
};

const tabTitle = ['Customer Overview', 'Account Overview'];

interface IHasUserSearchedProps {
  customer: boolean;
  account: boolean;
}

const PreviewTable = () => {
  const {isLoading} = useGlobalLoadingState()
  const [accountSearchParams, setAccountSearchParams] =
    useState<ISearchParams | null>(null);
  const [hasUserSearched, setHasUserSearched] = useState<IHasUserSearchedProps>(
    { customer: false, account: false }
  );

  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<ISearchParams>('customer-overview');

  const {
    searchParams: searchParamsAccount,
    setSearchParams: setSearchParamsAccount,
    searchActive: searchActiveAccount,
    setSearchActive: setSearchActiveAccount,
    page: pageAccount,
    setPage: setPageAccount
  } = usePersistedSearch<ISearchParams>('account-overview');
  const {
    totalPages,
    totalElements,
    data: customerData,
    isLoading: isCustomerDataLoading,
  } = useFilterCustomerSearch({ ...searchParams, page });

  const {
    totalPages: totalAccountPages,
    totalElements: totalAccountElements,
    data: customerAccountData,
    isLoading: isCustomerAccountDataLoading
  } = useFilterCustomerAccountSearch({
    ...searchParamsAccount,
    page: pageAccount
  });

  const pageMenu = [
    <CustomerOverviewTable
      search={searchActive}
      setPage={setPage}
      page={page}
      totalPages={totalPages}
      totalElements={totalElements}
      customerData={customerData}
      isLoading={isCustomerDataLoading || isLoading}

    />,
    <AccountOverviewTable
      search={searchActiveAccount}
      setPage={setPageAccount}
      page={pageAccount}
      totalPages={totalAccountPages}
      totalElements={totalAccountElements}
      customerData={customerAccountData}
      isLoading={isCustomerAccountDataLoading || isLoading}
    />
  ];
  const productClassBYID = '0';
  const [value, setValue] = useState(0);
  const { branches } = useGetBranches();
  const { status } = useGetStatus();
  const { productTypes } = useGetProductType();
  const { data } = useGetProductClassByCastegory(productClassBYID);
  const customerSection = 0;
  const accountSection = 1;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSearch = async (params: ISearchParams | null, name: string) => {
    setHasUserSearched((prev) => ({
      ...prev,
      [name]: true
    }));

    if (name === 'account') {
      setSearchParamsAccount(params);
      setSearchActiveAccount(true);
      return;
    }
    setSearchParams(params);
    setSearchActive(true);
  };

  return (
    <>
      {value === customerSection && (
        <Box>
          {branches && (
            <CustomerFilterSection
              branches={branches}
              onSearch={(params: ISearchParams) =>
                handleSearch(params, 'customer')
              }
            />
          )}
        </Box>
      )}
      {value === accountSection && (
        <Box>
          {branches !== undefined &&
            status !== undefined &&
            data !== undefined &&
            productTypes !== undefined && (
              <AccountFilterSection
                branches={branches}
                status={status}
                productTypes={productTypes}
                data={data}
                onSearch={(params: ISearchParams) =>
                  handleSearch(params, 'account')
                }
              />
            )}
        </Box>
      )}
      <TabsV2
        tabTitle={tabTitle}
        pageMenu={pageMenu}
        handleChange={handleChange}
        values={value}
        customStyle={{ ...tabStyle }}
        storageKey="customerServiceTabs"
      />
    </>
  );
};

const CreateCustomerModalType = ({
  handleClose
}: {
  handleClose: () => void;
}) => {
  const [selectedType, setSelectedType] = React.useState<string>('individual');
  const customerTypes = [
    {
      key: 'individual',
      title: 'Individual Customer',
      description: 'This is a type of customer for a single user',
      disabled: false
    },
    {
      key: 'corporate',
      title: 'Corporate Customer',
      description: 'This is a type of customer for organisations',
      disabled: false
    },
    {
      key: 'dependent',
      title: 'Dependent Customer',
      description: 'Dependent user who is yet of legal age',
      disabled: true
    }
  ];

  return (
    <div className="bg-white rounded-lg" style={{ minWidth: 700 }}>
      <Box sx={{ padding: '20px' }}>
        <Box mb={2}>
          <h2 style={{ fontWeight: 600, fontSize: 22 }}>Create Customer</h2>
        </Box>
        <Box mb={2}>
          <span style={{ fontSize: 16 }}>
            Select your customer type to proceed
          </span>
        </Box>
        <Box display="flex" gap={2} mb={3}>
          {customerTypes.map((type) => (
            <Box
              key={type.key}
              onClick={
                type.disabled ? undefined : () => setSelectedType(type.key)
              }
              sx={{
                flex: 1,
                border: '1px solid',
                borderColor:
                  selectedType === type.key
                    ? `${colors.primaryBlue400}`
                    : `${colors.neutral400}`,
                borderRadius: 2,
                background: (() => {
                  if (type.disabled) return `${colors.disabledColor}`;
                  if (selectedType === type.key) return `${colors.lightGrey}`;
                  return `${colors.white}`;
                })(),
                cursor: type.disabled ? 'not-allowed' : 'pointer',
                p: 2,
                boxShadow:
                  selectedType === type.key && !type.disabled
                    ? `0 0 0 1px ${colors.activeBlue200}`
                    : 'none',
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                minWidth: 180,
                opacity: type.disabled ? 0.6 : 1
              }}
            >
              <input
                type="radio"
                checked={selectedType === type.key}
                onChange={() => !type.disabled && setSelectedType(type.key)}
                disabled={type.disabled}
                style={{
                  marginBottom: 8,
                  accentColor: colors.primaryBlue400,
                  outline: 'none',
                  boxShadow: 'none',
                  border: '1px solid transparent',
                  WebkitAppearance: 'radio'
                }}
              />
              <span style={{ fontWeight: 500, fontSize: 16 }}>
                {type.title}
              </span>
              <span style={{ fontSize: 13, color: '#666', marginTop: 4 }}>
                {type.description}
              </span>
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: `${colors.neutral200}`,
          padding: '16px'
        }}
        display="flex"
        justifyContent="flex-end"
        gap={2}
      >
        <ActionButton
          customStyle={{
            color: `${colors.neutral1000}`,
            backgroundColor: `${colors.white}`,
            border: `1px solid ${colors.white}`
          }}
          onClick={handleClose}
          buttonTitle="Cancel"
        />
        <Link
          href={`/customer-service/customer/create-customer?type=${selectedType}`}
          passHref
        >
          <PrimaryIconButton buttonTitle="Confirm" />
        </Link>
      </Box>
    </div>
  );
};

export const CustomerContainer = () => {
  const [shouldDisableCreation, setShouldDisableCreation] = React.useState({
    customer: false,
    account: false
  });
  const [openModal, setopenModal] = React.useState(Boolean);

  React.useEffect(() => {
    const shouldDisableCustomerCreation = !checkMultipleUserRoleAccess(
      'Customer',
      'CUSTOMER CREATION'
    );
    const shouldDisableAccountCreation = !checkMultipleUserRoleAccess(
      'Customer',
      'ACCOUNT CREATION'
    );

    setShouldDisableCreation((prev) => ({
      ...prev,
      customer: shouldDisableCustomerCreation,
      account: shouldDisableAccountCreation
    }));
  }, []);

  const handleClose = () => {
    setopenModal(false);
  };

  const actionButtons: any = [
    <Box ml={{ mobile: 2, desktop: 0 }}>
      <Link
        style={{
          pointerEvents: shouldDisableCreation.account ? 'none' : 'auto'
        }}
        aria-disabled={shouldDisableCreation.account}
        tabIndex={shouldDisableCreation.account ? -1 : undefined}
        href="/customer-service/customer/create-account"
      >
        <ActionButton
          disabled={shouldDisableCreation.account}
          customStyle={{ ...cancelButton }}
          buttonTitle="Create Account"
        />
      </Link>
    </Box>,
    <Box ml={{ mobile: 2, desktop: 0 }}>
      <PrimaryIconButton
        onClick={() => setopenModal(true)}
        disabled={shouldDisableCreation.customer}
        buttonTitle="Create Customer"
        customStyle={{ ...submitButton }}
      />
    </Box>
  ];

  return (
    <>
      <TopActionsArea actionButtons={actionButtons} />
      <Box sx={{ padding: '20px' }}>
        <PreviewTable />
        {openModal && (
          <ModalContainerV2
            form={<CreateCustomerModalType handleClose={handleClose} />}
          />
        )}
      </Box>
    </>
  );
};
