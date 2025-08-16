import dayjs, { Dayjs } from 'dayjs';
import { getCurrentDate, getCurrentIsoDate } from '@/utils/getCurrentDate';
import { getStoredUser } from '@/utils/user-storage';

export interface AddGroupMemberFormValues {
  customerName: string;
}

export interface OfficerTransferFormValues {
  transferType: string;
}

export interface AddGroupFormValues {
  groupID: string;
  groupName: string;
  groupDesc: string;
}

export interface GroupMemberOnboardingFormValues {
  list: {
    groupId: string;
    memberId: string;
  }[];
}

export interface CreateCustomerAccountFormValues {
  branchcode: string;
  acctdesc: string;
  cintrate: string;
  dintrate: string;
  productcode: string;
  customerid: string;
  oldacct: string;
  refCode: string;
  channel: string;
  json: Array<{ reqID: number }>;
}

export interface CreateGroupFormValues {
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

export interface AddCustomerLienFormValues {
  accountnumber: string;
  holdAmount: number;
  effective_dt: string | Dayjs;
  end_dt: string | Dayjs;
  reasoncode: string;
  userid: string;
  authid: string;
  lien: number;
}

export interface ILienDetail {
  myHoldnumber: number;
  releaseAmount: number;
  reasonCode: string;
}

export interface ReleaseLienFormValues {
  accountnumber: string;
  lienDetail: ILienDetail[];
}

export interface EditChequeBookFormValues {
  accountNumber: string;
  checktype: string;
  startSerialNo: number;
  endSerialNo: number;
  reason: string;
  userId: string;
  valueDate: string | Dayjs;
  daterec: string;
  action: number;
}

export interface RangeChequeFormValues {
  accountNumber: string;
  accounttype: string;
  branchToCollect: string;
  chequebooktype: number;
  costofchequebk: number;
  costtocustomer: number;
  endSerialNo: number;
  narration: string;
  selectedDate: string | Dayjs;
  startSerialNo: number;
  menuid: number;
  userid: string;
}

export interface CreateRangeChequeFormValues {
  accountNumber: string;
  accounttype: string;
  branchToCollect: string;
  chequebooktype: number;
  costofchequebk: number;
  costtocustomer: number;
  endSerialNo: number;
  narration: string;
  selectedDate: string;
  startSerialNo: number;
  userid: string;
}

export interface MoveCasaAccountFormValues {
  customerid: string;
  casaAccountno: string;
  newBranch: string;
  newAcctOfficer: string;
  userId: string;
}

export interface CreateCustomerMandateFormValues {
  AccountNumber: string;
  CustomerId: string;
  BVN: string;
  PictImgType: string;
  SignImageType: string;
  customerPict: File;
  customerSign: File;
}

export interface CreateCorporateCustomerFormValues {
  regno: string;
  compname: string;
  dob: string | Dayjs;
  sectorcode: string;
  nationality: string;
  statecode: string;
  countryCode: string;
  companyStatecode: string;
  companyTowncode: string;
  address: string;
  phone1: string;
  phone2: string;
  phone3: string;
  phone4: string;
  email: string;
  taxId: string;
  contact: string;
  introid: string;
  groupcode: string;
  branchCode: string;
  smsalert: number;
  emailalert: number;
  bvn: string;
  secName: string;
  secphone: string;
  zipCode: string;
  shareCapital: number;
  turnOver: number;
  scuml: string;
  compObjective: string;
  // userid: string;
  authid: string;
  acctOfficer: string;
  [key: string | number]: string | number | Dayjs;
}

export interface DeleteDirectorValues {
  directorId: string;
  customerId: string;
}

export interface CreateDirectorMandateFormValues {
  directorid: string;
  customeriD: string;
  signatoryImg: string;
  imgtype2: string;
  designation: string;
  mandatedesc1: string;
  serial: number;
  userid: string;
  authid: string;
}

export interface CreateDirectorFormValues {
  titlecode: number;
  surName: string;
  firstName: string;
  othername: string;
  dob: string;
  gender: string;
  nationality: string;
  statecode: string;
  townCode: string;
  address: string;
  phone: string;
  bvn: string;
  customeriD: string;
  userid: string;
  authid: string;
  isCeo: number;
  isChairman: number;
  rank: string;
}

export interface CreateIndividualCustomerFormValues {
  customerType: string;
  title: string;
  surName: string;
  firstName: string;
  othername: string;
  mothermdName: string;
  residentCountry: string;
  bizState: string;
  bizAddress: string;
  dob: string | Dayjs;
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
  idIssueDate: string | Dayjs;
  idExpryDate: string | Dayjs;
  groupcode: string;
  branchCode: string;
  sectorcode: string;
  relcustid: string;
  relationtype: string;
  introid: string;
  refname: string;
  refphone: string;
  acctOfficer: string;
  signacct: string;
  smsalert: number;
  emailalert: number;
  bvn: string;
  taxIDNo: string;
  natIDNo: string;
  bizCtry: string;
  bizTowncode: string;
  bizPhone3: string;
  residPermNo: string;
  residPermDate: string | Dayjs;
  residExpDate: string | Dayjs;
  empBusName: string;
  fatcaid: string;
  ctzorRes: string;
  psprtAlnNO: string;
  psprtIssDate: string | Dayjs;
  psprtExpDate: string | Dayjs;
  mdName: string;
  ssn: string;
  nextOfKinRel: string;
  nextOfKinState: string;
  nextOfKintown: string;
  zipCode: string;
  sigClass: string;
  menuid: number;
  rolelevel: number;
  comments: string;
  authListID: number;
  customerPict: string;
  pictImage_Type: string;
  customerSign: string;
  signImage_Type: string;
  [key: string]: string | number | Dayjs;
  introType: number;
  userid: string;
}

export interface CloseCustomerAccountFormValues {
  accountnumber: string;
  intcredit: number;
  intDebit: number;
  chargeDue: number;
  closeBalance: number;
  settlementAcct: string;
}

export interface ReactivateCustomerAccountFormValues {
  accountnumber: string;
  chargeDue: number;
  valuedate: string | Dayjs;
  authid: string;
}

export const reactivateCustomerAccountInitialValues: ReactivateCustomerAccountFormValues =
  {
    accountnumber: '',
    chargeDue: 0,
    valuedate: dayjs(getCurrentDate()),
    authid: `${getStoredUser()?.companyCode}`
  };

export const createCustomerAccountInitialValues: CreateCustomerAccountFormValues =
  {
    branchcode: '',
    acctdesc: '',
    cintrate: '',
    dintrate: '',
    productcode: '',
    customerid: '',
    oldacct: '',
    refCode: '',
    channel: '',
    json: [
      {
        reqID: 1 // TODO: find a way to dynamically add document reqID, currently we dont have a UI for this
      }
    ]
  };

export const createCorporateCustomerInitialValues: CreateCorporateCustomerFormValues =
  {
    regno: '',
    compname: '',
    dob: '',
    sectorcode: '',
    nationality: '',
    statecode: '',
    countryCode: '',
    companyStatecode: '',
    companyTowncode: '',
    address: '',
    phone1: '',
    phone2: '',
    phone3: '',
    phone4: '',
    email: '',
    taxId: '',
    contact: '',
    introid: '',
    introType: '' ,
    groupcode: '',
    branchCode: '',
    smsalert: 0,
    emailalert: 0,
    bvn: '',
    secName: '',
    secphone: '',
    zipCode: '',
    shareCapital: 0,
    turnOver: 0,
    scuml: '',
    compObjective: '',
    menuid: 35,
    authid: '',
    acctOfficer: '',
  };

export const createCustomerInitialValues: CreateIndividualCustomerFormValues = {
  customerType: 'individual',
  title: '',
  surName: '',
  firstName: '',
  othername: '',
  mothermdName: '',
  residentCountry: '',
  bizState: '',
  bizAddress: '',
  dob: '',
  sex: '',
  nationality: '',
  eduLevel: '',
  statecode: '',
  occupation: '',
  address: '',
  address2: '',
  residentStatecode: '',
  residentTowncode: '',
  phone1: '',
  phone2: '',
  phone3: '',
  phone4: '',
  email: '',
  nextOfKin: '',
  nextOfKinphone: '',
  nextOfKinaddr: '',
  idType: '',
  iDno: '',
  idIssueDate: dayjs(),
  idExpryDate: dayjs(),
  groupcode: '',
  branchCode: '',
  sectorcode: '',
  relcustid: '',
  relationtype: '',
  introid: '',
  refname: '',
  refphone: '',
  acctOfficer: `${getStoredUser()?.profiles?.userid}`,
  signacct: '',
  smsalert: 0,
  emailalert: 0,
  bvn: '',
  taxIDNo: '',
  natIDNo: '',
  bizCtry: '',
  bizTowncode: '',
  bizPhone3: '',
  residPermNo: '',
  residPermDate: dayjs(),
  residExpDate: dayjs(),
  empBusName: '',
  fatcaid: '',
  ctzorRes: '',
  psprtAlnNO: '',
  psprtIssDate: dayjs(),
  psprtExpDate: dayjs(),
  mdName: '',
  ssn: '',
  nextOfKinRel: '',
  nextOfKinState: '',
  nextOfKintown: '',
  zipCode: '',
  sigClass: '',
  menuid: 35, // TODO: Remove hardcoded value once we are able to get the menu id dynamically
  rolelevel: 0,
  comments: '',
  authListID: 0,
  customerPict: '',
  pictImage_Type: '',
  customerSign: '',
  signImage_Type: '',
  introType: 1,
  userid: `${getStoredUser()?.profiles?.userid}`
};

export const addGroupMemberInitialValues: AddGroupMemberFormValues = {
  customerName: ''
};

export const createDirectorInitialValues: CreateDirectorFormValues = {
  titlecode: 0,
  surName: '',
  firstName: '',
  othername: '',
  dob: '',
  gender: '',
  nationality: '',
  statecode: '',
  townCode: '',
  address: '',
  phone: '',
  bvn: '',
  customeriD: '',
  userid: getStoredUser()?.profiles.userid as string,
  authid: '',
  isCeo: 0,
  isChairman: 0,
  rank: 'ceo'
};

export const addGroupInitialValues: AddGroupFormValues = {
  groupID: '',
  groupName: '',
  groupDesc: ''
};

export const createLienInitialValues: AddCustomerLienFormValues = {
  accountnumber: '',
  holdAmount: 0,
  effective_dt: dayjs(),
  end_dt: dayjs(),
  reasoncode: '',
  userid: getStoredUser()?.profiles.userid as string,
  authid: '',
  lien: 0
};

export const editChequeBookInitialValues: EditChequeBookFormValues = {
  accountNumber: '',
  checktype: '1',
  startSerialNo: 0,
  endSerialNo: 0,
  reason: '',
  daterec: getCurrentIsoDate(),
  userId: getStoredUser()?.profiles.userid as string,
  valueDate: dayjs(),
  action: 0
};

export const rangeChequeInitialValues: RangeChequeFormValues = {
  accountNumber: '',
  accounttype: '1', // This will always be a current account
  branchToCollect: '',
  chequebooktype: 0,
  costofchequebk: 0,
  costtocustomer: 0,
  endSerialNo: 0,
  narration: '',
  selectedDate: dayjs(),
  startSerialNo: 0,
  menuid: 66, // TODO: Remove hardcoded value once we understand how menus work
  userid: getStoredUser()?.profiles.userid as string
};

export const closeCustomerAccountInitialValues: CloseCustomerAccountFormValues =
  {
    accountnumber: '',
    intcredit: 0,
    intDebit: 0,
    chargeDue: 0,
    closeBalance: 0,
    settlementAcct: ''
  };

export const moveCASAAccountInitialValues: MoveCasaAccountFormValues = {
  customerid: '',
  casaAccountno: '',
  newBranch: '',
  newAcctOfficer: '',
  userId: getStoredUser()?.profiles.userid as string
};

export const releaseLienInitialValues: ReleaseLienFormValues = {
  accountnumber: '',
  lienDetail: [
    {
      myHoldnumber: 0,
      releaseAmount: 0,
      reasonCode: ''
    }
  ]
};

export const createGroupInitialValues: CreateGroupFormValues = {
  groupID: '',
  groupName: '',
  groupHead: '',
  groupPhone: '',
  groupAddress: '',
  secretary: '',
  secretaryPhone: '',
  groupCreateDt: dayjs(getCurrentDate()).toISOString() as string,
  status: 0,
  maingroup: '',
  ismain: 0,
  userid: '',
  authid: '',
  createdate: dayjs(getCurrentDate()).toISOString() as string,
  grouplimit: 0,
  partLimit: 0,
  memberLimit: 0,
  branchcode: '',
  groupEmail: '',
  groupSecIndicator: 0,
  groupHeadIndicator: 0,
  acctOfficer: ''
};

export interface ClassifyAccountFormValues {
  accountNumber: string;
  provisionType: number;
  classify: number;
}

export const classifyAccountInitialValues: ClassifyAccountFormValues = {
  accountNumber: '',
  provisionType: 0,
  classify: 1
};

export const officerTransferInitialValues: OfficerTransferFormValues = {
  transferType: ''
};
