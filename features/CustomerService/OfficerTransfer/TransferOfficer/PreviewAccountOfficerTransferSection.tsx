'use client';

import React from 'react';
import Box from '@mui/material/Box';
import { tabStyle } from '@/features/CustomerService/Customer/style';
import { Tabs } from '@/components/Revamp/Tabs';
import { Details, SubTitle } from '@/features/Administrator/Role/ViewRole';
import { IAccountOfficers } from '@/api/ResponseTypes/admin';
import { FormSkeleton } from '@/components/Loaders';

// Reusable component to display officer information
const OfficerInfoSection: React.FC<{ officerInformation?: IAccountOfficers, isOfficerToLoading?: boolean }> = ({ officerInformation, isOfficerToLoading }) => {
  const info = [
    { title: 'Officer Name', value: officerInformation?.officerName || 'N/A' },
    { title: 'Officer ID', value: officerInformation?.officercode || 'N/A' },
    { title: 'Branch', value: officerInformation?.branchName || 'N/A' },
    { title: 'Department', value: officerInformation?.departmentName || 'N/A' },
    { title: 'Authorizer', value: officerInformation?.authId || 'N/A' },
    { title: 'Role', value: 'N/A' }, // TODO: use return role from API
    { title: 'Teller No', value: 'N/A' } // TODO: use return teller no from API
  ];

  if (isOfficerToLoading) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={5} />
      </Box>
    );
  }

  return (
    <Box
      mb={{ mobile: 30, tablet: 0 }}
      sx={{
        padding: { mobile: 6, tablet: 0 },
        alignItems: { mobile: 'center', tablet: 'normal' }
      }}
    >
      {info.map((item) => (
        <React.Fragment key={item.title}>
          <SubTitle title={item.title} />
          <Details title={item.value} />
        </React.Fragment>
      ))}
    </Box>
  );
};

interface Props {
  officerFromInformation?: IAccountOfficers;
  officerToInformation?: IAccountOfficers;
  isOfficerToLoading?: boolean;
}

const tabTitles = ['Transfer From Information', 'Transfer To Information'];

export const PreviewAccountOfficerTransferSection: React.FC<Props> = ({ officerFromInformation, officerToInformation, isOfficerToLoading }) => {

  const pageMenu = [
    <OfficerInfoSection key="from" officerInformation={officerFromInformation} />,
    <OfficerInfoSection key="to" isOfficerToLoading={isOfficerToLoading} officerInformation={officerToInformation} />
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        tabTitle={tabTitles}
        pageMenu={pageMenu}
        customStyle={{ ...tabStyle, width: '450px' }}
      />
    </Box>
  );
};
