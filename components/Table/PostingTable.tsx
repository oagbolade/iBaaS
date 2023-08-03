'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import colors from '@/assets/colors';
import { TablePagination } from '@/components/Pagination';
import { ActionMenu } from './ActionMenu';

type Props = {
  columns: Array<[]>;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: `${colors.neutral900}`,
  fontFamily: 'Averta Regular',
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: 400,

  [`&.${tableCellClasses.head}`]: {
    backgroundColor: `${colors.neutral200}`,
    color: `${colors.neutral900}`,
    fontWeight: 600,
    textAlign: 'left',
  },

  [`&.${tableCellClasses.body}`]: {
    fontWeight: 400,
    textAlign: 'left',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even):hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:nth-of-type(odd):hover': {
    backgroundColor: theme.palette.action.hover,
  },
  borderRadius: '8px',
  border: `1px solid ${colors.neutral300}`,
  minWidth: '50px',
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  borderRadius: '8px',
  border: `1px solid ${colors.neutral300}`,
}));

function createData(
  CreditLimit: number,
  BranchLimit: number,
  BankLimit: number,
  DepostLimit: number,
  DebitLimit: number,
  DR_Branch: number,
  DR_Bank: number,
  DR_Load: number,
  action: any
) {
  return {
    CreditLimit,
    BranchLimit,
    BankLimit,
    DepostLimit,
    DebitLimit,
    DR_Branch,
    DR_Bank,
    DR_Load,
    action,
  };
}

const action = <ActionMenu />;

const rows = [
  createData(300, 400, 500, 700, 6900, 6.0, 24, 4.0, action),
  createData(300, 400, 500, 700, 6900, 6.0, 24, 4.0, action),
  createData(300, 400, 500, 700, 6900, 6.0, 24, 4.0, action),
  createData(300, 400, 500, 700, 6900, 6.0, 24, 4.0, action),
  createData(300, 400, 500, 700, 6900, 6.0, 24, 4.0, action),
  createData(300, 400, 500, 700, 6900, 6.0, 24, 4.0, action),
  createData(300, 400, 500, 700, 6900, 6.0, 24, 4.0, action),
  createData(300, 400, 500, 700, 6900, 6.0, 24, 4.0, action),
  createData(300, 400, 500, 700, 6900, 6.0, 24, 4.0, action),
  createData(300, 400, 500, 700, 6900, 6.0, 24, 4.0, action),
];

export const PostingTableContainer = ({ columns }: Props) => {
  return (
    <>
      <TableContainer
        sx={{
          shadow: 2,
          display: 'inline-block',
          width: '100%',
          borderRadius: '8px',
          border: `1px solid ${colors.neutral300}`,
        }}
        component={Paper}
      >
        <Table>
          <StyledTableHead>
            <TableRow>
              <StyledTableCell>Credit Limit</StyledTableCell>
              <StyledTableCell>CR Branch Limit</StyledTableCell>
              <StyledTableCell>CR Bank Limit</StyledTableCell>
              <StyledTableCell>CR Depost Limit</StyledTableCell>
              <StyledTableCell>Debit Limit</StyledTableCell>
              <StyledTableCell>DR Branch Limit</StyledTableCell>
              <StyledTableCell>DR Bank Limit</StyledTableCell>
              <StyledTableCell>DR Load Limit</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.CreditLimit}>
                <StyledTableCell component="th" scope="row">
                {row.CreditLimit}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.BranchLimit}
                </StyledTableCell>
                <StyledTableCell align="right">{row.BankLimit}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.DepostLimit}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.DebitLimit}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.DR_Branch}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.DR_Bank}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.DR_Bank}
                </StyledTableCell>

                <StyledTableCell align="right">{row.action}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination />
    </>
  );
};
