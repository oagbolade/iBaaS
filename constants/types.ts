interface RoleFormValues {
  roleName: string;
  roleDescription: string;
  ideleTimeOut: string;
}

interface UserFormValues {
  staffId: string;
  staffName: string;
  branch: string;
}

interface PostingLimitValues {
  role: string;
  branch: string;
  creditLimit: string;
  crBranchLimit: string;
  crBankLimit: string;
  depositLimit: string;
  debitLimit: string;
  drBranchLimit: string;
  drBankLimit: string;
  drLoadLimit: string;
}

interface ManageAccountValues {
  currency: string;
  gLType: string;
  gLTypeNode: string;
  gLTypeClass: string;
  gLAccountNumber: string;
  gLAccountDescription: string;
  BookBalance: string;
  pointing: string;
  status: string;
  pointingType: string;
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
export const bankValues: CommercialBank = {
  bankName: '',
  bankCode: '',
  bankMnemonic: '',
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
  telePhoneNumber: '',
};
export const userInitialValues: UserFormValues = {
  staffId: '',
  staffName: '',
  branch: '',
};

export const passwordChange: PasswordChangeForm = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
  accessKey: '',
};

export const roleInitialValues: RoleFormValues = {
  roleName: '',
  roleDescription: '',
  ideleTimeOut: '',
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
