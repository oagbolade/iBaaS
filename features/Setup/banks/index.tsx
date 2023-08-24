'use client';
import React from 'react';
import { StarterSection } from '@/components/Shared/StarterSection';
import SetupContextProvider from '@/features/Setup/SetupContext';
import { modalTitle, ModalForm } from '@/features/Setup/banks/CommercialBank';
import { ModalContainer } from '@/components/Modal/index';

export const CommeracialBank = () => {
  return (
    <SetupContextProvider>
      <StarterSection
        redirectLink="/setup/banks/commercial"
        isSetup
        title="There are no listed <b>“Branch”</b>.Add new branch to get started"
        buttonTitle="Add new branch"
      />
      <ModalContainer form={<ModalForm />} title={modalTitle} />
    </SetupContextProvider>
  );
};
