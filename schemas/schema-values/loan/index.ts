export interface CancelLoanValues {
  accountNumber: string;
  oPrincipal: number;
  oInterest: number;
  oPenalInt: number;
  oExtinterest: number;
}

export const setCancelValues: CancelLoanValues = {
  accountNumber: '',
  oPrincipal: 0,
  oInterest: 0,
  oPenalInt: 0,
  oExtinterest: 0
};

export interface ISetTerminateLoanValues {
  accountNumber: string;
  loanAcct: string;
  oPrincipal: number;
  oInterest: number;
  oPenalInt: number;
  oExtinterest: number;
  userid: string;
  reasons: string;
}

export const setTerminateValues: ISetTerminateLoanValues = {
  accountNumber: '',
  loanAcct: '',
  oPrincipal: 0,
  oInterest: 0,
  oPenalInt: 0,
  oExtinterest: 0,
  userid: '',
  reasons: ''
};
export interface SetOverdraftInitialValues {
  accountNumber: string;
  facilityType: string;
  amount: string;
  expiryDate: string;
  effectiveDate: string;
  interestRate: string;
  frequency: string;
  term: string;
  branch: string;
  interestAmount: string;
  penaltyRate: string;
  authId: string;
  menuId: number;
  odNumber: string;
  oldAccountNumber: string;
}
export const setOverdraftInitialValues: SetOverdraftInitialValues = {
  accountNumber: '',
  facilityType: '',
  amount: '',
  expiryDate: '',
  effectiveDate: '',
  interestRate: '',
  frequency: '',
  term: '',
  branch: '',
  interestAmount: '',
  penaltyRate: '',
  authId: '',
  menuId: 0,
  odNumber: '',
  oldAccountNumber: ''
};

export interface SetPartialPayOffValues {
  loanacct: string;
  settlementAcct: string;
  matdate: string;
  newrate: number;
  newprincipal: number;
  princpayout: number;
  intpayout: number;
  penintpayout: number;
  princoutst: number;
  intoutst: number;
  penintoutst: number;
  freq: string;
  newtenor: number;
  startdate: string;
  totalDays: number;
  menuid: number;
}

export const setPartialPayOffvalues: SetPartialPayOffValues = {
  loanacct: '',
  settlementAcct: '',
  matdate: '',
  newrate: 0.0,
  newprincipal: 0.0,
  princpayout: 0.0,
  intpayout: 0.0,
  penintpayout: 0.0,
  princoutst: 0.0,
  intoutst: 0.0,
  penintoutst: 0.0,
  freq: '',
  newtenor: 0.0,
  startdate: '',
  totalDays: 0,
  menuid: 96
};

export interface RestructureLoanValues {
  restructureType: number; // 1: Full Liquidation, 3: Restructure
  customerid: string;
  loanAccno: string;
  settlementAccno: string;
  principalWriteOff_GL: string;
  interestWriteOff_GL: string;
  penalWriteOff_GL: string;
  prodcode: string;
  branchcode: string;
  outstandingPrincipal: string;
  outstandingInterest: string;
  outstandingPenalInterest: string;
  principal_To_WriteOff: string;
  interest_To_WriteOff: string;
  penal_To_WriteOff: string;
  principalWriteOff_Type: string; // 1: Add all outstanding to restructure, 2: Write off all outstanding, 3: partial write-off
  interestlWriteOff_Type: string;
  penalWriteOff_Type: string;
  amt_To_Liquidate: number;
  newPrincipal: number;
  refinancingAmt: number;
  interestRate: number;
  term: number;
  days: number;
  termFreq: string; // "004" for Month
  repaytype: number;
  startdate: string; // Format: YYYY-MM-DD
  matdate: string; // Format: YYYY-MM-DD
  postdate: string; // Format: YYYY-MM-DD
  collateraltype: number;
  collateralvalue: number;
  collateraldetails: string;
  source: number;
  narration: string;
  calcmethod: number;
  moratatriumtype: number;
  moratarium: number;
  lienpercentage: number;
  lienamount: number;
  paymode: number;
  paybank: string;
  takecharge: string;
  menuId: number;
}

