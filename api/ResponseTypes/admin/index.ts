import { IProfiles } from '@/api/RequestTypes/CommonTypes';
import { IFetchingState } from '@/constants/types';
import { IPriviledgeList } from '@/api/ResponseTypes/general';

export interface IRoles {
  role_id?: string;
  role_name?: string;
  roleLevel?: string;
  userTimeOut?: string;
  access_days?: string;
  roledesc?: string;
  tellerflg?: number;
  canauth?: number;
  isoperation?: number;
}

export interface SearchUserResponse extends IFetchingState {
  status: string;
  fullname: string;
  role_name: string;
  deptCode: string;
  deptName: string;
  createDate: string;
  create_date: string;
  userId: string;
  role_id: string;
}

export interface SearchPostingLimitResponse extends IFetchingState {
  status: string;
  roleid: string;
  role_name: string;
  branchCredit: string;
  branchDebit: string;
  branchcode: string;
}

export interface SearchGLAccountResponse extends IFetchingState {
  status: string;
  acctName: string;
  glnumber: string;
  dateOpened: string;
  bkbalance: string;
  oldGLno: string;
}

export interface SearchRoleResponse extends IFetchingState {
  status: string;
  role_name: string;
  role_id: string;
  roledesc: string;
  noOfMembers: string;
}

export interface SearchUserbyRoleResponse extends IFetchingState {
  userId: string;
  status: string;
  fullname: string;
  phoneno: string;
  email: string;
}

export interface SearchAccountOfficersResponse extends IFetchingState {
  status: string;
  officercode: string;
  officerName: string;
  branchcode: string;
  staffID: string;
  deptName: string;
  dept: string;
}

export interface IAccounts {
  branchCode?: string;
  productCode?: string;
  accountNumber?: string;
  accountTitle?: string;
  customerId?: string;
  assetValue?: string;
  currencyCode?: string;
  status?: string;
  bkBalance?: string;
  odLimit?: string;
  suspBal?: string;
  userId?: string;
  unclearedBal?: string;
  holdBal?: string;
}

export interface IAccountOfficers {
  officerCode?: string;
  Officercode?: string;
  officercode?: string;
  officerName?: string;
  dept?: string;
  branchCode?: string;
  branchcode?: string;
  branchName?: string;
  email?: string;
  phone?: string;
  auth?: string;
  authId?: string;
  userId?: string;
  status?: string;
  staffID?: string;
  OfficerName?: string;
  DeptName?: string;
  departmentName?: string;
  isSupervisor?: number;
}

export interface IUsers {
  Userid?: string;
  userId?: string;
  fullname?: string;
  DeptName?: string;
  deptcode?: string;
  branchcode?: string;
  role_name?: string;
  Create_date?: string;
  email?: string;
  phoneno?: string;
  UserTimeOut?: string;
  role_id?: string;
  logincount?: number;
  lockcount?: number;
  multilogin?: number;
  status?: number;
  statement?: number;
  isSupervisor?: number;
  globalAuth?: number;
}

export interface ISupervisors {
  userid?: string;
  fullname?: string;
}

export interface IMParam {
  id: number;
  accountnumber: string;
}

export interface IMParam2 {
  id: number;
  acctofficer: string;
  newacctofficer: string;
  create_dt: string;
}

export interface TransferAccountOfficerFormValues {
  mParam: IMParam[];
  fromAcctofficer: string;
  mParam2: IMParam2[];
  toAcctofficer: string;
  userId: string;
}

export interface CreateAccountOfficerResponse {
  responseCode: string;
  responseDescription?: string;
  profiles: IProfiles;
  menuItems: string;
  token: string;
  initialData?: string | null;
}

export interface CreateRoleResponse {
  responseCode: string;
  responseDescription?: string;
  profiles: IProfiles;
  menuItems: string;
  token: string;
  initialData?: string | null;
}

export interface INodeType {
  gL_NodeName: string;
  gL_NodeCode: string;
}

export interface IPostingLimit {
  role_name: string;
  InterBankCr: string;
  name: string;
  InterBankDr: string;
  Roleid: string;
  branchcode: string;
}

export interface IGLAccount {
  glNumber: string;
  currencyCode: string;
  prodType: string;
  name: string;
  DateOpened: string;
  BKBalance: string;
  bkBalance: string;
  acctName: string;
  gl_ClassCode: string;
  status: string;
}

