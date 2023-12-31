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
import { RestructureLoanForm } from '@/features/Loan/Forms';
import { Tabs } from '@/components/Revamp/Tabs';
import { MobileModalContainer } from '@/components/Revamp/Modal/mobile/ModalContainer';
import { useLoansModalToggle } from '@/utils/useLoansModalToggle';

const PreviewContentOne: React.FC = () => {
  return (
    <Box
      mb={{ mobile: 30, tablet: 0 }}
      sx={{
        padding: { mobile: 6, tablet: 0 },
        alignItems: { mobile: 'center', tablet: 'normal' },
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
      <Box mb={{ mobile: 15, tablet: 0 }}>
        <SubTitle title="Loan Status" />
        <Status label="Active" status="success" />
      </Box>
    </Box>
  );
};

const PreviewContentTwo: React.FC = () => {
  return (
    <Box
      mb={{ mobile: 30, tablet: 0 }}
      sx={{
        padding: { mobile: 6, tablet: 0 },
        alignItems: { mobile: 'center', tablet: 'normal' },
      }}
    >
      <SubTitle title="Product Name" />
      <Details title="Compassianate Loan" />

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

const tabTitle = ['Account Information', 'Product Information'];
const pageMenu = [<PreviewContentOne />, <PreviewContentTwo />];

const PreviewContent: React.FC = () => {
  return (
    <Box>
      <Tabs tabTitle={tabTitle} pageMenu={pageMenu} />
    </Box>
  );
};

const MobilePreviewContent: React.FC = () => {
  return <MobileModalContainer ShowPreview={<PreviewContent />} />;
};

const FormFields: React.FC = () => {
  return <RestructureLoanForm />;
};

export const RestructureLoan = () => {
  const { openToastMessage, toggleModal } = useLoansModalToggle();

  const actionButtons: any = [
    <Box ml={{ mobile: 2, desktop: 0 }} sx={{ display: 'flex' }}>
      <ActionButton customStyle={{ ...cancelButton }} buttonTitle="Cancel" />,
      <PrimaryIconButton
        buttonTitle="Restructure Loan"
        customStyle={{ ...submitButton }}
      />
    </Box>,
  ];

  return (
    <LoanFormContainer
      ShowMobilePeview={MobilePreviewContent}
      toastMessage={{
        body: 'You have successfully restructured the Loan for [Account-name]  and it has been sent for approval.',
        title: 'Loan Restructured',
        open: openToastMessage,
      }}
      FormFields={FormFields}
      PreviewContent={PreviewContent}
      actionButtons={actionButtons}
    />
  );
};
