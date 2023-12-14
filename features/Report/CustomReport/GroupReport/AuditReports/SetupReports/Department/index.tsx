'use client';
import React from 'react';
import { FilterSection } from '@/features/Report/CustomReport/GroupReport/AuditReports/SetupReports/FilterSection';
import { SharedView } from '@/features/Report/CustomReport/GroupReport/AuditReports/SetupReports/SharedView';

export const Department = () => {
  return (
    <SharedView
      filterSection={<FilterSection />}
      mainTitle="Department"
      secondaryTitle="See a directory of all Departments on this system."
    />
  );
};
