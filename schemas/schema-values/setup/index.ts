import dayjs, { Dayjs } from 'dayjs';
import { getCurrentIsoDate } from '@/utils/getCurrentDate';
import { getStoredUser } from '@/utils/user-storage';

export interface CreateCompanyFormValues {
  bankName: string;
  address: string;
  phone: string;
  email: string;
  country: string;
  currency: number;
  plr: number;
  state: string;
  reqChqsupply: number;
  reqLoanApp: number;
  smsReq: number;
  acctOpenSMS: number;
  tranSMS: number;
  authid: string;
  multiacct: number;
  subnewbr: number;
  slogan: string;
  servername: string;
  last_financialyear: null;
  next_financialyear: null;
  eoYglacct: string;
  pandLacct: string;
  priorpandLacct: string;
  inventory: number;
  notice: number;
  dmb: number;
  non_dmb: number;
  interbrabch: string;
  cbncode: string;
  webSite: string;
  bankLogo: string;
  loginImage: string;
  promoURL: string;
  kyc: number;
  moratoriumByDays: number;
  notifyAllPhones: number;
  epaymentUserid: string;
  esbUser: string;
  processNIP: number;
  bin: string;
  turnOnErrLog: number;
  lgaCode: string;
  mdPhoneNo: string;
  mdName: string;
  compOffPhoneNo: string;
  compOffName: string;
  bulkOverdrawFlg: number;
}

export interface CreateBranchTestCaseFormValues {
  branchName: string;
  address: string;
  phone: string;
  email: string;
  country: string;
  state: string;
  city: string;
  branchType: string;
  mBranchCode: string;
}

export interface CreateIndustryFormValues {
  industryName: string;
  industryMne: string;
  status: string;
  sector: string;
  authid: string;
  createdate: string;
}

export interface CreateProfessionFormValues {
  profname: string;
  profmne: string;
  authid: string;
  createdate: string;
  sector: string;
}

export interface CreateSectorFormValues {
  sectorName: string;
  sectorMne: string;
  status: string;
  authid: string;
  createdate: string;
  sectorCode: string;
}

export interface CreateGroupFormValues {
  groupName: string;
  groupHead: string;
  groupPhone: string;
  groupAddress: string;
  secretary: string;
  secretaryPhone: string;
  groupCreateDt: string;
  status: number;
  maingroup: string;
  ismain: number;
  authid: string;
  createdate: string;
  grouplimit: string;
  partLimit: string;
  memberLimit: string;
  branchcode: string;
  groupEmail: string;
  groupSecIndicator: number;
  groupHeadIndicator: number;
  acctOfficer: string;
}
export interface BranchSearchParams {
  status?: number;
  branchName?: string;
  branchCode?: string;
}
export interface GroupSearchParams {
  status?: number;
  branchCode: string;
  groupName: string;
  groupId: string;
}
export interface NodeSearchParams {
  status?: number;
  gl_NodeName: string;
  gl_NodeCode: string;
}
export interface interestsSearchParams {
  status?: number;
  intName: string;
  intcode: string;
}
export interface GlClassSearchParams {
  status?: number;
  gl_ClassName: string;
  gl_ClassCode: string;
}
export interface CommercialBanksSearchParams {
  status?: number;
  bankName: string;
  bankCode: string;
  bankshortname: string;
}
export interface TownSearchParams {
  status?: number;
  townName?: string;
  townCode?: string;
}
export interface CreateBranchFormValues {
  branchName: string;
  address: string;
  address2: 'string';
  address3: 'string';
  phone: string;
  email: string;
  city: string;
  state: string;
  country: string;
  create_dt: '2024-05-17T07:56:23.842Z';
  cashaccount: 'string';
  suspenseDR: 'string';
  suspenseCR: 'string';
  interBranchGL: 'string';
  branchType: 0;
  mBranchCode: string;
  sBranchCode: string;
  region: string;
  authid: 'string';
  subbranch: 0;
}
export interface CountrySearchParams {
  status?: number;
  countryName?: string;
  countryCode?: string;
}
export interface HolidaySearchParams {
  status?: number;
  holidayDesc?: string;
  holidaydays?: number;
}
export interface RegionSearchParams {
  status?: number;
  regionName?: string;
  regionCode?: string;
}
export interface DepartmentSearchParams {
  status?: number;
  departmentName: string;
}
export interface CreateCountryFormValues {
  countryName: string;
  countryMne: string;
  currencyName: string;
  currencyMne: string;
  authid: string;
}

