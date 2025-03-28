import * as Yup from 'yup';
import { stringRegex, numericRegex } from '../admin';

export const createGroupSchema = Yup.object({
  groupID: Yup.string().required('Required'),
  groupName: Yup.string().required('Required'),
  branchcode: Yup.string().required('Required'),
  groupAddress: Yup.string().required('Required'),
  memberLimit: Yup.string().required('Required'),
  grouplimit: Yup.string().required('Required'),
  partLimit: Yup.string().required('Required'),
  groupHead: Yup.string().required('Required'),
  groupPhone: Yup.string().required('Required'),
  secretary: Yup.string().required('Required'),
  secretaryPhone: Yup.string()
    .matches(numericRegex, 'Invalid phone number, no letters allowed')
    .min(2, 'must be at least 2 digits long')
    .max(11, 'must be at most 11 digits long')
    .required('Required')
});

export const searchFieldsSchema = Yup.object({
  search: Yup.string().matches(stringRegex, 'Invalid Search Input'),
  branchDebit: Yup.number()
    .typeError('Must be a numeric value')
    .min(0, 'Branch Debit must not be less than 0'),
  branchCredit: Yup.number()
    .typeError('Must be a numeric value')
    .min(0, 'Branch Debit must not be less than 0'),
  glAccountNumber: Yup.number()
    .typeError('Must be a numeric value')
    .min(0, 'Branch Debit must not be less than 0'),
  accountNumber: Yup.number()
    .typeError('Must be a numeric value')
    .min(0, 'Branch Debit must not be less than 0')
});
