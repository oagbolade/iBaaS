'use client';
import React from 'react';
import { FilterSection } from '@/features/Report/CustomReport/GroupReport/AuditReports/SetupReports/FilterSection';
import { SharedView } from '@/features/Report/CustomReport/GroupReport/AuditReports/SetupReports/SharedView';

export const Group = () => {
  return (
    <SharedView
      filterSection={<FilterSection />}
      mainTitle="Group"
      secondaryTitle="See a directory of all Group on this system."
    />
  );
};