export interface CreateZoneFormValues {
  zoneName: string;
  nodays: number;
  authid: string;
  createdate: string;
  zoneid: string;
}
export interface DocumentSearchParams {
  status?: number;
  docName: string;
  docShortname: string;
}
export interface CreateRelationShipFormValues {
  relationname: string;
  status: number;
  authid: string;
  relationid: string;
}

export interface CreateDepartmentFormValues {
  deptName: string;
  deptShortname: string;
  authid: string;
}

export interface CreateGlNodeFormValues {
  gL_NodeCode: string;
  gL_NodeName: string;
  authid: 'string';
  gL_NodeCodes: string;
}

export interface CreateGlClassFormValues {
  gL_ClassCode: string;
  gL_ClassName: string;
  nodeCode: string;
  authid: string;
}

export interface CreateCommercialBankFormValues {
  bankName: string;
  bankshortname: string;
  authorisedby: string;
  authid: string;
  cbnCode: string;
}
export interface StateSearchParams {
  status: number;
  region: string;
  stateCode: string;
  stateName: string;
}

export interface ChequeSearchParams {
  status: number;
  typeId: string;
  typeDesc: string;
}
export interface TransactionTypeSearchParams {
  status: number;
  tranCode: string;
  tranName: string;
}
export interface ClearingSearchParams {
  status: number;
  bankName: string;
  bankCode: string;
}
export interface DormancySearchParams {
  status: number;
  prodCode: string;
  narration: string;
}

export interface CreateDormancyFormValues {
  prodCode: string;
  duration: number;
  penalty: number;
  narration: string;
  authid: string;
  userid: string;
  createdate: string;
  status: number;
  penaltyGlAccount: string;
}

export interface CreateChequeBookFormValues {
  typeDesc: string;
  numberOfleaves: number;
  glAccount1: string;
  currentCost: number;
  glAccount2: string;
  batchno: number;
  lastnumber: number;
  unitpr: number;
  variance: number;
  userid: string;
  authid: string;
  authorisedby: string;
  accountType: string;
}

export interface CreateClearingBankFormValues {
  bankCode: string;
  chequeinClear: string;
  nostro: string;
  authid: string;
  unclearedgl: string;
  collectiongl: string;
}

export interface CreateTransactionTypeFormValues {
  tranName: string;
  tranType: string;
  tranShortname: string;
  charged: number;
  reversal: number;
  module: number;
  status: number;
  clearing: string;
  authid: string;
  createdate: string;
  sms: number;
  cashIndicator: number;
}

export interface CreateExceptionFormValues {
  exceptionDesc: string;
  behaviour: string;
  authid: string;
}
export interface CreateDemandDepositFormValues {
  productCode: string;
  productName: string;
  productclass: number;
  appType: string;
  productstart: string;
  productExpire: string;
  currencycode: string;
  openbalance: number;
  closeBalance: number;
  minintbalance: number;
  crtype: number | null;
  drType: number | null;
  withallowed: number | null;
  assetBalance: string;
  suspendedAsset: string;
  interestReceivable: string;
  interestIncome: string;
  suspendedIntIncome: string;
  liabilityBal: string;
  interestPayable: string;
  interestExpense: string;
  taxabsorbed1: string;
  acctClosegl: string;
  unearnincome: string;
  unearnexp: string;
  stateInactive: number;
  checkBook: number;
  sweepIn: number;
  si: number;
  od: number;
  interbr: string;
  floor: number;
  shortname: string;
  lien: number;
  intcalbasis: number;
  dayint: number;
  maxamt: number;
  penal: number;
  minAge: number;
  maxAge: number;
  micincome: number;
  phoneNo4AcctNumber: number;
  ProdDocuments: [];
  ProdCharges: [];
  ProdException: [];
}
export interface CreateTreasuryFormValues {
  productCode: string;
  productName: string;
  productclass: string;
  appType: string;
  productstart: string;
  productExpire: string;
  currencycode: string;
  intaccrual: string;
  crtype: string;
  minIntrate: number;
  maxIntRate: number;
  minterm: number;
  maxterm: number;
  repaymeth: string;
  term: string;
  interestExpense: string;
  shortname: string;
  intIncome: string;
  principal: string;
  ttax: string;
  ttax2: string;
  upfront: string;
  paymentGL: string;
  maturedGL: string;
  suspint: string;
  susprinc: string;
  closeTDAtMature: number;
  penalrate: number;
  discounted: number;
}
export interface CreateLoanAccountFormValues {
  productCode: string;
  productName: string;
  appType: string;
  productstart: string;
  productExpire: string;
  currencycode: string;
  term: string;
  repayoption: number;
  repayoption2: number;
  schtype: string;
  minintrate: number;
  maxintrate: number;
  minterm: number;
  maxterm: number;
  minloan: number;
  maxloan: number;
  collval: number;
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
  postnodebit: number;
  allowOD: number;
  manageCollection: number;
  actualRateCalcMethod: number;
  penalrateCalcMethod: number;
  moratorium: number;
  moratoriumtype: number;
  intRateCode: string;
  chkHealthInsurance: 0;
  healthInsuranceAcct: string;
  healthInsuranceAmt: number;
  securityDepType: number;
  securityDepFigure: number;
  guarantorFlg: number;
  ProdDocuments: [];
  ProdCharges: [];
  ProdException: [];
}
export interface CreateChargeFormValues {
  chargeDesc: string;
  chargeBasis: number;
  chargeamt: number;
  glCode: string;
  liqMode: number;
  liqperiod: number;
  branchMask: string;
  targetBase: string;
  freq: string;
  drgl: string;
  crgl: string;
  accrualRequired: number;
  authid: string;
  menuid: number;
  userid: string;
  firedCharges: string;
  tableTypeModel: [
    {
      chargeType: number;
      rule1: number;
      startRange: number;
      endRange: number;
      rate: number;
      amount: number;
    }
  ];
}

