'use client';
import { Box } from '@mui/material';
import React from 'react';
import Link from 'next/link';
import {
  shortCardStyle,
  shortCard,
  shortcards,
  shortscard,
  shortCardtitle,
  shortCardText,
  shortTitle,
  shortCardTitle
} from './style';
import { PageTitle } from '@/components/Typography';
import { TableSingleAction } from '@/components/Table';

type Props = {
  title: string;
  numberOfAccounts: string;
  link?: string;
};

export const ShortCards = ({ title, numberOfAccounts, link = '' }: Props) => {
  return (
    <Box sx={shortCard}>
      <Box sx={shortcards}>
        <Box sx={shortscard}>
          <Box sx={shortCardStyle}>
            <Box sx={shortCardtitle}>
              <Box sx={shortCardText}>
                <Box>
                  <PageTitle title={title} styles={{ ...shortTitle }} />
                </Box>
                <PageTitle
                  title={numberOfAccounts}
                  styles={{ ...shortCardTitle }}
                />
              </Box>
              <Link
                href={link}
                style={{ marginLeft: '470px', marginTop: '9px' }}
              >
                <TableSingleAction actionName="View" />
              </Link>{' '}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
