import * as Yup from 'yup';

export const signupStepOneSchema = Yup.object({
  cbnCode: Yup.string().required('Required'),
  companyName: Yup.string().required('Required'),
  emailAddress: Yup.string().required('Required'),
  companyAddress: Yup.string().required('Required'),
  headOffice: Yup.string().required('Required'),
  isNonDMBInstitution: Yup.string().required('Required')
});