export interface CreateSetupConditionFormValues {
  description: string;
}

export interface CreateInterestFormValues {
  intName: string;
  maxRate: number;
  minRate: number;
  authId: string;
  targetBase: string;
  intValue: number;
  variance: number;
}

export interface CreateTownFormValues {
  townName: string;
  stateCode: string;
  status: 0;
  townshortname: string;
  authid: string;
  createdate: string;
  townstatus: string;
}
export interface CreateRegionFormValues {
  regionName: string;
  regionmne: string;
  status: 0;
  authid: string;
  createdate: string;
  regionStatus: string;
}
export interface CreateDocumentFormValues {
  docid: string;
  docName: string;
  docShortname: string;
  status: number;
  userid: string;
  authid: string;
}

export interface CreateEducationFormValues {
  educationCode: number;
  educationname: string;
  status: number;
  userid: string;
  authid: string;
  createdate: string;
}
export interface CreateHolidayFromValue {
  holidaydate: Dayjs;
  holidaydays: number;
  status: number;
  authid: string;
  holidayends: string;
  holidaydesc: string;
  holidaystatus: string;
}
export interface UpdateStateFromValue {
  stateName: string;
  statemne: string;
  countryCode: string;
  capital: string;
  region: string;
  authid: string;
}

export const createTreasuryccountInitialValues: CreateTreasuryFormValues = {
  productCode: '',
  productName: '',
  productclass: '',
  appType: '',
  productstart: '',
  productExpire: '',
  currencycode: '',
  intaccrual: '',
  crtype: '',
  minIntrate: 0,
  maxIntRate: 0,
  minterm: 0,
  maxterm: 0,
  repaymeth: '',
  term: '',
  interestExpense: '',
  shortname: '',
  intIncome: '',
  principal: '',
  ttax: '',
  ttax2: '',
  upfront: '',
  paymentGL: '',
  maturedGL: '',
  suspint: '',
  susprinc: '',
  closeTDAtMature: 0,
  penalrate: 0,
  discounted: 0
};
export const createLoanAccountInitialValues: CreateLoanAccountFormValues = {
  productCode: '',
  productName: '',
  appType: '',
  productstart: '',
  productExpire: '',
  currencycode: '',
  term: '',
  repayoption: 0,
  repayoption2: 0,
  schtype: '',
  minintrate: 0,
  maxintrate: 0,
  minterm: 0,
  maxterm: 0,
  minloan: 0,
  maxloan: 0,
  collval: 0,
  schedcalc: '',
  princbalBalance: '',
  interestReceivable: '',
  interestincome: '',
  susinterest: '',
  susprinc: '',
  micincome: '',
  intaccrual: '',
  uid: '',
  interbr: '',
  penalIntIncome: '',
  penalIntAccrual: '',
  penalSuspense: '',
  penalrate: 0,
  actualRAte: 0,
  shortname: '',
  loantype: 0,
  loanclass: 0,
  postnodebit: 0,
  allowOD: 0,
  manageCollection: 0,
  actualRateCalcMethod: 0,
  penalrateCalcMethod: 0,
  moratorium: 0,
  moratoriumtype: 0,
  intRateCode: '',
  chkHealthInsurance: 0,
  healthInsuranceAcct: '',
  healthInsuranceAmt: 0,
  securityDepType: 0,
  securityDepFigure: 0,
  guarantorFlg: 0,
  ProdDocuments: [],
  ProdCharges: [],
  ProdException: []
};
export const createDemandDepositInitialValues: CreateDemandDepositFormValues = {
  productCode: '',
  productName: '',
  productclass: 0,
  appType: '',
  productstart: '',
  productExpire: '',
  currencycode: '',
  openbalance: 0,
  closeBalance: 0,
  minintbalance: 0,
  crtype: null,
  drType: null,
  withallowed: null,
  assetBalance: '',
  suspendedAsset: '',
  interestReceivable: '',
  interestIncome: '',
  suspendedIntIncome: '',
  liabilityBal: '',
  interestPayable: '',
  interestExpense: '',
  taxabsorbed1: '',
  acctClosegl: '',
  unearnincome: '',
  unearnexp: '',
  stateInactive: 0,
  checkBook: 0,
  sweepIn: 0,
  si: 0,
  od: 0,
  interbr: '',
  floor: 0,
  shortname: '',
  lien: 0,
  intcalbasis: 0,
  dayint: 0,
  maxamt: 0,
  penal: 0,
  minAge: 0,
  maxAge: 0,
  micincome: 0,
  phoneNo4AcctNumber: 0,
  ProdDocuments: [],
  ProdCharges: [],
  ProdException: []
};

