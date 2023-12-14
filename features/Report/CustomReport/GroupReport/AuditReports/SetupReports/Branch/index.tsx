'use client';
import React from 'react';
import { FilterSection } from '@/features/Report/CustomReport/GroupReport/AuditReports/SetupReports/FilterSection';
import { SharedView } from '@/features/Report/CustomReport/GroupReport/AuditReports/SetupReports/SharedView';

export const Branch = () => {
  return (
    <SharedView
      filterSection={<FilterSection />}
      mainTitle="Branches"
      secondaryTitle="See a directory of all Branches on this system."
    />
  );
};
