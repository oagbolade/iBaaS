'use client';
import * as React from 'react';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {
  TableContainer,
  TableBody,
  Table,
  Box,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Stack
} from '@mui/material';
import DOMPurify from 'dompurify';
import { useRouter } from 'next/navigation';
import { useCallback, useContext } from 'react';
import { tableCard } from './styles';
import { primaryTitle } from '@/components/Confirmation/styles';
import colors from '@/assets/colors';
import { TableSingleAction } from '@/components/Table';
import { useGetPendingRequest } from '@/api/loans/useFetchPendingRequest';
import { FormSkeleton } from '@/components/Loaders';
import { IGetPendingRequest } from '@/api/ResponseTypes/loans';
import { StyledTableRow, renderEmptyTableBody } from '@/components/Table/Table';
import { RequestModuleContext } from '@/context/RequestModuleContext';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black,
    background: `${colors.neutral200}`
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));


interface RequestProps {
  requests: IGetPendingRequest;
}

const PendingRequestsActions = ({ requests }: RequestProps) => {
  const { setPendingRequestData } = useContext(RequestModuleContext);
  const router = useRouter();

  const handleViewRequest = useCallback(() => {
    setPendingRequestData({
      id: requests.id,
      tablename: requests.tablename,
      authdesc: requests.authdesc,
      authid: requests.authid,
      posttype: requests.posttype,
      createdate: requests.createdate,
      authstatus: requests.authstatus,
      searchfield: requests.searchfield,
      authdate: requests.authdate,
      latestupdate: requests.latestupdate,
      post_user: requests.post_user || '',
      narration: requests.narration
    });
    router.push(`/requests/view-single-pending-request/?id=${requests.id}`);
  }, [requests, setPendingRequestData, router]);

  return (
    <button
      type="button"
      onClick={handleViewRequest}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0
      }}
      aria-label={`View request ${requests.id}`}
    >
      <TableSingleAction actionName="View" />
    </button>
  );
};
export const PendingTasks = () => {
  const { authsdetails, isLoading } = useGetPendingRequest();
  const pendingData = authsdetails?.length || 0;

  if (isLoading) {
    return (
      <Box my={6}>
        <FormSkeleton noOfLoaders={5} />
      </Box>
    );
  }
  return (
    <Box mt={2} sx={tableCard}>
      <Stack mb={2} direction="row">
        <Typography sx={primaryTitle}>Pending tasks </Typography>
        <Box
          ml={1}
          mt={0.6}
          sx={{
            border: '1px solid var(--Gray-200, #E7E5E4)',
            background: 'var(--Gray-100, #F5F5F4)',
            padding: '2px 8px',
            borderRadius: '16px',
            fontSize: '12px',
            fontWeight: 500,
            width: '30px',
            height: '22px'
          }}
        >
          {pendingData}
        </Box>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Request Type</StyledTableCell>
              <StyledTableCell>Requested By</StyledTableCell>
              <StyledTableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {authsdetails?.slice(0, 5).map((row: IGetPendingRequest) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row?.authdesc}
                </StyledTableCell>
                <StyledTableCell>{row?.authid}</StyledTableCell>
                <StyledTableCell>
                  <PendingRequestsActions requests={row} />
                </StyledTableCell>
              </StyledTableRow>
            ))}

            {authsdetails?.length === 0 && (
              <StyledTableRow>
                <StyledTableCell
                  colSpan={12}
                  component="th"
                  sx={{
                    verticalAlign: 'middle',
                    textAlign: 'center',
                    height: 80
                  }}
                >
                  {renderEmptyTableBody(authsdetails ?? [])}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
