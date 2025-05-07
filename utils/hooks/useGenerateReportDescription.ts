'use client';
// eslint-disable-next-line import/no-cycle
import { ReportType } from '@/constants/downloadReport';
import { formatKey } from '../formatKey';
import { IReportQueryParams } from '@/context/DownloadReportContext';

export const useGenerateReportDescription = (
  reportType: ReportType,
  queryParameters: IReportQueryParams
) => {
  let reportDescription = `${formatKey(reportType)} report`;

  if (queryParameters.startDate && queryParameters.endDate) {
    reportDescription += ` from ${queryParameters.startDate} to ${queryParameters.endDate}`;
  }

  if (queryParameters.branchCode) {
    reportDescription += ` for ${queryParameters.branchCode} branch`;
  }

  if (queryParameters.status) {
    reportDescription += ` with status ${queryParameters.status}`;
  }

  if (queryParameters.accountNumber) {
    reportDescription += ` for account number ${queryParameters.accountNumber}`;
  }

  return { reportDescription };
};
