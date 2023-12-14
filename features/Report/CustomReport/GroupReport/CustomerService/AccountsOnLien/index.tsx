'use client';
import React from 'react';
import { SharedView } from '@/features/Report/CustomReport/GroupReport/CustomerService/SharedView';
import { FilterSection } from '@/features/Report/CustomReport/GroupReport/CustomerService/OfficerPerformance/FilterSection';

export const AccountsOnLien = () => {
  return (
    <SharedView
      filterSection={<FilterSection />}
      mainTitle="Account On Lien"
      secondaryTitle="See a directory of all Accounts On Lien on this system."
    />
  );
};
