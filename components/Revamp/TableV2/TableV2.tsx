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
import { Status } from '@/components/Labels';
import { TablePagination } from '@/components/Pagination';
import { EmptyTableIcon } from '@/assets/svg';
import { CustomTableHeader } from '@/components/Revamp/Shared/Table/CustomTableHeader';
import {
  TableTitle,
  TablePaginationStyle,
  TablePaginationTitle,
} from '@/components/Table/style';

// Will change this once we start to make API calls
interface DataI {
  productCode: string;
  productName: string;
  numberOfAccounts: number;
  cRProductBalance: string;
  dRProductBalance: string;
  totalBalance: string;
}

const StyledTableRow = styled(TableRow)(({ theme }) => {
  return {
    '&:nth-of-type(even):hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:nth-of-type(odd):hover': {
      backgroundColor: theme.palette.action.hover,
    },
    borderRadius: '8px',
    border: `1px solid ${colors.neutral300}`,
    minWidth: '50px',
  };
});

const StyledTableHead = styled(TableHead)(({ theme }) => {
  return {
    borderRadius: '8px',
    border: `1px solid ${colors.neutral300}`,
  };
});

const success = <Status label="Active" status="success" />;
const warning = <Status label="Warning" status="warning" />;
const danger = <Status label="Danger" status="danger" />;

export const renderEmptyTableBody = () => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Box>
        <Box ml={8}>
          <EmptyTableIcon />
        </Box>
        <Typography sx={{ ...emptyTableMainTitle }}>
          No Search Criteria Created
        </Typography>
        <Typography sx={{ ...emptyTableSecondaryTitle }}>
          Please create a search criteria above and you can see the results here
        </Typography>
      </Box>
    </Stack>
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

type Props = {
  columns: string[];
  data: DataI[];
  showHeader?: HeaderI;
  ActionMenuProps?: any;
  checkboxHeader?: any;
  tableConfig?: ITableConfig;
  hideFilterSection?: boolean;
};

export const TableV2 = ({
  columns,
  data,
  ActionMenuProps,
  showHeader,
  checkboxHeader,
  tableConfig,
  hideFilterSection,
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
        padding: '20px',
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
          borderRadius: '8px',
          border: `1px solid ${colors.neutral300}`,
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
                  <StyledTableCell isHeader key={column}>
                    {column}
                  </StyledTableCell>
                );
              })}
              {actionsColumn === 1 && <StyledTableCell />}
            </TableRow>
          </StyledTableHead>
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
                      {dataItem.productCode}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.productName ? success : danger}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.numberOfAccounts}
                    </StyledTableCell>
                    <StyledTableCell
                      isPainted={tableConfig?.paintedColumns?.includes(
                        'CR Product Balalnce',
                      )}
                      align="right"
                    >
                      {dataItem.cRProductBalance}
                    </StyledTableCell>
                    <StyledTableCell
                      isPainted={tableConfig?.paintedColumns?.includes(
                        'CR Product Balalnce',
                      )}
                      align="right"
                    >
                      {dataItem.dRProductBalance}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.totalBalance}
                    </StyledTableCell>
                    {tableConfig?.hasActions && (
                      <StyledTableCell align="right">
                        {ActionMenuProps ? <ActionMenuProps /> : <ActionMenu />}
                      </StyledTableCell>
                    )}
                  </StyledTableRow>
                );
              })
            )}
            <StyledTableRow>
              {tableConfig?.totalRow?.map((rowItem, index) => {
                return (
                  <StyledTableCell rowType="total" key={index} align="right">
                    {rowItem}{' '}
                  </StyledTableCell>
                );
              })}
            </StyledTableRow>
            {tableConfig?.grandTotalRow && (
              <StyledTableRow>
                {tableConfig?.grandTotalRow.map((rowItem, index) => {
                  return (
                    <StyledTableCell
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
      <Stack direction="row" justifyContent="space-between" spacing={3}>
        <PageTitle title="276 results found" styles={TableTitle} />
        <Box sx={TablePaginationStyle}>
          <PageTitle title="Rows per page: 10" styles={TablePaginationTitle} />
          <TablePagination />
        </Box>
      </Stack>
    </>
  );
};
