import { SidebarMenuItem } from './SideBarDropdown';
import {
  DashboardIcon,
  SetupIcon,
  AdminIcon,
  OperationsIcons,
  ServiceIcon,
  LoanIcon,
  ReportIcon,
  RequestsIcon,
  FinanceIcon,
} from '@/assets/svg';

export const sideBarMenu: SidebarMenuItem[] = [
  {
    name: 'Dashboard',
    groupPath: '/dashboard',
    icon: DashboardIcon,
    hideMenuItem: false,
    subMenuItems: [],
  },
  {
    name: 'Setup',
    groupPath: '/setup',
    icon: SetupIcon,
    hideMenuItem: false,
    subMenuItems: [
      { name: 'Demand Deposit', link: '/setup/demand', hideSubMenuItem: false },
      { name: 'Loan Product', link: '/setup/loan', hideSubMenuItem: false },
      {
        name: 'Treasury Product',
        link: '/setup/treasury',
        hideSubMenuItem: false,
      },
      { name: 'Manage Branch', link: '/setup/branch', hideSubMenuItem: false },
      {
        name: 'Commercial Banks',
        link: '/setup/banks',
        hideSubMenuItem: false,
      },
    ],
  },
  {
    name: 'Admin',
    groupPath: '/admin',
    icon: AdminIcon,
    hideMenuItem: false,
    subMenuItems: [
      { name: 'Users', link: '/admin/users', hideSubMenuItem: false },
      { name: 'Roles', link: '/admin/roles', hideSubMenuItem: false },
      {
        name: 'Account Officers',
        link: '/admin/account-officers',
        hideSubMenuItem: false,
      },
      {
        name: 'Posting Limits',
        link: '/admin/posting-limit',
        hideSubMenuItem: false,
      },
      {
        name: 'GL Accounts',
        link: '/admin/gl-account',
        hideSubMenuItem: false,
      },
    ],
  },
  {
    name: 'Requests',
    groupPath: '/requests',
    icon: RequestsIcon,
    subMenuItems: [],
    hideMenuItem: false,
  },
  {
    name: 'Customer Service',
    groupPath: '/customer-service',
    icon: ServiceIcon,
    hideMenuItem: false,
    subMenuItems: [
      {
        name: 'Customer',
        link: '/customer-service/customer',
        hideSubMenuItem: false,
      },
      {
        name: 'Groups',
        link: '/customer-service/group',
        hideSubMenuItem: false,
      },
      {
        name: 'Officers',
        link: '/customer-service/officer-transfer',
        hideSubMenuItem: false,
      },
      {
        name: 'Directors',
        link: '/customer-service/director',
        hideSubMenuItem: false,
      },
    ],
  },
  {
    name: 'Credit Facility',
    groupPath: '/loan',
    icon: LoanIcon,
    hideMenuItem: false,
    subMenuItems: [
      {
        name: 'Loan Directory',
        link: '/loan/loan-directory',
        hideSubMenuItem: false,
      },
      {
        name: 'Pending Applications',
        link: '/loan/pending-applications',
        hideSubMenuItem: false,
      },
      { name: 'Overdrafts', link: '/loan/overdrafts', hideSubMenuItem: false },
    ],
  },
  {
    name: 'Finance Mgt',
    groupPath: '/finance',
    icon: FinanceIcon,
    hideMenuItem: false,
    subMenuItems: [
      {
        name: 'Accounts',
        link: '/finance/account',
        hideSubMenuItem: false,
      },
      {
        name: 'General Ledgers',
        link: '/finance/general-ledger',
        hideSubMenuItem: false,
      },
    ],
  },
  {
    name: 'Operations',
    groupPath: '/operation',
    icon: OperationsIcons,
    hideMenuItem: false,
    subMenuItems: [
      {
        name: 'Cash',
        link: '/operation/cash',
        hideSubMenuItem: false,
      },
      {
        name: 'Transfer',
        link: '/operation/transfer',
        hideSubMenuItem: false,
      },
      {
        name: 'Cheque',
        link: '/operation/cheque',
        hideSubMenuItem: false,
      },
      {
        name: 'Group Posting',
        link: '/operation/loan',
        hideSubMenuItem: false,
      },
      {
        name: 'Vault Management',
        link: '/operation/management',
        hideSubMenuItem: false,
      },
    ],
  },
  {
    name: 'Reports',
    groupPath: '/report',
    icon: ReportIcon,
    hideMenuItem: false,
    subMenuItems: [
      { name: 'Overview', link: '/report/overview', hideSubMenuItem: false },
      {
        name: 'Custom Report',
        link: '/report/custom-report',
        hideSubMenuItem: false,
      },
      {
        name: 'Audit Trail',
        link: '/report/audit-trail',
        hideSubMenuItem: false,
      },
    ],
  },
  // ...hiddenRoutes start
  {
    name: 'Hidden Routes',
    groupPath: '/hidden',
    icon: null,
    hideMenuItem: true,
    subMenuItems: [
      {
        name: 'Dashboard',
        link: '/dashboard',
        hideSubMenuItem: true,
      },
      // Report
      {
        name: 'Account Enquiry',
        link: '/report/custom-report/account-enquiry',
        hideSubMenuItem: true,
      },
      {
        name: 'Custom Report',
        link: '/report/custom-report',
        hideSubMenuItem: true,
      },
      {
        name: 'Audit Trail',
        link: '/report/audit-trail',
        hideSubMenuItem: true,
      },
      {
        name: 'Statement of Account',
        link: '/report/custom-report/statement-account',
        hideSubMenuItem: true,
      },
      {
        name: 'Cabal',
        link: '/report/custom-report/group-report/customer-service/cabal',
        hideSubMenuItem: true,
      },
      // Administrator
      {
        name: 'Create User',
        link: '/admin/users/create',
        hideSubMenuItem: true,
      },
      {
        name: 'Reset User',
        link: '/admin/users/reset',
        hideSubMenuItem: true,
      },
      {
        name: 'View Role',
        link: '/admin/roles/view',
        hideSubMenuItem: true,
      },
      {
        name: 'Create Role',
        link: '/admin/roles/create',
        hideSubMenuItem: true,
      },
      {
        name: 'Create Account Officer',
        link: '/admin/account-officers/create',
        hideSubMenuItem: true,
      },
      {
        name: 'Create Posting Limit',
        link: '/admin/posting-limit/create',
        hideSubMenuItem: true,
      },
      {
        name: 'Create GL Account',
        link: '/admin/gl-account/create',
        hideSubMenuItem: true,
      },
      // Finance Management
      {
        name: 'Create General Ledger',
        link: '/finance/general-ledger/create',
        hideSubMenuItem: true,
      },
      {
        name: 'Classify Account',
        link: '/finance/account/classify',
        hideSubMenuItem: true,
      },
    ],
  },
  // ...hiddenRoutes end
];
