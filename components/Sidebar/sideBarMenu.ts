import {
  DashboardIcon,
  SetupIcon,
  AdminIcon,
  OperationsIcons,
  ServiceIcon,
} from '@/assets/svg';

export const sideBarMenu = [
  {
    name: 'Dashboard',
    groupPath: '/dashboard',
    icon: DashboardIcon,
    subMenuItems: [
      { name: 'Demand Deposit', link: '' },
      { name: 'Loan Product', link: '' },
    ],
  },
  {
    name: 'Setup',
    groupPath: '/setup',
    icon: SetupIcon,
    subMenuItems: [
      { name: 'Demand Deposit', link: '/setup/demand' },
      { name: 'Loan Product', link: '/setup/loan' },
      { name: 'Treasury Product', link: '/setup/treasury' },
      { name: 'Manage Branch', link: '/setup/branch' },
      { name: 'Commercial Banks', link: '/setup/banks' },
    ],
  },
  {
    name: 'Admin',
    groupPath: '/admin',
    icon: AdminIcon,
    subMenuItems: [
      { name: 'Manage Users', link: '/admin/users' },
      { name: 'Manage Roles', link: '/admin/roles' },
      { name: 'Password Change', link: '/admin/password' },
      { name: 'Manage Posting Limit', link: '/admin/limit' },
      { name: 'Manage GL Accounts', link: '/admin/accounts' },
    ],
  },
  {
    name: 'Customer Service',
    groupPath: '/customer-service',
    icon: ServiceIcon,
    subMenuItems: [
      {
        name: 'Customer Creation',
        link: '/customer-service/customer-creation',
      },
      { name: 'Account Reactivation', link: '/customer-service/reactivation' },
      { name: 'Customer Balance', link: '/customer-service/balance' },
      { name: 'Close Account', link: '/customer-service/close-account' },
      { name: 'Manage Lien', link: '/customer-service/lien' },
      { name: 'Standing Instruction', link: '/customer-service/instruction' },
      { name: 'Officer Transfer', link: '/customer-service/officer-transfer' },
      {
        name: 'Customer Account Record',
        link: '/customer-service/account-record',
      },
    ],
  },
  {
    name: 'Operations',
    groupPath: '/operation',
    icon: OperationsIcons,
    subMenuItems: [
      { name: 'Batch Posting', link: '/operation/posting' },
      { name: 'Bulk Upload', link: '/operation/upload' },
      { name: 'Cash Deposit', link: '/operation/deposit' },
      { name: 'Cash Withdrawal', link: '/operation/withdrawal' },
      { name: 'Charge Concession', link: '/operation/concession' },
      { name: 'Group Loan Posting', link: '/operation/loan' },
      { name: 'Vault Management', link: '/operation/management' },
      { name: 'Clearing', link: '/operation/clear' },
      { name: 'View Clearing Cheque', link: '/operation/cheque' },
      { name: 'Withdraw Towards Uncleared', link: '/operation/unclear' },
      { name: 'Cheques Deposit', link: '/operation/chequesDeposit' },
      { name: 'Return Cheques Reversal', link: '/operation/reversal' },
    ],
  },
];
