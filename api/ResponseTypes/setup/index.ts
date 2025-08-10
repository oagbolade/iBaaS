import { IFetchingState } from '@/constants/types';

export interface ISetupBranch {
  branchCode?: string;
  status?: string;
  branchName?: string;
}

export interface IBranch {
  branchCode: string;
  branchName: string;
  address: string;
  address2: string;
  address3: string;
  phone: string;
  email: string;
  fax: string;
  city: string;
  state: string;
  country: string;
  status: number;
  cashaccount: string;
  suspenseDR: string;
  suspenseCR: string;
  interBranchGL: string;
  branchType: 0;
  mBranchCode: string;
  sBranchCode: string;
  userid: string;
  create_dt: string;
  region: string;
  createdate: string;
  authid: string;
  subbranch: number;
}

export interface SearchBranchResponse extends IFetchingState {
  status: string;
  branchCode: string;
  branchName: string;
  userId: string;
}

export interface SearchRelationshipResponse extends IFetchingState {
  userId: string;
  status: string;
  relationid: string;
  relationname: string;
}

export interface SearchIndustryResponse extends IFetchingState {
  status: string;
  industryName: string;
  industryCode: string;
  userId: string;
  sector: string;
  industryStatus: string;
}

export interface SearchProfessionResponse extends IFetchingState {
  status: string;
  profname: string;
  profcode: string;
  userId: string;
}

export interface SearchSectorsResponse extends IFetchingState {
  status: string;
  sectorName: string;
  sectorCode: string;
  userId: string;
  sectorMne: string;
}

export interface SearchGroupsResponse extends IFetchingState {
  status: string;
  groupName: string;
  groupID: string;
  userId: string;
  branchCode: string;
  branchName: string;
  groupStatus: string;
}

export interface SearchHolidaysResponse extends IFetchingState {
  status: string;
  holidaydesc: string;
  holidaydays: string;
  userid: string;
  authid: string;
  holidayends: string;
  holidayCode: string;
  holidaydate: string;
  narration: string;
  id: string;
}

export interface SearchZoneResponse extends IFetchingState {
  status: string;
  zoneid: string;
  zoneName: string;
  userId: string;
  nodays: string;
}

export interface SearchTransactionResponse extends IFetchingState {
  status: string;
  tranCode: string;
  tranName: string;
  userId: string;
}

export interface SearchRegionResponse extends IFetchingState {
  status: string;
  regionCode: string;
  regionName: string;
  regionmne: string;
  userId: string;
}

export interface SearchDepartmentResponse extends IFetchingState {
  status: string;
  deptShortname: string;
  deptid: string;
  deptName: string;
  userId: string;
}

export interface SearchStateResponse extends IFetchingState {
  status: string;
  regionName: string;
  stateCode: string;
  stateName: string;
  userId: string;
}

export interface SearchEducationResponse extends IFetchingState {
  status: string;
  educationCode: string;
  educationname: string;
  userId: string;
}

export interface SearchDocumentResponse extends IFetchingState {
  status: string;
  docId: string;
  docName: string;
  userId: string;
}
export interface SearchExceptionResponse extends IFetchingState {
  behaviour: string;
  exceptionDesc: string;
  exceptioncode: string;
  userId: string;
}
export interface SearchChargeResponse extends IFetchingState {
  status: string;
  chargeCode: string;
  chargeDesc: string;
  userId: string;
}
export interface SearchLoanProductResponse extends IFetchingState {
  producttype: string;
  productName: string;
  productCode: string;
  userId: string;
  productTypeDesc: string;
  productClass: string;
  productType: number;
  moduleCode: string;
  productcode: string;
}
export interface SearchSetupConditionResponse extends IFetchingState {
  description: string;
  code: string;
  userId: string;
}

export interface SearchCommercialBankResponse extends IFetchingState {
  status: string;
  bankcode: string;
  bankName: string;
  userId: string;
  commBankName: string;
  chequeinClear: string;
  nostro: string;
  commBankshortname: string;
  unclearedgl: string;
  clearingID: string;
  bankshortname: string;
}
export interface SearchClearingBankResponse extends IFetchingState {
  status: string;
  bankCode: string;
  bankName: string;
  userId: string;
  chequeinClear: string;
  nostro: string;
  commBankshortname: string;
  unclearedgl: string;
  clearingID: string;
  commBankName: string;
}

