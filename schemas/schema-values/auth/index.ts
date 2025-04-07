import { v4 as uuidv4 } from 'uuid';
import { IFetchingState } from '@/constants/types';

interface UserFormValues {
  staffId: string;
  staffName: string;
  branch: string;
}

interface CreateAccountOfficerFormValues {
  officercode: string;
  officerName: string;
  dept: string;
  branchcode: string;
  staffID: string;
  staffStatus: string;
  authid: string;
  userid: string;
  auth: number;
  email: string;
  phone: string;
  targetamt: number;
  sbu: number;
}

interface UserLogin {
  companyCode: string;
  username: string;
  password: string;
}

interface PasswordChangeForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  accessKey: string;
}

export interface NipLoginValue {
  username: string | undefined;
  password: string | undefined;
}
export interface Aut2FaValue {
  userId: string;
  otp: string;
  tenantId: string;
}
export interface Aut2FaChcheckValue {
  userId: string;
  tenantId: string;
}

export interface NibbsBankRequest {
  sessionID: string;
  nameEnquiryRef: string;
  destinationInstitutionCode: string;
  channelCode: string;
  beneficiaryAccountName: string;
  beneficiaryAccountNumber: string;
  beneficiaryBankVerificationNumber: string;
  beneficiaryKYCLevel: string;
  originatorAccountName: string;
  originatorAccountNumber: string;
  originatorBankVerificationNumber: string;
  originatorKYCLevel: string;
  transactionLocation: string;
  narration: string;
  paymentReference: string;
  amount: number;
}

export interface NipLoginResponse {
  message: string;
  code: string;
  time: string;
  data: {
    responseCode: string;
    responseDescription: string;
    token: string;
    expiresAt: string;
    tenant: {
      bankName: string;
      productId: string;
      tenantCode: string;
      payableAccount: string;
      receivableAccount: string;
      userId: string;
      nibssInstitutionCode: string;
      email: string;
      username: string;
      tenantId: string;
    };
  };
}

export const loginInitialValues: UserLogin = {
  companyCode: '',
  username: '',
  password: ''
};
export const Auth2FaInitialValues: Aut2FaValue = {
  userId: '',
  otp: '',
  tenantId: ''
};
export const Auth2FaCheckInitialValues: Aut2FaChcheckValue = {
  userId: '',
  tenantId: ''
};
export const accountOfficerInitialValues: CreateAccountOfficerFormValues = {
  officercode: '221',
  officerName: '',
  dept: 'Finance',
  branchcode: '1',
  // staffID: uuidv4(),
  staffID: '22133',
  staffStatus: '1',
  authid: '1',
  userid: 'admin001', // todo: get from local storage
  auth: 0,
  email: '',
  phone: '',
  targetamt: 0,
  sbu: 0
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
