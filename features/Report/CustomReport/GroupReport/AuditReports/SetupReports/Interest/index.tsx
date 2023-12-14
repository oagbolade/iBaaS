'use client';
import React from 'react';
import { FilterSection } from '@/features/Report/CustomReport/GroupReport/AuditReports/SetupReports/FilterSection';
import { SharedView } from '@/features/Report/CustomReport/GroupReport/AuditReports/SetupReports/SharedView';

export const Interest = () => {
  return (
    <SharedView
      filterSection={<FilterSection />}
      mainTitle="Interest"
      secondaryTitle="See a directory of all Interest on this system."
    />
  );
};
