import React from 'react';
import { StarterSection } from '@/components/Shared/StarterSection';

export const Demand = () => {
  return (
    <StarterSection
      redirectLink = '/setup/demand/steps'
      title="There are no listed <b>Demand Deposit</b> product. Add a new product to get started"
      buttonTitle="Add new product"
    />
  );
};
