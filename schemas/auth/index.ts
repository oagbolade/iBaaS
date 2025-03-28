import * as Yup from 'yup';

export const login = Yup.object({
  companyCode: Yup.string()
    .required('Company Code is Required')
    .min(3, 'Company code is too short'),
  username: Yup.string().required('Username is Required'),
  password: Yup.string().required('Password is Required')
});

export const password = Yup.object({
  oldPassword: Yup.string().required('Required'),
  newPassword: Yup.string().required('Required'),
  confirmPassword: Yup.string().required('Required'),
  accessKey: Yup.string().required('Required')
});

export const user = Yup.object({
  staffId: Yup.string().required('Required'),
  staffName: Yup.string().required('Required'),
  branch: Yup.string().required('Required')
});
