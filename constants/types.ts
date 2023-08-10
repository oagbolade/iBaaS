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

interface ManageAccountValues{
  currency: string;
  gLType: string;
  gLTypeNode: string;
  gLTypeClass: string;
  gLAccountNumber: string;
  gLAccountDescription: string;
  BookBalance:string;
  pointing: string;
  status: string;
  pointingType: string;
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
