'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import colors from '@/assets/colors';
import { Status } from '@/components/Labels';

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
  borderRadius: '8px',
  border: `1px solid ${colors.neutral300}`,
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  borderRadius: '8px',
  border: `1px solid ${colors.neutral300}`,
}));

function createData(
  name: string,
  status: any,
  fat: number,
  carbs: number,
  protein: number,
  action: any
) {
  return { name, status, fat, carbs, protein, action };
}

const success = <Status label='Active' status='success' />;
const warning = <Status label='Warning' status='warning' />;
const danger = <Status label='Danger' status='danger' />;
const action = <MoreVertIcon />;

const rows = [
  createData('Frozen yoghurt', success, 6.0, 24, 4.0, action),
  createData('Ice cream sandwich', warning, 9.0, 37, 4.3, action),
  createData('Eclair', danger, 16.0, 24, 6.0, action),
  createData('Cupcake', success, 3.7, 67, 4.3, action),
  createData('Gingerbread', warning, 16.0, 49, 3.9, action),
  createData('Gingerbread', danger, 16.0, 49, 3.9, action),
  createData('Gingerbread', success, 16.0, 49, 3.9, action),
  createData('Gingerbread', warning, 16.0, 49, 3.9, action),
  createData('Gingerbread', danger, 16.0, 49, 3.9, action),
  createData('Gingerbread', 356, 16.0, 49, 3.9, action),
];

export const MuiTableContainer = ({ columns }: Props) => {
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
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Email Address</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>Department</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.status}</StyledTableCell>
                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                <StyledTableCell align="right">{row.protein}</StyledTableCell>
                <StyledTableCell align="right">{row.action}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination component='div' rowsPerPageOptions={[10, 50]} />
    </>
  );
};
