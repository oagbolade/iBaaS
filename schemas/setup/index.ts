import * as Yup from 'yup';
import { emailRegex, numericRegex, phoneRegExp, stringRegex } from '../admin';

export const createCompanySchema = Yup.object({
  bankName: Yup.string().required('Company Name is Required'),
  address: Yup.string().required('address is Required'),
  phone: Yup.string()
    .matches(/^\d{11}$/, 'Phone number must be exactly 11 digits')
    .required('Phone is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  currency: Yup.string().required('Currency Required'),
  state: Yup.string().required('state is Required'),
  slogan: Yup.string().required(' Slogan is Required'),
  eoYglacct: Yup.string().required('EOY P and L is Required'),
  cbncode: Yup.string()
    .matches(/^\d+$/, 'CBN Code must be numeric')
    .required('Required'),
  webSite: Yup.string().required('Website is Required'),
  servername: Yup.string()
    .matches(stringRegex, 'Invalid server name')
    .required('Server Name is Required'),
  pandLacct: Yup.string()
    .matches(/^\d+$/, 'Value must be numeric')
    .required('P and L Account is Required'),
  priorpandLacct: Yup.string()
    .matches(/^\d+$/, 'Prime Lending Rate must be numeric')
    .required('Prime Lending Rate is Required'),
  last_financialyear: Yup.string().required('Last Financial Year is Required'),
  next_financialyear: Yup.string().required('Next Financial Year is Required')
});

export const createBranchSchema = Yup.object({
  branchName: Yup.string()
    .matches(stringRegex, 'Invalid branch name')
    .required('Branch Name is Required'),
  address: Yup.string().required('Address is Required'),
  phone: Yup.string()
    .matches(/^\d{11}$/, 'Phone number must be exactly 11 digits')
    .required('Phone is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  country: Yup.string().required('Country is Required'),
  state: Yup.string().required('State is Required'),
  branchType: Yup.string().required('Branch Type Required'),
  city: Yup.string().required('City is Required')
});

export const createCountrySchema = Yup.object({
  countryName: Yup.string()
    .matches(stringRegex, 'Invalid country name')
    .required('Country Name is Required'),
  currencyName: Yup.string()
    .matches(stringRegex, 'Invalid currency name')
    .required('Currency Name is Required'),
  currencyMne: Yup.string().required('Currency Mne is Required')
});

export const createTownSchema = Yup.object({
  townName: Yup.string()
    .matches(stringRegex, 'Invalid Town name')
    .required('Town Name is Required'),
  stateCode: Yup.string().required('State Code is Required'),
  townshortname: Yup.string().required('Town Short Name is Required'),
  townstatus: Yup.string().required('Town status is Required')
});

export const createRegionSchema = Yup.object({
  regionName: Yup.string()
    .matches(stringRegex, 'Invalid region name')
    .required('Region Name is Required'),
  regionmne: Yup.string()
    .matches(stringRegex, 'Invalid region Mne')
    .required('Region Mne is Required'),
  status: Yup.string().required('Status is Required')
});

export const createIndustrySchema = Yup.object({
  industryName: Yup.string()
    .matches(stringRegex, 'Invalid Industry name')
    .required('industry  Name is Required'),
  industryMne: Yup.string().required('Industry Mne is  Required'),
  sector: Yup.string().required('Sector is Required'),
  status: Yup.string().required('Status is Required')
});

export const createProfessionSchema = Yup.object({
  profname: Yup.string()
    .matches(stringRegex, 'Invalid Profession name')
    .required('Profession  Name is Required'),
  profmne: Yup.string()
    .matches(stringRegex, 'Invalid Profession Mne')
    .required('Profession  Mne is Required')
});

export const createGroupSchema = Yup.object({
  groupName: Yup.string()
    .matches(stringRegex, 'Invalid group name')
    .required('group  Name is Required'),
  groupAddress: Yup.string()
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
  branchcode: Yup.string().required(' Branch Code is Required'),
  memberLimit: Yup.string()
    .matches(numericRegex, 'Input must be a number')
    .required('Member  Limit is Required'),
  grouplimit: Yup.string()
    .matches(numericRegex, 'Input must be a number')
    .required('Group Limit is Required'),
  partLimit: Yup.string()
    .matches(numericRegex, 'Input must be a number')
    .required('Partial Limit is Required'),
  groupPhone: Yup.string()
    .required('Group phone number is Required')
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(11, 'must be 11 digits long')
    .max(11, 'too long, must be excatly 11 digits'),
  secretaryPhone: Yup.string()
    .required('Required')
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(11, 'must be 11 digits long')
    .max(11, 'too long, must be excatly 11 digits'),
  groupEmail: Yup.string()
    .matches(emailRegex, 'Invalid group Email')
    .required('group  Email is Required')
});

export const createSectorSchema = Yup.object({
  sectorMne: Yup.string().required('Required'),
  sectorName: Yup.string()
    .matches(stringRegex, 'Invalid Sector name')
    .required('Sector  Name is Required'),
  status: Yup.string().required('Status is  Required')
});

export const createHolidaySchema = Yup.object({
  holidaydesc: Yup.string()
    .matches(stringRegex, 'Invalid Holiday description')
    .required('Holiday description is Required'),
  holidaydays: Yup.string()
    .matches(numericRegex, 'Invalid input')
    .required('Holiday day is Required'),
  holidaydate: Yup.string().required('Holiday Date is Required')
});

export const updateStateSchema = Yup.object({
  stateName: Yup.string().required('State Name is Required'),
  stateCode: Yup.string().required('State Code is Required'),
  capital: Yup.string().required('State Capital is Required'),
  statemne: Yup.string().required('State Menumonic is Required'),
  region: Yup.string().required('Region is Required')
});

export const createDepartmentSchema = Yup.object({
  deptName: Yup.string()
    .matches(stringRegex, 'Invalid department name')
    .required('Department Name is Required'),
  deptShortname: Yup.string()
    .matches(stringRegex, 'Invalid department mneumonic')
    .required('DepartMent Short Name is Required')
});
export const createDocumentSchema = Yup.object({
  docName: Yup.string()
    .matches(stringRegex, 'Invali document Name')
    .required('document Name is Required'),
  docShortname: Yup.string()
    .matches(stringRegex, 'Invalid document Short Name')
    .required('document Short Name is Required')
});

export const createEducationSchema = Yup.object({
  educationname: Yup.string()
    .matches(stringRegex, 'Invalid education name')
    .required('Education Name is Required')
});

export const createZoneSchema = Yup.object({
  zoneName: Yup.string()
    .matches(stringRegex, 'Invalid education name')
    .required('Education Name is Required'),
  nodays: Yup.string()
    .matches(numericRegex, 'Invalid input')
    .required('Days is Required')
});

export const createRelationshipSchema = Yup.object({
  relationname: Yup.string()
    .matches(stringRegex, 'Invalid RelationShip name')
    .required('RelationShip Name is Required')
});

export const createTransactionTypeSchema = Yup.object({
  tranName: Yup.string()
    .matches(stringRegex, 'Invalid Transaction name')
    .required('Transaction Name is Required'),
  tranType: Yup.string().required('Transaction Type is Required'),
  tranShortname: Yup.string()
    .matches(stringRegex, 'Invalid Transaction short name')
    .required('Transaction short Name is Required'),
  status: Yup.string().required('Status is Required')
});
export const createCasaProductSchema = Yup.object({
  productclass: Yup.string().required('Product Class is Required'),
  productCode: Yup.string().required('Product Code is Required'),
  productName: Yup.string()
    .matches(stringRegex, 'Invalid Product name')
    .required('Product Name is Required'),
  openbalance: Yup.string()
    .matches(numericRegex, 'Invalid Open Balance ')
    .required('Open Balance is Required'),
  currencycode: Yup.string().required('Currency Code is Required'),
  statecode: Yup.string().required('Required'),
  accountNumber: Yup.string().required('Required'),
  productstart: Yup.string().required('Product start date is Required'),
  productExpire: Yup.string().required('Product End date is Required'),
  appType: Yup.string()
    .matches(stringRegex, 'invalid Application type')
    .required('Application Type is Required'),
  shortname: Yup.string()
    .matches(stringRegex, 'invalid Short Name')
    .required('Short Name is Required'),
  closeBalance: Yup.string()
    .matches(numericRegex, 'Invalid Close Balance')
    .required('Close Balance is Required'),
  minintbalance: Yup.string()
    .matches(numericRegex, 'Invalid Min Balance')
    .required('Min Int Balance is Required'),
  maxamt: Yup.string()
    .matches(numericRegex, 'Invalid Max amount')
    .required('Max Amount is Required'),
  taxabsorbed1: Yup.string()
    .matches(stringRegex, 'Invalid Tax absorbed')
    .required('Tax Absorbed is Required'),
  dayint: Yup.string().required('Day Int is Required'),
  crtype: Yup.string()
    .matches(numericRegex, 'Invalid Credit Type')
    .required('Credit Type is Required'),
  drType: Yup.string()
    .matches(numericRegex, 'Invalid Debit Type')
    .required('Debit Type is Required'),
  withallowed: Yup.string()
    .matches(numericRegex, 'Invalid With Allowance')
    .required('With Allowance is Required'),
  interestIncome: Yup.string()
    .matches(numericRegex, 'Invalid Interest Income')
    .required('Interest Income is Required'),
  interbr: Yup.string()
    .matches(stringRegex, 'Invalid Inter Branch')
    .required('Inter Br is Required'),
  liabilityBal: Yup.string()
    .matches(numericRegex, 'Invalid Liability Balance ')
    .required('Liability Balance is Required'),
  suspendedAsset: Yup.string()
    .matches(stringRegex, 'Invalid Suspended Asset ')
    .required('Suspended Asset is Required'),
  assetBalance: Yup.string()
    .matches(numericRegex, 'Invalid Asset Balance')
    .required('Asset Balance is Required'),
  interestReceivable: Yup.string()
    .matches(numericRegex, 'Invalid Interest Receivable ')
    .required('Interest Receivable is Required'),
  interestPayable: Yup.string()
    .matches(numericRegex, 'Invalid Interest Payable')
    .required('Interest Payable is Required'),
  interestExpense: Yup.string()
    .matches(numericRegex, 'Invalid Interest Expense')
    .required('Interest Expense is Required'),
  suspendedIntIncome: Yup.string()
    .matches(numericRegex, 'Invalid Suspended Int Income')
    .required('Suspended Int Income is Required'),
  acctClosegl: Yup.string()
    .matches(numericRegex, 'Invalid Account close')
    .required('Acct Close GL is Required'),
  unearnincome: Yup.string()
    .matches(numericRegex, 'Invalid Unearned Income')
    .required('Unearned Income is Required')
});
export const createLoanProductSchema = Yup.object({
  productName: Yup.string()
    .matches(stringRegex, 'Invalid Product name')
    .required('Product Name is Required'),
  appType: Yup.string().required('Application Type is Required'),
  shortname: Yup.string()
    .matches(stringRegex, 'Invalid  short name')
    .required(' short Name is Required'),
  productstart: Yup.string().required('Product start date is Required'),
  productExpire: Yup.string().required('Product End date is Required'),
  currencycode: Yup.string().required('Currency Code is Required'),
  term: Yup.string().required('Loan term is Required'),
  maxintrate: Yup.string().required('Loan term is Required'),
  statecode: Yup.string().required('Required'),
  productException: Yup.string().required('Required'),
  penalInterest: Yup.string().required('Required'),
  actualRAte: Yup.string().required('Actual Rate is Required'),
  penalrate: Yup.string().required('Penalty Rate is Required'),
  minloan: Yup.string()
    .matches(numericRegex, 'Invalid Minimum loan')
    .required('Minimum Loan is Required'),
  moratorium: Yup.string().required('Moratorium is Required'),
  collval: Yup.string()
    .matches(stringRegex, 'Invalid Collateral Value')
    .required('Collateral Value is Required'),
  schtype: Yup.string().required('Schedule Type is Required'),
  loanclass: Yup.string()
    .matches(numericRegex, 'Invalid Loan Class')
    .required('Loan Class is Required'),
  principalbalance: Yup.string()
    .matches(numericRegex, 'Invalid Principal Balance')
    .required('Principal Balance is Required'),
  susinterest: Yup.string()
    .matches(stringRegex, 'Invalid Suspense Interest')
    .required('Suspense Interest is Required'),
  intaccrual: Yup.string()
    .matches(numericRegex, 'Invalid Interest Accrual ')
    .required('Interest Accrual is Required'),
  interestincome: Yup.string()
    .matches(numericRegex, 'Invalid Interest Income ')
    .required('Interest Income is Required'),
  interbr: Yup.string().required('Interest Bracket is Required'),
  penalIntAccrual: Yup.string()
    .matches(numericRegex, 'Invalid Penalty Int Accrual ')
    .required('Penalty Int Accrual is Required'),
  interestReceivable: Yup.string()
    .matches(numericRegex, 'Invalid Interest Receivable')
    .required('Interest Receivable is Required'),
  susprinc: Yup.string()
    .matches(stringRegex, 'Invalid Suspense Principal ')
    .required('Suspense Principal is Required'),
  penalIntIncome: Yup.string()
    .matches(numericRegex, 'Invalid Penalty Int Income')
    .required('Penalty Int Income is Required'),
  micincome: Yup.string()
    .matches(numericRegex, 'Invalid MIC Income')
    .required('MIC Income is Required'),
  penalSuspense: Yup.string().required('Penalty Suspense is Required'),
  uid: Yup.string().required('UID is Required')
});
export const createDormancySchema = Yup.object({
  prodCode: Yup.string().required('Pord Code is Required'),
  duration: Yup.string().required('duration is Required'),
  penalty: Yup.string()
    .matches(numericRegex, 'Invalid Penalty Amount')
    .required('Penalty Amount is Required'),

  penaltyGlAccount: Yup.string()
    .matches(numericRegex, 'Invalid penalty GL Account')
    .required('Required')
});

export const createChequeBokSchema = Yup.object({
  batchno: Yup.string().required('Batch Number is Required'),
  numberOfleaves: Yup.string()
    .matches(numericRegex, ' Invalid Number of leaves')
    .required('Number of leaves   is Required'),
  lastnumber: Yup.string()
    .matches(numericRegex, 'Invalid last Number')
    .required('last Number is Required'),
  currentCost: Yup.string()
    .matches(numericRegex, 'Invalid Current Cost')
    .required('Current Cost  is Required'),
  accountType: Yup.string()
    .matches(numericRegex, 'Invalid Account Type')
    .required('Account Type is Required'),
  glAccount1: Yup.string().required('GL Acount is  Required'),
  glAccount2: Yup.string()
    .matches(numericRegex, 'Invalid GL Acount')
    .required('GL Acount is Required'),
  typeDesc: Yup.string()
    .matches(stringRegex, 'Invalid cheque book name')
    .required('Cheque book name is  Required')
});

export const filterChequeSchema = Yup.object({
  typeId: Yup.string().required('Cheque  Name is Required'),
  typeDesc: Yup.string()
    .matches(stringRegex, 'Invalid cheque book name')
    .required('Cheque Book nam is Required')
});

export const createNodeSchema = Yup.object({
  gL_NodeName: Yup.string()
    .matches(stringRegex, 'Invalid GL Node name')
    .required('GL Node  Name is Required'),
  gL_NodeCode: Yup.string()
    .matches(numericRegex, 'Invalid Gl Node code')
    .min(2, ' Gl Node Code should have 2 characters ')
    .max(2, 'Gl Node Code should have 2 characters')
    .required(' Gl Node Code is Required')
});

export const createCommercialBankSchema = Yup.object({
  bankName: Yup.string()
    .matches(stringRegex, 'Invalid Bank name')
    .required('Bank Name is Required'),
  bankshortname: Yup.string()
    .matches(stringRegex, 'Invalid Bank short name')
    .required(' Bank short Name is Required')
});

export const createClearingBankSchema = Yup.object({
  bankCode: Yup.string().required('Bank Code is Required'),
  chequeinClear: Yup.string()
    .matches(stringRegex, 'Invalid Cheque clear')
    .required('Cheque clear is Required'),
  nostro: Yup.string()
    .matches(stringRegex, 'Invalid Nostro')
    .required('Nostor is Required'),
  unclearedgl: Yup.string()
    .matches(stringRegex, 'Invalid  unclear')
    .required(' unclear is Required'),
  collectiongl: Yup.string()
    .matches(stringRegex, 'Invalid collection')
    .required('collection  is Required')
});

export const createGlClassSchema = Yup.object({
  gL_ClassName: Yup.string()
    .matches(stringRegex, 'Invalid Gl Class name')
    .required('Gl Class Name is Required'),
  gL_ClassCode: Yup.string()
    .matches(numericRegex, 'Invalid Gl Class code')
    .required('GL Class Code is Required')
    .min(3, 'Minimum of 3 number')
    .max(3, 'maximum of 3 number'),
  nodeCode: Yup.string()
    .matches(numericRegex, 'Invalid  Node code')
    .required('Node Code is Required')
});

export const createExceptionSchema = Yup.object({
  exceptionDesc: Yup.string()
    .matches(stringRegex, 'Invalid Exception Description')
    .required('Exception Description is Required'),
  behaviour: Yup.string().required('Behariour is Required')
});

export const createSetupConditionSchema = Yup.object({
  description: Yup.string()
    .matches(stringRegex, 'Invalid Exception Description')
    .required('Exception Description is Required')
});

export const createInterestSchema = Yup.object({
  maxRate: Yup.string()
    .matches(numericRegex, 'Max Rate must be a Number')
    .required('Max Rate is Required'),
  intName: Yup.string()
    .matches(stringRegex, 'Invalid Interest Name')
    .required('Interest Name is Required'),
  minRate: Yup.string()
    .matches(numericRegex, 'Min Rate must be a Number')
    .required('Min Rate is Required')
});
export const createChargeSchema = Yup.object({
  chargeDesc: Yup.string()
    .matches(stringRegex, 'Invalid charge description')
    .required('charge description is Required'),
  branchMask: Yup.string().required('Branch Mask is Required'),
  freq: Yup.string().required(' When will charge take place is Required'),
  glCode: Yup.string()
    .matches(numericRegex, 'Invalid GL Number')
    .required('Income GL Account is Required')
});

export const filterSectionSchema = Yup.object({
  exceptionDesc: Yup.string().matches(
    stringRegex,
    'Invalid Exception Description'
  )
});
export const filterSectionSetupConditionSchema = Yup.object({
  description: Yup.string().matches(
    stringRegex,
    'Invalid Exception Description'
  )
});
