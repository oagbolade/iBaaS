'use client';
import React from 'react';
import { Box } from '@mui/material';
import {
  cardsDetailsContainer,
  customReportContainer
} from '@/features/Report/CustomReport/style';
import { CustomCardsReports } from '@/components/CustomCardsReports/CustomCardsReports';

export const KYC = () => {
  const MenuConfig = [
    {
      title: 'Group',
      link: '/setup/kyc/group',
      description: 'Create and manage groups for loans and operational purposes'
    },
    {
      title: 'Education',
      link: '/setup/kyc/education',
      description: 'Manage qualifications'
    },
    {
      title: 'Industry',
      link: '/setup/kyc/industry',
      description: 'Create different industries under the sectors'
    },
    {
      title: 'Sector',
      link: '/setup/kyc/sector',
      description: 'Manage industry sectors to be used across the application'
    },
    {
      title: 'Profession',
      link: '/setup/kyc/profession',
      description: 'Set up professions for KYC purposes'
    },
    {
      title: 'Zone Setup',
      link: '/setup/kyc/zone-setup',
      description: 'Configure different zones in the locale'
    },
    {
      title: 'Relationship',
      link: '/setup/kyc/relationship',
      description: 'Manage the types of relationship between customers'
    },
    {
      title: 'Document',
      link: '/setup/kyc/document',
      description:
        'Manage the different types of documents required for KYC purposes'
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
