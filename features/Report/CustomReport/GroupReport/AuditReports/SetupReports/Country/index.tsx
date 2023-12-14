'use client';
import React from 'react';
import { FilterSection } from '@/features/Report/CustomReport/GroupReport/AuditReports/SetupReports/FilterSection';
import { SharedView } from '@/features/Report/CustomReport/GroupReport/AuditReports/SetupReports/SharedView';

export const Country = () => {
  return (
    <SharedView
      filterSection={<FilterSection />}
      mainTitle="Country"
      secondaryTitle="See a directory of all Countries on this system."
    />
  );
};
