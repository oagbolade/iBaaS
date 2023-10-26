'use client';
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { LoanFormContainer } from '@/components/Revamp/Shared/LoanFormContainer';
import { ActionButton } from '@/components/Revamp/Buttons';
import { PrimaryIconButton } from '@/components/Buttons';
import { submitButton, cancelButton } from './styles';
import {
  Details,
  MainTitle,
  SubTitle,
} from '@/components/Revamp/Shared/LoanDetails/LoanDetails';
import { Status } from '@/components/Labels';
import { LoanPartialPayOff } from '@/features/Loan/Forms';
import { MobileModalContainer } from '@/components/Revamp/Modal/mobile/ModalContainer';


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

const FormFields: React.FC = () => {
  return <LoanPartialPayOff />;
};

const MobilePreviewContent: React.FC =()=>{
  return(
    <MobileModalContainer
     ShowPreview={<PreviewContent/>}
    />
  )
}

export const PartialPay = () => {
  const [open, setOpen] = useState(false);

  const showToastPlaceholder = (): void => {
    setOpen(true);
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  }, [open]);

  const actionButtons: any = [
    <Box sx={{ display: 'flex' }} ml={{ mobile: 96, tablet: 0, desktop: 0 }}>
      <ActionButton customStyle={{ ...cancelButton }} buttonTitle="Cancel" />,
      <PrimaryIconButton
        onClick={showToastPlaceholder}
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
        title: 'Partial Payoff Successful',
        body: 'You have successfully done a partial payoff of [value] for [Account-name] and it has been sent for approval.',
        open,
      }}
      FormFields={FormFields}
      PreviewContent={PreviewContent}
      actionButtons={actionButtons}
    />
  );
};
