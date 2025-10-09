'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { emptyTableMainTitle, emptyTableSecondaryTitle } from './StyledMenu';
import { ActionMenu } from './ActionMenu';
import { PageTitle } from '@/components/Typography';
import colors from '@/assets/colors';
import { TablePagination } from '@/components/Pagination';
import { EmptyTableIcon } from '@/assets/svg';
import { CustomTableHeader } from '@/components/Revamp/Shared/Table/CustomTableHeader';
import {
  TableTitle,
  TablePaginationStyle,
  TablePaginationTitle
} from '@/components/Table/style';
import { calculatePages } from '@/utils/calculatePages';
import { formatCurrency } from '@/utils/hooks/useCurrencyFormat';
import { formatIfCurrency } from '@/utils/formatIfCurrency';

const StyledTableRow = styled(TableRow)(({ theme }) => {
  return {
    '&:nth-of-type(even):hover': {
      backgroundColor: theme.palette.action.hover
    },
    '&:nth-of-type(odd):hover': {
      backgroundColor: theme.palette.action.hover
    },
    borderRadius: '8px',
    border: `1px solid ${colors.neutral300}`,
    minWidth: '50px'
  };
});

const StyledTableHead = styled(TableHead)(({ theme }) => {
  return {
    borderRadius: '8px',
    border: `1px solid ${colors.neutral300}`
  };
});

export const renderEmptyTableBody = (message: string | null = null) => {
  return (
    <TableRow>
      <TableCell
        colSpan={100} // This ensures it spans all columns
        sx={{
          border: 'none',
          height: '400px',
          width: '100%',
          position: 'relative',
          padding: 0
        }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%'
          }}
        >
          <EmptyTableIcon />
          <Typography sx={{ ...emptyTableMainTitle }}>
            {message || 'No Search Criteria Created'}
          </Typography>
          <Typography sx={{ ...emptyTableSecondaryTitle }}>
            {!message &&
              'Please create a search criteria above and you can see the results here'}
          </Typography>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export interface TableProps {
  isHeader?: boolean;
  isPainted?: any;
  rowType?: 'total' | 'grandTotal';
}

interface HeaderI {
  mainTitle: string;
  secondaryTitle: string;
}

export interface ITableConfig {
  paintedColumns?: Array<string>;
  totalRow?: Array<string>;
  grandTotalRow?: Array<string>;
  hasActions?: boolean;
}

type Props<T> = {
  columns: string[];
  keys?: (keyof T)[]; // TODO: Make keys a comuplsory field once we integrate all reports that depends on Tablev2
  data: T[];
  showHeader?: HeaderI;
  ActionMenuProps?: any;
  page?: number;
  setPage?: Function;
  totalPages?: number;
  checkboxHeader?: any;
  tableConfig?: ITableConfig;
  hideFilterSection?: boolean;
  totalElements?: number;
  isSearched?: boolean;
};

export const TableV2 = <T,>({
  columns,
  keys,
  data,
  ActionMenuProps,
  showHeader,
  page = 1,
  setPage,
  totalPages,
  totalElements,
  checkboxHeader,
  tableConfig,
  hideFilterSection,
  isSearched
}: Props<T>) => {
  const actionsColumn = tableConfig?.hasActions ? 1 : 0;

 const currencyKeys = [
  'crproductbalance',
  'drproductbalance',
  'totproductbalance',
  'loanamount',
  'currentbalance',
  'bkbalance',
  'inflow',
  'outflow',
] as const satisfies readonly string[];


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
        padding: '10px 20px'
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

  const paginationCount = totalPages || calculatePages(data?.length as number);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage?.(value);
  };

  return (
    <>
      <TableContainer
        sx={{
          shadow: 2,
          display: 'inline-block',
          width: '100%',
          borderRadius: '8px',
          border: `1px solid ${colors.neutral300}`
        }}
        component={Paper}
      >
        {showHeader && (
          <CustomTableHeader
            mainTitle={showHeader?.mainTitle}
            secondaryTitle={showHeader?.secondaryTitle}
            hideFilterSection={hideFilterSection}
          />
        )}
        <Table>
          <StyledTableHead>
            <TableRow>
              {checkboxHeader && (
                <StyledTableCell isHeader>
                  <Checkbox />
                </StyledTableCell>
              )}
              {columns.map((column: string) => {
                return (
                  <StyledTableCell
                    colSpan={columns.length + actionsColumn}
                    isHeader
                    key={column}
                  >
                    {column}
                  </StyledTableCell>
                );
              })}
              {actionsColumn === 1 && <StyledTableCell />}
            </TableRow>
          </StyledTableHead>

          <TableBody>
            {isSearched
              ? data?.map((dataItem, index) => {
                return (
                  <StyledTableRow key={index}>
                    {checkboxHeader && (
                      <StyledTableCell component="th" scope="row">
                        <Checkbox />
                      </StyledTableCell>
                    )}
                    {keys?.map((key) => (
                      <StyledTableCell
                        isPainted={tableConfig?.paintedColumns?.includes(
                          key as string
                        )}
                        colSpan={columns.length + actionsColumn}
                        align="right"
                        key={String(key)}
                      >
                         {formatIfCurrency(String(key), dataItem[key], currencyKeys)}
                      </StyledTableCell>
                    ))}
                    {tableConfig?.hasActions && (
                      <StyledTableCell
                        colSpan={columns.length + actionsColumn}
                        align="right"
                      >
                        {ActionMenuProps ? (
                          <ActionMenuProps data={dataItem} />
                        ) : (
                          <ActionMenu />
                        )}
                      </StyledTableCell>
                    )}
                  </StyledTableRow>
                );
              })
              : renderEmptyTableBody()}
            <StyledTableRow>
              {isSearched &&
                tableConfig?.totalRow?.map((rowItem, index) => {
                  return (
                    <StyledTableCell
                      colSpan={columns.length + actionsColumn}
                      rowType="total"
                      key={index}
                      align="right"
                    >
                      {rowItem}{' '}
                    </StyledTableCell>
                  );
                })}
            </StyledTableRow>
            {isSearched && tableConfig?.grandTotalRow && (
              <StyledTableRow>
                {tableConfig?.grandTotalRow.map((rowItem, index) => {
                  return (
                    <StyledTableCell
                      colSpan={columns.length + actionsColumn}
                      rowType="grandTotal"
                      key={index}
                      align="right"
                    >
                      {rowItem}{' '}
                    </StyledTableCell>
                  );
                })}
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {isSearched && (
        <Stack direction="row" justifyContent="space-between" spacing={3}>
          <PageTitle 
            title={`${totalElements || data?.length} result(s) found`}
            styles={TableTitle}
          />
          <Box sx={TablePaginationStyle}>
            <PageTitle
              title="Rows per page: 10"
              styles={TablePaginationTitle}
            />
            <TablePagination
              handlePageChange={handlePageChange}
              page={page}
              count={paginationCount}
            />
          </Box>
        </Stack>
      )}
    </>
  );
};
