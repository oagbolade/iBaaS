'use client';
import { Box } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { processNumber, totalProcesTitle, totalTitle } from '../../Forms/style';
import { COLUMNS } from './COLUMNS';
import { MuiTableContainer } from '@/components/Table';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { ISearchParams } from '@/app/api/search/route';
import {
  useGetEODProcesses,
  useGetEODProcesslog
} from '@/api/operation/useEndOfDay';
import { FormSkeleton } from '@/components/Loaders';
import { StyledTableRow } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { SearchProcessEODLogsResponse } from '@/api/ResponseTypes/setup';
import { Status } from '@/components/Labels';
import { PageTitle } from '@/components/Typography';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { ActionButtonWithPopper } from '@/components/Revamp/Buttons';
import { ExportIcon } from '@/assets/svg';
import { exportData } from '@/components/ViewReport/style';

type Props = {
  EODid: string | null;
};

export const EndOfDayProcessTable = ({ EODid }: Props) => {
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [page, setPage] = useState(1);
  const [metrics, setMetrics] = useState<{
    totalCompletedPercetage: number;
    totalUncompletedPercetage: number;
  } | null>(null);
  const [isClient, setIsClient] = useState(false);

  const { data, eodMetrics, eobException } = useGetEODProcesses();
  const { data: process, isLoading } = useGetEODProcesslog(searchParams, EODid);
  const { data: downloadData } = useGetEODProcesslog(
    { ...searchParams, getAll: true },
    EODid
  );

  const { setReportType, setExportData } = useContext(DownloadReportContext);

  // Only run on client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
      const EodDataRaw = localStorage.getItem('EOD_METRICS');
      if (EodDataRaw) {
        try {
          const parsed = JSON.parse(EodDataRaw);
          setMetrics(parsed);
        } catch (err) {
          throw new Error('Failed to parse EOD metrics from localStorage');
        }
      }
    }
  }, []);

  // Update export context
  useEffect(() => {
    if (downloadData && downloadData.length > 0) {
      setReportType('EOD');
      setExportData(downloadData);
    } else {
      setExportData([]);
    }
  }, [downloadData, setReportType, setExportData]);

  const handleExportData = () => {
    if (process) {
      setExportData(process);
    }
  };

  const actionButtons = [
    <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }} key="export">
      <ActionButtonWithPopper
        searchGroupVariant="ExportReport"
        customStyle={{ ...exportData }}
        icon={<ExportIcon />}
        iconPosition="start"
        buttonTitle="Export Data"
        handleSelectedValue={handleExportData}
      />
    </Box>
  ];

  const totalCompleted = metrics?.totalCompletedPercetage?.toFixed(2) ?? '0';
  const totalUncompleted =
    metrics?.totalUncompletedPercetage?.toFixed(2) ?? '0';

  return (
    <Box>
      <TopActionsArea actionButtons={actionButtons} />

      {/* Show skeleton until client-side data is ready */}
      {!isClient || isLoading ? (
        <Box sx={{ padding: '25px' }}>
          <FormSkeleton noOfLoaders={3} />
        </Box>
      ) : (
        <>
          {/* Summary */}
          <Box sx={{ padding: '25px', marginTop: '10px' }}>
            <Box sx={processNumber}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <PageTitle
                    title="Total Processes Passed"
                    styles={totalProcesTitle}
                  />
                  <PageTitle title={`${totalCompleted}%`} styles={totalTitle} />
                </Box>
                <Box sx={{ marginLeft: '640px' }}>
                  <PageTitle
                    title="Total Processes Failed"
                    styles={totalProcesTitle}
                  />
                  <PageTitle
                    title={`${totalUncompleted}%`}
                    styles={totalTitle}
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Table */}
          <Box sx={{ padding: '25px', width: '100%' }}>
            <MuiTableContainer
              columns={COLUMNS}
              data={process}
              setPage={setPage}
            >
              {process?.map((dataItem: SearchProcessEODLogsResponse) => (
                <StyledTableRow key={dataItem.taskid}>
                  <StyledTableCell component="th" scope="row">
                    {dataItem.taskname}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Status
                      label={String(dataItem?.status) === '0' ? 'Pass' : 'Fail'}
                      status={
                        String(dataItem?.status) === '0' ? 'success' : 'warning'
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {dataItem.retMsg || '-'}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </MuiTableContainer>
          </Box>
        </>
      )}
    </Box>
  );
};
