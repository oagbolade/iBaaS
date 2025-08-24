import React from 'react';
import { Box } from '@mui/material';
import moment from 'moment';
import { Tabs } from '@/components/Revamp/Tabs';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';
import { IProductDetails } from '@/schemas/schema-values/loan';

import {
  Details,
  SubTitle
} from '@/components/Revamp/Shared/LoanDetails/LoanDetails';

import { Status } from '@/components/Labels';

export const PreviewContentOne: React.FC<{ profileDetail: any }> = ({
  profileDetail
}) => {
  return (
    <Box
      mb={{ mobile: 30, tablet: 0 }}
      sx={{
        padding: { mobile: 6, tablet: 0 },
        alignItems: { mobile: 'center', tablet: 'normal' }
      }}
    >
      <SubTitle title="ACCOUNT NAME" />
      <Details title={profileDetail?.accounttitle || 'N/A'} />

      <SubTitle title="ACCOUNT NUMBER" />
      <Details title={profileDetail?.accountnumber || 'N/A'} />

      <SubTitle title="PRODUCT NAME" />
      <Details title={profileDetail?.prodname || 'N/A'} />

      <SubTitle title="BRANCH" />
      <Details title={profileDetail?.branchName || 'N/A'} />

      <SubTitle title="BOOK BALANCE" />
      <Details title={profileDetail?.bkbalance || 'N/A'} />

      <SubTitle title="EFFECTIVE BALANCE" />
      <Details title={profileDetail?.effbal || 'N/A'} />

      <SubTitle title="USABLE BALANCE" />
      <Details title={profileDetail?.usebal || 'N/A'} />

      <SubTitle title="SOURCE TYPE" />
      <Details title={profileDetail?.source || 'N/A'} />

      <Box mb={{ mobile: 5, tablet: 0 }}>
        <SubTitle title="ACCOUNT STATUS" />
        <Status label="Active" status="success" />
      </Box>
    </Box>
  );
};

export const PreviewContentTwo: React.FC<{
  productDetail: IProductDetails;
}> = ({ productDetail }) => {
  return (
    <Box
      mb={{ mobile: 30, tablet: 0 }}
      sx={{
        padding: { mobile: 6, tablet: 0 },
        alignItems: { mobile: 'center', tablet: 'normal' }
      }}
    >
      <SubTitle title="Product Name" />
      <Details title={productDetail?.productName || 'N/A'} />

      <SubTitle title="Product Start Date " />
      <Details
        title={
          productDetail?.productstart
            ? moment(productDetail?.productstart).format(
                'MMMM Do YYYY, h:mm:ss a'
              )
            : 'N/A'
        }
      />

      <SubTitle title="Product Expire Date " />
      <Details
        title={
          productDetail?.productExpire
            ? moment(productDetail?.productExpire).format(
                'MMMM Do YYYY, h:mm:ss a'
              )
            : 'N/A'
        }
      />

      <SubTitle title="Product Currency " />
      <Details title={productDetail?.currencycode || 'N/A'} />

      <SubTitle title="Minimum Loan Amount" />
      <Details
        title={`NGN ${formatCurrency(productDetail?.minloan || 0) || 'N/A'}`}
      />

      <SubTitle title="Maximum Loan Amount" />
      <Details
        title={`NGN ${formatCurrency(productDetail?.maxloan || 0) || 'N/A'}`}
      />

      <SubTitle title="Minimum Intrest Rate" />
      <Details title={productDetail?.minintrate || 0 || 'N/A'} />

      <SubTitle title="Maximum Intrest Rate" />
      <Details title={productDetail?.maxintrate || 0 || 'N/A'} />

      <SubTitle title="Calculation Method" />
      <Details title={productDetail?.actualRateCalcMethod || 'N/A'} />

      <SubTitle title="Default Repayment Type" />
      <Details title={productDetail?.repayoption || 'N/A'} />

      <SubTitle title="Collateral Value" />
      <Details title={productDetail?.collval || 'N/A'} />
    </Box>
  );
};

