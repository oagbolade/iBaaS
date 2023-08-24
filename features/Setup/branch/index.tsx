import React from 'react';
import { StarterSection } from '@/components/Shared/StarterSection';

export const ManageBranch = () => {
  return (
    <StarterSection
      redirectLink="/setup/branch/steps"
      isSetup
      title="There are no listed <b>“Branch”</b>.Add new branch to get started"
      buttonTitle="Add new branch"
    />
  );
};
