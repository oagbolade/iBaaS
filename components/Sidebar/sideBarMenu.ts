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
} from '@/assets/svg';

export const sideBarMenu: SidebarMenuItem[] = [
  {
    name: 'Dashboard',
    groupPath: '/dashboard',
    icon: DashboardIcon,
    hideMenuItem: false,
    subMenuItems: [
      { name: 'Demand Deposit', link: '', hideSubMenuItem: false },
      { name: 'Loan Product', link: '', hideSubMenuItem: false },
    ],
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
      { name: 'Manage Users', link: '/admin/users', hideSubMenuItem: false },
      { name: 'Manage Roles', link: '/admin/roles', hideSubMenuItem: false },
      {
        name: 'Password Change',
        link: '/admin/password',
        hideSubMenuItem: false,
      },
      {
        name: 'Manage Posting Limit',
        link: '/admin/limit',
        hideSubMenuItem: false,
      },
      {
        name: 'Manage GL Accounts',
        link: '/admin/accounts',
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
        name: 'Customer Creation',
        link: '/customer-service/customer-creation',
        hideSubMenuItem: false,
      },
      {
        name: 'Account Reactivation',
        link: '/customer-service/reactivation',
        hideSubMenuItem: false,
      },
      {
        name: 'Customer Balance',
        link: '/customer-service/balance',
        hideSubMenuItem: false,
      },
      {
        name: 'Close Account',
        link: '/customer-service/close-account',
        hideSubMenuItem: false,
      },
      {
        name: 'Manage Lien',
        link: '/customer-service/lien',
        hideSubMenuItem: false,
      },
      {
        name: 'Standing Instruction',
        link: '/customer-service/instruction',
        hideSubMenuItem: false,
      },
      {
        name: 'Officer Transfer',
        link: '/customer-service/officer-transfer',
        hideSubMenuItem: false,
      },
      {
        name: 'Customer Account Record',
        link: '/customer-service/account-record',
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
    name: 'Operations',
    groupPath: '/operation',
    icon: OperationsIcons,
    hideMenuItem: false,
    subMenuItems: [
      {
        name: 'Batch Posting',
        link: '/operation/posting',
        hideSubMenuItem: false,
      },
      {
        name: 'Bulk Upload',
        link: '/operation/upload',
        hideSubMenuItem: false,
      },
      {
        name: 'Cash Deposit',
        link: '/operation/deposit',
        hideSubMenuItem: false,
      },
      {
        name: 'Cash Withdrawal',
        link: '/operation/withdrawal',
        hideSubMenuItem: false,
      },
      {
        name: 'Charge Concession',
        link: '/operation/concession',
        hideSubMenuItem: false,
      },
      {
        name: 'Group Loan Posting',
        link: '/operation/loan',
        hideSubMenuItem: false,
      },
      {
        name: 'Vault Management',
        link: '/operation/management',
        hideSubMenuItem: false,
      },
      { name: 'Clearing', link: '/operation/clear', hideSubMenuItem: false },
      {
        name: 'View Clearing Cheque',
        link: '/operation/cheque',
        hideSubMenuItem: false,
      },
      {
        name: 'Withdraw Towards Uncleared',
        link: '/operation/unclear',
        hideSubMenuItem: false,
      },
      {
        name: 'Cheques Deposit',
        link: '/operation/chequesDeposit',
        hideSubMenuItem: false,
      },
      {
        name: 'Return Cheques Reversal',
        link: '/operation/reversal',
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
    ],
  },
  // ...hiddenRoutes end
];
