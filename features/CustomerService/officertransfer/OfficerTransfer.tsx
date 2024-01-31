'use client';
import { PrimaryIconButton } from '@/components/Buttons';
import { ActionButton } from '@/components/Revamp/Buttons';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { Box } from '@mui/material';
import {
  submitButton,
  cancelButton,
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { FilterSection } from '@/features/CustomerService/customer/FilterSection';
import {
  ActionMenu,
  MuiTableContainer,
  TableSingleAction,
} from '@/components/Table';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import Link from 'next/link';

export interface IOptions {
  buttonTitle: string;
  link?: string;
  onClick?: () => void;
}

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <Link href="/customer-service/transfer-officer">
      <PrimaryIconButton
        buttonTitle="Transfer Officer"
        customStyle={{ ...submitButton }}
      />
    </Link>{' '}
    ,
  </Box>,
];

const ActionMenuProps: React.FC = () => {
  return (
    <Link href="/customer-service/transfer-officer">
      <TableSingleAction actionName="Transfer Officer" />
    </Link>
  );
};

export const OfficeTransferTable = () => {
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
            mainTitle: 'Officer’s Overview',
            secondaryTitle: 'See a directory of all Officers on this system.',
          }}
          ActionMenuProps={ActionMenuProps}
        />
      </Box>
    </Box>
  );
};
