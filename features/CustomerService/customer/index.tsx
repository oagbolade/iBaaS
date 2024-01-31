'use client';
import { PrimaryIconButton } from '@/components/Buttons';
import { ActionButton } from '@/components/Revamp/Buttons';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { Box } from '@mui/material';
import {
  submitButton,
  cancelButton,
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { FilterSection } from './FilterSection';
import { ActionMenu, MuiTableContainer } from '@/components/Table';
import MOCK_DATA from '@/constants/MOCK_DATA.json';
import { MOCK_COLUMNS } from '@/constants/MOCK_COLUMNS';
import { Tabs } from '@/components/Revamp/Tabs';
import { inputFields } from './style';
import { AccountFilterSection } from './AccountFitterSection';
import Link from 'next/link';

export interface IOptions {
  buttonTitle: string;
  link?: string;
  onClick?: () => void;
}

export const actionButtons: any = [
  <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
    <Link href="/customer-service/create-account">
      <ActionButton
        customStyle={{ ...cancelButton }}
        buttonTitle="Create Account "
      />
    </Link>
    ,
    <Link href="/customer-service/create-customer">
      <PrimaryIconButton
        buttonTitle="Create Customer"
        customStyle={{ ...submitButton }}
      />
    </Link>
    ,
  </Box>,
];

const AccountOverviewOptions: IOptions[] = [
  { buttonTitle: 'Edit Account', link: '/customer-service/edit-account' },
  { buttonTitle: 'Manage Mandate', link: '/customer-service/manage-mandate' },
  { buttonTitle: 'Manage Lien', link: '/customer-service/lien' },
  { buttonTitle: 'Edit Chequebook', link: '/customer-service/edit-chequebook' },
  { buttonTitle: 'Range Cheque', link: '/customer-service/range-cheque' },
  { buttonTitle: 'Move CASA', link: '/customer-service/casa-account' },
  {
    buttonTitle: 'Reactivate Account',
    link: '/customer-service/reactivate-account',
  },
  {
    buttonTitle: 'Deactivate Account',
    link: '/customer-service/deactivate-account',
  },
  { buttonTitle: 'Close Account', link: '/customer-service/close-account' },
];

const AccoutOverviewActions: React.FC = () => {
  return <ActionMenu options={AccountOverviewOptions} useDefault={false} />;
};
const customerOverviewOptions: IOptions[] = [
  {
    buttonTitle: 'View Details',
    link: '/customer-service/view-customer-details',
  },
  { buttonTitle: 'Edit Customer', link: '/customer-service/create-customer' },
];
const customerOverviewActions: React.FC = () => {
  return <ActionMenu options={customerOverviewOptions} useDefault={false} />;
};
const CustomerOverviewTable = () => {
  return (
    <Box mt={6}>
      <FilterSection />
      <Box mt={6}>
        <MuiTableContainer
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          showHeader={{
            hideFilterSection: true,
            mainTitle: 'Customer Overview',
            secondaryTitle: 'See a directory of all customers on this system.',
          }}
          ActionMenuProps={customerOverviewActions}
        />
      </Box>
    </Box>
  );
};

const AccountOverviewTable = () => {
  return (
    <Box mt={6}>
      <AccountFilterSection />
      <Box mt={6}>
        <MuiTableContainer
          columns={MOCK_COLUMNS}
          data={MOCK_DATA}
          showHeader={{
            mainTitle: 'Account Overview',
            secondaryTitle: 'See a directory of all accounts on this system.',
            hideFilterSection: true,
          }}
          ActionMenuProps={AccoutOverviewActions}
        />
      </Box>
    </Box>
  );
};
const tabTitle = ['Customer Overview', 'Account Overview'];
const pageMenu = [<CustomerOverviewTable />, <AccountOverviewTable />];
const PreviewTable = () => {
  return (
    <Box>
      <Tabs
        tabTitle={tabTitle}
        pageMenu={pageMenu}
        customStyle={{ ...inputFields }}
      />
    </Box>
  );
};

export const CustomerContainer = () => {
  return (
    <Box sx={{ marginTop: '60px' }}>
      <TopActionsArea actionButtons={actionButtons} />
      <Box sx={{ padding: '25px', width: '100%' }}>
        <PreviewTable />
      </Box>
    </Box>
  );
};