export const createChargeInitialValues: CreateChargeFormValues = {
  chargeDesc: '',
  chargeBasis: 1,
  chargeamt: 0,
  glCode: '',
  liqMode: 0,
  liqperiod: 1,
  branchMask: '',
  targetBase: '0',
  freq: '',
  drgl: '',
  crgl: '',
  menuid: 0,
  accrualRequired: 0,
  authid: 'string',
  userid: 'string',
  firedCharges: '',
  tableTypeModel: [
    {
      chargeType: 0,
      rule1: 0,
      startRange: 0,
      endRange: 0,
      rate: 0,
      amount: 0
    }
  ]
};

export const createGroupInitialValues: CreateGroupFormValues = {
  groupName: '',
  groupHead: '',
  groupPhone: '',
  groupAddress: '',
  secretary: '',
  secretaryPhone: '',
  groupCreateDt: getCurrentIsoDate(),
  status: 0,
  maingroup: 'string',
  ismain: 0,
  authid: 'string',
  createdate: getCurrentIsoDate(),
  grouplimit: '',
  partLimit: '',
  memberLimit: '',
  branchcode: '',
  groupEmail: '',
  groupSecIndicator: 0,
  groupHeadIndicator: 0,
  acctOfficer: ''
};

export const createChequeBookInitialValues: CreateChequeBookFormValues = {
  typeDesc: '',
  numberOfleaves: 0,
  glAccount1: '',
  currentCost: 0,
  glAccount2: '',
  batchno: 0,
  lastnumber: 0,
  unitpr: 0,
  variance: 0,
  userid: `${getStoredUser()?.profiles.userid}`,
  authid: '',
  authorisedby: '',
  accountType: ''
};

export const createRelationshipInitialValues: CreateRelationShipFormValues = {
  relationname: '',
  status: 1,
  authid: `${getStoredUser()?.profiles.userid}`,
  relationid: ''
};

export const createZoneInitialValues: CreateZoneFormValues = {
  zoneName: '',
  nodays: 0,
  authid: 'string',
  createdate: getCurrentIsoDate(),
  zoneid: ''
};

export const createEducationInitialValues: CreateEducationFormValues = {
  educationCode: 0,
  educationname: '',
  status: 0,
  userid: `${getStoredUser()?.profiles.userid}`,
  authid: 'string',
  createdate: getCurrentIsoDate()
};

export const createTransactionTypeInitialValues: CreateTransactionTypeFormValues =
  {
    tranName: '',
    tranType: '',
    tranShortname: '',
    charged: 0,
    reversal: 0,
    module: 0,
    status: 0,
    clearing: 'string',
    authid: 'string',
    createdate: getCurrentIsoDate(),
    sms: 0,
    cashIndicator: 0
  };
export const createClearingBanksInitialValues: CreateClearingBankFormValues = {
  bankCode: '',
  chequeinClear: '',
  nostro: '',
  authid: 'string',
  unclearedgl: '',
  collectiongl: ''
};

export const createCommercialBankInitialValue: CreateCommercialBankFormValues =
  {
    bankName: '',
    bankshortname: '',
    authorisedby: 'string',
    authid: 'string',
    cbnCode: 'string'
  };

export const createProfessionInitialValue: CreateProfessionFormValues = {
  profname: '',
  profmne: '',
  authid: 'string',
  createdate: getCurrentIsoDate(),
  sector: ''
};

