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

export const userInitialValues: UserFormValues = {
  staffId: '',
  staffName: '',
  branch: '',
};

export const roleInitialValues: RoleFormValues = {
  roleName: '',
  roleDescription: '',
  ideleTimeOut: '',
};