export interface IGLAccountDetail {
  glNumber: string;
  acctName: string;
  branchCode: string;
  gl_ClassCode: string;
  currencyCode: string;
  dateOpened: string;
  dT_Lst_Month: string;
  last_Month_Balance: number;
  status: number;
  last_Night_Balance: number;
  bkBalance: number;
  tpostDebit: number;
  tpostCredit: number;
  blocked: string;
  closed: string;
  reconLen: number;
  post: number;
  bbf: number;
  prodType: string;
  pointing: number;
  typeP: number;
  userid: string;
  authid: string;
  createdate: string;
  populate: number;
  oldGLno: string;
  last_night_balance2: number;
  swing: number;
  last_month_balance2: number;
  last_month_balance1: number;
  last_eom2: string;
  last_eom1: string;
  currmondiff: number;
  lastmondiff: number;
  controlflag: number;
  controlGlag: number;
}

export interface IGlNode {
  gl_nodecode: string;
  gl_nodename: string;
}

export interface IGlClass {
  gl_classcode: string;
  gl_classname: string;
}

export interface IGlDetails {
  glnumber: string;
  acctname: string;
  branchname: string;
  lastnumber: string;
  bkbalance: number;
  dateopened: string;
}

export interface IGLClassType {
  gL_ClassCode: string;
  gL_ClassName: string;
}

export interface IGLType {
  prodTypeCode: string;
  prodTypeName: string;
}

export interface GetAllAssignedDataCaptureResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  dataCapture?: IPriviledgeList[];
}

export interface GetAllAssignedAuthPriviledgeResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  authPriv?: IPriviledgeList[];
}

export interface GetAllRolesResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  roles?: IRoles[] | Array<any>;
  role?: IRoles;
  results?: IRoles[] | Array<any>;
}

export interface UseGetAccountOfficersResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  officers?: IAccountOfficers & IAccountOfficers[];
  officer?: IAccountOfficers & IAccountOfficers[];
  results?: IAccountOfficers[] | Array<any>;
}

export interface UseGetCustomerAccountsByOfficerCodeResponse
  extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  accounts: IAccounts[];
}

export interface UseGetSupervisorByIdResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  supervisors?: ISupervisors[] | Array<any>;
}

export interface UseGetAllUsersResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  users?: IUsers[] | Array<any>;
  userDetails?: IUsers & IUsers[];
  results?: IUsers[] | Array<any>;
  role_id?: string;
}

export interface UseGetGLType extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  glType?: IGLType[] | Array<any>;
}

export interface UseGetGLByGlNumber extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  bankgl?: IGLAccount;
}

export interface UseGetAllPostingLimit extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  limit?: IPostingLimit[] | Array<any>;
  limits?: IPostingLimit[] | Array<any>;
  results?: IPostingLimit[] | Array<any>;
}
export interface UseGetPostingLimitByBranchCodeAndRoleid
  extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  limit?: IPostingLimit[] | Array<any>;
}

export interface GetGlNodesByTypeCodeResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  gLnode?: IGlNode[] | Array<any>;
}

export interface GetGlClassByNodeCodeResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  gLclass?: IGlClass[] | Array<any>;
}

export interface GetGlDetailsResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  glDetails?: IGlDetails[] | Array<any>;
}

export interface UseGetAllNodeType extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  node?: INodeType[] | Array<any>;
}

export interface UseGetAllGlClassType extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  glClasses?: IGLClassType[] | Array<any>;
}

export interface UseGetGLAccountResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  bankgl?: IGLAccountDetail | IGLAccount[] | Array<any>;
  bankgls?: IGLAccount[] | Array<any>;
  results?: IGLAccount[] | Array<any>;
}

export interface ResetPasswordProfileType {
  userid: null | string;
  sys_date: string;
  roleid: null | string;
  rolelevel: null | string;
  dmb: null | string;
  menuid: null | string;
  menulevel: null | string;
}

export interface UseResetpasswordResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  token?: null | string;
  fullName?: null | string;
  tokenExpire?: null | string;
  profiles?: ResetPasswordProfileType;
  menuItems?: null | string;
}
