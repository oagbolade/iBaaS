'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Box } from '@mui/material';
import { sanitize } from 'dompurify';
import {
  accountTitle,
  accountNumber as accountNumberStyles,
  mandateContainer,
  divider,
  mandateImageContainer,
  mandateStyle,
  mandateTitle,
  removeMandate,
  managerPreview,
  previewContainer,
  previewStyle
} from '@/features/CustomerService/Form/style';
import { submitButton } from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { PrimaryIconButton } from '@/components/Buttons';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { PageTitle } from '@/components/Typography';
import { FormSkeleton } from '@/components/Loaders';
import { NoDataAvailable } from '@/components/Alert/Warning/NoDataAvailable';
import { ModalContainerV2 } from '@/components/Revamp/Modal';
import { DeleteActionSteps } from '@/constants/Steps';
import { DeleteConfirmationModal } from '@/features/Administrator/Forms/DeleteConfirmationModal';
import { useGetParams } from '@/utils/hooks/useGetParams';
import {
  useDeleteDirectorMandate,
  useGetDirectorById,
  useGetDirectorMandateDetails
} from '@/api/customer-service/useDirectors';
import { DeleteDirectorValues } from '@/schemas/schema-values/customer-service';
import { encryptData } from '@/utils/encryptData';

export const ViewDirectorDetails = () => {
  const [deleteStep, setDeleteStep] = React.useState<DeleteActionSteps>(null);
  const customerId = useGetParams('customerId') || '';
  const directorId = useGetParams('directorId') || '';

  const { directorMandate, isLoading: isMandateLoading } =
    useGetDirectorMandateDetails(
      encryptData(customerId) || '',
      encryptData(directorId) || ''
    );
  const { mutate, isPending } = useDeleteDirectorMandate();
  const { directorDetails, isLoading: areDirectorDetailsLoading } =
    useGetDirectorById(encryptData(directorId) as string);

  const actionButtons: any = [
    <Box sx={{ width: '100%' }} ml={{ mobile: 2, desktop: 5 }}>
      <Link
        href={`/customer-service/director/create-mandate?customerId=${sanitize(customerId)}&directorId=${sanitize(directorId)}&directorName=${sanitize(directorDetails?.fullName)}`}
      >
        <PrimaryIconButton
          buttonTitle="Add Mandate"
          customStyle={submitButton}
        />
      </Link>
    </Box>
  ];

  const handleDelete = async (currentStep: DeleteActionSteps = null) => {
    setDeleteStep('isDeleteConfirmation');

    if (currentStep === 'isPassword') {
      const values: DeleteDirectorValues = {
        customerId,
        directorId
      };

      await mutate(values);
      setDeleteStep(null);
    }
  };

  const handleClose = async () => {
    setDeleteStep(null);
  };

  if (isMandateLoading || areDirectorDetailsLoading) {
    <Box m={16}>
      <FormSkeleton noOfLoaders={5} />
    </Box>;
  }

  const customPreviewStyle = {
    ...previewStyle,
    width: '100%'
  };

  const customPreviewContainer = {
    ...previewContainer,
    width: '100%'
  };

  return (
    <>
      <TopActionsArea actionButtons={actionButtons} />
      <Box sx={mandateContainer}>
        <Box sx={{ ...managerPreview, width: '100%' }}>
          <Box sx={customPreviewContainer}>
            <Box sx={customPreviewStyle}>
              <PageTitle title="Customer ID" styles={accountTitle} />
              <PageTitle
                title={directorDetails?.customerId || 'N/A'}
                styles={accountNumberStyles}
              />
            </Box>
            <Box sx={customPreviewStyle}>
              <PageTitle title="BVN" styles={accountTitle} />
              <PageTitle
                title={directorDetails?.bvn || 'N/A'}
                styles={accountNumberStyles}
              />
            </Box>
            <Box sx={customPreviewStyle}>
              <PageTitle title="Title" styles={accountTitle} />
              <PageTitle
                title={directorDetails?.title || 'N/A'}
                styles={accountNumberStyles}
              />
            </Box>
          </Box>
          <Box sx={customPreviewContainer}>
            <Box sx={customPreviewStyle}>
              <PageTitle title="First Name" styles={accountTitle} />
              <PageTitle
                title={`NGN ${directorDetails?.firstName || 'N/A'}`}
                styles={accountNumberStyles}
              />
            </Box>
            <Box sx={customPreviewStyle}>
              <PageTitle title="Middle Name" styles={accountTitle} />
              <PageTitle
                title={directorDetails?.otherName || 'N/A'}
                styles={accountNumberStyles}
              />
            </Box>
            <Box sx={customPreviewStyle}>
              <PageTitle title="Last Name" styles={accountTitle} />
              <PageTitle
                title={directorDetails?.surname || 'N/A'}
                styles={accountNumberStyles}
              />
            </Box>
          </Box>
          <Box sx={customPreviewContainer}>
            <Box sx={customPreviewStyle}>
              <PageTitle title="Nationality" styles={accountTitle} />
              <PageTitle
                title={directorDetails?.nationality || 'N/A'}
                styles={accountNumberStyles}
              />
            </Box>
            <Box sx={customPreviewStyle}>
              <PageTitle title="Date of Birth" styles={accountTitle} />
              <PageTitle
                title={directorDetails?.dob || 'N/A'}
                styles={accountNumberStyles}
              />
            </Box>
            <Box sx={customPreviewStyle}>
              <PageTitle title="Gender" styles={accountTitle} />
              <PageTitle
                title={directorDetails?.gender ? 'Male' : 'Female'}
                styles={accountNumberStyles}
              />
            </Box>
          </Box>

          <Box sx={customPreviewContainer}>
            <Box sx={customPreviewStyle}>
              <PageTitle title="State of Origin" styles={accountTitle} />
              <PageTitle
                title={directorDetails?.stateCode || 'N/A'}
                styles={accountNumberStyles}
              />
            </Box>
            <Box sx={customPreviewStyle}>
              <PageTitle
                title="LGA/City/Town of Origin"
                styles={accountTitle}
              />
              <PageTitle
                title={directorDetails?.townCode || 'N/A'}
                styles={accountNumberStyles}
              />
            </Box>
            <Box sx={customPreviewStyle}>
              <PageTitle title="Address" styles={accountTitle} />
              <PageTitle
                title={directorDetails?.address || 'N/A'}
                styles={accountNumberStyles}
              />
            </Box>
          </Box>

          <Box sx={customPreviewContainer}>
            <Box sx={customPreviewStyle}>
              <PageTitle title="Phone Number" styles={accountTitle} />
              <PageTitle
                title={directorDetails?.phone || 'N/A'}
                styles={accountNumberStyles}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box mb={10} sx={mandateContainer}>
        <PageTitle title="All Mandates" styles={accountNumberStyles} />
        <Box sx={divider} />
        {!directorMandate?.directorId && (
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
              message="Director has no mandate"
              width={200}
              height={200}
            />
          </Box>
        )}
        {directorMandate?.directorId && (
          <>
            <Box sx={mandateImageContainer}>
              <Box sx={mandateStyle}>
                <Box sx={mandateTitle}>
                  <PageTitle title="Customer ID" styles={accountTitle} />
                  <PageTitle
                    title={customerId}
                    styles={accountNumberStyles}
                  />{' '}
                </Box>
                <Box sx={mandateTitle}>
                  <PageTitle title="Director ID" styles={accountTitle} />
                  <PageTitle title={directorId} styles={accountNumberStyles} />
                </Box>
                <Box sx={mandateTitle}>
                  <PageTitle title="Director Name" styles={accountTitle} />
                  <PageTitle
                    title={directorMandate?.signatoryName}
                    styles={accountNumberStyles}
                  />
                </Box>
                <Box sx={mandateTitle}>
                  <PrimaryIconButton
                    onClick={() => {
                      const step = null;
                      return handleDelete(step);
                    }}
                    buttonTitle="Remove Mandate"
                    customStyle={removeMandate}
                    isLoading={isPending}
                  />
                </Box>
              </Box>
              <Box sx={divider} />
            </Box>
            <Box sx={mandateImageContainer}>
              <Box sx={mandateStyle}>
                <Box sx={mandateTitle}>
                  <PageTitle title="Director’s Photo" styles={accountTitle} />
                  <Image
                    src={`data:${directorMandate?.image_Type};base64,${directorMandate?.customerImage}`}
                    width={98}
                    height={131}
                    alt="director pic"
                  />
                </Box>
                <Box sx={mandateTitle}>
                  <PageTitle
                    title="Director’s Signature"
                    styles={accountTitle}
                  />
                  <Image
                    src={`data:${directorMandate?.image_Type2};base64,${directorMandate?.signatureImage}`}
                    width={98}
                    height={131}
                    alt="director signature"
                  />
                </Box>
              </Box>
              <Box sx={divider} />
            </Box>
          </>
        )}

        {deleteStep !== null && deleteStep !== 'showToast' && (
          <ModalContainerV2
            handleClose={handleClose}
            form={
              <DeleteConfirmationModal
                modalTitle="Remove Mandate"
                modalDescription="Are you sure you want to delete?"
                deleteStep={deleteStep}
                handleClose={handleDelete}
                closeModalQuickly={handleClose}
              />
            }
          />
        )}
      </Box>
    </>
  );
};
