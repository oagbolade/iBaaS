import * as Yup from 'yup';
import { numericRegex, stringRegex, decimalRegex } from '@/schemas/admin/index';

export const loanUnderWriteSchema = Yup.object({
  productCode: Yup.string()
    .matches(stringRegex, 'Invalid product code id')
    .required('Required'),
  branch: Yup.string()
    .matches(stringRegex, 'Invalid branch code')
    .required('Required'),
  loanAmount: Yup.string()
    .matches(numericRegex, 'Invalid Loan Amount')
    .required('Required'),
  approvedAmount: Yup.string()
    .matches(numericRegex, 'Invalid Approved Loan Amount')
    .required('Required'),
  interestRate: Yup.string()
    .matches(decimalRegex, 'Invalid Loan Rate')
    .required('Required'),
  loanTerm: Yup.string()
    .matches(numericRegex, 'Invalid  Terms')
    .required('Required'),
  repayType: Yup.string()
    .matches(numericRegex, 'Invalid loan number')
    .required('Required'),
  startDate: Yup.date(),
  matDate: Yup.date(),
  firstPay: Yup.date(),
  drawdown: Yup.date(),
  postDate: Yup.date(),
  collType: Yup.string()
    .matches(numericRegex, 'Invalid collType')
    .required('Required'),
  collValue: Yup.string()
    .matches(numericRegex, 'Invalid col value')
    .required('Required'),
  collDesc: Yup.string(),
  loanSource: Yup.string()
    .matches(numericRegex, 'Invalid loan source')
    .required('Required'),
  loanPurpose: Yup.string()
    .matches(stringRegex, 'Incorrect loan purpose')
    .required('Required'),
  lending: Yup.string()
    .matches(numericRegex, 'Invalid lending')
    .required('Required'),
  lien: Yup.string().matches(numericRegex, 'Invalid lien').required('Required'),
  morat: Yup.string()
    .matches(decimalRegex, 'Invalid morat')
    .required('Required'),
  moratType: Yup.string()
    .matches(numericRegex, 'Invalid marat type')
    .required('Required'),
  userId: Yup.string(),
  authId: Yup.string(),
  groupId: Yup.string(),
  penalRate: Yup.string()
    .matches(decimalRegex, 'Invalid Penalty Rate')
    .required('Required'),
  menuId: Yup.string()
    .matches(numericRegex, 'Invalid Menu ID')
    .required('Required'),
  roleLevel: Yup.string()
    .matches(numericRegex, 'Invalid Role  ')
    .required('Required'),
  authListId: Yup.string()
    .matches(numericRegex, 'Invalid auth')
    .required('Required'),
  penalCalMthd: Yup.string()
    .matches(numericRegex, 'Invalid penal ')
    .required('Required'),
  healthInsurance: Yup.string()
    .matches(numericRegex, 'Invalid loan number')
    .required('Required')
});

export const cancelLoanSchema = Yup.object({
  accountNumber: Yup.string()
    .matches(numericRegex, 'Invalid account number')
    .required('Required'),
  oPrincipal: Yup.string().required('Required'),
  oInterest: Yup.string().required('Required'),
  oPenalInt: Yup.string().required('Required'),
  oExtinterest: Yup.string().required('Required')
});

export const terminateLoanSchema = Yup.object({
  loanAcct: Yup.string()
    .matches(numericRegex, 'Invalid account number')
    .required('Required'),
  oPrincipal: Yup.string().required('Required'),
  oInterest: Yup.string().required('Required'),
  oPenalInt: Yup.string().required('Required'),
  oExtinterest: Yup.string().required('Required'),
  userid: Yup.string().required('Required')
});

export const loanOverDraftSchema = Yup.object({
  facilityType: Yup.string().required('Facility Type is Required'),
  branch: Yup.string().required('Branch is Required'),
  penaltyRate: Yup.string()
    .matches(decimalRegex, 'Penalty Rate is Required')
    .required('Required'),
  effectiveDate: Yup.string().required('Required'),
  expiryDate: Yup.string().required('Required'),
  amount: Yup.string()
    .matches(decimalRegex, 'Invalid amount')
    .required('Required'),

  interestRate: Yup.string()
    .matches(decimalRegex, 'Invalid Facility rate')
    .required('Required'),
  term: Yup.string()
    .matches(decimalRegex, 'Invalid Facility terms')
    .required('Required')
});

export const partialPayOffSchema = Yup.object({
  princpayout: Yup.string().matches(stringRegex).required('Required'),
  intpayout: Yup.string().matches(stringRegex).required('Required'),
  penintpayout: Yup.string().matches(stringRegex).required('Required'),
  newrate: Yup.string().matches(stringRegex).required('Required'),
  freq: Yup.string().matches(stringRegex).required('Required')
});

export const restructuredLoanSchema = Yup.object({
  PenalWriteOff_GL: Yup.string()
    .matches(stringRegex, 'Enter Gl Account')
    .required('Required'),
  InterestWriteOff_GL: Yup.string()
    .matches(stringRegex, 'Enter Gl Account')
    .required('Required'),
  PrincipalWriteOff_GL: Yup.string()
    .matches(stringRegex, 'Enter GL Account')
    .required('Required'),
  amt_To_Liquidate: Yup.string()
    .matches(stringRegex, 'Enter Amount')
    .required('Required'),

  source: Yup.string()
    .matches(stringRegex, 'Enter loan source')
    .required('Required'),
  newPrincipal: Yup.string()
    .matches(stringRegex, 'Enter loan source')
    .required('Required')
});

export const overDraftSearchSchema = Yup.object({
  branchID: Yup.string().matches(stringRegex, 'Invalid Search Input'),
  accountNumber: Yup.string().matches(numericRegex, 'Invalid Search Input')
});

export const loanUnderwritingSearchSchema = Yup.object({
  branchID: Yup.string().matches(stringRegex, 'Invalid Search Input'),
  customerID: Yup.string().matches(numericRegex, 'Invalid Search Input'),
  fullName: Yup.string().matches(stringRegex, 'Invalid Search Input')
});
