'use client';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import { processNumber, totalProcesTitle, totalTitle } from '../../Forms/style';
import { COLUMNS } from './COLUMNS';
import { MuiTableContainer, TableSingleAction } from '@/components/Table';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { ISearchParams } from '@/app/api/search/route';
import { useGetEODProcesslog } from '@/api/operation/useEndOfDay';
import { FormSkeleton } from '@/components/Loaders';
import { renderEmptyTableBody, StyledTableRow } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import {
  SearchIEODLogsResponse,
  SearchProcessEODLogsResponse
} from '@/api/ResponseTypes/setup';
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
  const [page, setPage] = React.useState(1);

  const { data: process, isLoading } = useGetEODProcesslog(searchParams, EODid);
  const { setReportType, setExportData, readyDownload, setReadyDownload } =
    React.useContext(DownloadReportContext);

  React.useEffect(() => {
    if (readyDownload) {
      setSearchParams((prev) => ({
        ...prev,
        getAll: true
      }));
    }
  }, [readyDownload]);

  React.useEffect(() => {
    if ((process ?? []).length > 0) {
      setExportData(process as []);
    }
  }, [process, isLoading, readyDownload, setExportData]);
  const handExportData = () => {
    setExportData(process as []);
  };
  const actionButtons = [
    <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
      <ActionButtonWithPopper
        searchGroupVariant="ExportReport"
        customStyle={{ ...exportData }}
        icon={<ExportIcon />}
        iconPosition="start"
        buttonTitle="Export Data"
        handleSelectedValue={handExportData}
      />
    </Box>
  ];
  return (
    <Box>
      <TopActionsArea actionButtons={actionButtons} />
      <Box sx={{ padding: '25px', marginTop: '10px' }}>
        <Box sx={processNumber}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <PageTitle
                title="total processes Passed"
                styles={{ ...totalProcesTitle }}
              />
              <PageTitle title="80%" styles={{ ...totalTitle }} />
            </Box>
            <Box sx={{ marginLeft: '640px' }}>
              <PageTitle
                title="total processes failed"
                styles={{ ...totalProcesTitle }}
              />
              <PageTitle title="20%" styles={{ ...totalTitle }} />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ padding: '25px', width: '100%' }}>
        {isLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <MuiTableContainer columns={COLUMNS} data={process} setPage={setPage}>
            {process?.map((dataItem: SearchProcessEODLogsResponse) => {
              return (
                <StyledTableRow key={dataItem.taskid}>
                  <StyledTableCell component="th" scope="row">
                    {dataItem.taskname}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Status
                      label={
                        Number(dataItem.taskStatus) === 1 ? 'Fail' : 'Pass'
                      }
                      status={
                        Number(dataItem.taskStatus) === 1 ? 'Fail' : 'Pass'
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {dataItem.retMsg}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </MuiTableContainer>
        )}
      </Box>
    </Box>
  );
};
