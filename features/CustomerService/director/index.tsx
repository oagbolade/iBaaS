'use client';
import { PrimaryIconButton } from '@/components/Buttons';
import { ActionButton } from '@/components/Revamp/Buttons';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { Box } from '@mui/material';
import {
  submitButton,
  cancelButton,
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { ActionMenu, MuiTableContainer } from '@/components/Table';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import Link from 'next/link';
import { FilterSection } from './FilterSection';

export interface IOptions {
  buttonTitle: string;
  link?: string;
  onClick?: () => void;
}

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <Link href="/customer-service/create-mandate">
      <ActionButton
        customStyle={{
          ...cancelButton,
        }}
        buttonTitle="Create Mandate"
      />
    </Link>
    <Link href="/customer-service/create-director">
      <PrimaryIconButton
        buttonTitle="Create Director"
        customStyle={{ ...submitButton }}
      />
    </Link>{' '}
    ,
  </Box>,
];

const directorOptions: IOptions[] = [
  { buttonTitle: 'View Details', link: '/customer-service/manage-mandate' },
  {
    buttonTitle: 'Create Mandate',
    link: '/customer-service/create-mandate',
  },
];
const directorActions: React.FC = () => {
  return <ActionMenu options={directorOptions} useDefault={false} />;
};

export const DirectorTable = () => {
  return (
    <Box mt={6}>
      <TopActionsArea actionButtons={actionButtons} />
      <Box sx={{ padding: '25px' }}>
        <FilterSection />
      </Box>
      <Box sx={{ padding: '25px', width: '100%' }}>
        <MuiTableContainer
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          showHeader={{
            hideFilterSection: true,
            mainTitle: 'Director’s Overview',
            secondaryTitle: 'See a directory of all Directors on this system.',
          }}
          ActionMenuProps={directorActions}
        />
      </Box>
    </Box>
  );
};
