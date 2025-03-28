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
import { BackButton } from '@/components/Revamp/Buttons';
import {
  Details,
  SubTitle
} from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { RequestModuleContext } from '@/context/RequestModuleContext';
import { formatDateAndTime } from '@/utils/hooks/useDateFormat';
import { Status } from '@/components/Labels';
import { ILoanAccountDetails } from '@/api/ResponseTypes/loans';
import { encryptData } from '@/utils/encryptData';
import { useViewAuthDetailsGeneral } from '@/api/loans/useViewAuthDetailsGeneral';

export const ViewASingleRequest = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';

  const { myRequestData } = useContext(RequestModuleContext);

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
          <Details title={myRequestData?.requestType || 'N/A'} />
        </Box>
        <Box>
          <SubTitle title="Approving Officer" />
          <Details title={myRequestData?.approvingOfficer || 'N/A'} />
        </Box>
        <Box>
          <SubTitle title="Request Date" />
          <Details
            title={formatDateAndTime(myRequestData?.requestDate) || 'N/A'}
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