export const SetRestructureLoanValues: RestructureLoanValues = {
  restructureType: 1,
  customerid: '',
  loanAccno: '',
  settlementAccno: '',

  principalWriteOff_GL: '',
  interestWriteOff_GL: '',
  penalWriteOff_GL: '',

  prodcode: '',
  branchcode: '',
  outstandingPrincipal: '0',
  outstandingInterest: '0',
  outstandingPenalInterest: '0',
  principal_To_WriteOff: '0',
  interest_To_WriteOff: '0',
  penal_To_WriteOff: '0',
  principalWriteOff_Type: '0',
  interestlWriteOff_Type: '0',
  penalWriteOff_Type: '0',
  amt_To_Liquidate: 0,
  newPrincipal: 0,
  refinancingAmt: 0,
  interestRate: 0,
  term: 0,
  days: 0,
  termFreq: '',
  repaytype: 1,
  startdate: '',
  matdate: '',
  postdate: '',
  collateraltype: 0,
  collateralvalue: 0,
  collateraldetails: '',
  source: 0,
  narration: '',
  calcmethod: 0,
  moratatriumtype: 0,
  moratarium: 0,
  lienpercentage: 0,
  lienamount: 0,
  paymode: 0,
  paybank: '',
  takecharge: '',
  menuId: 57
};
export interface ICustomerDetails {
  gender: string;
  title: string;
  surName: string;
  firstName: string;
  othername: string;
  fullName: string;
  bvn: string;
  introid: string;
  mothermdName: string;
  residentCountry: string;
  bizState: string;
  bizAddress: string;
  dob: string;
  sex: string;
  nationality: string;
  eduLevel: string;
  statecode: string;
  occupation: string;
  address: string;
  address2: string;
  residentStatecode: string;
  residentTowncode: string;
  phone1: string;
  phone2: string;
  phone3: string;
  phone4: string;
  email: string;
  nextOfKin: string;
  nextOfKinphone: string;
  nextOfKinaddr: string;
  idType: string;
  iDno: string;
  idIssueDate: string;
  idExpryDate: string;
  sectorcode: string;
  customerType: string;
  relcustid: string;
  relationtype: string;
  refname: string;
  refphone: string;
  signacct: string;
  bizCtry: string;
  bizTowncode: string;
  bizPhone3: string;
  residPermNo: string;
  residExpDate: string;
  empBusName: string;
  fatcaid: string;
  ctzorRes: string;
  psprtAlnNO: string;
  psprtIssDate: string;
  psprtExpDate: string;
  ssn: string;
  nextOfKinRel: string;
  nextOfKinState: string;
  nextOfKintown: string;
  sigClass: string;
  regno: string;
  acctOfficer: string;
  taxId: string;
  contact: string;
  secName: string;
  secphone: string;
  shareCapital: string;
  turnOver: string;
  scuml: string;
  compObjective: string;
  userid: string;
  authid: string;
  accounttitle: string;
  customerid: string;
  acctstatus: string;
  accountnumber: string;
  branch: string;
  bkbal: string;
  effbal: string;
  usebal: string;
  source: string;
}

export interface ILoanAccDetails {
  accountnumber: string;
  branch: string;
  productcode: string;
  productname: string;
  fullname: string;
  totaldays: number;
  loantype: number;
  discounted: number;
  penalRate: number;
  accruedInterest: number;
  interestdue: number;
  outStandingInt: number;
  monthlyinterest: number;
  principaldue: string;
  principalpaid: number;
  interestpaid: number;
  intInterestDue: number;
  approvedAmount: number;
  startdate: string;
  matdate: string;
  disburse: number;
  freqname: string;
  intrate: string;
  minintrate: number;
  currentbalance: number;
  maxintrate: number;
  loanamount: number;
  currencycode: string;
  statusdesc: string;
  loanpurpose: string;
  settlementacct1: string;
  status: string;
  customerid: string;
  paymentGL: string;
  firstpmtdate: string;
  termfreq: string;
  loanschedcalcdesc: string;
  repaytype: string;
  repaydesc: string;
  remainterm: number;
  customerID: number;
  fullName: string;
  productName: string;
  collvalue: string;
  branchCode: string;
  bkBalance: string;
  effectiveBalance: string;
  usableBalance: string;
  loanAmount: string;
  productCode: string;
  calcmethod: string;
  loanSourceName: string;
  loanPurpose: string;
  loanAppNo: string;
  loanSource: string;
  loanType: string;
  loanStatus: string;
  outstandingPenalInterest: string
  loanSourceCode : string
  collateralValue: string
  drawDownDate: string
  loanterm: string
  collateralType: string
}

