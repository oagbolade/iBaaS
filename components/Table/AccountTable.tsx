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
  GL_Account: number,
  Account_Title: string,
  Branch: string,
  Date_Opened: number,
  Book_Balance: number,
 
  action: any
) {
  return {
    GL_Account,
    Account_Title,
    Branch,
    Date_Opened,
    Book_Balance,
    action,
  };
}

const action = <ActionMenu />;

const rows = [
  createData(300, "UBA", "Head Office", 700,  6.0,action),
  createData(300, "Sky Bank", "Head Office", 700,  6.0, action),
  createData(300, "Keystone Bank", "Head Office", 700,  6.0,  action),
  createData(300, "UBA", "Head Office", 700,  6.0, action),
  createData(300, "Sky Bank", "Head Office", 700,  6.0, action),
  createData(300, "Sky Bank", "Head Office", 700,  6.0,  action),
  createData(300, "Sky Bank", "Head Office", 700,  6.0, action),
  createData(300, "Keystone Bank", "Head Office", 700,  6.0,  action),
  createData(300, "Keystone Bank", "Head Office", 700,  6.0,  action),
  createData(300, "Keystone Bank", "Head Office", 700,  6.0,  action),
];

export const AccountTableContainer = ({ columns }: Props) => {
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
              <StyledTableCell>GL Account Number</StyledTableCell>
              <StyledTableCell>Account Title</StyledTableCell>
              <StyledTableCell>Branch</StyledTableCell>
              <StyledTableCell>Date Opened</StyledTableCell>
              <StyledTableCell>Book Balance</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.GL_Account}>
                <StyledTableCell component="th" scope="row">
                {row.GL_Account}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.Account_Title}
                </StyledTableCell>
                <StyledTableCell align="right">{row.Branch}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.Date_Opened}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.Book_Balance}
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
