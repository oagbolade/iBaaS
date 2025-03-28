'use client';
import React from 'react';
import { Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {
  cardsDetailsContainer,
  customReportContainer
} from '@/features/Report/CustomReport/style';
import { CustomCardsReports } from '@/components/CustomCardsReports/CustomCardsReports';

export const ProductContainer = () => {
  return (
    <Box sx={{ margin: '90px 0', padding: '0 25px 45px 0' }}>
      <Box sx={customReportContainer}>
        <Box sx={cardsDetailsContainer}>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              title="Product Setup"
              link="/setup/product-gl/product-setup"
              description="Setup and manage current & savings, term deposit and loan products"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/setup/product-gl/product-class"
              title="General Ledgers"
              description="Manage the node and class of general ledgers"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/setup/product-gl/exception"
              title="Exceptions"
              description="Set exceptions, warnings or errors on various activities or operations"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/setup/product-gl/setup-condition"
              title="Setup Condition Precedent"
              description="Configure conditions that must be met before a customer is setup on a product"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/setup/product-gl/interest"
              title="Interests"
              description="Manage and setup interest rates on various products"
            />
          </Box>
          <Box mb={{ mobile: 2, desktop: 0 }}>
            <CustomCardsReports
              link="/setup/product-gl/charge"
              title="Charges"
              description="Manage and setup various charges and associated conditions"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
