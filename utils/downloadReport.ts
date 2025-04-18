'use client';
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';
import { Parser } from 'json2csv';
import { getCurrentDate } from './getCurrentDate';
// eslint-disable-next-line import/no-cycle
import { PdfGenerator } from './hooks/PdfGenerator';
// eslint-disable-next-line import/no-cycle
import { IReportQueryParams } from '@/context/DownloadReportContext';
import { useGetBankLogo } from '@/api/general/useBankLogo';

export type ReportType =
  | 'AccountEnquiry'
  | 'StatementOfAccountCASA'
  | 'StatementOfAccountTD'
  | 'DormantAccount'
  | 'TermDepositMaturity'
  | 'TellerBalance'
  | 'PortfolioAtRisk'
  | 'PortfolioAtRiskProductList'
  | 'TellerBalance'
  | 'InflowOutflow'
  | 'CheckBookStatus'
  | 'ChartOfAccount'
  | 'CustomerBalance'
  | 'AccountDebit'
  | 'ChequeBookStatus'
  | 'PlainTrialBalance';

export type ReportFormat = 'excel' | 'pdf' | 'csv';

interface IFileNameMapper {
  AccountEnquiry: string;
  [key: string]: string;
}

const FileNameMapper: IFileNameMapper = {
  AccountEnquiry: 'AccountEnquiryReport',
  StatementOfAccountCASA: 'StatementOfAccountCASA',
  StatementOfAccountTD: 'StatementOfAccountTD',
  DormantAccount: 'DormantAccount',
  CheckBookStatus: 'CheckBookStatus',
  InflowOutflow: 'InflowOutflow',
  TermDepositMaturity: 'TermDepositMaturity',
  TellerBalance: 'TellerBalance',
  PortfolioAtRisk: 'PortfolioAtRisk',
  PortfolioAtRiskProductList: 'PortfolioAtRiskProductList',
  CustomerBalance: 'CustomerBalance',
  PlainTrialBalance: 'PlainTrialBalance',


};

const generatePdf = (
  exportData: Array<any>,
  reportType: ReportType,
  reportQueryParams: IReportQueryParams,
  bankLogo?: string | null
) => {
  const fileName = FileNameMapper[reportType as ReportType];
  const { logo } = useGetBankLogo();
  const BankLogo = logo?.toString()
    ? `data:image/png;image/jpg;base64,${logo}`
    : null;

  PdfGenerator({ exportData, fileName, reportType, reportQueryParams, bankLogo: BankLogo});
};

// TODO: See how to integrate report description into excel and csv
const generateExcel = (
  exportData: Array<any>,
  reportType: ReportType,
  reportQueryParams: IReportQueryParams
) => {
  const fileType =
    '* application / vnd.openxmlformats - officedocument.spreadsheetml.sheet; charset - UTF - 8';
  const ws = XLSX.utils.json_to_sheet(exportData || []); // TODO: Remove mock report once finalised
  const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: fileType });
  const fileName = FileNameMapper[reportType as ReportType];
  FileSaver.saveAs(data, `${fileName} ${getCurrentDate()}.xlsx`);
};

const generateCSV = (
  exportData: Array<any>,
  reportType: ReportType,
  reportQueryParams: IReportQueryParams
) => {
  const json2csvParser = new Parser();
  const csv = json2csvParser.parse(exportData);

  const blob = new Blob([csv], { type: 'text/plain;charset=utf-8;' });
  const fileName = FileNameMapper[reportType as ReportType];
  FileSaver.saveAs(blob, `${fileName}  ${getCurrentDate()}.csv`);
};

type DownloadReportProps = {
  reportFormat: ReportFormat;
  exportData: Array<any>;
  reportType: ReportType;
  reportQueryParams: IReportQueryParams;
  bankLogo?: string | null;
};

export const downloadReport = ({
  reportFormat,
  exportData,
  reportType,
  reportQueryParams,
  bankLogo
}: DownloadReportProps) => {
  switch (reportFormat) {
    case 'excel':
      generateExcel(exportData || [], reportType, reportQueryParams);
      break;
    case 'pdf':
      generatePdf(exportData || [], reportType, reportQueryParams,  bankLogo);
      break;
    case 'csv':
      generateCSV(exportData || [], reportType, reportQueryParams);
      break;
    default:
      break;
  }
};