export const createSectorInitialValue: CreateSectorFormValues = {
  sectorName: '',
  sectorMne: '',
  status: '',
  authid: 'string',
  createdate: getCurrentIsoDate(),
  sectorCode: ''
};

export const createIndustryInitialValue: CreateIndustryFormValues = {
  industryName: '',
  industryMne: '',
  status: '',
  sector: '',
  authid: 'string',
  createdate: getCurrentIsoDate()
};
export const createInterestInitialValue: CreateInterestFormValues = {
  intName: '',
  maxRate: 0,
  minRate: 0,
  authId: 'string',
  targetBase: 'string',
  intValue: 0,
  variance: 0
};
export const createSetupConditionInitialValue: CreateSetupConditionFormValues =
  {
    description: ''
  };

export const createDormancyInitialValue: CreateDormancyFormValues = {
  prodCode: '',
  duration: 0,
  penalty: 0,
  narration: '',
  authid: 'string',
  userid: `${getStoredUser()?.profiles.userid}`,
  createdate: getCurrentIsoDate(),
  status: 0,
  penaltyGlAccount: ''
};
export const createExceptionInitialValue: CreateExceptionFormValues = {
  exceptionDesc: '',
  behaviour: '',
  authid: ''
};
export const createGlClassInitialValue: CreateGlClassFormValues = {
  gL_ClassCode: '',
  gL_ClassName: '',
  nodeCode: '',
  authid: 'string'
};
export const createGlNodeInitialValue: CreateGlNodeFormValues = {
  gL_NodeCode: '',
  gL_NodeName: '',
  authid: 'string',
  gL_NodeCodes: 'string'
};
export const createDepartmentInitialValue: CreateDepartmentFormValues = {
  deptName: '',
  deptShortname: '',
  authid: 'string'
};
export const updateStatementInitialValue: UpdateStateFromValue = {
  stateName: '',
  statemne: '',
  countryCode: '',
  capital: '',
  region: '',
  authid: 'string'
};
export const createHolidayInitialValue: CreateHolidayFromValue = {
  holidaydate: dayjs(),
  holidaydays: 0,
  status: 0,
  authid: 'string',
  holidayends: '',
  holidaydesc: '',
  holidaystatus: ''
};
export const createRegionInitialValues: CreateRegionFormValues = {
  regionName: '',
  regionmne: '',
  status: 0,
  authid: 'string',
  createdate: getCurrentIsoDate(),
  regionStatus: ''
};
export const createTownInitialValues: CreateTownFormValues = {
  townName: '',
  stateCode: '',
  status: 0,
  townshortname: '',
  authid: 'string',
  createdate: getCurrentIsoDate(),
  townstatus: ''
};
export const createCountryInitialValues: CreateCountryFormValues = {
  countryName: '',
  countryMne: 'string',
  currencyName: '',
  currencyMne: '',
  authid: 'string'
};
export const createCompanyInitialValues: CreateCompanyFormValues = {
  bankName: '',
  address: '',
  phone: '',
  email: '',
  country: 'string',
  currency: 0,
  plr: 0,
  state: '',
  reqChqsupply: 0,
  reqLoanApp: 0,
  smsReq: 0,
  acctOpenSMS: 0,
  tranSMS: 0,
  authid: 'string',
  multiacct: 0,
  subnewbr: 0,
  slogan: '',
  servername: '',
  last_financialyear: null,
  next_financialyear: null,
  eoYglacct: '',
  pandLacct: '',
  priorpandLacct: '',
  inventory: 0,
  notice: 0,
  dmb: 0,
  non_dmb: 0,
  interbrabch: '',
  cbncode: '',
  webSite: '',
  bankLogo: '',
  loginImage: '',
  promoURL: '',
  kyc: 0,
  moratoriumByDays: 0,
  notifyAllPhones: 0,
  epaymentUserid: '',
  esbUser: '',
  processNIP: 0,
  bin: '',
  turnOnErrLog: 0,
  lgaCode: '',
  mdPhoneNo: '',
  mdName: '',
  compOffPhoneNo: '',
  compOffName: '',
  bulkOverdrawFlg: 0
};

export const createBranchInitialValues: CreateBranchFormValues = {
  branchName: '',
  address: '',
  address2: 'string',
  address3: 'string',
  phone: '',
  email: '',
  city: '',
  state: '',
  country: '',
  create_dt: '2024-05-17T07:56:23.842Z',
  cashaccount: 'string',
  suspenseDR: 'string',
  suspenseCR: 'string',
  interBranchGL: 'string',
  branchType: 0,
  mBranchCode: '',
  sBranchCode: '',
  region: 'string',
  authid: 'string',
  subbranch: 0
};
