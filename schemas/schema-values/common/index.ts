interface ISearchFilter {
  userID?: string | null;
  branchID?: string | null;
  search?: string | null;
  status?: string | null;
  industryCode?: string | null;
  accountName?: string | null;
  glAccountNumber?: string | null;
  branchCredit?: string | null;
  branchDebit?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  accountNumber?: string | null;
  fullName?: string | null;
  tellerName?: string | null;
  pCode?: string | null;
  searchWith?: string | null;
  getAll?: boolean;
  pageNumber?: string | null;
  pageSize?: string | null;
  prodCode?: string | null;
  reportType?: string | null;
  accountNo?: string | null;
  accountType?: string | null;
}

export const searchFilterInitialValues: ISearchFilter = {
  userID: '',
  branchID: '',
  status: '',
  search: '',
  industryCode: '',
  accountName: '',
  glAccountNumber: '',
  branchCredit: '',
  branchDebit: '',
  startDate: '',
  endDate: '',
  accountNumber: '',
  fullName: '',
  tellerName: '',
  pCode: '',
  searchWith: '',
  getAll: false,
  reportType: '',
  pageNumber: '1',
  pageSize: '10',
  prodCode: '',
  accountNo: '',
  accountType: ''
};
