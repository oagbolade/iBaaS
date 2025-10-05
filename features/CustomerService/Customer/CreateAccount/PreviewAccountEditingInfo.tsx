'use client';
import React from 'react';
import { Box } from '@mui/material';
import {
  PostingContainer,
  previewContentStyle
} from '@/features/Operation/Forms/style';
import {
  CustomStyleI,
  PreviewAccountEditingInfoProps
} from '@/constants/types';
import { useCurrentBreakpoint } from '@/utils';
import { PrimaryIconButton } from '@/components/Buttons';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { MobileModalContainer } from '@/components/Revamp/Modal/mobile/ModalContainer';
import { Tabs } from '@/components/Revamp/Tabs';
import {
  Details,
  SubTitle
} from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { Status } from '@/components/Labels';
import { FormSkeleton } from '@/components/Loaders';

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <PrimaryIconButton
      buttonTitle="Save Changes"
      customStyle={{ ...submitButton }}
    />
  </Box>
];

type Props = {
  PreviewContent: any;
  customStyle?: CustomStyleI;
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

export const AccountInformationPreview = ({
  accDetailsResults
}: PreviewAccountEditingInfoProps) => {
  return (
    <Box
      mb={{ mobile: 30, tablet: 0 }}
      sx={{
        padding: { mobile: 6, tablet: 0 },
        alignItems: { mobile: 'center', tablet: 'normal' }
      }}
    >
      <SubTitle title="Account Name" />
      <Details title={accDetailsResults?.accounttitle || 'N/A'} />

      <SubTitle title="Product Name" />
      <Details title={accDetailsResults?.prodname || 'N/A'} />

      <SubTitle title="Branch" />
      <Details title={accDetailsResults?.branch || 'N/A'} />

      <SubTitle title="Book Balance" />
      <Details title={`NGN ${accDetailsResults?.bkbal || 'N/A'}`} />

      <SubTitle title="Effective Balance" />
      <Details title={`NGN ${accDetailsResults?.effbal || 'N/A'}`} />

      <SubTitle title="Usable Balance" />
      <Details title={`NGN ${accDetailsResults?.usebal || 'N/A'}`} />

      <SubTitle title="Source Type" />
      <Details title={accDetailsResults?.acctty || 'N/A'} />

      <SubTitle title="Source" />
      <Details title={accDetailsResults?.source || 'N/A'} />

      <Box mb={{ mobile: 5, tablet: 0 }}>
        <SubTitle title="Account Status" />
        <Status
          label={accDetailsResults?.acctstatus ? 'Active' : 'Dormant'}
          status={accDetailsResults?.acctstatus ? 'success' : 'warning'}
        />
      </Box>
    </Box>
  );
};

export const ProductInformationPreview = ({
  productInfos
}: PreviewAccountEditingInfoProps) => {
  return (
    <Box
      mb={{ mobile: 30, tablet: 0 }}
      sx={{
        padding: { mobile: 6, tablet: 0 },
        alignItems: { mobile: 'center', tablet: 'normal' }
      }}
    >
      <SubTitle title="Product Name" />
      <Details title={productInfos?.productname || 'N/A'} />

      <SubTitle title="Product Start Date" />
      <Details title={productInfos?.productstart || 'N/A'} />

      <SubTitle title="Product Expiry Date" />
      <Details title={productInfos?.productexpire || 'N/A'} />

      <SubTitle title="Opening Balance" />
      <Details title={productInfos?.openbalance || 'N/A'} />

      <SubTitle title="Product Currency" />
      <Details title={productInfos?.currencymne || 'N/A'} />

      <SubTitle title="Minimum Account Balance " />
      <Details title={productInfos?.minbalance || 'N/A'} />

      <SubTitle title="Product Type" />
      <Details title={productInfos?.producttype || 'N/A'} />

      <SubTitle title="Closing Balance" />
      <Details title={productInfos?.closecharge || 'N/A'} />

      <SubTitle title="Credit Interest" />
      <Details title={productInfos?.crrate || 'N/A'} />

      <SubTitle title="Debit Interest" />
      <Details title={productInfos?.drrate || 'N/A'} />

      <SubTitle title="Minimum Interest" />
      <Details title={productInfos?.mininterest || 'N/A'} />
    </Box>
  );
};

const tabTitle = ['Account Information', 'Product  Information'];

const PreviewContent = ({
  accDetailsResults,
  productInfos
}: PreviewAccountEditingInfoProps) => {
  const pageMenu = [
    <AccountInformationPreview accDetailsResults={accDetailsResults} />,
    <ProductInformationPreview productInfos={productInfos} />
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs tabTitle={tabTitle} pageMenu={pageMenu} />
    </Box>
  );
};

export const PreviewAccountEditingInfo = ({
  loading,
  accDetailsResults,
  productInfos
}: PreviewAccountEditingInfoProps) => {
  const { isMobile } = useCurrentBreakpoint();

  if (loading) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={5} />
      </Box>
    );
  }

  return (
    <Box sx={PostingContainer}>
      {isMobile ? (
        <MobilePreviewContent
          PreviewContent={
            <PreviewContent
              productInfos={productInfos}
              accDetailsResults={accDetailsResults}
            />
          }
        />
      ) : (
        <PreviewContent
          productInfos={productInfos}
          accDetailsResults={accDetailsResults}
        />
      )}
    </Box>
  );
};
