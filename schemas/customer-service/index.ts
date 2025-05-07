import * as Yup from 'yup';
import {
  numericRegex,
  phoneRegExp,
  stringRegex,
  stringRegexNoNumberAllowed
} from '../admin';

export const closeCustomerAccount = Yup.object({
  settlementAcct: Yup.string()
    .matches(numericRegex, 'Invalid account number')
    .required('Required'),
  chargeDue: Yup.number()
    .typeError('Must be a numeric value')
    .required('Required'),
  closeBalance: Yup.number()
    .typeError('Must be a numeric value')
    .required('Required')
});

export const createCustomerAccount = Yup.object({
  oldacct: Yup.string().matches(numericRegex, 'Invalid account number'),
  acctdesc: Yup.string()
    .max(50, 'Description must be at most 50 characters long')
    .test(
      'no-space-count',
      'Description must be at most 50 characters long',
      (value) => {
        if (!value) return false;
        const noSpaceValue = value.replace(/\s+/g, '');
        return noSpaceValue.length <= 50;
      }
    ),
  cintrate: Yup.number()
    .typeError('Must be a numeric value'),
  dintrate: Yup.number()
    .typeError('Must be a numeric value')
});

export const editCheque = Yup.object({
  checktype: Yup.string().required('Required'),
  startSerialNo: Yup.number().typeError('Must be a numeric value'),
  endSerialNo: Yup.number().typeError('Must be a numeric value'),
  valueDate: Yup.string().required('Required')
});

export const moveCASAAccount = Yup.object({
  newBranch: Yup.string().required('Required')
});

export const createDirector = Yup.object({
  gender: Yup.string().required('Required'),
  firstName: Yup.string()
    .matches(
      stringRegexNoNumberAllowed,
      'Invalid first name, no numbers allowed'
    )
    .required('Required'),
  othername: Yup.string().matches(
    stringRegexNoNumberAllowed,
    'Invalid middle name, no numbers allowed'
  ),
  surName: Yup.string()
    .matches(
      stringRegexNoNumberAllowed,
      'Invalid last name, no numbers allowed'
    )
    .required('Required'),
  dob: Yup.string().required('Required'),
  nationality: Yup.string().required('Required'),
  statecode: Yup.string().required('Required'),
  townCode: Yup.string().required('Required'),
  address: Yup.string()
    .max(80, 'Address must be at most 80 characters long')
    .required('Required')
    .test(
      'no-space-count',
      'Address must be at most 80 characters long',
      (value) => {
        if (!value) return false;
        const noSpaceValue = value.replace(/\s+/g, '');
        return noSpaceValue.length <= 80;
      }
    ),
  phone: Yup.string()
    .required('Required')
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, 'too short')
    .max(11, 'too long')
});

export const reactivateAccount = Yup.object({
  chargeDue: Yup.string().required('Required'),
  valuedate: Yup.string().required('Required'),
  authid: Yup.string().required('Required')
});

export const rangeCheque = Yup.object({
  accountNumber: Yup.string().required('Required'),
  chequebooktype: Yup.string().required('Required'),
  accounttype: Yup.string().required('Required'),
  branchToCollect: Yup.string().required('Required'),
  selectedDate: Yup.string().required('Required'),
  startSerialNo: Yup.string().required('Required'),
  endSerialNo: Yup.string().required('Required'),
  narration: Yup.string().required('Required'),
  costtocustomer: Yup.string().required('Required'),
  costofchequebk: Yup.string().required('Required')
});

export const createLien = Yup.object({
  holdAmount: Yup.string().matches(numericRegex, 'Invalid amount'),
  reasoncode: Yup.string().required('Required')
});

export const addGroup = Yup.object({
  groupID: Yup.string()
    .matches(stringRegex, 'Invalid group id')
    .required('Required'),
  groupName: Yup.string()
    .matches(stringRegex, 'Invalid group name')
    .min(2, 'Group name must be at least 2 characters long')
    .max(50, 'Group name must be at most 50 characters long')
    .test(
      'no-space-count',
      'Group name must be at most 50 characters long',
      (value) => {
        if (!value) return false;
        const noSpaceValue = value.replace(/\s+/g, '');
        return noSpaceValue.length <= 50;
      }
    )
    .required('Required')
});

