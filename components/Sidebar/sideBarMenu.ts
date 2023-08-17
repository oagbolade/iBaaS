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
    groupPath: '/service',
    icon: ServiceIcon,
    subMenuItems: [
      { name: 'Customer Creation', link: '/service/customercreation' },
      { name: 'Account Reactivation', link: '/service/reactivation' },
      { name: 'Customer Balance', link: '/service/balance' },
      { name: 'Close Account', link: '/service/closeaccount' },
      { name: 'Manage Lien', link: '/service/lien' },
      { name: 'Standing Instruction', link: '/service/instruction' },
      { name: 'Customer Account Record', link: '/service/accountrecord' },
      { name: 'Office Transfer', link: '/service/officetransfer' },
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
    ],
  },
];
