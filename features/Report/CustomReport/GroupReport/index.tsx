'use client';
import * as React from 'react';
import { Box } from '@mui/material';
import { ShortCardWithAccordion } from './ShortCardWithAccordion';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import {
  customerServiceReportsGroup,
  operationalReportsGroup
} from '@/constants/Reports/groupReport';

export const GroupReport = () => {
  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '50px'
      }}
    >
      <TopOverViewSection useBackButton />
      <Box
        sx={{
          padding: '25px',
          width: '100%'
        }}
      >
        <ShortCardWithAccordion
          groups={customerServiceReportsGroup}
          cardTitle="Customer Service Reports"
        />
        <ShortCardWithAccordion
          groups={operationalReportsGroup}
          cardTitle="Operational Reports"
        />
        <ShortCardWithAccordion
          groups={customerServiceReportsGroup}
          cardTitle="Administrative Audit Reports"
        />
        <ShortCardWithAccordion
          groups={customerServiceReportsGroup}
          cardTitle="Monthly Management Reports"
        />
        <ShortCardWithAccordion
          groups={customerServiceReportsGroup}
          cardTitle="Fincon Report"
        />
        <ShortCardWithAccordion
          groups={customerServiceReportsGroup}
          cardTitle="Mis Reports"
        />
        <ShortCardWithAccordion
          groups={customerServiceReportsGroup}
          cardTitle="Internal Control Report"
        />
        <ShortCardWithAccordion
          groups={customerServiceReportsGroup}
          cardTitle="Regulatory Reports"
        />
        <ShortCardWithAccordion
          groups={customerServiceReportsGroup}
          cardTitle="Monthly Management Reports"
        />
      </Box>
    </Box>
  );
};
