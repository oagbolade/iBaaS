/* eslint-disable import/no-cycle */
import { IFetchingState } from '@/constants/types';

export interface IDocuments {
  docname: string;
  reqid: string;
}
export interface IChargConcessionDetailsResults {
  custID: number;
  accountNumber: number;
  acctTitle: string;
  officerID: string;
  productName: string;
  branchName: string;
}
export interface IAccountDetailsResults {
  source: string;
  odProd: string;
  allowSI: string;
  oldacctno: string;
  siFloor: string;
  allowLien: string;
  od: string;
  accountnumber: string;
  pendingc: string;
  cintrate: string;
  dintrate: string;
  apptype: string;
  accounttitle: string;
  customerid: string;
  acctty: string;
  bkbal: string;
  effbal: string;
  usebal: string;
  prodname: string;
  branch: string;
  status: string;
  acctstatus: string;
  prodstatus: string;
  totalCharge: string;
  proddesc: string;
  productcode: string;
  closingCharge: string;
  officercode: string;
  accountdesc: string;
  disableview: string;
  holdBal: string;
  bvn: string;
  phoneNumber: string;
  email: string;
}

export interface IProductInfos {
  productcode: string;
  producttype: string;
  productexpire: string;
  productstart: string;
  sweepin: string;
  tdtype: string;
  ageMin: string;
  ageMax: string;
  mininterest: string;
  currencymne: string;
  productname: string;
  paymentGL: string;
  apptype: string;
  penalrate: string;
  minbalance: string;
  crrate: string;
  drrate: string;
  closecharge: string;
  openbalance: string;
}

export interface IIDTypes {
  idCardID: string;
  idCardName: string;
}

export interface IBankProducts {
  productCode: string;
  productName: string;
}

export interface IAccountInfo {
  fullname: string;
  dob: string;
  gender: string;
  bvn: string;
  email: string;
  title: string;
}

export interface IAccountInfoList {
  fullname: string;
  statusdesc: string;
  address: string;
  phone: string;
  createDate: string;
  intAccruedDaily: number;
  unclearedBal: number;
  suspBal: number;
  odLimit: number;
  bookBalance: number;
  branchName: string;
  customerType: string;
  bvn: string;
  accountNumber: string;
  productName: string;
  closeBalance: number;
  holdBal: number;
  effBal: number;
  pendingChg: number;
  sn: number;
  customerImage: string;
  signatureImage: string;
}

export interface IRelationship {
  relationid: string;
  relationname: string;
  status: string;
  userid: string;
  authid: string;
}

export interface IUsers {
  userid: string;
  fullname: string;
}

export interface IDirectorDetails {
  id: number;
  title: string;
  surname: string;
  firstName: string;
  otherName: string;
  fullName: string;
  signatoryName: string;
  gender: string;
  dob: string;
  nationality: string;
  stateCode: string;
  townCode: string;
  address: string;
  bvn: string;
  customerId: string;
  userId: string;
  authId: string;
  phone: string;
  isCeo: boolean;
  isChairman: boolean;
}

export interface IDirectorMandate {
  id: number;
  customerId: string;
  directorId: string;
  customerImage: string;
  signatureImage: string;
  image_Type: string;
  image_Type2: string;
  mandateId: number;
  userId: string;
  authorisedBy: string;
  status: number;
  serial: number;
  signatoryName: string;
  designation: string;
  mandateDesc1: string;
  createDate: string;
}

export interface IMandateInfo {
  id: number;
  customerID: string;
  bvn: string;
  customerPict: string;
  customerSign: string;
  pictImage_Type: string;
  signImage_Type: string;
  dateCreated: string;
  userID: string;
  authID: string;
  status: number;
  accountNumber: string;
  customerPictBase64: string;
  customerSignBase64: string;
}

export interface ICustomerResult {
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
  [key: string]: string;
}

export interface ITitle {
  titleCOde: string;
  titleName: string;
}

export interface ILien {
  accountnumber: string;
  holdAmount: number;
  effective_dt: string;
  end_dt: string;
  status: string;
}

