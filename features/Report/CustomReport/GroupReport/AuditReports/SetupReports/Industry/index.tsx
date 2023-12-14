'use client';
import React from 'react';
import { FilterSection } from '@/features/Report/CustomReport/GroupReport/AuditReports/SetupReports/FilterSection';
import { SharedView } from '@/features/Report/CustomReport/GroupReport/AuditReports/SetupReports/SharedView';

export const Industry = () => {
  return (
    <SharedView
      filterSection={<FilterSection />}
      mainTitle="Industry"
      secondaryTitle="See a directory of all Industry on this system."
    />
  );
};
