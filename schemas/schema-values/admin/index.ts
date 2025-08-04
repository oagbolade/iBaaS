import { getStoredUser } from '@/utils/user-storage';

import { getCurrentIsoDate } from '@/utils/getCurrentDate';

export interface CreateAccountOfficerFormValues {
  officercode: string;
  officerName: string;
  dept: string;
  branchcode: string;
  authid: string;
  auth: number;
  email: string;
  phone: string;
  targetamt: number;
  sbu: number;
  status: number;
}

export interface ChangePasswordFormValues {
  oldpassword: string;
  newpassword: string;
  sscode: string;
  passchange_date: string;
  userid: string;
}

export interface ResetUserFormValues {
  userId: string;
  lockStatus: number;
  loginStatus: string;
  resetLoginCount: number;
  resetpassword: number;
  newPassword: string;
  confirmPassword: string;
  allowMultipleLogin: number;
}

export interface CreateRoleFormValues {
  role_name: string;
  roledesc: string;
  access_days: number;
  isoperation: number;
  createdate: string;
  authid: string;
  userid: string;
  canauth: number;
  roleLevel: number;
  userTimeOut: number;
  tellerflg: number;
  rolemenu: [
    {
      menu_id: number;
    }
  ];
  authmenu: [
    {
      menu_id: number;
    }
  ];
}

export interface CreateUserFormValues {
  userid: string;
  fullname: string;
  deptcode: string;
  role_id: number;
  branchcode: string;
  reportlevel: string;
  authtype: number;
  email: string;
  acctno: string;
  smsalert: number;
  emailalert: number;
  offline: number;
  statement: number;
  phoneno: string;
  sbu: number;
  globalAuth: number;
  idleTime: number;
  status: string;
  password: string;
  menuid: number;
  rolelevel: number;
  comments: string;
  authListID: number;
  enable2FA: string;
  VirtualUser: number;
}

export const accountOfficerInitialValues: CreateAccountOfficerFormValues = {
  officercode: '',
  officerName: '',
  dept: '',
  branchcode: '',
  authid: `${getStoredUser()?.profiles.userid}`,
  status: 1,
  auth: 0,
  email: '',
  phone: '',
  targetamt: 0,
  sbu: 0
};

export interface CreatePostingLimitFormValues {
  roleId: string;
  branchCode: string;
  branchCredit: number;
  branchDebit: number;
  interBranchCr: number;
  interBranchDr: number;
  interBankCr: number;
  interBankDr: number;
  userId: string;
  authId: string;
  tdLimit: number;
  loanLimit: number;
}

export const createPostingLimitInitialValues: CreatePostingLimitFormValues = {
  roleId: '',
  branchCode: '',
  branchCredit: 0,
  branchDebit: 0,
  interBranchCr: 0,
  interBranchDr: 0,
  interBankCr: 0,
  interBankDr: 0,
  userId: `${getStoredUser()?.profiles.userid}`,
  authId: `${getStoredUser()?.profiles.userid}`,
  tdLimit: 0,
  loanLimit: 0
};

export const roleInitialValues: CreateRoleFormValues = {
  role_name: '',
  roledesc: '',
  access_days: 0,
  isoperation: 0,
  createdate: new Date().toISOString(),
  authid: `${getStoredUser()?.profiles.userid}`,
  userid: `${getStoredUser()?.profiles.userid}`,
  canauth: 0,
  roleLevel: 0,
  userTimeOut: 0,
  tellerflg: 0,
  rolemenu: [
    {
      menu_id: 0
    }
  ],
  authmenu: [
    {
      menu_id: 0
    }
  ]
};

export const changePasswordInitialValies: ChangePasswordFormValues = {
  oldpassword: '',
  newpassword: '',
  sscode: '',
  passchange_date: '',
  userid: `${getStoredUser()?.profiles.userid}`
};

export const resetUserInitialValies: ResetUserFormValues = {
  userId: '',
  lockStatus: 0,
  loginStatus: '',
  resetLoginCount: 0,
  resetpassword: 0,
  newPassword: '',
  confirmPassword: '',
  allowMultipleLogin: 0
};

export const createUserInitialValues: CreateUserFormValues = {
  userid: '',
  fullname: '',
  deptcode: '',
  role_id: getStoredUser()?.profiles.roleid || 0,
  branchcode: '',
  reportlevel: '',
  authtype: 0,
  email: '',
  acctno: '',
  smsalert: 0,
  emailalert: 0,
  offline: 0,
  statement: 0,
  phoneno: '',
  sbu: 0,
  globalAuth: 0,
  idleTime: 0,
  status: '',
  password: '',
  menuid: 8, // TODO: remove hardcoded value once infosight returns the proper menu id
  rolelevel: getStoredUser()?.profiles.rolelevel || 0,
  comments: '',
  authListID: 0,
  enable2FA: '',
  VirtualUser: 0
};

export interface CreateGlAccountFormValues {
  bkBalance: number;
  authid: string;
  userid: string;
  glNumber: string;
  acctName: string;
  branchCode: string;
  gl_ClassCode: string;
  last_Month_Balance: number;
  last_Night_Balance: number;
  tpostDebit: number;
  tpostCredit: number;
  blocked: string;
  closed: string;
  reconLen: number;
  post: number;
  bbf: number;
  prodType: string;
  pointing: number;
  typeP: string;
  populate: number;
  oldGLno: string;
  last_night_balance2: number;
  swing: number;
  last_month_balance2: number;
  last_month_balance1: number;
  dateOpened: string;
  dT_Lst_Month: string;
  last_eom2: string;
  last_eom1: string;
  currmondiff: number;
  lastmondiff: number;
  controlflag: number;
  controlGlag: number;
  currencyCode: string;
  status: number;
}

export const createGlAccountInitialValues: CreateGlAccountFormValues = {
  bkBalance: 0,
  authid: `${getStoredUser()?.companyCode}`, // TODO: This is athe approving officer's id. May need to leave this blank since we are not yet approving
  userid: `${getStoredUser()?.profiles.userid}`,
  glNumber: '',
  acctName: '',
  branchCode: '',
  gl_ClassCode: '',
  last_Month_Balance: 0,
  last_Night_Balance: 0,
  tpostDebit: 0,
  tpostCredit: 0,
  blocked: '0',
  closed: '0',
  reconLen: 0,
  bbf: 0,
  prodType: '',
  pointing: 0,
  typeP: 'c', // c  ===> credit /  d ===> debit
  swing: 0,
  populate: 0,
  post: 0, // 0 or 1  for system posting

  oldGLno: '',
  last_night_balance2: 0,
  last_month_balance2: 0,
  last_month_balance1: 0,
  dateOpened: getCurrentIsoDate(),
  dT_Lst_Month: getCurrentIsoDate(),
  last_eom2: getCurrentIsoDate(),
  last_eom1: getCurrentIsoDate(),
  currmondiff: 0,
  lastmondiff: 0,
  controlflag: 0,
  controlGlag: 0,
  currencyCode: '',
  status: 0
};
