'use client';
import React from 'react';
import { FilterSection } from '@/features/Report/CustomReport/GroupReport/AuditReports/SetupReports/FilterSection';
import { SharedView } from '@/features/Report/CustomReport/GroupReport/AuditReports/SetupReports/SharedView';

export const Document = () => {
  return (
    <SharedView
      filterSection={<FilterSection />}
      mainTitle="Document"
      secondaryTitle="See a directory of all Documents on this system."
    />
  );
};
