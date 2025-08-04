'use client';
import React from 'react';
import { Box } from '@mui/material';
import { DirectorsInfoSection } from './DirectorsInfoSection';
import {
  PostingContainer,
  previewContentStyle
} from '@/features/Operation/Forms/style';
import { CustomStyleI, PreviewDirectorInfoProps } from '@/constants/types';
import { useCurrentBreakpoint } from '@/utils';
import { PrimaryIconButton } from '@/components/Buttons';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { MobileModalContainer } from '@/components/Revamp/Modal/mobile/ModalContainer';
import { Tabs } from '@/components/Revamp/Tabs';
import {
  Details,
  SubTitle
} from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { FormSkeleton } from '@/components/Loaders';
import { formatDateOfBirth } from '@/utils/formatDateOfBirth';
import { IDirectorDetails } from '@/api/ResponseTypes/customer-service';
import { NoDataAvailable } from '@/components/Alert/Warning/NoDataAvailable';

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

export const ListofDirectorsPreview = ({
  directorDetails
}: PreviewDirectorInfoProps) => {
  const deleteDirector = () => {};

  return (
    <Box>
      {(!directorDetails || directorDetails.length === 0) && (
        <Box mb={3} sx={{ width: '200px', height: '200px' }}>
          <NoDataAvailable
            message="No data available, please select a customer with a director"
            width={200}
            height={200}
          />
        </Box>
      )}
      {Array.isArray(directorDetails) &&
        directorDetails.map((directorDetail: IDirectorDetails) => (
          <DirectorsInfoSection
            directorDetail={directorDetail}
            deleteDirector={deleteDirector}
          />
        ))}
    </Box>
  );
};

export const CustomerInfomationPreview = ({
  customerResult,
  customerId
}: PreviewDirectorInfoProps) => {
  return (
    <Box
      mb={{ mobile: 30, tablet: 0 }}
      sx={{
        padding: { mobile: 6, tablet: 0 },
        alignItems: { mobile: 'center', tablet: 'normal' }
      }}
    >
      <SubTitle title="Customer ID" />
      <Details title={customerId || 'N/A'} />

      <SubTitle title="Title" />
      <Details title={customerResult?.title || 'N/A'} />

      <SubTitle title="Full Name" />
      <Details title={customerResult?.fullName || 'N/A'} />

      <SubTitle title="Date of Birth" />
      <Details title={formatDateOfBirth(customerResult?.dob)} />

      <SubTitle title="Gender" />
      <Details title={customerResult?.gender || 'N/A'} />

      <SubTitle title="Nationality" />
      <Details title={customerResult?.nationality || 'N/A'} />

      <SubTitle title="State of Origin" />
      <Details title={customerResult?.statecode || 'N/A'} />

      <SubTitle title="LGA/TOWN of Origin" />
      <Details title={customerResult?.residentTowncode || 'N/A'} />

      <SubTitle title="Address" />
      <Details title={customerResult?.address || 'N/A'} />

      <SubTitle title="Phone Number" />
      <Details title={customerResult?.phone1 || 'N/A'} />
    </Box>
  );
};

const tabTitle = ['Customer Information', 'List of All Directors'];

const PreviewContent = ({
  customerResult,
  directorDetails,
  customerId
}: PreviewDirectorInfoProps) => {
  const pageMenu = [
    <CustomerInfomationPreview
      customerId={customerId}
      customerResult={customerResult}
    />,
    <ListofDirectorsPreview directorDetails={directorDetails} />
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs tabTitle={tabTitle} pageMenu={pageMenu} />
    </Box>
  );
};

export const PreviewDirectorInformation = ({
  loading,
  customerId,
  customerResult,
  directorDetails
}: PreviewDirectorInfoProps) => {
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
              customerId={customerId}
              customerResult={customerResult}
              directorDetails={directorDetails}
            />
          }
        />
      ) : (
        <PreviewContent
          customerId={customerId}
          customerResult={customerResult}
          directorDetails={directorDetails}
        />
      )}
    </Box>
  );
};
