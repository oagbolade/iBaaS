'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import moment from 'moment';
import {
  ShortCardWithViewDetailsAccordion,
  IViewProductInfo
} from './ShortCardViewDetails';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { useGetCustomerById } from '@/api/customer-service/useCustomer';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { FormSkeleton } from '@/components/Loaders';
import { useGetAllProductByCode } from '@/api/setup/useProduct';

import { encryptData } from '@/utils/encryptData';
import { decryptData } from '@/utils/decryptData';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <PrimaryIconButton buttonTitle="Submit" customStyle={{ ...submitButton }} />
  </Box>
];

export const ViewDetailContainer = () => {
  const productId = useGetParams('productCode') || '';
  const { productInfos, isLoading } = useGetAllProductByCode(productId);
  if (isLoading) {
    return (
      <Box my={6}>
        <FormSkeleton noOfLoaders={5} />
      </Box>
    );
  }

  const PickCustomerType = (customerType: string): string => {
    if (customerType === '1') {
      return 'Individual';
    }

    if (customerType === '2') {
      return 'Corporate';
    }

    return 'N/A';
  };

  const PickGender = (gender: string): string => {
    if (gender === '1') {
      return 'Male';
    }

    if (gender === '2') {
      return '0';
    }

    return 'N/A';
  };

  const ViewCustomerDetailsMapper = {
    productDetails: [
      {
        title: 'Product Name',
        content: productInfos?.productName || 'N/A'
      },
      { title: 'Product Code', content: productInfos?.productCode || 'N/A' },
      { title: 'Product Class', content: productInfos?.producttype || 'N/A' },
      { title: 'Currency', content: productInfos?.currencycode || 'N/A' },
      { title: 'Start Date', content: productInfos?.productstart || 'N/A' },
      { title: 'End Date', content: productInfos?.productExpire || 'N/A' },
      {
        title: 'Minimum Balance',
        content: productInfos?.minBalance || 'N/A'
      },
      { title: 'Maximum Balance', content: productInfos?.openbalance || 'N/A' },
      { title: 'Product Type', content: productInfos?.tdType || 'N/A' },
      { title: 'Loan Frequency', content: productInfos?.penalrate || 'N/A' },
      { title: 'Short Name', content: productInfos?.productshort || 'N/A' }
    ],
    interestDetails: [
      {
        title: 'Interest Type',
        content: productInfos?.intRateCode || 'N/A'
      },
      { title: 'Actual Rate', content: productInfos?.actualIntRate || 'N/A' },
      {
        title: 'Minimum Term',
        content: productInfos?.minTerm || 'N/A'
      },
      { title: 'Maximum Term', content: productInfos?.maxTerm || 'N/A' },
      {
        title: 'Moratorium',
        content: productInfos?.moratorium || 'N/A'
      },
      {
        title: 'Loan Type',
        content: productInfos?.loantype || 'N/A'
      },
      {
        title: 'Collateral Value',
        content: productInfos?.crvariance || 'N/A'
      },
      {
        title: 'Interest',
        content: productInfos?.intCalcBasis || 'N/A'
      },
      {
        title: 'Product Charges',
        content: productInfos?.penalchargegl || 'N/A'
      },
      {
        title: 'Product Exception',
        content: productInfos?.maturedDepositGL || 'N/A'
      }
    ],
    generalDetails: [
      {
        title: 'GL Account',
        content: productInfos?.sundaryGL || 'N/A'
      },
      {
        title: 'Asset Balance',
        content: productInfos?.assetBalance || 'N/A'
      },
      {
        title: 'Interest Receivable',
        content: productInfos?.interestReceivable || 'N/A'
      },
      {
        title: 'Interest Income',
        content: productInfos?.interestIncome || 'N/A'
      },
      {
        title: 'Suspended Interest',
        content: productInfos?.suspendedInt || 'N/A'
      },
      {
        title: 'Liability Balances',
        content: productInfos?.liabilityBal || 'N/A'
      },
      {
        title: 'Interest Expense',
        content: productInfos?.interestExpense || 'N/A'
      },
      {
        title: 'Inter Branch GL',
        content: productInfos?.interbranch || 'N/A'
      },
      {
        title: 'Tax Account',
        content: productInfos?.proxyAccount || 'N/A'
      },
      {
        title: 'Closing GL Account',
        content: productInfos?.closebalance || 'N/A'
      }
    ],
    conditionsSetupDetails: [
      {
        title: 'Precedence Conditions',
        content: productInfos?.suspendedPrincipal || 'N/A'
      },
      {
        title: 'Subsequent Conditions',
        content: productInfos?.cumTranLimit || 'N/A'
      }
    ],
    otherDetails: [
      {
        title: 'Manage Collection Date',
        content: productInfos?.manageCollection || 'N/A'
      },
      {
        title: 'Health Insurance',
        content: productInfos?.healthInsurance || 'N/A'
      },
      {
        title: 'Security Deposit Required',
        content: productInfos?.loansecurityDeposit || 'N/A'
      }, // TODO: missing in reponse, report to infosight
      { title: 'Introducer ID', content: productInfos?.dailyTranLimit || 'N/A' }
    ]
  };

  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '50px'
      }}
    >
      <TopActionsArea />
      <Box
        sx={{
          padding: '25px',
          width: '100%'
        }}
      >
        <ShortCardWithViewDetailsAccordion
          cardTitle="Product Basic Details"
          productInfoDetails={
            ViewCustomerDetailsMapper.productDetails as IViewProductInfo[]
          }
        />
        <ShortCardWithViewDetailsAccordion
          cardTitle="Interest Charges and Exceptions"
          productInfoDetails={
            ViewCustomerDetailsMapper.interestDetails as IViewProductInfo[]
          }
        />
        <ShortCardWithViewDetailsAccordion
          cardTitle="General Legal"
          productInfoDetails={
            ViewCustomerDetailsMapper.generalDetails as IViewProductInfo[]
          }
        />
        <ShortCardWithViewDetailsAccordion
          cardTitle="Conditions SetUp"
          productInfoDetails={
            ViewCustomerDetailsMapper.conditionsSetupDetails as IViewProductInfo[]
          }
        />
        <ShortCardWithViewDetailsAccordion
          cardTitle="Other Details"
          productInfoDetails={
            ViewCustomerDetailsMapper.otherDetails as IViewProductInfo[]
          }
        />
      </Box>
    </Box>
  );
};