export interface SearchDormancyResponse extends IFetchingState {
  status: string;
  prodCode: string;
  narration: string;
  userId: string;
  penaltyGlAccount: string;
  duration: string;
  penalty: string;
  productName: string;
  productCode: string;
}
export interface SearchChequeBookResponse extends IFetchingState {
  status: string;
  typeDesc: string;
  numberOfleaves: string;
  userId: string;
  currentCost: string;
  typeId: string;
}

export interface SearchGLNodeResponse extends IFetchingState {
  status: string;
  gl_NodeName: string;
  numberOfleaves: string;
  userId: string;
  gl_NodeCode: string;
  prodCode: string;
  glNodeStatus: string;
}

export interface SearchInterestResponse extends IFetchingState {
  status: string;
  intName: string;
  targetBase: string;
  userId: string;
  intcode: string;
  maxRate: string;
  minRate: string;
}

export interface SearchGLClassResponse extends IFetchingState {
  status: string;
  gl_ClassCode: string;
  gl_ClassName: string;
  userId: string;
  nodeCode: string;
}

export interface UseGetSetUpBranchResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  branches?: ISetupBranch | IBranch[] | Array<any>;
  branch?: IBranch | IBranch[] | Array<any>;
  results?: ISetupBranch[] | Array<any>;
}

export interface IEducation {
  educationCode: number;
  educationname: string;
  status: number;
  userid: string;
  authid: string;
  createdate: string;
}

export interface IIndustry {
  industryCode: string;
  industryName: string;
  industryMne: string;
  status: number;
  sector: string;
}

export interface IEducationByCode {
  educationCode: number;
  educationname: string;
  status: number;
  userid: string;
  authid: string;
  createdate: string;
}

export interface IProfession {
  profcode: string;
  profname: string;
  profmne: string;
  status: number;
  userid: string;
  authid: string;
  createdate: string;
  sector: string;
}

export interface ISector {
  sectorCode: string;
  sectorName: string;
  sectorMne: string;
  status: number;
  userid: string;
  authid: string;
  createdate: string;
}

export interface IGroup {
  groupID: string;
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
  userid: string;
  authid: string;
  createdate: string;
  grouplimit: number;
  partLimit: number;
  memberLimit: number;
  branchcode: string;
  groupEmail: string;
  groupSecIndicator: number;
  groupHeadIndicator: number;
  acctOfficer: string;
}

export interface IOccupation {
  profcode: string;
  profname: string;
}

export interface ICountry {
  countryCode: string;
  countryName: string;
  countryMne: string;
  status: number;
  currencyName: string;
  currencyMne: string;
  userid: string;
  authid: string;
  createdate: string;
}
export interface IGLNode {
  gL_NodeCode: string;
  gL_NodeName: string;
  prodCode: string;
  status: number;
  userid: string;
  authid: string;
  createdate: string;
}
export interface IGLTypeClass {
  gL_ClassCode: string;
  gL_ClassName: string;
  nodeCode: string;
  statu: number;
  userid: string;
  authid: string;
  createdate: string;
  lastNumber: number;
}
export interface ICommercialBank {
  bankcode: string;
  bankName: string;
  bankshortname: string;
  createdate: string;
  status: number;
  userid: string;
  authorisedby: string;
  authid: string;
  cbnCode: string;
}

