'use client';

import { Box } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useContext } from 'react';
import { backButtonContainerStyle, loanHeading } from '../styles';
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
import { BackButton } from '@/components/Revamp/Buttons';
import {
  Details,
  SubTitle
} from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { Status } from '@/components/Labels';
import { RequestModuleContext } from '@/context/RequestModuleContext';
import { formatDateAndTime } from '@/utils/hooks/useDateFormat';
import { encryptData } from '@/utils/encryptData';
import { useViewAuthDetailsGeneral } from '@/api/loans/useViewAuthDetailsGeneral';

export const ViewSingleRejectedRequest = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';
  const { rejectedRequestData } = useContext(RequestModuleContext);

  const { columns: authDetailsData = [], isLoading } =
    useViewAuthDetailsGeneral(Number(id));

  if (isLoading) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={5} />
      </Box>
    );
  }

  return (
    <Box sx={{ marginTop: 10 }}>
      <Box sx={backButtonContainerStyle}>
        <BackButton />
      </Box>
      <Box sx={loanHeading}>
        <Box>
          <SubTitle title="Request" />
          <Details title={rejectedRequestData?.requestType || 'N/A'} />
        </Box>
        <Box>
          <SubTitle title="Approving Officer" />
          <Details title={rejectedRequestData?.approvingOfficer || 'N/A'} />
        </Box>
        <Box>
          <SubTitle title="Request Date" />
          <Details
            title={formatDateAndTime(rejectedRequestData?.rejectDate) || 'N/A'}
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
    </Box>
  );
};
