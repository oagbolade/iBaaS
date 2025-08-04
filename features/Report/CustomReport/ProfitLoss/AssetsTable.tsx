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

import { PageTitle, TableTitle } from '@/components/Typography';
import colors from '@/assets/colors';
import { TablePagination } from '@/components/Pagination';
import { CustomTableHeader } from '@/components/Revamp/Shared/Table/CustomTableHeader';
import { renderEmptyTableBody } from '@/components/Revamp/TableV2/TableV2';
import { calculatePages } from '@/utils/calculatePages';
import {
  TablePaginationStyle,
  TablePaginationTitle
} from '@/components/Table/style';
import { GroupItem } from '@/api/ResponseTypes/reports';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even):hover': {
    backgroundColor: theme.palette.action.hover
  },
  '&:nth-of-type(odd):hover': {
    backgroundColor: theme.palette.action.hover
  },
  borderRadius: '8px'
}));

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
  paintedColumns: string[];
  totalRow: string[];
  grandTotalRow?: string[];
  hasActions?: boolean;
}

type AssetsTableProps = {
  data: GroupItem[];
  showHeader?: HeaderI;
  checkboxHeader?: boolean;
  tableConfig?: ITableConfig;
  page?: number;
  setPage?: (page: number) => void;
  totalPages?: number;
  totalElements?: number;
  columns?: string[];
};

export const AssetsTable: React.FC<AssetsTableProps> = ({
  data,
  showHeader,
  checkboxHeader = false,
  tableConfig,
  page = 1,
  setPage,
  totalPages,
  columns,
  totalElements
}) => {
  const actionsColumn = tableConfig?.hasActions ? 1 : 0;

  const StyledTableCell = styled(TableCell, {
    shouldForwardProp: (prop) =>
      prop !== 'isHeader' && prop !== 'isPainted' && prop !== 'rowType'
  })(({ rowType, isPainted, isHeader }: TableProps) => {
    const baseStyle = {
      fontWeight: 600,
      textAlign: 'left',
      fontSize: '16px',
      lineHeight: '24px',
      padding: '20px 20px'
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
        textAlign: 'left'
      },

      [`&.${tableCellClasses.body}`]: {
        fontWeight: 400,
        textAlign: 'left'
      },

      ...(actionsColumn && {
        padding: '0 20px'
      }),

      ...(isHeader && {
        padding: '10px 20px'
      }),

      ...(isPainted && {
        backgroundColor: '#F4FBFE'
      }),

      ...(rowType === 'total' && {
        ...baseStyle,
        backgroundColor: '#EBF8FE',
        color: `${colors.activeBlue400}`
      }),

      ...(rowType === 'grandTotal' && {
        ...baseStyle,
        backgroundColor: `${colors.primaryBlue500}`,
        color: `${colors.white}`
      })
    };
  });

  const paginationCount = totalPages || calculatePages(data.length);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage?.(value);
  };

  return (
    <>
      <TableContainer
        sx={{
          shadow: 2,
          display: 'inline-block',
          width: '100%',
          borderRadius: '4px'
        }}
        component={Paper}
      >
        {showHeader && (
          <CustomTableHeader
            mainTitle={showHeader.mainTitle}
            secondaryTitle={showHeader.secondaryTitle}
          />
        )}

        <Table>
          <TableHead>
            <TableRow>
              {checkboxHeader && (
                <StyledTableCell>
                  <Checkbox />
                </StyledTableCell>
              )}
              <StyledTableCell>Item Description</StyledTableCell>
              <StyledTableCell>Balance</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell
                  colSpan={2 + (checkboxHeader ? 1 : 0)}
                  component="th"
                  scope="row"
                >
                  {renderEmptyTableBody()}
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              data.map((item, index) => (
                <StyledTableRow key={index}>
                  {checkboxHeader && (
                    <StyledTableCell>
                      <Checkbox />
                    </StyledTableCell>
                  )}
                  <StyledTableCell>{item.itemDesc}</StyledTableCell>
                  <StyledTableCell>
                    {item.balance.toLocaleString()}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}

            {tableConfig?.totalRow && (
              <StyledTableRow>
                {tableConfig.totalRow.map((val, i) => (
                  <StyledTableCell key={i}>{val}</StyledTableCell>
                ))}
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" justifyContent="space-between" spacing={3} mt={2}>
        <PageTitle
          title={`${totalElements || data.length} result(s) found`}
          styles={TableTitle}
        />
        <Box sx={TablePaginationStyle}>
          <PageTitle title="Rows per page: 10" styles={TablePaginationTitle} />
          <TablePagination
            page={page}
            count={paginationCount}
            handlePageChange={handlePageChange}
          />
        </Box>
      </Stack>
    </>
  );
};
