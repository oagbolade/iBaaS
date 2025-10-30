'use client';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useMemo,
  useState
} from 'react';
// eslint-disable-next-line import/no-cycle
import { ReportType } from '@/constants/downloadReport';

export interface IReportQueryParams {
  branchCode?: null;
  accountNumber?: null;
  glAccountNumber?: null;
  status?: null;
  startDate?: null;
  endDate?: null;
}

const initialDownloadReportContext = {
  exportData: [],
  reportType: 'AccountEnquiry' as ReportType,
  reportQueryParams: {},
  reportDescription: '',
  setExportData: (() => {}) as Dispatch<SetStateAction<Array<any>>>,
  setReportType: (() => {}) as Dispatch<SetStateAction<ReportType>>,
  setReportQueryParams: (() => {}) as Dispatch<
    SetStateAction<IReportQueryParams>
  >,
  setReportDescription: (() => {}) as Dispatch<SetStateAction<string>>
};

type DownloadReportContextType<T = any> = {
  exportData: Array<T>;
  reportType: ReportType;
  reportQueryParams: IReportQueryParams;
  reportDescription: string;
  setExportData: Dispatch<SetStateAction<Array<T>>>;
  setReportType: Dispatch<SetStateAction<ReportType>>;
  setReportQueryParams: Dispatch<SetStateAction<IReportQueryParams>>;
  setReportDescription: Dispatch<SetStateAction<string>>;
};

export const DownloadReportContext = createContext<DownloadReportContextType>(
  initialDownloadReportContext
);

export default function DownloadReportContextProvider({ children }: any) {
  const [exportData, setExportData] = useState<Array<any>>([]);
  const [reportType, setReportType] = useState<ReportType>('AccountEnquiry');
  const [reportQueryParams, setReportQueryParams] =
    useState<IReportQueryParams>({});
  const [reportDescription, setReportDescription] = useState<string>('');

  const value: DownloadReportContextType = useMemo(() => {
    return {
      exportData,
      reportType,
      reportQueryParams,
      reportDescription,
      setExportData,
      setReportType,
      setReportQueryParams,
      setReportDescription
    };
  }, [exportData, reportType, reportQueryParams, reportDescription]);

  return (
    <DownloadReportContext.Provider value={value}>
      {children}
    </DownloadReportContext.Provider>
  );
}