export interface IDormancy {
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

export interface ICheque {
  typeId: number;
  typeDesc: string;
  numberOfleaves: number;
  status: number;
  glAccount1: string;
  currentCost: number;
  glAccount2: string;
  batchno: number;
  lastnumber: number;
  unitpr: number;
  variance: number;
  userid: string;
  authid: string;
  createdate: string;
  authorisedby: string;
  accountType: string;
}

export interface IClearingBank {
  clearingID: string;
  bankCode: string;
  chequeinClear: string;
  nostro: string;
  status: number;
  userid: string;
  authid: string;
  createdate: string;
  unclearedgl: string;
  collectiongl: string;
}

export interface IException {
  exceptioncode: string;
  exceptionDesc: string;
  behaviour: number;
  status: number;
  userid: string;
  authid: string;
  createdate: string;
}
export interface ICharge {
  chargeCode: string;
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
  userid: string;
  authid: string;
}
export interface IProductInfo {
  productCode: string;
  productName: string;
  productshort: string;
  productclass: number;
  producttype: string;
  rdOption: number;
  rdType: number;
  crtype: string;
  crvariance: number;
  drtype: string;
  drvariance: number;
  drRate: number;
  crRate: number;
  yrProcessMethod: number;
  productExpire: string;
  productstart: string;
  currencycode: string;
  floorlevel: number;
  withholdtax: number;
  minBalance: number;
  interestReceivable: string;
  interestIncome: string;
  interestExpense: string;
  interestPayable: string;
  incomeunearned: string;
  expenseunpaid: string;
  suspendedAsset: string;
  suspendedIntRec: string;
  sundaryGL: string;
  upFrontGLonTD: string;
  suspendedIntIncome: string;
  suspendedLegalFee: string;
  suspendedIntRecoverable: string;
  suspendedPrincipal: string;
  assetBalance: string;
  legalfee: string;
  interestAccrual: string;
  maturedDepositGL: string;
  unclaimedDepositGL: string;
  principalBal: string;
  liabilityBal: string;
  paymentGL: string;
  writeoff: string;
  taxabsorbed1: string;
  taxabsorbed2: string;
  accrualFreq: string;
  capitalizFreq: string;
  checkBook: number;
  sweepIn: number;
  sweepOut: number;
  lien: number;
  od: number;
  si: number;
  siFloor: number;
  appType: string;
  cintrate: number;
  dintrate: number;
  balinterest: number;
  closeCharge: number;
  openbalance: number;
  status: number;
  closebalance: number;
  minIntbalance: number;
  minAmt: number;
  maxAmt: number;
  minTerm: number;
  maxTerm: number;
  minIntRate: number;
  maxIntRate: number;
  suspendedInt: string;
  miscIncome: string;
  intAccrFreq: string;
  intCalcBasis: string;
  scheduleType: string;
  calcMethod: string;
  repaymentMethod: string;
  suspReceivable: string;
  tdType: number;
  matDueNoticeDays: number;
  unClmDepositTrsfDays: number;
  renewalGracePeriod: number;
  reqloangrouplimit: number;
  termtype: string;
  acctClosegl: string;
  interbranch: string;
  loantype: number;
  penalize: number;
  withallowed: number;
  repayoption: number;
  repayoption2: number;
  loanclass: number;
  penalrate: number;
  penalchargegl: string;
  penalIntIncome: string;
  penalIntAccrual: string;
  penalIntSuspense: string;
  manageCollection: number;
  actualIntRate: number;
  actualRateCalcMethod: number;
  penalRateCalcMethod: number;
  moratorium: number;
  moratoriumType: number;
  intRateCode: string;
  noMultipleAcct: number;
  healthInsurance: number;
  healthInsuranceAcct: number;
  howLiqInterestisTaken: number;
  discountedType: number;
  interestOverdue: string;
  principalOverdue: string;
  ageMin: number;
  ageMax: number;
  cumTranLimit: number;
  cumLimitFlag: number;
  dTrnLimitFlag: number;
  dailyTranLimit: number;
  sTrnLimitFlag: number;
  singleTranLimit: number;
  sWthdLimitFlag: number;
  sWthdLimit: number;
  dWthdLimitFlag: number;
  dWthdLimit: number;
  rewardpayable: string;
  rewardpercent: number;
  referalReq: number;
  refPercentInt: number;
  referRewardCnt: number;
  loansecurityDepType: number;
  loansecurityDeposit: number;
  guarantorFlg: number;
  proxyAccount: string;
}
export interface ICreditInterests {
  intcode: string;
  intname: string;
}
export interface IProducts {
  prodclass: string;
  moduledesc: string;
}
export interface IProductClass {
  productCode: string;
  productName: string;
}
export interface ILoanClass {
  code: string;
  loandesc: string;
}
export interface IBankProducts {
  productCode: string;
  productName: string;
}
export interface IFrequency {
  freqcode: string;
  freqname: string;
}
export interface IInterests {
  intcode: string;
  intname: string;
  minRate: number;
  maxRate: number;
}
export interface IDemandDeposit {
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
  crtype: string;
  drType: string;
  withallowed: number;
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
  userid: string;
}
export interface ITreasuryDeposit {
  productCode: string;
  productName: string;
  productclass: number;
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
  userid: string;
}
export interface ILoanAccount {
  productCode: string;
  productName: string;
  productclass: number;
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
  chkHealthInsurance: number;
  healthInsuranceAcct: string;
  healthInsuranceAmt: number;
  userid: string;
}
export interface ICompany {
  bankCode: string;
  bankName: string;
  address: string;
  phone: string;
  email: string;
  country: string;
  userid: string;
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
  last_financialyear: string;
  next_financialyear: string;
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
}

export interface ISetupCondition {
  id: number;
  description: string;
  status: number;
  userid: string;
  createdate: string;
  code: string;
}

export interface IZone {
  zoneid: string;
  zoneName: string;
  nodays: number;
  status: number;
  userid: string;
  authid: string;
  createdate: string;
}

export interface IInterest {
  intCode: string;
  intName: string;
  maxRate: number;
  minRate: number;
  status: number;
  authId: string;
  userId: string;
  createDate: string;
  targetBase: string;
  intValue: number;
  variance: number;
}

export interface IGLClass {
  gL_ClassCode: string;
  gL_ClassName: string;
  nodeCode: string;
  status: number;
  userid: string;
  authid: string;
  createdate: string;
  lastNumber: string;
}

export interface IGetCommercialBank {
  bankcode: string;
  bankName: string;
  bankshortname: string;
  createdate: string;
  status: number;
  userid: string;
  authorisedby: string;
  authid: string;
  cbnCode: string;
}
export interface IGetNibbsCommercialBank {
  bankCode: string;
  bankName: string;
}

export interface ITransactionType {
  trancode: string;
  tranname: string;
}
export interface IDepartment {
  deptid: string;
  deptName: string;
  deptShortname: string;
  status: number;
  userid: string;
  authid: string;
  createdate: string;
}
export interface ITownName {
  townCode: string;
  townName: string;
  stateCode: string;
  status: number;
  townshortname: string;
  authid: string;
  userid: string;
  createdate: string;
}

export interface IRegionByCode {
  regionCode: string;
  regionName: string;
  regionmne: string;
  status: number;
  userid: string;
  authid: string;
  createdate: string;
}
export interface IDocumentById {
  docid: string;
  docName: string;
  docShortname: string;
  status: number;
  userid: string;
  authid: string;
  createdate: string;
}

export interface IStateById {
  stateCode: string;
  stateName: string;
  statemne: string;
  countryCode: string;
  capital: string;
  status: number;
  region: string;
  userid: string;
  authid: string;
  datecreated: number;
  createdate: number;
}
export interface IHoliday {
  id: number;
  holidaydate: string;
  holidaydays: number;
  status: number;
  authid: string;
  userid: string;
  holidayends: string;
  holidaydesc: string;
}

export interface GetAllSectorResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  sectors?: ISector[];
  sector?: ISector;
}

