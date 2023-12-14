'use client';
import React from 'react';
import { FilterSection } from '@/features/Report/CustomReport/GroupReport/AuditReports/SetupReports/FilterSection';
import { SharedView } from '@/features/Report/CustomReport/GroupReport/AuditReports/SetupReports/SharedView';

export const State = () => {
  return (
    <SharedView
      filterSection={<FilterSection />}
      mainTitle="State"
      secondaryTitle="See a directory of all States on this system."
    />
  );
};
