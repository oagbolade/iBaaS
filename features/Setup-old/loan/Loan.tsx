import React from 'react';
import { StarterSection } from '@/components/Shared/StarterSection';

export const Loan = () => {
  return (
    <StarterSection
      redirectLink="/setup/loan/steps"
      title="There are no listed <b>Loan</b> products. Add a new product to get started"
      buttonTitle="Add new product"
    />
  );
};
