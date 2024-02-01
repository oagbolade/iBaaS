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
import SearchIcon from '@mui/icons-material/Search';
import { PageTitle } from '../Typography';
import { emptyTableMainTitle, emptyTableSecondaryTitle } from './StyledMenu';
import { ActionMenu } from './ActionMenu';
import {
  TablePaginationStyle,
  TablePaginationTitle,
  TableTitle,
  inputFields,
} from './style';
import colors from '@/assets/colors';
import { Status } from '@/components/Labels';
import { TablePagination } from '@/components/Pagination';
import { EmptyTableIcon } from '@/assets/svg';
import { CustomTableHeader } from '@/components/Revamp/Shared/Table/CustomTableHeader';
import { ITableConfig, TableProps } from '@/components/Revamp/TableV2/TableV2';
import { TextInput } from '@/components/FormikFields';
import { useSetDirection } from '@/utils/useSetDirection';

// Will change this once we start to make API calls
interface DataI {
  name: string;
  status: boolean;
  email: string;
  role: string;
  department: string;
}

export const StyledTableRow = styled(TableRow)(({ theme }) => {
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

export interface HeaderI {
  mainTitle: string;
  secondaryTitle: string;
  filterSection?: React.ReactNode;
  hideFilterSection?: boolean;
}

type Props = {
  columns: string[];
  data?: DataI[] | undefined;
  showHeader?: HeaderI;
  ActionMenuProps?: any;
  checkboxHeader?: any;
  hideFilterSection?: boolean;
  tableConfig?: ITableConfig;
  showSearch?: boolean;
  children?: React.ReactNode;
};

export const MuiTableContainer = ({
  columns,
  data,
  ActionMenuProps,
  showHeader,
  tableConfig = {
    hasActions: true,
  },
  checkboxHeader,
  showSearch = false,
  children,
}: Props) => {
  const actionsColumn = tableConfig?.hasActions ? 1 : 0;
  const { setDirection } = useSetDirection();

  const StyledTableCell = styled(TableCell, {
    shouldForwardProp: (prop) => prop !== 'isHeader',
  })(({ isHeader }: TableProps) => {
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
        padding: '10px 20px',
      }),

      ...(isHeader && {
        padding: '10px 20px',
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
            hideFilterSection={showHeader?.hideFilterSection}
          />
        )}
        {showSearch && (
          <TextInput
            customStyle={{
              ...inputFields,
            }}
            icon={<SearchIcon />}
            name="Search"
            placeholder="Search"
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
            {data?.length === 0 ? (
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
              children ||
              data?.map((dataItem) => {
                return (
                  <StyledTableRow key={dataItem.name}>
                    {checkboxHeader && (
                      <StyledTableCell component="th" scope="row">
                        <Checkbox />
                      </StyledTableCell>
                    )}
                    <StyledTableCell component="th" scope="row">
                      {dataItem.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.status ? success : danger}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.email}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.role}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {dataItem.department}
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
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        direction={setDirection()}
        justifyContent="space-between"
        spacing={3}
      >
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
