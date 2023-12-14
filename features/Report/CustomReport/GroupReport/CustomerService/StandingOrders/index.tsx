'use client';
import React from 'react';
import { SharedView } from '@/features/Report/CustomReport/GroupReport/CustomerService/SharedView';
import { FilterSection } from '@/features/Report/CustomReport/GroupReport/CustomerService/OfficerPerformance/FilterSection';

export const StandingOrders = () => {
  return (
    <SharedView
      filterSection={<FilterSection />}
      mainTitle="Standing Orders"
      secondaryTitle="See a directory of all Standing Orders on this system."
    />
  );
};
