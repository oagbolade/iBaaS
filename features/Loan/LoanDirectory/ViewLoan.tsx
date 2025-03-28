'use client';
import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Box } from '@mui/material';
import { sanitize } from 'dompurify';
import { TopActionsArea, LoanDetails } from '@/components/Revamp/Shared';
import { ActionButtonWithPopper } from '@/components/Revamp/Buttons';
import { ChevronDown } from '@/assets/svg';
import colors from '@/assets/colors';
import { FormSkeleton } from '@/components/Loaders';
import { encryptData } from '@/utils/encryptData';
import {
  useGetLoanAccountDetails,
  useGetLoansProductDetailCode
} from '@/api/loans/useCreditFacility';
import { useGetAccountDetails } from '@/api/customer-service/useCustomer';
import {
  IProductDetails,
  ICustomerDetails
} from '@/schemas/schema-values/loan';
import { ILoanAccountDetails } from '@/api/ResponseTypes/loans';

type Props = {
  status: string;
  accountNumber: string;
  settlementAccount: string;
  productCode: string;
  customerId: string;
  action: string;
};

const actionButtons = ({
  accountNumber,
  action,
  status,
  customerId,
  settlementAccount,
  productCode
}: Props) => {
  const options: any =
    status === '4'
      ? [
          <Link
            href={`/loan/loan-directory/cancel-loan/?accountNumber=${sanitize(accountNumber)}&action=${sanitize(action)}&customerId=${sanitize(customerId)}`}
          >
            Cancel Loan
          </Link>,
          <Link
            href={`/loan/loan-directory/restructure-loan/?accountNumber=${sanitize(accountNumber as string)}&action=${sanitize(status)}&settlementAccount=${sanitize(settlementAccount)}&productCode=${sanitize(productCode)}`}
          >
            Loan Restructure
          </Link>,
          <Link
            href={`/loan/loan-directory/partial-pay/?accountNumber=${sanitize(accountNumber as string)}&action=${sanitize(status)}&settlementAccount=${sanitize(settlementAccount)}`}
          >
            Partial Pay
          </Link>,
          <Link
            href={`/loan/loan-directory/terminate-loan/?accountNumber=${sanitize(accountNumber as string)}&action=${sanitize(status)}&settlementAccount=${sanitize(settlementAccount)}`}
          >
            Terminate Loan
          </Link>
        ]
      : [];

  return (
    <ActionButtonWithPopper
      options={options}
      customStyle={{
        borderRadius: '6px',
        border: `1px solid ${colors.activeBlue400}`,
        backgroundColor: `${colors.white}`
      }}
      icon={
        <ChevronDown
          color={`${colors.primaryBlue400}`}
          props={{ width: '24px', height: '24px' }}
        />
      }
      iconPosition="end"
      buttonTitle="Actions"
    />
  );
};

export const ViewLoan = () => {
  const searchParams = useSearchParams();
  const accountNumber = searchParams.get('accountNumber') || '';
  const settlementAccount = searchParams.get('settlementAccount') || '';
  const action = searchParams.get('action') || '';
  const productCode = searchParams.get('productCode');

  const { loanAccDetails, isLoading: isLoanDetailsLoading } =
    useGetLoanAccountDetails(
      encryptData(accountNumber) || '',
      encryptData(action) || ''
    );
  const { accDetailsResults, isLoading: areAccoutDetailsLoading } =
    useGetAccountDetails(encryptData(settlementAccount || '') || '');

  const { loanProducts } = useGetLoansProductDetailCode(
    encryptData(productCode || '') || ''
  );

  if ((accountNumber && isLoanDetailsLoading) || areAccoutDetailsLoading) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={5} />
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          padding: { mobile: '0 5px', desktop: '0 25px' },
          width: '100%'
        }}
      >
        <TopActionsArea
          actionButtons={[
            actionButtons({
              accountNumber,
              action,
              status: loanAccDetails?.status || '',
              customerId: accDetailsResults?.customerid || '',
              settlementAccount,
              productCode: loanAccDetails?.productCode || ''
            })
          ]}
        />

        <Box pl={{ mobile: 2, desktop: 0 }}>
          {loanAccDetails && accDetailsResults && (
            <LoanDetails
              loanAccDetails={loanAccDetails as unknown as ILoanAccountDetails}
              customerDetails={accDetailsResults as unknown as ICustomerDetails}
              loanAccountNumber={accountNumber}
              loanProducts={loanProducts as unknown as IProductDetails}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};
