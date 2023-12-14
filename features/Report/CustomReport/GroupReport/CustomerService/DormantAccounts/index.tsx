'use client';
import React from 'react';
import { SharedView } from '@/features/Report/CustomReport/GroupReport/CustomerService/SharedView';
import { FilterSection } from '@/features/Report/CustomReport/GroupReport/CustomerService/OfficerPerformance/FilterSection';

export const DormantAccounts = () => {
  return (
    <SharedView
      filterSection={<FilterSection />}
      mainTitle="Dormant Accounts"
      secondaryTitle="See a directory of all Dormant Accounts on this system."
    />
  );
};
