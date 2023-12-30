'use client';
import React from 'react';
import { Box } from '@mui/material';
import { LoanFormContainer } from '@/components/Revamp/Shared/LoanFormContainer';
import { ActionButton } from '@/components/Revamp/Buttons';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  submitButton,
  cancelButton,
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import {
  Details,
  MainTitle,
  SubTitle,
} from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { Status } from '@/components/Labels';
import { LoanUnderwritingForm } from '@/features/Loan/Forms/LoanUnderwritingForm';
import { MobileModalContainer } from '@/components/Revamp/Modal/mobile/ModalContainer';
import { useLoansModalToggle } from '@/utils/useLoansModalToggle';

const PreviewContent: React.FC = () => {
  return (
    <Box
      mt={{ mobile: 3 }}
      sx={{
        padding: { mobile: 6, tablet: 0 },
        alignItems: { mobile: 'center' },
      }}
    >
      <MainTitle title="Loan Account Details" />
      <SubTitle title="Settlement Account" />
      <Details title="39483593939" />
      <SubTitle title="Settlement Account Name" />
      <Details title="Omodayo Oluwafunke" />
      <SubTitle title="Loan Amount" />
      <Details title="N1,800,320.54" />
      <SubTitle title="Loan Purpose" />
      <Details title="To buy equipments" />
      <SubTitle title="Repayment Mode" />
      <Details title="Equal principal & intrest" />
      <SubTitle title="First Repayment Date" />
      <Details title="02 January, 2023  11:03pm" />
      <SubTitle title="Total No. of Installment" />
      <Details title="4" />
      <Box mb={{ mobile: 5, tablet: 0 }}>
        <SubTitle title="Loan Status" />
        <Status label="Active" status="success" />
      </Box>
    </Box>
  );
};

const FormFields: React.FC = () => {
  return <LoanUnderwritingForm />;
};

const MobilePreviewContent: React.FC = () => {
  return <MobileModalContainer ShowPreview={<PreviewContent />} />;
};

export const LoanUnderwriting = () => {
  const { openToastMessage, toggleModal } = useLoansModalToggle();

  const actionButtons: any = [
    <Box ml={{ mobile: 2, desktop: 0 }} sx={{ display: 'flex' }}>
      <ActionButton customStyle={{ ...cancelButton }} buttonTitle="Cancel" />,
      <PrimaryIconButton
        buttonTitle="Submit"
        customStyle={{ ...submitButton }}
      />
      ,
    </Box>,
  ];

  return (
    <LoanFormContainer
      ShowMobilePeview={MobilePreviewContent}
      toastMessage={{
        body: 'A new loan has been successfully created for [Customer-name]  and it has been sent for approval.',
        title: 'Loan Created',
        open: openToastMessage,
      }}
      FormFields={FormFields}
      PreviewContent={PreviewContent}
      actionButtons={actionButtons}
    />
  );
};
