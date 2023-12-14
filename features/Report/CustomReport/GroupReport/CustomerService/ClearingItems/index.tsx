'use client';
import React from 'react';
import { FilterSection } from './FilterSection';
import { SharedView } from '@/features/Report/CustomReport/GroupReport/CustomerService/SharedView';

export const ClearingItems = () => {
  return (
    <SharedView
      filterSection={<FilterSection />}
      mainTitle="Clearing Items"
      secondaryTitle="See a directory of all Clearing Items on this system."
    />
  );
};
