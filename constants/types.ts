/* eslint-disable import/no-cycle */
import React from 'react';
import {
  IAccountDetailsResults,
  ICustomerResult,
  IDirectorDetails,
  IProductInfos
} from '@/api/ResponseTypes/customer-service';

interface RoleFormValues {
  roleName: string;
  roleDescription: string;
  ideleTimeOut: string;
}

export interface IPermissionValues {
  canauth: boolean | number;
  isoperation: boolean | number;
}

interface UserFormValues {
  staffId: string;
  staffName: string;
  branch: string;
}

interface UserLogin {
  companyCode: string;
  username: string;
  password: string;
}

interface UserResetPassword {
  password: string;
  confirmPassword: string;
}

interface SignUpFormStepOneInitialValues {
  cbnCode: string;
  companyName: string;
  emailAddress: string;
  country: string;
  companyAddress: string;
  headOffice: string;
  isNonDMBInstitution: string;
}

interface PasswordChangeForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  accessKey: string;
}

interface ManageBranch {
  branchCode: string;
  branchName: string;
  branchType: string;
  mainBranch: string;
  branchAddress: string;
  country: string;
  state: string;
  town: string;
  emailAddress: string;
  fax: string;
  telePhoneNumber: string;
}

interface CommercialBank {
  bankName: string;
  bankCode: string;
  bankMnemonic: string;
}

export type ChildrenProps = {
  children: React.ReactNode;
};

export const bankValues: CommercialBank = {
  bankName: '',
  bankCode: '',
  bankMnemonic: ''
};

export const branchValues: ManageBranch = {
  branchCode: '',
  branchName: '',
  branchType: '',
  mainBranch: '',
  branchAddress: '',
  country: '',
  state: '',
  town: '',
  emailAddress: '',
  fax: '',
  telePhoneNumber: ''
};

export const loginInitialValues: UserLogin = {
  companyCode: '',
  username: '',
  password: ''
};

export const resetpasswordInitialValues: UserResetPassword = {
  password: '',
  confirmPassword: ''
};

export const signUpFormStepOneInitialValues: SignUpFormStepOneInitialValues = {
  cbnCode: '',
  companyName: '',
  emailAddress: '',
  country: '',
  companyAddress: '',
  headOffice: '',
  isNonDMBInstitution: ''
};

export const userInitialValues: UserFormValues = {
  staffId: '',
  staffName: '',
  branch: ''
};

export const passwordChange: PasswordChangeForm = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
  accessKey: ''
};

export const roleInitialValues: RoleFormValues = {
  roleName: '',
  roleDescription: '',
  ideleTimeOut: ''
};

export interface CustomStyleI {
  width?: string | number | object;
  height?: string | object;
  fontWeight?: number | object;
  fontSize?: string | object;
  variant?: 'contained' | 'outlined' | undefined;
  backgroundColor?: string;
  border?: string;
  padding?: string | object;
  margin?: string | object;
  marginTop?: string | object;
  marginBottom?: string | object;
  marginLeft?: string | object;
  marginRight?: string;
  display?: string;
  borderRadius?: string;
  justifyContent?: string | object;
  alignItems?: string;
  gap?: string;
  color?: string | object;
  position?: string | object;
}

export interface IToastActions {
  toggleSnackbar: Function;
  setMessage: Function;
  setTitle: Function;
  setSeverity: Function;
}

export interface IFetchingState {
  isError?: boolean;
  isLoading?: boolean;
  mutate?: Function;
  isPending?: boolean;
  error?: Error | null;
}

export type PreviewAccountEditingInfoProps = {
  loading?: boolean;
  accDetailsResults?: IAccountDetailsResults;
  productInfos?: IProductInfos;
};

export type PreviewDirectorInfoProps = {
  loading?: boolean;
  directorDetails?: IDirectorDetails[];
  customerResult?: ICustomerResult;
  customerId?: string;
};
