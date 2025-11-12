'use client';
import React from 'react';
import Link from 'next/link';
import { shortTitle, shortCardTitle } from './style';
import { PageTitle } from '@/components/Typography';
import { TableSingleAction } from '@/components/Table';

type Props = {
  title: string;
  numberOfAccounts: string;
  link?: string;
};

export const ShortCards = ({ title, numberOfAccounts, link = '' }: Props) => {
  return (
    <div className="flex items-center justify-between w-full px-4 border py-5 rounded-lg shadow  mb-5 px-10">
      <div>
        <PageTitle title={title.toUpperCase()} styles={{ ...shortTitle }} />
      </div>

      <div className="flex items-center">
        <div className="mr-24">
          <PageTitle title="Balance" styles={{ ...shortCardTitle }} />

          <PageTitle title={numberOfAccounts} styles={{ ...shortCardTitle }} />
        </div>
        <div>
          <Link href={link} style={{ marginTop: '9px' }}>
            <TableSingleAction actionName="View" />
          </Link>{' '}
        </div>
      </div>
    </div>
  );
};
