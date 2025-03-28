'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { COLUMNS } from './column';
import { FilterSection } from './FilterSection';
import { ViewAuditLog } from './ViewAuditLog';
import {
  MuiTableContainer,
  StyledTableRow,
  renderEmptyTableBody
} from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { useGetAllAuditTrailReports } from '@/api/reports/useAuditTrails';
import { ISearchParams } from '@/app/api/search/route';
import { FormSkeleton } from '@/components/Loaders';
import { IAuditTrail } from '@/api/ResponseTypes/reports';
import { formatDateAndTime } from '@/utils/hooks/useDateFormat';

export const AuditTrail = () => {
  const [search, setSearch] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [page, setPage] = React.useState(1);

  const ActionMenu: React.FC<{ auditReport: IAuditTrail }> = ({
    auditReport
  }) => {
    return <ViewAuditLog auditReport={auditReport} />;
  };

  const handleSearch = async (params: ISearchParams | null) => {
    setSearch(true);

    setSearchParams(params);
  };

  const {
    auditTrailList: getAllAuditTrailsData,
    isLoading: isAuditTrailDataLoading
  } = useGetAllAuditTrailReports({
    ...searchParams,
    page
  });

  return (
    <Box
      sx={{
        padding: '25px',
        width: '100%',
        marginTop: '80px'
      }}
    >
      <FilterSection onSearch={handleSearch} />
      <Box sx={{ marginTop: '40px' }}>
        {isAuditTrailDataLoading ? (
          <FormSkeleton noOfLoaders={3} />
        ) : (
          <Box sx={{ width: '100%' }}>
            <MuiTableContainer
              columns={COLUMNS}
              tableConfig={{
                hasActions: true
              }}
              data={getAllAuditTrailsData}
              setPage={setPage}
              page={page}
            >
              {search ? (
                getAllAuditTrailsData?.map((dataItem: IAuditTrail) => {
                  return (
                    <StyledTableRow key={dataItem.userId}>
                      <StyledTableCell component="th" scope="row">
                        {dataItem.menuname}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {dataItem.userId}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {dataItem.action_performed}
                      </StyledTableCell>

                      <StyledTableCell component="th" scope="row">
                        {formatDateAndTime(dataItem.createDate)}
                      </StyledTableCell>

                      <StyledTableCell component="th" scope="row">
                        {dataItem.id}
                      </StyledTableCell>

                      <StyledTableCell component="th" scope="row">
                        <ActionMenu auditReport={dataItem} />
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
                    {renderEmptyTableBody(getAllAuditTrailsData)}
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </MuiTableContainer>
          </Box>
        )}
      </Box>
    </Box>
  );
};
