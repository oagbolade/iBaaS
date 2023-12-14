'use client';
import React from 'react';
import { FilterSection } from '@/features/Report/CustomReport/GroupReport/AuditReports/SetupReports/FilterSection';
import { SharedView } from '@/features/Report/CustomReport/GroupReport/AuditReports/SetupReports/SharedView';

export const Sector = () => {
  return (
    <SharedView
      filterSection={<FilterSection />}
      mainTitle="Sector"
      secondaryTitle="See a directory of all Sectors on this system."
    />
  );
};
