'use client';
import React from 'react';
import Link from 'next/link';
import { Box } from '@mui/material';
import DOMPurify from 'dompurify';
import {
  managerPreview,
  previewContainer,
  previewStyle,
  accountTitle,
  accountNumber as accountNumberStyles,
  mandateContainer,
  divider,
  mandateImageContainer,
  mandateStyle,
  mandateTitle,
  removeMandate
} from '@/features/CustomerService/Form/style';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { PageTitle } from '@/components/Typography';
import {
  useGetMandateDetailsByAccountNumber,
  useGetAccountDetails,
  useDeleteCustomerMandate
} from '@/api/customer-service/useCustomer';
import { FormSkeleton } from '@/components/Loaders';
import { Status } from '@/components/Labels';
import { NoDataAvailable } from '@/components/Alert/Warning/NoDataAvailable';
import { ModalContainerV2 } from '@/components/Revamp/Modal';
import { DeleteActionSteps } from '@/constants/Steps';
import { DeleteConfirmationModal } from '@/features/Administrator/Forms/DeleteConfirmationModal';
import { useGetParams } from '@/utils/hooks/useGetParams';
import { encryptData } from '@/utils/encryptData';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';

export const ViewCustomerMandate = () => {
  const accountNumber = useGetParams('accountNumber');
  const customerId = useGetParams('customerId');
  const { mandateInfo, isLoading: isMandateLoading } =
    useGetMandateDetailsByAccountNumber(encryptData(accountNumber) || '');

  const { accDetailsResults, isLoading: isAccountDetailsLoading } =
    useGetAccountDetails(encryptData(accountNumber) || '');

  const actionButtons: any = [
    <Box sx={{ width: '100%' }} ml={{ mobile: 2, desktop: 5 }}>
      <Link
        href={`/customer-service/customer/mandate/add-mandate?accountNumber=${DOMPurify.sanitize(accountNumber as string)}&bvn=${DOMPurify.sanitize(accDetailsResults?.bvn as string)}&customerId=${DOMPurify.sanitize(customerId as string)}`}
      >
        <PrimaryIconButton
          buttonTitle="Add Mandate"
          customStyle={submitButton}
        />
      </Link>
    </Box>
  ];

  const [deleteStep, setDeleteStep] = React.useState<DeleteActionSteps>(null);
  const [currentMandateId, setCurrentMandate] = React.useState<string>('');
  const { mutate, isPending } = useDeleteCustomerMandate();

  const handleDelete = async (
    currentStep: DeleteActionSteps = null,
    id: string | null = null
  ) => {
    setDeleteStep('isDeleteConfirmation');

    if (id) {
      setCurrentMandate(id as string);
    }

    if (currentStep === 'isPassword') {
      await mutate(currentMandateId);
      setDeleteStep(null);
    }
  };

  if (isMandateLoading || isAccountDetailsLoading) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={3} />
      </Box>
    );
  }

  return (
    <>
      <TopActionsArea actionButtons={actionButtons} />
      <Box sx={mandateContainer}>
        <Box sx={managerPreview}>
          <Box sx={previewContainer}>
            <Box sx={previewStyle}>
              <PageTitle title="account number" styles={accountTitle} />
              <PageTitle
                title={accDetailsResults?.accountnumber || 'N/A'}
                styles={accountNumberStyles}
              />
            </Box>
            <Box sx={previewStyle}>
              <PageTitle title="account name" styles={accountTitle} />
              <PageTitle
                title={accDetailsResults?.accounttitle || 'N/A'}
                styles={accountNumberStyles}
              />
            </Box>
            <Box sx={previewStyle}>
              <PageTitle title="account type" styles={accountTitle} />
              <PageTitle
                title={accDetailsResults?.acctty || 'N/A'}
                styles={accountNumberStyles}
              />
            </Box>
          </Box>
          <Box sx={previewContainer}>
            <Box sx={previewStyle}>
              <PageTitle title="usable balance" styles={accountTitle} />
              <PageTitle
                title={`NGN ${formatCurrency(accDetailsResults?.usebal) || 'N/A'}`}
                styles={accountNumberStyles}
              />
            </Box>
            <Box sx={previewStyle}>
              <PageTitle title="product type" styles={accountTitle} />
              <PageTitle
                title={accDetailsResults?.prodname || 'N/A'}
                styles={accountNumberStyles}
              />
            </Box>
            <Box sx={previewStyle}>
              <PageTitle title="status" styles={accountTitle} />
              <Status
                label={accDetailsResults?.acctstatus ? 'Active' : 'Dormant'}
                status={accDetailsResults?.acctstatus ? 'success' : 'warning'}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box mb={10} sx={mandateContainer}>
        <PageTitle title="All Mandates" styles={accountNumberStyles} />
        <Box sx={divider} />
        {mandateInfo?.length === 0 && (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              height: '300px'
            }}
            mb={3}
          >
            <NoDataAvailable
              message="Customer has no mandate"
              width={200}
              height={200}
            />
          </Box>
        )}
        {mandateInfo?.map((info) => {
          return (
            <Box sx={mandateImageContainer}>
              <Box sx={mandateStyle}>
                <Box sx={mandateTitle}>
                  <PageTitle title="Photo" styles={accountTitle} />
                  <img
                    src={`data:image/${info.pictImage_Type};base64,${info.customerPictBase64}`}
                    alt="customer pic"
                  />
                </Box>
                <Box sx={mandateTitle}>
                  <PageTitle title="Name" styles={accountTitle} />
                  <PageTitle
                    title={info.customerID}
                    styles={accountNumberStyles}
                  />
                </Box>
                <Box sx={mandateTitle}>
                  <PageTitle title="Signature" styles={accountTitle} />
                  <img
                    src={`data:image/${info.signImage_Type};base64,${info.customerSignBase64}`}
                    alt="customer signature"
                  />
                </Box>
                <Box sx={mandateTitle}>
                  <PrimaryIconButton
                    onClick={() => {
                      const step = null;
                      return handleDelete(step, info.customerID);
                    }}
                    buttonTitle="Remove Mandate"
                    customStyle={removeMandate}
                    isLoading={isPending}
                  />
                </Box>
              </Box>
              <Box sx={divider} />
            </Box>
          );
        })}

        {deleteStep !== null && deleteStep !== 'showToast' && (
          <ModalContainerV2
            handleClose={handleDelete}
            form={
              <DeleteConfirmationModal
                modalTitle="Remove Mandate"
                modalDescription="Are you sure you want to delete?"
                deleteStep={deleteStep}
                handleClose={handleDelete}
              />
            }
          />
        )}
      </Box>
    </>
  );
};