export const individualCustomerPersonalDetails = {
  title: Yup.string().required('Required'),
  surName: Yup.string()
    .matches(
      stringRegexNoNumberAllowed,
      'Invalid surname, no numbers or special character allowed'
    )
    .min(2, 'Surname must be at least 2 characters long')
    .max(50, 'Surname must be at most 50 characters long')
    .test(
      'no-space-count',
      'Surname must be at most 50 characters long',
      (value) => {
        if (!value) return false;
        const noSpaceValue = value.replace(/\s+/g, '');
        return noSpaceValue.length <= 50;
      }
    )
    .required('Required'),
  firstName: Yup.string()
    .matches(
      stringRegexNoNumberAllowed,
      'Invalid first name,  no numbers or special character allowed'
    )
    .min(2, 'First name must be at least 2 characters long')
    .max(50, 'First name must be at most 50 characters long')
    .test(
      'no-space-count',
      'First name must be at most 50 characters long',
      (value) => {
        if (!value) return false;
        const noSpaceValue = value.replace(/\s+/g, '');
        return noSpaceValue.length <= 50;
      }
    )
    .required('Required'),
  dob: Yup.string().required('Required'),
  nationality: Yup.string().required('Required'),
  mothermdName: Yup.string()
    .matches(
      stringRegexNoNumberAllowed,
      'Invalid maiden name,  no numbers or special character allowed'
    )
    .required('Required'),
  bvn: Yup.string()
    .matches(numericRegex, 'Invalid bvn')
    .min(11, 'Bank verification number must be 11 characters long')
    .max(11, 'Bank verification number must be 11 characters long')
    .required('Required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Required'),
  phone1: Yup.string()
    .required('Required')
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, 'too short')
    .max(11, 'too long'),
  phone2: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, 'too short')
    .max(11, 'too long'),
  natIDNo: Yup.string()
    .matches(numericRegex, 'Invalid national id')
    .min(11, 'National identification number must be 11 characters long')
    .max(11, 'National identification number must be 11 characters long')
    .required('Required'),
  taxIDNo: Yup.string()
    .matches(stringRegex, 'Invalid tax id')
    .min(10, 'Tax identification number must be 10 characters long')
    .max(10, 'Tax identification number must be 10 characters long')
    .required('Required'),
  residentCountry: Yup.string().required('Required'),
  residentStatecode: Yup.string().required('Required'),
  address: Yup.string()
    .max(80, 'Address must be at most 80 characters long')
    .required('Required')
    .test(
      'no-space-count',
      'Address must be at most 80 characters long',
      (value) => {
        if (!value) return false;
        const noSpaceValue = value.replace(/\s+/g, '');
        return noSpaceValue.length <= 80;
      }
    ),
  othername: Yup.string().matches(
    stringRegexNoNumberAllowed,
    'Invalid middle name,  no numbers or special character allowed'
  )
};

export const corporateCustomerPersonalDetails = {
  compname: Yup.string()
    .matches(stringRegex, 'Invalid company name')
    .min(2, 'Company name must be at least 2 characters long')
    .max(50, 'Company name must be at most 50 characters long')
    .test(
      'no-space-count',
      'Company name must be at most 50 characters long',
      (value) => {
        if (!value) return false;
        const noSpaceValue = value.replace(/\s+/g, '');
        return noSpaceValue.length <= 50;
      }
    )
    .required('Required'),
  regno: Yup.string()
    .matches(numericRegex, 'Invalid registration number')
    .required('Required'),
  nationality: Yup.string().required('Required'),
  companyStatecode: Yup.string().required('Required'),
  companyTowncode: Yup.string().required('Required'),
  address: Yup.string()
    .max(80, 'Address must be at most 80 characters long')
    .required('Required')
    .test(
      'no-space-count',
      'Address must be at most 80 characters long',
      (value) => {
        if (!value) return false;
        const noSpaceValue = value.replace(/\s+/g, '');
        return noSpaceValue.length <= 80;
      }
    ),
  bvn: Yup.string()
    .matches(numericRegex, 'Invalid bvn')
    .min(11, 'Bank verification number must be 11 characters long')
    .max(11, 'Bank verification number must be 11 characters long')
    .required('Required'),
  taxIDNo: Yup.string()
    .matches(stringRegex, 'Invalid tax id')
    .min(10, 'Tax identification number must be 10 characters long')
    .max(10, 'Tax identification number must be 10 characters long')
    .required('Required'),
  contact: Yup.string().required('Required'),
  compObjective: Yup.string()
    .max(50, 'Objective must be at most 50 characters long')
    .required('Required')
    .test(
      'no-space-count',
      'Objective must be at most 50 characters long',
      (value) => {
        if (!value) return false;
        const noSpaceValue = value.replace(/\s+/g, '');
        return noSpaceValue.length <= 50;
      }
    ),
  phone1: Yup.string()
    .required('Required')
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, 'too short')
    .max(11, 'too long'),
  secName: Yup.string().required('Required'),
  secphone: Yup.string()
    .required('Required')
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, 'too short')
    .max(11, 'too long'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Required'),
  turnOver: Yup.string().required('Required')
};

