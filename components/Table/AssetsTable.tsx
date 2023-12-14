'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import {
  TablePaginationStyle,
  TablePaginationTitle,
  TableTitle,
} from './style';
import { PageTitle } from '@/components/Typography';
import colors from '@/assets/colors';
import { TablePagination } from '@/components/Pagination';
import { CustomTableHeader } from '@/components/Revamp/Shared/Table/CustomTableHeader';
import { renderEmptyTableBody } from '@/components/Revamp/TableV2/TableV2';

const StyledTableRow = styled(TableRow)(({ theme }) => {
  return {
    '&:nth-of-type(even):hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:nth-of-type(odd):hover': {
      backgroundColor: theme.palette.action.hover,
    },
    borderRadius: '8px',
  };
});

export interface TableProps {
  isHeader?: boolean;
  isPainted?: any;
  rowType?: 'total' | 'grandTotal';
}

interface HeaderI {
  mainTitle: string;
  secondaryTitle: string;
}

interface ITableConfig {
  paintedColumns: Array<string>;
  totalRow: Array<string>;
  grandTotalRow?: Array<string>;
  hasActions?: boolean;
}

export interface IData {
  assets: string;
  amount: string;
}

type Props = {
  columns: string[];
  data: IData[];
  showHeader?: HeaderI;
  checkboxHeader?: any;
  tableConfig?: ITableConfig;
};

export const AssetsTable = ({
  columns,
  data,
  showHeader,
  checkboxHeader,
  tableConfig,
}: Props) => {
  const actionsColumn = tableConfig?.hasActions ? 1 : 0;
  const StyledTableCell = styled(TableCell, {
    shouldForwardProp: (prop) =>
      prop !== 'isHeader' && prop !== 'isPainted' && prop !== 'rowType',
  })(({ rowType, isPainted, isHeader }: TableProps) => {
    const baseStyle = {
      fontWeight: 600,
      textAlign: 'left',
      fontSize: '16px',
      lineHeight: '24px',
      padding: '20px 20px',
    };

    return {
      color: `${colors.neutral900}`,
      fontFamily: 'Averta Regular',
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 400,
      padding: '20px 20px',

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

      ...(actionsColumn && {
        padding: '0 20px',
      }),

      ...(isHeader && {
        padding: '10px 20px',
      }),

      ...(isPainted && {
        backgroundColor: '#F4FBFE',
      }),

      ...(rowType === 'total' && {
        ...baseStyle,
        backgroundColor: '#EBF8FE',
        color: `${colors.activeBlue400}`,
      }),

      ...(rowType === 'grandTotal' && {
        ...baseStyle,
        backgroundColor: `${colors.primaryBlue500}`,
        color: `${colors.white}`,
      }),
    };
  });

  return (
    <>
      <TableContainer
        sx={{
          shadow: 2,
          display: 'inline-block',
          width: '100%',
          borderRadius: '4px',
        }}
        component={Paper}
      >
        {showHeader && (
          <CustomTableHeader
            mainTitle={showHeader?.mainTitle}
            secondaryTitle={showHeader?.secondaryTitle}
          />
        )}
        <Table>
          <TableHead>
            <TableRow>
              {checkboxHeader && (
                <StyledTableCell isHeader>
                  <Checkbox />
                </StyledTableCell>
              )}
              {columns.map((column: string) => {
                return (
                  <StyledTableCell isHeader key={column}>
                    {column}
                  </StyledTableCell>
                );
              })}
              {actionsColumn === 1 && <StyledTableCell />}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell
                  colSpan={columns.length + actionsColumn}
                  component="th"
                  scope="row"
                >
                  {renderEmptyTableBody()}
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              data.map((dataItem, index) => {
                return (
                  <StyledTableRow key={index}>
                    {checkboxHeader && (
                      <StyledTableCell component="th" scope="row">
                        <Checkbox />
                      </StyledTableCell>
                    )}
                    <StyledTableCell align="right">
                      <b>{dataItem.assets}</b>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.amount}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })
            )}
            <StyledTableRow>
              {tableConfig?.totalRow.map((rowItem, index) => {
                return (
                  <StyledTableCell rowType="total" key={index} align="right">
                    {rowItem}{' '}
                  </StyledTableCell>
                );
              })}
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" justifyContent="space-between" spacing={3}>
        <PageTitle title="276 results found" styles={{ ...TableTitle }} />
        <Box sx={TablePaginationStyle}>
          <PageTitle
            title="Rows per page: 10"
            styles={{ ...TablePaginationTitle }}
          />
          <TablePagination />
        </Box>
      </Stack>
    </>
  );
};