export interface GetAllGroupResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  group?: IGroup;
}

export interface GetAllEducationResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  education?: IEducationByCode | IEducation[] | Array<any>;
}

export interface GetAllIndustryResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  industry?: IIndustry;
}

export interface GetAllProfessionResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  profession?: IProfession;
}

export interface GetAllOccupationResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  professions?: IOccupation[];
}

export interface UseAllSetupConditionResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  conditionPrecedence: ISetupCondition;
}

export interface UseAllZoneResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  zone: IZone;
}

export interface UseAllInterestResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  interest: IInterest;
}

export interface UseGetAllCountryResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  countries?: ICountry[];
  country?: ICountry;
}

export interface UseGetAllDepartmentResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  department?: IDepartment;
}

export interface UseGetAllGLClassResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  gl?: IGLClass;
}

export interface UseGetAllGLNodeResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  node?: IGLNode | IGLNode[];
  glClasses?: IGLTypeClass[];
}

export interface UseGetAllCommercialBankResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  commBanks?: ICommercialBank;
}

export interface UseGetAllDormancyResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  dormancyData?: IDormancy;
}

export interface UseGetAllChequeResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  checkbooks?: ICheque;
}

export interface UseGetAllClearingBankResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  clearBanks?: IClearingBank;
  commBanks?: IGetCommercialBank[];
}

export interface UseGetAllTransactionTypeResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  transactType?: ITransactionType;
}

export interface UseGetAllExceptionResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  exceptionData?: IException;
}
export interface UseGetAllChargeResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  charge?: ICharge;
}

export interface IProdDocs {
  docid?: string;
  docName?: string;
}
export interface IProdType {
  PCode: string;
  PName: string;
}
export interface IGLWithBranchCode {
  currencyCode: string;
  closed: string;
  status: number;
  branchCode: string;
  glnumber: string;
  acctName: string;
  dateOpened: string;
  gl_ClassCode: string;
  dt_Lst_Month: string;
  last_Month_Balance: string;
  last_Night_Balance: number;
  bkbalance: number;
  tpostDebit: string;
  tpostCredit: string;
  blocked: string;
  bbf: string;
  prodType: string;
  pointing: string;
  controlflag: string;
  controlGlag: string;
  reconLen: string;
  post: string;
  typeP: string;
  populate: string;
  oldGLno: string;
  last_night_balance2: number;
  swing: string;
  last_month_balance2: string;
  last_month_balance1: string;
  last_eom2: string;
  last_eom1: string;
  currmondiff: string;
  lastmondiff: string;
  userid: string;
  createdate: string;
  authid: number;
}
export interface IProdCodeType {
  PCode: string;
  PName: string;
}
export interface UseGetAllProductDocsResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  prodDocs?: IProdDocs[];
}
export interface UseGetProductTypeResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  data?: IProdCodeType[];
}
export interface UseGetProductClassByCategoryResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  data?: IProdType[];
}
export interface UseGetGLWithBranchCodeResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  data?: IGLWithBranchCode[];
}

export interface UseGetAllLoanAccountResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  loanProducts?: ILoanAccount;
  demandDeposit?: IDemandDeposit;
  productInfos?: IProductInfo;
  creditInterests?: ICreditInterests[];
  loanClass?: ILoanClass[];
  interests?: IInterests[];
  products?: IProducts[] | IProductClass[];
  exception?: IException[];
  bankproducts?: IBankProducts[];
  frequency?: IFrequency[];
  termDeposit?: ITreasuryDeposit;
}

export interface UseGetAllCompanyResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  bank?: ICompany;
  company?: ICompany[];
}

export interface UseGetAllTownResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  towns?: ITownName[];
  town?: ITownName;
}
export interface UseGetAllRegionResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  region?: IRegionByCode | IRegionByCode[];
}

export interface UseGetAllDocumentResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  documents?: IDocumentById;
}

export interface UseGetAllStateResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  state?: IStateById;
}

export interface UseGetAllHolidaysResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  holiday?: IHoliday;
}

export interface SearchHolidayResponse extends IFetchingState {
  holidaydays: string;
  holidayDesc: string;
  status: string;
}

export interface SearchCountryResponse extends IFetchingState {
  userid: string;
  countryName: string;
  countryCode: string;
  status: string;
  currencyName: string;
}

export interface SearchTownResponse extends IFetchingState {
  userid: string;
  townCode: string;
  status: string;
  townName: string;
  stateCode: string;
  stateName: string;
}
