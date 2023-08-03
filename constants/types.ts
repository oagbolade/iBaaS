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

interface PostingLimitValues{
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

interface PasswordChangeForm{
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  accessKey: string
}

export const userInitialValues: UserFormValues = {
  staffId: '',
  staffName: '',
  branch: '',
};

export const passwordChange: PasswordChangeForm ={
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
  accessKey: ''
};

export const roleInitialValues: RoleFormValues = {
  roleName: '',
  roleDescription: '',
  ideleTimeOut: '',
};
