'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { COLUMNS } from './column';
import { FilterSection } from './FilterSection';
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
import { ModalContainerV2 } from '@/components/Revamp/Modal';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import colors from '@/assets/colors';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';
import { DateRangePickerContext } from '@/context/DateRangePickerContext';
import { TopOverViewSection } from '@/features/Report/Overview/TopOverViewSection';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';

const ViewAuditDetails: React.FC<{
  data: IAuditTrail;
  handleClose: () => void;
}> = ({ data, handleClose }) => {
  return (
    <div className="w-full">
      <div className="">
        <div className="flex justify-between items-center p-4 border-b">
          <h2>View Audit Logs</h2>
          <button type="button" onClick={handleClose} aria-label="Close modal">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.75 5.25L5.25 18.75"
                stroke="#5F738C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.75 18.75L5.25 5.25"
                stroke="#5F738C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        className="p-4"
        style={{
          maxHeight: '400px',
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: `${colors.neutral300} ${colors.neutral100}`,
          borderRadius: '8px',
          background: colors.neutral100
        }}
      >
        <style>
          {`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          background: ${colors.neutral100};
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${colors.neutral300};
          border-radius: 8px;
        }
          `}
        </style>
        <div className="custom-scrollbar">
          {Object.entries(data).map(([key, value]) => (
            <div
              className="py-3"
              key={key}
              style={{
                borderBottom: `1px solid ${colors.neutral200}`,
                marginBottom: '8px'
              }}
            >
              <h5
                style={{
                  color: `${colors.neutral800}`,
                  fontSize: '12px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '20px',
                  textTransform: 'uppercase',
                  fontFeatureSettings: "'liga' off, 'clig' off",
                  marginBottom: '4px'
                }}
              >
                {key.replace(/_/g, ' ').toUpperCase()}
              </h5>
              <h2
                style={{
                  color: `${colors.neutral1000}`,
                  fontFeatureSettings: "'liga' off, 'clig' off",
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: '24px'
                }}
              >
                {String(value)}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const AuditTrail = () => {
  const { isLoading: isGlobalLoading } = useGlobalLoadingState();
  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<ISearchParams>('audit-trail');
  const [openModel, setopenModel] = useState(false);
  const [selectedAudit, setSelectedAudit] = useState<IAuditTrail | null>(null);
  const { dateValue } = React.useContext(DateRangePickerContext);
  const { setExportData, setReportType } = React.useContext(
    DownloadReportContext
  );
  const handleClose = () => {
    setopenModel(false);
    setSelectedAudit(null);
  };

  const handleOpen = (auditReport: IAuditTrail) => {
    setSelectedAudit(auditReport);
    setopenModel(true);
  };

  const ActionMenu: React.FC<{ auditReport: IAuditTrail }> = ({
    auditReport
  }) => {
    return (
      <button
        type="button"
        onClick={() => handleOpen(auditReport)}
        style={{
          background: 'none',
          border: 'none',
          color: '#1976d2',
          textDecoration: 'none',
          cursor: 'pointer',
          padding: 0,
          font: 'inherit'
        }}
      >
        View More
      </button>
    );
  };

  const {
    auditTrailList: getAllAuditTrailsData,
    isLoading,
    totalRecords
  } = useGetAllAuditTrailReports({
    ...searchParams,
    getAll: false,
    pageNumber: String(page),
    pageSize: 10
  });

  const { auditTrailList: downloadData } = useGetAllAuditTrailReports({
    ...searchParams,
    getAll: true
  });

  React.useEffect(() => {
    if (!downloadData || downloadData.length === 0) {
      setExportData([]);
      return;
    }
    setExportData(downloadData);
  }, [downloadData]);

  const handleSearch = async (params: ISearchParams | null) => {
    setSearchActive(true);
    setSearchParams({
      ...params,
      pageNumber: String(page),
      pageSize: 10,
      startDate: dateValue[0]?.format('YYYY-MM-DD') || '',
      endDate: dateValue[1]?.format('YYYY-MM-DD') || ''
    });
    setReportType('AuditTrail');
  };

  const rowsPerPage = 10;
  const totalPages = Math.ceil((totalRecords || 0) / rowsPerPage);

  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '60px'
      }}
    >
      <TopOverViewSection useBackButton />

      <FilterSection onSearch={handleSearch} />

      {isGlobalLoading || isLoading ? (
        <Box sx={{ paddingX: '24px' }}>
          <FormSkeleton noOfLoaders={3} />
        </Box>
      ) : (
        <Box sx={{ paddingX: '24px' }}>
          <MuiTableContainer
            columns={COLUMNS}
            tableConfig={{
              hasActions: true
            }}
            data={getAllAuditTrailsData || []}
            setPage={setPage}
            page={page}
            totalPages={totalPages}
            totalElements={totalRecords}
          >
            {searchActive ? (
              getAllAuditTrailsData?.map((dataItem: IAuditTrail) => {
                return (
                  <StyledTableRow key={dataItem.id}>
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
                      {formatDateAndTime(dataItem.eff_date)}
                    </StyledTableCell>

                    {/* this to do hidden for now backend need tot provide the IP */}
                    {/* <StyledTableCell component="th" scope="row">
                      {dataItem.id}
                    </StyledTableCell> */}

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

      {openModel && selectedAudit && (
        <ModalContainerV2
          form={
            <ViewAuditDetails data={selectedAudit} handleClose={handleClose} />
          }
        />
      )}
    </Box>
  );
};