export const PreviewContent: React.FC<{
  loanProduct: IProductDetails;
  profileDetail: any;
}> = ({ loanProduct, profileDetail }) => {
  const tabTitle = ['Account  Information', 'Product  Information'];
  const pageMenu = [
    <PreviewContentOne profileDetail={profileDetail} />,
    <PreviewContentTwo productDetail={loanProduct} />
  ];

  return (
    <Box>
      <Tabs tabTitle={tabTitle} pageMenu={pageMenu} />
    </Box>
  );
};

interface LoanPreviewContentProps {
  loanDetails: {
    settlementAcct?: string;
    fullName?: string;
    productName?: string;
    branchName?: string;
    loanAmount?: number;
    currentbalance?: number;
    loanTerm?: number;
    intRate?: number;
    repaymentType?: string;
    calculationName?: string;
    startdate?: string;
    matdate?: string;
    status?: string;
  };
}

const LoanPreviewContent: React.FC<LoanPreviewContentProps> = ({
  loanDetails
}) => {
  return (
    <Box
      mt={{ mobile: 0, desktop: 3 }}
      sx={{
        padding: { mobile: '0 30px', tablet: 0 },
        alignItems: { mobile: 'center', tablet: 'normal' }
      }}
    >
      <SubTitle title="Settlement Account" />
      <Details title={loanDetails?.settlementAcct || 'N/A'} />

      <SubTitle title="Settlement Account Name" />
      <Details title={loanDetails?.fullName || 'N/A'} />

      <SubTitle title="Loan Product" />
      <Details title={loanDetails?.productName || 'N/A'} />

      <SubTitle title="Branch" />
      <Details title={loanDetails?.branchName || 'N/A'} />

      <SubTitle title="Loan Amount" />
      <Details
        title={`NGN ${formatCurrency(loanDetails?.loanAmount || 0) || 'N/A'}`}
      />

      <SubTitle title="Current Customer Balance" />
      <Details title={`NGN ${loanDetails?.currentbalance || 'N/A'}`} />

      <SubTitle title="Loan Term" />
      <Details title={loanDetails?.loanTerm?.toString() || 'N/A'} />

      <SubTitle title="Loan Rate" />
      <Details title={loanDetails?.intRate?.toString() || 'N/A'} />

      <SubTitle title="Repayment Type" />
      <Details title={loanDetails?.repaymentType?.toString() || 'N/A'} />

      <SubTitle title="Calculation Method" />
      <Details title={loanDetails?.calculationName?.toString() || 'N/A'} />

      <SubTitle title=" Start Date" />
      <Details
        title={
          loanDetails?.startdate
            ? moment(loanDetails.startdate).format('MMMM Do YYYY, h:mm:ss a')
            : 'N/A'
        }
      />

      <SubTitle title="Maturity" />
      <Details
        title={
          loanDetails?.matdate
            ? moment(loanDetails.matdate).format('MMMM Do YYYY, h:mm:ss a')
            : 'N/A'
        }
      />

      <Box mb={{ mobile: 5, tablet: 0 }}>
        <SubTitle title="Loan Status" />
         <Status label={loanDetails?.status as string} status="" />
      </Box>
    </Box>
  );
};

export const PreviewContentLoanDetailProductDetails: React.FC<{
  loanProduct: IProductDetails;
  loanDetails: any;
}> = ({ loanProduct, loanDetails }) => {
  const tabTitle = ['Account  Information', 'Product  Information'];
  const pageMenu = [
    <LoanPreviewContent loanDetails={loanDetails} />,
    <PreviewContentTwo productDetail={loanProduct} />
  ];

  return (
    <Box>
      <Tabs tabTitle={tabTitle} pageMenu={pageMenu} />
    </Box>
  );
};
