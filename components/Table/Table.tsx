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
import { Status } from '@/components/Labels';
import { TablePagination } from '@/components/Pagination';
import { ActionMenu } from './ActionMenu';

// Will change this once we start to make API calls
interface DataI {
  name: string;
  status: boolean;
  email: string;
  role: string;
  department: string;
}

type Props = {
  columns: string[];
  data: DataI[];
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

const success = <Status label="Active" status="success" />;
const warning = <Status label="Warning" status="warning" />;
const danger = <Status label="Danger" status="danger" />;
const action = <ActionMenu />;

export const MuiTableContainer = ({ columns, data }: Props) => {
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
              {columns.map((column: string) => (
                <StyledTableCell key={column}>{column}</StyledTableCell>
              ))}
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {data.map((dataItem) => (
              <StyledTableRow key={dataItem.name}>
                <StyledTableCell component="th" scope="row">
                  {dataItem.name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {dataItem.status ? success : danger}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {dataItem.email}
                </StyledTableCell>
                <StyledTableCell align="right">{dataItem.role}</StyledTableCell>
                <StyledTableCell align="right">
                  {dataItem.department}
                </StyledTableCell>
                <StyledTableCell align="right">{action}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination />
    </>
  );
};
