'use client';
import React from 'react';
import { FilterSection } from '@/features/Report/CustomReport/GroupReport/AuditReports/SetupReports/FilterSection';
import { SharedView } from '@/features/Report/CustomReport/GroupReport/AuditReports/SetupReports/SharedView';

export const CommercialBanks = () => {
  return (
    <SharedView
      filterSection={<FilterSection />}
      mainTitle="Commercial Banks"
      secondaryTitle="See a directory of all Commercial Banks on this system."
    />
  );
};
