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
  Stack,
} from '@mui/material';
import { tableCard } from './styles';
import { primaryTitle } from '@/components/Confirmation/styles';
import colors from '@/assets/colors';
import { TableSingleAction } from '@/components/Table';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black,
    background: `${colors.neutral200}`,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name: string, requestedBy: string, requestedDate: string) {
  return { name, requestedBy, requestedDate };
}

const rows = [
  createData('Loan Cancellation', 'Azeez Babalola', '23 October 2023. 11:04pm'),
  createData('Partial Payoff', 'Daura Ahmed', '23 October 2023. 11:04pm'),
  createData('Loan Cancellation', 'Usman Daura', '23 October 2023. 11:04pm'),
  createData('Loan Cancellation', 'Chinedu Eze', '23 October 2023. 11:04pm'),
];

export const PendingTasks = () => {
  return (
    <Box mt={2} sx={tableCard}>
      <Stack mb={2} direction='row'>
      <Typography sx={primaryTitle}>
        Pending tasks{' '}
      </Typography>
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
            height: '22px',
          }}
        >
          14
          </Box>
          </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Request Type</StyledTableCell>
              <StyledTableCell>Requested By</StyledTableCell>
              <StyledTableCell>Release Date</StyledTableCell>
              <StyledTableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell>{row.requestedBy}</StyledTableCell>
                <StyledTableCell>{row.requestedDate}</StyledTableCell>
                <StyledTableCell>
                  <Link href="/">
                    <TableSingleAction actionName="View" />
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
