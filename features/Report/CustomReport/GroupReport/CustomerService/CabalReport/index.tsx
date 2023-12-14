'use client';
import React from 'react';
import { FilterSection } from './FilterSection';
import { SharedView } from '@/features/Report/CustomReport/GroupReport/CustomerService/SharedView';

export const CabalReport = () => {
  return (
    <SharedView
      filterSection={<FilterSection />}
      mainTitle="Cabal Report"
      secondaryTitle="See a directory of all Cabal Report in this system."
    />
  );
};
