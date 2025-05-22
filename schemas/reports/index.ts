import * as Yup from 'yup';
import { stringRegex, numericRegex } from '../admin';

export const searchFieldsSchema = Yup.object({
  search: Yup.string().matches(stringRegex, 'Invalid Search Input'),
  branchDebit: Yup.number()
    .typeError('Must be a numeric value')
    .min(0, 'Branch Debit must not be less than 0'),
  branchCredit: Yup.number()
    .typeError('Must be a numeric value')
    .min(0, 'Branch Debit must not be less than 0')
});

export const chequebookSchema = Yup.object({
  accountNumber: Yup.string().matches(stringRegex, 'Invalid Search Input'),
  branchID: Yup.string().matches(stringRegex, 'Invalid Search Input')
});

export const dormantAccountSchema = Yup.object({
  accountNumber: Yup.string().matches(stringRegex, 'Invalid Search Input'),
  searchWith: Yup.string().matches(stringRegex, 'Invalid Search Input'),
   branchID: Yup.string()
    .matches(stringRegex, 'Invalid Search Input')
    .required('Branch is required'),
  status: Yup.string()
    .matches(stringRegex, 'Invalid Search Input')
    .required('Status is required')
});

export const customerBalanceSchema = Yup.object({
  branchID: Yup.string().matches(stringRegex, 'Invalid Search Input'),
  searchWith: Yup.string().matches(stringRegex, 'Invalid Search Input'),
  pCode: Yup.string().matches(stringRegex, 'Invalid Search Input')
  // TODO : Uncomment when the API payload is updated
  // status: Yup.string().matches(stringRegex, 'Invalid Search Input')
  // startDate : Yup.string().matches(stringRegex, 'Invalid Search Input'),
  // endDate : Yup.string().matches(stringRegex, 'Invalid Search Input')
});

export const plainTrailBalanceSchema = Yup.object({
  branchID: Yup.string().matches(stringRegex, 'Invalid Search Input').required('Branch name is required'),
  reportType: Yup.string().matches(stringRegex, 'Invalid Search Input').required('Report type is required'),
});

export const chartOfAccountSchema = Yup.object({
  branchID: Yup.string().matches(stringRegex, 'Invalid Search Input'),
  searchWith: Yup.string().matches(stringRegex, 'Invalid Search Input')
});

export const trialBalanceGroupSchema = Yup.object({
  branchID: Yup.string().matches(stringRegex, 'Invalid Search Input'),
  customerID: Yup.string().matches(stringRegex, 'Invalid Search Input'),
  reportType: Yup.string().matches(stringRegex, 'Invalid Search Input')
});

export const trialBalanceSchema = Yup.object({
  branchID: Yup.string().matches(stringRegex, 'Invalid Search Input'),
  customerID: Yup.string().matches(stringRegex, 'Invalid Search Input')
});

export const maturityLoanSchema = Yup.object({
  branchID: Yup.string()
    .matches(stringRegex, 'Invalid Search Input')
    .required('Branch ID is required'),
  prodCode: Yup.string()
    .matches(stringRegex, 'Invalid Search Input')
    .required('Product is required')
});

export const statementOfAccountSchema = Yup.object({
  accountNumber: Yup.string().required('Account number  is required'),
  productCode: Yup.string()
    .matches(stringRegex, 'Invalid Search Input')
    .required('required'),
  branchID: Yup.string().matches(stringRegex, 'Invalid Search Input')
});

export const prostingJournalSchema = Yup.object({
  branchID: Yup.string()
    .matches(stringRegex, 'Invalid branch name')
    .required('Branch name is required')
});

export const holdingTransactionSchema = Yup.object({
  branchID: Yup.string()
    .matches(stringRegex, 'Invalid branch name')
    .required('Branch name is required')
});

export const drillDowndueSchema = Yup.object({
  branchID: Yup.string()
    .matches(stringRegex, 'Invalid branch name')
    .required('Branch name is required')
});
