'use client';
import React from 'react';
import { SharedView } from '@/features/Report/CustomReport/GroupReport/CustomerService/SharedView';
import { FilterSection } from '@/features/Report/CustomReport/GroupReport/CustomerService/ClearingItems/FilterSection';

export const ChepuebookStatus = () => {
  return (
    <SharedView
      filterSection={<FilterSection />}
      mainTitle="Chequebook Status"
      secondaryTitle="See a directory of all Chequebook Status on this system."
    />
  );
};
