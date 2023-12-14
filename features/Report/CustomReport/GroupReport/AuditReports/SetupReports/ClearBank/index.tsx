'use client';
import React from 'react';
import { FilterSection } from '@/features/Report/CustomReport/GroupReport/AuditReports/SetupReports/FilterSection';
import { SharedView } from '@/features/Report/CustomReport/GroupReport/AuditReports/SetupReports/SharedView';

export const ClearBank = () => {
  return (
    <SharedView
      filterSection={<FilterSection />}
      mainTitle="Clear Bank"
      secondaryTitle="See a directory of all Clear Banks on this system."
    />
  );
};
