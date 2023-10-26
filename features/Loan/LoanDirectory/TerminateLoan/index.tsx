'use client';
import React from 'react';
import { Box } from '@mui/material';
import { submitButton, cancelButton } from './styles';
import { LoanFormContainer } from '@/components/Revamp/Shared/LoanFormContainer';
import { ActionButton } from '@/components/Revamp/Buttons';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  Details,
  MainTitle,
  SubTitle,
} from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { Status } from '@/components/Labels';
import { TerminateLoanForm } from '@/features/Loan/Forms';
import { MobileModalContainer } from '@/components/Revamp/Modal/mobile/ModalContainer';
import { useLoansModalToggle } from '@/utils/useLoansModalToggle';

const PreviewContent: React.FC = () => {
  return (
    <Box>
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

      <SubTitle title="Loan Status" />
      <Status label="Active" status="success" />
    </Box>
  );
};
const MobilePreviewContent: React.FC =()=>{
  return(
    <MobileModalContainer
     ShowPreview={<PreviewContent/>}
    />
  )
}

const FormFields: React.FC = () => {
  return <TerminateLoanForm />;
};

const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 96, tablet: 0, desktop: 0 }}>
    <ActionButton customStyle={{ ...cancelButton }} buttonTitle="Cancel" />,
    <PrimaryIconButton
      buttonTitle="Terminate Loan"
      customStyle={{ ...submitButton }}
    />
    ,
  </Box>,
];

export const TerminateLoan = () => {
  const { openToastMessage, toggleModal } = useLoansModalToggle();

  const actionButtons: any = [
    <ActionButton customStyle={{ ...cancelButton }} buttonTitle="Cancel" />,
    <PrimaryIconButton
      onClick={() => toggleModal('toast')}
      buttonTitle="Liquidate Loan"
      customStyle={{ ...submitButton }}
    />,
  ];
  return (
    <LoanFormContainer
    ShowMobilePeview={MobilePreviewContent}
      toastMessage={{
        body: 'You have successfully Liquidated the Loan for [Account-name]  and it has been sent for approval.',
        title: 'Loan Liquidated',
        open: openToastMessage,
      }}
      FormFields={FormFields}
      PreviewContent={PreviewContent}
      actionButtons={actionButtons}
    />
  );
};
