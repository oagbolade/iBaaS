export type Actions =
  | 'account-officer'
  | 'users'
  | 'roles'
  | 'gl-account'
  | 'posting-limit'
  | 'getUserByRoleID';

export interface ISearchParams {
  search?: string | null;
  branchID?: string | null;
  customerID?: string | null;
  email?: string | null;
  phoneNo?: string | null;
  status?: string | null;
  userID?: string | null;
  roleID?: string | null;
  accountNumber?: string | null;
  glAccountNumber?: string | null;
  fullName?: string | null;
  groupName?: string | null;
  roleName?: string | null;
  groupPhone?: string | null;
  page?: number;
  branchName?: string | null;
  countryName?: string | null;
  countryCode?: string | null;
  currencyName?: string | null;
  townName?: string | null;
  townCode?: string | null;
  state?: string | null;
  regionCode?: string | null;
  regionName?: string | null;
  holidayDesc?: string | null;
  holidaydays?: string | null;
  industryName?: string | null;
  industryCode?: string | null;
  profname?: string | null;
  profcode?: string | null;
  bankName?: string | null;
  bankCode?: string | null;
  prodCode?: string | null;
  narration?: string | null;
  bankshortname?: string | null;
  typeDesc?: string | null;
  typeId?: string | null;
  tranCode?: string | null;
  tranName?: string | null;
  gl_NodeName?: string | null;
  gl_NodeCode?: string | null;
  gl_ClassName?: string | null;
  gl_ClassCode?: string | null;
  interestName?: string | null;
  intcode?: string | null;
  educationCode?: string | null;
  educationname?: string | null;
  docId?: string | null;
  docName?: string | null;
  sectorname?: string | null;
  sectorCode?: string | null;
  groupId?: string | null;
  glNumber?: string | null;
  accountName?: string | null;
  zoneName?: string | null;
  zoneid?: string | null;
  relationname?: string | null;
  relationid?: string | null;
  branchCredit?: string | null;
  branchDebit?: string | null;
  stateCode?: string | null;
  stateName?: string | null;
  region?: string | null;
  departmentName?: string | null;
  docShortname?: string | null;
  behaviour?: string | null;
  exceptionDesc?: string | null;
  exceptioncode?: string | null;
  code?: string | null;
  description?: string | null;
  chargeCode?: string | null;
  chargeDesc?: string | null;
  branchCode?: string | null;
  producttype?: string | null;
  productName?: string | null;
  productCode?: string | null;
  intName?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  reportDate?: string | null;
  reportType?: string | null;
  pageNumber?: string | null;
  pageSize?: string | null;
  productClass?: string | null;
  tellerName?: string | null;
  getAll?: boolean | null;
  searchWith?: string | null;
  pCode?: string | null;
}
