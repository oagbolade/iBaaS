import { IFetchingState } from '@/constants/types';

export interface IBranches {
  branchCode: string;
  branchName: string;
}
export interface IBankLogo {
  logo: string;
}
export interface IDepartments {
  deptid: string;
  deptName: string;
}

export interface IRoles {
  role_id: string;
  role_name: string;
  roledesc?: string;
}

export interface IStatus {
  statusCode: string;
  statusDesc: string;
}

export interface ICurrency {
  countryCode: string;
  currencyName: string;
}

export interface IBranchTypes {
  branchTyID: string;
  branchTypeDesc: string;
}
export interface ICity {
  townCode: string;
  townName: string;
}

export interface IDataCaptureList {
  deptid: string;
  deptName: string;
}

export interface IPriviledgeList {
  menu_id: string;
  menu_name: string;
}

export interface IGroupMembers {
  groupName: string;
  memCount: number;
  memberLimit: number;
  accountnumber: string;
  membercode: number;
  fullname: string;
}

export interface IGroup {
  groupID: string;
  groupName: string;
  groupAddress: string;
  status: number;
  memberLimit: number;
}

export interface IErrorChannels {
  officers?: null | [];
  branches?: null | [];
}

export interface IProductType {
  producttypeid: string;
  producttypedesc: string;
}

export interface UseProductTypeResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  productTypes?: IProductType[] | Array<any>;
}

export interface SearchGroupResponse extends IFetchingState {
  status: string;
  groupName: string;
  groupID: string;
  memberLimit: string;
}

export interface GetGroupMembersbyGroupIdResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  groupInfo?: IGroupMembers[] | Array<any>;
}

export interface GetGroupByIdResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  group?: IGroup;
}

export interface UseBranches extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  branches?: IBranches[] | Array<any>;
}
export interface UseBankLogo extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  logo?: IBankLogo;
}
export interface UseGetDepartment extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  departments?: IDepartments[] | Array<any>;
}

export interface UseGetDataCaptureList extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  dataCapture?: IDataCaptureList[] | Array<any>;
}

export interface UseGetAuthPriviledgeList extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  authPriv?: IPriviledgeList[] | Array<any>;
}

export interface ErrorResponse extends IErrorChannels {
  responseCode: string;
  responseDescription: string;
}

export interface UseGetCurrency extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  currencies?: ICurrency[] | Array<any>;
}

export interface GetAllBranchTypesResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  branchTypes?: IBranchTypes[] | Array<any>;
}
export interface GetAllCitiesResponse extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  towns?: ICity[] | Array<any>;
}

export interface UseGetAllRoles extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  roles?: IRoles[] | Array<any>;
}

export interface UseGetAllStatus extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  status?: IStatus[] | Array<any>;
}

interface ISort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

interface IPageable {
  sort: ISort;
  pageSize: number;
  pageNumber: number;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export interface SearchResultsGenericResponse extends IFetchingState {
  data?: Array<any>;
  pageable?: IPageable;
  totalElements?: number;
  totalPages?: number;
  last?: number;
  sort?: ISort;
  numberOfElements?: number;
  first?: number;
  size?: number;
  number?: number;
  empty?: number;
}

export interface IGldetails {
  glNumber: string;
  acctName: string;
  branchCode: string;
  gl_ClassCode: string;
  currencyCode: string;
  dateOpened: string;
  dT_Lst_Month: string;
  last_Month_Balance: number;
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
  typeP: string;
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

export interface UseGlAndBookBalanceDetails extends IFetchingState {
  responseCode?: string;
  responseDescription?: string;
  glAccounts?: IGldetails[] | Array<any>;
}
