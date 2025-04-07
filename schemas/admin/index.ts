import * as Yup from 'yup';

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// Regex allows a-z, A-Z, 0-9, UNDERSCORE _, MINUS -, FULLSTOP .,
export const stringRegex = /^[a-zA-Z0-9._\- ]+$/;
export const stringRegexNoNumberAllowed = /^[a-zA-Z._\- ]+$/;
export const numericRegex = /^\d+$/;
export const stringRegexNoSpaceAllowed = /^[a-zA-Z0-9._-]+$/; // No spaces allowed at all
export const emailRegex = /@[^.]*\./;

//  a regex for decimak numbers
export const decimalRegex = /^\d+(\.\d{1,2})?$/;

export const accountOfficer = Yup.object({
  officercode: Yup.string()
    .matches(
      stringRegexNoSpaceAllowed,
      'Invalid officer code, no spaces or special characters allowed'
    )
    .required('Required'),
  officerName: Yup.string()
    .matches(stringRegex, 'Invalid officer name')
    .required('Required'),
  branchcode: Yup.string().required('Required'),
  dept: Yup.string().required('Required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .matches(emailRegex, 'invalid Email')
    .required('Required'),
  phone: Yup.string()
    .required('Required')
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, 'too short')
    .max(12, 'too long'),
  status: Yup.string().required('Required')
});

export const role = Yup.object({
  role_name: Yup.string()
    .matches(stringRegex, 'Invalid role name')
    .required('Required'),
  userTimeOut: Yup.string()
    .matches(numericRegex, 'Must be a numeric value')
    .required('Required'),
  access_days: Yup.string()
    .matches(numericRegex, 'Must be a numeric value')
    .required('Required'),
  roleLevel: Yup.number()
    .typeError('Must be a numeric value') // Handle type conversion error
    .min(1, 'Role level must be between 1 and 99')
    .max(99, 'Role level must be between 1 and 99')
    .required('Required'),
  roledesc: Yup.string().required('Required')
});

export const changePassword = Yup.object({
  newpassword: Yup.string().required('Required'),
  oldpassword: Yup.string().required('Required'),
  sscode: Yup.string()
    .required('Required')
    .min(5, 'access key should be more then 4')
    .max(10, 'access should be 10')
    .matches(numericRegex, 'invalid access key')
});

export const resetUser = Yup.object({
  userId: Yup.string().required('Required'),
  lockStatus: Yup.number().required('Required'),
  allowMultipleLogin: Yup.number().required('Required')
});

export const createGlAccount = Yup.object({
  bkBalance: Yup.number()
    .typeError('Must be a numeric value')
    .required('Required'),
  acctName: Yup.string().required('Required')
});

export const createPosting = Yup.object({
  branchCredit: Yup.number()
    .typeError('Must be a numeric value')
    .min(0, 'Branch Credit must not be less than 0')
    .required('Required'),
  branchDebit: Yup.number()
    .typeError('Must be a numeric value')
    .min(0, 'Value must not be less than 0')
    .required('Required'),
  interBranchCr: Yup.number()
    .typeError('Must be a numeric value')
    .min(0, 'Value must not be less than 0')
    .required('Required'),
  interBranchDr: Yup.number()
    .typeError('Must be a numeric value')
    .min(0, 'Value must not be less than 0')
    .required('Required'),
  interBankCr: Yup.number()
    .typeError('Must be a numeric value')
    .min(0, 'Value must not be less than 0')
    .required('Required'),
  interBankDr: Yup.number()
    .typeError('Must be a numeric value')
    .min(0, 'Value must not be less than 0')
    .required('Required'),
  tdLimit: Yup.number()
    .typeError('Must be a numeric value')
    .min(0, 'Value must not be less than 0')
    .required('Required'),
  roleId: Yup.string().required('Required'),
  loanLimit: Yup.number()
    .typeError('Must be a numeric value')
    .min(0, 'Value must not be less than 0')
    .required('Required'),
  branchCode: Yup.string().required('Required')
});

export const createUser = Yup.object({
  userid: Yup.string().required('Required'),
  fullname: Yup.string()
    .matches(stringRegex, 'Invalid full name')
    .required('Required'),
  branchcode: Yup.string().required('Required'),
  deptcode: Yup.string().required('Required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .matches(emailRegex, 'invalid Email')
    .required('Required'),
  phoneno: Yup.string()
    .required('Required')
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, 'too short')
    .max(12, 'too long'),
  status: Yup.string().required('Required')
  // password: Yup.string()
  //   .required('Password is Required')
  //   .min(8, 'Password should be at least 8 characters')
  //   .max(32, 'Password should be below 32 characters')
});