export interface LoanUnderwriteInitialValues {
  chargeConcession: Array<any>;
  userType: string;
  customerId: string;
  bankGL: string;
  productCode: string;
  branch: string;
  loanAmount: number;
  approvedAmount: number;
  interestRate: string;
  loanTerm: number;
  loanDays: string;
  termFrequency: string;
  repayType: string;
  startDate: string;
  matDate: string;
  firstPay: string;
  drawdown: string;
  postDate: string;
  settlementAcct1: string;
  collType: string;
  collValue: number;
  collDesc: string;
  loanSource: string;
  loanPurpose: string;
  loanAppNo: string;
  lending: number;
  calcMethod: string;
  lien: number;
  morat: number;
  moratType: string;
  userId: string;
  authId: string;
  groupId: string;
  penalRate: number;
  menuId: number;
  roleLevel: number;
  comments: string;
  authListId: number;
  penalCalMthd: number;
  healthInsurance: number;
  securityDeposit: number;
  ippis: string;
}

export const loanUnderwritingInitialValues: LoanUnderwriteInitialValues = {
  chargeConcession: [
    {
      accountNumber: '',
      chargeCode: '',
      oldCharge: 0,
      newCharge: 0
    }
  ],
  userType: '1',
  customerId: '',
  bankGL: '',
  productCode: '',
  branch: '',
  loanAmount: 0,
  approvedAmount: 0,
  interestRate: '',
  loanTerm: 0,
  loanDays: '',
  termFrequency: '',
  repayType: '',
  startDate: '',
  matDate: '',
  firstPay: '',
  drawdown: '',
  postDate: '',
  settlementAcct1: '',
  collType: '',
  collValue: 0,
  collDesc: '',
  loanSource: '',
  loanPurpose: '',
  loanAppNo: '',
  lending: 0,
  calcMethod: '',
  lien: 0,
  morat: 0,
  moratType: '',
  userId: '',
  authId: '',
  groupId: '',
  penalRate: 0,
  menuId: 0,
  roleLevel: 0,
  comments: '',
  authListId: 0,
  penalCalMthd: 0,
  healthInsurance: 0,
  securityDeposit: 0,
  ippis: ''
};

export interface LoanSource {
  loansourceid: number;
  loansourcedesc: string;
}

export interface ILoanSources {
  responseCode: string;
  responseDescription: string;
  loansources: Array<LoanSource>;
}

export interface IProductDetails {
  productCode: string;
  productName: string;
  productclass: string;
  appType: string;
  productstart: string;
  productExpire: string;
  currencycode: string;
  term: string;
  repayoption: string;
  repayoption2: string;
  schtype: string;
  minintrate: string;
  maxintrate: string;
  minterm: number;
  maxterm: number;
  minloan: number;
  maxloan: number;
  collval: string;
  schedcalc: string;
  princbalBalance: string;
  interestReceivable: string;
  interestincome: string;
  susinterest: string;
  susprinc: string;
  micincome: string;
  intaccrual: string;
  uid: string;
  interbr: string;
  penalIntIncome: string;
  penalIntAccrual: string;
  penalSuspense: string;
  penalrate: number;
  actualRAte: number;
  shortname: string;
  loantype: number;
  loanclass: number;
  postnodebit: string;
  allowOD: number;
  manageCollection: number;
  actualRateCalcMethod: string;
  penalrateCalcMethod: number;
  moratorium: string;
  moratoriumtype: string;
  intRateCode: string;
  chkHealthInsurance: number;
  healthInsuranceAcct: string;
  healthInsuranceAmt: number;
  userid: string;
}
