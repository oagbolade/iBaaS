'use client';
import React from 'react';
import { FilterSection } from '@/features/Report/CustomReport/GroupReport/AuditReports/SetupReports/FilterSection';
import { SharedView } from '@/features/Report/CustomReport/GroupReport/AuditReports/SetupReports/SharedView';

export const Region = () => {
  return (
    <SharedView
      filterSection={<FilterSection />}
      mainTitle="Region"
      secondaryTitle="See a directory of all Regions on this system."
    />
  );
};
