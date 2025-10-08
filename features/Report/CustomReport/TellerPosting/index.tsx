'use client';
import React, { useContext, useState } from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import { FilterSection } from './FilterSection';
import { MuiTableContainer, TableSingleAction } from '@/components/Table';
import { ActionMenu } from '@/features/Report/CustomReport/StandingInstructions';
import {
  ITellerPostingParams,
  useGetTellerPosting
} from '@/api/reports/useGetTellerPosting';
import { DownloadReportContext } from '@/context/DownloadReportContext';
import { tellerPostingColumn } from '@/constants/Reports/COLUMNS';
import { renderEmptyTableBody, StyledTableRow } from '@/components/Table/Table';
import { StyledTableCell } from '@/components/Table/style';
import { ITellerPostingReport } from '@/api/ResponseTypes/reports';
import { FormSkeleton } from '@/components/Loaders';
import { usePersistedSearch } from '@/utils/hooks/usePersistedSearch';
import { ISearchParams } from '@/app/api/search/route';
import { useGlobalLoadingState } from '@/utils/hooks/useGlobalLoadingState';

interface ActionProps {
  data: ITellerPostingReport;
}

const TellerPostingActions = ({ data }: ActionProps) => {
  return (
    <Link
      href={`/report/custom-report/view-teller-posting-details?acctNo=${data?.accountNumber}&ref=${data?.refNo}&narration=${data?.narration}&valueDate=${data?.valuedate?.trim()}&tranAmount=${data?.tranAmount}&accountTitle=${data?.accounttitle}&postingMode=${data?.postingMode}&creditAcct=${data?.creditAcct}&tranDate=${data?.tranDate}&userId=${data?.userid}&debitacct=${data?.debitacct}&postseq=${data?.postseq}&prevbal=${data?.prevbal}&deposit=${data?.deposit}&fromVault=${data?.fromVault}&curbal=${data?.curbal}&withdrawal=${data?.withdrawal}&toVault=${data?.toVault}`}
    >
      <TableSingleAction actionName="View More" />
    </Link>
  );
};

export const TellerPosting = () => {
  const { isLoading: isGlobalLoading } = useGlobalLoadingState();
  const {
    searchParams,
    setSearchParams,
    searchActive,
    setSearchActive,
    page,
    setPage
  } = usePersistedSearch<ISearchParams>('teller-posting');

  const { setExportData, setReportType } =
    useContext(DownloadReportContext);

  const { search } = searchParams || {};

  const {
    tellerPostByDateList = [],
    isLoading,
    totalRecords
  } = useGetTellerPosting({
    ...searchParams,
    search: search ?? undefined,
    pageNumber: page,
    pageSize: 10,
  });

  const {
    tellerPostByDateList: downloadData = [],
    totalRecords: downloadTotalRecords
  } = useGetTellerPosting({
    ...searchParams,
    search: search ?? undefined,
    pageNumber: page,
    pageSize: 10,
    getAll: true
  });

  React.useEffect(() => {
    if (!downloadData || downloadData.length === 0) {
      setExportData([]);
    }

    if (downloadData?.length > 0) {
      const formattedExportData = downloadData.map((item) => ({
        'Account Number': item?.accountNumber || '',
        'Account title': item?.accounttitle || '',
        Narration: item?.narration || '',
        'Value Date': item?.valuedate?.trim() || '',
        Reference: item?.refNo || '',
        'Transaction Amount': item?.tranAmount || '',
        'Posting Mode': item?.postingMode || '',
        'Credit Account': item?.creditAcct || '',
        'Transaction Date': item?.tranDate || '',
        'User ID': item?.userid || '',
        'Debit Account': item?.debitacct || '',
        'Post Sequence': item?.postseq || '',
        'Previous Balance': item?.prevbal || '',
        Deposit: item?.deposit || '',
        'From Vault': item?.fromVault || '',
        'Current Balance': item?.curbal || '',
        Withdrawal: item?.withdrawal || '',
        'To Vault': item?.toVault || ''
      }));

      // Ensure no blank row or misplaced headers
      setExportData(formattedExportData);
      setReportType('TellerPostingSummary');
    }
  }, [downloadData]);

  const rowsPerPage = 10;
  const totalPages = Math.ceil((totalRecords || 0) / rowsPerPage);

  const handleSearch = (params: ITellerPostingParams | null) => {
    setSearchActive(true);
    setSearchParams({
      ...params,
      pageNumber:
        params?.pageNumber !== undefined ? String(params.pageNumber) : undefined
    });
    setPage(1);
  };

  if (isGlobalLoading || isLoading) {
    return (
      <Box m={16}>
        <FormSkeleton noOfLoaders={5} />
      </Box>
    );
  }

  return (
    <Box sx={{ marginTop: '50px', width: '100%' }}>
      <FilterSection onSearch={handleSearch} />
      <Box sx={{ width: '100%', padding: '25px' }}>
        <MuiTableContainer
          tableConfig={{ hasActions: false }}
          columns={tellerPostingColumn}
          data={tellerPostByDateList}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          totalElements={totalRecords}
          showHeader={{
            mainTitle: 'Teller Posting',
            secondaryTitle:
              'See a directory of all teller posting in this system.',
            hideFilterSection: true
          }}
          ActionMenuProps={ActionMenu}
        >
          {tellerPostByDateList?.length > 0 ? (
            tellerPostByDateList?.map(
              (reportDetails: ITellerPostingReport, index) => {
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {reportDetails?.accountNumber}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {reportDetails?.accounttitle}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {reportDetails?.narration}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {reportDetails?.valuedate?.trim()}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {reportDetails?.refNo}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <TellerPostingActions data={reportDetails} />
                    </StyledTableCell>
                  </StyledTableRow>
                );
              }
            )
          ) : (
            <StyledTableRow>
              <StyledTableCell
                colSpan={tellerPostingColumn.length + 1}
                component="th"
                scope="row"
              >
                {renderEmptyTableBody()}
              </StyledTableCell>
            </StyledTableRow>
          )}
        </MuiTableContainer>
      </Box>
    </Box>
  );
};
