'use client';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState
} from 'react';
// eslint-disable-next-line import/no-cycle
import { ReportType } from '@/constants/downloadReport';
import { usePathname } from 'next/navigation';

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
  setReportDescription: (() => {}) as Dispatch<SetStateAction<string>>,
  readyDownload: false,
  setReadyDownload: (() => {}) as Dispatch<SetStateAction<boolean>>
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
  readyDownload: boolean;
  setReadyDownload: Dispatch<SetStateAction<boolean>>;
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
  const [readyDownload, setReadyDownload] = useState<boolean>(false);

   const pathname = usePathname();
    useEffect(() => {
    setExportData([]);
    setReadyDownload(false);
  }, [pathname]);

  const value: DownloadReportContextType = useMemo(() => {
    return {
      exportData,
      reportType,
      reportQueryParams,
      reportDescription,
      setExportData,
      setReportType,
      setReportQueryParams,
      setReportDescription,
      readyDownload,
      setReadyDownload
    };
  }, [exportData, reportType, reportQueryParams, reportDescription, readyDownload, setReadyDownload]);

  return (
    <DownloadReportContext.Provider value={value}>
      {children}
    </DownloadReportContext.Provider>
  );
}