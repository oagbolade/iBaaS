import React from 'react';
import { StarterSection } from '@/components/Shared/StarterSection';

export const TreasuryProduct = () => {
  return (
    <StarterSection
      redirectLink="/setup/treasury/steps"
      title=" There are no listed <b>“Treasury”</b> product. Add new product to get started"
      buttonTitle="Add new Product"
    />
  );
};
