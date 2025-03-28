'use client';
import React from 'react';
import { Box } from '@mui/material';
import {
  cardsDetailsContainer,
  customReportContainer
} from '@/features/Report/CustomReport/style';
import { CustomCardsReports } from '@/components/CustomCardsReports/CustomCardsReports';

export const Company = () => {
  const MenuConfig = [
    {
      title: ' Company',
      link: '/setup/company/setup-company',
      description: 'Information about the financial institution'
    },
    {
      title: 'Branch',
      link: '/setup/company/branch',
      description: 'Manage branch(es) of your organization'
    },
    {
      title: 'Country',
      link: '/setup/company/country',
      description:
        'Manage the available countries to be selected for operations, KYC, etc'
    },
    {
      title: 'Town',
      link: '/setup/company/town',
      description: 'Manage the towns in the available states'
    },
    {
      title: 'Region',
      link: '/setup/company/region',
      description: 'Manage the regions in the available countries'
    },
    {
      title: 'Holidays',
      link: '/setup/company/holidays',
      description: 'Setup bank holidays, public holidays, etc'
    },
    {
      title: 'State Management',
      link: '/setup/company/state-management',
      description: 'Manage the states in the available regions'
    },
    {
      title: 'Department',
      link: '/setup/company/department',
      description: 'Set up and manage the departments within the bank'
    }
  ];

  return (
    <Box sx={{ margin: '90px 0', padding: '0 25px 45px 0' }}>
      <Box sx={customReportContainer}>
        <Box sx={cardsDetailsContainer}>
          {MenuConfig.map((menus) => (
            <Box mb={{ mobile: 2, desktop: 0 }}>
              <CustomCardsReports
                title={menus.title}
                link={menus.link}
                description={menus.description}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
