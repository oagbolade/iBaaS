'use client';
import React from 'react';
import Box from '@mui/material/Box';
import { BuyFromVault as BuyVaultForm } from './BuyFromVault';
import { SellToVault as SellVaultForm } from './SellToVault';
import {
  submitButton,
  cancelButton
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { Tabs } from '@/components/Revamp/Tabs';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { PrimaryIconButton } from '@/components/Buttons';
import { IBranches } from '@/api/ResponseTypes/general';
import colors from '@/assets/colors';

export const VaultManagement = ({ branches }: { branches: IBranches[] }) => {
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const tabTitle = ['Buy from Vault', 'Sell to Vault'];

  const triggerSubmissionSubmit = () => {
    setIsSubmitting(true);
  };
  const actionButtons: any = [
    <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
      <PrimaryIconButton
        buttonTitle="Submit"
        type="submit"
        isLoading={isSubmitting}
        onClick={triggerSubmissionSubmit}
        customStyle={{
          ...submitButton
        }}
      />
    </Box>
  ];

  const pageMenu = [
    <BuyVaultForm
      branches={branches}
      isSubmitting={isSubmitting}
      setIsSubmitting={setIsSubmitting}
    />,

    <SellVaultForm
      branches={branches}
      isSubmitting={isSubmitting}
      setIsSubmitting={setIsSubmitting}
    />
  ];

  return (
    <Box sx={{ marginTop: '60px' }}>
      <TopActionsArea actionButtons={actionButtons} />
      <Box>
        <Box sx={{ width: '100%', padding: '25px' }}>
          <Tabs tabTitle={tabTitle} pageMenu={pageMenu} />
        </Box>
      </Box>
    </Box>
  );
};
