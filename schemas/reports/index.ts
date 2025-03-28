import * as Yup from 'yup';
import { stringRegex } from '../admin';
import { p } from 'msw/lib/core/GraphQLHandler-COiPfZ8k';

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
  branchID: Yup.string().matches(stringRegex, 'Invalid Search Input'),
  reportType: Yup.string().matches(stringRegex, 'Invalid Search Input')
});

export const chartOfAccountSchema = Yup.object({
  branchID: Yup.string().matches(stringRegex, 'Invalid Search Input'),
  searchWith: Yup.string().matches(stringRegex, 'Invalid Search Input')
});

export const trialBalanceSchema = Yup.object({
  branch: Yup.string().matches(stringRegex, 'Invalid Search Input'),
  reportdate: Yup.string().matches(stringRegex, 'Invalid Search Input'),
  reportType: Yup.string().matches(stringRegex, 'Invalid Search Input')
});
