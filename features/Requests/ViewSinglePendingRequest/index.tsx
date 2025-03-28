'use client';

import { Box } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useContext, useState } from 'react';
import {
  loanHeading,
  pendingRequestApproveButton,
  pendingRequestBackButtonContainerStyle,
  pendingRequestButtonContainer,
  pendingRequestDeclineButton
} from '../styles';
import { RejectPendingRequestModal } from '../RejectPendingRequestModal';
import { RequestDetailsContainer } from '../RequestDetailsContainer/RequestDetailsContainer';
import { useGetAccountDetails } from '@/api/customer-service/useCustomer';
import {
  useGetLoanAccountDetails,
  useGetLoansProductDetailCode
} from '@/api/loans/useCreditFacility';
import { FormSkeleton } from '@/components/Loaders';
import { LoanDetails } from '@/components/Revamp/Shared';
import {
  ICustomerDetails,
  IProductDetails
} from '@/schemas/schema-values/loan';
import { ILoanAccountDetails } from '@/api/ResponseTypes/loans';

import { RequestModuleContext } from '@/context/RequestModuleContext';
import { BackButton } from '@/components/Revamp/Buttons';
import {
  Details,
  SubTitle
} from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { Status } from '@/components/Labels';
import { formatDateAndTime } from '@/utils/hooks/useDateFormat';
import { PrimaryIconButton } from '@/components/Buttons';
import { useApprovePendingRequest } from '@/api/loans/useApprovePendingRequest';
import { approvePendingRequestFormValues } from '@/schemas/schema-values/requests';
import { encryptData } from '@/utils/encryptData';
import { useViewAuthDetailsGeneral } from '@/api/loans/useViewAuthDetailsGeneral';
import { formatDate } from '@/utils/formatDateAndTime';

export const ViewSinglePendingRequest = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';
  const { pendingRequestData } = useContext(RequestModuleContext);
  const { mutate } = useApprovePendingRequest();
  const [isRejected, setIsRejected] = useState<boolean>(false);

  const { columns: authDetailsData = [], isLoading } =
    useViewAuthDetailsGeneral(Number(id));

  const declineRequest = () => {
    setIsRejected(true);
  };

  const approveRequest = () => {
    const approvaldetails: approvePendingRequestFormValues = {
      id: pendingRequestData.id,
      comment: 'string'
    };

    mutate(approvaldetails);
  };

  if (isLoading) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={5} />
      </Box>
    );
  }

  return (
    <Box sx={{ marginTop: 10 }}>
      <Box sx={pendingRequestBackButtonContainerStyle}>
        <BackButton />
        <Box sx={pendingRequestButtonContainer}>
          <PrimaryIconButton
            buttonTitle="Decline"
            onClick={declineRequest}
            customStyle={pendingRequestDeclineButton}
          />
          <PrimaryIconButton
            buttonTitle="Approve"
            onClick={approveRequest}
            customStyle={pendingRequestApproveButton}
          />
        </Box>
      </Box>

      <Box sx={loanHeading}>
        <Box>
          <SubTitle title="Request" />
          <Details title={pendingRequestData?.posttype || 'N/A'} />
        </Box>
        <Box>
          <SubTitle title="Requested By" />
          <Details title={pendingRequestData?.post_user || 'N/A'} />
        </Box>
        <Box>
          <SubTitle title="Request Date" />
          <Details
            title={formatDateAndTime(pendingRequestData?.createdate) || 'N/A'}
          />
        </Box>
      </Box>
      <Box
        sx={{
          padding: { mobile: '0 5px', desktop: '0 25px' },
          width: '100%'
        }}
      >
        <Box pl={{ mobile: 2, desktop: 0 }}>
          <RequestDetailsContainer requestData={authDetailsData} />
        </Box>
      </Box>
      <RejectPendingRequestModal
        setIsRejected={setIsRejected}
        isRejected={isRejected}
        pendingRequestData={pendingRequestData}
      />
    </Box>
  );
};
