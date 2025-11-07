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
  const [search, setSearch] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<ISearchParams | null>(null);
  const [page, setPage] = React.useState(1);
  const [openModel, setopenModel] = useState(false);
  const [selectedAudit, setSelectedAudit] = useState<IAuditTrail | null>(null);
  const { setReportType, setExportData } = React.useContext(
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

  const handleSearch = async (params: ISearchParams | null) => {
    setSearch(true);
    setSearchParams({
      ...params,
      pageNumber: String(page),
      pageSize: 10,
      getAll: false
    });
    setReportType('AuditTrail');
  };

  React.useEffect(() => {
    setSearch(true);
    setSearchParams({
      ...searchParams,
      pageNumber: String(page),
      pageSize: 10,
      getAll: false
    });

    handleSearch(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { auditTrailList: getAllAuditTrailsData, isLoading } =
    useGetAllAuditTrailReports({
      ...searchParams
    });

  const { auditTrailList: downloadData } = useGetAllAuditTrailReports({
    ...searchParams,
    pageNumber: String(page),
    getAll: true
  });

  React.useEffect(() => {
    if (downloadData?.length > 0) {
      setExportData(downloadData);
    }
  }, [downloadData, setExportData]);

  return (
    <Box
      sx={{
        width: '100%',
        marginTop: '60px'
      }}
    >
      <FilterSection onSearch={handleSearch} />

      {isGlobalLoading || isLoading ? (
        <FormSkeleton noOfLoaders={3} />
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
