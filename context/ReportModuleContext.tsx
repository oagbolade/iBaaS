'use client';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useMemo,
  useState
} from 'react';
import {
  IGetLoanOverdueReport,
  IPortfolioAtRiskProduct
} from '@/api/ResponseTypes/reports';

export type AccountEnquiryDataType = {
  accountnumber: string;
  accounttitle: string;
  customerid: number;
  accountOfficer: string;
  bkBalance: number;
  branchName: string;
};

const initialReportModuleContext = {
  accountEnquiryData: {
    accountnumber: '',
    accounttitle: '',
    customerid: 0,
    accountOfficer: '',
    bkBalance: 0,
    branchName: ''
  },

  loanOverdueStateData: {
    id: 0,
    accountNumber: '',
    groupid: '',
    branch: '',
    productCode: '',
    settlementAcct1: '',
    fullname: '',
    loanamount: 0,
    currentbalance: 0,
    total_OverDue: 0,
    startdate: '',
    matDate: '',
    branchname: '',
    maxtrandate: '',
    principal_Outstanding: 0,
    interest_Outstanding: 0,
    penalInterest_Outstanding: 0,
    officerName: '',
    groupname: '',
    lastDate: '',
    officerName2: '',
    groupName2: '',
    casa_Balance: 0,
    age: 0,
    report: ''
  },

  detailedPortfolioAtRiskReportData: {
    branch: '',
    branchname: '',
    productCode: '',
    productName: '',
    principal_At_Risk: 0,
    currentbalance: 0,
    number_of_Accounts: 0,
    par: 0
  },

  setDetailedPortfolioAtRiskReportData: (() => {}) as Dispatch<
    SetStateAction<IPortfolioAtRiskProduct>
  >,

  setAccountEnquiryData: (() => {}) as Dispatch<
    SetStateAction<AccountEnquiryDataType>
  >,

  setLoanOverduestatedata: (() => {}) as Dispatch<
    SetStateAction<IGetLoanOverdueReport>
  >
};

type ReportModuleContextType = typeof initialReportModuleContext;

export const ReportModuleContext = createContext<ReportModuleContextType>(
  initialReportModuleContext
);

export default function ReportModuleContextProvider({ children }: any) {
  const [
    detailedPortfolioAtRiskReportData,
    setDetailedPortfolioAtRiskReportData
  ] = useState<IPortfolioAtRiskProduct>({
    branch: '',
    branchname: '',
    productCode: '',
    productName: '',
    principal_At_Risk: 0,
    currentbalance: 0,
    number_of_Accounts: 0,
    par: 0
  });

  const [accountEnquiryData, setAccountEnquiryData] =
    useState<AccountEnquiryDataType>({
      accountnumber: '',
      accounttitle: '',
      customerid: 0,
      accountOfficer: '',
      bkBalance: 0,
      branchName: ''
    });

  const [loanOverdueStateData, setLoanOverduestatedata] =
    useState<IGetLoanOverdueReport>({
      id: 0,
      accountNumber: '',
      groupid: '',
      branch: '',
      productCode: '',
      settlementAcct1: '',
      fullname: '',
      loanamount: 0,
      currentbalance: 0,
      total_OverDue: 0,
      startdate: '',
      matDate: '',
      branchname: '',
      maxtrandate: '',
      principal_Outstanding: 0,
      interest_Outstanding: 0,
      penalInterest_Outstanding: 0,
      officerName: '',
      groupname: '',
      lastDate: '',
      officerName2: '',
      groupName2: '',
      casa_Balance: 0,
      age: 0,
      report: ''
    });

  const value: ReportModuleContextType = useMemo(() => {
    return {
      accountEnquiryData,
      setAccountEnquiryData,
      detailedPortfolioAtRiskReportData,
      setDetailedPortfolioAtRiskReportData,
      loanOverdueStateData,
      setLoanOverduestatedata
    };
  }, [
    accountEnquiryData,
    setAccountEnquiryData,
    detailedPortfolioAtRiskReportData,
    setDetailedPortfolioAtRiskReportData,
    loanOverdueStateData,
    setLoanOverduestatedata
  ]);

  return (
    <ReportModuleContext.Provider value={value}>
      {children}
    </ReportModuleContext.Provider>
  );
}
