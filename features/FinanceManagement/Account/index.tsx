'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import moment from 'moment';
import Link from 'next/link';
import { FilterSection } from './FilterSection';
import { TableActionMenu } from './TableActionMenu';
import { FINANCE_ACCOUNT_COLUMNS } from './COLUMNS';
import { Status } from '@/components/Labels';
import { AdminContainer } from '@/features/Administrator/AdminContainer';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  MuiTableContainer,
  renderEmptyTableBody,
  StyledTableRow
} from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { useGetBranches } from '@/api/general/useBranches';
import { ISearchParams } from '@/app/api/search/route';
import { useFilterCustomerAccountSearch } from '@/api/customer-service/useCustomer';
import { FormSkeleton } from '@/components/Loaders';

const actionButtons: any = [
  <Box ml={{ mobile: 12, desktop: 0 }}>
    <Link href="/customer-service/customer/create-account/?urlState='financeMgt">
      <PrimaryIconButton
        buttonTitle="Create Account"
        customStyle={{
          ...submitButton,
          width: { mobile: '116px', desktop: '236px' },
          height: '40px'
        }}
      />
    </Link>
  </Box>
];

export const Account = () => {
  const [search, setSearch] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [page, setPage] = React.useState(1);
  const { branches } = useGetBranches();

  const currentUrl = 'financeMgt';

  const handleSearch = async (params: ISearchParams | null) => {
    setSearchParams(params);
    setSearch(true);
  };

  const ActionMenuProps = ({
    customerId,
    accountNumber,
    status,
    productType
  }: {
    customerId: string;
    status: number;
    productType: string;
    accountNumber: string;
  }): React.ReactElement => {
    return (
      <TableActionMenu
        productType={productType}
        customerId={customerId}
        accountNumber={accountNumber}
        status={status}
        urlState={currentUrl}
      />
    );
  };

  const {
    totalPages,
    totalElements,
    data: financeAccountData,
    isLoading: isFinanceAccountDataLoading
  } = useFilterCustomerAccountSearch({
    ...searchParams,
    page
  });

  return (
    <>
      <TopActionsArea
        customStyle={{ width: '100%' }}
        actionButtons={actionButtons}
      />
      <AdminContainer>
        {branches && (
          <FilterSection branches={branches} onSearch={handleSearch} />
        )}
        <Box
          sx={{
            position: { mobile: 'relative' },
            bottom: '25px',
            width: '100%'
          }}
        >
          {isFinanceAccountDataLoading ? (
            <FormSkeleton noOfLoaders={3} />
          ) : (
            <div style={{ marginTop: '24px' }} className="">
              <MuiTableContainer
                columns={FINANCE_ACCOUNT_COLUMNS}
                tableConfig={{
                  hasActions: true
                }}
                data={financeAccountData}
                totalPages={totalPages}
                totalElements={totalElements}
                setPage={setPage}
                page={page}
                showHeader={{
                  mainTitle: 'Account Overview',
                  secondaryTitle:
                    'See a directory of all accounts on this system.',
                  hideFilterSection: true
                }}
              >
                {search ? (
                  financeAccountData?.map((dataItem: any) => {
                    return (
                      <StyledTableRow key={dataItem?.userid}>
                        <StyledTableCell component="th" scope="row">
                          {dataItem?.accountnumber}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {dataItem?.accounttitle}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {dataItem?.dateOpened
                            ? moment(dataItem?.dateOpened).format(
                              'MMMM Do YYYY, h:mm:ss a'
                            )
                            : 'N/A'}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {dataItem?.dateOpened
                            ? moment(dataItem.dateOpened).format(
                              'MMMM Do YYYY, h:mm:ss a'
                            )
                            : 'N/A'}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {dataItem?.accountdesc}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {dataItem?.productName}
                        </StyledTableCell>

                        <StyledTableCell component="th" scope="row">
                          <Status
                            label={dataItem?.status ? 'Active' : 'Inactive'}
                            status={dataItem?.status ? 'success' : 'warning'}
                          />{' '}
                        </StyledTableCell>

                        <StyledTableCell component="th" scope="row">
                          <ActionMenuProps
                            productType={dataItem?.productName || 'N/A'}
                            customerId={dataItem.customerid || 'N/A'}
                            accountNumber={dataItem.accountnumber || 'N/A'}
                            status={dataItem.status || 'N/A'}
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })
                ) : (
                  <StyledTableRow>
                    <StyledTableCell
                      colSpan={FINANCE_ACCOUNT_COLUMNS.length + 1}
                      component="th"
                      scope="row"
                    >
                      {renderEmptyTableBody(financeAccountData)}
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </MuiTableContainer>
            </div>
          )}
        </Box>
        <Box />
      </AdminContainer>
    </>
  );
};
