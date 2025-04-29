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

export interface IOptions {
  buttonTitle: string;
  link?: string;
  onClick?: () => void;
}

const CustomerActionMenuProps = ({
  customerId
}: {
  customerId: string;
}): React.ReactElement => {
  return <TableActionMenu customerId={customerId} />;
};

const CustomerAccountActionMenuProps = ({
  customerId,
  accountNumber,
  status,
  productType
}: {
  customerId: string;
  accountNumber: string;
  productType: string;
  status: number;
}): React.ReactElement => {
  return (
    <CustomerAccountTableActionMenu
      productType={productType}
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
          {search ? (
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
                  <StyledTableCell align="right">N/A</StyledTableCell>
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
  const [page, setPage] = React.useState(1);
  const [accountSearchpage, setAccountSearchPage] = React.useState(1);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [accountSearchParams, setAccountSearchParams] =
    useState<ISearchParams | null>(null);
  const [hasUserSearched, setHasUserSearched] = useState<IHasUserSearchedProps>(
    { customer: false, account: false }
  );
  const {
    totalPages,
    totalElements,
    data: customerData,
    isLoading: isCustomerDataLoading,
    isFetching
  } = useFilterCustomerSearch({ ...searchParams, page });

  const {
    totalPages: totalAccountPages,
    totalElements: totalAccountElements,
    data: customerAccountData,
    isLoading: isCustomerAccountDataLoading
  } = useFilterCustomerAccountSearch({
    ...accountSearchParams,
    page: accountSearchpage
  });

  const pageMenu = [
    <CustomerOverviewTable
      search={hasUserSearched.customer}
      setPage={setPage}
      page={page}
      totalPages={totalPages}
      totalElements={totalElements}
      customerData={customerData}
      isLoading={isCustomerDataLoading || isFetching}
    />,
    <AccountOverviewTable
      search={hasUserSearched.account}
      setPage={setAccountSearchPage}
      page={accountSearchpage}
      totalPages={totalAccountPages}
      totalElements={totalAccountElements}
      customerData={customerAccountData}
      isLoading={isCustomerAccountDataLoading}
    />
  ];

  const [value, setValue] = useState(0);
  const { branches } = useGetBranches();
  const { status } = useGetStatus();
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
      setAccountSearchParams(params);
      return;
    }
    setSearchParams(params);
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
          {branches !== undefined && status !== undefined && (
            <AccountFilterSection
              branches={branches}
              status={status}
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

export const CustomerContainer = () => {
  const [shouldDisableCreation, setShouldDisableCreation] = React.useState({
    customer: false,
    account: false
  });

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
      <Link
        style={{
          pointerEvents: shouldDisableCreation.customer ? 'none' : 'auto'
        }}
        aria-disabled={shouldDisableCreation.customer}
        tabIndex={shouldDisableCreation.customer ? -1 : undefined}
        href="/customer-service/customer/create-customer"
      >
        <PrimaryIconButton
          disabled={shouldDisableCreation.customer}
          buttonTitle="Create Customer"
          customStyle={{ ...submitButton }}
        />
      </Link>
    </Box>
  ];

  return (
    <>
      <TopActionsArea actionButtons={actionButtons} />
      <Box sx={{ padding: '20px' }}>
        <PreviewTable />
      </Box>
    </>
  );
};
