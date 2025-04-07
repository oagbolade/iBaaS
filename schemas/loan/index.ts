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
  matdate: Yup.date().required('Required'),
  princpayout: Yup.number().required('Required'),
  intpayout: Yup.number().required('Required'),
  penintpayout: Yup.number().required('Required'),
  princoutst: Yup.number().required('Required'),
  intoutst: Yup.number().required('Required'),
  penintoutst: Yup.number().required('Required'),
  startdate: Yup.date().required('Required')
});

export const restructuredLoanSchema = Yup.object({
  restructureType: Yup.number().required(),
  newPrincipal: Yup.number().required(),

  refinancingAmt: Yup.number().required(),

  interestRate: Yup.number().required(),

  addtoPrincipal: Yup.number().required(),

  term: Yup.number().required(),
  days: Yup.number().required(),
  termFreq: Yup.string().required(),

  repaytype: Yup.string().required(),

  paytype: Yup.number().required(),

  startdate: Yup.date().required(),
  matdate: Yup.date().required(),
  firstdate: Yup.date().required(),
  drawdate: Yup.date().required(),
  postdate: Yup.date().required(),

  collateraltype: Yup.number().required(),
  collateralvalue: Yup.number().required(),
  collateraldetails: Yup.string().required(),

  source: Yup.number().required(),
  narration: Yup.string().required(),

  calcmethod: Yup.number().required(),
  moratatriumtype: Yup.number().required(),
  moratarium: Yup.number().required(),
  lienpercentage: Yup.number().required(),
  lienamount: Yup.number().required(),
  paymode: Yup.number().required(),
  paybank: Yup.string().required(),
  takecharge: Yup.string().required()
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
