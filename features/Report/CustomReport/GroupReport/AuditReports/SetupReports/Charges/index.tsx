'use client';
import React from 'react';
import { FilterSection } from '@/features/Report/CustomReport/GroupReport/AuditReports/SetupReports/FilterSection';
import { SharedView } from '@/features/Report/CustomReport/GroupReport/AuditReports/SetupReports/SharedView';

export const Charges = () => {
  return (
    <SharedView
      filterSection={<FilterSection />}
      mainTitle="Charges"
      secondaryTitle="See a directory of all Charges on this system."
    />
  );
};