export interface ICheckBooks {
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

export interface IChequeInfo {
  typeId: number;
  typeDesc: string;
  numberOfleaves: number;
  costtoBank: number;
  costtoCustomer: number;
}

export interface ILienDetail {
  holdreason: string;
  reasoncode: number;
  holdAmount: number;
  effective_dt: string;
  end_dt: string;
  holdnumber: number;
}

export interface ILienExists {
  lienexist: number;
}

export interface ILienAccountName {
  accounttitle: string;
}

export interface ILienModel {
  retval: number;
  retmsg: string;
  bkbalance: number;
  intaccrued: number;
}

export interface ILienReason {
  reasoncode: string;
  holdreason: string;
}

export interface IGroup {
  groupID: string;
  groupName: string;
}

export interface ITown {
  townCode: string;
  townName: string;
  stateCode: string;
  status: string;
  townshortname: string;
  authid: string;
  userid: string;
  createdate: string;
}

export interface ICountries {
  countryCode: string;
  countryName: string;
  countryMne: string;
  status: string;
  currencyName: string;
  currencyMne: string;
  userid: string;
  authid: string;
  createdate: string;
}

export interface IStates {
  stateCode: string;
  stateName: string;
}

export interface ICustomers {
  custID: string;
  accountNumber: string;
  acctTitle: string;
  officerID: string;
  productName: string;
  branchName: string;
}

export interface GetAllCustomerAccountProductsResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  bankproducts?: IBankProducts[] | Array<any>;
}

export interface GetAllIdTypesResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  idCards?: IIDTypes[] | Array<any>;
}

export interface GetDocumentSubmittedResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  documents?: IDocuments[] | Array<any>;
}

export interface GetProductDetailsByPcodeResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  productInfos?: IProductInfos;
}

export interface GetAccountDetailsResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  accDetailsResults?: IAccountDetailsResults;
  customers?: IChargConcessionDetailsResults;
}

export interface GetCustomerAccountInfoResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  accountInfo?: IAccountInfo;
}

export interface GetCustomerAccountInfoListResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  accountInfos?: IAccountInfoList;
}

export interface GetAllTitlesResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  title?: ITitle[];
}

export interface GetAllLienResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  allLiens?: ILien[];
}

export interface GetAllChequeBooksResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  checkbooks?: ICheckBooks[];
}

export interface GetChequeInfoResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  checqueInfo?: IChequeInfo[];
}

export interface GetLienDetailResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  liendetail?: ILienDetail[];
  lienexist?: ILienExists;
  accName?: ILienAccountName;
  lienModel?: ILienModel;
}

export interface GetLienReasonResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  lienReason?: ILienReason[];
}

export interface GetAllGroupsResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  groups?: IGroup[];
}

export interface GetAllTownsResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  towns?: ITown[];
}

export interface GetAllCountriesResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  countries?: ICountries[];
}

export interface GetAllStatesResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  states?: IStates[];
}

export interface GetAllRelationshipResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  relationships?: IRelationship[];
  relationship?: IRelationship;
}

export interface SearchGroupResponse extends IFetchingState {
  groupID: string;
  groupName: string;
  memberLimit: string;
  status: string;
}

export interface SearchCustomerResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  customers: ICustomers[];
  accountDetailsResults: ICustomers[]; // changes to the new backend build
}

export interface SearchDirectorResponse extends IFetchingState {
  customerId: string;
  isChairman: string;
  isCeo: string;
  fullName: string;
  dob: string;
  nationality: string;
  countryName: string;
  gender: string;
  id: string;
}

export interface SearchCustomerAccountResponse extends IFetchingState {
  accountnumber: string;
  accounttitle: string;
  customerid: string;
  productName: string;
  status: number;
  productcode: string;
  branchcode: string;
  bkbalance: number;
}

export interface SearchStaffResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  users?: IUsers[];
}

export interface CreateCustomerAccountResponse {
  responseCode: string;
  responseDescription?: string;
  retPostseq: string;
  retaccountnumber: string;
}

export interface GenericResponse {
  responseCode: string;
  responseDescription: string;
}

export interface CreateCorporateCustomerResponse extends GenericResponse {
  responseCode: string;
  responseDescription: string;
}

export interface GetCustomerByIdResponse {
  responseCode: string;
  responseDescription: string;
  customerResult: ICustomerResult;
}

export interface GetDirectorsByCustomerIdResponse {
  responseCode: string;
  responseDescription: string;
  directorDetails: IDirectorDetails[];
}

export interface GetDirectorByIdResponse {
  responseCode: string;
  responseDescription: string;
  directorDetails: IDirectorDetails;
}

export interface GetDirectorMandateDetailsesponse {
  responseCode: string;
  responseDescription: string;
  directorMandate: IDirectorMandate;
}

export interface GetMandateDetailsByAccountNumberResponse {
  responseCode: string;
  responseDescription: string;
  mandateInfo: IMandateInfo[];
}
