'use client';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { COLUMNS } from './COLUMNS';
import { FilterSection } from './FilterSection';
import { EndOfDayForm } from './EndOfDayForm';
import { RunEndOfDayForm } from './RunEndOfDay';
import { MuiTableContainer, TableSingleAction } from '@/components/Table';
import { PrimaryIconButton } from '@/components/Buttons';
import {
  submitButton,
  cancelButton
} from '@/features/Loan/LoanDirectory/RestructureLoan/styles';
import { ModalContainerV2 } from '@/components/Revamp/Modal';
import { TopActionsArea } from '@/components/Revamp/Shared';
import { ISearchParams } from '@/app/api/search/route';
import { useGetEODLogs } from '@/api/operation/useEndOfDay';
import { FormSkeleton } from '@/components/Loaders';
import { renderEmptyTableBody, StyledTableRow } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { SearchIEODLogsResponse } from '@/api/ResponseTypes/setup';
import { Status } from '@/components/Labels';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';

export const EndOfDaySetupTable = () => {
  const { isLoading } = useGlobalLoadingState();
  const [openModel, setopenModel] = useState(Boolean);
  const [openRunModel, setopenRunModel] = useState(Boolean);
  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<ISearchParams>('EOD-Overview');
  const ActionMenu = ({ id }: { id: number }): React.ReactElement => {
    return (
      <Link
        href={`/setup/product-gl/view-eod-process/?isEditing=true&id=${id}`}
      >
        <TableSingleAction actionName="View Details" />
      </Link>
    );
  };
  const handleClose = () => {
    setopenModel(false);
    setopenRunModel(false);
  };
  const handleOpen = () => {
    setopenModel(true);
  };
  const handleRunOpen = () => {
    setopenRunModel(true);
  };
  // eslint-disable-next-line no-shadow
  const handleSearch = async (params: ISearchParams) => {
    setSearchParams(params);
    setSearchActive(true);
  };
  const { data: logs, isLoading: areEODLogsLoading } = useGetEODLogs({
    ...searchParams,
    page
  });
  const formatDateOnly = (dateStr: string | null | undefined) => {
    if (!dateStr) return 'N/A';
    try {
      return format(new Date(dateStr), 'yyyy-MM-dd');
    } catch {
      return dateStr;
    }
  };

  const formatTimeOnly = (dateStr: string | null | undefined) => {
    if (!dateStr) return 'N/A';
    try {
      return format(new Date(dateStr), 'HH:mm:ss');
    } catch {
      return dateStr;
    }
  };
  const actionButtons = [
    <Box sx={{ display: 'flex' }} ml={{ mobile: 2, desktop: 0 }}>
      <PrimaryIconButton
        buttonTitle="Configure End of Day"
        customStyle={{ ...cancelButton }}
        onClick={handleOpen}
      />
      <PrimaryIconButton
        buttonTitle="Run End of Day"
        customStyle={{ ...submitButton }}
        onClick={handleRunOpen}
      />
      {openModel && (
        <ModalContainerV2 form={<EndOfDayForm handleClose={handleClose} />} />
      )}
      {openRunModel && (
        <ModalContainerV2
          form={<RunEndOfDayForm handleClose={handleClose} />}
        />
      )}
    </Box>
  ];
  return (
    <Box>
      <TopActionsArea actionButtons={actionButtons} />
      <Box sx={{ padding: '25px', marginTop: '10px' }}>
        <FilterSection onSearch={handleSearch} />
      </Box>
      <Box sx={{ padding: '25px', width: '100%' }}>
        {isLoading || areEODLogsLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <MuiTableContainer
            columns={COLUMNS}
            data={logs}
            showHeader={{
              hideFilterSection: true,
              mainTitle: 'End of Day Overview',
              secondaryTitle:
                'See a directory of all End of Day ran on this system.'
            }}
            ActionMenuProps={ActionMenu}
            setPage={setPage}
          >
            {searchActive ? (
              logs?.map((dataItem: SearchIEODLogsResponse) => {
                return (
                  <StyledTableRow key={dataItem.id}>
                    <StyledTableCell component="th" scope="row">
                      {dataItem.fullName || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {formatDateOnly(dataItem.lastRunDate) || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {formatTimeOnly(dataItem.startTime) || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {formatTimeOnly(dataItem.endTime) || 'N/A'}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Status
                        label={
                          Number(dataItem.status) === 1
                            ? 'Completed'
                            : 'Not Completed'
                        }
                        status={
                          Number(dataItem.status) === 1
                            ? 'Completed'
                            : 'Not Completed'
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.totalCompletedPercetage}
                    </StyledTableCell>
                    <StyledTableCell>
                      <ActionMenu id={dataItem.id} />
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })
            ) : (
              <StyledTableRow>
                <StyledTableCell
                  colSpan={COLUMNS.length + 1}
                  component="th"
                  scope="row"
                >
                  {renderEmptyTableBody(logs)}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </MuiTableContainer>
        )}
      </Box>
    </Box>
  );
};