export const createCustomer = {
  // Business Details start
  bizState: Yup.string().required('Required'),
  bizCtry: Yup.string().required('Required'),
  bizAddress: Yup.string()
    .max(80, 'Address must be at most 80 characters long')
    .required('Required')
    .test(
      'no-space-count',
      'Address must be at most 80 characters long',
      (value) => {
        if (!value) return false;
        const noSpaceValue = value.replace(/\s+/g, '');
        return noSpaceValue.length <= 80;
      }
    ),
  bizPhone3: Yup.string()
    .required('Required')
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, 'too short')
    .max(11, 'too long'),
  sigClass: Yup.string().required('Required'),
  bizTowncode: Yup.string().required('Required'),

  // Next of Kin Details start
  nextOfKin: Yup.string()
    .matches(
      stringRegexNoNumberAllowed,
      'Invalid next of kin name, no numbers or special character allowed'
    )
    .min(2, 'Next of kin name must be at least 2 characters long')
    .max(50, 'Next of kin name must be at most 50 characters long')
    .test(
      'no-space-count',
      'Next of Kin name must be at most 50 characters long',
      (value) => {
        if (!value) return false;
        const noSpaceValue = value.replace(/\s+/g, '');
        return noSpaceValue.length <= 50;
      }
    )
    .required('Required'),
  nextOfKinphone: Yup.string()
    .required('Required')
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, 'too short')
    .max(11, 'too long'),
  nextOfKinaddr: Yup.string()
    .max(80, 'Address must be at most 80 characters long')
    .required('Required')
    .test(
      'no-space-count',
      'Address must be at most 80 characters long',
      (value) => {
        if (!value) return false;
        const noSpaceValue = value.replace(/\s+/g, '');
        return noSpaceValue.length <= 80;
      }
    ),
  nextOfKintown: Yup.string().required('Required'),
  nextOfKinState: Yup.string().required('Required'),
  nextOfKinRel: Yup.string().required('Required'),

  // Identification Details start
  iDno: Yup.string()
    .matches(
      numericRegex,
      'Invalid Id number, no letters or special character allowed'
    )
    .required('Required'),

  // Referrer's Details start
  refname: Yup.string()
    .matches(
      stringRegexNoNumberAllowed,
      'Invalid name, no numbers or special character allowed'
    )
    .min(2, 'Referrer\'s name must be at least 2 characters long')
    .max(50, 'Referrer\'s name must be at most 50 characters long')
    .test(
      'no-space-count',
      'Name must be at most 50 characters long',
      (value) => {
        if (!value) return false;
        const noSpaceValue = value.replace(/\s+/g, '');
        return noSpaceValue.length <= 50;
      }
    ),
  refphone: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, 'too short')
    .max(11, 'too long')
};

export const classifyAccount = Yup.object({
  provisionType: Yup.number()
    .integer('Provision type must be a number')
    .required('Provision type is required'),
  classify: Yup.number()
    .integer('Classify must be a number')
    .required('Classify is required')
});

export const officerTransferSchema = Yup.object({
  transferType: Yup.string().required('Transfer Type is Required')
});
