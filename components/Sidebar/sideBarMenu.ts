import { DashboardIcon, SetupIcon, AdminIcon } from '@/assets/svg';

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
    link: '',
    isMultiLevel: true,
    subMenuItems: [],
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
  { name: 'Customer Service', icon: AdminIcon, subMenuItems: [] },
];
