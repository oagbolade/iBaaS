'use client';
import React from 'react';
import { FilterSection } from '@/features/Report/CustomReport/GroupReport/AuditReports/SetupReports/FilterSection';
import { SharedView } from '@/features/Report/CustomReport/GroupReport/AuditReports/SetupReports/SharedView';

export const UserTempProfile = () => {
  return (
    <SharedView
      filterSection={<FilterSection />}
      mainTitle="User Temp Profile"
      secondaryTitle="See a directory of all User Temp Profiles on this system."
    />
  );
};
